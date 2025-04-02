import java.util.* ;
class Fact 
{
public static void main(String[] args)
{
int fact=1;
System.out.println("enter any number");
Scanner ob1 = new Scanner(System.in);
int n = ob1.nextInt();
while(n>0)
{  
 fact= fact*n;
 n=n-1;
} 
System.out.println("factorial :"+ fact) ;
 }
}