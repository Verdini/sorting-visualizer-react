import React, { createContext, useEffect, useState } from 'react';
import { Sorting } from '../models/Sorting';


export interface SortingContextType {
    sorting: Sorting,
    resetArray(size: number): void,
    setAlgorithm(algorithm: string): void
    setSortingDelay(delay: number): void
    startStop(): void,
} 

export const SortingContext = createContext<SortingContextType>({
    sorting: new Sorting([], [], false, 10, 'BubbleSort'),
    resetArray: () => {},
    setAlgorithm: () => {},
    setSortingDelay: () => {},
    startStop: () => {}
});

const SortingProvider = (props: any) => {
    const [sorting, setSorting] = useState<Sorting>(new Sorting([], [], false, 10, 'BubbleSort'));

    const resetArray = (size: number) => {
        if(!sorting.running)
            setSorting({ ...sorting, 
                array: [...Array(size)].map(() => ~~(1 + Math.random() * 100) ),
                compareElements: [-1, -1]
            });
    }

    const setAlgorithm = (algorithm : string) => {
        setSorting( { ...sorting, algorithm });
    }

    const setSortingDelay = (delay: number) => {
        setSorting({ ...sorting, sortingDelay: delay});
    }

    const startStop = () => {
        setSorting( { ...sorting, running: !sorting.running});
    }

    return(
        <SortingContext.Provider value={ {sorting, resetArray, setAlgorithm, setSortingDelay, startStop} }>
            {props.children}
        </SortingContext.Provider>
    );
}

export default SortingProvider;