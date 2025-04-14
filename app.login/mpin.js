function setMpinDiv(responseArr) {
    commonLoop = mpinDivLoop;
    // console.log(responseArr);
    let str = `<div class='row'>
                    <div class='col-3'></div>
                    <div class='col-6' style='background-color:#ffff;'>
                        <div class='row mt-5'>
                            <div class="col-1"></div>
                            <div class="col-10 text-center">
                                ${actionOtp == "no" ?
            '<h5 class="Verifyotp_h5_text">Why wait for OTP? when you<br>can login with MPIN</h5>' :
            '<h3 class="Verifyotp_h3_text mpin_text">Set MPIN for Login</h3>'
        }
                            </div>
                            <div class="col-1"></div>
                        </div>
                        <div class='row mt-2'>
                        ${actionOtp == "no" ?
            '<div class="col-12 text-center"><h3 class="Verifyotp_h3_text mpin_text">Set MPIN for Login</h3></div>' :
            '<div class="col-4"></div><div class="col-4 text-center mt-2"><img src="./app.static/img/login_images/set_mpin.png" class="img-fluid Verifyotp_verify_img"></div><div class="col-4"></div>'
        }
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <h5 class="Verifyotp_h4_text">Enter Your MPIN</h5>
                            </div>
                        </div> 
                        <div class='row'>
                            <div class='col-2'></div>
                            <div class='col-8'>
                                ${cirucleMpinDiv('setmpin_')}
                            <div class="row mt-1 mb-2">
                                <div class="col-12 text-center">
                                    <h5 class="Verifyotp_h4_text">Confirm MPIN</h5>
                                </div>
                            </div>
                        ${cirucleMpinDiv('conformmpin_')}
                        ${buttonSetMpin('setmpin', (actionOtp == "no" ? 'Submit' : 'Verify'), 'setmpin_')}
                        ${buttonSetMpin('setskipmpin', 'Skip', 'skipmpin_')}
                            </div>    
                            <div class='col-2'></div>
                        </div>
                    </div>
                    <div class='col-3'></div>
                </div>`;
    $("#loginDataDiv").html('');
    $("#loginDataDiv").html(str);
    $("#setmpin_1").focus();
    enableDisabled(0);
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
}

function cirucleMpinDiv(id) {
    let str = `<div class="row mt-2 mb-2">
    <div class="col-2 text-center"></div>`;
    for (let i = 1; i <= commonLoop; i++) {
        str = str + `<div class="col-2 text-center">
            <input
                type="password" class="form-control verify_otp_input verify_mpin_input" required maxlength="1"  id="${id + i}" onkeypress="return KeyPressHandler('NUM', event, '')"
                oninput="return RegularExpHandler('NUM',this.id,'')" pattern="[0-9]*" inputmode="numeric"
                onkeyup="changeMpinfocus('${id}','${i}');"
            >
        </div>`
    }
    str = str + `<div class="col-2">
    </div></div>`;
    return str;
}

function buttonSetMpin(id, label, key) {
    // <button class="${label.toLowerCase() == "skip" ? 'skip_verify_button' : 'login_verify_button'}  login-anim-btn login-common-button--greip login-common-red-button login-radious-submit" id=${id} onclick="buttonMpinEvent('${key}','${label}');">${label}</button>

    let str = `<div class="row ${label.toLowerCase() == "skip" ? 'mt-2' : 'mt-4'}">
        <div class="col-1"></div>
        <div class="col-10">
            <button class="${label.toLowerCase() == "skip" ? 'skip_verify_button login-common-grey-button' : 'login_verify_button login-common-red-button'} login-anim-btn login-common-button--greip  login-radious-submit" id=${id} onclick="buttonMpinEvent('${key}','${label}');"><span>${label}</span></button>
        </div>
        <div class="col-1"></div>
    </div>`;
    return str;
}


function changeMpinfocus(key, index) {
    var storeIndex = [];
    enableDisabled(0);
    if ($("#" + key + index).val() != "") {
        var getIndexvalue = parseInt(index) + 1;
        if (getIndexvalue > commonLoop) {
            $(".login_verify_button").prop("disabled", false);
            $(".login_verify_button").focus();
        } else {
            $("#" + key + getIndexvalue).focus();
        }
        setMpinArray[key]["_" + index] = $("#" + key + index).val();
        // $("#" + key + index).val("*");
    } else {
        setMpinArray[key]["_" + index] = $("#" + key + index).val();
    }
    for (let i = 1; i <= commonLoop; i++) {
        if ($("#" + key + i).val() != "") {
            storeIndex.push(i);
            $("#" + key + i).removeClass("border_warning");
        }
    }
    if (storeIndex.length == commonLoop && key.toLowerCase() == "setmpin_") {
        $("#conformmpin_1").focus();
    }
    if (storeIndex.length == commonLoop && key.toLowerCase() == "conformmpin_") {
        enableDisabled(storeIndex.length);
    }
}

function buttonMpinEvent(key, action) {
    if (action.toLowerCase() == "skip") {
        if (actionOtp.toLowerCase() == "no") {
            showCongratulationDiv();
            //            setTimeout(function () {
            //                redirectComponent();
            //            }, 500);
        } else {
            redirectComponent();
            //            loadComponent("home", "REQ002");
        }
        return true;
    }
    if (!setBorderColor("setmpin_")) {
        return false;
    }
    if (!setBorderColor("conformmpin_")) {
        return false;
    }
    var setMpinString = "";
    var conformMpinString = "";
    for (let i = 1; i <= commonLoop; i++) {
        if (setMpinArray["setmpin_"]["_" + i] != "" && setMpinArray["conformmpin_"]["_" + i] != "") {
            setMpinString = setMpinString + "" + setMpinArray["setmpin_"]["_" + i];
            conformMpinString = conformMpinString + "" + setMpinArray["conformmpin_"]["_" + i];
        }
    }
    if (setMpinString.length == commonLoop && conformMpinString.length == commonLoop &&
        setMpinString.length == conformMpinString.length && setMpinString == conformMpinString) {
        var loginSigninParam = {
            "username": storeEmail_Mobile.trim(),
            "key": md5(setMpinString),
        };
        var MPIN_API_KEY = "REGISTERUSER_CREATEMPIN";
        if (forgetMpinSet.toLowerCase() == "forget_mpin" && actionOtp.toLowerCase() == "yes") {
            MPIN_API_KEY = "REGISTERUSER_UPDATEMPIN"
        }
        mpinAPICALL(loginSigninParam, MPIN_API_KEY);
    } else {
        successErrorAlert("error", "", "MPIN & Comform MPIN is not same");
    }
}

function mpinAPICALL(loginSigninParam, MPIN_API_KEY) {
    // console.log(loginSigninParam);
    // console.log(MPIN_API_KEY);
    loadData('REGISTERUSER', 'REQ001', MPIN_API_KEY, loginSigninParam, 'COMMON').then(responseArr => {
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            if (forgetMpinSet.toLowerCase() == "forget_mpin" && actionOtp.toLowerCase() == "yes") {
                successErrorAlert(responseArr.status, "", responseArr.message);
                loadComponent("login", "REQ002");
            } else {
                if (forgetMpinSet.toLowerCase() == "forget_mpin" && actionOtp.toLowerCase() == "no") {
                    showCongratulationDiv();
                    //                    setTimeout(() => {
                    //                        redirectComponent();
                    //                    }, 500);
                } else {
                    setLoginUserData(responseArr);
                }
            }
        } else {
            successErrorAlert("error", "", responseArr.message);
            //            swal.fire(responseArr.message);
            return false;
        }
    });
}

var timeCounter = 4;
function showCongratulationDiv() {
    //    let str = `
    //    <div class='row'>
    //                    <div class='col-3'></div>
    //                    <div class='col-6' style='background-color:#ffff;'>
    //                        <div class='row mt-5'>
    //                            <div class="col-1"></div>
    //                            <div class="col-10 mt-5">
    //                                <div class='row'>
    //                                    <div class='col-12 text-center'>
    //                                        <h3 class="Verifyotp_h4_text">Congratulations!</h3>
    //                                    </div>
    //                                </div>
    //                                <div class='row'>
    //                                    <div class='col-12 text-center'>
    //                                        <h5 class="Verifyotp_h3_text">We have verified your Phone Number</h5>
    //                                    </div>
    //                                </div>
    //                                <div class='row set-margin-bottom'>
    //                                    <div class='col-4'></div>
    //                                    <div class='col-4'>
    //                                        <img src="./app.static/img/login_images/congratulations_mobile.gif"
    //                                        class="img-fluid">
    //                                    </div>
    //                                    <div class='col-4'></div>
    //                                </div>
    //                            </div>
    //                            <div class="col-1"></div>
    //                        </div>
    //                        <div class='row'>&nbsp;</div>
    //                    </div>
    //            <div class='col-3'></div>
    //    </div>`;
    let str = `<div style="text-align:center;padding:20px;">
        <h1 style='text-align: center; font-weight: bold;margin-top: 11px;'>Thank you showing interest in Rajshree Lottery!</h1>
        <h3 style="text-align: center;font-weight: normal;margin: auto;margin-top: 20px;width: 75%;margin-bottom: 22px;padding:20px;">Participate in our weekly and monthly draws and stand a chance to win amazing prizes. Check results and become a part of the winning community today! </h3>
        <H2 style='text-align: center; font-weight: bold;margin-bottom: 22px;'>This page will redirect in <span id="timer"></span>s.</H2>
        </div>`;
    window.history.pushState({ "html": "", "pageTitle": "login" }, "", "ThankYou");
    countDown()
    $("#loginDataDiv").html('');
    $("#loginDataDiv").html(str);
    return true;
}
function countDown() {
    if (timeCounter >= 0) {
        $("#timer").text(timeCounter--);
        setTimeout("countDown()", 3000);
    } else {
        redirectComponent();
    }
}

function setSigunUpdata(responseArr) {
    $("#myProfile, #myWallet, #myOrders-opt,#subscription-opt,#logout-opt").show();
    if (getCookie("token") === '1') {
        getTokenFunction(messagingFcm);
    }

    var getBalanceParam = {
        "action": "GET_BALANCE",
        "mobile": responseArr.mobileno,
        "custcode": responseArr.custcode,
    };
    console.log(getBalanceParam);
    loadData('REGISTERUSER', 'REQ001', 'GET_WALLET_BALANCE', getBalanceParam, 'COMMON').then(responseArrBalance => {
        console.log(responseArrBalance);
        if (responseArrBalance.status.toUpperCase() == "SUCCESS") {
            responseArr["wallet_balance"] = responseArrBalance["balance"];
            responseArr["promotional_amt"] = responseArrBalance["promotionalamt"] || 0;
            responseArr["pwt_amt"] = responseArrBalance["pwtamt"];
        } else {
            responseArr["wallet_balance"] = 0;
            responseArr["promotional_amt"] = 0;
            responseArr["pwt_amt"] = 0;
        }
        console.log(responseArr);
        $("#loginName").text(responseArr.username);
        SetLoginCookie(responseArr);
        getProfilePhoto(responseArr);
        var parentDiv = $("#menu-item-login-div").parent();
        $("#my_account_div").show();
        $("#my_account").show();
        $("#menu-item-login-div").hide();
        $("#rupees").text(mrpSymbol + "" + responseArr.wallet_balance);
    });
}

function setLoginUserData(responseArr) {
    var getBalanceParam = {
        "action": "GET_BALANCE",
        "mobile": responseArr.mobileno,
        "custcode": responseArr.custcode,
    };
    console.log(getBalanceParam);
    loadData('REGISTERUSER', 'REQ001', 'GET_WALLET_BALANCE', getBalanceParam, 'COMMON').then(responseArrBalance => {
        console.log(responseArrBalance);
        if (responseArrBalance.status.toUpperCase() == "SUCCESS") {
            responseArr["wallet_balance"] = responseArrBalance["balance"];
            responseArr["promotional_amt"] = responseArrBalance["promotionalamt"] || 0;
            responseArr["pwt_amt"] = responseArrBalance["pwtamt"];
        } else {
            responseArr["wallet_balance"] = 0;
            responseArr["promotional_amt"] = 0;
            responseArr["pwt_amt"] = 0;
        }
        console.log(responseArr);
        $("#loginName").text(responseArr.username);
        SetLoginCookie(responseArr);
        getProfilePhoto(responseArr);
        var parentDiv = $("#menu-item-login-div").parent();
        $("#my_account_div").show();
        $("#my_account").show();
        $("#menu-item-login-div").hide();
        // $("#menu-item-login-div").remove(); // Remove the login div
        // $("#my_account_div").appendTo(parentDiv).show();
        // $("#my_account").show();

        $("#rupees").text(mrpSymbol + "" + responseArr.wallet_balance);
        redirectComponent();
    });
}

function redirectComponent() {
    if (getCookie("buy_button") != null && getCookie("buy_button") != undefined && getCookie("buy_button") != "" && getCookie("buy_button").toUpperCase() == "SAVE_BUY_BUTTON") {
        showCartCountData();
        user = getuserdata();
        if (user != null && user != undefined && user != "" && user.mobileno != "" && user.mobileno.length == 10 && $("#notification-batch").text() != "" && parseInt($("#notification-batch").text()) > 0) {
            delete_cookie("buy_button");
            loginProfileSection();
            loadComponent("cart", "REQ002");
        } else {
            loadComponent("home", "REQ002");
        }
    } else {
        loadComponent("home", "REQ002");
    }
}

function showCartCountData() {
    let totalCartCount = 0;
    if (getCookie("setView") != null && getCookie("setCart") != null && getCookie("setView") != "" && getCookie("setCart") != "") {
        let lotteryArr = JSON.parse(getCookie("setCart"));
        let view = getCookie("setView");
        for (let rowIndex in lotteryArr) {
            let lotteryData = lotteryArr[rowIndex];
            if (view == "0") {
                for (let dateIndex in lotteryData['selected_drawdate_cart']) {
                    for (let index in lotteryData['selected_drawdate_cart'][dateIndex]) {
                        if (lotteryData['selected_drawdate_cart'][dateIndex][index]["selected_qty"] > 0) {
                            var date2 = beautify(dateIndex + " " + lotteryData["drawtime"], 'y-m-d h:m:s', '24');
                            var days = getDaysDiff(date2);
                            if (days >= 0) {
                                totalCartCount = totalCartCount + parseInt(lotteryData['selected_drawdate_cart'][dateIndex][index]["selected_qty"]);
                            }
                        }
                    }
                }
            } else if (view == "1") {
                for (let date_index in lotteryData["selected_number_v2"]) {
                    var date2 = beautify(date_index + " " + lotteryData["drawtime"], 'y-m-d h:m:s', '24');
                    var days = getDaysDiff(date2);
                    console.log(days + "------------------");
                    if (days >= 0) {
                        let lotteryDateData = lotteryData["selected_number_v2"][date_index];
                        for (let pin in lotteryDateData) {
                            for (let ticketNo in lotteryDateData[pin]) {
                                totalCartCount = totalCartCount + parseInt(lotteryDateData[pin][ticketNo]["qty"]);
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(totalCartCount + "--------------");
    $("#heading_cart_total").text(totalCartCount);
    $("#notification-batch").text(totalCartCount);
    if (totalCartCount < 1) {
        deleteLotteryData();
    }
}
