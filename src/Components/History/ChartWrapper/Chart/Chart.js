import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

const CanvasContainer = styled.div`
    margin: 10px 0;
    width: 80vw;
    height: 60vh;
`

const labelDict = {
    'pressure': "Ciśnienie [hPa]",
    'humidity': "Wilgotność [%]",
    'tempAmbient': "Temperatura [°C]",
    'tempTarget': "Temperatura obiektu [°C]",
}

const colors = ['#3e95cd', '#3cba9f', '#8e5ea2', '#e8c3b9'];
let myChart;

const HistoryChart = ({from, to, readings}) => {

    const canvasRef = useRef(null);
    const ctx = null;
    const [visibility, setVisibility] = useState({
        'pres': true,
        'humi': true,
        'temp': true,
    })
    
    useEffect(() => {
        if(myChart){
            myChart.destroy();
            myChart = 0;
        }
        const ctx = canvasRef.current.getContext('2d');

        const {labels, ...data} = readings;
        const datasets = Object.entries(data).map(([key, value], index) => {
            return {
                data: value,
                label: labelDict[key],
                yAxisID: key.slice(0, 4),
                borderColor: colors[index],
                backgroundColor: colors[index],
                fill: false,
                lineTension: 0,
            }
        })
    
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
              datasets: datasets,
            },
            options: {
                aspectRatio: 2,
                title: {
                    display: true,
                    text: `Dane z okresu ${from} do ${to}`
                },
                scales: {
                    yAxes: [{
                        id: 'pres',
                        display: visibility.pres,
                    }, {
                        id: 'humi',
                        display: visibility.humi,
                    }, {
                        id: 'temp',
                        display: visibility.temp,
                        position: 'right'
                    }],
                xAxes:[{
                    ticks: {
                        maxTicksLimit: 10,
                  },
                }],
              },
            }
          });
    }, [from, to, readings])

    return ( 
        <CanvasContainer>
            <canvas ref={canvasRef}></canvas>
        </CanvasContainer>
    )
}

export default HistoryChart;