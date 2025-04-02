import java.util.*;
class Logical
{
public static void main(String[] args)
{
String usr = "sonu", pwd="1234";
Scanner sc = new Scanner(System.in);
System.out.println("enter the uiser name :");
String name = sc.next();
System.out.println("Enter the password :");
String pass  = sc.next();
if(usr.equals(name)&& pwd.equals(pass))
    System.out.println("u are welcome");
else 
     System.out.println("try again()");
}
}