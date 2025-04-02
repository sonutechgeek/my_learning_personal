import java.util.Arrays;

public class BinarySearchProblem {
    public static void main(String arg[]){
        int arr[]={3,9,5,2,7,6,5,9};
        int arch=9;
        System.out.println("Searched element are..  ");
        System.out.println( find(arr,arr.length,arch));
    }
    static int  find(int arr[],int n,int srch){
        Arrays.sort(arr);
        for (int i=0;i<n;i++)
            System.out.print(" "+arr[i]);
        System.out.println();
        int lo=0;
        int hi=n-1;
        int mid=(lo+hi)/2;
        while(lo<=hi) {
            if (arr[mid] < srch)
                lo = mid+1;
            else if (arr[mid] == srch)
                 return mid+1;
            else
                hi=mid-1;
            mid=(lo+hi)/2;
        }

      return -1;
    }
}
