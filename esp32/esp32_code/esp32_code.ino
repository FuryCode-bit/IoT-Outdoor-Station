#include "secrets.h"
#include "LiquidCrystal.h"
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include "WiFi.h"
#include "DHT.h"
#include "time.h"

/*
Para utilizar a funcionalidade de wake up externo, 
os pins 0,2,4,12-15,25-27,32-39 são usados.
*/

// ESP32's pins sensor de chuva
#define A0_PIN 27
#define D0_PIN 33
#define THRESHOLD 2500

// ESP32's pin sensor de humidade do solo
#define ANALOG_SOIL 34
#define THRESHOLD 2500

// ESP32's pin sensor de humidade e temperatura (DHT11)
#define DHTPIN 4
#define DHTTYPE DHT11

// Tópicos MQTT para o dispositivo dar publish/subscribe
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

// Variável armazenada na Real Time Clock memory (512 bytes) 
// para manter estado entre deep sleeps
RTC_DATA_ATTR int rained = 2;

DHT dht(DHTPIN, DHTTYPE);

// Configura as definições para sincronizar 
// a hora do dispositivo usando o Network Time Protocol (NTP)
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 0;       // Offset do fuso horário em segundos (GMT+0)
const int   daylightOffset_sec = 3600;

// Deep sleep configuration
#define uS_TO_S_FACTOR 1000000ULL /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  3600       /* Time ESP32 will go to sleep (in seconds) */

// External wakeup configuration
#define WAKEUP_PIN D0_PIN

// inicializa LCD
LiquidCrystal lcd(19, 23, 18, 17, 16, 25);

// Função que permite ao ESP32 conectar ao MQTT Broker da AWS Iot Core
void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  // Configura a conexão segura usando os certificados gerados para o dispositivo
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Conexão com o MQTT Broker daAWS IoT Core na porta 8883 (MQTT)
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if(!client.connected()){
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscreve o tópico
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

// Utiliza os dados recebidos pelo servidor NTP para obter informações da data e hora do momento
std::string getLocalTimeAsString() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return "Failed to obtain time";
  }
  
  char buffer[64];
  strftime(buffer, sizeof(buffer), "%A, %B %d %Y %H:%M:%S", &timeinfo);
  
  return std::string(buffer);
}

// Função que publica os dados no tópico MQTT
void publishData(std::string time, float temperature, float humidity, float hotIndex, int rain, int soil)
{

  // Cálculo da percentagem de chuva
  float percentRain = ((float)rain / 4095.0) * 100.0;

  // Cálculo da percentagem de humidade do solo seco
  float percentDrySoil = ((4095 - soil) / 4095.0) * 100.0;

  StaticJsonDocument<200> doc;
  
  doc["timestamp"] = time;
  doc["time2load"] = millis();
  doc["temperatura"] = temperature;
  doc["humidade"] = humidity;
  doc["indiceCalor"] = hotIndex;
  doc["chuva"] = percentRain;
  doc["humidadeSolo"] = percentDrySoil;
  
  // Serialize JSON to buffer
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

// Função de debug para identificar motivo de ter acordado
int print_wakeup_reason() {
  esp_sleep_wakeup_cause_t wakeup_reason;

  wakeup_reason = esp_sleep_get_wakeup_cause();

  switch (wakeup_reason) {
    case ESP_SLEEP_WAKEUP_EXT0: 
      Serial.println("Wakeup caused by rain signal using RTC_IO");
      Serial.println("Chuva detetada!");
      lcd.print("Chuva detetada!");
      return 1;
      break;
    case ESP_SLEEP_WAKEUP_TIMER: 
      Serial.println("Wakeup caused by timer");
      lcd.print("A reconectar");
      return 0;
      break;
    default: 
      Serial.printf("Wakeup was not caused by deep sleep: %d\n", wakeup_reason);
      return 0;
      break;
  }
}

void setup() {
  Serial.begin(115200);
  lcd.begin(16, 2);
  delay(500);

  // Print the wakeup reason for ESP32
  rained = print_wakeup_reason();

  connectAWS();

  // Faz um pedido da data e hora atual ao servidor NTP
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  // initialize the Arduino's pin as an input
  pinMode(A0_PIN, OUTPUT);  
  pinMode(D0_PIN, INPUT);

  digitalWrite(A0_PIN, HIGH);

  int rain_state = digitalRead(D0_PIN);
  int soilMoistureVal = analogRead(ANALOG_SOIL);

  lcd.print("Solo: ");
  Serial.print("Solo: ");

  if (soilMoistureVal > THRESHOLD) {
    lcd.print("Seco ");
    Serial.print("Seco ");
  } else {
    lcd.print("Molhado ");
    Serial.print("Molhado ");
  }
  
  lcd.print(soilMoistureVal);
  Serial.println(soilMoistureVal);

  delay(2000); // Display each item for 2 seconds

  // 0-5 Volts
  int rainAnalogVal = analogRead(A0_PIN);

  // Verifica o valor analógico do sensor de chuva, para identificar se está a chover ou não.
  // LOW indica chuva
  if (rain_state == HIGH) {
    Serial.print("The rain is NOT detected (");
  } else {
    Serial.print("The rain is detected (");
  }

  Serial.print(rainAnalogVal);
  Serial.println(")");

  delay(1000);
  // Leitura dos valores humidade, temperatura e cálculo do indice calor
  float humidity = dht.readHumidity();
  
  float temperature = dht.readTemperature();

  float celcius = dht.computeHeatIndex(temperature, humidity, false);

  // Debug
  if (isnan(humidity) || isnan(temperature) || isnan(celcius)) {
    Serial.println(F("Falha ao recolher dados do sensor Humidade/Temperatura!"));
  }

  // Debug
    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.print("Hum: ");
    lcd.print(humidity);
    lcd.print("%");
    Serial.print("Hum: ");
    Serial.print(humidity);
    Serial.println("%");

    delay(2000); // Display each item for 2 seconds

    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.print("Temp: ");
    lcd.print(temperature);
    lcd.print("C");
    Serial.print("Temp: ");
    Serial.print(temperature);
    Serial.println("C");

    delay(2000);

    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.print("Heat: ");
    lcd.print(celcius);
    lcd.print("C");
    Serial.print("Heat Index: ");
    Serial.print(celcius);
    Serial.println("C");

    delay(2000); // Display each item for 2 seconds


  // Publica uma mensagem com os dados dos sensores no tópico MQTT
  publishData(getLocalTimeAsString(), temperature, humidity, celcius, rainAnalogVal, soilMoistureVal);

  // Só vai voltar a acordar se:
  if (rained == 0) {
    // Parar de detetar água no sensor e o último valor observado foi de chuva
    esp_sleep_enable_ext0_wakeup(static_cast<gpio_num_t>(WAKEUP_PIN), 0);
    lcd.print("Não está a chover!");
    Serial.println("Não está a chover!");
  } else if (rained == 1){
    // Detetar água no sensor e o último valor observado foi de sol
    esp_sleep_enable_ext0_wakeup(static_cast<gpio_num_t>(WAKEUP_PIN), 1);
    lcd.print("Detetei chuva!");
    Serial.println("Detetei chuva!");
  } else {
    // Detetar água no sensor e o último valor observado foi de sol
    esp_sleep_enable_ext0_wakeup(static_cast<gpio_num_t>(WAKEUP_PIN), 0);
    lcd.print("Não está a chover!");
    Serial.println("Não está a chover!");
  }

  delay(2000);

  // Configuring deep sleep and external wakeup
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP / 3600) + " hour");

  lcd.print("A desligar...");

  delay(2000);

  Serial.println("Going to sleep now");
  Serial.flush();
  
  esp_deep_sleep_start();
}

void loop() {
  // This is not going to be called
}
