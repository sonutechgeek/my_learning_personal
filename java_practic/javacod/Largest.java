import java.util.*;
class Largest
{
//static int larg(int n, int m);
public static void main(String arg[])
{
int a=0,b=0;
Scanner ob = new Scanner(System.in );
System .out.println("enter the number to test for LARGEST");
 a = ob.nextInt();
 b=  ob.nextInt();
System.out.println("largest of the given number is"+ larg(a,b));
}
 static int larg(int n, int m)
{
int lar=0;
if(n<m)
{
  lar = m;
}
else
{
 lar = n;
}

return lar;
}
}