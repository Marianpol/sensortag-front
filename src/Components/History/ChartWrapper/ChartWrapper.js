import React, {useState, useEffect, useRef} from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

const Label = styled.label`
    padding: 0.5rem;
`
const InputDescription = styled.span`
    margin: auto 0.5rem;
`
const ParametersList = styled.div`
    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const parametersNames = {
    pressure: "Ciśnienie atmosferyczne",
    humidity: "Wilgotność",
    temperature: "Temperatura", 
    targetTemp: "Temperatura obiektu",
}

const ChartWrapper = () => {

    const [dateRange, setDateRange] = useState({
        from: getTodaysDate(),
        to: getTodaysDate(),
    })
    const [readings, setReadings] = useState();

    const canvasRef = useRef(null);

    async function getDataFromRange(){
        const result = await fetch('http://192.168.1.5:4444/history', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...dateRange
            })
        });
        
        const response = result.json();
        response.then((data) => {
            setReadings();
        })
    }

    function getTodaysDate() {
        return new Date().toISOString().slice(0,10);
        
    }

    function setDateFromRange (date){
        if(new Date(date).getTime() > new Date(dateRange.to).getTime()) {
            return false;
        }
        setDateRange({...dateRange, from: date});
        return true;
    }

    function setDateToRange (date){
        if(new Date(date).getTime() < new Date(dateRange.from).getTime()) {
            return false;
        }
        setDateRange({...dateRange, to: date});
        return true;
    }

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
    }, [])

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem'
            }}>
                <InputDescription>OD:</InputDescription>
                <input 
                    type="date"
                    value={dateRange.from} 
                    onChange={e => setDateFromRange(e.target.value)}
                    max={getTodaysDate()}
                    style={{}}
                />
                <InputDescription>DO:</InputDescription>
                <input 
                    type="date" 
                    value={dateRange.to}
                    onChange={e => setDateToRange(e.target.value)}
                    max={getTodaysDate()}
                />
            </div>
            <ParametersList>
                {Object.entries(parametersNames).map(([key, value]) => {
                    return (
                        <Label 
                            htmlFor={key}
                            key={key}
                        >
                        <input 
                            type="checkbox" 
                            id={key}
                            defaultChecked={true}
                            // onChange={handleExtendedMeasurements} 
                            // defaultChecked={showExtendedMeasurements}
                        />
                            {value}
                        </Label>
                )
                })}
            </ParametersList>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default ChartWrapper;