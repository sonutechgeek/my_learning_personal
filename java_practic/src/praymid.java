import java.util.*;
public class praymid{

        public static  void main(String[] args)
        {
            Scanner ob = new Scanner(System.in);
            int n =ob.nextInt();
            int i=1,j=1,k=1;
            while(i<=n)
            {
                while(j<=n-i)
                {
                    System.out.print(" ");
                    j=j+1;
                }

                while(k<=2*i-1)
                {
                    System.out.print(" * ");
                    k=k+1;
                }
                System.out.println("\n");
                i++;
            }
        }
    }

