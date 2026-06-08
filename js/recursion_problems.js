// 1. Factorial (recursive)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// 2. Fibonacci series (recursive)
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciSeries(count) {
    const series = [];
    for (let i = 0; i < count; i++) {
        series.push(fibonacci(i));
    }
    return series;
}

// 3. Prime number check
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// 4. Recursive sum of array
function recursiveSum(arr, index = 0) {
    if (index === arr.length) return 0;
    return arr[index] + recursiveSum(arr, index + 1);
}

// 4b. Recursive power (base ^ exponent)
function recursivePower(base, exp) {
    if (exp === 0) return 1;
    return base * recursivePower(base, exp - 1);
}


// --- Output ---

console.log("--- Factorial ---");
for (let i = 0; i <= 7; i++) {
    console.log(`factorial(${i}) = ${factorial(i)}`);
}

console.log("\n--- Fibonacci Series (first 10) ---");
console.log(fibonacciSeries(10).join(", "));

console.log("\n--- Prime Check ---");
const nums = [1, 2, 3, 4, 5, 10, 13, 17, 20, 23];
nums.forEach(n => {
    console.log(`${n} is ${isPrime(n) ? "Prime" : "Not Prime"}`);
});

console.log("\n--- Recursive Sum ---");
const arr = [1, 2, 3, 4, 5];
console.log(`Sum of [${arr}] = ${recursiveSum(arr)}`);

console.log("\n--- Recursive Power ---");
console.log(`2^10 = ${recursivePower(2, 10)}`);
console.log(`3^4  = ${recursivePower(3, 4)}`);
