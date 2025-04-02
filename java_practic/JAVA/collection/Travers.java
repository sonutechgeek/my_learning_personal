package collection;
import java.util.*;
public class Travers {
    public static void main(String[] args) {
        ArrayList<String> al = new ArrayList<String>();
        al.add("sitara");
        al.add("durgash");
        al.add("sonu");
        al.add("sonu");
        for(String str:al){
            System.out.println(" "+str);
            StringBuffer br= new StringBuffer(str);
            System.out.println("Reverse "+br.reverse());
        }
        System.out.println("_____________________________");
        Iterator<String> itr= al.iterator() ;
            while (itr.hasNext()) {
                String str= itr.next();
                System.out.println(str);
            }
        System.out.println("_____________________________");
        ListIterator<String> litr= al.listIterator(al.size());
        while (litr.hasPrevious()) {
            String previous= litr.previous();
            System.out.println(previous);
        }
        System.out.println("__++++++___________________________");
        al.forEach(e->{
            System.out.println(e);
        });
        System.out.println("hi this is for sorting ");
        TreeSet<String> set = new TreeSet<>();
        set.addAll(al);
        set.forEach(e->{
            System.out.println(e);
        });
}
}
