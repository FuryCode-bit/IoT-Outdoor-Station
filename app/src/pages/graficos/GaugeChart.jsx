import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-gauge-v3';

function GaugeChart({ value, label }) {
  const canvasRef = useRef(null);

  const getColor = (label, value) => {
    const ranges = {
      'Temperatura': { yellow: [25, 35], red: [35, Infinity] },
      'Load Time': { yellow: [5000, 10000], red: [10000, Infinity] },
      'default': { yellow: [50, 75], red: [75, Infinity] }
    };
  
    const { yellow, red } = ranges[label] || ranges['default'];
  
    if (value > yellow[0] && value < yellow[1]) {
      return 'orange';
    } else if (value >= red[0]) {
      return 'red';
    } else {
      return 'lightGreen';
    }
  };

  useEffect(() => {

    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: 'gauge',
      data: {
        datasets: [{
          value: value,
          minValue: 0,
          data: value <= 100 ? [25, 50, 75, 100] : [375, 750, 1125, 1500], // Adjust data points based on the maximum value
          backgroundColor: getColor(label, value),
          borderWidth: 0,
          cutout: '90%'
        }]
      },
      options: {
        needle: {
          radiusPercentage: 1,
          widthPercentage: 3.2,
          lengthPercentage: 80,
          color: 'rgba(0, 0, 0, 1)'
        },
        valueLabel: {
          display: true,
          formatter: (value) => {
            return value;
          },
          color: getColor(label, value),
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderRadius: 5,
          padding: {
            top: 10,
            bottom: 10
          }
        },
        plugins: {
          datalabels: {
            display: false
          }
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        aspectRatio: 1
      }
    });

    return () => {
      chart.destroy();
    };
  }, [value]);

  return (
    <div style={{ width: '350px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div className="texto" style={{ marginTop: '-25px', borderTop: "1px solid white", width: "200px", textAlign: "center" }}>
        <h6 style={{color: getColor(label, value), marginTop: "5px"}}>
          {label}
        </h6>
        </div>
    </div>
  );
}

export default GaugeChart;
