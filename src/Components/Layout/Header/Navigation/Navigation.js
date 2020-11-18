import React from 'react';
import useWidthClue from '../../../../Utilities/hooks/useWidthClue';
import BurgerLayout from './BurgerLayout/BurgerLayout';

const navLinks = [
    ['/live', 'AKTULANE DANE'],
    ['/history', 'DANE HISTORYCZNE'],
    ['/settings', 'USTAWIENIA'],
    ]

const Navigation = () => {

    const isMobile = useWidthClue(500);

    return (
        <>
            <BurgerLayout 
                menu={navLinks}
                isMobile={isMobile}/> 
        </>
    )
}

export default Navigation;