import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ThrowAndThrows {
    public static void main(String[] args)throws Exception {
        int i=8;
        InputStreamReader in= new InputStreamReader(System.in);
        BufferedReader br=new  BufferedReader(in);
        try{
            i= Integer.parseInt(br.readLine());
            if(i<10){
                throw new ArithmeticException(" this is arithmetic Exception ");
            }
            System.out.println(" this code is run outside of the if block");
        }
        catch (ArithmeticException e) {
            System.out.println(e);
        }
    }
}
