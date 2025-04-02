// let data=[3, 1, 3, 3, 2];
let data=[5, 6, 5, 6, 5, 6, 5, 6, 5, 5, 5, 5 ,5]
// let data=[7];


function majorityElement(arr) {
    // your code here
    // let map=new Map();
    let map={};
    let n=arr.length;
    if(n==1){
        return arr[n-1]
    }
    let majorityCount=parseInt(n/2); 
    for(let i=0;i<arr.length;i++){
        if(map[arr[i]]){
            map[arr[i]]=map[arr[i]]+1;
        }else{
            map[arr[i]]=1;
        }
    }
    console.log(map);
    let test=[];
    let retunt=-1;
    for(let key in map){
        if(map[key]>majorityCount){
            // retunt = ;
            test.push(key)
        }
    }
    if(test){
        retunt=test[test.length-1]; 
    }
    return retunt;
    
}
console.log(majorityElement(data));
