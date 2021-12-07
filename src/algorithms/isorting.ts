export default interface ISorting {
    run: boolean;
    delay: number;
    start: (array: number[], delay: number, onStateChange: (array: number[], compareElements: number[]) => void) => void;
    stop: () => void;
    setDelay: (delay: number) => void;
}