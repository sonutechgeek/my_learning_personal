public class Checkarraysort{

  public static boolean check(int input[])
   {
    if(input.length<=1)
      return true;
    int smallinput[]=new int[input.length-1];
    for(int i=1;i<input.length;i++)
     {
      smallinput[i-1]=input[i];
     }

  boolean small=check(smallinput);
    if(!small)
       return false;  
    if(input[0]<=input[1])
       return true;
    else 
       return false;
}
public static void main(String str[])
{
 int inpu[]={1,2,3,5,};
System.out.println(check(inpu));
}
}