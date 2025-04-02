public class FirstThread extends Thread { 
    FirstThread(String n){
        super(n);
    }
    public void run(){
        System.out.println(Thread.currentThread().getName());
        for (int i = 0; i<=11;i++) {
            try {
                Thread.sleep(500);
            } catch (Exception e) {
                System.out.println("errors");
            }
            System.out.println(i+"");
        }
    }
    public static void main(String[] args) {
        FirstThread t1 = new FirstThread("one");
        t1.setName("first Thread");
        t1.start();  

        FirstThread t2 = new FirstThread("two");
        t2.setName("second  Thread");
        t2.start();    

        
    }
}
