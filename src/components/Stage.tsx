import React from "react";
import {SortingContext} from '../contexts/SortingContext';
import './Stage.css'

interface IProps  {
  // arrayData: Number[],
  // compareElements: Number[]
}

interface IState {
    width: number,
    height: number
}

class Stage extends React.Component<IProps, IState> {
  static contextType = SortingContext;
  context!: React.ContextType<typeof SortingContext>;

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
    const elemWidth = `${this.state.width/(this.context.arrayData.array.length)/2}px`;
    const fontSize = `${this.state.width/(this.context.arrayData.array.length)/6}px`;
    const bgColor = '#189AB4';
    const bgColorComp = "#05445E";

    return(
        <div id="container">
            {this.context.arrayData.array.map( (el: any, index: number) => 
                <div 
                  className="arrayElement" 
                  key={index}
                  style={ { 
                    height: `${el*6}px`, 
                    width: elemWidth, 
                    marginLeft: '2px', 
                    marginRight: '2px',
                    backgroundColor: ( index === this.context.arrayData.compareElements[0] || index === this.context.arrayData.compareElements[1] ? bgColorComp: bgColor),
                    fontSize: fontSize } } >
                  {el}
                </div>
            )}
        </div>
    );

  }

}

export default Stage;