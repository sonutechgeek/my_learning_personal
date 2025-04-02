
import java.util.*;

class Reverset
{
 
 static void ReversArray(String str)
 
 {

    String sp=new Reverse().reverseWord(str);
    System.out.println(sp);      
  }
         

  public static void main(String arg[])
 
 {
  
      Scanner sc = new Scanner(System.in);

      String str=readLine();
    
      ReversArray(str);

  }
}