#include <pgmspace.h>

#define SECRET
#define THINGNAME "ESP32-coisa"

const char WIFI_SSID[] = "WIFI_SSID";
const char WIFI_PASSWORD[] = "WIFI_PASSWORD";

const char AWS_IOT_ENDPOINT[] = "AWS_IOT_ENDPOINT";

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = "Amazon Root CA 1";

// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = "Device Certificate";

// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = "Device Private Key";