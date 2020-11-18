import { useState, useEffect } from 'react';

const isNarrowerThan = (width) => {
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
    return mediaQuery.matches;
}

function useWidthClue(width) {
    const [isNarrower, setIsNarrower] = useState(isNarrowerThan(width));

    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => 
                setIsNarrower(isNarrowerThan(width)), 20);
        }
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    return isNarrower;
}

export default useWidthClue;