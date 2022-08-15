import React from 'react';
import Navbar from './Navbar';
import Stage from './Stage';
import SortingContextProvider from '../contexts/SortingContext';
import './App.css';

const App: React.FC = () => (
  <SortingContextProvider>
    <div className="App">
      <Navbar />
      <Stage />
    </div>
  </SortingContextProvider>
);

export default App;
