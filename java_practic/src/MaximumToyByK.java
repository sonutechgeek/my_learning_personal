import java.util.Arrays;

public class MaximumToyByK {
    public static void main(String arg[]) {
        int arr[] = {1, 22, 25, 35, 67, 111, 345, 567, 677};
        int k = 100;
        System.out.println("Maximum Toy are" + countToy(arr, arr.length, k));
    }

    static int countToy(int arr[], int n, int k) {
        Arrays.sort(arr);
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] < k) {
                count++;
                k = k - arr[i];
            } else {
                break;
            }
        }
        return count;

    }
}