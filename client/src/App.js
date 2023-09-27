import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/DetailPage/DetailPage";
import FormPage from "./components/FormPage/FormPage";
import About from "./components/About/About";
import Nav from "./components/Nav/Nav";



function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
    return (
        <div className="App">
            {!isHome && <Nav />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/detail/:id' element={<DetailPage />} />
                <Route path='/form' element={<FormPage />} />
                <Route path='/about' element={<About />}/>
            </Routes>
        </div>
    );
}

export default App;