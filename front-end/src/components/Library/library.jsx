import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '../utils/Card/card.jsx';
import Header from '../utils/Header/header.jsx';
import Filter from '../utils/Filter/filter.jsx';
import './library.css';
import filtersData from './filtersData';
import PageNumeration from '../utils/PageNumeration/pageNumeration.jsx';
import {pcBackground} from '../../assets/images/pcBackground.jpg';

const Library=()=>{
    const [filtros,SetFiltros] = useState({});
    const [games,setGames] = useState([])
    const [currentPlatform,setCurrentPlatform]= useState(window.location.search);
    const getGames=async ()=>{
        const platform=new URLSearchParams(window.location.search).get('platform');
        const getURL=platform==null?`http://localhost:3000/json`:`http://localhost:3000/json/platforms/${platform}`
        const response= await axios.get(getURL);
        setGames(response.data.games==null?[]:response.data.games);
    }
    if(currentPlatform!=window.location.search){
        getGames();
        setCurrentPlatform(window.location.search);
    }

    useEffect(async ()=>{
        getGames();
    },[]);

    const handleFilters=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        const id=e.target.id;
        const removeFilter=(key)=>{
            const newState=filtros;
            delete newState[key];
            SetFiltros(newState);
        }
        switch(name){
            case 'Alphabet':
                if(filtros[name]!=undefined && filtros[name]==value) removeFilter(name);
                else SetFiltros({...filtros,[name]:e.target.value});
                break;
            case 'Selector':
                const theme=id.substring(id.indexOf("-")+1,id.length);
                if(filtros[id]!=undefined && value==theme) removeFilter(id);
                else SetFiltros({...filtros,[id]:value});
        }
    }

    const handleApplyFilters=async (e)=>{
        const baseURL="http://localhost:3000/json/filtered";
        const params=new URL(window.location.href).searchParams;
        let query='?';
        query+=`platforms=${params.get('platform')}&`;
        Object.keys(filtros).map((key,index)=>{
            const validFilter=/^(Selector-Genero|Selector-Idioma)/.test(key);
            if(validFilter){
                const element=key=='Selector-Genero'?'genre':'idioma';
                query+=`${element}=${filtros[key]}&`;
            }
        });
        query=query.substring(0,query.length-1);
        query=baseURL+query;
        const response=await axios.get(query);
        setGames(response.data.games==null?[]:response.data.games);
    }

    return(
        <>
            <Header/>
                <div className="wrapper">
                    <div className="mainBody">
                        <div className="filters">
                            <div className="flex-item alphabet">
                                <p>Filtros</p>
                                <div>
                                    {filtersData.alphabet.map(letter=>(<button name='Alphabet' value={letter} key={`ASCII-${letter}`} onClick={handleFilters}>{letter}</button>))}
                                </div>
                            </div>
                            <div className="flex-item filterForm">
                                <div className="genre"><Filter onChange={handleFilters} theme={"Genero"} options={filtersData['Genero']} size={"normal"}/></div>
                                <div className="language"><Filter onChange={handleFilters} theme={"Idioma"} options={filtersData['Idioma']} size={"normal"}/></div>
                                <div className="apply"><button onClick={handleApplyFilters}>Aplicar Filtros</button></div>
                                <p className="orderby">Ordenar por: </p>
                                <div className="options"><Filter onChange={handleFilters} theme={"BuscarPor"} options={filtersData['BuscarPor']}  size={"small"}/></div>
                                <div className="asc"><Filter onChange={handleFilters} theme={"ASC"} options={filtersData['Ordenamiento']}  size={"small"}/></div>
                            </div>
                        </div>
                        <div className="libraryContainer">
                            {games.map(game=>{
                                return (<div key={game._id} className="item"><Card gameInfo={game}/></div>)
                            })}
                        </div>
                        <div className="selectPages">
                            <PageNumeration/>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Library;