import React, {useState} from 'react';
import Header from '../utils/Header/header.jsx';
import './home.css'
import backgroundWall from '../../assets/images/Celeste-Game.jpg';
import NormalHome from './normalHome.jsx';
import SearchTitle from './searchTitle.jsx';
const Home=()=>{
    const [currentTitle, setCurrentTitle] = useState(window.location.search);
    if(currentTitle!=window.location.search){
        setCurrentTitle(window.location.search);
    }
    return(
        <>
            <Header className="header"/>
            {
            currentTitle==""?
            <NormalHome/>
            :
            <SearchTitle title={new URLSearchParams(currentTitle).get('title')}/>
            }
        </>
    )
}

export default Home;