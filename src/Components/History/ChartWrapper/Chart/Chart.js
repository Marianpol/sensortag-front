import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

const CanvasContainer = styled.div`
    margin: 10px 0;
    width: 80vw;
    height: 70vh;
`

const labelDict = {
    'pressure': "Ciśnienie [hPa]",
    'humidity': "Wilgotność [%]",
    'tempAmbient': "Temperatura [°C]",
    'tempTarget': "Temperatura obiektu [°C]",
}

const colors = ['#3e95cd', '#3cba9f', '#8e5ea2', '#e8c3b9'];
let charts = [];

const HistoryChart = ({from, to, readings, checkboxes}) => {

    const canvasRef = useRef(null);
    const [visibility, setVisibility] = useState({
        'pres': true,
        'humi': true,
        'temp': true,
    })

    function changeDatasetVisibility(states){
        console.log(charts[0])
        states.forEach((state, index) => {
            const meta = charts[0].chart.getDatasetMeta(index);
            meta.hidden = !state;
        })
      }

    const destroyChart = () => {
        if(charts.length){
          charts[0].destroy();
          charts.pop();
        }
      }
    
    useEffect(() => {
        destroyChart();

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
                hidden: !checkboxes[index]
            }
        })

        charts.push( new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
              datasets: datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
          })
        );
    }, [readings])

    useEffect(() => {
        charts[0].scales.humi.options.display = checkboxes[0];
        charts[0].scales.pres.options.display = checkboxes[1];
        charts[0].scales.temp.options.display = checkboxes[2] || checkboxes[3];
        if(Object.keys(readings).length){
            changeDatasetVisibility(checkboxes);       
        }
        charts[0].chart.update()

    }, [checkboxes])

    return ( 
        <CanvasContainer>
            <canvas ref={canvasRef}></canvas>
        </CanvasContainer>
    )
}

export default HistoryChart;