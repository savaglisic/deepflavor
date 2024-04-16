import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './homepage/HomePage';
import PanelistNumber from './panelistnumber/PanelistNumber';
import Demographics from './demographics/Demographics';
import Camera from './camera/Camera';
import './App.css'; // If you have global styles

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/panelist" element={<PanelistNumber />} />
        <Route path="/demographics" element={<Demographics />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
