import React, { createContext, useEffect, useState } from 'react';
import ISortingAlgorithm from '../algorithms/ISortingAlgorithm';
import BubbleSort from '../algorithms/BubbleSort';
import HeapSort from '../algorithms/HeapSort';

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
        let alg: ISortingAlgorithm;
        if(!status.running) {
            switch(status.algorithm) {
                case 'HeapSort':
                    alg = new HeapSort();
                    break;

                case 'MergeSort':
                    alg = new BubbleSort();
                    break;
                
                case 'QuickSort':
                    alg = new BubbleSort();
                    break;

                case 'BubbleSort':
                default:
                    alg = new BubbleSort();
                    break;
            }
            setSortingAlg(alg);
        } else
            sortingAlg.stop();
        setStatus(  { ...status, running: !status.running}); 
    }

    useEffect( () => {
        if(status.running) {
            sortingAlg.setDelay(status.delay);
            sortingAlg.start(arrayData.array, async (array: number[], compareElements: number[]) => {
                setArrayData({ array, compareElements});
            }, () => {
                setStatus( { ...status, running: false});
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