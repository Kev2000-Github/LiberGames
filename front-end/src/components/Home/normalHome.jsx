import React from 'react';
import './home.css'
import backgroundWall from '../../assets/images/Celeste-Game.jpg';

const NormalHome=()=>{
    return(
        <>
            <div className="container">
                <div className="divC wallpaper">
                    <img src={backgroundWall} className="backgroundWall"/>
                    <div className="titleBLock"><h1 className="webName">LiberGames</h1></div>
                    <h3 className="subTitle">Juegos recientes</h3>
                </div>
                <div className="divC">dat1</div>
            </div>
        </>
    )
}

export default NormalHome;