import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Components/HeaderComponent/Header';
import staysData from './assets/stays.json';

function App() {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchGuests, setSearchGuests] = useState('');
  const [modalInputValue, setModalInputValue] = useState('');
  const [totalGuests, setTotalGuests] = useState(0); // Cambiado a número, no string
  const options = ["Helsinki, Finland", "Turku, Finland", "Vaasa, Finland", "Oulu, Finland"];

  useEffect(() => {
    setStays(staysData);
    setFilteredStays(staysData);
    
    // Calcular el número total de huéspedes inicial y actualizar el estado
    const totalInitial = staysData.reduce((acc, stay) => acc + stay.maxGuests, 0);
    setTotalGuests(totalInitial);
  }, []);

  const filterStays = (location, guests) => {
    let filtered = staysData;
  
    if (location !== '') {
      const cityToSearch = location.includes(', Finland') ? location.replace(', Finland', '') : location;
      filtered = filtered.filter(stay => stay.city.startsWith(cityToSearch));
    }
  
    if (guests !== '') {
      filtered = filtered.filter(stay => stay.maxGuests >= parseInt(guests));
    }
  
    setFilteredStays(filtered);
  };
  const handleSearch = (text, totalGuests) => {
    setSearchText(text);
    setTotalGuests(totalGuests);
    filterStays(text, totalGuests);
  };
  
  const handleTotalGuestsChange = (total) => {
    setSearchGuests(total);
    filterStays(searchText, total);
  };
  const handleModalButtonClick = () => {
    filterStays(modalInputValue, searchGuests);
    setModalInputValue('');
  };

  return (
    <div className='mainContainer'>
      <Header onSearch={(text, totalGuests) => handleSearch(text, totalGuests)} onTotalGuestsChange={handleTotalGuestsChange} />
      <div className='mainComponent'>
        <h1>Stays in Finland</h1>
        <span>{filteredStays.length} stays</span>
        <span>{searchText}</span>
        <span>Total guests: {totalGuests}</span>
        {modalInputValue && <p>Location selected from Modal: {modalInputValue}</p>}
        
        <div className='cards-container'>
          {filteredStays.map((stay, index) => (
            <div key={index} className='card'>
              <div>
                <img src={stay.photo} alt={stay.title}/>
              </div>
              <div>
                <span>{stay.type}. {stay.beds} beds</span>
                {stay.superHost && <div>Super Host</div>}
              </div>
              <div>
                <span>{stay.rating}</span>
              </div>
              <div>
                {stay.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;