public class QuickSort {
    public static void main(String arg[]){
        int arr[]={34,5,6,8,1,2,3,3,3,4,};
        quickSort(arr,0,arr.length-1);
        System.out.println("Array after quick sort");
        for(int l=0;l<arr.length;l++){
            System.out.print(arr[l]+", ");
        }
    }
    public static void quickSort(int arr[],int l,int h){
        if(l<h){
            int p = partation(arr,l,h);
            quickSort(arr,l,p-1);
            quickSort(arr,p+1,h);
        }
    }
    public static int partation(int arr[],int l,int h){
        int r=arr[h];
        int i=l-1;
        int j=0;
        int temp=0;
        for(j=l;j<h;j++){
            if(arr[j]<r){
                i++;
                temp=arr[j];
                arr[j]=arr[i];
                arr[i]=temp;
            }
        }
        temp=arr[i+1];
        arr[i+1]=arr[h];
        arr[h]=temp;
    return i+1;
    }
}
