import java.io.*;
import java.util.*;

public class String_First_Upper{

    public static void main(String[] args) {

        Scanner sc=new Scanner(System.in);
        String A=sc.next();
        String B=sc.next();
        String str=A+B;
        System.out.println(str.length());
        if(A.charAt(0)>B.charAt(0))
            System.out.println("Yes");
        else
            System.out.println("No");
        String str1,str2;
        str1=A.substring(0,1).toUpperCase()+A.substring(1);
        //str2 =str1.toUpperCase()+A.substring(1,A.length());

        String str3,str4;
        str3=B.substring(0,1);
        str4 =str3.toUpperCase()+B.substring(1,B.length());
        System.out.println(str1+" "+str4);
    }
}
