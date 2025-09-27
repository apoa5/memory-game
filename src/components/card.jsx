import {useState, useEffect} from 'react';
import '../styles/Card.css';

function Card({name, image}){

return(
    <div className='card'>
        <img src={image} alt={name} />
        <h2>{name}</h2>
    </div>
);
}

export default Card;