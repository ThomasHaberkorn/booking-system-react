// import React, { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './app.scss';
// import Navbar from '../navbar/navbar';
// import Home from '../home/home';
// import AboutUs from '../aboutus/aboutus';
// import Services from '../services/services';
// import Calendar from '../calendar/calendar';
// import Contact from '../contact/contact';


// class App extends Component {
//     render() {
//         return (
//             <Router>
//                 <Navbar />
//                 <div className="mainContent">
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/services" element={<Services />} />
//                         <Route path="/calendar" element={<Calendar />} />
//                         <Route path="/contact" element={<Contact />} />
//                         <Route path="/aboutus" element={<AboutUs />} />
//                     </Routes>
//                 </div>
//             </Router>
//         );
//     }
// }

// export default App;


import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './app.scss';
import Navbar from '../navbar/navbar';
import Home from '../home/home';
import AboutUs from '../aboutus/aboutus';
import Services from '../services/services';
import Calendar from '../calendar/calendar';
import Contact from '../contact/contact';

// Routen definieren
const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <>
                    <Navbar />
                    <div className="mainContent">
                        <Home />
                    </div>
                </>
            ),
        },
        {
            path: '/services',
            element: (
                <>
                    <Navbar />
                    <div className="mainContent">
                        <Services />
                    </div>
                </>
            ),
        },
        {
            path: '/calendar',
            element: (
                <>
                    <Navbar />
                    <div className="mainContent">
                        <Calendar />
                    </div>
                </>
            ),
        },
        {
            path: '/contact',
            element: (
                <>
                    <Navbar />
                    <div className="mainContent">
                        <Contact />
                    </div>
                </>
            ),
        },
        {
            path: '/aboutus',
            element: (
                <>
                    <Navbar />
                    <div className="mainContent">
                        <AboutUs />
                    </div>
                </>
            ),
        },
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_startTransition: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
