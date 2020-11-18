import React from 'react';
import styled from 'styled-components';
import Chart from 'chart.js';
import ChartWrapper from './ChartWrapper/ChartWrapper';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const History = () => {

    return (
        <Content>
            <h1>Historia pomiarów</h1>
            <ChartWrapper/>
        </Content>
    )
}

export default History;