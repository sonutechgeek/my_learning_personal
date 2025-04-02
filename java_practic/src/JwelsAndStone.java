import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class JwelsAndStone {
    static int countJwels(String jwl,String stn){
        Map<Character,Boolean> hashSet= new HashMap<>();
        int count=0;
        int j=0;
        while (j<jwl.length()){
            hashSet.put(jwl.charAt(j),true);
            j++;
        }
        for(int i=0;i<stn.length();i++){
            if(hashSet.containsKey(stn.charAt(i)))
                  count++;
        }
        System.out.println(hashSet);
        return count;
    }
    public static void main(String arg[]){
        String jwels="aA";
        String stone="aAAccbbbb";
        System.out.println(countJwels(jwels,stone));
    }
}
