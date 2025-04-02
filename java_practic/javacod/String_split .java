import java.io.*;
import java.util.*;

public class String_split {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String s = scan.nextLine();
        String sp=s.trim();

        if(sp.length()==0)
           System.out.println(0);
        else
        {  
        // String sp=s.trim();
        String []str=sp.split("[!,?._'@: \\-\\+\\|]+");
        System.out.println(str.length);
        for(String st:str)
        {
           System.out.println(st) ;
        }
        }
        scan.close();
    }
}
