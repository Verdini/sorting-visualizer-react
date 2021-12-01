import Sleep from '../utils/Sleep';


export default async function BubbleSort(array: number[], delay: number, onStateChange: (array: number[], compareElements: number[]) => void) {
    let sArray = [...array];
    var length = sArray.length;  

    for (var i = 0; i < length; i++) { 
        for (var j = 0; j < (length - i - 1); j++) { 
            await Sleep(delay);
            onStateChange( sArray, [j, j+1] );
            if(sArray[j] > sArray[j+1]) {           
                var tmp = sArray[j]; 
                sArray[j] = sArray[j+1]; 
                sArray[j+1] = tmp; 
                await Sleep(delay);
                onStateChange( sArray, [j, j+1] );
            }
        }        
    }
    await Sleep(delay);
    onStateChange( sArray, [-1, -1] );
}
