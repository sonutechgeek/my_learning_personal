import java.util.*;
class Calculator
{
public static void main(String[] arg)
{
System.out.println("\n\nSELECE THE OPEERATION:\n1. FOR addition()\n2. FOR SUBTRACTION()\n3. FOR MULTIPLICATION()");
 Scanner ob = new Scanner(System.in);
 int ch=ob.nextInt();
       if(ch==1)
                      add();
       else if(ch==2)
                      sub();
       else if(ch==3)
                     mul();
       else 
       System.out.println("invelide choice");
      switch(ch)
       {
         case 1:
          add();
          break;
         case 2:
          sub();
          break;
         case 3:
          mul();
          break;
         default :
          System.out.println("invelide choice");
       }

}
public static void add()
{
System.out.println("enter the first number to ADDITION");
 Scanner ob = new Scanner(System.in);
 int a= ob.nextInt();
System.out.println("enter second number to ADDITION ");
 int b= ob.nextInt();
int c =a+b;
System.out.println("ADDITION="+c);
}
public static void sub()
{
System.out.println("enter the first number to SUBTRACTION");
 Scanner ob = new Scanner(System.in);
 int a= ob.nextInt();
System.out.println("enter second number to SUBTRACTION");
 int b= ob.nextInt();
int c =a-b;
System.out.println("SUBTRACTION:"+c);
}
public static void mul()
{
System.out.println("enter the first number to MULTIPLICATION:");
 Scanner ob = new Scanner(System.in);
 int a= ob.nextInt();
System.out.println("enter second number to MULTIPLICATION:");
 int b= ob.nextInt();
int c =a*b;
System.out.println("MULTIPLICATION="+c);
}
}