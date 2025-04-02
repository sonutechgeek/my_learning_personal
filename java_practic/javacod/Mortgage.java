import java.util.*;
import java.text.NumberFormat;
class Mortgage
{
public static void main(String arg[])
{
final Byte PERCENT=100;
final Byte MONTHS_IN_YEAR=12;

Scanner ob=new Scanner(System.in);
System.out.print("Principal:");
int principal=ob.nextInt();

System.out.print("Annual interest:");
float annualInterest=ob.nextFloat();
float monthlyInterest=(annualInterest/PERCENT)/MONTHS_IN_YEAR;

System.out.print("Period (YEAR):");
Byte year = ob.nextByte();
int numberOfPayment=year*MONTHS_IN_YEAR;

double mortgage=(principal*(monthlyInterest*Math.pow(1+monthlyInterest,numberOfPayment))/Math.pow(1+monthlyInterest,numberOfPayment)-1);

//String mortgageFormatted=NumberFormat.getCurrencyInstance().Format(mortgage);
System.out.println("Mortgage:"+mortgage);
}
}