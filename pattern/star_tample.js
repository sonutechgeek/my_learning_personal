// let row=5;
// let pattern="";

// for(let i=1;i<=row;i++){
//     for(let j=row;j>=1;j--){
//         if(j>i){
//             pattern+=" ";
//         }
//         else{
//             pattern+=" " +"*";
//         }
//     }
//     pattern+="\n";
// }
// pattern1="";
// for(let i=1;i<=row;i++){
//     for(let j=row;j>=1;j--){
//         if(j>i){
//             pattern1+=" *";
//         }
//         else{
//             pattern1+=" "+" ";
//         }
//     }
//     pattern1+="\n";
// }
// console.log(pattern);
// console.log(pattern1);
// // for(let i=1;i<=row;i++){
// //     for(let j=1;j<=i;j++){
// //         pattern+=j+" ";
// //     }
// //     pattern+="\n";
// // }



// let rows = 5;

// // pattern variable carries the final pattern in string format
// let pattern = "";

// // outer loop runs for `rows` no. of times
// for (let n = 1; n <= rows; n++) {
//    // print stars for n number of times in each row
//    for (let num = 1; num <= n; num++) {
//       pattern += "*";
//    }
//    pattern += "\n";
// }
// console.log(pattern);

let rows = 5;
let pattern = "";
for (let n = 1; n <= rows; n++) {
   for (let space = 1; space <= rows - n; space++) {
      pattern += " ";
   }
   for (let num = 1; num <= 2 * n - 1; num++) {
      pattern += "*";
   }
   pattern += "\n";
}
console.log(pattern);