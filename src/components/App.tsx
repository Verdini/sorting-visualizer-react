import React from 'react';
import Navbar from './Navbar';
import Stage from './Stage';
import BubbleSort from '../algorithms/bubblesort';
import ISorting from '../algorithms/isorting';
import { timeStamp } from 'console';
import SortingContext from '../contexts/SortingContext';


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
  sortingAlg: ISorting;

  constructor(props: IProps) {
    super(props);
    this.sortingAlg = null as any;
    this.state = {
      array: generateArray(100),
      compareElements: [-1, -1]
    };
  }

  resetArray = (size: number) => {
    this.setState({
      array: generateArray(size),
      compareElements: [-1, -1]
    })
  }

  sort = async (speed: number, algorithm: string) => {
    let delay = (-10)*speed + 1010;
    console.log("DElay: " +delay);
    if(!this.sortingAlg) {
      console.log("Start");
      this.sortingAlg = new BubbleSort();
      this.sortingAlg.start(this.state.array, delay, async (array: number[], compareElements: number[]) => {
        this.setState({ array, compareElements });
      } );
    } else {
      console.log("Stop");
      this.sortingAlg.stop();
      this.sortingAlg = null as any;
    }
    
  }

  changeSpeed = async(speed: number) => {
    let delay = ~~((1000)*Math.exp(-0.0461*speed));
    console.log("Delay: " + delay);
    (this.sortingAlg) && this.sortingAlg.setDelay(delay);
  }


  render() {
    return (
      <SortingContext>
        <div className="App">
          <Navbar onResetArray={this.resetArray} onSortArray={this.sort} onChangeSpeed={this.changeSpeed}/>
          <Stage arrayData={this.state.array} compareElements={this.state.compareElements} />
        </div>
      </SortingContext>
    );
  }
  
}

export default App;
