import java.util.*;
class Printf
{
public static void main(String arg[])
{
byte x=121;
int c =100; 
System.out.format("value of x is %d\n", x);
double y = Math.PI;
System.out.println(y);
System.out.format("value of PI= %.2f\n",y);
System.out.format("value of PI= %6f\n",y);
System.out.format("value of PI= %05.2f\n",y);
System.out.printf("X = %d c= %5d\n",x,c);
}
}