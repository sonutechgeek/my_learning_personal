class Argument {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("argument are");
            for (String x : args)
                System.out.print(x + "\n");
            System.out.print("C:\\xyz\\abs.txt");
        } else
            System.out.println("no argument");
    }
}