import BubbleSort from '../algorithms/bubblesort';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals
    addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'start':
                console.log("Start");
                let delay = data.speed*(-10) + 1010;
                BubbleSort(data.array, delay, (array: number[], compareElements: number[]) => {
                    postMessage({ array, compareElements });
                });
                break;
            case 'stop':
                console.log("Stop");
                // eslint-disable-next-line no-restricted-globals
                close(); // Terminates the worker.
                break;
            case 'speed':
                break;
            default:
                console.log('Unknown command');
        };
    }, false);
}

