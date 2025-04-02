import java.util.*;
public class Calci
{
public static void main(String[] args)
{
System.out.println("press 1:   For additon");
System.out.println("press 2:   For subtractin");
System.out.println("press 3:   For multiplicaton");
System.out.println("press 4:   For division");
Scanner ob1= new Scanner(System.in);
int ch = ob1.nextInt();
switch(ch)
{
 case 1:
  {
   System.out.println("enter two number to perform addition");
   int n1 = ob1.nextInt();
   int n2 = ob1.nextInt();
   int n3 = n1+n2;
   System.out.println("ADDITION:"+n3);
   break;
}
  case 2:
   {
   System.out.println("Enter two number to prtform subtraction");
   int n1 = ob1.nextInt();
   int n2 = ob1.nextInt();
   int n3 = n1-n2;
   System.out.println("SUBTRACTION:"+n3);
   break;
}

  case 3:
   {
   System.out.println("Enter two number to prtform multiplication");
   int n1 = ob1.nextInt();
   int n2 = ob1.nextInt();
   int n3 = n1*n2;
   System.out.println("MULTIPLICATION:"+n3);
   break;
}

  case 4:
   {
   System.out.println("Enter two number to prtform division");
   int n1 = ob1.nextInt();
   int n2 = ob1.nextInt();
   int n3 = n1/n2;
   System.out.println("DIVISION:"+n3);
   break;
}
}
}
}