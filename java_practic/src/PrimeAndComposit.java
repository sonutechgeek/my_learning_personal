import java.util.Scanner;
import java.util.Vector;

public class PrimeAndComposit {
    public static void main(String ar[]) {
        Vector<Boolean> vector = new Vector<>();
        Scanner scanner = new Scanner(System.in);
        System.out.println("enter Two number of range");
        int n1 = scanner.nextInt();
        int n2 = scanner.nextInt();
        for (int i=0;i<n2;i++){
            vector.add(i,true);
        }
        System.out.println(primeAndComposite(vector,n1,n2));
    }

    static int primeAndComposite(Vector vector ,int n1, int n2) {
       // Vector<Boolean> vector = new Vector<>();
        vector.set(0, false);
        vector.set(1, false);
        for (int i = 2; i < Math.sqrt(n2); i++) {
            if (vector.elementAt(i).equals(false))continue;
            for (int j = i * i; j < n2; j=j+i) {
                vector.set(j, false);
            }
        }
        System.out.println(vector);
        int prime=0;
        int composite=0;
        for (int i=n1;i<n2;i++) {
             if(i==1)continue;
             if (vector.elementAt(i).equals(true)) {
                 prime++;
                 System.out.print(" "+i);
             }
             else
                composite++;
        }
        System.out.println(1);
        System.out.println(prime);
        System.out.println(composite);
        return composite-prime;
    }
}
