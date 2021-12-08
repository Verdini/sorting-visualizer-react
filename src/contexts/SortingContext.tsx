import React, { createContext, useEffect, useState } from 'react';
import ISortingAlgorithm from '../algorithms/ISortingAlgorithm';
import BubbleSort from '../algorithms/BubbleSort';

export interface SortingArrayData {
    array: number[],
    compareElements: number[]
}

export interface SortingStatus {
    running: boolean,
    delay: number,
    algorithm: string
}

export interface SortingContextType {
    arrayData: SortingArrayData,
    status: SortingStatus,
    resetArray(size: number): void,
    setAlgorithm(algorithm: string): void
    setSortingDelay(delay: number): void
    startStop(): void,
} 

export const SortingContext = createContext<SortingContextType>({
    arrayData: { array: [], compareElements: []},
    status: { running: false, delay: 10, algorithm: 'BubbleSort'},
    resetArray: () => {},
    setAlgorithm: () => {},
    setSortingDelay: () => {},
    startStop: () => {}
});

function generateArray(size: number): number[] {
    return [...Array(size)].map(() => ~~(1 + Math.random() * 100) );
}

const SortingProvider = (props: any) => {
    const [arrayData, setArrayData] = useState<SortingArrayData>({ array: generateArray(100), compareElements: [-1, -1]});
    const [status, setStatus] = useState<SortingStatus>({ running: false, delay: 10, algorithm: 'BubbleSort' });
    const [sortingAlg, setSortingAlg] = useState<ISortingAlgorithm>(new BubbleSort());

    const resetArray = (size: number) => {
        if(!status.running)
            setArrayData({ ...arrayData, 
                array: generateArray(size),
                compareElements: [-1, -1]
            });
    }

    const setAlgorithm = (algorithm : string) => {
        setStatus( { ...status, algorithm });
    }

    const setSortingDelay = (delay: number) => {
        setStatus({ ...status, delay: delay});
        if(sortingAlg)
            sortingAlg.setDelay(delay);
    }

    const startStop = async () => {
        if(!status.running) 
            setSortingAlg(new BubbleSort());
        else
            sortingAlg.stop();
        setStatus(  { ...status, running: !status.running}); 
    }

    useEffect( () => {
        if(status.running) {
            sortingAlg.start(arrayData.array, status.delay, async (array: number[], compareElements: number[]) => {
                setArrayData({ array, compareElements});
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortingAlg]);


    return(
        <SortingContext.Provider value={ {arrayData, status, resetArray, setAlgorithm, setSortingDelay, startStop} }>
            {props.children}
        </SortingContext.Provider>
    );
}

export default SortingProvider;