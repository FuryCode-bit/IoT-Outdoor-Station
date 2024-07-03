import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Header from '../../components/header/Header';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

import LineChart from '../graficos/LineChart';
import GaugeChart from '../graficos/GaugeChart';
import StepperChart from '../graficos/StepperChart'

Chart.register(CategoryScale);

function Graficos({ teste, estacoes }) {
  const navigate = useNavigate();

  const [leituras, setLeituras] = useState([]);
  const [lastLeituras, setLastLeituras] = useState();

  const [lastLoadTime, setLastLoadTime] = useState(0);
  const [lastTemperature, setLastTemperature] = useState(0);
  const [lastHumidity, setLastHumidity] = useState(0);
  const [lastHotIndex, setLastHotIndex] = useState(0);
  const [lastRainValue, setLastRainValue] = useState(0);
  const [lastSoilHumidity, setLastSoilHumidity] = useState(0);




  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura (ºC)',
        data: [],
        borderColor: '#FF6384',
        yAxisID: 'y',
      },
      {
        label: 'Índice de Calor',
        data: [],
        borderColor: '#FFCE56',
        yAxisID: 'y2',
      },
    ],
  });

  const [chartDataHumidity, setChartDataHumidity] = useState({
    labels: [],
    datasets: [
      {
        label: 'Humidade (%)',
        data: [],
        borderColor: '#36A2EB',
        yAxisID: 'y',
      }
    ],
  });

  const [chartDataRainSoil, setChartDataRainSoil] = useState({
    labels: [],
    datasets: [
      {
        label: 'Chuva (%)',
        data: [],
        borderColor: '#FF6384',
        yAxisID: 'y',
      },
      {
        label: 'Humidade Solo (%)',
        data: [],
        borderColor: '#36A2EB',
        yAxisID: 'y1',
      },
    ],
  });


  useEffect(() => {
    async function getLeituras() {
        const response = await api.get('/items');

        const sortedData = response.data.sort((a, b) => {
            const dateA = a.timestamp.split('T')[0];
            const timeA = a.timestamp.split('T')[1];
            const dateB = b.timestamp.split('T')[0];
            const timeB = b.timestamp.split('T')[1];

            if (dateA !== dateB) {
                return dateA.localeCompare(dateB);
            } else {
                return timeA.localeCompare(timeB);
            }
        });

        setLeituras(sortedData);
    }

    async function getLastLeitura() {
        const response = await api.get('/items/last');
        setLastLeituras(response.data);
        setLastLoadTime(response.data.loadTime);
        setLastTemperature(response.data.temperature);
        setLastHumidity(response.data.humidity);
        setLastHotIndex(response.data.hotIndex);
        setLastRainValue(response.data.rainValue);
        setLastSoilHumidity(response.data.soilHumidity);
    }

    getLastLeitura();
    getLeituras();
  }, []);

  useEffect(() => {
    if (leituras.length > 0) {
      const labels = leituras.map((reading) => reading.timestamp);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Temperatura (ºC)',
            data: leituras.map((reading) => reading.temperature),
            borderColor: '#FF6384',
            yAxisID: 'y',
          },
          {
            label: 'Índice de Calor',
            data: leituras.map((reading) => reading.hotIndex),
            borderColor: '#FFCE56',
            yAxisID: 'y2',
          },
        ],
      });
      setChartDataHumidity({
        labels: labels,
        datasets: [
          {
            label: 'Humidade (%)',
            data: leituras.map((reading) => reading.humidity),
            borderColor: '#36A2EB',
            yAxisID: 'y1',
          },
        ],
      });
      setChartDataRainSoil({
        labels: labels,
        datasets: [
          {
            label: 'Chuva (%)',
            data: leituras.map((reading) => reading.rainValue),
            borderColor: '#FF6384',
            yAxisID: 'y',
          },
          {
            label: 'Humidade Solo (%)',
            data: leituras.map((reading) => reading.soilHumidity),
            borderColor: '#FFCE56',
            yAxisID: 'y2',
          },
        ],
      });
    }
  }, [leituras]);

  return (
    <>
      <Row>
        <Header />
      </Row>
      <Container fluid className="p-0" style={{ overflow: 'hidden', display: "flex", flexDirection: 'column', justifyContent: "center", maxWidth: "1450px" }}>
        <Row style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
          <Col
            sm="6"
            md="2"
            lg="2"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              maxWidth: '215px',
              maxHeight: '205px',
              padding: "30px"
            }}
          >
            <GaugeChart value={lastLoadTime} label={"Load Time"} />
          </Col>
          <Col
            sm="6"
            md="2"
            lg="2"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              maxWidth: '215px',
            }}
          >
            <GaugeChart value={lastTemperature.toFixed(2)} label={"Temperatura"}/>
          </Col>
          <Col
            sm="6"
            md="2"
            lg="2"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              maxWidth: '215px',
            }}
          >
            <GaugeChart value={lastHumidity.toFixed(2)} label={"Humidade"} />
          </Col>
          <Col
            sm="6"
            md="2"
            lg="2"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              maxWidth: '215px',
            }}
          >
            <GaugeChart value={lastHotIndex.toFixed(2)} label={"Índice Calor"} />
          </Col>
          <Col
            sm="6"
            md="2"
            lg="2"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              maxWidth: '215px',
            }}
          >
            <GaugeChart value={lastRainValue.toFixed(2)} label={"Chuva (%)"} />
          </Col>
          <Col
            sm="6"
            md="2"
            lg="2"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              maxWidth: '215px',
            }}
          >
            <GaugeChart value={lastSoilHumidity.toFixed(2)} label={"Humidade Solo (%)"} />
          </Col>
        </Row>
        <Row style={{marginLeft: "30px", marginRight: "30px", display: "flex", justifyContent: "center"}}>
          <Col
            sm="12"
            md="12"
            lg="7"
            className='campos'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '5px',
              padding: '5px',
              height: '350px', // Adjust the height as needed
            }}
          >
            <LineChart chartData={chartData} label={"Relação entre Temperatura e Índice de Calor (ºC)"} />
          </Col>
          <Col
            sm="12"
            md="12"
            lg="4"
          >
            <Row 
              className='campos'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px',
                height: "150px",
                marginTop: "5px",
            }}>
              <StepperChart chartData={chartDataHumidity} label={"Humidade (%)"}/>
            </Row>
            <Row   
              className='campos'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px',
                height: "150px",
                marginTop: "5px",
            }}>
              <LineChart chartData={chartDataRainSoil} label={"Relação entre Chuva e Humidade do Solo (%)"} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Graficos;
