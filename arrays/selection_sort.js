let arr=[4,5,6,2,3,4,5,6,7,3,4,5];

function swap(arr1,i1,j1){
    let temp= arr1[i1];
    arr1[i1]=arr1[j1];
    arr1[j1]=temp;
}
for(let i=0;i<arr.length-1;i++){
    let minindex=i;
    for(let j=i+1;j<arr.length;j++){
        if(arr[j]<arr[minindex]){
            minindex=j;
        }
    }
    swap(arr,minindex,i);
}

// console.log("fjrjvruvn");

console.log('sort',arr);