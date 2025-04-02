import java.util.*;

class Arrayissorted {
   public static void main(String[] args) {
      int b[] = new int[50];
      System.out.println("enter the size of the array ");
      Scanner ob = new Scanner(System.in);
      int m = ob.nextInt();
      System.out.println("Enter the array element");
      for (int i = 0; i < m; i++) {
         b[i] = ob.nextInt();
      }
      System.out.println("The array element are");
      for (int i = 0; i < m; i++) {
         System.out.printf("[%d]=%d\n", i, b[i]);
      }
      System.out.println("ARRAY IS" + array(b, m));
   }

   public static int array(int a[], int n) {
      boolean f = true;
      int i = 0;
      for (i = 0; i < n - 1; i++) {
         if (a[i] <= a[i + 1]) {
            f = true;
         } else {
            f = false;
            break;
         }
      }
      if (f == true) {
         System.out.println("The array element are sorted");
         return (1);
      } else {
         System.out.println("The array element are not sorted");
      }
      return 0;
   }
}