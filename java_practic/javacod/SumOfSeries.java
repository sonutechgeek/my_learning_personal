import java.util.*;
class SumOfSeries
{
public static void main(String[] arg)
{
int n=0;
Scanner sc = new Scanner(System.in);
System.out.println("enter the value of n");
n =sc.nextInt();
int o=Math.abs(n);
int sum=0;
for(int i=0;i<=o;i++)
{
 sum += i;
}
if(n>0)
System.out.println("SUM="+sum);
else
 System.out.println("SUM=-"+sum);
System.out.println("LAST DIGIT OF THE NUMBER IS "+last(n)); 

System.out.println("LAST DIGIT OF THE NUMBER IS"+largDigitInNumber(n));
}
public static int last(int m)
{ int o=Math.abs(m);
 int y=o%10;
 return y;
}
public static int largDigitInNumber(int m)
{
int larg=0,y=0;
for(int i=0;i<=m;m=m/10)
 {
 int yi=m%10;
  i=i+1;
  System.out.printf("y[%d]=%d\n",i,yi);
 }
for(int i=0;i<m;i++)
 {
   int yi=0;
   if(yi> yi+1)
    larg=yi;
 }
  return larg;
}
}