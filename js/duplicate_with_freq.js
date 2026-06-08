data = [10,20,30,40,10,20,10]; 
var duplicates={};
var freq ={};

for (let i = 0; i<data.length; i++) {
  var element = data[i];
  
  if (freq[element] === undefined) {
    freq[element] = 1;
  } else {
    freq[element]++;
  }
  
  for (let key in freq) {
    if (freq[key] > 1) {
      duplicates[key] = freq[key]
    }
  }
}

console.log(duplicates);