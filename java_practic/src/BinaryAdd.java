public class BinaryAdd {
    public static void main(String arg[]){
        String str="11111111100000";
        String str1="011111110";
//        System.out.println(add(str,str1));
        System.out.println(add1(str,str1));
    }
//    178948433496975040
//     71894843488957806
//               8017258
//     71894843496975064
    public  static String intToBin(int num){
        String bin="";
        while(num>0)
        {
            bin=(num%2)+bin;
            num=num/2;
        }
        return(bin);
    }
    public static String add1(String A,String B){

        String str="";
        int n=A.length()-1;
        int m=B.length()-1;
        int cary=0;
        while(n>m){
            B='0'+B;
            m++;
        }
        while(m>n){
            A='0'+A;
            n++;
        }
        int l=A.charAt(n)-'0';
        System.out.println(l);
        while(n>=0&&m>=0){
            int p=(int)A.charAt(n)-'0'+(int)B.charAt(m)-'0'+cary;
            str=(p%2)+str;
            cary=p/2;
            n--;
            m--;
        }
        String sp="";
        if(A.charAt(0)-'0'==1&&cary==1){
            sp="1";
        }
        if(B.charAt(0)-'0'==1&&cary==1){
            sp="1";
        }
        System.out.println(B);
        System.out.println(A);
        return sp+str;
    }



    public static String  add(String str1,String str2){
        int n1=Integer.parseInt(str1,2);
        int n2=Integer.parseInt(str2,2);
         int n3=n1+n2;
         String str=intToBin(n3);
        return str;
    }
}
