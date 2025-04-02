import java.util.*;

public class SortArrayByAnother {
    public static void main(String arg[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the size of first Array to be sort");
        int n1=sc.nextInt();
        System.out.println("Enter the size of Second  Array by which we have to sort");
        int n2=sc.nextInt();
        int arr1[]=new int[n1];
        int arr2[]=new int[n2];
        System.out.println("Enter the First arry element to be sort");
        for (int i=0;i<n1;i++){
            arr1[i]=sc.nextInt();
        }
        System.out.println("Enter the Second arry element");
        for (int i=0;i<n2;i++){
            arr2[i]=sc.nextInt();
        }
        sortByArray(arr1,n1,arr2,n2);
    }
    static void sortByArray(int arr1[],int n1,int arr2[],int n2) {
        ArrayList<Integer> list = new ArrayList();
        TreeMap<Integer, Integer> tm = new TreeMap<Integer, Integer>();

        for (int i = 0; i < n1; i++) {
                 if (!tm.containsKey(arr1[i]))
                      tm.put(arr1[i], 1);
                else
                     tm.put(arr1[i], tm.get(arr1[i]) + 1);
        }
        for (int i = 0; i < n2; i++) {
                 if (tm.containsKey(arr2[i])) {
                       for (int j = 0; j < tm.get(arr2[i]); j++) {
                        list.add(arr2[i]);
                       }
                 }
              tm.remove(arr2[i]);
        }

        Set <Integer> set = tm.keySet();

        System.out.println(set);
        for (Integer val:set) {
            Integer value =tm.get(val);
            while (value>0) {
                list.add(val);
                 value--;
            }
//            tm.remove(val);does not remove
        }

                 System.out.println(list);
                 System.out.println(tm);
                 tm.clear();
                 System.out.println(tm);
    }
}
