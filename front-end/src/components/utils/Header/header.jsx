import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import Lupa from '../../../assets/images/lupa.png';

const Header=()=>{
    return(
        <header className="header">
            <nav className="navigator">
                <div className="left-side">
                    <Link to={'#'} style={{textDecoration: 'none'}}>Inicio</Link>
                </div>
                <div className="center-side">
                    <ul className="list">
                        <li><Link to={'#'} style={{textDecoration: 'none'}}>PC</Link></li>
                        <li><Link to={'#'} style={{textDecoration: 'none'}}>PS2</Link></li>
                        <li><Link to={'#'} style={{textDecoration: 'none'}}>PS3</Link></li>
                        <li><Link to={'#'} style={{textDecoration: 'none'}}>PS4</Link></li>
                        <li><Link to={'#'} style={{textDecoration: 'none'}}>NDS</Link></li>
                        <li><Link to={'#'} style={{textDecoration: 'none'}}>XBOX360</Link></li>
                        <li><img className="lupa" src={Lupa} alt=""/></li>
                    </ul>
                </div>
                <div className="right-side">
                    <p>Cuenta</p>
                </div>
            </nav>
        </header>
    )
}

export default Header;