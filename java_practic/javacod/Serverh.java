import java.net.*;
public class Serverh
{
public static void main(String arg[])
{
 try{
 System.out.println("Waiting for client");
 ServerSocket ss = new ServerSocket(8086);
 Socket soc=ss.accept();
System.out.println("connection establish");
}
catch(Exception e)
{
System.out.println(e);
}
}
}