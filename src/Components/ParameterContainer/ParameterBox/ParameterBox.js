import React from 'react';
import styled from 'styled-components'
import Content from '../../Content';

const Container = styled.div`
    width: 33.3%;
    
    @media (max-width: 768px){
        width: 100%;
    }
`
const Wrapper = styled.div`
    height: 30%;
    box-shadow: 0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15);
    padding: 2rem;
    margin: 1rem;
    border-radius: 10px;

    @media (max-width: 1200px){
        padding-bottom: 3rem;
    }

    @media (max-width: 900px){
        padding-bottom: 4rem;
    }

    @media (max-width: 768px){
        padding-bottom: 2.5rem;
    }
    
`
const ArrowUp = styled.div`
    width: 0;
    height: 0;
    margin: auto 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid green;
`
const ArrowDown = styled.div`
    width: 0;
    height: 0;
    margin: auto 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-Top: 15px solid red;
`
const Equal = styled.div`
    width: 1.5rem;
    height: 0;
    margin: auto 0;
    border-bottom: 5px solid black;
`

const ParameterBox = ({description, value, unit, difference}) => {

    return (
        <Container>
            <Wrapper>
                <span style={{
                    display: 'flex',
                    justifyContent: 'center',}}>
                    {description}
                </span>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem'}}>
                    <div style={{
                        marginRight: '1rem',}}>
                        {value} {unit}
                    </div>
                    {(() => {
                        if(difference > 0){
                            return <ArrowUp/>;
                        }
                        else if(difference < 0){
                            return <ArrowDown/>;
                        }
                        else {
                            return <Equal/>;
                        }
                    })()}
                </div>
            </Wrapper>
        </Container>
    )
}

export default ParameterBox;