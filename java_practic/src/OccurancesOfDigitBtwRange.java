import java.util.Scanner;

public class OccurancesOfDigitBtwRange {
    public static void main(String arg[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter thge first number");
        int n1 = sc.nextInt();
        System.out.println("Enter thge second number");
        int n2 = sc.nextInt();
        System.out.println("Enter digit for finding Occurances");
        int k = sc.nextInt();
        System.out.println(occuracceOfDigit(n1, n2, k));

    }

    static int occuracceOfDigit(int n1, int n2, int k) {
        int count = 0;
        for (int i = n1; i <=n2; i++) {
//            System.out.print(i+" ");
            count+= countdigit(i, k);
        }

        return count;
    }

    static int countdigit(int n, int k) {
        int count = 0;
        while (n >0) {
            int digit = n % 10;
//            System.out.println(n);
            if (digit == k)
                count++;
            n = n / 10;
//            System.out.println(n);
        }
        return count;
    }
}