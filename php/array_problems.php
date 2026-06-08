<?php

// 1. Remove duplicates from an array
function removeDuplicates($arr) {
    $unique = [];
    foreach ($arr as $val) {
        if (!in_array($val, $unique)) {
            $unique[] = $val;
        }
    }
    return $unique;
}

// 2. Find the second largest number
function secondLargest($arr) {
    $first = $second = PHP_INT_MIN;
    foreach ($arr as $val) {
        if ($val > $first) {
            $second = $first;
            $first = $val;
        } elseif ($val > $second && $val !== $first) {
            $second = $val;
        }
    }
    return $second === PHP_INT_MIN ? null : $second;
}

// 3. Sort array without built-in functions (Bubble Sort)
function sortArray($arr) {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    return $arr;
}

// 4. Merge two arrays
function mergeArrays($arr1, $arr2) {
    $merged = [];
    foreach ($arr1 as $val) $merged[] = $val;
    foreach ($arr2 as $val) $merged[] = $val;
    return $merged;
}


// --- Output ---

$arr = [1, 3, 2, 3, 4, 1, 5, 2];
echo "Original: " . implode(", ", $arr) . "\n";
echo "Remove Duplicates: " . implode(", ", removeDuplicates($arr)) . "\n\n";

$arr2 = [10, 5, 20, 8, 15];
echo "Array: " . implode(", ", $arr2) . "\n";
echo "Second Largest: " . secondLargest($arr2) . "\n\n";

$arr3 = [64, 25, 12, 22, 11];
echo "Unsorted: " . implode(", ", $arr3) . "\n";
echo "Sorted: " . implode(", ", sortArray($arr3)) . "\n\n";

$a = [1, 2, 3];
$b = [4, 5, 6];
echo "Array 1: " . implode(", ", $a) . "\n";
echo "Array 2: " . implode(", ", $b) . "\n";
echo "Merged: " . implode(", ", mergeArrays($a, $b)) . "\n";
