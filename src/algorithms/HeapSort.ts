import Sleep from '../utils/Sleep';
import ISortingAlgorithm from './ISortingAlgorithm';


export default class HeapSort implements ISortingAlgorithm {

    run: boolean;
    delay: number;
    onStateChange: (array: number[], compareElements: number[]) => void;

    constructor() {
        this.run = true;
        this.delay = 10;
        this.onStateChange = () => {}
    }

    start = async (array: number[], onStateChange: (array: number[], compareElements: number[]) => void, onFinish: () => void) => {
        let sArray = [...array];
        this.onStateChange = onStateChange;

        // Build max heap
        await this.buildMaxHeap(sArray);
        // Get the index of the last element
        let lastElement = sArray.length - 1;
        
        // Continue heap sorting until we have
        // One element left
        while (lastElement > 0) {
            if(this.run == false ) break;
            await this.swap(sArray, 0, lastElement);
            await this.heapify(sArray, 0, lastElement);
            lastElement -= 1;
        }
         
        await Sleep(this.delay);
        onStateChange( sArray, [-1, -1] );
        onFinish();
    }

    stop = () => {
        this.run = false;
    }

    setDelay = (delay: number) => {
        this.delay = delay;
    }

    buildMaxHeap = async (arr: number[]) => {
        // Get index of the middle element
        let i = Math.floor(arr.length / 2 - 1);
        
        // Build a max heap out of
        // All array elements passed in
        while (i >= 0) {
            if(this.run == false ) break;
            await this.heapify(arr, i, arr.length);
            i -= 1;
        }
    }

    heapify = async (heap: number[], i: number, max: number) => {
        let index: number;
        let leftChild: number;
        let rightChild: number;
      
        while (i < max) {
            if(this.run == false ) break;
          index = i;
          leftChild = 2 * i + 1;
          rightChild = leftChild + 1;
      
          // If the left child is not last element 
          // And its value is bigger
          if (leftChild < max && heap[leftChild] > heap[index]) {
            index = leftChild;
          }
      
          // If the right child is not last element 
          // And its value is bigger
          if (rightChild < max && heap[rightChild] > heap[index]) {
            index = rightChild;
          }
      
          // If none of the above conditions is true
          // Just return
          if (index === i) {
            return;
          }
      
          // Else swap elements
          await this.swap(heap, i, index);
      
          // Continue by using the swapped index
          i = index;
        }
    }

    swap = async (arr: number[], firstItemIndex: number, lastItemIndex: number) => {
        const temp = arr[firstItemIndex];
      
        // Swap first and last items in the array
        arr[firstItemIndex] = arr[lastItemIndex];
        arr[lastItemIndex] = temp;

        await Sleep(this.delay);
        this.onStateChange( arr, [firstItemIndex, lastItemIndex] );
    }

}


