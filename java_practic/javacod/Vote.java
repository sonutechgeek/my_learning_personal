import java.util.*;
class Vote
{
public static void main(String[] args)
{
  System.out.println("enter your age");
  Scanner ob1= new Scanner(System.in);
  int age=ob1.nextInt();
  if(age<18)
   {
   System.out.println("SORRY: YOU ARE NOT ADULT so you are not    eligible to vote");
   }
   else if(18<=age && age<=100)
   {
   System.out.println("HEY: YOU ARE ELIGINBLE TO VOTE due to age:"+age);
   }
   else 
   {
   System.out.println("SORRY YOU ARE EXPIRED: "+age);
   }
}

}