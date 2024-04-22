import React, { useState, useEffect } from 'react';
import './Modal.css';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';

function Modal({ onClose, onSearch, filterStays, onTotalGuestsChange }) {
  const options = ["Helsinki, Finland", "Turku, Finland", "Vaasa, Finland", "Oulu, Finland"];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [adultCounter, setAdultCounter] = useState(0);
  const [childrenCounter, setChildrenCounter] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    setTotalGuests(adultCounter + childrenCounter);
  }, [adultCounter, childrenCounter]);

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

  const handleOptionClick = (option) => {
    setSearchText(option);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    setIsCounterVisible(false);
  };

  const toggleCounter = () => {
    setIsCounterVisible(!isCounterVisible);
    setIsDropdownVisible(false);
  };

  const handleButtonClick = () => {
    toggleCounter();
    if (onTotalGuestsChange) {
      onTotalGuestsChange(totalGuests);
    }
  };

  const handleSearchButtonClick = () => {
    setSearchClicked(true);
    if (onSearch) {
      onSearch(searchText, totalGuests);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modalMain">
          <header className="modal-header">
            <div className="header-left">
              <h1>Edit your search</h1>
            </div>
            <div className="header-right">
              <button className="cerrar" onClick={onClose}>X</button>
            </div>
          </header>
          <div className="parteSuperiorModal"></div>
          <div className="parteInferiorModal">
            <div className="contenedorInferior">
              <div className="contenedorInputBoton1" onClick={toggleDropdown}>
                <div className="input-container">
                  <span className="span">Location</span>
                  <input
                    className="input"
                    type="text"
                    placeholder="Whole, Finland"
                    value={searchText}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button className="boton2" onClick={handleButtonClick}>
                <span className='span'>Guests</span>
                <div className="guests-total">{totalGuests}</div>
              </button>
              <button className="boton3" onClick={handleSearchButtonClick}>
                <SearchIcon/>Search
              </button>
            </div>
          </div>
          <div className="dropdown-container">
            {isDropdownVisible && (
              <div className="dropdown">
                {options.map((option, index) => (
                  <button key={index} onClick={() => handleOptionClick(option)}>
                    <div className="dropdown-content">
                      <RoomIcon />
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {isCounterVisible && (
              <div className="counter">
                <div className="adult">
                  <span><strong>Adult</strong></span>
                  <br />
                  <br/>
                  <span className='textoContador'>Age 13 or above</span>
                  <br/>
                  <button onClick={handleAdultDecrement}>-</button>
                  <span className='contadorAdulto'>{adultCounter}</span>
                  <button onClick={handleAdultIncrement}>+</button>
                </div>
                <br/>
                <div className="children">
                  <span><strong>Children</strong></span>
                  <br/>
                  <br />
                  <span >Age 2-12</span>
                  <br/>
                  <button onClick={handleChildrenDecrement}>-</button>
                  <span className='contadorChildren'>{childrenCounter}</span>
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