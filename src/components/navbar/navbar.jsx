import React, { Component } from 'react';
import './navbar.scss';
import logo from './../../assets/img/logo.webp';
import { NavLink } from 'react-router-dom';


class Navbar extends Component {
    state = {  } 
    render() { 
        return <div className='mainContainer'>
            <div className="innerContainer">
                <div className="nameContainer"><img src={logo} alt="" /></div>
                <div className="navigation">
                    <NavLink className="navItem" to="/">Home</NavLink>
                    <NavLink className="navItem" to="/services">Leistungen</NavLink>
                    <NavLink className="navItem" to="/calendar">Kalender</NavLink>
                    <NavLink className="navItem" to="/contact">Kontakt</NavLink>
                    <NavLink className="navItem" to="/aboutus">Über uns</NavLink>
                    <div className="navItem">Login</div>
               </div>
            </div>
        </div>;
    }
}
 
export default Navbar;