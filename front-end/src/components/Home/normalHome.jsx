import React, {useEffect, useState} from 'react';
import './home.css'
import backgroundWall from '../../assets/images/Celeste-Game.jpg';
import GameCarousel from '../utils/Carousel/carousel.jsx';
import axios from 'axios';
import {platforms} from '../utils/Header/headerData';

const NormalHome=()=>{
    const [featuredGames, setFeaturedGames] = useState({});
    useEffect(async ()=>{
        const baseURL=`http://localhost:3000/json`;
        const endpoint=`/platforms`;
        const games={};
        for(let i=0;i<platforms.length;i++){
            let query='?limit=6&';
            query+=`platforms=${platforms[i]}`;
            query=baseURL + endpoint + query;
            const response=await axios.get(query);
            games[platforms[i]]=response.data['docs'];
        }
        setFeaturedGames(games);
    },[]);
    return(
        <>
            <div className="container">
                <div className="divC wallpaper">
                    <img src={backgroundWall} className="backgroundWall"/>
                    <div className="titleBLock"><h1 className="webName">LiberGames</h1></div>
                    <h3 className="subTitle">Juegos recientes</h3>
                </div>
                <div className="CarouselSection">
                    {platforms.map((platform,index)=>(
                        <GameCarousel key={index} games={featuredGames[platform]} platform={platform}/>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default NormalHome;