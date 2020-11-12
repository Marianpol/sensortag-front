import React from 'react';
import styled from 'styled-components'
import ParameterBox from './ParameterBox/ParameterBox';

const descriptions = [
    'Ciśnienie atmosferyczne',
    'Wilgotność',
    'Temperatura obiektu',
    'Temperatura otoczenia zmierzona przez barometr',
    'Temperatura otoczenia zmierzona przez czujnik wilgotności',
    'Temperatura otoczenia zmierzona przez czujnik podczerwieni',
    'Temperatura',
]
const units = {
    temperature: '°C',
    pressure: 'hPa', 
    humidity: '%',
}

const Container = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const ParameterRow = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const ParameterContainer = ({
    showExtendedMeasurements,
    diffs,
    readings: {
        pressure,
        humidity,
        targetTemp,
        ambientTemp: {
            p, rh, ir,
        }, 
    }
}) => {

    const ambientTemp = [p, ir, ir];

    const getAverage = (temperatures) => {
        const parsedTemperatures = temperatures.map((temp) => {
            return parseFloat(temp);
        })
        const sumOfAllElements = parsedTemperatures.reduce((function(sum, value){
            return sum + value;
        }))
        const average = (sumOfAllElements / parsedTemperatures.length).toFixed(2);
        console.log(temperatures, sumOfAllElements, average);
        return average;
    }
    
    return (
        <Container>
            <ParameterRow>
                <ParameterBox 
                    description={descriptions[0]}
                    value={pressure}
                    unit={units.pressure}
                    difference={diffs.pressure}
                    />
                <ParameterBox 
                    description={descriptions[1]}
                    value={humidity}
                    unit={units.humidity}
                    difference={diffs.humidity}
                    />
                <ParameterBox 
                    description={descriptions[2]}
                    value={targetTemp}
                    unit={units.temperature}
                    difference={diffs.targetTemp}
                    />
                {showExtendedMeasurements ? null: 
                    <ParameterBox 
                    description={descriptions[6]}
                    value={getAverage(ambientTemp)}
                    unit={units.temperature}
                    difference={getAverage(Object.values(diffs.ambientTemp))}
                    />
                }
            </ParameterRow>
            {showExtendedMeasurements ? 
                <ParameterRow>
                    <ParameterBox 
                        description={descriptions[3]}
                        value={p}
                        unit={units.temperature}
                        difference={diffs.ambientTemp.p}
                        />
                    <ParameterBox 
                        description={descriptions[4]}
                        value={rh}
                        unit={units.temperature}
                        difference={diffs.ambientTemp.rh}
                        />
                    <ParameterBox 
                        description={descriptions[5]}
                        value={ir}
                        unit={units.temperature}
                        difference={diffs.ambientTemp.ir}
                        />
                </ParameterRow>   
            :null
            }
        </Container>
    )
}

export default ParameterContainer;