let arr=[4,5,6,7,9]
let temp=0;
let n=arr.length-1
for(let i=0;i<(arr.length)/2;i++){
    let first=arr[i];
    let last=arr[n-i];
    temp=first;
    arr[i]=last;
    arr[n-i]=temp;
}
console.log("reverse by my method",arr);
function reverseArrayExtraArray(arr1) {
    const reversedArr = arr1.slice().reverse();
    console.log("Reversed Array: ",reversedArr);
    // process.stdout.write("Reversed Array: ");
    // reversedArr.forEach(element => process.stdout.write(element + " "));
}

const originalArr = [1, 2, 3, 4, 5];
reverseArrayExtraArray(originalArr);
