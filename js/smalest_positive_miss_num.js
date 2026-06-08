// let data=[2, -3, 4, 1, 1, 7];
// let data=[5, 3, 2, 5, 1];
// let data=[-8, 0, -1, -4, -3];
// let data=[2 ,6 ,2 ,-8, -7, 8,]
let data = [1, 2, 3, 4, 5];
function getMissNumber(arr) {
  let unique = {};
  for (let i = 0; i < arr.length; i++) {
    if (unique[arr[i]]) {
      unique[arr[i]] = unique[arr[i]] + 1;
    } else {
      unique[arr[i]] = 1;
    }
  }
  let array = [];
  for (let key in unique) {
    if (key >= 0) {
      array.push(key);
    }
  }
  let smallestMissing = 1; 
  for (let num of array) {
    if (parseInt(num) === smallestMissing) {
      smallestMissing++; 
    } else if (num > smallestMissing) {
      break; 
    }
  }
  return smallestMissing;
}
console.log(getMissNumber(data));
