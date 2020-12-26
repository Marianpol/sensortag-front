import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js';
    // "Ciśnienie [hPa]": [1008.43, 1000.43, 1003.44, 1012.32, 1004.53, 1002.53, 1004.22, 1032.35, 1003.22, 1002.44],

const dataExample = {
    "Wilgotność [%]": [32.55, 22.66, 82.57, 20.95, 3.70, 23.23, 91.94, 32.49, 44.53, 40.21],
    "Temperatura [°C]": [32.55, 23.55, 22.66, 12.33, 13.55, 22.87, 22.12, 14.45, 12.82, 17.54],
    "Temperatura obiektu [°C]": [38.55, 31.43, 12.34, 43.21, 32.55, 12.43, 32.12, 43.32, 12.44, 51.43],
}

const colors = ['#3e95cd', '#3cba9f', '#8e5ea2', '#e8c3b9'];
let myChart;

const HistoryChart = ({from, to}) => {

    const canvasRef = useRef(null);
    const ctx = null;

    useEffect(() => {
        if(myChart){
            myChart.destroy();
            myChart = 0;
        }
        const ctx = canvasRef.current.getContext('2d');
        const datasets = Object.entries(dataExample).map(([key, value], index) => {
            return {
                data: value,
                label: key,
                borderColor: colors[index],
                fill: false,
                lineTension: 0,
            }
        })
    
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: ['15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00'],
              datasets: datasets,
            },
            options: {
              title: {
                display: true,
                text: `Dane z okresu ${from} do ${to}`
              }
            }
          });
    }, [from, to])

    return ( 
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}

export default HistoryChart;