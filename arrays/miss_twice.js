// let data=[4, 3, 6, 2, 1, 1];
let data = [2, 2];
// let data = [5, 1, 6, 2, 4, 6];
function miss_twice(arr) {
  let sum = 0;
  let n = arr.length;
  let total_sum = parseInt((n * (n + 1)) / 2);
  let missNum = 0;
  let duplicate = 0;
  let map = {};
  for (let i = 0; i < n; i++) {
    if (map[arr[i]] != undefined) {
      map[arr[i]] = map[arr[i]] + 1;
    } else {
      map[arr[i]] = 1;
    }
  }
  for (let key in map) {
    sum = sum + parseInt(key);
    if (map[key] > 1) {
      duplicate = parseInt(key);
    }
  }
  missNum = total_sum - sum;
  return [duplicate, missNum];
}
console.log(miss_twice(data));
