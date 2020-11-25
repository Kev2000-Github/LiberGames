import React, {useState,useEffect} from 'react';
import Header from '../utils/Header/header.jsx';
import axios from 'axios';
import './entry.css'

const Entry=()=>{
    const [game, setGame] = useState({});
    useEffect(async ()=>{
        const id=location.search.slice(1,location.search.length);
        const baseURL=`http://localhost:3000/json`;
        const endpoint='/game/';
        const response= await axios.get(baseURL + endpoint + id);
        setGame({...response.data.game, entryDate: response.data.game.entryDate.slice(0,10)});
    },[])

    return(
        <>
        <Header/>
        <div className="Entrycontainer">
            <div className="UpperInformation">
                <div className="left-container">
                    <div className="imageBlock">
                        <img src={game.picture || ""} className="image" alt="cover"/>
                    </div>
                    <div className="button-container">
                        <button className="button">Descargar</button>
                    </div>
                </div>
                <div className="game-legend">
                    <div className="game-title">
                        <h2>{game.title || 'Title'}</h2>
                    </div>
                    <hr/>
                    <div className="game-information">
                        <h4>Plataforma: <span>{game.platforms?game.platforms[0]:""}</span></h4> 
                        <h4>Tamaño: <span>{game.size}</span></h4>
                        <h4>Genero: <span>{game.genre?game.genre.join(", "):""}</span></h4>
                        <h4>Fecha: <span>{game.entryDate}</span></h4>
                        <h3>Sinopsis: </h3>
                        <div className="sinopsis">
                            <span>{game.sinopsis}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="EntryVideo">
                <iframe 
                width="600" 
                height="355" 
                src={game.video? game.video:""} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
            </div>
        </div>
        </>
    )
}

export default Entry;