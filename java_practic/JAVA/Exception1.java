/**
 * Exception1
 */
public class Exception1 {
    public static void main(String[] args) {
        try {
            int i,j,k;
            int arr[]= new int[4];
            i=8;
            j=2;
            k=i/j;
            for (int l = 0; l <=4; l++) {
                arr[l]=l;
            }
            for (int l : arr) {
                System.out.println(l);
            }
            System.out.println(k); 

        } catch (ArithmeticException e) {
            System.out.println("please checkout our arithmetic logic "+e);
        }
        catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("please checkout our Array logic "+e);
        }
    }
}