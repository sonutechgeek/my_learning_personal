import java.util.*;
class Swapping 
{
public static void main(String arg[])
{
Scanner sc  = new Scanner(System.in);
System.out.println("enter the first value ");
int a = sc.nextInt();
System.out.println("enter the second value");
int b= sc.nextInt();
System.out.printf("befor swapping the avlue is %d\t%d\n ",a,b);
swap(a,b);
}
static void swap(int n,int m)
{
int p=0;
p=n;
n=m;
m=p;
System.out.println();
System.out.printf("after swapping the avlue is %d\t%d\n",n,m);
}
}