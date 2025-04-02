package collection;

import java.util.*;

public class ArrayList1 {
    public static void main(String[] args) {
        System.out.println("welcome to code in java for the collection framework");
        // type sdafe
        ArrayList<String> al = new ArrayList<String>();
        al.add("sitara");
        al.add("durgash");
        al.add("sonu");
        al.add("sonu");
        System.out.println(al);
        System.out.println(al.get(0));
        System.out.println(al.get(1));
        // untype safe

        ArrayList al2 = new ArrayList<>();
        al2.add("hello");
        al2.add(456);
        al2.add(656.890);
        al2.add(true);
        System.out.println(al2);
        al2.remove("hello");
        System.out.println(al2);

        System.out.println("size "+al2.size());

        System.out.println(" "+al.contains("sonu"));
        System.out.println(" "+al2.isEmpty());
        al.set(0, "hello world");
        al.add(0, "hiii");
        System.out.println(al);
        // al.clear();
        System.out.println(al2.contains("hiii"));
        System.out.println("after removing the list of the array"+ al);


    }
}
