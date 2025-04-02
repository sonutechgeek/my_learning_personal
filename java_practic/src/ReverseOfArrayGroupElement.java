import java.util.ArrayList;

public class ReverseOfArrayGroupElement {
    public static void main(String arg[]){
        int arr[]={2,3,1,4,5,6,6,9,2,4,23,46};
        int k=3;
        reverseArrayBuGroup(arr,k,arr.length);
        reverseArrayBuGroup1(arr,k,arr.length);
    }
    static void reverseArrayBuGroup(int arr[],int k,int n){
        ArrayList<Integer> arrayList=new ArrayList<>();
      int  grSize=n/k;
      int p=k;
      int size=0;
      for(int i=0;i<grSize+1;i++)
      {
          for (int j=k-1;j>=size;j--) {
              arrayList.add(arr[j]);
          }
          ;
          size=size+p;
          k=k+p;
          if(k>n)
              k=n-1;
          System.out.print("  "+size+" ");
          System.out.println(k);

      }

        System.out.println(arrayList);
    }
    static void reverseArrayBuGroup1(int arr[],int k,int n) {
        for (int i = 0; i < n; i += k) {
            int end = i + k - 1;
            if (end > n) {
                end = n - 1;
            }
            int start = i;
            while (start <= end) {
                int temp=arr[start];
                arr[start]=arr[end];
                arr[end]=temp;
                start++;
                end--;
            }
        }
      for (int i=0;i<n;i++){
          System.out.print(" "+arr[i]);
      }
    }

    }
