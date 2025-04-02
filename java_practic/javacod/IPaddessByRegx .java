
import java.util.Scanner;
import java.util.regex.Pattern;

public class IPaddessByRegx {

    static boolean isAnagram(String str) {
        boolean flage = false, flg = false;
        //String []str1=str.split("[.]");
        if (str == null || str.isEmpty())
            return false;


    //String digitRegx = "(\\d{1,2}|(0|1)\\d{2}|2[2,5]\\d|25[0-5])";pass=000.12.12.034,fail=121.234.12.12
        String digitRegx="([0-9]|[0-9]|[0-9]|1[0-9][0-9]|2[0-4][0-9|25[0-5]])";//fail=000.12.12.034,pass=121.234.12.12

        String isRegx = digitRegx + "\\." + digitRegx + "\\." + digitRegx + "\\." + digitRegx;
    Pattern pattern = Pattern.compile(isRegx);
    return pattern.matcher(str).matches();
}
    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);
        // String s=scan.next();
        while(scan.hasNext()){
            String s = scan.next();

            System.out.println(isAnagram(s));
            // s = scan.next();
        }
    }
}
