import java.util.ArrayList;
import java.util.Comparator;
import java.util.Scanner;
import java.util.Vector;

public class SmallestSubsetGreaterSum {
    public static void main(String arg[]) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("enter the sine of array");
        int n = scanner.nextInt();
        Vector<Integer> vector = new Vector<>(n);
        System.out.println("Enter the Array Element");
        for (int i = 0; i < n; i++) {
            vector.add(scanner.nextInt());
        }
        System.out.println(greaterSum(vector, n));
        System.out.println(greaterSm(vector, n));
    }

    static int greaterSum(Vector vr, int n) {
        ArrayList<Integer> arrayList= new ArrayList<>(n);
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum = sum + (int) vr.get(i);
        }
        vr.sort(Comparator.reverseOrder());
        int res = 0;
        for (int i = 0; i < n; i++) {
            res = res + (int) vr.get(i);
            sum = sum - (int) vr.get(i);
            arrayList.add( (int) vr.get(i));
            if (res > sum){
                System.out.println(arrayList);
                return i + 1;
            }

        }
        return n;
    }


    static int greaterSm(Vector vr1, int n) {
        vr1.sort(Comparator.reverseOrder());
        ArrayList<Integer> arrayList = new ArrayList<Integer>(n);
        int count = 0;
        int sum1 = 0,sm=0;
        sum1 = sum(vr1);
        int res1 = 0;
        int k=0;
        for (int i = 0; i < n; i++) {
            res1 = res1 + (int) vr1.get(i);
            int el = (int) vr1.get(i);
            System.out.println("Res"+res1);
            if (sum1 > res1) {
                arrayList.add(el);
                k=k+1;
                sum1= sum1(vr1,k);
                System.out.println(sum1);
                count++;
            }
            else {
                arrayList.add(el);
                count++;
                break;
            }
        }
        System.out.println("subset are" + arrayList);
        return count;
    }

    static int sum(Vector vr1) {
        int sum = 0;
        for (int i = 0; i < vr1.size(); i++) {
            sum = sum + (int) vr1.get(i);
        }
        System.out.println(" Sum=" + sum);
        return sum;
    }

    static int sum1(Vector vr1 ,int k) {
        int sum = 0;
       vr1.sort(Comparator.reverseOrder());
        for (int i = k; i < vr1.size(); i++) {
            sum = sum + (int) vr1.get(i);
        }
        return sum;
    }
}