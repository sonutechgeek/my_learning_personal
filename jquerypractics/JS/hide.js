$(document).ready( function(){
    $('#hidebtn').click(function(){
        $('#box').hide(1000 ,function(){
            alert("Now hiodden")
        }); //slow , fast
    })

    $('#showbtn').click(function(){
        $('#box').show(3000);
    })

    $('#togelbtn').click(function(){
        $('#box').toggle('fast');
    })
})