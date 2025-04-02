
import java.util.Scanner;

public class IPAddress_validate{

    static boolean isAnagram(String str) {
        boolean flage=false,flg=false;
        String []str1=str.split("[.]");
        if(str1.length>4||str1.length<4)
            return false;
        else {
            for (int i=0;i<str1.length;i++) {
                String spr=str1[i];
                if(spr.length()>3){
                    return false;
                }
                Integer num=Integer.parseInt(spr);
                // flage = isfit(num);
                if(!(0<=num&&num<256)) {
                    flage=false;
                    break;
                }
                else
                    flage=true;

                //       System.out.println(num+" ");
            }
            if(flage)
                flg=true;
            else
                flg=false;
        }
        return flg;
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
