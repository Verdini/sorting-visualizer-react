import React, { useContext } from 'react';
import { SortingContext } from '../contexts/SortingContext';
import './Stage.css';

const Stage: React.FC = () => {
  const [state] = useContext(SortingContext);

  return (
    <div id="container">
      {state.arrayData.map((el: any, index: number) => (
        <div
          className="arrayElement"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            height: `${el * 6}px`,
            width: `${window.innerWidth / (state.arrayData.length) / 2}px`,
            marginLeft: '0.1rem',
            marginRight: '0.1rem',
            backgroundColor: (
              index === state.compareElements[0] || index === state.compareElements[1]
                ? '#05445E'
                : '#189AB4'),
            fontSize: `${window.innerWidth / (state.arrayData.length) / 120}rem`,
          }}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default Stage;
