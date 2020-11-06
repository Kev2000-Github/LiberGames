import React from 'react';
import {Link} from 'react-router-dom';
import './card.css'
import Image from '../../../assets/images/LastUs.jpg';

const Card=()=>{
    return(
        <Link to={"/"} className="cardLink">
            <div className="card">
                <img src={Image} className="Image"/>
                <p className="cardTitle">The Last of us</p>
                <p className="cardCategories">Generos: Shooting, Adventure, Action</p>
            </div>
        </Link>
    )
}

export default Card;