import React from 'react';

const Home = () => {
    return (
    <div style={{textAlign:'center'}}>
        <div>
            <h1>Odczyt podstawowych parametrów meterologicznych z wykorzystaniem SensorTag i RaspberryPi</h1>
            <h2>Praca inżynierska</h2>
            <h2>Marcin Musiał</h2>
            <h3>Uniwersytet Technologiczno-Przyrodniczy w Bydgoszczy</h3>
            <h3>Wydział Telekomunikacji, Informatyki i Elektrotechniki</h3>
            <h4>2021</h4>
        </div>
        <div style={{marginTop: '5rem'}}>
            <p>Przy pierszwym uruchomieniu aplikacji odwiedź zakładkę "Ustawienia", aby skonfigurować urządzenie.</p>
            <p>Proszę pamiętać o uruchomieniu urządzenia fizycznym przyciskiem</p>
        </div>
    </div>
    )
}

export default Home;