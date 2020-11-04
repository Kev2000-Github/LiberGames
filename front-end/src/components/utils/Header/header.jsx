import React from 'react';
import './header.css';
//import lupa from './lupa.png';

const Header=()=>{
    return(
        <header className="header">
            <nav className="navigator">
                <div className="left-side">
                    <a href="">Inicio</a>
                </div>
                <div className="center-side">
                    <ul className="list">
                        <li><a href="">PC</a></li>
                        <li><a href="">PS2</a></li>
                        <li><a href="">PS3</a></li>
                        <li><a href="">PS4</a></li>
                        <li><a href="">NDS</a></li>
                        <li><a href="">XBOX360</a></li>
                        <li><img src="lupa.png" alt=""/></li>
                    </ul>
                </div>
                <div className="right-side">
                    Cuenta
                </div>
            </nav>
        </header>
    )
}

export default Header;