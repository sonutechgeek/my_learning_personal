package collection;
import java.util.*;
public class map {
    public static void main(String[] args) {
        ArrayList<String> al= new ArrayList<String>();
        HashMap<String , Integer> hashMap= new HashMap<>();
        hashMap.put("hello",4546);
        hashMap.put("hi",5657);
        hashMap.put("hheee",45);
        hashMap.put("test1",456);
        hashMap.put("test2",4546);
        System.out.println(hashMap);
        hashMap.forEach((key,value)->{
            System.out.println("KEY = " +key+" Value = "+value);
        });
    }
}
