import java.util.*;
class boxvolume
{
void volume()
{
Scanner obj = new Scanner(System.in);
int side = obj.nextInt();
 int v=side*side*side;
 System.out.println("cube of the ractangle is :"+ v);
}
}
class mvolume
{
public static void main(String arg[])
{
System.out.println("Enter the number to calculate the volume:");
 boxvolume ob1 = new boxvolume();
 ob1.volume();
}
}