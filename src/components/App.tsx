import React from 'react';
import Navbar from './Navbar';
import Stage from './Stage';
import BubbleSort from '../algorithms/bubblesort';


interface IProps  {

}

interface IState {
    array: number[],
    compareElements: number[]
}


const generateArray = (arraySize: number): number[] => {
  return [...Array(arraySize)].map(() => ~~(1 + Math.random() * 100) );  
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      array: generateArray(30),
      compareElements: [-1, -1]
    };
  }

  onStateChange = async (array: number[], compareElements: number[]) => {
    this.setState({ array, compareElements });
  }
  
  resetArray = (size: number) => {
    this.setState({
      array: generateArray(size),
      compareElements: [-1, -1]
    })
  }


  sort = async (speed: number, algorithm: string) => {
    console.log(algorithm + " Sort!");
    await BubbleSort(this.state.array, speed, this.onStateChange );
  }


  render() {
    return (
      <div className="App">
        <Navbar resetArray={this.resetArray} sortArray={this.sort} />
        <Stage arrayData={this.state.array} compareElements={this.state.compareElements} />
      </div>
    );
  }
  
}

export default App;
