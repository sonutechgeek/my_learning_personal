public class SecondLargest {
    public static void main(String arg[]){
        int arr[]={1,23,45,67,5,9,89};
        String str1="abc";
        String str2="abc";
        System.out.println(str1.equals(str2));
        System.out.println(second(arr));

    }
    static int second(int arr[]){
        int max=0;
        int secmin=0;
        for (int i=0;i<arr.length;i++){
            if(arr[i]>max){
                secmin=max;
                max=arr[i];
            }
            if(max>arr[i]&&arr[i]>secmin){
                secmin=arr[i];
            }
        }
        return secmin;
    }
}
