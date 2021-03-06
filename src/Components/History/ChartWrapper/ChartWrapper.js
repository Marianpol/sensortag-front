import React, {useState} from 'react';
import HistoryChart from './Chart/Chart';
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
    const [readings, setReadings] = useState({});
    const [checkboxesState, setCheckboxesState] = useState(
        Array.from(Object.keys(parametersNames), name => true)
    );

    async function getDataFromRange(){
        const result = await fetch('api/history', {
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
            setReadings(parseReadings(data))
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

    function changeCheckboxesState(id){
        const tempCheckboxesState = Array.from(checkboxesState);
        tempCheckboxesState[id] = !tempCheckboxesState[id];
        setCheckboxesState(tempCheckboxesState);
      }

    function parseReadings(data){
        const readyReadings = {};
        const pressure = [],
              humidity = [],
              targetTemp = [], 
              ambientTemp = [], 
              date = [];

        data.forEach((item) => {
            pressure.push(item[0])
            humidity.push(item[1])
            targetTemp.push(item[2])
            ambientTemp.push(item[3])
            date.push(item[4])
        })
        readyReadings['pressure'] = pressure;
        readyReadings['humidity'] = humidity;
        readyReadings['tempAmbient'] = ambientTemp;
        readyReadings['tempTarget'] = targetTemp;
        readyReadings['labels'] = date;

        return readyReadings;
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem'
            }}>
                <ParametersList>
                    {Object.entries(parametersNames).map(([key, value], i) => {
                        return (
                            <Label 
                                htmlFor={key}
                                key={key}
                            >
                            <input 
                                type="checkbox" 
                                id={key}
                                checked={checkboxesState[i]}
                                onChange={e => changeCheckboxesState(i)}
                            />
                                {value}
                            </Label>
                    )
                    })}
                </ParametersList>
            </div>
            <HistoryChart
                from={dateRange.from}
                to={dateRange.to}
                readings={readings}
                checkboxes={checkboxesState}
            />
        </div>
    )
}

export default ChartWrapper;