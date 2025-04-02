public class LongestCommonPrefix {
    public static void main(String arg[]){
        String arr[]={"geeksforgeeks","geeks","geek","geezer"};
        int n= arr.length;
        System.out.println(longestCommenPrefix(arr,n));

    }
    public static String compareTwo(String A,String B){
        String pre="";
        int i=0;
        while(i<A.length()&&i<B.length()){
            if(A.charAt(i)==B.charAt(i)){
                pre+=A.charAt(i);
            }
            else {
                break;
            }
            i++;

        }
        return pre;
    }
    static String longestCommenPrefix(String arr[],int n){
        String str=arr[0];
        for (int i=1;i<arr.length;i++){
            str=compareTwo(arr[i],str);
        }
        if(str=="")
            str="-1";
        return str;
    }
}
