import React from 'react';
import Header from '../utils/Header/header.jsx';
import './home.css'
import backgroundWall from '../../assets/images/Celeste-Game.jpg';

const Home=()=>{
    return(
        <>
            <Header className="header"/>
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

export default Home;