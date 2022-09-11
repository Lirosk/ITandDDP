import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MyRoutes } from './components/Main/MyRoutes';

import './styles/style.css'



function App() {
  return (
    <BrowserRouter >
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
