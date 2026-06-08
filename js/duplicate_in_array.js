data = [10, 20, 30, 40, 10, 20, 10];
map = {};
duplicateArry = [];
duplicate_wirh_freq = {};

for (let i = 0; i < data.length; i++) {
  let element = data[i];
  if (map[element] == undefined) {
    map[element] = 1;
  } else if (map[element]) {
    map[element] = map[element] + 1;
  }
}

for (let key in map) {
  if (map[key] > 1) {
    duplicateArry.push(key);
    duplicate_wirh_freq[key] = map[key];
  }
}

data2 = [];
data.forEach((element) => {
  if (element in data2) {
    // continue;
  } else {
    data2.push(element);
  }
  // console.log();
});
console.log("data2", data2);
console.log("duplicate in array", duplicateArry);
console.log("duplicate in array with freq", duplicate_wirh_freq);
