import React from 'react';
import GradeIcon from '@mui/icons-material/Grade';

import './Card.css';


const Card = ({ stay }) => {
  return (
    <div className='card'>
      <div className="card-image-container">
        <img src={stay.photo} alt={stay.title}/>
      </div>
      <div className='infoContainer'>
        {stay.superHost && <div className='superhost-container'>Super Host</div>}
        <span>{stay.type}. {stay.beds} beds</span>
        <div className='rating'>
          <span className='icon-container'><GradeIcon/></span>
          <span>{stay.rating}</span>
        </div>
      </div>
      <div>{stay.title}</div>
    </div>
  );
}

export default Card;