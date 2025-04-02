import java.util.*;
import java.io.*;
class Quick
{
public static void main(String arg[])
{
 int arr[]=new int[20];
 Scanner sc=new Scanner(System.in);
 System.out.println("Enterthe suze of the array");
 int n=sc.nextInt();
 System.out.println("Enter array elements");
for(int i=1;i<=n;i++)
 {
  arr[i]=sc.nextInt();
 }
  System.out.println(" array elements are...");
for(int i=1;i<=n;i++)
 {
  System.out.println(""+arr[i]);
 }
   Qsort(arr,1,n);
  
 System.out.println(" array elements are.after sort..");
for(int i=1;i<=n;i++)
 {
 System.out.println(""+arr[i]);
 }
 }
static void Qsort(int a[],int low,int high)
{
if(low<high)
{
 int r= part(a,low,high);
 Qsort(a,low,r-1);
 Qsort(a,r+1,high);
}
}
static int part(int b[],int l,int h)
{
 int p=b[h];
 int i=l-1;
for(int j=l;j<h;j++)
{
 if(b[j]<=p)
{
i++;
int temp=b[i];
b[i]=b[j];
b[j]=temp;
}
}
int tempo=b[i+1];
b[i+1]=b[h];
b[h]=tempo;
return(i+1);
}
}



