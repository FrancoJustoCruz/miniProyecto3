import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ onClose, onSearch, filterStays, onTotalGuestsChange }) {
  const options = ["Helsinki, Finland", "Turku, Finland", "Vaasa, Finland", "Oulu, Finland"];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [adultCounter, setAdultCounter] = useState(0);
  const [childrenCounter, setChildrenCounter] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false); // Nuevo estado

  useEffect(() => {
    setTotalGuests(adultCounter + childrenCounter);
  }, [adultCounter, childrenCounter]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAdultIncrement = () => {
    setAdultCounter(adultCounter + 1);
  };

  const handleAdultDecrement = () => {
    if (adultCounter > 0) {
      setAdultCounter(adultCounter - 1);
    }
  };

  const handleChildrenIncrement = () => {
    setChildrenCounter(childrenCounter + 1);
  };

  const handleChildrenDecrement = () => {
    if (childrenCounter > 0) {
      setChildrenCounter(childrenCounter - 1);
    }
  };

  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchText.toLowerCase()));

  const handleOptionClick = (option) => {
    setSearchText(option);
  };

  const handleButtonClick = () => {
    setIsCounterVisible(!isCounterVisible);
    if (onTotalGuestsChange) {
      onTotalGuestsChange(totalGuests); // Llama a la función de cambio de total de huéspedes
    }
  };

  const handleSearchButtonClick = () => {
    setSearchClicked(true); // Indica que se hizo clic en el botón de búsqueda
    if (onSearch) {
      onSearch(searchText, totalGuests); // Envía la ubicación y el número total de huéspedes
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='modalMain'>
          <div className='parteSuperiorModal'></div>
          <div className='parteInferiorModal'>
            <div className='contenedorInferior'>
              <div className='contenedorInput boton1' onClick={toggleDropdown}>
                <span className='span'>Location</span>
                <input
                  className='input'
                  type="text"
                  placeholder="Whole, Finland"
                  value={searchText}
                  onChange={handleInputChange}
                />
              </div>
              <button className='boton2' onClick={handleButtonClick}>
                <span>Guests</span>
                <div className='guests-total'>{totalGuests}</div>
              </button>
              <button className='boton3' onClick={handleSearchButtonClick}>Search</button>
            </div>
          </div>
          <div className="dropdown-container">
            {isDropdownVisible && (
              <div className="dropdown">
                {filteredOptions.map((option, index) => (
                  <button key={index} onClick={() => handleOptionClick(option)}>{option}</button>
                ))}
              </div>
            )}
            {isCounterVisible && (
              <div className="counter">
                <div className='adult'>
                  <span><strong>Adult</strong></span>
                  <br/>
                  <span>Age 13 or above</span>
                  <br></br>
                  <button onClick={handleAdultDecrement}>-</button>
                  <span>{adultCounter}</span>
                  <button onClick={handleAdultIncrement}>+</button>
                </div>
                <br></br>
                <div className='children'>
                  <span><strong>Children</strong></span>
                  <br/>
                  <span>Age 2-12</span>
                  <br></br>
                  <button onClick={handleChildrenDecrement}>-</button>
                  <span>{childrenCounter}</span>
                  <button onClick={handleChildrenIncrement}>+</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;