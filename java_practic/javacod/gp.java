import java.util.*;
class GP
{
public static void main(String[] arg)
{
int a1,a2,a3,n,e=0,d;
Scanner ob = new Scanner(System.in);
System.out.println("enter the first term");
a1=ob.nextInt();

System.out.println("enter the second  term");
a2=ob.nextInt();

System.out.println("enter the third term");
a3=ob.nextInt();
int m1=a1;
int m2=a2;
int m3=a3;
System.out.println(" sum of the GP FUNCTION IS "+gp(m1,m2,m3));
}
public static int gp(int b1,int b2,int b3)
{
int ans=0;
int r1=(b2/b1);

int r2=(b3/b2);

System.out.println("r1="+r1);

System.out.println("r2="+r2);
if(r1==r2)
{
System.out.println("enter the term to find sum of gp");
Scanner ob = new Scanner(System.in);
int m= ob.nextInt();
  ans = b1*math.pow(ra,(m-1));
}
else
   {
  System.out.println("sorry this series is not in GP");
    }
 return(ans);
}
}