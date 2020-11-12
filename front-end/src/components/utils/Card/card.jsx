import React from 'react';
import {Link} from 'react-router-dom';
import './card.css'
import noImage from '../../../assets/images/noImage.jpg';

const Card=({gameInfo})=>{
    const picture=gameInfo.picture=="" ? noImage : gameInfo.picture;
    return(
        <Link to={"/"} className="cardLink">
            <div className="card">
                <img src={picture} className="Image"/>
                <p className="cardTitle">{gameInfo.title}</p>
                <p className="cardCategories">{`Generos: ${gameInfo.genre.join(', ')}`}</p>
            </div>
        </Link>
    )
}

export default Card;