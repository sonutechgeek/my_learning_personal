$(document).ready( function(){
    $('#slideup').click(function(){
        $('#box').slideUp();
    })

    $('#slodedown').click(function(){
        $('#box').slideDown(3000);
    })

    $('#slidetoggle').click(function(){
        $('#box').slideToggle('fast');
    })
})