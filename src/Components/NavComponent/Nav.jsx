import React, { useState } from 'react';
import './Nav.css';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '../ModalComponent/Modal';

function Header({ onSearch, onTotalGuestsChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div>
        <img className="logo" src="/public/logo (1).svg" alt="Logo" />
      </div>
      <div className="botonesContainer">
        <div className="botonesBusqueda">
          <button className="botonCiudad" onClick={openModal}>Vaasa, Finland</button>
          <button className="botonGuests" onClick={openModal}>Add guests</button>
          <button className="searchButton" onClick={openModal}><SearchIcon /></button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSearch={onSearch}
          onTotalGuestsChange={onTotalGuestsChange}
        />
      )}
    </header>
  );
}

export { Header };