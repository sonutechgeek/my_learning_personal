let data = [-2, 6, -3, -10, 0, 2];
// let data =[2 ,3 ,4]
function getTwoArray(arr) {
  if (arr.length === 0) return 0;

  let maxProduct = arr[0];
  let minProduct = arr[0];
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < 0) {
      [maxProduct, minProduct] = [minProduct, maxProduct];
    }
    maxProduct = Math.max(arr[i], maxProduct * arr[i]);
    minProduct = Math.min(arr[i], minProduct * arr[i]);
    result = Math.max(result, maxProduct);
  }

  // brutforse
  // let max=Number.MIN_SAFE_INTEGER
  // for (let i = 0; i < arr.length; i++) {
  //     for (let j = i; j < arr.length; j++) {
  //         let array=[];
  //         let prod=1;
  //         for(let k=i;k<=j;k++){
  //             array.push(arr[k]);
  //             prod=prod*arr[k];
  //         }
  //         max=Math.max(max,prod);
  //         console.log(prod,array);
  //     }

  // }

  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < arr.length; i++) {
    let prod = 1;
    for (let j = i; j < arr.length; j++) {
      prod = prod * arr[j];
      // let array=[];
      // for(let k=i;k<=j;k++){
      //     array.push(arr[k]);
      //     prod=prod*arr[k];
      // }
      // console.log(prod,array);
      max = Math.max(max, prod);
    }
  }

  console.log("maxn ", max);

  return result;
}
console.log(getTwoArray(data));

function obsarvation(arr) {
  let ans = Number.MIN_SAFE_INTEGER;
  let pre = 1;
  let post = 1;
  let n = arr.length;
  for (let i = 0; i < arr.length; i++) {
    if (pre == 0) pre = 1;
    if (post == 0) post = 1;
    pre = pre * arr[i];
    post = post * arr[n - i - 1];
    
    console.log(Math.max(pre, post),pre,post);
    ans = Math.max(ans, Math.max(pre, post));
  }
  return ans;
}
console.log(
obsarvation(data)
);











// const secondObservation =()=>{

// }