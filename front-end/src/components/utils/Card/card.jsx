import React from 'react';
import {Link} from 'react-router-dom';
import './card.css'

const Card=(props)=>{
    return(
        <Link to={"/"} className="cardLink">
            <div className="card">
                <img src={props.gameInfo.picture} className="Image"/>
                <p className="cardTitle">{props.gameInfo.title}</p>
                <p className="cardCategories">{`Generos: ${props.gameInfo.genre}`}</p>
            </div>
        </Link>
    )
}

export default Card;