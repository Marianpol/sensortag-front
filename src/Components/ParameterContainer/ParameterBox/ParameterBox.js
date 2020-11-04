import React from 'react';
import styled from 'styled-components'

const StyledBox = styled.div`
    width: 100%;
    height: 30%;
    box-shadow: 0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15);
    padding: 2rem;
    margin: 1rem;
`

const ParameterBox = ({description, value, unit}) => {

    return (
        <StyledBox>
            <p>{description}</p>
            <p>{value} {unit}</p>
        </StyledBox>
    )
}

export default ParameterBox;