import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ParameterContainer from './ParameterContainer/ParameterContainer';

const StyledSection = styled.section`
`
const Header = styled.h1`
    text-align: center;
    font-size: 2rem;
`

let previousState = {
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
};

let intervalId = '';

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
    const [readingsComparison, setReadingsComparison] = useState({
        pressure: 0, 
        humidity: 0,
        targetTemp: 0,
        ambientTemp: {
            p: 0, rh: 0, ir: 0,
        }
    })

    const [refreshRate, setRefreshRate] = useState(5);

    function getReadingsComparison(currentReadings) {
        const comparedValues = {};
        const ambientTempComparison = {};

        Object.keys(currentReadings).forEach((key) => {
            if (typeof currentReadings[key] === 'object') {
                Object.keys(currentReadings[key]).forEach((innerKey) => {
                    const previousValue = previousState.readings[key][innerKey];
                    const currentValue = currentReadings[key][innerKey];
                    const result = currentValue - previousValue;

                    ambientTempComparison[innerKey] = result.toFixed(2);
                })
                comparedValues[key] = ambientTempComparison;
            }
            else {
                const result = currentReadings[key] - previousState.readings[key];
                comparedValues[key] = result.toFixed(2);
            }
        })
        console.log(comparedValues)
        return comparedValues;
    }

    async function handleDataDownload(){
        const result = await fetch('http://192.168.1.5:4444/', {
            mode: 'cors',
            method: 'GET',
        })

        const response = result.json();
        response.then((readings) => {
            if (Object.keys(readings).length > 2){
                const newDataPackage = {
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
                }
                setReadingsComparison(getReadingsComparison(newDataPackage.readings));
                setDataPackage(newDataPackage);
                previousState = newDataPackage;
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

    const handleSelect = (event) => {
        const secondsRefreshRate = event.target.value * 1000;
        setRefreshRate(event.target.value);
        runDataStream(secondsRefreshRate);
    }


    function runDataStream(interval){
        clearInterval(intervalId);
        intervalId = setInterval(handleDataDownload, interval);
    }

    useEffect(() => {
        runDataStream();
    }, [])

    return (
        <main>
            <StyledSection>
                <Header>Aktualne dane</Header>
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                    }}
                >
                    <ParameterContainer 
                        readings={dataPackage.readings}
                        diffs={readingsComparison}
                    />
                </div>
                <div style={{marginLeft: '1rem'}}>
                    <div>
                        Częstotliwość odświeżania (s)
                    </div>
                    <Select
                        value={refreshRate}
                        onChange={handleSelect}
                    >
                        <MenuItem value={1.5}>1.5</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </div>
                <p>{dataPackage.exception}</p>
            </StyledSection>
        </main>
    )
}

export default Content;