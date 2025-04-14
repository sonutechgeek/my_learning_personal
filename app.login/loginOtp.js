function loginUsingOtp(action) {
    commonLoop = otpDivLoop;
    actionOtp = action;
    var emailCondition = true;
    if (regMob.test(storeEmail_Mobile)) {
        emailCondition = false;
    }
    var stringLoginName = consverdString(storeEmail_Mobile);
    let str = `<div class='row'>
                    <div class='col-3'></div>
                    <div class='col-6' style='background-color:#ffff;'>
                        <div class='row mt-5'>
                            <div class="col-12 text-center">
                                <h5 class="Verifyotp_h5_text">
                                Hey! ${stringLoginName}
                                </h5>
                                ${action == "no" ?
                                "<h5 class='Verifyotp_h5_text'>Looks like you have not signed up with us, no worries<br/>We've just sent you and OTP to</h5>"
                                :
                                (forgetMpinSet.trim() == "" ?
                                        "<h4 class='Verifyotp_h5_text'>Welcome Back!<br/>We are happy to see you again</h4>" :
                                        ""
                                        )
                                }
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-center">
                            ${forgetMpinSet.trim() == "" ?
                                (emailCondition == true ? '<h3 class="Verifyotp_h3_text h3_text_label"><b>Verify Your Email</b></h3>' : '<h3 class="Verifyotp_h3_text h3_text_label"><b>Verify Your Number</b></h3>') :
                                '<h3 class="Verifyotp_h3_text h3_text_label"><b>Forgot your MPIN?</b></h3><h6 class="Verifyotp_h3_text"><b>No Worries!</b></h6>'
                                }
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col-4"></div>
                            <div class="col-4 text-center mt-2">
                                ${forgetMpinSet.trim() == "" ? '<img src="./app.static/img/login_images/verify_mobile.png" class="img-fluid Verifyotp_verify_img">' :
                                '<img src="./app.static/img/login_images/forgot_mobile_otp.png" class="img-fluid Verifyotp_verify_img">'
                                }
                            </div>
                            <div class="col-4"></div>
                        </div>
                        <div class='row'>
                            <div class='col-2'></div>
                            <div class='col-8'>
                                ${cirucleDiv('otp_')}
                            </div>    
                            <div class='col-2'></div>
                        </div>
                        <div id="timer_div"></div>
                        <div class='row'>
                            <div class='col-2'></div>
                            <div class='col-8'>
                                ${buttonS('otp_submit', 'Verify', 'otp_')}
                            </div>    
                            <div class='col-2'></div>
                        </div>
                        <div class='row'>
                            <div class='col-12 text-center'>
                                <h5 class='h5_text h5_text_color'>
                                    DO NOT SHARE THIS OTP WITH ANYONE
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class='col-3'></div>
               </div>`;
    $("#loginDataDiv").html('');
    $("#loginDataDiv").html(str);
    $("#otp_1").focus();
    enableDisabled(0);
    setTimerDiv("active");
    sendOtp(actionOtp);
}

function setTimerDiv(status) {
    let str = `<div class="row">
        <div class="col-12 text-center">
            ${status == "active" ?
            "<h5 class='h5_text h5_text_color'>Resend OTP in <span id='timer'></span></h5>"
            : "<h6 class='Verifyotp_h3_text' onclick='reSendOtp()'><u>Resend OTP</u></h6>"
            }
        </div>
    </div>`;
    $("#timer_div").html(str);
    if (status == "active") {
        resendOtpTimer();
    }
}

function reSendOtp() {
    setTimerDiv('active');
    sendOtp(actionOtp);
    $(".verify_mpin_input").val('');
    $("#otp_1").focus();
    enableDisabled(0);
}


function resendOtpTimer() {
    let seconds = 60;
    let intervalId = null;
    clearInterval(intervalId);
    let interval_Timer = function () {
        if (seconds == 0) {
            clearInterval(intervalId);
            setTimerDiv("unactive");
            intervalId = null;
        } else {
            seconds--;
            if (seconds < 10) {
                $("#timer").text("00:0" + seconds);
            } else {
                $("#timer").text("00:" + seconds);
            }
        }
    };
    intervalId = setInterval(interval_Timer, 1000);
}

function sendOtp(actionOtp) {
    var request_type = "";
    if (actionOtp.toLowerCase() == "no") {
        request_type = "SIGNUP";
    } else {
        request_type = "SIGNIN";
    }
    var otpFor = "";
    if(forgetMpinSet.toLowerCase() == "forget_mpin") {
        otpFor = "MPIN";
    } else {
        otpFor = "Login";
    }
    var loginParam = {
        "username": storeEmail_Mobile,
        "request_type": request_type,
        "otp_for": otpFor
    };
    loadData('REGISTERUSER', 'REQ001', 'REGISTERUSER_OTP', loginParam, 'COMMON').then(responseArr => {
        // console.log(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            requestId = responseArr.requestid;
        } else {
            successErrorAlert("error", "", responseArr.message);
            if (isEmail == true) {
                storeEmail_Mobile = '';
                requestId = '';
                loadMobileUIData("no");
            }
            // storeEmail_Mobile = '';
            // requestId = '';
            return false;
        }
    });
}

function forgetMpin(action) {
    commonLoop = otpDivLoop;
    actionOtp = action;
    forgetMpinSet = "forget_mpin"
    loginUsingOtp(actionOtp);
}

function validateLoginIn(storeEmail_Mobile) {
    otpLabelMessage = '';
    if (storeEmail_Mobile == "") {
        successErrorAlert("error", "", "Please Enter Email/Mobile Number");
        return false;
    }
    if (regMob.test(storeEmail_Mobile)) {
        if (storeEmail_Mobile.length < 10) {
            successErrorAlert("error", "", "Invalid Mobile Number");
            return false;
        } else {
            otpLabelMessage = 'Mobile Number';
        }
    } else if (!emailReg.test(storeEmail_Mobile)) {
        successErrorAlert("error", "", "Please Enter Valid Email Address/Mobile Number");
        return false;
    } else {
        if (otpLabelMessage == '' && otpLabelMessage.length < 1) {
            otpLabelMessage = 'Email Id';
        }
    }
    return true;
}

