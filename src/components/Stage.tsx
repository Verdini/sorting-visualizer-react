import React from "react";
import './Stage.css'

interface IProps  {

}

interface IState {
    array: Number[]
}

class Stage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        array: Array.from({length: 40}, () => ~~(1 + Math.random() * 100))
    };
  }

  componentDidMount() {
    
  }

  render() {
    return(
        <div id="container">
            {this.state.array.map( (el: any, index) => 
                <div 
                  className="arrayElement" 
                  key={index}
                  style={ { height: `${el*5}px` } } >
                  {el}
                </div>
            )}
        </div>
    );

  }

}

export default Stage;