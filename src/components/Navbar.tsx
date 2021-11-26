import React from "react";
import './Navbar.css'

interface IProps  {
  resetArray: any,
  sortArray: any
}

interface IState {
    
}

class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
  }

  componentDidMount() {
    
  }


  render() {
    return (
        <div id="navbar">
            <div style={{ display: "inline-block"} }>
              <label>Colleciton size: </label>
              <input type="range" min="0" max="100"/>
            </div>
            <button className="button" role="button" onClick={this.props.resetArray}>Generate new collection</button>
            <div  style={{ display: "inline-block"} }>
              <label>Select algorithm: </label>
              <select className="select-dropdown">
                <option>Bubble Sort</option>
                <option>Heap Sort</option>
                <option>Merge Sort</option>
                <option>Quick Sort</option>
              </select>
            </div>
            <button className="button" role="button" onClick={this.props.sortArray}>Start Sorting</button>
        </div>
    );

  }

}

export default Navbar;