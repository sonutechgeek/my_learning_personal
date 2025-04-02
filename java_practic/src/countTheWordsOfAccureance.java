import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Scanner;
import java.util.Vector;

public class countTheWordsOfAccureance {
   // snack game type
   public static void main(String arg[]){
   // Vector<Character>vector= new<Character>Vector();
       char vector[][]=new char[20][20];
       Scanner scanner= new Scanner(System.in);
       System.out.println("Enter the String To make Character Vector of size row*cal");
       String str=scanner.nextLine();
       System.out.println(" enter the size of row");

      // BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(System.in));
       int row=scanner.nextInt();
       System.out.println(" enter the size of Column");
       int cal=scanner.nextInt();

       try {
           int k=0;
           for (int i=0;i<row;i++){
               for (int j=0;j<cal;j++){
                   vector[i][j]=str.charAt(k);
                   k++;
               }
           }
           System.out.println(vector);
       }
       catch (Exception e){
           System.out.println(e);
       }


   }
}
