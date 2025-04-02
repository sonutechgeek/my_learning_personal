function longestSubstring(s) {
    let maxLength = 0;
    let current = "";

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        for (let j = 0; j < current.length; j++) {
            if (current[j] === char) {
                current = current.slice(j + 1); 
                break;
            }
        }

        current += char; 
        if (current.length > maxLength) {
            maxLength = current.length; 
        }
    }

    return maxLength;
}

// Example
console.log(longestSubstring("ABCDC"));  // Output: 3 (ABC)
console.log(longestSubstring("GEEKSFORGEEKS"));  // Output: 7 (EKSFORG or KSFORGE)



function longestSubstring1(s) {
    let maxLength = 0;
    let current = []; // Use an array to build the substring manually

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // Check if character exists in the current substring
        let duplicateIndex = -1;
        for (let j = 0; j < current.length; j++) {
            if (current[j] === char) {
                duplicateIndex = j;
                break;
            }
        }

        // If duplicate character found, remove characters before it
        if (duplicateIndex !== -1) {
            let newCurrent = [];
            for (let k = duplicateIndex + 1; k < current.length; k++) {
                newCurrent.push(current[k]);
            }
            current = newCurrent;
        }

        current.push(char); // Add the current character
        if (current.length > maxLength) {
            maxLength = current.length; // Update max length
        }
    }

    return maxLength;
}

// Example
console.log(longestSubstring1("ABCDC"));  // Output: 3 (ABC)
console.log(longestSubstring1("GEEKSFORGEEKS"));  // Output: 7 (EKSFORG or KSFORGE)
