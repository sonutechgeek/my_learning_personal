public class CreateOwnException {
    public static void main(String[] args) {
        int i=5;
        try {
            if(i<10){
                throw new MyException("Exception");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
/**
 * MyException extends Exception
 */
 class MyException extends Exception {
    public  MyException(String msg) {
        super(msg);
    } 
}
