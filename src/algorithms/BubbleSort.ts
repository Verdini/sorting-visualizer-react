import Sleep from '../utils/Sleep';
import ISortingAlgorithm from './ISortingAlgorithm';

export default class BubbleSort implements ISortingAlgorithm {
  run: boolean;

  delay: number;

  constructor() {
    this.run = true;
    this.delay = 10;
  }

  start = async (
    array: number[],
    onStateChange: (array: number[], compareElements: number[]) => void,
    onFinish: () => void,
  ) => {
    const sArray = [...array];
    const { length } = sArray;

    outsideLoop:
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < (length - i - 1); j++) {
        if (this.run === false) { break outsideLoop; }

        await Sleep(this.delay);
        onStateChange(sArray, [j, j + 1]);
        if (sArray[j] > sArray[j + 1]) {
          const tmp = sArray[j];
          sArray[j] = sArray[j + 1];
          sArray[j + 1] = tmp;
          await Sleep(this.delay);
          onStateChange(sArray, [j, j + 1]);
        }
      }
    }
    await Sleep(this.delay);
    onStateChange(sArray, [-1, -1]);
    onFinish();
  };

  stop = () => {
    this.run = false;
  };

  setDelay = (delay: number) => {
    this.delay = delay;
  };
}
