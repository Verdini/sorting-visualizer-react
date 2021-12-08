import React from 'react';
import Navbar from './Navbar';
import Stage from './Stage';
import SortingContext from '../contexts/SortingContext';
import './App.css'


interface IProps  {

}

interface IState {

}

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <SortingContext>
        <div className="App">
          <Navbar/>
          <Stage/>
        </div>
      </SortingContext>
    );
  }
  
}

export default App;
