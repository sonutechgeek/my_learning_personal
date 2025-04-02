import java.util.Scanner;

public class SelectionSort {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        int arr[]={9,19,6,37,45,67,5,5,56,4};

        System.out.println(sort(arr,arr.length,9)+"\n");
        for(int l=0;l<arr.length;l++){
            System.out.print(" ,"+arr[l]);
        }
    }
    public static int sort(int arr[],int size ,int k){
        // Arrays.sort(arr);
        Scanner sc= new Scanner(System.in);

        float f1= sc.nextFloat();
        System.out.println(f1);
        int temp=0;
        for(int i=0;i<size-1;i++){
            int min=findMin(arr,i,size);
            temp=arr[i];
            arr[i]=arr[min];
            arr[min]=temp;
        }
        return(1);
    }
    public static int findMin(int arr[],int i,int size){
        int min=i;
        for(int j=i+1;j<size;j++){
            if(arr[j]<arr[min]){
                min=j;
            }
        }
        return min;
    }
}
