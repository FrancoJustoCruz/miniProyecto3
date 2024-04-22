import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Components/NavComponent/Nav';
import staysData from './assets/stays.json';
import Card from './Components/CardComponent/Card';

function App() {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchGuests, setSearchGuests] = useState('');
  const [modalInputValue, setModalInputValue] = useState('');
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    setStays(staysData);
    setFilteredStays(staysData);
    
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
        <div className='oculto'>
          <span>{filteredStays.length} stays</span>
          <span>{searchText}</span>
          <span>Total guests: {totalGuests}</span>
        </div>
        {modalInputValue && <p>Location selected from Modal: {modalInputValue}</p>}
        
        <div className='cards-container'>
          {filteredStays.map((stay, index) => (
            <Card key={index} stay={stay} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;