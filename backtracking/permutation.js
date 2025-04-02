function permute(nums) {
    const result = [];

    // Helper function for backtracking
    function backtrack(start) {
        // If the current permutation is complete, push a copy to the result
        if (start === nums.length) {
            result.push([...nums]); // Spread operator creates a copy of the array
            return;
        }

        for (let i = start; i < nums.length; i++) {
            // Swap the current element with the start element
            console.log("first ",[nums[start], nums[i]],i);
            [nums[start], nums[i]] = [nums[i], nums[start]];
            console.log("sec ",[nums[start], nums[i]],i);
            

            // Recurse to generate permutations for the next elements
            backtrack(start + 1);

            // Swap back to undo changes for exploring other permutations
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }

    backtrack(0); // Start backtracking from index 0
    return result;
}

// Example usage:
const nums = [1, 2, 3];
const result = permute(nums);

console.log(result);
