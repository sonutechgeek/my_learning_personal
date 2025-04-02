import java.util.Scanner;

public class Test {

    public static void main(String[] args) {
        int n = 0;
        int[] a = new int[50];
        Scanner ob = new Scanner(System.in);
        System.out.println("enter the size of the array");
        n = ob.nextInt();
        System.out.println("enter the array element");
        for (int i = 0; i < n; i++) {
            a[i] = ob.nextInt();
        }
        System.out.println(" Array element are ");
        for (int i = 0; i < n; i++) {
            System.out.printf("a[%d]=%d\n", i, a[i]);
        }
        System.out.println("Distinct count of the array is " + DistCount(a, a.length));
    }

    public static int DistCount(int[] b, int m) {
        int count = 0;
        boolean isdistinct = true;
        for (int i = 0; i < m; i++) {
            for (int j = i+1; j < m; j++) {
                if (b[i] == b[j]) {
                    isdistinct = false;
                    break;
                }
            }
            if (isdistinct) {
                count = count + 1;
            }
        }
        return (count);
    }
}


