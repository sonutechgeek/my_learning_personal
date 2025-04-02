package collection;

import java.util.*;



public class Vector {
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
        //  Vector vector= new Vector();
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
        System.out.println("after removing the list of the array"+ al);
        // Vector<String> vector = new Vector<>();
        //     Vector vector= new Vector();
            
        // Vector<String> vector= new Vector<String>();
        // vector.add("Abcd");
        HashSet<Double> hashSet= new HashSet<>();
        hashSet.add(58.77);    
        hashSet.add(59.077);
        hashSet.add(589.097);
        hashSet.add(0.097);
        TreeSet<Double> treeSet= new TreeSet<>();
        treeSet.addAll(hashSet);
        System.out.println(hashSet);
        System.out.println(treeSet);
    }
}


