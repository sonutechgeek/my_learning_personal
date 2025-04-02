$(document).ready(function(){
    $('#animate').click(function(){
        $('#box').animate({
            left:'150px',width:'400px'
        },3000);
    });

    $('#stop').click(function(){
        $('#box').stop();
    });
})