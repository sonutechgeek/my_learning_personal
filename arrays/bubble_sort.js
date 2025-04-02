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