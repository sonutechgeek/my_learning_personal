import java.util.Stack;

public class BalanceParenthesis {
    public static void main(String arg[]) {
        String str = "(){}[]()[";
        System.out.println(isValid(str));
    }
        public static boolean isValid(String s) {
            char ch;
            Stack<Character> stack= new Stack<>();
            for(int i=0;i<s.length();i++){
                if(s.charAt(i)=='('||s.charAt(i)=='{'||s.charAt(i)=='['){
                    stack.push(s.charAt(i));
                    System.out.println(i);
//                    continue;
                }
                if(stack.empty()){
                    return false;
                }
                switch(s.charAt(i)){
                    case ')':
                        ch=stack.peek();
                        stack.pop();
                        if(ch=='{'||ch=='['){
                            return false;
                        }
                        break;
                    case '}':
                        ch=stack.peek();
                        stack.pop();
                        if(ch=='('||ch=='['){
                            return false;
                        }
                        break;
                    case ']':
                        ch=stack.peek();
                        stack.pop();
                        if(ch=='{'||ch=='('){
                            return false;
                        }
                        break;
                }
            }
            return stack.empty();
        }
    }

