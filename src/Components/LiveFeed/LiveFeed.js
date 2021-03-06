import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ParameterContainer from './ParameterContainer/ParameterContainer';
import { Prompt } from 'react-router-dom';
import CustomizedSnackbar from '../Global/CustomizedSnackbar';

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
    exception: 'Default state',
};

let intervalId = '';

const LiveFeed = () => {

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
        exception: 'Default state',
    });
    const [readingsComparison, setReadingsComparison] = useState({
        pressure: 0, 
        humidity: 0,
        targetTemp: 0,
        ambientTemp: {
            p: 0, rh: 0, ir: 0,
        }
    })

    const [snackbarState , setSnackbarState] = useState({
        isOpen: false,
        text: 'Brak komunikacji z urządzeniem',
        type: 'error',
      });

    const [refreshRate, setRefreshRate] = useState(5);
    const [showExtendedMeasurements, setShowExtendedMeasurements] = useState(false);

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
        return comparedValues;
    }

    async function handleDataDownload(){
        const result = await fetch('api/live', {
            mode: 'cors',
            method: 'GET',
        })

        const response = result.json();
        response.then((readings) => {
            if (Object.keys(readings).length > 2){
                const newDataPackage = {
                    time: readings['time'],
                    exception: '',
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
                setSnackbarState({
                    ...snackbarState,
                    isOpen: true,
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

    const handleExtendedMeasurements = (event) => {
        setShowExtendedMeasurements(event.target.checked);
    }

    function runDataStream(interval){
        clearInterval(intervalId);
        intervalId = setInterval(handleDataDownload, interval);
    }

    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbarState,
            isOpen: false, 
        });
    }

    useEffect(() => {
        let defaultRefreshRate = refreshRate * 1000;
        runDataStream(defaultRefreshRate);
    }, [])

    return (
        <>
            <Header>Aktualne dane</Header>
            <div style={{textAlign: 'center'}}>
                <div>
                    Częstotliwość odświeżania (s)
                </div>
                <Select
                    value={refreshRate}
                    onChange={handleSelect}
                    style={{
                        minWidth: '5rem',
                        margin: '0.5rem 0',
                    }}
                >
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            <div>
                <label htmlFor="messureType">
                    <input 
                        type="checkbox" 
                        id='messureType' 
                        onChange={handleExtendedMeasurements} 
                        defaultChecked={showExtendedMeasurements}
                    />
                    Pomiar temperatury dla każdego z czujników
                </label>
            </div>
            </div>
            <div style={{
                display:'flex',
                justifyContent:'center',
                }}
            >
                <ParameterContainer 
                    showExtendedMeasurements={showExtendedMeasurements}
                    readings={dataPackage.readings}
                    diffs={readingsComparison}
                    defaultState={dataPackage.exception}
                />
            </div>
            <CustomizedSnackbar
                snackbarState={snackbarState}
                handleSnackbarClose={handleSnackbarClose}
            />
            <Prompt
                when={true}
                message={() => {
                    clearInterval(intervalId);
                }}/>
        </>
    )
}

export default LiveFeed;