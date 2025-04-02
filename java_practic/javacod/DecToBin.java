import java.util.*;
public class DecToBin
{
public static void main(String[] arg)
{
Scanner sc = new Scanner(System.in);
System.out.println("enter any number");
int q=sc.nextInt();
//String st=sc.nextLine();
int b = dtb(q);
String str=dtbs(q);
dtbarr(q);
System.out.println("\nBINARY OF GIVEN NUMBER IS "+b);
int bin=1;
System.out.println("BINARY OF GIVEN NUMBER IS "+str);
//System.out.println("BINARY globle"+bin);
//BtD(a,i);
}
public static int dtb(int n)
{
 int bin=1;
  while(n>0)
  {
   int rem=n%2;
   bin=bin*10+rem;
   n=n/2;
  }
 return(bin);
}
public static String dtbs(int n)
{
 String bin="";
  while(n>0)
  {
    bin=(n%2)+bin;
    n=n/2;
  }
 return(bin);
}

public static void dtbarr(int n)
{
 int i=0;
 int temp=0,m=0;
 int a[]=new int[10];
  while(m<=n)
  {
   a[i]= n%2;
   n=n/2;
   i++;
   m++;
   if(m==2)
     m--;
  System.out.print(i);
  }
 for(int j=0;j<(i)/2;j++)
  {
    temp=a[j];
    a[j]=a[i-j-1];
    a[i-j-1]=temp;
     
  }
 System.out.print(" BINARY OF GIVEN NUMBER IS BY ARRAY");
 for(int j=0;j<i;j++)
  {
  System.out.print("" +a[j]);
  }
}
/*public static void BtD(int b[], int p)
{
  int cal=0;
 for(int j=0;j<p;j++)
  {
    cal=b[0]*2+b[j+1];
    if(j>0)
      cal=cal*2+b[j+1];
     
  
  System.out.println("BINARY globle"+bin);
 System.out.println("BINARY TO DECIMAL IS"+cal);
}*/
}