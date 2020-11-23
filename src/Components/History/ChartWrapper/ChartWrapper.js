import React, {useState} from 'react';
import HistoryChart from './Chart/Chart';
import styled from 'styled-components';
import SERVER_URL from '../../../Utilities/variables';

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

    async function getDataFromRange(){
        const result = await fetch(SERVER_URL + 'api/history', {
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
            console.log(data)
            // setReadings();
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
                <button onClick={() => getDataFromRange()}>Pokaż</button>
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
            <HistoryChart
                from={dateRange.from}
                to={dateRange.to}
            />
        </div>
    )
}

export default ChartWrapper;