public class CountSquaresInNumber {
    public static void main(String arg[]) {
        int n = 25;
        System.out.println(find(n));
    }

    public static int find(int n) {
        int j = 2;
        int flag = 0;
        if (n % 2 == 0) {
            while (n > 0 && n % 2 == 0) {
                n = n - j * j;
                flag++;
            }
        } else {
            while (n > 0) {
                n = n - j * j;
                flag++;
                j++;
            }
        }
        return flag;
    }
}
