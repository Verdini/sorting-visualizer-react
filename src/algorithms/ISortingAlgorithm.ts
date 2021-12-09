export default interface ISortingAlgorithm {
    start: (array: number[], onStateChange: (array: number[], compareElements: number[]) => void, onFinish: () => void) => void;
    stop: () => void;
    setDelay: (delay: number) => void;
}