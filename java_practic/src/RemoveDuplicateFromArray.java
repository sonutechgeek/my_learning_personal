import java.util.Arrays;

public class RemoveDuplicateFromArray {
    public static void main(String arg[]){
        int arr[]={1,2,1,3,2,5,6,3,9,8,9,5,4,3,66,67,67};
        removeDuply(arr,arr.length);
    }
    public static void removeDuply(int arr[],int n){
        Arrays.sort(arr);
        int arr1[]= new int[n];
        int j=0;
        int i=0;
        for (i = 0; i < n-1; i++) {
            if(arr[i]!=arr[i+1]){
                arr1[j]=arr[i];
                j++;
            }
            arr1[j+1]=arr[n-1];
        }
        for (i = 0; i < j+1; i++) {
            System.out.print(arr1[i]+" ");
        }
        System.out.println();
        for (i = 0; i < n; i++) {
            System.out.print(arr[i]+" ");
        }
    }
}
