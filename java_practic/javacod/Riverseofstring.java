import java.util.*;
class Riverseofstring
{
public static void main(String[] arg)
{
Scanner sc = new Scanner(System.in);
System.out.println(" Enter Any String are ");
String a=sc.nextLine();
String b="";
int ptr=a.length()-1;
while(ptr>=0)
{
 b=b+a.charAt(ptr);
 ptr--;
}
 String ret=pal(a);

System.out.println("  PALINDROM FUNCTION RETURN STRING  of ret variable is "+ret);
System.out.println("  RIVERSE OF String of a variable is "+b);
System.out.println("  YOU ENTERED THE String of a variable is "+a);
}
//PALINDROM FUNCTION 
public static String pal(String str)
{
 boolean p=true;
 int start=0;
 int end=str.length()-1;
 while(start<end)
 {
  if(str.charAt(start)!=str.charAt(end))
     {
     p=false;
     break;
     }
   else
    p=true;
  start++;
  end--;
 }
if(p==false)
  System.out.println("  NO PALINDROM");
else
  System.out.println("  YES PALINDROM");

return("SORRY FOR MISTAKE");

}
}