import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '../utils/Card/card.jsx';
import Header from '../utils/Header/header.jsx';
import Filter from '../utils/Filter/filter.jsx';
import './library.css';
import filtersData from './filtersData';
import PageNumeration from '../utils/PageNumeration/pageNumeration.jsx';

const Library=()=>{
    const [filtros,SetFiltros] = useState({"Selector-ASC":"ASC"});
    const [games,setGames] = useState([]);
    const [pageCount,setPageCount] = useState(1);
    const [pagination, setPagination] =useState({page:1});
    const [currentPlatform, setCurrentPlatform] = useState("");
    const [filterQuery,setFilterQuery] = useState("");
    const [order, setOrder] = useState("");
    
    useEffect(()=>{
        const {search}=location;
        const searchPlatform=new URLSearchParams(search).get('platforms');
        if(searchPlatform) setCurrentPlatform(searchPlatform);
        getGames(location.search);
    },[location.search, order])

    const handleOrder=(e)=>{
        const query=`&order=${e.target.value}`;
        setOrder(query);
    }

    const getGames=async (addedQuery="")=>{
        const baseURL=`http://localhost:3000/json`;
        const endpoint=`/platforms`;
        const getURL=baseURL + endpoint + addedQuery + "&limit=20" + filterQuery + order;
        const response= await axios.get(getURL);
        const {data}=response;
        setGames(data.docs==null?[]:[...data.docs]);
        setPageCount(data.totalPages);
        delete data.docs;
        setPagination({...data});
    }

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
                if(filtros[name]!=undefined && filtros[name]==value) SetFiltros({...filtros,[name]:""});
                else SetFiltros({...filtros,[name]:e.target.value});
                break;
            case 'Selector':
                const theme=id.substring(id.indexOf("-")+1,id.length);
                if(filtros[id]!=undefined && value==theme) removeFilter(id);
                else SetFiltros({...filtros,[id]:value});
        }
    }

    const handleApplyFilters=async (e)=>{
        let query='&';
        Object.keys(filtros).map((key,index)=>{
            const validFilter=/^(Selector-Genero|Selector-Idioma)/.test(key);
            if(validFilter){
                const element=key=='Selector-Genero'?'genre':'idioma';
                query+=`${element}=${filtros[key]}&`;
            }
            else if(key=="Alphabet" && filtros[key]!=""){
                query+=`title=${filtros[key]}&`;
            }
        });
        query=query.substring(0,query.length-1);
        console.log('query:',query)
        setFilterQuery(query);
    }

useEffect(()=>{
    getGames(location.search);
},[filterQuery])

useEffect(()=>{
},[games])

    return(
        <>
            <Header/>
                <div className="wrapper">
                    <div className="mainBody">
                        <div className="filters">
                            <div className="flex-item alphabet">
                                <p>Filtros</p>
                                <div>
                                    {filtersData.alphabet.map(letter=>(<button className={filtros['Alphabet']==letter?"pressed":""} name='Alphabet' value={letter} key={`ASCII-${letter}`} onClick={handleFilters}>{letter}</button>))}
                                </div>
                            </div>
                            <div className="flex-item filterForm">
                                <div className="genre"><Filter onChange={handleFilters} theme={"Genero"} options={filtersData['Genero']} size={"normal"}/></div>
                                <div className="language"><Filter onChange={handleFilters} theme={"Idioma"} options={filtersData['Idioma']} size={"normal"}/></div>
                                <div className="apply"><button onClick={handleApplyFilters}>Aplicar Filtros</button></div>
                                <p className="orderby">Ordenar por: </p>
                                <div className="options"><Filter onChange={handleFilters} theme={"Fecha"} options={filtersData['BuscarPor']}  size={"small"}/></div>
                                <div className="asc"><Filter onChange={handleOrder} theme={"ASC"} options={filtersData['Ordenamiento']}  size={"small"}/></div>
                            </div>
                        </div>
                        <div className="libraryContainer">
                            {games.map(game=>{
                                return (<div key={game._id} className="item"><Card gameInfo={game}/></div>)
                            })}
                        </div>
                        <div className="selectPages">
                            <PageNumeration currentPage={pagination.page} pageCount={pageCount} path={`${location.pathname}?platforms=${currentPlatform}&`}/>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Library;