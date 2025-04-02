public class EquilibriumProblem {
    public static void main(String arg[]){
        int arr[]={3,3,5,2,7,6,5,2};
       System.out.println("EquilibriumElement are  "+ equilibrium(arr,arr.length));
    }
    static int equilibrium(int arr[],int n){
        int sum=0;
        int leftsum=0;
        int ans=0;
        int count=0;
        for (int i=0;i<n;i++){
            sum=sum+arr[i];
        }
        for (int  i=0;i<n;i++){
            leftsum+=arr[i];
            sum=sum-arr[i];
            count++;
            if(leftsum>sum){
                break;
            }
        }
        count--;
        leftsum=leftsum-arr[count];
        if(leftsum==sum){
//            ans=arr[count];
            return count+1;
        }


            return -1;
        }
}
