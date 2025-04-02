import java.util.*;
class Leapyr
{
public static void main(String[] args )
{
Scanner sc=new Scanner(System.in);
System.out.println("enter any year to check this is leapyr or not ");
int n= sc.nextInt();
if(n%4==0&&n%100!=0)
  { 
   System.out.println("this year is leap year");
   }
else if(n%400==0)
   {
   System.out.println("this year is leap year");
   }
else
   System.out.println("this yr is not leap year");
}
}