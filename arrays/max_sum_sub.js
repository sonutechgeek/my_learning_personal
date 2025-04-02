// const data=[2, 3, -8, 7, -1, 2, 3];
const data=[-79, -68, -18, -58, 25, 52, -68, -30, 6, 10]

const findSum=(arr)=>{
    let ans=Number.MIN_SAFE_INTEGER;
    // let start=0;
    // let end=0;
    // let n=arr.length;
    // for (let i = 0; i < arr.length; i++) {
    //     start=start+arr[i];
    //     end=end+arr[n-i-1];
    //     ans=Math.max(ans,Math.max(start,end));
    // }
    // return ans;

    for (let i = 0; i < arr.length; i++) {
        // const element = arr[i];
        let sum=0;
        for(let j=i;j<arr.length;j++){
            sum=sum+arr[j];
            ans=Math.max(ans,sum);
        }
        
    }

    let res=Number.MIN_SAFE_INTEGER;
    let current=0;
    for(let i=0; i<arr.length;i++){
        current=Math.max(arr[i],current+arr[i]);
        res=Math.max(current,res);
    }

    return res



    // return ans;

}
console.log(findSum(data));
