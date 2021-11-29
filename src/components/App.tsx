import { render } from '@testing-library/react';
import React from 'react';
import Navbar from './Navbar';
import Stage from './Stage';
import BubbleSort from '../algorithms/bubblesort';


interface IProps  {

}

interface IState {
    array: number[]
}

const generateArray = (arraySize: number): number[] => {
  return [...Array(arraySize)].map(() => ~~(1 + Math.random() * 100) );  
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      array: generateArray(30)
    };
  }
  
  resetArray = (size: number) => {
    this.setState({
      array: generateArray(size)
    })
  }

  sort = (algorithm: string) => {
    console.log(algorithm + " Sort!");
    let sortedArray: number[] = [...this.state.array];
    BubbleSort(sortedArray);
    this.setState({
      array: sortedArray
    });
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
