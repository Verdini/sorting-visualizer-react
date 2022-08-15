import React, { createContext, useReducer } from 'react';
import ISortingAlgorithm from '../algorithms/ISortingAlgorithm';
import BubbleSort from '../algorithms/BubbleSort';
import HeapSort from '../algorithms/HeapSort';
import AlgorithmType from '../algorithms/Types';

export enum ActionTypes {
  SET_COLLECTION_SIZE,
  SET_ALGORITHM,
  SET_DELAY,
  SET_ARRAY,
  SET_RUNNING,
  START_STOP,
}
interface IState {
  arrayData: number[],
  compareElements: number[],
  running: boolean,
  delay: number,
  algorithm: AlgorithmType
}

interface IAction {
  type: ActionTypes,
  payload?: any,
}

function generateArray(size: number): number[] {
  return [...Array(size)].map(() => ~~(1 + Math.random() * 100));
}

let sortAgent: ISortingAlgorithm;

const initialState: IState = {
  arrayData: generateArray(100),
  compareElements: [-1, -1],
  running: false,
  delay: 10,
  algorithm: AlgorithmType.BUBBLE_SORT,
};

export const SortingContext = createContext<[IState, React.Dispatch<any>]>(
  [initialState, () => null],
);

const setCollectionSize = (state: IState, payload: any) => {
  if (!state.running) {
    return {
      ...state,
      arrayData: generateArray(payload),
      compareElements: [-1, -1],
    };
  }
  return state;
};

const setAlgorithm = (state: IState, payload: any) => ({
  ...state,
  algorithm: payload,
});

const setDelay = (state: IState, payload: any) => {
  if (state.running) sortAgent.setDelay(payload);
  return {
    ...state,
    delay: payload,
  };
};

const setArray = (state: IState, payload: any): IState => ({
  ...state,
  arrayData: payload.arrayData,
  compareElements: payload.compareElements,
});

const setRunning = (state: IState, payload: any): IState => ({
  ...state,
  running: payload,
});

const startStop = (state: IState, dispatch: React.Dispatch<IAction>) => {
  if (state.running) {
    sortAgent.stop();
    dispatch({
      type: ActionTypes.SET_RUNNING,
      payload: false,
    });
  } else {
    switch (state.algorithm) {
      case AlgorithmType.HEAP_SORT:
        sortAgent = new HeapSort();
        break;
      case AlgorithmType.BUBBLE_SORT:
      default:
        sortAgent = new BubbleSort();
        break;
    }

    sortAgent.setDelay(state.delay);
    sortAgent.start(
      state.arrayData,
      (arrayData: number[], compareElements: number[]) => {
        dispatch({
          type: ActionTypes.SET_ARRAY,
          payload: {
            arrayData,
            compareElements,
          },
        });
      },
      () => {
        dispatch({
          type: ActionTypes.SET_RUNNING,
          payload: false,
        });
      },
    );
    dispatch({
      type: ActionTypes.SET_RUNNING,
      payload: true,
    });
  }
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionTypes.SET_COLLECTION_SIZE:
      return setCollectionSize(state, action.payload);
    case ActionTypes.SET_ALGORITHM:
      return setAlgorithm(state, action.payload);
    case ActionTypes.SET_DELAY:
      return setDelay(state, action.payload);
    case ActionTypes.SET_ARRAY:
      return setArray(state, action.payload);
    case ActionTypes.SET_RUNNING:
      return setRunning(state, action.payload);
    default:
      return state;
  }
};

const dispatchMiddleware = (
  state: IState,
  dispatch: React.Dispatch<IAction>,
): React.Dispatch<IAction> => (
  action: IAction,
) => {
  switch (action.type) {
    case ActionTypes.START_STOP:
      startStop(state, dispatch);
      return null;
    default:
      return dispatch(action);
  }
};

interface SortingContextProviderProps {
  children: React.ReactNode
}

const SortingContextProvider: React.FC<SortingContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SortingContext.Provider value={[state, dispatchMiddleware(state, dispatch)]}>
      {children}
    </SortingContext.Provider>
  );
};

export default SortingContextProvider;
