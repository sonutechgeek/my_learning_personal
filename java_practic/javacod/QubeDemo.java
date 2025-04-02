import java.util.*;
class Qube
{
 int l=2;
 int b=3;
 int h=4;
  int p=l*b*h;
}
class QubeDemo
{
public static void main(String arg[])
{
Qube ob1=new Qube();
Box ob2=new Box();
 ob2.volume();
System.out.println("Qube of the ractange\t"+  ob1.p);
}
}
class Box
{
int side=5;
void volume()
{
 System.out.println("volume of the box is\n"+side*side*side);
}
}