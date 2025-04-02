$(document).ready(function(){
    $(window).scroll(function(){
        var scroll= $(window).scrollTop();
        var scrolleft= $(window).scrollLeft();
        // alert(scrolleft);
        // alert(scroll);
        $('#box').html("");
        $('#box').append("top:"+scroll);
        $('#box').append("<br>left:"+scrolleft);
        
        $('#scrolltop').click(function () {
            $(window).scrollTop(200);
        })

        $('#scrollleft').click(function () {
            $(window).scrollLeft(100);
        })

        // console.log(scroll);
        // console.log(scrolleft);
        $('#hasclass').click(function () {
            var test=$('#box').hasClass('test');
            // alert(test);
            console.log(test);
        })
    })

})