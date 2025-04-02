 import java.io.*;  
public class BufferedReader{    
public static void main(String args[])throws IOException{             
    InputStreamReader r=new InputStreamReader(System.in);    
    BufferedReader br=new BufferedReader(r);            
    System.out.println("Enter your name");    
    String name=br.read();    
    System.out.println("Welcome "+name);    
}    
}  