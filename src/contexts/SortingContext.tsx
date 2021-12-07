import React, { createContext, useEffect, useState } from 'react';
import { Sorting } from '../models/Sorting';


export interface SortingContextType {
    sorting: Sorting,
    resetArray(size: number): void,
    startSorting(): void,
    stopSorting(): void,
    setSortingDelay(): void
} 

export const SortingContext = createContext<SortingContextType>({
    sorting: new Sorting([], [], false, 10, 'BubbleSort'),
    resetArray: () => {},
    startSorting: () => {},
    stopSorting: () => {},
    setSortingDelay: () => {}
});

const SortingProvider = (props: any) => {
    const [sorting, setSorting] = useState<Sorting>(new Sorting([], [], false, 10, 'BubbleSort'));

    const resetArray = (size: number) => {

    }

    const startSorting = () => {

    }

    const stopSorting = () => {

    }

    const setSortingDelay = () => {

    }

    return(
        <SortingContext.Provider value={ {sorting, resetArray, startSorting, stopSorting, setSortingDelay} }>
            {props.children}
        </SortingContext.Provider>
    );
}

export default SortingProvider;