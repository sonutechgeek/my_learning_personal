import java.util.*;

class Arraytut {
  public static void main(String arg[]) {
    int[] marks = new int[50];
    Scanner ob = new Scanner(System.in);
    System.out.println("enter the size of array");
    int n = ob.nextInt();
    System.out.println("enter the array element");
    for (int i = 0; i < n; i++) {
      marks[i] = ob.nextInt();
    }
    marks[2] = 13242;
    System.out.println(" the array element are ");
    for (int i = 0; i < n; i++) {
      System.out.printf("marks[%d]=%d\n", i, marks[i]);
    }
    float fmark[] = { 132.243f, 52343.62343f, 4224.73356f };
    System.out.println(" The float array element are ");
    for (int i = 0; i < n; i++) {
      System.out.printf("fmark[%d]=%f\n", i, fmark[i]);
    }
  }
}