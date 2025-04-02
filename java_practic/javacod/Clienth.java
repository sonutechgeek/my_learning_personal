import java.net.*;
class Clienth
{
public static void main(String arg[])
{
try
{
System.out.println("client started");
Socket soc = new Socket("localhost",8086);
}
catch(Exception e)
{
System.out.println(e);
}
}  
}