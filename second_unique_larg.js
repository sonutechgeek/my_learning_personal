let data=[10,10,10];

function getSecondLarg(arr){
    // let map=new Map();
    // for(let i=0;i<arr.length;i++){
    //     if(map.has(arr[i])){
    //         map.set(arr[i],map.get(arr[i])+1);
    //     }else{
    //         map.set(arr[i],1)
    //     }
    // }
    // let modifiedData=[];
    // modifiedData=Array.from(map.keys());
    // modifiedData.sort((a,b)=>(a-b));
    // if(modifiedData[modifiedData.length-2]){
    //     return(modifiedData[modifiedData.length-2]);
    // }else{
    //     return -1;

    // }
    let max=arr[0];
    let secMax=-1;
    for(let i=1;i<arr.length;i++){
        if(arr[i]>max){
            secMax=max;
            max=arr[i];
        }
        if(arr[i]>secMax && arr[i]<max){
            secMax=arr[i];
        }
    }
    return secMax;
}

console.log(getSecondLarg(data));