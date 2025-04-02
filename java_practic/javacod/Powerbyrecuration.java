import java.util.*;
class Powerbyrecuration{
 public static void main(String arg[])
  {
  Scanner sc=new Scanner(System.in);
  int x=sc.nextInt();
  int n=sc.nextInt();
  int p=pow(x,n);
      num(n);
  System.out.println();
 System.out.println("powerofa number by recurtion is"+p);
  }

  public static int pow(int a,int b)
  {
   if(b==0)
     return 1;
   else
     return(a*pow(a,b-1));
  }

  public static int num(int a)
  {
   if(a==0)
     return 0;
   else
     System.out.print(a-num(a-1)+" ");
   return 0;
  }
}