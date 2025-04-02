import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ExceptionBuffered {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int i, j, k;
        // int arr[]= new int[4];
        i = 8;
        j = 2;
        try {
            j = Integer.parseInt(br.readLine());
            k = i / j;
            System.out.println(k);
        } catch (ArithmeticException e) {
            System.out.println("please checkout our arithmetic logic " + e);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("please checkout our Array logic " + e);
        } catch (IOException e) {
            System.out.println("IO" + e);
        }
        finally{
            System.out.println("hello fpr finally");

        }
        
    }
}
