import React from "react";
import './Navbar.css'

interface NavbarPropType {

}

class Navbar extends React.Component {
  constructor(props: NavbarPropType) {
    super(props);
    
  }

  componentDidMount() {
    
  }

  render() {
    return (
        <div id="navbar">
            <div>Change colleciton size</div>
            <input type="range" min="0" max="100"/>
            <button>Generate new collection</button>
            <button>Bubble Sort</button>
            <button>Heap Sort</button>
            <button>Merge Sort</button>
            <button>Quick Sort</button>
            <button>Start Sorting</button>
        </div>
    );

  }

}

export default Navbar;