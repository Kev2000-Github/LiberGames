import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import Lupa from '../../../assets/images/lupa.png';
import headerData from './headerData';
import axios from 'axios';

const Header=()=>{
    const [searchTerm, SetSearchTerm] = useState("");

    const handleInput=(e)=>SetSearchTerm(e.target.value)
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const baseURL="http://localhost:3000/json/search/";
        axios.get(baseURL + searchTerm)
        .then(()=>console.log("petition received"))
        .catch(err=>console.log(err))

    }


    return(
        <header className="header">
            <nav className="navigator">
                <div className="left-side">
                    <Link to={'/'} style={{textDecoration: 'none'}}>Inicio</Link>
                </div>
                <div className="center-side">
                    <ul className="list">
                        {headerData.platforms.map(platform=>(
                            <li key={`KEY-${platform}`}>
                                <Link to={`/library?platforms=${platform}`} style={{textDecoration: 'none'}}>{platform}</Link>
                            </li>
                        ))}
                        <li className="lupaBlock"><img className="lupa" src={Lupa} alt=""/>
                            <div className="context-menu">
                                <div className="context-menu-search">
                                    <form onSubmit={handleSubmit}>
                                        <Link to={`/library?title=${searchTerm}`} style={{textDecoration: 'none'}}>
                                            <button><img className="lupaSearcher" src={Lupa} alt="lupaSearcher"/></button>
                                        </Link>
                                        <input type="text" name="searcher" onChange={handleInput} value={searchTerm} id="searcher" autoComplete="off"/>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right-side dropdown-m">
                    <p>Cuenta</p>
                    <div className="context-menu">
                        <button className="context-menu-btn">Registrar</button>
                        <button className="context-menu-btn">Ingresar</button>
                        <button className="context-menu-btn"><Link style={{textDecoration: 'none'}} to={'/upload'}>Subir</Link></button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;