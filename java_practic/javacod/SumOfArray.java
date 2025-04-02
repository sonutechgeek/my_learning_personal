import java.util.*;
class SumOfArray
{
public static void main(String[] args)
{
 int sum=0;
 Scanner ob=new Scanner(System.in);
 System.out.println("ENTER THE SIZE OF ARRAY");
 int n=ob.nextInt();
 int a[]=new int[n];
 System.out.println("ENTER THE ARRAY ELEMENT");
  for(int i=0;i<n;i++)
  {
   a[i]=ob.nextInt();
  }
 System.out.println("ARRAY ELEMENT ARE");
  for(int i=0;i<n;i++)
  {
   sum=sum+a[i];
   System.out.println(a[i]);  
  }
 int avg= sum/a.length;
 System.out.println("SUM OF THE ARRAY IS :"+sum);
 System.out.println("AVERAGE OF THE ARRAY IS :"+avg);
 maximum(a);
 }
public static void maximum(int b[])
{
 int max=Integer.MIN_VALUE;
  for(int i=0;i<b.length;i++)
   {
    if(max<b[i])
      max=b[i];
   }
  System.out.println("MAXIMUM OF THE ARRAY IS:"+max);
}
}
