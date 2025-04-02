// Input: arr[] = [1, 3, 2, 4]
// Output: [3, 4, 4, -1]
// Explanation: The next larger element to 1 is 3, 3 is 4, 2 is 4 and for 4, since it doesn't exist, it is -1.

// let data=[1,3,2,4]
let data=[6, 8, 0, 1, 3]

const findGreaterElement=(arr)=>{
    // let result=[];
    // let n=arr.length;
    // for(let i=0;i<arr.length;i++){
    //     for(let j=i+1;j<n;j++){
    //         if(arr[j]<arr[i] && j<n-1){
    //         }else if(arr[j]<arr[i] && j==n-1){
    //             result.push(-1);
    //         }
    //         else{
    //             result.push(arr[j]);
    //             break;
    //         }
            
    //     }

    // }
    // result.push(-1);
    // return result;


    let result = [];
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        let found = false; 
        for (let j = i + 1; j < n; j++) {
            if (arr[j] > arr[i]) {
                result.push(arr[j]);
                found = true; 
                break;
            }
        }
        if (!found) {
            result.push(-1);
        }
    }

    return result;
}
 console.log(findGreaterElement(data));
