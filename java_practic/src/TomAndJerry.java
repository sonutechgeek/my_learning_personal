import java.util.Scanner;

public class TomAndJerry {
    public static void main(String arg[]){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter any Number");
        int num = scanner.nextInt();
        System.out.println(isGame(num));
    }
    static int isGame(int num){
        if(num%2==0)
            return 1;
        else
            return 0;
    }
}
