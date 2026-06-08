let data= [2,3,4,1,2,30,3,5,78,9,0,2];


function swap(arr, index1,index2 ){
    let temp=arr[index1];
    arr[index1]=arr[index2];
    arr[index2]=temp;
}

function bubble_sort(arr,n){
    for(let i=0; i<n;i++){
        for(let j=0;j<n;j++){
            if(arr[i]<arr[j]){
                swap(arr,i,j);
            }
        }
    }
}
bubble_sort(data,data.length);

console.log("data Array is sorted",data);


// BubbleSort class implementation in JavaScript
class BubbleSort {
    // / Function to perform Bubble Sort
    bubbleSort(arr) {
        let n = arr.length;

        // Outer loop runs from the end towards the beginning
        for (let i = n - 1; i >= 0; i--) {
            // Inner loop iterates up to the i-th index
            for (let j = 0; j <= i - 1; j++) {
                // If current element is greater than the next element, swap them
                
                
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                    console.log(j,i,temp);
                }
            }
        }

        // Print the sorted array
        console.log("After Using Bubble Sort:");
        console.log(arr.join(" "));
    }
}

// Driver code (equivalent to Java's main method)
(function main() {
    // Input array
    let arr = [13, 46, 24, 52, 20, 9];

    console.log("Before Using Bubble Sort:");
    console.log(arr.join(" ")); // Print array elements in one line

    // Create object of BubbleSort class
    let sorter = new BubbleSort();
    sorter.bubbleSort(arr);  // Call bubbleSort method
})();
