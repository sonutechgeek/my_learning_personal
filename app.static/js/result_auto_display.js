
var flag = true;
var imagPath = '../../img/fullscreen_img/'
//var result_otp = '';
var result_requestid = '';
var result_mobile_number = '';
var result_mobile_otp = '';
var mobile_cookies_status = "FALSE";
var cookies_name = "MOBILE_VERIFICATION"
var cookies = getCookie(cookies_name);
var check = true;
$(document).ready(() => {

    param={
        "action": "RESULT_STATUS"
    }
    loadData('result','REQ001','RESULT_LIST',param,'COMMON').then(responseArr=>{
        checkstatus = responseArr['result_status'];
});

    var cookies = getCookie(cookies_name);
    if (cookies == "FALSE" || cookies == '' || cookies == null) 
        $(".result_display_button_event").hide();
    else if (cookies == "TRUE")
        $(".result_display_button_event").show();

    $("#result_send_otp_button").prop("disabled", true);
    $("#result_reset_detail_div").hide();

    $("#result_auto_display_F1").click(function () {
        var cookies = getCookie(cookies_name);
        if (cookies == "FALSE" || cookies == '' || cookies == null) {
            $("#result_mobile_number").focus();
            $("#result_mobile_number,#result_mobile_otp").val("");
            $("#result_mobile_number").prop("disabled", false);
            $("#result_send_otp_button").show();
            $("#result_reset_detail_div").hide();
            $('#result_auto_display_F1').attr("data-target", "#result_auto_display").click();
        } else if (cookies == "TRUE")
        {
            $('#result_auto_display_F1').attr("data-target", "");
            swal.fire("Mobile Verification", "<span style='color:red;'>Your Mobile Number All Ready Verified</span>", "success");
        }
    });


    $("#result_change_mobile").click(function ()
    {
        $("#result_mobile_number").prop("disabled", false);
        $("#result_mobile_number").focus();
        $("#result_mobile_number,#result_mobile_otp").val("");
        $("#result_send_otp,#result_mobile_otp,#result_save_otp,#result_send_otp_button").prop("disabled", true);
        $("#result_reset_detail_div").hide();
        $("#result_send_otp_button").show();
    });

    $("#forget-close-btn").click(function ()
    {
        //result_otp = '';
        result_requestid = '';
        result_mobile_number = '';
        result_mobile_otp = '';
        $('#result-close-btn').attr("data-dismiss", "modal").click();
    });
    $("#result_mobile_number").keyup(function (event)
    {
        result_mobile_number = $("#result_mobile_number").val();
        if (result_mobile_number.length > 9 && result_mobile_number.length < 11) {
            $("#result_send_otp_button").prop("disabled", false);
            $("#result_send_otp_button").focus();
            $("#result_send_otp_button").show();
        }
    });


    $("#result_mobile_otp").keyup(function ()
    {
        result_mobile_otp = $("#result_mobile_otp").val();
        if (result_mobile_otp.length > 4 && result_mobile_otp.length < 6) {
            //if (result_mobile_otp == result_otp) {
            $("#result_save_otp").prop("disabled", false);
            $("#result_save_otp").focus();
            //} else
//            {
//                $("#result_mobile_otp").focus();
//                swal.fire("Please Enter Correct OTP");
//            }
        }
    });


    $("#result_send_otp").click(function ()
    {
        //mobile_number = $("#mobile_number").val();
        if (result_mobile_number.length > 9 && result_mobile_number.length < 11) {
            $("#result_mobile_otp").prop("disabled", false);
            $("#result_mobile_otp").val("");
            $("#result_mobile_otp").focus();
            $("#result_save_otp").prop("disabled", true);
            // result_otp = '';
            // result_requestid = '';
            var param = {
                brand: "PL",
                state: "WB",
                app: "PLWEB",
                action: "SENDOTP",
                type: "customer",
                mobile: result_mobile_number
            };
            loadData('SEND_OTP', 'REQ001', 'SEND_OTP', param, 'COMMON').then(responseArr => {
                if (responseArr.status.toUpperCase() == "SUCCESS")
                {
                    $("#result_mobile_number").prop("disabled", true);
                    result_requestid = responseArr.requestid;
                    $("#otp_message").text(responseArr.message);
                } else
                {
                    swal.fire(responseArr.message);
                }
            });
        } else
        {
            $("#mobile_number").focus();
        }
    });

    $("#result_send_otp_button").click(function ()
    {
        if (result_mobile_number.length > 9 && result_mobile_number.length < 11) {
            var param = {
                brand: "PL",
                state: "WB",
                app: "PLWEB",
                type: "customer",
                mobile: result_mobile_number,
                action: "SENDOTP"
            };
            console.log(param);
            loadData('SEND_OTP', 'REQ001', 'SEND_OTP', param, 'COMMON').then(responseArr => {
                if (responseArr.status.toUpperCase() == "SUCCESS")
                {
                    $("#result_reset_detail_div").show();
                    $("#result_mobile_number,#result_send_otp_button,#result_save_otp").prop("disabled", true);
                    $("#result_mobile_otp").prop("disabled", false);
                    $("#result_mobile_otp").focus();
                    $("#result_send_otp_button").hide();
                    //result_otp = responseArr.otp;
                    result_requestid = responseArr.requestid;
                    $("#otp_message").text(responseArr.message);
                    //alert(otp);
                } else
                {
                    swal.fire(responseArr.message);
                    $("#result_reset_detail_div").hide();
                    $("#result_send_otp_button").show();
                    $("#result_mobile_number").prop("disabled", true);
                }
            });
        }
    });
    $("#result_save_otp").click(function ()
    {
        result_mobile_number = $("#result_mobile_number").val().trim();
        result_mobile_otp = $("#result_mobile_otp").val().trim();
        if (result_mobile_number != '' && result_mobile_number.length > 9 && result_mobile_number.length < 11)
        {
            if (result_mobile_otp != '' && result_mobile_otp.length > 4 && result_mobile_otp.length < 6)
            {
//                if (md5(result_mobile_otp) == md5(result_otp)) {

                if (result_requestid.trim() != '')
                {
                    var param = {
                        brand: "PL",
                        state: "WB",
                        app: "PLWEB",
                        type: "customer",
                        mobile: result_mobile_number,
                        action: "VERIFYOTP",
                        otp: md5(result_mobile_otp),
                        requestid: result_requestid,
                        custcode: "R000G"
                    };
                    console.log(param);
                    loadData('SEND_OTP', 'REQ001', 'SEND_OTP', param, 'COMMON').then(responseArr => {
                        if (responseArr.status.toUpperCase() == "SUCCESS")
                        {
                            mobile_cookies_status = "TRUE"
                            setCookie(cookies_name, mobile_cookies_status, 1);
                            $(".result_display_button_event").show();
                            $('#result_auto_display').attr("data-target", "modal").click();
                            swal.fire("Mobile Verification", "<span style='color:green;'>" + responseArr.message + "<span>", "success");                            
                        } else
                        {
                            mobile_cookies_status = "FALSE"
                            setCookie(cookies_name, mobile_cookies_status, 1);
                            $(".result_display_button_event").hide();
                            $('#result_auto_display').attr("data-target", "");
                            swal.fire(responseArr.message);
                        }
                    });
                } else
                {
                    swal.fire("Mobile Verification", "<span style='color:red;'>Invalid Rquest ID <span>", "error");
                    $('#result_auto_display').attr("data-target", "modal").click();
                }
                // } 
//                else
//                {
//                    $("#result_mobile_otp").focus();
//                    swal.fire("Please Enter Correct OTP")
//                }
            } else
            {
                swal.fire("Please Enter Valid OTP")
                $("#result_mobile_otp").prop("disabled", false);
                $("#result_mobile_otp").focus();
                $("#result_save_otp").prop("disabled", true);
            }

        } else
        {
            swal.fire("Please Enter Valid Mobile Number")
            $("#result_mobile_number").prop("disabled", false);
            $("#result_mobile_number").focus();
            $("#result_mobile_number").val("");
            $("#result_mobile_otp,#result_send_otp,#result_save_otp").prop("disabled", true);
            $("#result_reset_detail_div").hide();
            $("#result_send_otp_button").show();
        }
    });


    //        str += `<div class="modal fade" id="result_auto_display" role="dialog">
//                <div class="modal-dialog modal-lg">            
//                    <div class="modal-content"> 
//                        <div class="modal-header">                    
//                            <button type="button" class="close" data-dismiss="modal" id='result-close-btn'>
//                                &times;
//                            </button>
//                        </div>
//                        <div class="row">
//                            <div class="col-lg-2 col-md-2 col-sm-2" style="background-color: #FFFFF;">                                                       
//                            </div>
//                            <div class="col-lg-8 col-md-8 col-sm-8" style="background-color: #FFFFF;">                                                                           
//                                <center>
//                                    <a class="text-center">
//                                        <img src="app.static/img/logo.png" style="height: 40px;" alt="">
//                                        <span style="font-size: 20px;font-weight: bold; color: black"> Rajshree </span>
//                                    </a>
//                                </center>   
//                                <div class="modal-body" style="font-family:Roboto, sans-serif;">
//                                    <div class="mb-5"  style="border: 1px solid #e5e5e5; border-radius:3px;"> 
//                                        <div class="row">
//                                            <div class="col-lg-2 col-md-2 col-sm-2" style="background-color: #FFFFF;">                                                       
//                                            </div>
//                                            <div class="col-lg-8 col-md-8 col-sm-8 m-3" style="background-color: #FFFFF;">
//                                                <center><h4 class="pt-3 pb-3" style="color: black;"><b>Mobile No. Verification</b></h4></center>
//                                                <div class="mb-2">    
//                                                    <div class="form-group">
//                                                        <label for="Mobile_number_result" class="col-form-label"><span class="label-text"><b>Mobile number</b></span></label><span class="pl-5"></span><span class="ml-5 pl-5 label-text2 cursor-pointer" id="result_change_mobile">Change?</span>
//                                                        <input type="text" class="form-control text-font" id="result_mobile_number" placeholder="+918404000000" maxlength="10" onkeypress="return KeyPressHandler('NUM', event, ' ')"  oninput="return RegularExpHandler('NUM',this.id,' ')" >                                            
//                                                    </div>                                               
//                                                </div>
//                                                <div id="result_send_otp_div">
//                                                    <div class="pr-4 pl-4 pt-3">
//                                                        <center><button type="button" id="result_send_otp_button" class="btn btn-lg btn-block btn-warning" style="color: black;"><b>Send OTP</b></button></center>                                                                                        
//                                                    </div> 
//                                                </div>
//                                                <div id="result_reset_detail_div">
//                                                    <div class="form-group">
//                                                        <label for="OTP_sent_to_Mobile" class="col-form-label"><span class="label-text"><b>OTP sent to Mobile</b></span></label><span class="pl-3"></span><span class="ml-5 pl-5 label-text2 otp cursor-pointer" id="result_send_otp">Resend?</span>
//                                                        <input type="text" class="form-control text-font otp" maxlength="5" id="result_mobile_otp" placeholder="Enter OTP">
//                                                    </div>                                                    
//                                                    <div class="p-4">
//                                                        <center><button type="button" id="result_save_otp" data-dismiss="modal" class="btn btn-lg btn-block btn-warning" style="color: black;"><b>Verify OTP</b></button></center>
//                                                    </div> 
//                                                </div>
//                                                <!--data-dismiss="modal" -->
//                                            </div>
//                                            <div class="col-lg-2 col-md-2 col-sm-2" style="background-color: #FFFFF;">                                                       
//                                            </div>
//                                        </div>   
//                                        <br><br>
//                                    </div>                            
//                                </div>
//                            </div>                                        
//                        </div>
//                    </div>
//                </div>
//            </div>`;
    //$("#result_display_model").html(str);    

    getLastSevenDaysImages();
    getLastSevenDaysOneByOneImages();

    /////////////////////////////////////////////////// GET IMAGES NAME ////////////////////////////////////////
//        $(document).keydown(function (e) {
//             var keyCode = e.keyCode || e.which;
//             if (check == true && (keyCode == 37  || keyCode == 39)) {
//                 check = false;
//                 getLastSevenDaysImages();
//                 getLastSevenDaysOneByOneImages();
//             }
//        });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // refreshCookies();
    var rightsrno = 1;
//        img = 2;
    var testArray = '';
    leftsrno = 1;
    oneleftsrno = 1;
    $(document).keydown(function (e) {

        var keyCode = e.keyCode || e.which;
        
//            if ((keyCode == 37){
//                checkresult = 'ONEBYONERESULT';
//            }
        //if (keyCode == 112)
          //  e.preventDefault();
        //else 
   if (keyCode == 112 && cookies.toUpperCase() == 'FALSE') {
            e.preventDefault();
            showRegdialog();
        } else if ((keyCode == 113 && cookies.toUpperCase() == 'TRUE') && checkstatus === '1') {   //////FOR  LAST ONE RESULT //////////////
            checkresult = 'ONEBYONERESULT';
            if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
                for (var key in towimagenm) {
                    if (key.toUpperCase().indexOf("_ONE") !== -1) {
                        $('#image').attr("src", key);
                    }
                }
//                    clearInterval(changereslt_var);
                callSevenDaysOneByOneResult(); 
            } else {
                lastOneResult();
            }
        } else if ((keyCode == 114 && cookies.toUpperCase() == 'TRUE' && checkstatus === '1')) {   //////FOR  LAST TWO RESULT ////////////// 
            e.preventDefault();
            checkresult = 'TWORESULT';
            if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
                for (var key1 in towimagenm) {
                    if (key1.toUpperCase().indexOf("_TWO") !== -1) {
                        $('#image').attr("src", key1);
                    }
                }
//                    clearInterval(intervalvar);
                callSevenResult();
            } else {
                lastTwoResult();
            }
        } else if (keyCode == 116) {
            location.reload();
        } else if ((keyCode == 37 && cookies.toUpperCase() == 'TRUE') && ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height))) {  /////////////// For Left Arrow
//                alert(keyCode);
            if (check == true) {
                check = false;
                getLastSevenDaysImages();
                getLastSevenDaysOneByOneImages();
            }
            if (checkresult == 'ONEBYONERESULT') {
                console.log(oneleftsrno);
//                    alert(oneallimgname);
                testArray = imagPath + "last_sevendaysonebyone/" + oneallimgname + "_" + oneleftsrno + ".png"  in oneallimagenamearr;
                if (testArray == true) {
                    if (oneleftsrno != onelengthimg)
                        ++oneleftsrno;
                    leftRightOneByOneSide(oneleftsrno);
                }
            } else if (checkresult == 'TWORESULT') {
                console.log(leftsrno);
                testArray = imagPath + "last_sevenday/" + allimgname + "_" + leftsrno + ".png"  in allimagenamearr;
                if (testArray == true) {
                    if (leftsrno != lengthimg)
                        ++leftsrno;
                    leftRightSide(leftsrno);
                }
            }
        } else if ((keyCode == 39 && cookies.toUpperCase() == 'TRUE') && ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height))) {  /////////////// For Right Arrow
            if (checkresult == 'ONEBYONERESULT') {
                testArray = imagPath + "last_sevendaysonebyone/" + oneallimgname + "_" + oneleftsrno + ".png"  in oneallimagenamearr;
                if (testArray == true) {
                    if (oneleftsrno >= 2)
                        oneleftsrno--;
                    leftRightOneByOneSide(oneleftsrno);
                }
            } else if (checkresult == 'TWORESULT') {
                console.log(leftsrno);
                testArray = imagPath + "last_sevenday/" + allimgname + "_" + leftsrno + ".png"  in allimagenamearr;
                if (testArray == true) {
                    if (leftsrno >= 2)
                        leftsrno--;
                    leftRightSide(leftsrno);
                }
            }
        }
        
        //your keyCode contains the key code, F1 to F12 
        //is among 112 and 123. Just it.
    });



});

function screenchange(seconds) {
    if (seconds == 59) {
        $('#image').attr("src", banner);
//            $('#image').css({'background-image': 'url(' + banner + ')', 'background-size': '100% 100%'});
    }
}
function callSevenResult() {
    var flag1 = true;
    img_name = '';
    $('#message_1').show();
    $('#message_1').empty();
    $('#message_2').show();
    $('#message_2').empty();
    $('#message_3').show();
    $('#message_3').empty();
    $('#message_4').show();
    $('#message_4').empty();
    $('#message_5').show();
    $('#message_5').empty();
    $('#message_6').show();
    $('#message_6').empty();
    $('#message_7').show();
    $('#message_7').empty();
    $('#message_8').show();
    $('#message_8').empty();
    $('#message_9').show();
    $('#message_9').empty();
    $('#message_10').show();
    $('#message_10').empty();
    $('#message_11').show();
    $('#message_11').empty();
    $('#message_12').show();
    $('#message_12').empty();
    $('#message_13').show();
    $('#message_13').empty();
    $('#message_14').show();
    $('#message_14').empty();
    $('#message_15').show();
    $('#message_15').empty();
    $('#message_16').show();
    $('#message_16').empty();
    $('#message_17').show();
    $('#message_17').empty();
    $('#message_18').show();
    $('#message_18').empty();
    $('#message_19').show();
    $('#message_19').empty();
    $('#message_20').show();
    $('#message_20').empty();
    


    $.ajax({
        type: 'POST',
        url: 'app.result/result/LastSevenResult_Backend.php?' + Math.random(),
        dataType: 'html',
        contentType: 'text/html',
        data: {
//                username: $('#username').val()
        },
        success: function (html) {
//                alert(html)
            var data = html.split('@@');
//                element = data[0];
//                img_name = data[1];
//                alert(element)
//                alert(img_name)
//                alert(img_name);
            if (html.toUpperCase().indexOf("#EXISTS:") !== -1) {
//                    alert(html.toUpperCase().replace("#EXISTS:", ""));
                //    alert("Check");
//                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + Math.random());
            } else {
                //    alert(data);
                var sn = 0;
                var imgno = 1;
                for (var key in data) {
                    var divdata = data[key].split('~~');
//                          alert(divdata[1])
//                        alert(data[key]);
                    if (flag1 == true) {
                        flag1 = false;
                        sn++;
                    //    alert('message_'+(sn)+"f");    
                        $('#message_' + sn).append(divdata[0]);

                        var canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        context.clearRect(0, 0, canvas.width, canvas.height);

                        html2canvas($('#message_' + sn), {
//                            alert("1");
                            onrendered: function (canvas) {
//                                alert("1");
                                getCanvas = canvas;
                                imgageData = getCanvas.toDataURL("image/png");
//                                alert(imgageData);
                                $.post("app.result/classes/SaveSevenImages.php?" + Math.random(), {flag: "SAVE", imgName: imagPath +  "last_sevenday/" + divdata[1] + "_" + imgno++ + ".png", imgBase64: imgageData}).then(function (response) {
//                                alert(response);
//                                exit;   
                                    if (response.includes("#ERROR:")) {
                                        alert("No Images attached to this survey.")
                                    } else {
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
                                    }
//                                if(seconds != 0){
//                                    seconds=0
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
//                                }
                                });
//                            if (seconds != 0) {
//                                seconds = 0
//                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                            }
                            }
                        });
//                        Thread.sleep(5000); // do nothing for 1000 miliseconds (1 second)
                        //alert("1");
//                        imgno++;
                    } else if (flag1 == false) {
                        flag1 = true;
                        sn++;

//                        alert('message_'+(sn)+"q");
                        $('#message_' + sn).append(divdata[0]);

                        var canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        context.clearRect(0, 0, canvas.width, canvas.height);

                        html2canvas($('#message_' + sn), {
//                            alert("1");
                            onrendered: function (canvas) {
//                                alert("1");
                                getCanvas = canvas;
                                imgageData = getCanvas.toDataURL("image/png");
//                                alert(imgageData);
                                $.post("app.result/classes/SaveSevenImages.php?" + Math.random(), {flag: "SAVE", imgName: imagPath +  "last_sevenday/" + divdata[1] + "_" + imgno++ + ".png", imgBase64: imgageData}).then(function (response) {
//                                alert(response);
//                                exit;   
                                    if (response.includes("#ERROR:")) {
                                        alert("No Images attached to this survey.")
                                    } else {
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
                                    }
//                                if(seconds != 0){
//                                    seconds=0
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
//                                }
                                });
//                            if (seconds != 0) {
//                                seconds = 0
//                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                            }
                            }
                        });
//                        imgno++;
                    }
                }
            }
        }
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////LAST SEVEN DAYS ONE BY ONE RESULT ///////////////////////////////////////////////////
function callSevenDaysOneByOneResult() {
    var flag1 = true;
    img_name = '';
    $('#message_1').show();
    $('#message_1').empty();
    $('#message_2').show();
    $('#message_2').empty();
    $('#message_3').show();
    $('#message_3').empty();
    $('#message_4').show();
    $('#message_4').empty();
    $('#message_5').show();
    $('#message_5').empty();
    $('#message_6').show();
    $('#message_6').empty();
    $('#message_7').show();
    $('#message_7').empty();
    $('#message_8').show();
    $('#message_8').empty();
    $('#message_9').show();
    $('#message_9').empty();
    $('#message_10').show();
    $('#message_10').empty();
    $('#message_11').show();
    $('#message_11').empty();
    $('#message_12').show();
    $('#message_12').empty();
    $('#message_13').show();
    $('#message_13').empty();
    $('#message_14').show();
    $('#message_14').empty();
    $('#message_15').show();
    $('#message_15').empty();
    $('#message_16').show();
    $('#message_16').empty();
    $('#message_17').show();
    $('#message_17').empty();
    $('#message_18').show();
    $('#message_18').empty();
    $('#message_19').show();
    $('#message_19').empty();
    $('#message_20').show();
    $('#message_20').empty();
    $('#message_21').show();
    $('#message_21').empty();
    $('#message_22').show();
    $('#message_22').empty();
    $('#message_23').show();
    $('#message_23').empty();
    $('#message_24').show();
    $('#message_24').empty();
    $('#message_25').show();
    $('#message_25').empty();
    $('#message_26').show();
    $('#message_26').empty();
    $('#message_27').show();
    $('#message_27').empty();
    $('#message_28').show();
    $('#message_28').empty();
    $('#message_29').show();
    $('#message_29').empty();
    $('#message_30').show();
    $('#message_30').empty();
    $('#message_31').show();
    $('#message_31').empty();
    $('#message_32').show();
    $('#message_32').empty();
    $('#message_33').show();
    $('#message_33').empty();
    $('#message_34').show();
    $('#message_34').empty();
    $('#message_35').show();
    $('#message_35').empty();


    $.ajax({
        type: 'POST',
        url: 'app.result/result/LastSevenDaysOneResult_Backend.php?' + Math.random(),
        dataType: 'html',
        contentType: 'text/html',
        data: {
//                username: $('#username').val()
        },
        success: function (html) {
//                alert(html)
            var data = html.split('@@');
//                element = data[0];
//                img_name = data[1];
//                alert(element)
//                alert(img_name)
//                alert(img_name);
            if (html.toUpperCase().indexOf("#EXISTS:") !== -1) {
//                    alert(html.toUpperCase().replace("#EXISTS:", ""));
//                    alert("Check");
//                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + Math.random());
            } else {
//                    alert(data);
                var sn = 0;
                var imgno = 1;
                for (var key in data) {
                    var divdata = data[key].split('~~');
//                          alert(divdata[1])
//                        alert(data[key]);
                    if (flag1 == true) {
                        flag1 = false;
                        sn++;
//                        alert('message_'+(sn)+"f");    
                        $('#message_' + sn).append(divdata[0]);

                        var canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        context.clearRect(0, 0, canvas.width, canvas.height);

                        html2canvas($('#message_' + sn), {
//                            alert("1");
                            onrendered: function (canvas) {
//                                alert("1");
                                getCanvas = canvas;
                                imgageData = getCanvas.toDataURL("image/png");
//                                alert(imgageData);
                                $.post("app.result/classes/SaveSevenDaysOneByOneImages.php?" + Math.random(), {flag: "SAVE", imgName: imagPath +  "last_sevendaysonebyone/" + divdata[1] + "_" + imgno++ + ".png", imgBase64: imgageData}).then(function (response) {
//                                alert(response);
//                                exit;   
                                    if (response.includes("#ERROR:")) {
                                        alert("No Images attached to this survey.")
                                    } else {
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
                                    }
//                                if(seconds != 0){
//                                    seconds=0
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
//                                }
                                });
//                            if (seconds != 0) {
//                                seconds = 0
//                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                            }
                            }
                        });
//                        Thread.sleep(5000); // do nothing for 1000 miliseconds (1 second)
                        //alert("1");
//                        imgno++;
                    } else if (flag1 == false) {
                        flag1 = true;
                        sn++;

//                        alert('message_'+(sn)+"q");
                        $('#message_' + sn).append(divdata[0]);

                        var canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        context.clearRect(0, 0, canvas.width, canvas.height);

                        html2canvas($('#message_' + sn), {
//                            alert("1");
                            onrendered: function (canvas) {
//                                alert("1");
                                getCanvas = canvas;
                                imgageData = getCanvas.toDataURL("image/png");
//                                alert(imgageData);
                                $.post("app.result/classes/SaveSevenDaysOneByOneImages.php?" + Math.random(), {flag: "SAVE", imgName: imagPath +  "last_sevendaysonebyone/" + divdata[1] + "_" + imgno++ + ".png", imgBase64: imgageData}).then(function (response) {
//                                alert(response);
//                                exit;   
                                    if (response.includes("#ERROR:")) {
                                        alert("No Images attached to this survey.")
                                    } else {
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
                                    }
//                                if(seconds != 0){
//                                    seconds=0
//                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
//                                }
                                });
//                            if (seconds != 0) {
//                                seconds = 0
//                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
//                            }
                            }
                        });
//                        imgno++;
                    }
                }
            }
        }
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////ARROW KEY ////////////////////////////////////////////
    function leftRightSide(leftsrno) {
        //        alert(leftsrno + "L");
        //        clearInterval(intervalvar);
        //        clearInterval(changereslt_var);
                var testArray1 = imagPath + "last_sevenday/" + allimgname + "_" + leftsrno + ".png"  in allimagenamearr;
        //        alert(testArray);
                if (testArray1 == true) {
                    $('#image').attr("src", "img/fullscreen_img/last_sevenday/" + allimgname + "_" + leftsrno + ".png?" + new Date().getTime());
                }
            }
            function leftRightOneByOneSide(leftsrno) {
        //        alert(leftsrno + "L");
        //        clearInterval(intervalvar);
        //        clearInterval(changereslt_var);
                var testArray1 = imagPath + "last_sevendaysonebyone/" + oneallimgname + "_" + leftsrno + ".png"  in oneallimagenamearr;
        //        alert(testArray);
                if (testArray1 == true) {
                    $('#image').attr("src", "img/fullscreen_img/last_sevendaysonebyone/" + oneallimgname + "_" + leftsrno + ".png?" + new Date().getTime());
                }
            }

            function getLastSevenDaysImages() {
                $.post('app.result/result/LastSevenResult_Backend.php', {'ACTION': 'getImageName'}, function (res) {
        //            alert(res);
                    allimagesarr = JSON.parse(res);
                    allimagenamearr = allimagesarr.sevendayimg;
        //            alert(JSON.stringify(allimagenamearr));
                    lengthimg = Object.keys(allimagesarr.sevendayimg).length;
                    towimagenm = allimagesarr.twoimgname;
                    for (var key in allimagesarr.sevendayimg) {
                        var split = key.split('_sevenday/');
                        allimgname = split[1].split('_1.png');
                        allimgname = allimgname[0]
                        break;
                    }
                });
            }
            function getLastSevenDaysOneByOneImages() {
                $.post('app.result/result/LastSevenDaysOneResult_Backend.php', {'ACTION': 'getImageName'}, function (res) {
        //            alert(res);
                    oneallimagesarr = JSON.parse(res);
                    oneallimagenamearr = oneallimagesarr.sevendayimg;
        //            alert(JSON.stringify(oneallimagenamearr));
                    onelengthimg = Object.keys(oneallimagesarr.sevendayimg).length;
                    onetowimagenm = oneallimagesarr.twoimgname;
        //            alert(JSON.stringify(onetowimagenm))
                    for (var key1 in oneallimagesarr.sevendayimg) {
                        var split = key1.split('_sevendaysonebyone/');
                        oneallimgname = split[1].split('_1.png');
                        oneallimgname = oneallimgname[0];
        //                alert(oneallimgname)
                        break;
                    }
                });
            }

            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener('webkitfullscreenchange', exitHandler);
            document.addEventListener('mozfullscreenchange', exitHandler);
            document.addEventListener('MSFullscreenChange', exitHandler);
            function exitHandler() {
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                $('#fullscr_img').hide();
                clearInterval(intervalvar);
                clearInterval(changereslt_var);
                location.reload();
            }
            $('#message').hide();
        }


        function callResult() {
            //        checkresult = 'ONEBYONERESULT';
                    img_nametwo = '';
                    $('#message').show();
                    $('#message').empty();
                    $.ajax({
                        type: 'POST',
                        url: 'app.result/result/LastwoResult_Backend.php?' + Math.random(),
                        dataType: 'html',
                        contentType: 'text/html',
                        data: {
            //                username: $('#username').val()
                        },
                        success: function (html) {
                            // alert(html)
                            var data = html.split('@@');
                            element = data[0];
                            img_nametwo = data[1];
                            if (html.toUpperCase().indexOf("#EXISTS:") !== -1) {
            //                    alert(html.toUpperCase().replace("#EXISTS:", ""));
                                //alert(img_nametwo);
                                $('#image').attr("src", "img/fullscreen_img/" + img_nametwo + ".png?" + Math.random());
                                leftsrno = 1;
            //                    img = 2;
                            } else {
            //                    alert(data[0])
                                $('#message').append(data[0])
                                var canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                context.clearRect(0, 0, canvas.width, canvas.height);
            
            
            //                    alert(img_nametwo)
                                html2canvas($('#message'), {
                                    onrendered: function (canvas) {
                                        //                $("#previewImage").append(canvas);
                                        getCanvas = canvas;
                                        imgageData = getCanvas.toDataURL("image/png");
            //                        aler  t(imgageData);
                                        $.post("app.result/classes/SaveImages.php?" + Math.random(), {flag: "SAVE", imgBase64: imgageData, imgName: imagPath + img_nametwo + ".png"}).then(function (response) {
                                            if (response.includes("#ERROR:")) {
                                                alert("No Images attached to this survey.")
                                            } else {
                                                $('#image').attr("src", "img/fullscreen_img/" + img_nametwo + ".png?" + new Date().getTime());
            //                                    $('#image').attr("src", "img/fullscreen_img/" + img_nametwo + ".png?"+ new Date().getTime());
                                            }
            //                                if(seconds != 0){
            //                                    seconds=0
            //                                    $('#image').attr("src", "img/fullscreen_img/" + img_nametwo + ".png?"+ new Date().getTime());
            //                                }
                                        });
                                        if (seconds != 0) {
                                            seconds = 0
                                            $('#image').attr("src", "img/fullscreen_img/" + img_nametwo + ".png?" + new Date().getTime());
                                            leftsrno = 1;
            //                                img = 2;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            
                function callOneResult() {
            //        alert("f");
            //        img_name = '';
                    $('#message').show();
                    $('#message').empty();
                    $.ajax({
                        type: 'POST',
                        url: 'app.result/result/LastOneResult_Backend.php?' + Math.random(),
                        dataType: 'html',
                        contentType: 'text/html',
                        data: {
            //                username: $('#username').val()
                        },
                        success: function (html) {
                            console.log(html);
                            //alert(html)
                            //alert(JSON.stringify(data));
                            var data = html.split('@@');
                            element = data[0];
                            img_name = data[1];                
                            //alert(data[1]+"if");
                            if (html.toUpperCase().indexOf("#EXISTS:") !== -1) {
                                
            //                    alert(html.toUpperCase().replace("#EXISTS:", ""));
                                //alert(img_name);
                                
                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + Math.random());
                                oneleftsrno = 1;
                            } else {                    
                                $('#message').append(data[0])
                                var canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                context.clearRect(0, 0, canvas.width, canvas.height);
            
            
            //                    alert(img_name)
                                html2canvas($('#message'), {
                                    onrendered: function (canvas) {
                                        //                $("#previewImage").append(canvas);
                                        getCanvas = canvas;
                                        imgageData = getCanvas.toDataURL("image/png");
            //                        aler  t(imgageData);
                                        $.post("app.result/classes/SaveImages.php?" + Math.random(), {flag: "SAVE_ONE_RESULT", imgBase64: imgageData, imgName: imagPath + img_name + ".png"}).then(function (response) {
            //                                alert(response);
                                            if (response.includes("#ERROR:")) {
                                                alert("No Images attached to this survey.")
                                            } else {
                                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
            //                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
                                            }
            //                                if(seconds != 0){
            //                                    seconds=0
            //                                    $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?"+ new Date().getTime());
            //                                }
                                        });
                                        if (seconds != 0) {
                                            seconds = 0
                                            $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + new Date().getTime());
                                            oneleftsrno = 1;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            
            
            
            
                function lastTwoResult() {
                    checkresult = 'TWORESULT';
            
            
            //        $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 102%', 'background-repeat': ' no-repeat'});
            //        $('#image').attr("src", "img/fullscreen_img/result.png?" + Math.random());
                    $('#fullscr_img').show();
                    changereslt_var = setInterval(function () {
                        callResult();
                        callSevenResult();   ///SEVEN RESULT///
                        getLastSevenDaysImages();
                    }, 180000);
                    ///////////////////////////  FOR BANNER //////////////////////////////////////
                    seconds = 0;
                    intervalvar = setInterval(function () {
                        if (flag == true) {
                            flag = false;
                            callResult();
                            callSevenResult();   ///SEVEN RESULT///
                        }
                        if (seconds == 69) {    
                            if(leftsrno > 1)
                                $('#image').attr("src", "img/fullscreen_img/last_sevenday/" + allimgname + "_" + leftsrno + ".png?" + new Date().getTime());
                            else
                               $('#image').attr("src", "img/fullscreen_img/" + img_nametwo + ".png?" + Math.random());
            //                leftsrno = 1;
            //                img = 2;
            //                if (imgageData != '')
            //                    $('#image').css({'background-image': 'url(' + imgageData + ')', 'background-size': '100% 102%', 'background-repeat': ' no-repeat'});
            //                else
            //                    $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 102%', 'background-repeat': ' no-repeat'});
                            seconds = 0;
                        }
                        seconds++;
                        screenchange(seconds);
                    }, 1000);
            
                    var element = document.getElementById("fullscr_img");
                    if (element.requestFullscreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
            //            $('#fullscr_img').show();
                        element.requestFullscreen();
                    } else if (element.mozRequestFullScreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            document.location.href='LastwoResult_Backend.php';
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#fullscr_img').show();
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
                        element.mozRequestFullScreen();
                    } else if (element.webkitRequestFullscreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#fullscr_img').show();
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
                        element.webkitRequestFullscreen();
                    } else if (element.msRequestFullscreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#fullscr_img').show();
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
                        element.msRequestFullscreen();
                    } else {
                        console.log("Fullscreen Unavailable");
                    }
                }
            
            
                function lastOneResult() {
                        
                      checkresult = 'ONEBYONERESULT';      
            //        $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 102%', 'background-repeat': ' no-repeat'});
            //        $('#image').attr("src", "img/fullscreen_img/result.png?" + Math.random());
                    $('#fullscr_img').show();
                    changereslt_var = setInterval(function () {
                        callOneResult();
                        callSevenDaysOneByOneResult();   ///SEVEN RESULT///
                        getLastSevenDaysOneByOneImages();
                    }, 180000);
                    ///////////////////////////  FOR BANNER //////////////////////////////////////
                    seconds = 0;
                    intervalvar = setInterval(function () {
                        if (flag == true) {
                            flag = false;
                            callOneResult();
                            callSevenDaysOneByOneResult();   ///SEVEN RESULT///
                        }
                        if (seconds == 69) {
                            if(oneleftsrno > 1)
                                $('#image').attr("src", "img/fullscreen_img/last_sevendaysonebyone/" + oneallimgname + "_" + oneleftsrno + ".png?" + new Date().getTime());
                            else
                                $('#image').attr("src", "img/fullscreen_img/" + img_name + ".png?" + Math.random());
            //                oneleftsrno = 1;
            //                if (imgageData != '')
            //                    $('#image').css({'background-image': 'url(' + imgageData + ')', 'background-size': '100% 102%', 'background-repeat': ' no-repeat'});
            //                else
            //                    $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 102%', 'background-repeat': ' no-repeat'});
                            seconds = 0;
                        }
                        seconds++;
                        screenchange(seconds);
                    }, 1000);        
                    var element = document.getElementById("fullscr_img");
                    if (element.requestFullscreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
            //            $('#fullscr_img').show();
                        element.requestFullscreen();
                    } else if (element.mozRequestFullScreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            document.location.href='LastwoResult_Backend.php';
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#fullscr_img').show();
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
                        element.mozRequestFullScreen();
                    } else if (element.webkitRequestFullscreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#fullscr_img').show();
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
                        element.webkitRequestFullscreen();
                    } else if (element.msRequestFullscreen) {
            //            $("#image").css('height', '105%');
            //            $("#image").css('width', '100%');
            //            $("#image").css('margin-top', '0%');
            //            $('#image').attr("src", "img/fullscreen_img/result.png");
            //            $('#fullscr_img').show();
            //            $('#image').css({'background-image': 'url(img/fullscreen_img/result.png)', 'background-size': '100% 100%'});
            //            $('#fullscr_img').show();
                        element.msRequestFullscreen();
                    } else {
                        console.log("Fullscreen Unavailable");
                    }
            
                    //alert(img_name+"::");
            
                }
