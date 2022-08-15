import React, { useState, useContext } from 'react';
import AlgorithmType from '../algorithms/Types';
import { SortingContext, ActionTypes } from '../contexts/SortingContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [state, dispatch] = useContext(SortingContext);

  const [arraySize, setArraySize] = useState(100);
  const [sortingSpeed, setSortingSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState(AlgorithmType.BUBBLE_SORT);

  const handleSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setArraySize(Number(event.currentTarget.value));
    dispatch({
      type: ActionTypes.SET_COLLECTION_SIZE,
      payload: +event.currentTarget.value,
    });
  };

  const handleAlgorithmChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setAlgorithm(+event.currentTarget.value);
    dispatch({
      type: ActionTypes.SET_ALGORITHM,
      payload: +event.currentTarget.value,
    });
  };

  const handleSpeedChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSortingSpeed(Number(event.currentTarget.value));
    const speed = Number(event.currentTarget.value);
    const delay = ~~((1000) * Math.exp(-0.0461 * speed));
    dispatch({
      type: ActionTypes.SET_DELAY,
      payload: delay,
    });
  };

  const handleStartStop = async () => {
    dispatch({
      type: ActionTypes.START_STOP,
    });
  };

  return (
    <div id="navbar">
      <label htmlFor="size">
        Collection size:
        <input id="size" type="range" min="5" max="100" value={arraySize} onChange={handleSizeChange} />
      </label>
      <label htmlFor="algorithm">
        Select algorithm:
        <select id="algorithm" className="select-dropdown" value={algorithm} onChange={handleAlgorithmChange}>
          <option value={AlgorithmType.BUBBLE_SORT}>Bubble Sort</option>
          <option value={AlgorithmType.HEAP_SORT}>Heap Sort</option>
          {/* <option value="MergeSort">Merge Sort</option>
            <option value="QuickSort">Quick Sort</option> */}
        </select>
      </label>
      <label htmlFor="speed">
        Speed:
        <input id="speed" type="range" min="1" max="100" value={sortingSpeed} onChange={handleSpeedChange} />
      </label>
      <button type="submit" className="button" onClick={handleStartStop}>
        {state.running ? 'Stop Sorting' : 'Start Sorting' }
      </button>
    </div>
  );
};

export default Navbar;
