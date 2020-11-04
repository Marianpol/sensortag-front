import React, { useEffect, useState } from 'react';
import ParameterContainer from './ParameterContainer/ParameterContainer';

const Content = () => {

    const [dataPackage, setDataPackage] = useState({
        time: toString(Date.now()),
        readings: {
            pressure: 0, 
            humidity: 0,
            targetTemp: -273,
            ambientTemp: {
                p: -273, rh: -273, ir: -273,
            }
        },
        exception: '',
    });

    async function handleDataDownload(){
        const result = await fetch('http://192.168.1.24:4444/', {
            mode: 'cors',
            method: 'GET',
        })

        const response = result.json();
        response.then((readings) => {
            if (Object.keys(readings).length > 2){
                setDataPackage({
                    time: readings['time'],
                    readings:{
                        pressure: readings['pressure'],
                        humidity: readings['humidity'],
                        targetTemp: readings['irTargetTemp'],
                        ambientTemp: {
                            p: readings['barometerSensorAmbientTemp'],
                            rh: readings['humiditySensorAmbientTemp'],
                            ir: readings['irSensorAmbientTemp'],
                        },
                    }
                });
            }
            else {
                setDataPackage({
                    ...dataPackage,
                    time: readings['time'],
                    exception: readings['exception'],
                })
            }
        })
        .catch((e) => {
            console.log(e);
        })

        return true;
    }

    function runDataStream(){
        setInterval(handleDataDownload, 5000)
    }

    useEffect(() => {
        runDataStream();
    }, [])

    return (
        <main>
            <section>
                <ParameterContainer 
                    readings={dataPackage.readings}/>
                <p>{dataPackage.exception}</p>
            </section>
        </main>
    )
}

export default Content;