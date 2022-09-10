import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MyRoutes } from './components/MyRoutes';

import './styles/style.css'


function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    // <>
    <BrowserRouter >
      <Header signedIn={signedIn} />
      <main>
        <MyRoutes setSignedIn={setSignedIn} />
      </main>
      <Footer signedIn={signedIn} />
    </BrowserRouter>
    // </>
  );
}

export default App;
