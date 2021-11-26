import React from "react";
import './Stage.css'

interface IProps  {
  arrayData: Number[]
}

interface IState {
    
}

class Stage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
  }

  componentDidMount() {
      // setTimeout( () => {
      //   this.setState({
      //     array: Array.from({length: 40}, () => ~~(1 + Math.random() * 100))
      //   })
      // }, 1000);

      // setTimeout( () => {
      //   this.setState({
      //     array: Array.from({length: 40}, () => ~~(1 + Math.random() * 100))
      //   })
      // }, 2000);

      // setTimeout( () => {
      //   this.setState({
      //     array: Array.from({length: 40}, () => ~~(1 + Math.random() * 100))
      //   })
      // }, 3000);
  }

  render() {
    return(
        <div id="container">
            {this.props.arrayData.map( (el: any, index) => 
                <div 
                  className="arrayElement" 
                  key={index}
                  style={ { height: `${el*6}px` } } >
                  {el}
                </div>
            )}
        </div>
    );

  }

}

export default Stage;