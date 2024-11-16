import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.scss';
import Navbar from '../navbar/navbar';
import Home from '../home/home';
import AboutUs from '../aboutus/aboutus';
import Services from '../services/services';
import Calendar from '../calendar/calendar';
import Contact from '../contact/contact';


class App extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <div className="mainContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
