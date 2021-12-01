import React from "react";
import './Navbar.css'

interface IProps  {
  resetArray: any,
  sortArray: any
}

interface IState {
    arraySize: number,
    algorithm: string,
    speed: number
}

class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arraySize: this.props.sortArray.length,
      algorithm: 'BubbleSort',
      speed: 10
    }
  }

  handleSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, arraySize: Number(event.currentTarget.value)});
  }
  
  handleAlgorithmChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ ...this.state, algorithm: event.currentTarget.value});
  }

  handleSpeedChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, speed: Number(event.currentTarget.value)});
  }

  render() {
    return (
        <div id="navbar">
            <div style={{ display: "inline-block"} }>
              <label>Colleciton size: </label>
              <input type="range" min="2" max="150" value={this.state.arraySize} onChange={this.handleSizeChange}/>
            </div>
            <button className="button" onClick={() => this.props.resetArray(this.state.arraySize)}>Generate new collection</button>
            <div style={{ display: "inline-block"} }>
              <label>Select algorithm: </label>
              <select className="select-dropdown" value={this.state.algorithm} onChange={this.handleAlgorithmChange}>
                <option value="BubbleSort">Bubble Sort</option>
                <option value="HeapSort">Heap Sort</option>
                <option value="MergeSort">Merge Sort</option>
                <option value="QuickSort">Quick Sort</option>
              </select>
            </div>
            <div style={{ display: "inline-block"} }>
              <label>Speed: </label>
              <input type="range" min="10" max="1000" value={this.state.speed} onChange={this.handleSpeedChange}/>
            </div>
            <button className="button" onClick={() => this.props.sortArray(this.state.speed, this.state.algorithm)}>Start Sorting</button>
        </div>
    );

  }

}

export default Navbar;