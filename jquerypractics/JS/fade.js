$(document).ready( function(){
    $('#foutbtn').click(function(){
        $('#box').fadeOut('slow');
        
        // }); //slow , fast
    })

    $('#finbtn').click(function(){
        $('#box').fadeIn('slow');
    })

    $('#ftogelbtn').click(function(){
        $('#box').fadeToggle('fast');
    })

    $('#fadeTobtn').click(function(){
        $('#box').fadeTo('slow',0.2);
    })
})
