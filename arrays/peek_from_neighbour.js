arr=[5, 10, 20, 15,45,29];
// arr=[1, 2, 3];

let first;
let middle;
let last;
let res=[];
for(let i=0;i<arr.length-2;i++){
    first=i;
    middle=i+1;
    last=i+2;
    if((arr[middle]>arr[first] )&& (arr[first]!=undefined) || arr[middle]!=undefined || arr[last]!=undefined){
        if(arr[middle]>arr[last]){
            res.push(arr[middle]);
        }
    }
}
console.log("peeks of element ", res);