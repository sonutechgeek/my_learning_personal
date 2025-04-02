import java.util.Scanner;
class Switch
{
public static void main(String[] args )
{
 int x=0,y=0;
 Scanner ob = new Scanner(System.in);
 System.out.println("enter any character to move from origen in upper case ");
  char move = ob.next().charAt(0);
 switch(move)
   {
   case 'R':
         x++;
           break;
   case 'L':
         x--;
           break;
   case 'U':
         y++;
           break;
    case 'D':
         y--;
           break;
    default :
         System.out.println("character is not valid");
    }
System.out.println("X="+x);
System.out.println("Y="+y);
}
}