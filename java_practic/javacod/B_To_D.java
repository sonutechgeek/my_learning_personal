class B_To_D {
  public static void main(String[] args) {
    int a[] = { 0, 0, 1, 1 };
    BtD(a, a.length - 1);
    String s = "0011";
    BtD(s);
  }

  public static void BtD(int b[], int p) {
    int cal = 0;
    for (int j = 0; j < p; j++) {
      if (j == 0)
        cal = b[0] * 2 + b[j + 1];
      else
        cal = cal * 2 + b[j + 1];
    }
    System.out.println("BINARY TO DECIMAL IS\t" + cal);
  }

  public static void BtD(String str) {
    int m = 0;
    int k = 1;
    for (int i = str.length() - 1; i >= 0; i--) {
      m = m + (str.charAt(i) - '0') * k;
      System.out.println((+str.charAt(i) - '0') + " hi" + m);
      k = k * 2;
    }
    System.out.println("BINARY TO by string DECIMAL IS\t" + m);
  }
}