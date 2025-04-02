import java.util.*;
class LogicalOp
{
public static void main(String[] args)
{
String usr = "sonu", pwd="1234";
Scanner sc = new Scanner(System.in);
String name = sc.next();
String pass= sc.next();
if(usr.equals(name)&& pwd.equals(pass))
    System.out.println("welcome");
else 
     System.out.println("try again()");
}
}