import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import Lupa from '../../../assets/images/lupa.png';
import headerData from './headerData';

const Header=()=>{
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
                                <Link to={`/library?platform=${platform}`} style={{textDecoration: 'none'}}>{platform}</Link>
                            </li>
                        ))}
                        <li><img className="lupa" src={Lupa} alt=""/></li>
                    </ul>
                </div>
                <div className="right-side dropdown-m">
                    <p>Cuenta</p>
                    <div className="context-menu">
                        <button className="context-menu-btn">Registrar</button>
                        <button className="context-menu-btn">Ayuda</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;