import java.awt.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;

public class mergeOperetion {
    /**
     * Definition for singly-linked list.
     * public class ListNode {
     *     int val;
     *     ListNode next;
     *     ListNode() {}
     *     ListNode(int val) { this.val = val; }
     *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
     * }
     */
    public  static  void main(String arg[]){
        LinkedList list1= new LinkedList<>();
        LinkedList list2= new LinkedList<>();
        list1.add(1);
        list1.add(3);
        list1.add(4);
        list2.add(2);
        list2.add(5);
        list2.add(7);
        list2.add(8);
        System.out.println(mergeTwoLists(list1,list2));
    }
        public static ArrayList<Integer> mergeTwoLists(LinkedList list1, LinkedList list2) {
            int i=0;
            int j=0;
            ArrayList<Integer> al= new ArrayList<>();
            while(i<list1.size()&&j<list2.size()){
                if((int )list1.get(i)<=(int)list2.get(j)){
                    al.add((int)list1.get(i));
                    i++;
                }
                else{
                    al.add((int)list2.get(j));
                    j++;
                }


            }
            while(i<list1.size()){
                al.add((int)list1.get(i));

                i++;
            }
            while(j<list2.size()){
                al.add((int)list2.get(j));
                j++;
            }
            return al;
        }
    }

