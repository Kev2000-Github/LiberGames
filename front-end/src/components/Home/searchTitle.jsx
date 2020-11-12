import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './searchTitle.css';
import Card from '../utils/Card/card.jsx';

const SearchTitle=({title})=>{
    const [games, setGames]= useState([]);
    const getGames=async ()=>{
        const title=new URLSearchParams(window.location.search).get('title');
        const baseURL=`http://localhost:3000/json/search/`;
        const response= await axios.get(baseURL + title);
        setGames(response.data.games==null?[]:response.data.games);
    }

    useEffect(()=>{
        getGames();
    },[location.search]);

    return(
        <>
            <div className="wrapper">
                <div className="searchTitle mainBody">
                    <div className="libraryContainer">
                            {games.map(game=>{
                                return (<div key={game._id} className="item"><Card gameInfo={game}/></div>)
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchTitle;