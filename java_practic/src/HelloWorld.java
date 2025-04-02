import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Scanner;

public class HelloWorld {
    public static void main(String []args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Size of Array");
        int n= sc.nextInt();
        int arr[]= new int[n];
        System.out.println("enter the array element");
        for(int i=0; i<n; i++) {
            arr[i]=sc.nextInt();
        }
        System.out.println("Second largest Element are"+secLarg(arr,n));

    }
    public static int secLarg(int arr[] ,int n) {
        Arrays.sort(arr);
//        return(arr[n-2]);
        throw new ArithmeticException("hay I love u "+arr[n-2]);
    }
}
