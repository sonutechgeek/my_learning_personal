import java.util.Vector;

public class SubArraySum {
    public static void main(String arg[]) {
        int arr[] = {1, 4, 2, 3, 4, 5};
        int s = 12;
        System.out.println(subArray(arr,s,arr.length));

    }

    static Vector subArray(int arr[], int s, int n) {
        Vector<Integer> vector= new Vector<>();
        int cuusum = arr[0];
        int start = 0;
        int end = 1;
        for (int i = 1; i <= n; i++) {
            while (cuusum > s && start < i) {
                cuusum -= arr[start];
                start++;
            }
            end++;
            if (cuusum == s) {
                vector.add(start+1);
                vector.add(i);
                return vector;
            }
            if(end<=n){
                cuusum+=arr[i];
            }
        }
        vector.add(-1);
        return vector;
    }
}
