// 1. Remove duplicates from an array
function removeDuplicates(arr) {
    const unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }
    return unique;
}

// 2. Find the second largest number
function secondLargest(arr) {
    let first = -Infinity;
    let second = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        } else if (arr[i] > second && arr[i] !== first) {
            second = arr[i];
        }
    }
    return second === -Infinity ? null : second;
}

// 3. Sort array without built-in functions (Bubble Sort)
function sortArray(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// 4. Merge two arrays
function mergeArrays(arr1, arr2) {
    const merged = [];
    for (let i = 0; i < arr1.length; i++) merged.push(arr1[i]);
    for (let i = 0; i < arr2.length; i++) merged.push(arr2[i]);
    return merged;
}


// --- Output ---

const arr = [1, 3, 2, 3, 4, 1, 5, 2];
console.log(`Original: ${arr}`);
console.log(`Remove Duplicates: ${removeDuplicates(arr)}\n`);

const arr2 = [10, 5, 20, 8, 15];
console.log(`Array: ${arr2}`);
console.log(`Second Largest: ${secondLargest(arr2)}\n`);

const arr3 = [64, 25, 12, 22, 11];
console.log(`Unsorted: ${arr3}`);
console.log(`Sorted: ${sortArray([...arr3])}\n`);

const a = [1, 2, 3];
const b = [4, 5, 6];
console.log(`Array 1: ${a}`);
console.log(`Array 2: ${b}`);
console.log(`Merged: ${mergeArrays(a, b)}`);
