import java.util.*;

public class LargestandSmallest_of_Substring {

    public static String getSmallestAndLargest(String s, int k) {
        String smallest = " ";
        String largest = " ";
       // int n=s.length();
        ArrayList<String> arr=new ArrayList<String>(s.length());
        //String []arr=new String[s.length()];
        for(int i=0;i<=s.length()-k;i++) {
            String temp = s.substring(i, k + i);
            arr.add(temp);
        }
        Collections.sort(arr);
      smallest=arr.get(0);;
      largest=arr.get(arr.size()-1);

        return smallest + "\n" + largest;
    }


    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String s = scan.next();
        int k = scan.nextInt();
        scan.close();

        System.out.println(getSmallestAndLargest(s, k));
    }
}