import React from 'react';

const Home = () => {
    return (
    <div style={{textAlign:'center'}}>
        <div>
            <h1>Odczyt podstawowych parametrów meterologicznych z wykorzystaniem SensorTag i RaspberryPi</h1>
        </div>
        <div style={{marginTop: '5rem'}}>
            <p>Przy pierszwym uruchomieniu aplikacji odwiedź zakładkę "Ustawienia", aby skonfigurować urządzenie.</p>
            <p>Proszę pamiętać o uruchomieniu urządzenia fizycznym przyciskiem</p>
        </div>
    </div>
    )
}

export default Home;