import java.util.*;
class Digitcountbyre{
 public static void main(String arg[])
  {
  Scanner sc=new Scanner(System.in);
  
  int n=sc.nextInt();
  System.out.println();
  int p=digit(n);
 System.out.println("powerofa number by recurtion is"+p);
  }

  public static int digit(int n)
  {
   if(n/10==0)
     return 1;
   //String str="";
 //int count=0;
  // str=Integer.toString(n);
   //System.out.println(str);
  //count=str.length();
   return(1+digit(n/10));
   }  
  }