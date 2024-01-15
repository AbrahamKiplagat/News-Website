import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Prevew from './Components/Prevew';
import QuotesComponent from './Components/Quotes';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';
import CryptoGraph from './Components/Coin/live';
import CryptoTable from './Components/Coin/live';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Prevew />} /> 
        <Route path="/quotes" element={<QuotesComponent/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/live" element={<CryptoTable/>} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;