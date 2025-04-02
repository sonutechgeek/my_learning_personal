import java.net.*;
public class Client
{
public static void main(String[] args){
try
{
System.out.println("client started");
Socket soc = new Socket("localhost",9806);
}
catch(Exception e)
{
 e.printStackTrace();
}
}

}












