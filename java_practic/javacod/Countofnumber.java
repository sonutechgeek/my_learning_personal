import java.util.*;
class Countofnumber
{
public static void main(String[] arg)
{
Scanner ob= new Scanner(System.in);
System.out.println("enter the number ");
int n=ob.nextInt();
int m=n;
int count=0;
while(n>0)
    {
      n=n/10;
      count=count+1;
     }
for(int i=1;i<=10;i=i+1)
{  int t=i*m;
System.out.println(t);
}
System.out.println("COUNT OF THE NUMBER IS:"+count);
}
}