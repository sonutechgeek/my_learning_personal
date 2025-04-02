class A 
{
 void abc()
  {
  System.out.println("i am of class of abc a");
   }
}
class B extends A
{
 
 void abc()
  {
  System.out.println("i am of class of abc B");
   }
}
class Main
{ 
public static void main(String[] args)
{
 A ob=new B();
  ob.abc();
}
}