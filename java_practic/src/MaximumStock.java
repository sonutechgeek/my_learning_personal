import com.sun.source.doctree.SeeTree;

import java.util.ArrayList;
import java.util.Collections;

public class MaximumStock {
    public static void main(String arg[]){
        int arr[]={100,180,260,310,40,535,695};
        int n=arr.length;
        System.out.print("[ "+stockBy(arr,n)+" ]");
    }
    static ArrayList stockBy(int arr[],int n){
        ArrayList <ArrayList<Integer>>arrayList= new ArrayList();
        ArrayList <Integer>arrayList1= new ArrayList();
        for (int i=0;i<n-1;i++){
            if(arr[i]<arr[i+1]){
                arrayList1.add(i);
                arrayList1.add(i+1);
                System.out.print(" "+arrayList1+" ");
                arrayList1.clear();

            }

        }
        System.out.println();
        return arrayList;
    }
}
