import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './homepage/HomePage';
import PanelistNumber from './panelistnumber/PanelistNumber';
import Demographics from './demographics/Demographics';
import Camera from './camera/Camera';
import Sample from './sample/Sample';
import Questions from './questions/Questions';
import Form from './form/Form';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/panelist" element={<PanelistNumber />} />
        <Route path="/demographics" element={<Demographics />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
