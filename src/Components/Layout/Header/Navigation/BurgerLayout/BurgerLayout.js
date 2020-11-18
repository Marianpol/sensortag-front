import React, {useState} from 'react';
import BurgerNavigation from './BurgerNavigation/BurgerNavigation';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    margin: 1rem;
    z-index: 3;
    cursor: pointer;

    div {
        height: 0.25rem;
        margin: 0.5rem 0;
        background-color: #000;
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.7s linear;

        &:nth-child(1) {
            transform: ${({open}) => open ? 'rotate(45deg) scale(1.12, 1)' : 'rotate(0)'};
        }

        &:nth-child(2) {
            opacity: ${({open}) => open ? 0 : 1};
        }

        &:nth-child(3) {
            transform: ${({open}) => open ? 'rotate(-45deg) scale(1.12, 1)' : 'rotate(0)'};
        }

    }
`;

function BurgerLayout ({menu}){

    const [open, setOpen] = useState(false);

    BurgerLayout.handleClickOutside = () => setOpen(false);

    return (
        <>
            <StyledBurger
              open={open}
              onClick={() => setOpen(!open)}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
            <BurgerNavigation
                open={open}
                setOpen={setOpen}
                menu={menu}/>
        </>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => BurgerLayout.handleClickOutside,
};

export default onClickOutside(BurgerLayout, clickOutsideConfig);