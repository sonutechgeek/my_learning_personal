<?php

// 1. Factorial (recursive)
function factorial($n) {
    if ($n === 0 || $n === 1) return 1;
    return $n * factorial($n - 1);
}

// 2. Fibonacci series (recursive)
function fibonacci($n) {
    if ($n === 0) return 0;
    if ($n === 1) return 1;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

function fibonacciSeries($count) {
    $series = [];
    for ($i = 0; $i < $count; $i++) {
        $series[] = fibonacci($i);
    }
    return $series;
}

// 3. Prime number check
function isPrime($n) {
    if ($n < 2) return false;
    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i === 0) return false;
    }
    return true;
}

// 4. Recursive sum of array
function recursiveSum($arr, $index = 0) {
    if ($index === count($arr)) return 0;
    return $arr[$index] + recursiveSum($arr, $index + 1);
}

// 4b. Recursive power (base ^ exponent)
function recursivePower($base, $exp) {
    if ($exp === 0) return 1;
    return $base * recursivePower($base, $exp - 1);
}


// --- Output ---

echo "--- Factorial ---\n";
for ($i = 0; $i <= 7; $i++) {
    echo "factorial($i) = " . factorial($i) . "\n";
}

echo "\n--- Fibonacci Series (first 10) ---\n";
echo implode(", ", fibonacciSeries(10)) . "\n";

echo "\n--- Prime Check ---\n";
$nums = [1, 2, 3, 4, 5, 10, 13, 17, 20, 23];
foreach ($nums as $n) {
    echo "$n is " . (isPrime($n) ? "Prime" : "Not Prime") . "\n";
}

echo "\n--- Recursive Sum ---\n";
$arr = [1, 2, 3, 4, 5];
echo "Sum of [" . implode(", ", $arr) . "] = " . recursiveSum($arr) . "\n";

echo "\n--- Recursive Power ---\n";
echo "2^10 = " . recursivePower(2, 10) . "\n";
echo "3^4  = " . recursivePower(3, 4) . "\n";
