// Q1 . what is Latewst Version of Es

// The latest edition of the ECMAScript standard as of my last update is ECMAScript 2021 (ES12). This version introduced several new features and improvements, including:
// 1. **String.prototype.replaceAll():** This method replaces all occurrences of a substring within a string with another substring.
// 2. **Numeric Separators:** This feature allows developers to use underscores (_) as separators within numeric literals, improving readability.
// 3. **Promise.any():** A new Promise combinator that takes an iterable of Promises and resolves with the value of the first Promise in the iterable to be fulfilled.
// 4. **WeakRef and FinalizationRegistry:** These features provide a mechanism for creating weak references to objects and for registering finalization callbacks to be invoked when an object is garbage collected.
// 5. **Logical Assignment Operators (&&=, ||=, ??=):** These operators combine logical operations with assignment, providing concise ways to update variables based on their current values.
// 6. **String.prototype.trimStart() and String.prototype.trimEnd():** These methods are additions to the existing `trim()` method and provide more specific functionality for trimming whitespace from the beginning and end of strings.
// 7. **Error Cause Property:** Errors now have a `cause` property that allows them to be associated with another error, enabling better error handling and debugging.
// These are just a few highlights of the new features introduced in ECMAScript 2021. It's worth noting that ECMAScript continues to evolve, with new proposals and features being developed for future versions.

// function findDuplicates(data) {
//     const duplicates = [];

//     for (let i = 0; i < data.length; i++) {
//         for (let j = i + 1; j < data.length; j++) {
//             if (data[i] === data[j] && !duplicates.includes(data[i])) {
//                 duplicates.push(data[i]);
//             }
//         }
//     }

//     return duplicates;
// }


// data = [10,20,30,40,10,20]; 
// const result = findDuplicates(data);
// console.log("Duplicates:", result);


// data = [10,20,30,40,10,20,10]; 
// var duplicates={};
// var freq ={};

// for (let i = 0; i<data.length; i++) {
//   var element = data[i];
  
//   if (freq[element] === undefined) {
//     freq[element] = 1;
//   } else {
//     freq[element]++;
//   }
  
//   for (let key in freq) {
//     if (freq[key] > 1) {
//       duplicates[key] = freq[key]
//     }
//   }
// }

// console.log(duplicates);