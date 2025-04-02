import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;

public class RemoveDuplicacy {
    public static void main(String[]args){
     int nums[]={-3,-1,0,0,0,3,3};
        System.out.println(removeDuplicates(nums));
    }

    public static int removeDuplicates(int[] nums) {
//            HashMap<Integer,Integer> hset= new HashMap<>();
//            for(int i=0;i<nums.length;i++){
//                if(!hset.containsKey(nums[i]))
//                    hset.put(nums[i],1);
//                else {
//                    hset.put(nums[i],hset.get(nums[i])+1);
//                }
//            }
//            int i=0;
//          System.out.println(hset);
////            for (Integer val:hset) {
////                nums[i]=val;
////                i++;
//            }
            HashSet<Integer> hset= new HashSet<>();
            for(int i=0;i<nums.length;i++){
                hset.add(nums[i]);
            }
            int nums1[]=new int[hset.size()];
            int i=0;
            for (Integer val:hset) {
                nums1[i]=val;
                i++;
            }
        Arrays.sort(nums1);
            for (i=0;i<hset.size();i++){
                     nums[i]=nums1[i];
            }
            for (i=0;i<hset.size();i++){
                System.out.print(" "+nums[i]);
        }
        System.out.println(hset);
        return(hset.size());
        }
    }

