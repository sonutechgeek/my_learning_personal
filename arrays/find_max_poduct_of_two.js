let arr=[4,5,7,10,-12,6,-12,45]

// const findMaxOfTwo=(arr)=>{
//     arr.sort((a,b)=>Math.abs(a)-Math.abs(b));
//     let firstMax=arr[arr.length-1];
//     let secMax=arr[arr.length-2];
//     return(firstMax*secMax);
// }

const findMaxOfTwo=(arr)=>{
    // arr.sort((a,b)=>Math.abs(a)-Math.abs(b));
    // let firstMax=arr[arr.length-1];
    // let secMax=arr[arr.length-2];
    // return(firstMax*secMax);

    let max=0;
    let secMax=0;
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if(element<0) element = -element;


        if(element>max){
            secMax=max;
            max=element
        }else if(element>secMax && max>element){
            secMax=element;
        }

        // if(Math.abs(element)>max){
        //     secMax=max;
        //     max=Math.abs(element)
        // }else if(Math.abs(element)>secMax && max>Math.abs(element)){
        //     secMax=Math.abs(element);
        // }
        
    }
    return(max*secMax);
}

console.log(findMaxOfTwo(arr));
