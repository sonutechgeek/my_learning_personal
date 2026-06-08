let data = [10, 5, 2, 7, 1, -10];
let k = 15
// let data = [-5, 8, -14, 2, 4, 12];
// let k = -5
// let data=[94, -33, -13, 40, -82, 94, -33, -13, 40, -82];
// let k=52

function longestSub_array(arr,k){
    // let test=[];
    // let return1=0;
    // let max=0;
    // for (let i = 0; i < arr.length; i++) {
    //     let curSum=arr[i];
    //     for (let j = i+1; j <=arr.length; j++) {
    //         const element = arr[j];
    //         if(curSum==k){
    //             let t=j;
    //             // --t;
    //             max=Math.max(max,t-i);
    //             test.push([i,t]);
    //         }
    //         curSum=curSum+element;
    //     }
        
    // }
    // console.log(test,"test");
    // if(max){
    //     return1 =max;

    // }
    // return return1+1;

    let prefixSum = 0;
        let maxLength = 0;
        const sumIndexMap = new Map();

        for (let i = 0; i < arr.length; i++) {
            prefixSum += arr[i];

            // If prefixSum equals k, the subarray starts from index 0
            if (prefixSum === k) {
                maxLength = i + 1;
            }

            // If (prefixSum - k) exists in the map, a subarray with sum k is found
            if (sumIndexMap.has(prefixSum - k)) {
                console.log(i,'test');
                
                maxLength = Math.max(maxLength, i - sumIndexMap.get(prefixSum - k));
            }

            // Store the first occurrence of the prefixSum in the map
            if (!sumIndexMap.has(prefixSum)) {
                sumIndexMap.set(prefixSum, i);
            }
            console.log('sumIndexMap ',i,sumIndexMap);

        }
        // console.log('sumIndexMap ',sumIndexMap);
        

        return maxLength;
}
console.log(longestSub_array(data,k));