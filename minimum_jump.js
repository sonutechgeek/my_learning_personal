// let arr = [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]
// let arr = [1, 4, 3, 2, 6, 7];
// let arr = [0, 10, 20];
let arr=[9 ,10 ,1 ,2 ,3 ,4 ,8 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1]
function minJumps(arr) {
    let n= arr.length;
    let k=arr[0];
    let count =1;
    let return1=-1;
    // console.log((k<n));
    
    for(let i=k;i<n;i=i+k){
        // console.log('test');

        if(arr[0]==0){
            break;
        }
        k=arr[i];
        count =count +1;

        if(k>=n|| arr[i]==0){
            break;
        }
        
    }
    if(count>1){
        return1=count;
    }
    return return1;
}

console.log(minJumps(arr));
