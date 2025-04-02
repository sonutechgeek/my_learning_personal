public class RunnableThread implements Runnable {
    public void run(){
        System.out.println(Thread.currentThread().getName());
        try {
            Thread.sleep(500);
               
            } catch (Exception e) {
               System.out.println(e);
           }
        System.out.println("Hi Thread");
    }
    public static void main(String arg[]) {
     RunnableThread ob1 = new RunnableThread();
     Thread t1=new Thread(ob1);
     t1.setName("One Name ");

     t1.start();
    
     RunnableThread ob2 = new RunnableThread();
     Thread t2=new Thread(ob2);
     t2.setName("Second Name ");
     t2.start();
     
        
    }
}
