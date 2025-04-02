let data  = [7, 10, 4, 3, 20, 15];
let  k = 3;
function kthSmallest(arr, k) {
    // code here
    arr.sort((a,b)=>(a-b));
    return arr[k-1];
}
console.log(kthSmallest(data,k));

