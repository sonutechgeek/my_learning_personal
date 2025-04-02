import java.util.*;
class KthMinandMax{
  public static void main(String arg[])
   {
     Scanner sc=new Scanner(System.in);
     int n,k;
      System.out.println("Enter the size of the array");
      n=sc.nextInt();
      System.out.println("Enter the kthelement");
      k=sc.nextInt();
     int arr[]=new int[n];
     System.out.println("Enter the array Element");
     for(int i=0;i<n;i++)
     {
     arr[i]=sc.nextInt();
     }
     System.out.println("\n"+kminmax(arr,k));
    }
  public static int kminmax(int ar[],int kth)
   {
      Arrays.sort(ar);
       int val=ar[kth-1];
        return(val);
   }
} 