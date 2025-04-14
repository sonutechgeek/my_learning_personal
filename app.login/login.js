$("#footer1").hide();
var storeEmail_Mobile = "";
var requestId = "";
var actionOtp = "";
var termCondition = true;
var otpDivLoop = 5;
var mpinDivLoop = 4;
var commonLoop = 0;
var forgetMpinSet = "";
var setMpinArray = {
    "setmpin_": {
        "_1": "", "_2": "",
        "_3": "", "_4": ""
    },
    "conformmpin_": {
        "_1": "", "_2": "",
        "_3": "", "_4": ""
    }
};
var googleSignUp = false;
var googleSignUpParams = {};
var fBSignUp = false;
var fbSignUpParams = {};
resetAllVariables();
loadLoginData();
google.accounts.id.initialize({
    client_id: '524465893214-hsgngnuc9ncju16plrpi2c2a14ijkdu6.apps.googleusercontent.com',
    callback: onGoogleSignIn
});
google.accounts.id.renderButton(document.getElementById("bmr-google-signin"), {
    theme: 'outline',
    size: 'large',
    shape: 'circle',
    text: "signin_with",
    width: '100%',
    click_listener: onGoogleSignIn
});

var regMob = /^[0]?[789]\d{9}$/;///^[0-9]+$/;
// var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var emailReg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;



function googleAccountLogin() {
    // alert("google");
}
function facebookAccountLogin() {
    // alert("facebook");
}
function checkTermCondition() {
    termCondition = !termCondition;
    if (termCondition == false) {
        // $("#login_submit").prop("disabled", true);
        // $("#login_submit").addClass("disabled_color");
    } else {
        // $("#login_submit").prop("disabled", false);
        // $("#login_submit").removeClass("disabled_color");
    }
}

function loginFb() {
    FB.login((response) => {
        if (response.authResponse) {
            getFbData();
        }
    }, { scope: 'email,public_profile', return_scopes: true });
}

function getFbData() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
        function (response) {
            console.log(JSON.stringify(response));
            var fbUserResponse = response;
            params = {
                "gid": fbUserResponse['id'],
                "type": "fb"
            }
            loadData('REGISTERUSER', 'REQ001', 'CHECK_SOCIAL_MEDIA_USER', params, 'COMMON').then(responseArr => {
                storeEmail_Mobile = fbUserResponse.email;
                isEmail = true
                fBSignUp = true;
                fbSignUpParams = {
                    "gid": fbUserResponse['id'],
                    "type": "fb",
                    "firstname": fbUserResponse['first_name'] + " " + fbUserResponse['last_name'],
                    "lastname": fbUserResponse['last_name'],
                    "gender": "",
                    "gmail": fbUserResponse['email'],
                    "image": fbUserResponse.picture.data.url,
                    "imagename": "fb_image",
                    "image_type": "PROFILE",
                };
                loadMobileUIData('no');
            });
        }
    );
}

function loadTermOfUseComp() {
    loadComponent("termofuse", "REQ002");
}

function loadPrivacyPolicyComp() {
    loadComponent("privacypolicy", "REQ002")


}

function loadLoginData() {
    str = `<div class='row'>
            <div class='col-2'></div>
            <div class='col-8'>
                <div class='row'>
                <div class='col-1'></div>
                    <div class='col-10' style='background-color:#ffff;'>
                        <div class='row mt-4'>
                            <div class='col-3'></div>
                            <div class='col-6'>
                                <div class='row'>
                                    <div class='col-12 text-center mt-5'>
                                        <h3 class="common_color"><b>Log In<span class="login_span_label">/</span>Register</b></h3>
                                    </div>
                                    <div class='col-12 text-center mt-1' style='display:none;'>
                                        <h4 class="common_color">Mobile Number<span class="login_span_label">/</span>Email Id</h4>
                                    </div>
                                    <div class='col-12 text-center mt-4 mb-2'>
                                        <div class='row'>
                                            <div class='col-1'></div>
                                            <div class='col-10'>
                                                <input type='text' class="form-control login_input_number"
                                                placeholder="Enter your mobile number / Email id" id="login_signup_input_number"
                                                onkeypress="return KeyPressHandler('ALPHANUMCHAR', event, '()+-_@.')" required
                                                autoComplete="off" maxLength="30" value=""
                                                oninput="return RegularExpHandler('ALPHANUMCHAR',this.id,'()+-_@.')" />
                                            </div>
                                            <div class='col-1'></div>
                                        </div>
                                        <div class='row' style='display:none;'>
                                            <div class='col-12 text-center mt-2' onclick='refrelDiv()'>
                                                    <h4 class="common_color"><b>Referral Code</b></h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-2 d-flex align-items-center justify-content-center">
                                        <div>
                                            <input class="form-check-input login_term_checkbox" type="checkbox"
                                                name='loginCheckBox' id="loginCheckBox" onclick="checkTermCondition();" />
                                            <label class="form-check-label login_label">
                                                By Continuing, you agree to Rajshree<br>
                                                <span class="term_condition">
                                                    Lottery's <a href="#" style='text-decoration:underline' onclick='loadTermOfUseComp();' >Term of Use.</a> and
                                                    <a href="#" style='text-decoration:underline' onclick='loadPrivacyPolicyComp();' >Privacy Policy.</a>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class='col-12 mt-3 mb-3'>
                                        <div class='row'>
                                            <div class='col-1'></div>
                                            <div class='col-10'>
                                                <button type='button' id="login_submit" class="login_submit_button login-anim-btn login-common-button--greip login-common-red-button login-radious-submit" onclick="loginButton()"><span>Submit</span></button>
                                            </div>
                                            <div class='col-1'></div>
                                        </div>
                                    </div>
                                    <div class='col-12 text-center'>
                                        <h4 class="common_color"><b>or Login Using</b></h4>
                                    </div>
                                    <div class='col-12 mt-2 mb-2'>
                                        <div class='row'>
                                            <div class='col-1'></div>
                                            <div class='col-10' id='parent-bmr-google-signin'>
                                                <div id='bmr-google-signin'> </div>
                                            </div>
                                            <div class='col-1'></div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class='row'>
                                            <div class='col-1'></div>
                                            <div class='col-10 '>
                                                <div style="padding:0px;text-align: center; width: 100%;" onclick="loginFb();">
                                                    <a class="btn btn-md btn btn-light" href="#" role="button" style="width: 100%;
                                                    min-width: min-content; background-color: #f5f6f7;border-radius: 20px;border: 1px solid #dcdee2;"><img
                                                            src="app.static/img/fb-icon4.jpg" style="background-color: transparent;
                                                            height: 26px;border-radius: 50%;float: left;" alt="Facebook">
                                                    <span style="flex-grow: 1;font-family: "Google Sans", arial, sans-serif;
                                                    font-weight: 500;overflow: hidden;text-overflow: ellipsis;vertical-align: top;"> Log in with Facebook</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class='col-1'></div>
                                        </div>
                                    </div>
                                </div>
                                <div class='row mt-4'>&nbsp;</div>
                            </div>
                            <div class='col-3'></div>
                        </div>
                        </div>
                    </div>
                <div class='col-1'></div>
            </div>
            </div>
        <div class='col-2'></div>
        </div>`;
    $("#loginDataDiv").html(str);
    $("#login_signup_input_number").focus();
    if (storeEmail_Mobile.length > 0 && storeEmail_Mobile != "") {
        $("#login_signup_input_number").val(storeEmail_Mobile);
    }
}

function loginButton() {
    var emailMobileCondition = true;
    var mobile_email = $("#login_signup_input_number").val().trim();
    //    console.log("emailReg.test(mobile_email)",emailReg.test(mobile_email)," mobile_email ",mobile_email);
    if (mobile_email.length == 0 || mobile_email.length < 6) {
        successErrorAlert("error", "", "Please enter valid email or mobile no.");
        $("#login_signup_input_number").focus();
        return false;
    }
    if (regMob.test(mobile_email)) {
        if (mobile_email.length != 10) {
            successErrorAlert("error", "", "Please enter valid mobile number.");
            $("#login_signup_input_number").focus();
            return false;
        } else {
            emailMobileCondition = true;
        }
    } else if (!emailReg.test(mobile_email)) {
        successErrorAlert("error", "", "Please enter valid email id.");
        $("#login_signup_input_number").focus();
        return false;
    } else {
        if (!emailDomainCheck(mobile_email)) {
            successErrorAlert("error", "", "Please enter valid email id.");
            $("#login_signup_input_number").focus();
            emailMobileCondition = false;
            return false;
        } else {
            emailMobileCondition = true;
        }
    }
    if (termCondition == false) {
        successErrorAlert("error", "", "Please select term & condition");
        return false;
    }
    if (emailMobileCondition == true && termCondition == true) {
        loginCommonFunction();
    }
}
function loginCommonFunction() {
    username = $('#login_signup_input_number').val().trim();
    requestId = '';
    var loginParam = {
        'username': username
    };
    storeEmail_Mobile = username;
    loadData('REGISTERUSER', 'REQ001', 'REGISTERUSER_VERYFYUSER', loginParam, 'COMMON').then(responseArr => {
        // console.log(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            actionOtp = responseArr.isregisterted.toLowerCase();
            if (responseArr.isregisterted.toUpperCase() == "YES") {
                commonLoop = mpinDivLoop;
                MpinDiv(storeEmail_Mobile);
            } else {
                loginUsingOtp('no');
            }
        } else {
            successErrorAlert("error", "", "Please enter valid details");
        }
    });
}

function MpinDiv(storeEmail_Mobile) {
    var stringLoginName = consverdString(storeEmail_Mobile);
    let str = `<div class='row'>
            <div class='col-3'></div>
            <div class='col-6' style='background-color:#ffff;'>

<div class='row mt-5'>
        <div class="col-12 text-center">
            <h5 class="Verifyotp_h5_text">
                <b>Hey! ${stringLoginName}</b>
            </h5>
        </div>
    </div>
    <div class='row'>
        <div class="col-4"></div>
        <div class="col-4 text-center mt-2">
            <img src="./app.static/img/login_images/login_mpin.png" class="img-fluid Verifyotp_verify_img">
        </div>
        <div class="col-4"></div>
    </div>
    <div class="row mt-3">
        <div class="col-12 text-center">
            <h3 class="Verifyotp_h3_text h3_text_label"><b>Login using MPIN</b></h3>
        </div>
        <div class='col-12 text-center mt-2'>
            <h5 class="Verifyotp_h3_text">
                <b>Enter MPIN to proceed for login</b>
            </h5>
        </div>
    </div> 
    
    <div class='row'>
        <div class='col-2'></div>
        <div class='col-8'>
            ${cirucleDiv('mpin_')}
            ${buttonS('login_submit', 'Submit', 'mpin_')}
        </div>
        <div class='col-2'></div>
    </div>
    <div class='row mt-1' >
        <div class="col-1"></div>
        <div class="col-5 text-center">
            <div class='row'>
                <div class='col-3'></div>
                <div class='col-9'>
                    <h5 class="Verifyotp_h3_text" onclick="loginUsingOtp('yes');">
                        <b>Login using OTP</b>
                    </h5>
                </div>
                <div class='col-2'></div>
            </div>
        </div>
        <div class="col-1"></div>
        <div class="col-4">
            <h5 class="Verifyotp_h3_text Verifyotp_common_color" onclick="forgetMpin('yes');">
                <b>Forgot MPIN?</b>
            </h5>
        </div>
        <div class="col-1"></div>
    </div>
            </div>
            <div class='col-3'></div>
        </div>`;
    $("#loginDataDiv").html('');
    $("#loginDataDiv").html(str);
    $("#mpin_1").focus();
    enableDisabled(0);
}

function cirucleDiv(id) {
    let str = `<div class="row mt-2 mb-4">
    <div class="col-${id == "mpin_" ? 2 : 1} text-center"></div>`;
    for (let i = 1; i <= commonLoop; i++) {
        str = str + `<div class="col-2 text-center">
            <input 
                type=${id == "mpin_" ? "password" : "text"} class="form-control verify_otp_input verify_mpin_input" required maxlength="1"  id="${id + i}" onkeypress="return KeyPressHandler('NUM', event, '')"
                oninput="return RegularExpHandler('NUM',this.id,'')" pattern="[0-9]*" inputmode="numeric"
                onkeyup="changefocus('${id}','${i}');"
            >
        </div>`
    }
    str = str + `<div class="col-${id == "mpin_" ? 2 : 1}">
    </div></div>`;
    return str;
}
function buttonS(id, label, key) {
    let str = `<div class="row mt-3 mb-2">
        <div class="col-1"></div>
        <div class="col-10"> 
            <button class="login_verify_button  login-anim-btn login-common-button--greip login-common-red-button login-radious-submit" id=${id} onclick="buttonLoginEvent('${key}','${label}');"><span>${label}</span></button>
        </div>
        <div class="col-1"></div>
    </div>`;
    return str;
}

function setBorderColor(key) {
    var storeIndex = [];
    $(".verify_mpin_input").removeClass("border_warning");
    for (let i = 1; i <= commonLoop; i++) {
        if ($("#" + key + i).val() == "") {
            storeIndex.push(i);
            $("#" + key + i).addClass("border_warning");
        }
    }
    if (storeIndex.length > 0) {
        $("#" + key + storeIndex[0]).focus();
        return false;
    }
    return true
}

function changefocus(key, index) {
    if ($("#" + key + index).val() != "") {
        var getIndexvalue = parseInt(index) + 1;
        if (getIndexvalue > commonLoop) {
            $(".login_verify_button").prop("disabled", false);
            $(".login_verify_button").focus();
        } else {
            $("#" + key + getIndexvalue).focus();
        }
        $("#" + key + index).keyup(function (e) {
            if (e.keyCode == 8) {
                var tempIndex = parseInt(index) - 1;
                $("#" + key + tempIndex).focus();
            }
        });
    }
    var storeIndex = [];
    for (let i = 1; i <= commonLoop; i++) {
        if ($("#" + key + i).val() != "") {
            storeIndex.push(i);
            $("#" + key + i).removeClass("border_warning");
        }
    }
    enableDisabled(storeIndex.length);
}
function enableDisabled(count) {
    if (count == commonLoop) {
        $(".login_verify_button").prop("disabled", false);
        $(".login_verify_button").removeClass("disabled_color");
    } else {
        $(".login_verify_button").prop("disabled", true);
        $(".login_verify_button").addClass("disabled_color");
    }
}
function resetAllVariables() {
    storeEmail_Mobile = "";
    requestId = "";
    actionOtp = "";
    termCondition = true;
    otpDivLoop = 5;
    mpinDivLoop = 4;
    commonLoop = 0;
    forgetMpinSet = "";
    setMpinArray = {
        "setmpin_": {
            "_1": "", "_2": "",
            "_3": "", "_4": ""
        },
        "conformmpin_": {
            "_1": "", "_2": "",
            "_3": "", "_4": ""
        }
    };
    isEmail = false;
    emailStore = "";
    googleSignUp = false;
    googleSignUpParams = {};
    fBSignUp = false;
    fbSignUpParams = {};
    checkTermCondition();
}

function consverdString(storeEmail_Mobile) {
    let stringLogin = String(storeEmail_Mobile)
    let sliced = stringLogin.slice(-4);
    let stringLoginName = String(sliced).padStart(stringLogin.length, "X")
    return stringLoginName;
}
/**************Start Verify otp and mpin**** *********/
async function buttonLoginEvent(key, action) {
    if (!setBorderColor(key)) {
        return false;
    }
    if (!validateLoginIn(storeEmail_Mobile)) {
        loadLoginData();
        resetAllVariables();
        return false;
    }
    var otpPin = "";
    for (let i = 1; i <= commonLoop; i++) {
        otpPin = otpPin + $("#" + key + i).val();
    }
    // console.log(otpPin);
    if (otpPin == "" && otpPin.length != commonLoop) {
        successErrorAlert("error", "", "Please enter valid otp or mpin");
        //        swal.fire("Please enter valid otp or mpin");
        return false
    }
    if (action.toLowerCase() == "submit") {
        var loginSigninParam = {
            "username": storeEmail_Mobile.trim(),
            "key": md5(otpPin)
        };
        mpinAPICALL(loginSigninParam, "REGISTERUSER_VERIFYMPIN");
    } else {
        captureClicks('6', '', '');
        var request_type = "SIGNIN";
        if (actionOtp.toLowerCase() == "no") {
            request_type = "SIGNUP";
        }

        var loginSigninParam = {};
        if (googleSignUp == true) {
            loginSigninParam = googleSignUpParams;
        }

        if (fBSignUp == true) {
            loginSigninParam = fbSignUpParams;
        }

        loginSigninParam['username'] = storeEmail_Mobile.trim();
        loginSigninParam['otp'] = md5(otpPin);
        loginSigninParam['request_type'] = request_type;
        loginSigninParam['requestid'] = requestId;

        if (actionOtp.toLowerCase() == "no") {
	    loginSigninParam["geoLocationAdrs"] = await getLocationUser();
            loginSigninParam['utmcode'] = utm_provider_string;
            if (forgetMpinSet == "") {
                //                promptLocation().then(locationResponse => {
                //                    loginSigninParam["geoLocationAdrs"] = {"locationstate": locationResponse.principalSubdivisionCode, "locstate": locationResponse.principalSubdivision, "locality": "", "city": locationResponse.city}
                //                });
            }
            forgetMpinSet = "forget_mpin";
            if (isEmail == true) {
                loginSigninParam['email'] = emailStore;
            }
        }
        console.log(loginSigninParam);
        loadData('REGISTERUSER', 'REQ001', 'REGISTERUSER_VERIFYOTP', loginSigninParam, 'COMMON').then(responseArr => {
            console.log(responseArr);
            if (responseArr.status.toUpperCase() == "SUCCESS") {
                if (responseArr.hasOwnProperty("is_new_user") && responseArr['is_new_user'] == "0") {
                    // commonLoop = mpinDivLoop;
                    // MpinDiv(storeEmail_Mobile);
                    signInGoogleSuccess(responseArr);
                    return;
                }
                if (forgetMpinSet.toLowerCase() == "forget_mpin") {
                    if (responseArr.hasOwnProperty("is-email") && responseArr['is-email'] == "1") {
                        isEmail = true;
                        forgetMpinSet = "";
                        loadMobileUIData(actionOtp);
                        return true;
                    }
                    setMpinDiv(responseArr);
                    if (actionOtp.toLowerCase() == "no") {
                        // setSigunUpdata(responseArr, responseArr.custcode, responseArr.mobileno);
                        setSigunUpdata(responseArr);
                    }
                } else {
                    setLoginUserData(responseArr);
                    resetAllVariables();
                }
            } else {
                successErrorAlert("error", "", responseArr.message);
                //                swal.fire(responseArr.message);
                return false;
            }
        });
    }
}
/**************End Verify otp and mpin**** *********/
/******Signup Mobile Verification  */
function loadMobileUIData(action) {
    actionOtp = action;
    str = `<div class='row'>
                    <div class='col-3'></div>
                    <div class='col-6' style='background-color:#ffff;'>
                    <div class='row mt-3 pt-5'>
    <div class='col-12 text-center mt-5'>
        <h3 class="common_color">Verify Mobile No.</h3>
    </div>
    <div class='col-12 text-center mt-3'>
        <div class='row'>
            <div class='col-4'></div>
            <div class="col-4 text-center mt-2">
                <img src="./app.static/img/login_images/forgot_mobile_otp.png" class="img-fluid Verifyotp_verify_img">
            </div>
            <div class='col-4'></div>
        </div>
    </div>
    <div class='col-12 text-center mt-3 mb-5'>
        <div class="row mt-3 pt-2 mb-4">
            <div class='col-3'></div>
            <div class='col-6'>
                <input type='text' class="form-control login_input_number"
                    placeholder="Enter your mobile number" id="login_signup_mobile_number"
                    onkeypress="return KeyPressHandler('NUM', event, '')" required
                    autoComplete="off" maxLength="10" value=""
                    oninput="return RegularExpHandler('NUM',this.id,'')" />
            </div>
            <div class=' col-3'>
            </div>
        </div>
        <div class='row mt-2'>
            <div class='col-3'></div>
            <div class='col-6'>
                <button type='button' id="login_submit" class="login_submit_button login-anim-btn login-common-button--greip login-common-red-button login-radious-submit"
                    onclick="mobileSignUpButton('${actionOtp}')"><span>Submit</span></button>
            </div>
            <div class='col-3'></div>
        </div>
    </div>
</div>
</div>
<div class='col-3'></div>
</div>`;
    $("#loginDataDiv").html(str);
    $("#login_signup_mobile_number").focus();
}

var isEmail = false;
var emailStore = "";
function mobileSignUpButton(actionOtp) {
    if (actionOtp != "no") {
        successErrorAlert("error", "", "Please reverify email id");
        return false;
    }
    var mobileNumber = $("#login_signup_mobile_number").val().trim();
    if (mobileNumber.length != 10) {
        successErrorAlert("error", "", "Please enter valid mobile no.");
        return false;
    }
    if (!regMob.test(mobileNumber)) {
        successErrorAlert("error", "", "Invalid Mobile Number");
        return false;
    }
    emailStore = storeEmail_Mobile;
    storeEmail_Mobile = mobileNumber;
    loginUsingOtp(actionOtp);
}
/******Signup Mobile Verification  */

function componentFunctiont(pathName, lotcode, drawdate, path) {
    if (pathName != "" && lotcode != "" && drawdate != "") {
        $("#overlay, #navbarNav").hide();
        if (pathName == "lottery") {
            getLotteryData(lotcode, drawdate);
        } else {
            loadComponent(pathName, "REQ002");
        }
    } else {
        if (pathName != "") {
            $("#overlay, #navbarNav").hide();
            loadComponent(pathName, "REQ002");
        }
    }
}


function onGoogleSignIn(response) {
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    var params = {
        "gid": responsePayload.sub,
        "type": "google",
        "email": responsePayload.email
    };

    loadData('REGISTERUSER', 'REQ001', 'CHECK_SOCIAL_MEDIA_USER', params, 'COMMON').then(responseArr => {
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            signInGoogleSuccess(responseArr);
        } else {
            storeEmail_Mobile = responsePayload.email;
            isEmail = true
            googleSignUp = true;
            googleSignUpParams = {
                "gid": responsePayload.sub,
                "type": "google",
                "firstname": responsePayload.given_name + " " + responsePayload.family_name,
                "lastname": responsePayload.family_name,
                "gender": "",
                "gmail": responsePayload.email,
                "image": responsePayload.picture,
                "imagename": "google_image",
                "image_type": "PROFILE",
            };
            loadMobileUIData('no');
        }
    });
}

function signInGoogleSuccess(responseArr) {
    SetLoginCookie(responseArr);
    getProfilePhoto(responseArr);
    user = JSON.parse(getCookie("rluser"));
    updateWalletBalance();
    if (getCookie("token") === '1') {
        getTokenFunction(messagingFcm);
    }
    $("#loginName").text(responseArr.username);

    $("#menu-item-wallet").show();
    $("#menu-item-cart").css('margin-left', '0px');
    $("#my_profileimg_div").show();
    $("#my_profileimg").show();
    $("#menu-item-login-div").hide();
    $("#myProfile, #myWallet, #myOrders-opt, #logout-opt, #invoice-opt, #myAddBalace").show();
    let proFileImages = getCookie("profile_images");
    if (proFileImages != "null" && proFileImages != "" && proFileImages != undefined) {
        $(".hemburger_photo").attr('src', proFileImages);
    }
    $("#rupees").text(mrpSymbol + "" + user.wallet_balance);
    redirectComponent();
    //    loadComponent("home", "REQ002");
}

function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

function emailDomainCheck(mobile_email) {
    let parts = mobile_email.split('@');
    if (parts.length === 2) {
        let domainPart = parts[1];
        let dotIndex = domainPart.indexOf('.');
        let lastDotIndex = domainPart.lastIndexOf('.');
        if (dotIndex !== -1 && dotIndex === lastDotIndex && dotIndex !== 0 && dotIndex !== domainPart.length - 1) {
            if (!/\d/.test(domainPart)) {
                return true;
            }
        }
    }
    return false;
}

function refrelDiv() {
    refrelCode = '';
    let str = `
    <div class='row'>
        <div class='col-2'></div>
        <div class='col-8' style='background-color:#ffff;'>
            <div class='row'>
                <div class='col-3'></div>
                <div class='col-6'>
                    <div class="row mt-3 mb-5">
                        <div class='col-1'></div>
                        <div class="col-10 text-center mt-5">
                            <div class="card bg-body-tertiary Login_card_radious">
                                <div class="row mt-2 mb-1">
                                    <div class='col-12 text-center'>
                                        <h3 class="common_color"><b>Name</b></h3>
                                    </div>    
                                </div>
                                <div class="row mt-2 mb-1">
                                    <div class='col-12 text-center'>
                                        <h4 class="common_color"><b>Referral Code</b></h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class='col-2'></div>
                                    <div class='col-8'>
                                        <div class='row mt-3 mb-2'>
                                            <input type='text' class="form-control login_input_number"
                                                placeholder="Enter your Refrel Code" id="refrel_code_signup"
                                                onkeypress="return KeyPressHandler('ALPHANUM', event, '')" required
                                                autoComplete="off" maxLength="20" value=""
                                                oninput="return RegularExpHandler('ALPHANUM',this.id,'')" />
                                        </div>
                                        <div class='row mt-3 mb-2'>
                                            <button type='button' id="login_refrel_submit" class="login_submit_button login-anim-btn login-common-button--greip login-common-red-button login-radious-submit"
                                            onclick="mobileRefrelButton('refrel')"><span>Submit</span></button>
                                        </div>
                                        <div class='row mt-3 mb-3'>
                                            <button type='button' id="login_refrel_skip" class="skip_verify_button login-anim-btn login-common-button--greip login-common-red-button login-radious-submit"
                                            onclick="mobileRefrelButton('skip')">Skip</button>
                                        </div>
                                    </div>
                                    <div class=' col-2'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-1'></div>    
                    </div>
                </div>
                <div class='col-3'></div>
            </div>
        </div>
        <div class='col-2'></div>
    </div>`;
    if ($("#login_signup_input_number").val() != "") {
        storeEmail_Mobile = $("#login_signup_input_number").val().trim();
    }
    $("#loginDataDiv").html(str);
    $("#refrel_code_signup").focus();
}

var refrelCode = '';
function mobileRefrelButton(action) {
    if (action.toLowerCase() == 'refrel') {
        refrelCode = $("#refrel_code_signup").val().trim();
        if (refrelCode == "") {
            successErrorAlert("error", "", "Please enter refrel code");
            return false;
        }
    }
    loadLoginData();
}

function getProfilePhoto(param) {
    console.log(param);
    var param = {
        'action': 'GETIMAGE', 'type': 'customer',
        'image_type': 'PROFILE', 'custcode': param.custcode
    };
    console.log(param);
    loadData('account', 'REQ001', 'PROFILE', param, 'COMMON').then(responseArr => {
        console.log(responseArr);
        $('.hemburger_photo').attr("src", "app.static/img/images/myprofile.png");
        if (responseArr.status.toUpperCase() == 'SUCCESS') {
            if (responseArr['data'].image != "") {
                $('.hemburger_photo').attr("src", responseArr['data'].image);
                setCookie("profile_images", responseArr['data'].image);
            }
        }
    });
}

async function getLocationUser() {
    return {"locationstate":"MAHARASHTRA","locstate":"IN-MH","locality": "MUMBAI", "city":"MUMBAI"};
    var gla_obj_Userlocation = "";
    var param = "";
    await promptLocation().then(locationResponse => {
        gla_obj_Userlocation = {"locationstate": locationResponse.principalSubdivisionCode, "locstate": locationResponse.principalSubdivision, "locality": "", "city": locationResponse.city};
    });
    console.log(gla_obj_Userlocation);
    return gla_obj_Userlocation;

}

