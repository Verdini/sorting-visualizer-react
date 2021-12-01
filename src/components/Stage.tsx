import React from "react";
import './Stage.css'

interface IProps  {
  arrayData: Number[],
  compareElements: Number[]
}

interface IState {
    width: number,
    height: number
}

class Stage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  componentDidMount() {
      window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const elemWidth = `${this.state.width/(this.props.arrayData.length)/2}px`;
    const bgColor = '#189AB4';
    const bgColorComp = "#05445E";

    return(
        <div id="container">
            {this.props.arrayData.map( (el: any, index) => 
                <div 
                  className="arrayElement" 
                  key={index}
                  style={ { 
                    height: `${el*6}px`, 
                    width: elemWidth, 
                    marginLeft: '2px', 
                    marginRight: '2px',
                    backgroundColor: ( index === this.props.compareElements[0] || index === this.props.compareElements[1] ? bgColorComp: bgColor),
                    fontSize: '4px'  } } >
                  {el}
                </div>
            )}
        </div>
    );

  }

}

export default Stage;