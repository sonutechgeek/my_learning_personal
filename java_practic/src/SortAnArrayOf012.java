import java.util.Scanner;

public class SortAnArrayOf012 {
    public static void main(String[] arg) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the size of Array");
        int n = sc.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter the  Array Element");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        sort012(arr, n);
        System.out.println();
        sort123(arr, n);

    }

    public static void sort012(int[] arr, int n) {
        int low = 0, mid = 0, high = n - 1;
        while (mid <= high) {
            if (arr[mid] == 0) {
                // swap(arr[mid++], arr[low++]);
                int temp = arr[mid];
                arr[mid] = arr[low];
                arr[low] = temp;
                mid++;
                low++;
            } else if (arr[mid] == 1) {
                mid++;
            } else {
                //  swap(arr[mid],arr[high--]);
                int temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.print("  " + arr[i]);
        }

    }
//by count element
    static void sort123(int arr[], int n) {
        int count[] = new int[3];
        int arr1[] = new int[n];
        count[0] = 0;
        count[1] = 0;
        count[2] = 0;
        int count1=0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == 0) {
                count[0] = count[0] + 1;
            }
            if (arr[i] == 1) {
                count[1] = count[1] + 1;
            }
            if (arr[i] == 2) {
                count[2] = count[2] + 1;
            }
        }
        for (int j = 0; j < count[0]; j++) {
                arr1[j] = 0;
                count1++;

        }
        int count2=count1;
        for (int i = 1; i <= count[1]; i++) {
                arr1[ count1-1+i] = 1;
                count2++;
        }
        for (int k = 1; k <=count[2]; k++) {
                arr1[count2-1 + k] = 2;

        }


        for (int i = 0; i < n; i++) {
            System.out.print("  " + arr1[i]);
        }
    }

}
