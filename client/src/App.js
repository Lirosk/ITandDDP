import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MyRoutes } from './components/MyRoutes';

import './styles/style.css'


function App() {
    return (
    // <>
    <BrowserRouter >
      <Header />
      <main>
        <MyRoutes />
      </main>
      <Footer />
    </BrowserRouter>
    // </>
  );
}

export default App;
