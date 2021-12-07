import React from "react";
import './Navbar.css'

interface IProps  {
  onResetArray: any,
  onSortArray: any,
  onChangeSpeed: any
}

interface IState {
    sorting: boolean,
    arraySize: number,
    algorithm: string,
    speed: number
}

class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sorting: false,
      arraySize: 100,
      algorithm: 'BubbleSort',
      speed: 10
    }
  }

  handleSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, arraySize: Number(event.currentTarget.value)});
  }
  
  handleResetArray = () => {
    if(!this.state.sorting)
      this.props.onResetArray(this.state.arraySize);
  }

  handleAlgorithmChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ ...this.state, algorithm: event.currentTarget.value});
  }

  handleSpeedChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.onChangeSpeed(event.currentTarget.value);
    this.setState({ ...this.state, speed: Number(event.currentTarget.value)});
  }

  handleSort = () => {
    this.props.onSortArray(this.state.speed, this.state.algorithm);
    this.setState((state) => {
      return {...state, sorting: !state.sorting}
    })
    
  }

  render() {
    return (
        <div id="navbar">
            <div style={{ display: "inline-block"} }>
              <label>Colleciton size: </label>
              <input type="range" min="2" max="150" value={this.state.arraySize} onChange={this.handleSizeChange}/>
            </div>
            <button className="button" onClick={this.handleResetArray}>Generate new collection</button>
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
              <input type="range" min="1" max="100" value={this.state.speed} onChange={this.handleSpeedChange}/>
            </div>
            <button className="button" onClick={this.handleSort}>{this.state.sorting? 'Stop' : 'Start Sorting' }</button>
        </div>
    );

  }

}

export default Navbar;