import React from 'react';
import './entry.css'

const Entry=()=>{
    return(
        <div className="container">
            <div className="game-legend">
                <div className="game-title">
                    <h2></h2>
                </div>
                <hr/>
                <div className="game-information">
                    <h4>Plataforma: </h4><br/>
                    <h4>Tamano: </h4><br/>
                    <h4>Genero: </h4><br/>
                    <h4>Fecha: </h4><br/>
                    <h3>Sinopsis:</h3><br/>
                    <div className="sinopsis">

                    </div>
                </div>
            </div>
            <div className="left-container">
                <div className="image">
                    <img src="" alt=""/>
                </div>
                <div className="button-container">
                    <button className="button">Descargar</button>
                </div>
            </div>
        </div>
    )
}

export default Entry;