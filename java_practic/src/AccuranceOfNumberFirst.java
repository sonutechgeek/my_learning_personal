import java.util.*;

public class AccuranceOfNumberFirst {
    public static void main(String arg[]){
               int  arr[]={1,7,4,4,5,6,7,5,8,3,5,4,5,5};
               int k=4;
        System.out.println("First Accurances of number  "+findFirstAccurance(arr,k,arr.length));
    }
    static int findFirstAccurance(int arr[],int k,int n){
        Map<Integer,Integer> hasmap=new HashMap<>();
        for (int i=0;i<n;i++){
            if(!hasmap.containsKey(arr[i])){
                hasmap.put(arr[i],1);
            }
            else {
                hasmap.put(arr[i],hasmap.get(arr[i])+1);
                if(hasmap.get(arr[i])==k){
                    System.out.println(arr[i]);
                    return i-1;
                }
            }
        }
           Set<Integer> set=hasmap.keySet();
          System.out.println(hasmap);
        return -1;
    }
}
