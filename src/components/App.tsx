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

}

class App extends React.Component<IProps, IState> {
  sortingAlg: ISorting;

  constructor(props: IProps) {
    super(props);
    this.sortingAlg = null as any;
  }


  sort = async (speed: number, algorithm: string) => {
    // let delay = (-10)*speed + 1010;
    // console.log("DElay: " +delay);
    // if(!this.sortingAlg) {
    //   console.log("Start");
    //   this.sortingAlg = new BubbleSort();
    //   this.sortingAlg.start(this.state.array, delay, async (array: number[], compareElements: number[]) => {
    //     this.setState({ array, compareElements });
    //   } );
    // } else {
    //   console.log("Stop");
    //   this.sortingAlg.stop();
    //   this.sortingAlg = null as any;
    // }
    
  }

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
