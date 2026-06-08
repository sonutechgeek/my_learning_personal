<?php

// 1. Reverse a string without strrev()
function reverseString($str) {
    $reversed = '';
    for ($i = strlen($str) - 1; $i >= 0; $i--) {
        $reversed .= $str[$i];
    }
    return $reversed;
}

// 2. Check palindrome
function isPalindrome($str) {
    $str = strtolower($str);
    return $str === reverseString($str);
}

// 3. Count character occurrences
function countCharOccurrences($str, $char) {
    $count = 0;
    for ($i = 0; $i < strlen($str); $i++) {
        if ($str[$i] === $char) {
            $count++;
        }
    }
    return $count;
}

// 4. Find duplicate characters
function findDuplicates($str) {
    $charCount = [];
    $duplicates = [];

    for ($i = 0; $i < strlen($str); $i++) {
        $char = $str[$i];
        if (isset($charCount[$char])) {
            $charCount[$char]++;
        } else {
            $charCount[$char] = 1;
        }
    }

    foreach ($charCount as $char => $count) {
        if ($count > 1) {
            $duplicates[$char] = $count;
        }
    }

    return $duplicates;
}


// --- Output ---

$str = "madam";
echo "String: $str\n";
echo "Reversed: " . reverseString($str) . "\n";
echo "Is Palindrome: " . (isPalindrome($str) ? "Yes" : "No") . "\n\n";

$str2 = "programming";
echo "String: $str2\n";
echo "Is Palindrome: " . (isPalindrome($str2) ? "Yes" : "No") . "\n";
echo "Count of 'g': " . countCharOccurrences($str2, 'g') . "\n";
echo "Count of 'm': " . countCharOccurrences($str2, 'm') . "\n";

$duplicates = findDuplicates($str2);
echo "Duplicate characters:\n";
foreach ($duplicates as $char => $count) {
    echo "  '$char' appears $count times\n";
}
