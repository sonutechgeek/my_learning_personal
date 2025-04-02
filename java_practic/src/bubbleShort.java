public class bubbleShort {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int arr[]={9,19,6,3,4,35,46};
        sort(arr,arr.length);

    }
    public static void sort(int arr[],int size ){
        int temp=0;
        for(int i=0;i<size;i++){
            for(int j=i+1;j<size;j++){
                if(arr[i]>arr[j]){
                    temp=arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                }
            }

        }
        for(int k=0;k<size;k++){
            System.out.println(arr[k]);
        }
    }
}
