import React, {useState} from 'react';
import Header from '../utils/Header/header.jsx';
import './home.css'
import NormalHome from './normalHome.jsx';
const Home=()=>{
    const [currentTitle, setCurrentTitle] = useState(window.location.search);
    if(currentTitle!=window.location.search){
        setCurrentTitle(window.location.search);
    }
    return(
        <>
            <Header className="header"/>
            <NormalHome/>
        </>
    )
}

export default Home;