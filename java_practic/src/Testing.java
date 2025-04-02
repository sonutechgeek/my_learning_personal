import java.util.Arrays;

public class Testing {
    public static void main(String arg[]){
        int arr[]={17,2,43,42,5,6,7,87,8};
        int k=7;
        System.out.println("here is the output "+binary(arr,k));
    }
    public static int binary(int arr[] ,int k){
        Arrays.sort(arr);

        int length=arr.length;
        for (int i=0;i<length;i++){
            System.out.print(" " + arr[i]);
        }
        int l=0;
        System.out.println();
        int r=length-1;
        int mid=(l+r)/2;
        System.out.println(mid);
        while (l<=r){
            if(arr[mid]==k){
                return mid+1;
            }
            else if (arr[mid]<k) {
                l=mid+1;
            }
            else{
                r=mid-1;
            }
            mid=(l+r)/2;
            System.out.println(mid);
        }
        return -1;
    }

}
