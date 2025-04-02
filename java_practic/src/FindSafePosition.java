import java.util.Scanner;
import java.util.Vector;

public class FindSafePosition {
    public static void rec(int i, int k, Vector vectr) {
        if (vectr.size() == 1)
            return;
        i = (i + k - 1) % vectr.size();
        // System.out.print(" "+i);
        // System.out.println();
        //System.out.print(" "+vectr.get(i));
        vectr.removeElementAt(i);
        rec(i, k, vectr);
    }

    public static <vector> int safeposition(int n, int k) {
        Vector<Integer> vectr = new Vector<Integer>(n);
//        Vector<String> vector= new Vector<>();
        for (int i = 0; i < n; i++) {
            vectr.add(i + 1);
        }
        // System.out.println(vectr);
        // System.out.println(vectr.get(0));
        rec(0, k, vectr);
        return vectr.get(0);
    }

    public static void main(String[] arg) {
        System.out.println("enter the sike of array");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("enter the value of kth element to kill");
        int k = sc.nextInt();
        System.out.println("safe element is " + safeposition(n, k));
    }
}
