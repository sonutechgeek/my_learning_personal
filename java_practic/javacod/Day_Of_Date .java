import java.util.*;
public class Day_Of_Date {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("enter the day ,month & year");
        int dy = sc.nextInt();
        int mon = sc.nextInt();
        int ye = sc.nextInt();

//        Calendar calendar=Calendar.getInstance();
//        int y = calendar.get(calendar.YEAR);
//        int m = calendar.get(calendar.MONTH)+1;
//        int d = calendar.get(calendar.DATE)-1;
//         int yea=y-ye;
//         int mot=m-mon;
//         int dt=d-dy;
       System.out.println( friday(ye, mon, dy));

    }
    public static String friday(int year,int month,int date)
    {
      Calendar calendar=Calendar.getInstance();
        calendar.set(year,month-1,date);
        String days[]={"SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"};
        int n;
        n=calendar.get(calendar.DAY_OF_WEEK);
        return(days[n-1]);
    }

//      calendar.add(calendar.YEAR,-year);
//        calendar.add(calendar.MONTH,-month);
//        calendar.add(calendar.DATE,-(date+1));
//        System.out.println(calendar.getFirstDayOfWeek());
//        System.out.println(calendar.getTime());
//      int inp = calendar.get(calendar.DAY_OF_WEEK);
//        System.out.println(inp);
//       String str= " ";
//        switch(inp)
//        {
//            case 1:
//            {
//                str ="SUNDAY";
//                break;
//            }case 2:
//            {
//                str ="MONDAY";
//                break;
//            }case 3:
//            {
//                str ="TUESDAY";
//                break;
//            }case 4:
//            {
//                str ="WEDNESDAY";
//                break;
//            }case 5:
//            {
//                str ="FRIDAY";
//                break;
//            }case 6:
//            {
//                str ="SATURDAY";
//                break;
//            } default:
//            {
//                System.out.println("Sorry not valid date" );
//            }
//        }
//        return str;
    }
