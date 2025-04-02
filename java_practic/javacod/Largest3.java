import java.util.*;
class Largest3
{
public static void main(String arg[])
{
int a=0,b=0, c=0;
Scanner ob = new Scanner(System.in );
System .out.println("enter the number to test for LARGEST");
 a = ob.nextInt();
 b=  ob.nextInt();
 c = ob.nextInt();
System.out.println("largest of the given number is"+ larg(a,b,c));
System.out.println("largest of the given number is"+ larga(a,b,c));
System.out.println("largest of the given number is"+ largt(a,b,c));
}
 static int larg(int n, int m, int o)
{
int lar=0;
if(n<m)
    lar = m;

if (lar<o)
    lar = o;

if(lar<n) 
    lar=n;
return lar;
}
static  int larga(int n ,int m ,int o)
{
int l=0;
if (n<m&&m<o)
    l= o;
else if(n>m)
    l=n;
else l= m;

   return l;
}
static int largt(int n, int m, int o)
{
int temp=0,temp1=0;
temp = n>m?n:m;
temp1 = o>temp?o:temp;
 return temp1;
}
}