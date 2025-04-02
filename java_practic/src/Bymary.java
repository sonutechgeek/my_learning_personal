import java.lang.reflect.Array;
import java.util.Arrays;

public class Bymary {
    public static void main(String arg[]){
        int arr[]={23,35,45,57,67,78,57};
        int k=45;
        System.out.println(binary(arr,k));

    }
    public static int binary(int arr[],int k){
        Arrays.sort(arr);
        for(int i=0;i<arr.length;i++){
            System.out.print(" "+arr[i]);
        }
        int l=0;
        int h=arr.length-1;
        int mid=(l+h)/2;
        while(l<=h){
             if (arr[mid]<k) {
                l=mid+1;

            }
           else if(arr[mid]==k){
                 System.out.println();
                return mid+1;
            }
            else{
                h=mid-1;
            }
            mid=(l+h)/2;
        }
        System.out.println();
        return -1;
    }
}
