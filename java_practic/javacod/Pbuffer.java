import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
class Pbuffer 
{
 public static void main(String args[]) throws IOException {
 BufferedReader bra=new BufferedReader(new InputStreamReader(System.in));
System.out.println("enter any string ");
String str = bra.readLine();
System.out.println(" you entered the string is:"+ str);
} 
}
