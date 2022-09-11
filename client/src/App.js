import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MyRoutes } from './components/Main/MyRoutes';

import './styles/style.css'



function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [page, setPage] = useState('/');

  return (
    // <>
    <BrowserRouter >
      <Header signedIn={signedIn} page={page}/>
      <main>
        <MyRoutes setSignedIn={setSignedIn} setPage={setPage} />
      </main>
      <Footer signedIn={signedIn} />
    </BrowserRouter>
    // </>
  );
}

export default App;
