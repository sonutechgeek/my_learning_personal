

let row=5;
let pattern="";

for(let i=1;i<=row;i++){
    for(let j=1;j<=i;j++){
        pattern+=j+" ";
    }
    pattern+="\n";
}

for(let i=row-1;i>=1;i--){
    for(let j=1;j<=i;j++){
        pattern+=j+" ";
    }
    pattern+="\n";
}
// console.log(pattern);




// let pattern1="";
// for(let i=row-1;i>=1;i--){
//     for(let j=1;j<=i;j++){
//         pattern+=j+" ";
//     }
//     pattern+="\n";
// }
console.log(pattern);




