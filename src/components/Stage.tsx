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
        array: [1, 2, 3, 4]
    };
  }

  componentDidMount() {
    
  }

  render() {
    return(
        <div id="container">
            {this.state.array.map( (el) => 
                <div>{el}</div>
            )}
        </div>
    );

  }

}

export default Stage;