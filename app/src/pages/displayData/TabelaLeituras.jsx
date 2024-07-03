import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import { Row } from 'reactstrap';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TabelaLeituras({ leiturasLista }) {
  const readingsByDay = {};
  leiturasLista.forEach((reading) => {
    const day = reading.timestamp.split('T')[0];
    if (!readingsByDay[day]) {
      readingsByDay[day] = {
        temperatureSum: 0,
        humiditySum: 0,
        hotIndexSum: 0,
        rainValueSum: 0,
        soilHumiditySum: 0,
        readings: [],
        count: 0,
      };
    }
    readingsByDay[day].temperatureSum += reading.temperature;
    readingsByDay[day].humiditySum += reading.humidity;
    readingsByDay[day].hotIndexSum += reading.hotIndex;
    readingsByDay[day].rainValueSum += reading.rainValue;
    readingsByDay[day].soilHumiditySum += reading.soilHumidity;
    readingsByDay[day].readings.push(reading);
    readingsByDay[day].count++;
  });

  const sortedDates = Object.keys(readingsByDay).sort((a, b) => new Date(a) - new Date(b));

  return (
    <Row style={{ maxWidth: "1400px", overflow: "auto" }}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: 'darkBlue' }}>
          <TableRow>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "25px" }}>Dia</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "25px" }}>Temperatura</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "45px" }}>Humidade</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "55px" }}>Índice de Calor</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "55px" }}>Chuva</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "65px" }}>Humidade do Solo</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "150px", paddingLeft: "55px" }}>Contagem</h4></TableCell>
            <TableCell align="center"><h4 style={{ color: '#FFF', width: "50px", paddingLeft: "15px" }}> </h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: '#1F2937' }}>
        {sortedDates.map((day) => {
            const averages = readingsByDay[day];
            const sortedReadings = averages.readings.sort((a, b) => {
              const timeA = a.timestamp.split('T')[1];
              const timeB = b.timestamp.split('T')[1];
              return timeA.localeCompare(timeB);
            });
            return (
              <React.Fragment key={day}>
                <TableRow style={{ padding: 0, color: '#FFF' }}>
                  <TableCell colSpan={8} style={{ padding: 0 }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color: "white"}}/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{ backgroundColor: '#1F2937' }}
                      >
                        <Table style={{ width: "100%" }}>
                          <TableBody style={{marginLeft:"20px", borderBottom: "none" }}>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {day}
                              </TableCell>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {(averages.temperatureSum / averages.count).toFixed(2)} ºC
                              </TableCell>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {(averages.humiditySum / averages.count).toFixed(2)} %
                              </TableCell>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {(averages.hotIndexSum / averages.count).toFixed(2)} ºC
                              </TableCell>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {(averages.rainValueSum / averages.count).toFixed(2)} %
                              </TableCell>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {(averages.soilHumiditySum / averages.count).toFixed(2)} %
                              </TableCell>
                              <TableCell align="center" style={{ color: '#FFF', width: "150px", borderBottom: "none" }}>
                                {averages.count} leituras
                              </TableCell>
                          </TableBody>
                        </Table>
                      </AccordionSummary>
                      <AccordionDetails style={{ color: '#FFF', backgroundColor: '#1F2937' }}>
                        <Table style={{ width: "100%"}}>
                          <TableBody>
                            {averages.readings.map((reading, index) => (
                              <TableRow key={index}>
                                <TableCell align="center" style={{ color: '#FFF', width: "120px" }}>
                                  {reading.timestamp.split('T')[1]}
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFF', width: "140px" }}>
                                  {reading.temperature.toFixed(2)} ºC
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFF', width: "130px" }}>
                                  {reading.humidity.toFixed(2)} %
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFF', width: "120px" }}>
                                  {reading.hotIndex.toFixed(2)} ºC
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFF', width: "130px" }}>
                                  {reading.rainValue.toFixed(2)} %
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFF', width: "130px" }}>
                                  {reading.soilHumidity.toFixed(2)} %
                                </TableCell>
                                <TableCell align="center" style={{ color: '#FFF', width: "140px" }}>
                                  {/* Additional content if needed */}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </Row>
  );
}
