import java.util.*;
class Matrix 
{
int arr[][]=new int[3][3];
int i,j;
void TwoD()
{
System.out.println("enter the array element");
Scanner ob=new Scanner(System.in);
for(i=0;i<3;i++)
  {
   for(j=0;j<3;j++)
   {
  arr[i][j]=ob.nextInt();
   }
    }
System.out.println("array element are               ");
for(i=0;i<3;i++)
  {
   for(j=0;j<3;j++)
   {
  System.out.print(arr[i][j]);
   }
   System.out.println();
    }
}
}
class MainMatrix
{
public static void main(String arg[])
{
 Matrix ob1=new Matrix();
 ob1.TwoD();
}
}