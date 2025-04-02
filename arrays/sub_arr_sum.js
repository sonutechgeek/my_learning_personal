// let arr = [1,2,5,7,5];
// let arr = [1,1,1];
// let arr=[1, 2, 3, 7, 5]
let arr=[12, 18, 5, 11, 30, 5]

// let s = 2;
// let s = 12;
let s = 69;


let n=arr.length;
const find_sub_array=(arr,n,sum)=>{
    let current_sum=arr[0];
    let start=0;
    for(let i=1;i<arr.length;i++){
        while(current_sum> sum && start<i){
            current_sum=current_sum-arr[start];
            start++;
        }
        if(current_sum==sum){
            return [++start,i]
        }
        current_sum = current_sum + arr[i];
    }
    return -1;
} 

// console.log(find_sub_array(arr,n,s));


const find_total_sub_array=(arr,n,sum)=>{
    let current_sum=arr[0];
    let start=0;
    let count=0
    for(let i=1;i<arr.length;i++){
        while(current_sum> sum && start<i){
            current_sum=current_sum-arr[start];
            start++;
        }
        if(current_sum==sum){
            // return [++start,i];
            count++;
            start++;
        }
        current_sum = current_sum + arr[i];

    }
    return count;
} 


    const subarraySum=(arr, target)=> {
        let cur_sum=arr[0];
        let start=0;
        for(let i=1;i<arr.length+1;i++){
            while(cur_sum>target && i>start ){
                cur_sum=cur_sum-arr[start];
                start++;
            }
            if(cur_sum==target){                
              return [++start,i];
            
            }
            cur_sum=cur_sum+arr[i];
        }
        return [-1];
    }
    console.log(subarraySum(arr,s));

