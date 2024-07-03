import React, { useEffect, useState, useContext } from "react";
// import api from "../../api/api";
import "./leitura.css";

function Leitura({ timestamp, loadTime, temperature, humidity, hotIndex, rainValue, soilHumidity }) {
  
    return (
        <div className="container">
        <button id="btn-Info">
          <div className="avatar">
            <h3>{timestamp}</h3>
          </div>
          <div id='mid'>
            <h4>Hot Index: {parseFloat(hotIndex).toFixed(2)}ºC</h4>
            <h4>Humidity: {parseFloat(humidity).toFixed(2)}%</h4>
            <h4>Rain Value: {parseFloat(rainValue).toFixed(2)}%</h4>
            <h4>Soil Humidity: {parseFloat(soilHumidity).toFixed(2)}%</h4>
            <h4>Temperature: {parseFloat(temperature).toFixed(2)}ºC</h4>
          </div>
        </button>
      </div>
    );
  }
export default Leitura;