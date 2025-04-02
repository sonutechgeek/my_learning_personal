import java.util.Scanner;
import java.util.Stack;

public class GeekAndNumber {
    public static void main(String[] arg) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the String of a number");
        String str = sc.next();
        System.out.println();
        System.out.println("minlength " + minLength(str, str.length()));
    }

    public static int minLength(String str, int n) {
        Stack stack = new Stack();
        for (int i = 0; i < n; i++) {
            if (stack.empty()) {
                stack.push(str.charAt(i));
            } else if (stack.peek().equals(expected(str.charAt(i)))) {
                stack.pop();
            } else {
                stack.push(str.charAt(i));
            }
        }
        return stack.size();
    }

    public static char expected(char ch) {
        if (ch == '0')
            return '9';
        if (ch == '9')
            return '0';
        if (ch % 2 == 0){
            System.out.print((char)(ch-1));
            return (char) (ch - 1);
        }
        else {
            System.out.print((char)(ch+1));
            return (char) (ch + 1);
        }
    }
}
