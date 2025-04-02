import java.util.List;

public class LinkedList {
        private ListNode head;
        private static class ListNode{
            private int data;
            private ListNode link;
            public ListNode(int data){
                this.data=data;
                this.link=null;
            }
        }
        public  void  display( ListNode current){
            while (current!=null){
                System.out.print(" "+current.data + " ->");
                current=current.link;
             }
          System.out.println("null");
        }

//    public  static void main(String arg[]){
//        LinkedList ll = new LinkedList();
//        ll.head= new ListNode(10);
//        ListNode second = new ListNode(13);
//        ListNode third  = new ListNode(15);
//        ListNode forth = new ListNode(126);
//        ListNode fifth = new ListNode(512);
//        ll.head.link=second;
//        second.link= third;
//        third.link=forth;
//        forth.link=fifth;
//        ll.display(ll.head);
//
//    }



    public  static void main(String arg[]){
        LinkedList ll = new LinkedList();
        ll.insert(ll,50);
        ll.insert(ll,57);
        ll.insert(ll,5);
        ll.insert(ll,59);
        ll.insert(ll,52);
        ll.insert(ll,555);
        ll.insertBeg(ll,20);
        ll.insertBeg(ll,27);
        ll.insertBeg(ll,29);
        System.out.println(ll.deleteNode(ll,29));
        System.out.println(ll.deleteNode(ll,5));
        System.out.println(ll.deleteNode(ll,59));
        ll.display(ll.head);

    }
    public static  void insert (LinkedList l1,int data ){
        ListNode insert = new ListNode(data);
        if(l1.head==null){
            l1.head=insert;
        }
        else{
            ListNode last=l1.head;
            while (last.link!=null){
                last = last.link;
            }
            last.link= insert;
        }

    }



    public static  void insertBeg (LinkedList l1,int data ){
        ListNode insert = new ListNode(data);
        if(l1.head==null){
            l1.head=insert;
        }
        else{
            ListNode start= l1.head;
            l1.head=insert;
            insert.link=start;
        }

    }


    public static  String deleteNode (LinkedList l1,int data ){
        ListNode prev ;
        ListNode start= l1.head;
        if(l1.head==null){
            return "List Is already Empty";
        }if(l1.head.data==data){
            l1.head=l1.head.link;
            return "start is deleted";
        }
        else{
            while (start!=null){
                prev=start;
                start=start.link;
                if(start.data==data){
                    prev.link=start.link;
                    break;
                }
            }
        }
      return  "data deleted "+ data;
    }
}
