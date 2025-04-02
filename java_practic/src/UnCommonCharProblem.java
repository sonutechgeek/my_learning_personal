public class UnCommonCharProblem {
    public static void main(String arg[]){
        String str1="abcdefghijklmnopqrstuvwxyz";
        String str2="umbrellasdcggsd";
        System.out.println("uncommon String are "+unCommonChar(str1,str2));
    }
    static String unCommonChar(String A,String B){
        String str3="";
        boolean freq1[]=new boolean[26];
        boolean freq2[]=new boolean[26];
        for (int i=0;i<26;i++){
            freq1[i]=false;
            freq2[i]=false;
        }
        for (int i=0;i<A.length();i++) {
             freq1[A.charAt(i)-'a']=true;
        }
        for (int i=0;i<B.length();i++) {
            freq2[B.charAt(i)-'a']=true;
        }

        for (int i=0;i<26;i++){
            if(freq1[i]^freq2[i]==true){

                str3+=(char)(i+'a');
                System.out.println(""+freq1[i]+" "+ freq2[i]);
                System.out.println(freq1[i]^freq2[i]);

            }

        }
        return str3;
    }
}
