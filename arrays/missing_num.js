let data = [1,2,4,5,6];
const findMissingNumber=(data,n)=>{

    let sum=parseInt(n*(n+1)/2);
    let s=0;
    data.forEach(element => {
        s=s+parseInt(element);
        console.log(s);
    });
    return parseInt(sum-s);
}
console.log("missing",findMissingNumber(data,data.length+1));



let data1 = [100,101,102,103,104,105,107,108,109];












// const findMissingRandunNumber=(data,n)=>{
//     let last=data[n-2];
//     let first=data[0];
//     first=first-1;

//     let notContunious=(first*(first+1)/2);
//     let sum=parseInt(last*(last+1)/2);
//     let s=0;
//     sum=sum-notContunious;
//     data.forEach(element => {
//         s=s+parseInt(element);
//     });
//     return parseInt(sum-s);
// }
// console.log("missing",findMissingRandunNumber(data1,data1.length+1));


const findMissingRandunNumber=(data,n)=>{
    // data.forEach((element,index,array) => {
    //     // s=s+parseInt(element);

    //     console.log("element",element,"arr",array[++index]-1);
    //     if(element!=array[++index]-1){
    //         if(array[++index]!=undefined  ){
    //             console.log("element");
    //             return element+1;

    //         }
    //     }


    // });
        for(let i=0;i<data.length;i++){
            if(data[i]+1!=data[i+1]){
                return data[i]+1;
            }
        }

    // return parseInt(sum-s);
}
console.log("missing",findMissingRandunNumber(data1,data1.length+1));


