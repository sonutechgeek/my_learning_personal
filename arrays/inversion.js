function inversionCount(arr) {
    function mergeSortAndCount(arr, temp, left, right) {
        let count = 0;
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            // Count inversions in the left half
            count += mergeSortAndCount(arr, temp, left, mid);
            // Count inversions in the right half
            count += mergeSortAndCount(arr, temp, mid + 1, right);
            // Count split inversions while merging
            count += mergeAndCount(arr, temp, left, mid, right);
        }
        return count;
    }

    function mergeAndCount(arr, temp, left, mid, right) {
        let i = left;      // Starting index for left subarray
        let j = mid + 1;   // Starting index for right subarray
        let k = left;      // Starting index to place elements in temp
        let count = 0;

        // Merge the two halves
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                // Count inversions: all remaining elements in the left subarray
                count += (mid + 1 - i);
            }
        }

        // Copy remaining elements of left subarray, if any
        while (i <= mid) {
            temp[k++] = arr[i++];
        }

        // Copy remaining elements of right subarray, if any
        while (j <= right) {
            temp[k++] = arr[j++];
        }

        // Copy temp back to the original array
        for (i = left; i <= right; i++) {
            arr[i] = temp[i];
        }

        return count;
    }

    let temp = Array(arr.length).fill(0);
    return mergeSortAndCount(arr, temp, 0, arr.length - 1);
}

// Example Usage
const arr = [2, 4, 1, 3, 5];
console.log("Inversion Count:", inversionCount(arr)); // Output: 3
