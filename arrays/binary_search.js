// let data = Array.of(46, 86, 68, 90, 59, 45, 1, 4, 1, 5, 6);
// let data=[4, 17, 18, 19, 24, 27, 33, 56, 80, 95]
// let data=[1,2,3,4,5];
let data =[1, 28, 36, 44, 48, 64, 78, 78];
// let data = [1, 1, 1, 1, 2];

const binary_search = (array, l, h, k) => {
  array.sort((a, b) => a - b);
  console.log("array", array);
  let lo = l;
  let hi = h;
  let mid = parseInt((lo + hi) / 2);
  while (lo <= hi) {
    if (array[mid] == k) {
      return mid + 1;
    } else if (k < array[mid]) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
    mid = parseInt((lo + hi) / 2);
  }
};
// let searchElement=binary_search(data,0,data.length,1);
// console.log("searchElement",searchElement);

// const binaryasearch =(arr,k)=>{
//     arr.sort((a,b)=>(a-b));
//     let lo=0;
//     let n=arr.length;
//     let hi=n;
//     let mid = parseInt((lo+hi)/2);
//     let returnIndex=-1;
//     while(lo<hi){
//         if(k>arr[mid]){
//             lo=mid+1;
//         }else if(arr[mid]==k){
//             returnIndex = mid+1;
//         }else{
//             hi=mid-1;
//         }
//         mid = parseInt((lo+hi)/2);
//     }
//     for(let i=returnIndex;i>0;i--){
//         if(arr[i]!=arr[returnIndex]){
//             returnIndex=i;
//             break;
//         }
//     }
//     return -1;
// }

const binaryasearch1 = (arr, k) => {
  arr.sort((a, b) => a - b);
  let lo = 0;
  let hi = arr.length;
  let mid = parseInt((lo + hi) / 2);
  while (lo < hi) {
    if (arr[mid] == k) {
      return mid + 1;
    } else if (k < arr[mid]) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
    mid = parseInt((lo + hi) / 2);
  }
};

function binarysearch(arr, k) {
  let lo = 0;
  let hi = arr.length;
  let mid = parseInt((lo + hi) / 2);
  let returnIndex = -1;

  while (lo <= hi) {
    if (arr[mid] == k) {
      returnIndex = mid;
      break;
    } else if (k < arr[mid]) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
    mid = parseInt((lo + hi) / 2);
  }

  for (let i = parseInt(returnIndex - 1); i >= 0; i--) {
    if (arr[i] == arr[returnIndex]) {
      --returnIndex;
    }
  }
  return returnIndex;
}

console.log(binarysearch(data, 1));



const binary_searchTest=(arr,key)=>{
  arr.sort((a,b)=>(a-b));
  console.log("arr ",arr);
  
  let l=0;
  let h=arr.length-1;
  let mid=parseInt((l+h)/2);
  while(l<=h){
    if(arr[mid]==key){
      return mid+1;
    }else if(arr[mid]<key){
      l=mid+1;
    }else{
      h=mid-1
    }
    mid=parseInt((l+h)/2);
  }
}

console.log("teste ",binary_searchTest(data ,48));
