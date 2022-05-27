import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import GamePage from './components/GamePage';
import { ChakraProvider } from '@chakra-ui/react';
import Weather from './components/Weather';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <GamePage />
      {/* <App /> */}
      <Weather />
    </ChakraProvider>
  </React.StrictMode>
);