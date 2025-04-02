class box1
{
double width;
double hight;
double length;
box()
{
widht = 5;
hight = 4;
length = 5;
}
public void volume()
{
double vol=wight*hight*length;
System.out.println("volume are:"+vol);
}
}
class rvolume
{
public static void main(String arg[])
{
box1 obj = new box1();
obj.volume();
}
}