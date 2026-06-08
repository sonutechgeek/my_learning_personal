// 1. Reverse a string without built-in reverse()
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// 2. Check palindrome
function isPalindrome(str) {
    str = str.toLowerCase();
    return str === reverseString(str);
}

// 3. Count character occurrences
function countCharOccurrences(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) count++;
    }
    return count;
}

// 4. Find duplicate characters
function findDuplicates(str) {
    const charCount = {};
    const duplicates = {};

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (const char in charCount) {
        if (charCount[char] > 1) {
            duplicates[char] = charCount[char];
        }
    }

    return duplicates;
}


// --- Output ---

const str1 = "madam";
console.log(`String: ${str1}`);
console.log(`Reversed: ${reverseString(str1)}`);
console.log(`Is Palindrome: ${isPalindrome(str1) ? "Yes" : "No"}\n`);

const str2 = "programming";
console.log(`String: ${str2}`);
console.log(`Is Palindrome: ${isPalindrome(str2) ? "Yes" : "No"}`);
console.log(`Count of 'g': ${countCharOccurrences(str2, 'g')}`);
console.log(`Count of 'm': ${countCharOccurrences(str2, 'm')}`);

const duplicates = findDuplicates(str2);
console.log("Duplicate characters:");
for (const char in duplicates) {
    console.log(`  '${char}' appears ${duplicates[char]} times`);
}
