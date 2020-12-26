import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import DevicesBox from './DevicesBox/DevicesBox'
import CustomizedSnackbar from '../Global/CustomizedSnackbar';

const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledInput = styled.input`
    cursor: ${({disabled}) => disabled ? 'wait' : 'pointer'};
    padding: 5px;
    margin: 0 0.3rem;
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
const AddressFrom = styled.form`
    display: flex;
    margin-bottom: 2rem;

    @media (max-width:450px){
        flex-direction: column;
    }
`
const StyledHeader = styled.h1`
    font-size: 2rem;
`

const Settings = () => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [snackbarState , setSnackbarState] = useState({
        isOpen: false,
        text: 'Nie można ustawić adresu urządzenia.',
        type: 'error',
      });

    const macAddressRef = useRef(null);

    const handleAddressInput = (event) => {
        event.preventDefault();
        setDeviceAddress(event.target[0].value.toUpperCase());
    }

    const onInvalidInput = (event) => {
        event.target.setCustomValidity('Format adresu jest nieprawidłowy.')
    }

    const setInputValue = (value) => {
        macAddressRef.current.value = value;
    }
    
    const handleSnackbarClose = () => {
        setSnackbarState({
            ...snackbarState,
            isOpen: false, 
        });
    }

    async function setDeviceAddress(address) {
        setIsButtonDisabled(true);

        const result = await fetch('api/setDeviceAddress', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address,
            })
        })
        const response = result.json();
        response.then(() => {
            setSnackbarState({
                isOpen: true, 
                text: 'Adres urządzenia został zapisany', 
                type: 'success'
            });
        })
        .catch(() => {
            setSnackbarState({
                isOpen: true,
                text: 'Nie można ustawić adresu urządzenia.',
                type: 'error',
            });
        })
        .finally(() => {
            setIsButtonDisabled(false);
        })
    }

    async function getDeviceAddress() {
        const result = await fetch('api/getDeviceAddress', {
            mode: 'cors',
            method: 'GET',
        })

        const response = result.json();
        response.then((device) => {
            setInputValue(device.address);
        })
        .catch(() => {
            setSnackbarState({
                isOpen: true,
                text: 'Nie można pobrać adresu urządzenia.',
                type: 'error',
            });
        })
    }

    useEffect(() => {
        getDeviceAddress();
    }, [])

    return (
        <SettingsWrapper>
            <StyledHeader>Ustawienia urządzenia</StyledHeader>
            <AddressFrom onSubmit={e => handleAddressInput(e)}>
                <div style={{paddingBottom: '1rem'}}>
                    <label 
                        htmlFor="macAddress"
                        style={{
                            margin: '0 0.3rem',
                            alignSelf: 'center',
                        }}
                    >
                        Adres urządzenia:
                    </label>
                    <input 
                        id="macAddress"
                        ref={macAddressRef}
                        placeholder="01:23:45:67:89:AB" 
                        pattern="^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$"
                        onInvalid={e => onInvalidInput(e)}
                        style={{margin: '0 0.3rem'}}
                    />
                </div>
                <div style={{textAlign: 'center'}}>
                    <StyledInput 
                        type="submit" 
                        value="Ustaw adres" 
                        disabled={isButtonDisabled}
                    />
                </div>
            </AddressFrom>
            <DevicesBox
                setInputValue={setInputValue}
            />
        <CustomizedSnackbar
            snackbarState={snackbarState}
            handleSnackbarClose={handleSnackbarClose}
        />
        </SettingsWrapper>
    )
}

export default Settings;