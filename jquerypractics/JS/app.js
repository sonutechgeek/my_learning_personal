$(document).ready(function(){
    $('#positionbtn').click(function () {
        var pos=$('#box h2').position();
        alert(pos);
        console.log("top:"+pos.top+"left:"+pos.left);
    })

    $('#offset').click(function () {
        var pos=$('#box h2').offset({top:100,left:100});
        // alert(pos);
        // console.log("top:"+pos.top+"left:"+pos.left);
    })
})