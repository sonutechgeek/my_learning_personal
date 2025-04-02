public class PrimeRange {
    public static void main(String arg[]){
        int n1=2,n2=100;
        rangeOfPrime(n1,n2);
    }
    static void rangeOfPrime(int n1,int n2){


        for (int  j = n1; j <=n2; j++) {
            boolean flage=true;

            for (int  i = 2; i <j;i++) {
                if(j%i==0){
                    flage=false;
                    break;
                }
            }

            if(flage){
                System.out.print(j+" ");
            }
        }
    }
}


