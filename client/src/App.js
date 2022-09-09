import React from 'react';
import { BrowserRouter, Navigate } from "react-router-dom";
import { Header } from './components/Header';
import { MyRoutes } from './components/MyRoutes';

import './styles/style.css'

function App() {
  return (
    <main>
      <BrowserRouter >
        <Header />
        <MyRoutes />
      </BrowserRouter>
    </main>
  );
}

export default App;
