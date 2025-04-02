function permute($nums) {
    $result = [];

    // Helper function for backtracking
    function backtrack(&$nums, $start, &$result) {
        // If we have a complete permutation, add it to the result
        if ($start === count($nums)) {
            $result[] = $nums;
            return;
        }

        for ($i = $start; $i < count($nums); $i++) {
            // Swap the current element with the start element
            swap($nums, $start, $i);

            // Recurse to generate permutations for the remaining elements
            backtrack($nums, $start + 1, $result);

            // Backtrack by undoing the swap
            swap($nums, $start, $i);
        }
    }

    // Helper function to swap elements
    function swap(&$arr, $i, $j) {
        $temp = $arr[$i];
        $arr[$i] = $arr[$j];
        $arr[$j] = $temp;
    }

    backtrack($nums, 0, $result);
    return $result;
}

// Example usage:
$nums = [1, 2, 3];
$result = permute($nums);

print_r($result);
