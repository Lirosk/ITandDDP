import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import { MyRoutes } from './components/MyRoutes';

import './styles/style.css'


function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter >
      <Header />
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
