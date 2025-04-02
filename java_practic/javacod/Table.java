import java.util.*;
class Table
{
 public static void main(String[] args)
{
Scanner ab2=new Scanner(System.in);
System.out.println("enter any number to calculate the tabble :");
int n =ab2.nextInt();
 System.out.println("your table is :");
for(int i=1;i<=10;i++)
{
 System.out.printf("%d*%d=%d\n",i,n,i*n);
}
}

}