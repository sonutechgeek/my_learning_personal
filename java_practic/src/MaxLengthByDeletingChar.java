import java.util.ArrayList;

public class MaxLengthByDeletingChar {
    public static void main(String arg[]){
        String arr[]={"pintu","geeksfor","geeksgeeks","forgeek"};
        String str="geeksforgeeks";
        int max=0;
        for(int i=0;i<arr.length;i++){
            int n1=chack(arr[i],str);
            if(n1>=max)
                max=n1;
        }
        for (String ch:arr) {
            if(ch.length()==max){
                System.out.println(ch);
            }
        }
        System.out.println(max);
    }
    static int chack(String arr,String str){
        ArrayList<Character> arrayList= new ArrayList<>();
        int j=0;
        for(int i=0;i<str.length();i++){
                arrayList.add(str.charAt(i));

        }
        System.out.println(j);
         int i=0;
        while(i<arr.length()&&j<arrayList.size()) {
                if (arr.charAt(i) == arrayList.get(j)) {
                    i++;
                    j++;
                } else
                    arrayList.remove(j);
                if(i==arr.length())
                    return arr.length();
            }


        return arrayList.size();
    }
}
