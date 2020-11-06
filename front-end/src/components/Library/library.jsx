import React, {useState} from 'react';
import Card from '../utils/Card/card.jsx';
import Header from '../utils/Header/header.jsx';
import Filter from '../utils/Filter/filter.jsx';
import './library.css';
import filtersData from './filtersData';

const Library=()=>{
    const [filtros,SetFiltros] = useState({});
    const alphabet=[];
    console.log(filtros)
    for(let i=65;i<=90;i++) alphabet.push(String.fromCharCode(i));
    const handleFilters=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        switch(name){
            case 'Alphabet':
                if(filtros[name]!=undefined && filtros[name]==value){
                    const newState=filtros;
                    delete newState['Alphabet'];
                    SetFiltros(newState);
                }
                else SetFiltros({...filtros,[name]:e.target.value});

        }

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
                                    {alphabet.map(letter=>(<button name='Alphabet' value={letter} key={`ASCII-${letter}`} onClick={handleFilters}>{letter}</button>))}
                                </div>
                            </div>
                            <div className="flex-item filterForm">
                                <div className="genre"><Filter theme={"Genero"} options={filtersData['Genero']} size={"normal"}/></div>
                                <div className="language"><Filter theme={"Idioma"} options={filtersData['Idioma']} size={"normal"}/></div>
                                <div className="apply"><button>Aplicar Filtros</button></div>
                                <p className="orderby">Ordenar por: </p>
                                <div className="options"><Filter theme={"BuscarPor"} options={filtersData['BuscarPor']}  size={"small"}/></div>
                                <div className="asc"><Filter theme={"ASC"} options={filtersData['Ordenamiento']}  size={"small"}/></div>
                            </div>
                        </div>
                        <div className="libraryContainer">
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                            <div className="item"><Card/></div>
                        </div>
                        <div className="selectPages">

                        </div>
                    </div>
                </div>
        </>
    )
}

export default Library;