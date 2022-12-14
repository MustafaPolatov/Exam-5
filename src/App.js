
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Korzinka } from './pages/Korzinka';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/korzinka" element={<Korzinka/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
