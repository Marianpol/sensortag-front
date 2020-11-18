import React from 'react';

const Chart = () => {

    // const drawCharts = useCallback(() => {
    //     let datasets = dataWithoutTime.data.map((dataset, index) => {
    //         const beginIndex = dataWithoutTime.names[index].indexOf('[');
    //         const endIndex = dataWithoutTime.names[index].indexOf(']');
            
    //       return {
    //         label: dataWithoutTime.names[index],
    //         yAxisID: dataWithoutTime.names[index].substring(beginIndex + 1, endIndex),
    //         borderColor: colors[index],
    //         backgroundColor: colors[index],
    //         hidden: !checkboxesState[index],
    //         data: dataset,
    //         fill: false,
    //         pointRadius: 0,
    //         borderWidth: 1,
    //         lineTension: 0,
    //       }
    //     })
    
    //     let yAxes = dataWithoutTime.names.map((name) => {
    //       return {
    //         id: name.substring(name.indexOf('[') + 1, name.indexOf(']')),
    //         display: false,
    //       }
    //     })
    
    //     charts.push(new Chart(canvasRef.current.getContext("2d"), {
    //       type: "LineWithLine",
    //       data: {
    //         labels: time,
    //         datasets,
    //         userEvents: userEventsArray,
    //       },
    //       options: {
    //         animation: {
    //           duration: 0,
    //         },
    //         responsiveAnimationDuration: 0,
    //         legend:{
    //           display: false,
    //         },
    //         tooltips: {
    //           position: 'center',
    //           mode: 'index',
    //           intersect: false,
    //           axis: 'x',
    //           caretSize: 0,
    //           callbacks: {
    //             label: function (tooltipItem, data){
    //               if (data.datasets[tooltipItem.datasetIndex].label.startsWith('ET') && Object.keys(statesDatasets).length){
    //                 return `${data.datasets[tooltipItem.datasetIndex].label}: ${statesDatasets[data.datasets[tooltipItem.datasetIndex].label][tooltipItem.index]}`;
    //               }
    //               else{
    //                 return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.yLabel}`;
    //               }
    //             },
    //             title: function(item, data) {
    //               const labelIndex = item[0].index;
    //               if(data.userEvents[labelIndex]){
    //                 return data.labels[labelIndex] + ' ' + data.userEvents[labelIndex] ;
    //               }
    //               return data.labels[labelIndex];
    //             },
    //           },
    //         },
    //         plugins: {
    //           zoom: {
    //             zoom:{
    //               enabled: true,
    //               mode: 'x',
    //               speed: 0.20,
    //               sensitivity: 0,
    //             },
    //             pan:{
    //               enabled: true,
    //               mode: 'x',
    //               speed: 50000,
    //             },
    //           },
    //         },
    //         // scales:{
    //         //   yAxes: [{
    //         //     ticks:{
    //         //       callback: function(value){
    //         //         if (this.chart.config.data.datasets[0].label.startsWith('ET') && Object.keys(statesDatasets).length){
    //         //           if(statesStringDict[this.chart.config.data.datasets[0].label][value]){
    //         //             return statesStringDict[this.chart.config.data.datasets[0].label][value];
    //         //           }
    //         //         }
    //         //         else {
    //         //           return value;
    //         //         }
    //         //       }
    //         //     },
    //         //   }],
    //         // },
    //         scales: {
    //           yAxes,
    //           xAxes:[{
    //             ticks: {
    //               maxTicksLimit: 10,
    //             },
    //           }],
    //         },
    //         maintainAspectRatio: false,
    //         // aspectRatio: 0.5,
    //       },
    //     }));
    //   }, [time, dataWithoutTime, statesDatasets]);

    return ( 
        <>
        
        </>
    )
}

export default Chart;