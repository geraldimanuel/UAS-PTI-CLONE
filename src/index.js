import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import GamePage from './components/GamePage';
import { ChakraProvider } from '@chakra-ui/react';
import Weather from './components/Weather';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {GamePage} from './components/GamePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/GamePage" element={<GamePage />} />
        </Routes>
      
      {/* <GamePage />
      <App />
      <Weather /> */}
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);