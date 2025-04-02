import java.util.LinkedList;

public class CyclicShiftOfString {
    public  static void main(String arg[]){
        String x="abcdef";
        String y="bcdefa";
        String z="efabcd";

        boolean n1=check(x,y);
        boolean n2=check(x,z);
        if(n1==true&&n2==true){
            System.out.println( "Yes");
        }
        else {
            System.out.println("No");
        }
        strigCheck(x,y,z);
    }
    static boolean check(String A,String B){
        if(A.length()!=B.length())
            return false;
        LinkedList<Character> li1=new LinkedList<>();
        LinkedList<Character> li2=new LinkedList<>();
        for(int i=0;i<A.length();i++){
            li1.add(A.charAt(i));
        }
        for(int i=0;i<B.length();i++){
            li2.add(B.charAt(i));
        }
       int n=B.length();
            while (n>0) {
                n--;
                char ch= li2.peek();
                li2.remove();
                li2.add(ch);
                if(li1.equals(li2))
                    return true;

            }
            return false;
        }
        public static void strigCheck(String A,String B,String C){
        A=A+A;
        boolean  st1=A.contentEquals(B);
        boolean  st2=A.contentEquals(C);

         if(st1==st2)
             System.out.println("rotartion");
        }
    }

