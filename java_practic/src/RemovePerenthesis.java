public class RemovePerenthesis {
    public static void main(String arg[]){
        String str="(()())(((((()())";
        System.out.println(remove(str));
        System.out.println(remove1(str));
    }
    static String remove(String str){
        String A="";
        for(int i=0;i<str.length()-1;i++){
            if(str.charAt(i)=='('&&str.charAt(i+1)==')'){
                A=A+'('+')';
            }
        }
        return A;
    }
    static String remove1(String str){
        str.toCharArray();
        String A="";
        for(int i=0;i<str.length()-1;i++){
            if((int)str.charAt(i)==40&&(int)str.charAt(i+1)==41){
                A=A+str.charAt(i)+str.charAt(i+1);
            }
        }
        return A;
    }
}

