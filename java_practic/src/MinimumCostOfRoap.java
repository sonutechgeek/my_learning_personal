import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Scanner;

public class MinimumCostOfRoap {
    public static void main(String[] arg) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the size of array");
        int n = scanner.nextInt();
        int[] arr = new int[n];
        System.out.println("Enter the 1st array element");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        Arrays.sort(arr);
        System.out.println("MinCost is" + findcost(arr, n));
    }

    public static int findcost(int[] arr, int n) {
        int sum = 0, tp = 0, sc = 0;
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>();
        for (int i = 0; i < n; i++) {
            pq.add(arr[i]);
        }
        System.out.println(pq);
        while (pq.size() > 1) {
            tp = pq.peek();
            pq.poll();
            sc = pq.peek();
            pq.poll();
            sum = sum + (tp + sc);
            pq.add(tp + sc);
        }
        System.out.println(pq);
        return sum;
    }
}
