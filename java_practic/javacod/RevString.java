import java.util.*;
class RevString{
 public static void main(String arg[])
 {
  Scanner sc=new Scanner(System.in);
  System.out.println("Enetr the string");
  String str=sc.nextLine();
  System.out.println(reverseOfString(str)); 
 }

public static String reverseOfString(String str1)
 {
  char ch[]=new char[str1.length()];

  for(int i=0;i<str1.length();i++)
  {
   ch[i]=(char)str1.charAt(str1.length()-(i+1));   
   }

System.out.println("Revers of the string ");
String ret="";
for(int i=0;i<str1.length();i++)
 {
  ret=ret+ch[i];
 }
return(ret);
} 
}