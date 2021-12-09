import React from "react";
import {SortingContext} from '../contexts/SortingContext';
import './Navbar.css'

interface IProps  {
  // onResetArray: any,
  // onSortArray: any,
  // onChangeSpeed: any
}

interface IState {
    arraySize: number,
    speed: number
}

class Navbar extends React.Component<IProps, IState> {
  static contextType = SortingContext;
  context!: React.ContextType<typeof SortingContext>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      arraySize: 100,
      speed: 100
    }
  }

  handleSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, arraySize: Number(event.currentTarget.value)});
  }
  
  handleResetArray = () => {
      this.context.resetArray(this.state.arraySize);
  }

  handleAlgorithmChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.context.setAlgorithm(event.currentTarget.value);
  }

  handleSpeedChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, speed: Number(event.currentTarget.value)});
    let speed = Number(event.currentTarget.value);
    let delay = ~~((1000)*Math.exp(-0.0461*speed));
    this.context.setSortingDelay(delay);
  }

  handleSort = async () => {
    this.context.startStop();  
  }

  render() {
    return (
        <div id="navbar">
            <div style={{ display: "inline-block"} }>
              <label>Colleciton size: </label>
              <input type="range" min="5" max="100" value={this.state.arraySize} onChange={this.handleSizeChange}/>
            </div>
            <button className="button" onClick={this.handleResetArray}>Generate new collection</button>
            <div style={{ display: "inline-block"} }>
              <label>Select algorithm: </label>
              <select className="select-dropdown" value={this.context.status.algorithm} onChange={this.handleAlgorithmChange}>
                <option value="BubbleSort">Bubble Sort</option>
                <option value="HeapSort">Heap Sort</option>
                {/*<option value="MergeSort">Merge Sort</option>
                <option value="QuickSort">Quick Sort</option>*/}
              </select>
            </div>
            <div style={{ display: "inline-block"} }>
              <label>Speed: </label>
              <input type="range" min="1" max="100" value={this.state.speed} onChange={this.handleSpeedChange}/>
            </div>
            <button className="button" onClick={this.handleSort}>{this.context.status.running? 'Stop Sorting' : 'Start Sorting' }</button>
        </div>
    );

  }

}

export default Navbar;