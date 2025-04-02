import java.util.*;
class Pelendrom
{
public static void main(String[] args)
{
Scanner ob1 = new Scanner(System.in);
System.out.println("enter any number");
int n = ob1.nextInt();
int temp=n;
int rem=0, rev=0;
while(n>0)
{
 rem=n%10;
 rev=rev*10+rem;
 n=n/10;

}
if(rev==temp)
{
  System.out.println("GIVEN NUMBER IS PELENDROM:"+temp);
}
else
{
 System.out.println("GIVEN NUMBER IS NOT PELENDROM:"+temp);
}
}
}