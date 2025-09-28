import { useState, useEffect } from 'react';
import '../styles/Card.css';

function Card({ name, image, onClick }) {

    return (
        <div className='card'
            onClick={onClick}>
            <img src={image} alt={name} />
            <h2>{name}</h2>
        </div>
    );
}

export default Card;