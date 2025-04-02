import java.util.Arrays;
import java.util.Scanner;

public class FittingArray {
    public static void main(String[] arg) {

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the size of array");
        int n = scanner.nextInt();
        int[] arr = new int[n];
        int[] brr = new int[n];

        System.out.println("Enter the 1st array element");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        System.out.println("Enter the 2st array element");
        for (int i = 0; i < n; i++) {
            brr[i] = scanner.nextInt();
        }
        Arrays.sort(arr);
        Arrays.sort(brr);
        boolean chk = check(arr, brr, n);
        System.out.println(chk);
    }

    public static boolean check(int[] arr, int[] brr, int n) {
        boolean flg = true;
        for (int i = 0; i < n; i++) {
            if (arr[i] <= brr[i])
                flg = true;
            else {
                flg = false;
                break;
            }
        }
        return flg;
    }
}
