/*import java.util.*;
import java.io.*;
class BufferedReader
{
public static void main(String args[]) throws IOException{
BufferedReader br= new BufferedReder(new InputStreamReader(System.in));
System.out.println("enter a string ");
String s = br.readLine();
System.out.println("you have entered the string is"+s);
}
} */
//package com.javatpoint;  
import java.io.*;  
public class BufferedReader{    
public static void main(String args[])throws Exception{             
    InputStreamReader r=new InputStreamReader(System.in);    
    BufferedReader br=new BufferedReader(r);            
    System.out.println("Enter your name");    
    String name=br.readLine();    
    System.out.println("Welcome "+name);    
}    
}  