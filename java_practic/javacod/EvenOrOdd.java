import java.util.*;
class EvenOrOdd
{
public static void main(String[] args)
{
Scanner sc = new Scanner(System.in);
System.out.println("enter sny number to test number is even or odd ");
int n= sc.nextInt();
EOd(n);

}
static void EOd(int m)
{
if(m>0)
{
  System.out.println(" Given number is positive "+m);
 if(m%2==0)
   System.out.println("given number is 'EVEN'");
 else
   System.out.println("given number is 'ODD'");
}

else if(m<0)
{
  System.out.println(" Given number is NEGATIVE"+m);
 if(m%2==0)
   System.out.println("given number is 'EVEN'");
 else
   System.out.println("given number is 'ODD'");
}
else 
   System.out.println("out of range");
} 
}