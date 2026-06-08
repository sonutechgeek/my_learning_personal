class Solution {
    // Function to count frequency of each element in the array
    countFreq(arr, n) {
        // Create a visited array to mark elements that are already processed
        let visited = Array(n).fill(false);

        // Traverse through all elements of the array
        for (let i = 0; i < n; i++) {
            // Skip this element if it's already processed
            if (visited[i]) continue;

            // Count the frequency of arr[i]
            let count = 1;
            for (let j = i + 1; j < n; j++) {
                if (arr[i] === arr[j]) {
                    visited[j] = true; // Mark arr[j] as processed
                    count++;
                }
            }

            // Output the element and its count
            console.log(arr[i], count);
        }
    }
}

// Driver code
(function main() {
    // Input array
    const arr = [10, 5, 10, 15, 10, 5];
    const n = arr.length;
    // Create Solution instance
    const sol = new Solution();
    // Call the function to count frequencies
    sol.countFreq(arr, n);
})();
