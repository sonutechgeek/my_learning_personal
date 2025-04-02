import java.util.*;
class Pattern
{
public static void main(String[] arg)
{
Scanner ob = new Scanner(System.in);
int n = ob.nextInt();
int i=1;
while(i<=n)
{
    int j=1;
     while(j<=n)
      {
        System.out.print(" *");
        j=j+1;
       } 
    i=i+1;
    System.out.println("\n");
}

}
}