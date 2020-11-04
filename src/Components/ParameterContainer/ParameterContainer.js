import React from 'react';
import styled from 'styled-components'
import ParameterBox from './ParameterBox/ParameterBox';

const descriptions = [
    'Ciśnienie atmosferyczne',
    'Wilgotność',
    'Temperatura obiektu',
    'Temperatura otoczenia zmierzona przez barometr',
    'Temperatura otoczenia zmierzona przez czujnik wilgotności',
    'Temperatura otoczenia zmierzona przez czujnik podczerwieni'
]
const units = {
    temperature: '°C',
    pressure: 'hPa', 
    humidity: '%',
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ParameterContainer = ({
    readings: {
        pressure,
        humidity,
        targetTemp,
        ambientTemp: {
            p, rh, ir,
        }, 
    }
}) => {
    
    return (
        <Container>
            <div style={{display: 'flex'}}>
                <ParameterBox 
                    description={descriptions[0]}
                    value={pressure}
                    unit={units.pressure}
                    />
                <ParameterBox 
                    description={descriptions[1]}
                    value={humidity}
                    unit={units.humidity}
                    />
                <ParameterBox 
                    description={descriptions[2]}
                    value={targetTemp}
                    unit={units.temperature}
                    />
            </div>
            <div style={{display: 'flex'}}>
                <ParameterBox 
                    description={descriptions[3]}
                    value={p}
                    unit={units.temperature}
                    />
                <ParameterBox 
                    description={descriptions[4]}
                    value={rh}
                    unit={units.temperature}
                    />
                <ParameterBox 
                    description={descriptions[5]}
                    value={ir}
                    unit={units.temperature}
                    />
            </div>
        </Container>
    )
}

export default ParameterContainer;