import React, {useState} from 'react';
import styled from 'styled-components';
import CustomizedSnackbar from '../../Global/CustomizedSnackbar';

export const StyledButton = styled.button`
    text-align: center;
    cursor: ${({disabled}) => disabled ? 'wait' : 'pointer'};
    padding: 5px;
    margin: 1rem 0 0.5rem;
    border: 1px solid rgb(204, 65, 0);
    border-radius: 3px;
    font-weight: 600;
    background-color: ${({disabled}) => disabled ? 'rgb(224, 224, 224)' : 'rgb(204, 65, 0)'} ;
    color: #FFF;
    transition: 0.4s ease;

    &:hover {
        background-color: ${({disabled}) => disabled ? 'rgb(192, 192, 192)' : 'rgb(146, 46, 0)'} ;
        border-color: rgb(146, 46, 0);
        box-shadow: 0 5px 7px rgb(200,200,200);
    }
`
const TableContainer = styled.div`
    background-color: #F0F0F0;
    border: 2px solid #F0F0F0;
    border-radius: 5px;
`

const StyledTable = styled.table`
    padding: 0.5rem;
    border-collapse: collapse;
`

const StyledBody = styled.tbody`
    background-color: #FFF;
`

const StyledRow = styled.tr`
    border: 2px solid #F0F0F0;
`

const StyledHeader = styled.th`
    padding: 1rem;
`

const StyledDataCell = styled.td`
    padding: 1rem;
`

const DevicesBox = ({setInputValue}) => {

    const [devices, setDevices] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [snackbarState , setSnackbarState] = useState({
        isOpen: false,
        text: 'Nie można pobrać danych.',
        type: 'error',
      });

    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbarState,
            isOpen: false, 
        });
    }

    async function getDevices() {
        setDevices([]);
        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 5000);

        const result = await fetch('api/getDevices', {
            mode: 'cors',
            method: 'GET',
        })

        const response = result.json();
        response.then((data) => {
            setDevices(Object.entries(data).map(([key,value]) => {
                return [key, value];
            }))
        })
        .catch(() => {
            setSnackbarState({
                isOpen: true,
                text: 'Nie można pobrać danych.',
                type: 'error'
              })
        })
        .finally(() => {
            setIsButtonDisabled(false);
        })
    }

    return (
        <div style={{textAlign: 'center'}}> 
            <TableContainer>
                <StyledTable>
                    <StyledBody>
                        <StyledRow>
                            <StyledHeader>Adres urządzenia</StyledHeader>
                            <StyledHeader>Nazwa urządzenia</StyledHeader>
                        </StyledRow>
                            {devices.map(([address, name]) => {
                                return (
                                    <StyledRow 
                                        key={address}
                                        onClick={() => setInputValue(address)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <StyledDataCell>{address}</StyledDataCell>
                                        <StyledDataCell>{name}</StyledDataCell>
                                    </StyledRow>
                                    )
                            })}
                    </StyledBody>
                </StyledTable>
                <StyledButton 
                    onClick={getDevices}
                    disabled={isButtonDisabled}
                >
                    Szukaj urządzeń
                </StyledButton>
            </TableContainer>
            <CustomizedSnackbar
                snackbarState={snackbarState}
                handleSnackbarClose={handleSnackbarClose}
            />
        </div>
    )
}

export default DevicesBox;