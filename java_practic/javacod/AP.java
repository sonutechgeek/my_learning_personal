import java.util.*;

class AP {
  public static void main(String[] arg) {
    int a1, a2, a3, n = 0, e = 0, d = 0;
    Scanner ob = new Scanner(System.in);
    System.out.println("enter the first term");
    a1 = ob.nextInt();

    System.out.println("enter the second  term");
    a2 = ob.nextInt();

    System.out.println("enter the third term");
    a3 = ob.nextInt();
    int m1 = a1;
    int m2 = a2;
    int m3 = a3;
    int b = a2 - a1;
    int c = a3 - a2;
    if (b == c) {
      System.out.println("enter the term you want the sum of that");
      n = ob.nextInt();
      e = n;
      d = a1 + (n - 1) * d;
      System.out.println("sum of the nth term is:" + d);
    }

    else {
      System.out.println("sorry this series is not in AP");
    }

    System.out.println(" sum of the AP FUNCTION IS " + ap(a1, b, n));
    System.out.println(" sum of the GP FUNCTION IS " + gp(m1, m2, m3));
  }

  public static int ap(int n1, int n2, int n3) {
    int ans = n1 + (n3 - 1) * n2;
    return (ans);
  }

  public static int gp(int b1, int b2, int b3) {
    int ans = 0;
    int r1 = (b2 / b1);

    int r2 = (b3 / b2);

    System.out.println("r1=" + r1);

    System.out.println("r2=" + r2);
    if (r1 == r2) {
      System.out.println("enter the term to find  of gp");
      Scanner ob = new Scanner(System.in);
      int m = ob.nextInt();
      ans = b1 * (int) pow(r2, (m - 1));
    } else {
      System.out.println("sorry this series is not in GP");
    }
    return (ans);
  }

  public static int pow(int p1, int p2) {
    if (p2 == 0)
      return 1;
    else
      return (p1 * pow(p1, p2 - 1));

  }
}