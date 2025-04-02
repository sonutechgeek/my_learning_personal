import java.util.Collections;
import java.util.Vector;

public class LeaderOfArray {
    public static void main(String arg[]) {
        int arr[] = {16, 17, 4, 3, 5, 2};
        leader(arr, arr.length);
    }
    static void leader(int arr[],int n){
        Vector<Integer> vector=new Vector<>();
        int max=-1;
        for (int i=n-1;i>=0;i--){
            if(arr[i]>max){
                max=arr[i];
                vector.add(max);
            }
        }
        for (int i=vector.size()-1;i>=0;i--) {
            System.out.print(" "+vector.get(i));
        }
        Collections.reverse(vector);
        System.out.println(vector);

    }
}
