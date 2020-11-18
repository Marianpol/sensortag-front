import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

// import randomString from '../../../../../../Utilities/functions/randomString';

const Sidebar = styled.div`
    position: absolute;
    top: 0;
    width: 30%;
    height: 100%;
    background-color: #FFF;
    transition: all 1s;
    z-index: 3;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
    
    @media (max-width:1000px) {
        width: 50%;
    }

    @media (max-width:768px) {
        width: 100%;
    }
`
const Navigation = styled.nav`
    display: flex;
    flex-direction: column;
    text-align: center;
`
const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: #000;
    font-size: 1.5rem;
    margin-top: 3rem;
`
const BurgerNavigation = ({open, setOpen, menu}) => {
    return (
        <Sidebar open={open}>
            <CloseIcon 
                style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    fontSize: 50,
                    right: 0,
                    marginRight: '0.5rem',
                    }}
                onClick={() => setOpen(!open)}
            />
            <Navigation>
                {menu.map(([key, value]) => {
                    return <StyledNavLink 
                                to={key}
                                key={key}
                            >
                            {value}
                        </StyledNavLink>
                })}
            </Navigation>
        </Sidebar>
    )
}

export default BurgerNavigation;