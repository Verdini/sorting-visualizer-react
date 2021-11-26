import { render } from '@testing-library/react';
import React from 'react';
import Navbar from './Navbar';
import Stage from './Stage';


interface IProps  {

}

interface IState {
    array: Number[]
}


const generateArray = (): Number[] => {
  return Array.from({length: 40}, () => ~~(1 + Math.random() * 100))
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      array: generateArray()
    };
  }
  
  resetArray = () => {
    this.setState({
      array: generateArray()
    })
  }

  sort = () => {
    alert("Sort!");
  }


  render() {
    return (
      <div className="App">
        <Navbar resetArray={this.resetArray} sortArray={this.sort} />
        <Stage arrayData={this.state.array}/>
      </div>
    );
  }
  
}

export default App;
