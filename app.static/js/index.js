var screenSize = screen.width;
let options = {
    enableHighAccuracy: true,
    timeout: 7000,
    maximumAge: 0
};
var shortcut = false;
var gla_obj = {};
gla_obj = {"locationstate": "IN-MH", "locstate": "MAHARASHTRA", "locality": "", "city": "Mumbai"};
function getCoordinates() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function promptLocation() {
    const position = await getCoordinates().catch(e => {
        // showError(e)
    });
    try {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        return await getLocation(lat, lon);
    } catch (err) {
        if (position) {
            position = JSON.parse(position);
            if (position.status == 'SUCCESS') {
                let lat = position.latitude;
                let lon = position.longitude;
                return await getLocation(lat, lon);
            }
        }
    }

}

var dataAddressDescription = '';
async function getLocation(lat, lng) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    if (!response.ok) {
        swal.fire("Cant fetch location please try after some time");
        gla_obj = {};
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = response.json();
    return data;
}

function showError(error) {
    gla_obj = {};
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errormsg = "You denied the request for Geolocation.";
            swal.fire(errormsg + " " + brow);
            if (brow == "chrome") {
                $('#ifUserOnChrome').show();
                if (shortcut)
                    $('#ifUserOnChromeShortcut').show();
            } else if (brow == "safari")
                $('#ifUserOnSafari').show();
            else
                $('#ifUserOnChrome,#ifUserOnSafari,#ifUserOnChromeShortcut').hide();
            break;
        case error.POSITION_UNAVAILABLE:
            errormsg = "Location information is unavailable.";
            swal.fire(errormsg);
            break;
        case error.TIMEOUT:
            errormsg = "The request to get location timed out.";
            swal.fire(errormsg);
            break;
        case error.UNKNOWN_ERROR:
            errormsg = "An unknown error occurred.";
            swal.fire(errormsg);
            break;
    }
}

$(function () {
    var initialResultRequest = 0;
    $("#register-mobileno-close-btn").click(function () {
        $("#register-mobileno").hide();
    });

    $("#register-mobileno").hide();
    $('#ifUserOnChrome,#ifUserOnSafari,#ifUserOnChromeShortcut').hide();
    // $('#menu-item-home').css('color', '#ffc107');
    // $('#menu-item-home').css('text-decoration', 'underline');
    $("[id*=menu-item]").on('click', function () {
        $("[id*=menu-item]").css('color', 'black');
        $("[id*=menu-item]").css('text-decoration', 'unset');
        $(this).css('color', '#ad1b26');
//        $(this).css('text-decoration', 'underline');
    });

    user = getuserdata();
    loginProfileSection();

    $("body").click(function () {
        //        $("#account").hide();
    });

    $("#menuNavBar").on('click', function () {
        $("#navbarNav").show();
        $("#overlay").css("display", "block");
    });

    $("#result-div").click(function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("result", "REQ002");
    });
    $("#result-alert").click(function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("resultalert", "REQ002");
    });

    $("#govt_scheme").on('click', function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("govt_scheme", "REQ002")
    });

    $("#cart-opt").click(function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("cart", "REQ002");
    });

    $("#verify-ticket-opt").on('click', function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("pwt", "REQ002");

    });

    $("#winner-opt").on('click', function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("winner", "REQ002");
    });

    $("#chatbot").on('click', function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("chatbot", "REQ002");
    });

    $("#home-screen-load").on('click', function () {
        captureClicks('1', '', '');
        loadComponent("home", "REQ002");
    });
    $("#home-screen").on('click', function () {
        captureClicks('1', '', '');
        loadComponent("home", "REQ002");
    });

    $("#footer-item-faq").on('click', function () {
        loadComponent("faq", "REQ002");
    });

    $("#footer-item-aboutus").on('click', function () {
        loadComponent("aboutus", "REQ002")
    });

    $("#footer-item-contactus").on('click', function () {
        loadComponent("contactus", "REQ002")
    });

    $("#footer-item-privacy_policy").on('click', function () {
        loadComponent("privacypolicy", "REQ002")
    });
    $("#footer-item-term_of_use").on('click', function () {
        loadComponent("termofuse", "REQ002")
    });

    $("#logout-opt").on('click', function () {
        $("#myProfile, #myWallet, #myOrders, #logout-opt, #navbarNav, #overlay").hide();
        // $("#subscription-opt, #payout-opt").hide();
        var parentDiv = $("#my_profileimg_div").parent();
        $("#my_profileimg_div").remove();
        $("#menu-item-wallet").hide();
        // $("#my_account_div").parent();
        // $("#my_account_div").remove(); // Remove the login div
        $("#menu-item-login-div").appendTo(parentDiv).show();
        $("#menu-item-login").show();
        userLogout();
    });

    $("#myAddBalace").on('click', function () {
        $("#overlay, #navbarNav, .footer").hide();
        var param = {
            actionevent: 'home'
        };
        directAddMoney = true;
        loadComponent("addmoney", "REQ002", '', param);
    });

    $("#payout-opt").on('click', function () {
        $("#overlay, #navbarNav, .footer").hide();
        //        loadComponent("payout", "REQ002");
        loadComponent("withdrawal", "REQ002");
    });


    $("#menu-item-signin").on('click', function () {
        loadComponent("login", "REQ002");
    });
    $("#menu-item-signup").on('click', function () {
        loadComponent("login", "REQ002");
    });

    /*-------------------------------*Start*Reset Password*-----------------------------*/

    var get_requestId = '';
    showCartCount();
    loadComponent("home", "REQ002");
    $('#signup-mobile').focus();
    $("#login").on('click', function () {
        $('#signup-mobile').val("");
        $('#signup').attr("data-dismiss", "modal").click();
        $('#sign-in-mobile').focus();
    });
    $('#c-new-user').on('click', function () {
        $('#signup-mobile').focus();
        $('#sign-in').attr("data-dismiss", "modal").click();
    });
    $(".retailer_app").on('click', function () {
        loadComponent("retailer_app", "REQ002");
    });
    $("#menu-item-home").on('click', function () {
        loadComponent("home", "REQ002");
    });
    $("#menu-item-wallet").click(function () {
        if (user != null) {
            var param = {accessFrom: "wallet"};
            //loadComponent("wallet", "REQ002");
            loadComponent("account", "REQ002", "", param);
        } else {
            loadComponent("login", "REQ002");
        }
    });
    $("#menu-item-lottery").on('click', function () {
        loadComponent("lottery", "REQ002");
    });

    $("#menu-item-winners").on('click', function () {
        loadComponent("winner", "REQ002");
    });

    $("#menu-item-result").on('click', function () {
        loadComponent("result", "REQ002");
    });

    $("#menu-item-profile").on('click', function () {
        if (user != null) {
            param = {
                accounttype: 'myprofile'
            }
            loadComponent("myprofile", "REQ002", '', param);
        } else {
            loadComponent("login", "REQ002");
        }
    });

    $("#my_profileimg").click(function () {
        //$("#account").toggle();
        $("#overlay, #navbarNav, .footer").hide();
        // $("#footer").hide();
        loadComponent("account", "REQ002");
    });
    $("#my_wallet").click(function () {
        //$("#account").toggle();
        $("#overlay, #navbarNav, .footer").hide();
        // $("#footer").hide();
        loadComponent("wallet", "REQ002");
    });


    $("#MyCart").click(function () {
        //$("#account").toggle();
        $("#overlay, #navbarNav, .footer").hide();
        // $("#footer").hide();
        loadComponent("cart", "REQ002");
    });
    $("#myProfile").click(function () {
        //$("#account").toggle();
        $("#overlay, #navbarNav, .footer").hide();
        // $("#footer").hide();
        loadComponent("account", "REQ002");
    });

    $("#myLottery").click(function () {
        $("#overlay, #navbarNav, .footer").hide();
        // $("#footer").hide();
        loadComponent("lottery", "REQ002");
    })
    $("#invoice-opt").click(function () {
        $("#overlay, #navbarNav, .footer").hide();
        // $("#footer").hide();
        loadComponent("invoice", "REQ002");
    })
    $("#results").click(function () {
        loadComponent("result", "REQ002");
        $("#hemburgerfooterMenu").hide();
    })
    $("#subscription-opt").click(function () {
        $("#overlay, #navbarNav, .footer").hide();
        loadComponent("subscription", "REQ002");
    })
    $("#menu-item-cart").on('click', function () {
        //        $("#overlay, #navbarNav, .footer").hide();
        $("#overlay, #navbarNav, .footer").hide();
        if (user) {
            user = JSON.parse(getCookie('rluser'));
            param = {
                "type": "customer",
                "buyer": user.custcode,
                "action": "VIEW"
            }
            loadComponent("cart", "REQ002");
            // });
        } else {
            loadComponent("cart", "REQ002");
        }
    })
    // $("#menu-item-notification").on('click', function () {
    //     $("#overlay, #navbarNav, .footer").hide();
    //     loadComponent("notification", "REQ002")
    // })
});

function off() {
    $('#navbarNav').hide();
    $('#overlay').hide();
}

function results() {
    loadComponent("result", "REQ002");
}

function verifyPWTComponent() {
    loadComponent("pwt", "REQ002");
}
function getOrderStatus(statusVal) {
    var orderStatus = '';
    if (statusVal == 'D') {
        orderStatus = 'Delivered';
    } else if (statusVal == 'S') {
        orderStatus = 'Shipped';
    } else if (statusVal == 'C') {
        orderStatus = 'Ordered';
    } else if (statusVal == 'T') {
        orderStatus = 'Ticket Issued';
    } else if (statusVal == 'W') {
        orderStatus = 'On the way ';
    } else if (statusVal == 'O') {
        orderStatus = 'Out for delivery';
    }

    return orderStatus;
}

function resultViewDrapdownPanel(action, resultRequestNumber) {
    if (action == 'prev') {
        resultRequestNumber -= 5;
        if (resultRequestNumber < 0) {
            resultRequestNumber = 0;
        }
        initialResultRequest = resultRequestNumber;
    } else if (action == 'next') {
        resultRequestNumber += 5;
        initialResultRequest = resultRequestNumber;
    }
    params = {
        "brand": "PL",
        "state": "WB",
        "app": "PLWEB",
        "type": "customer",
        "sorttype": "PARTITION",
        "requestnumber": resultRequestNumber,
        "action": "TOP5RESULT"
    };
    loadData('home', 'REQ001', 'RESULT_LIST', params, 'COMMON').then(responseArr => {
        console.log(responseArr);
        str = ``;
        for (let i = 0; i < responseArr.data.length; i++) {

            var bgdColor = '';
            if (i % 3 == 0) {
                bgdColor = '#ffb612';
            } else if (i % 3 == 1) {
                bgdColor = '#0094b3';
            } else if (i % 3 == 2) {
                bgdColor = '#0055ff';
            }
            str += `<div class="col-xs-3 col-sm-3 col-md-3 result-pre-pad">
        <div class="card result-card-size" style='' onclick="loadComponent('result','REQ002','',{lotcode:${responseArr.data[i].lotcode}, drawdate:'${responseArr.data[i].drawdate}', action: 'lotteryWiseResult'})" >
        <img src="${responseArr.data[i].logo || "app.static/img/logo_default.png"}" style="height: 167px;width: 100%;">
        <div class="card-body-content" style="background-color: ${bgdColor} " >
        VIEW RESULTS
        </div>
        </div>
        </div>`
        }
        $('#result-carousel').html(str);
    });

    if (action == 'initial') {
        $("#result-panel").slideToggle("slow");
    }

    if (screenSize < '576') {
        $("#result-item-div").css("display", "none");
    }
}


function signInGoogleSuccess(responseArr) {
    $('#sign-in').attr("data-dismiss", "modal").click();
    SetLoginCookie(responseArr);
    if (getCookie("token") === '1') {
        getTokenFunction(messagingFcm);
    }
    $("#my_profileimg_div").show();
    $("#my_profileimg").show();
    $("#my_account").show();
    //$("#my_wallet").show();
    $("#menu-item-login").hide();
    Swal.fire({
        title: "User Logged In Successfully",
        timer: 3000
    });
}

function signUpGoogleSuccess(respons) {
    SetLoginCookie(respons);
    if (getCookie("token") === '1') {
        getTokenFunction(messagingFcm);
    }
    $("#my_profileimg_div").show();
    $("#my_profileimg").show();
    $("#my_account").show();
    $("#menu-item-login").hide();
    Swal.fire("User Registered Successfully");
}
var googleUser = {};
var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '524465893214-hsgngnuc9ncju16plrpi2c2a14ijkdu6.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('googleBtn'));
    });
};

function attachSignin(element) {
    // console.log(element.id);
    auth2.attachClickHandler(element, {},
            function (googleUser) {
                onSuccess(googleUser);
            }, function (error) {
        onFailure(error);
    });
}

function otpless(otplessUser) {
    var waName = otplessUser.waName;
    var waNumber = otplessUser.waNumber;
    console.log(waName, waNumber);
    let params = {"username": waNumber.replace(/\D/g, '').slice(-10)};
    loadData('REGISTERUSER', 'REQ001', 'WHATSAPPSIGNIN', params, 'COMMON').then(responseArr => {
        console.log("hello otpless", responseArr);
        //alert(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            get_requestId = '';
            username = '';
            if (responseArr.hasOwnProperty("custcode") && responseArr['custcode'] != '') {
                SetLoginCookie(responseArr);
                setSigunUpdata(responseArr, responseArr.custcode, responseArr.mobileno);
            } else {
                swal.fire("Invalid Custcode");
                return false;
            }
        } else {
            swal.fire(responseArr.message);
            return false;
        }
    });
}

function onSuccess(googleUser) {
    var googleUserResponse = googleUser.getBasicProfile();
    params = {
        "gid": googleUserResponse.getId(),
        "type": "google",
        "email": googleUserResponse.getEmail()
    };

    loadData('REGISTERUSER', 'REQ001', 'CHECK_SOCIAL_MEDIA_USER', params, 'COMMON').then(responseArr => {
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            signInGoogleSuccess(responseArr);
            $("#my_profileimg_div").show();
            $("#my_profileimg").show();
            $("#my_account").show();
            // $("#my_wallet").show();
            $("#menu-item-login").hide();
        } else {
            params = {
                "gid": googleUserResponse.getId(),
                "type": "google",
                "firstname": googleUserResponse.getGivenName() + " " + googleUserResponse.getFamilyName(),
                "lastname": "",
                "gender": "",
                "email": googleUserResponse.getEmail(),
                "mobile": $("#register-mobileno-input").val(),
                "image": googleUserResponse.getImageUrl(),
                "imagename": "google_image",
                "image_type": "PROFILE",
                'mobileno': googleUserResponse.getEmail(),
            };

            loadData('REGISTERUSER', 'REQ001', 'REGISTER_SOCIAL_MEDIA_USER', params, 'COMMON').then(respons => {
                if (respons.status.toUpperCase() == 'SUCCESS') {
                    signUpGoogleSuccess(respons);
                    $("#my_account").show();
                    // $("#my_wallet").show();
                    $("#my_profileimg_div").show();
                    $("#my_profileimg").show();
                    $("#menu-item-login").hide();
                } else if (respons.status.toUpperCase() == 'ERROR') {
                    Swal.fire(respons.message);
                    return false;
                } else {
                    Swal.fire(respons.message);
                    return false;
                }
            });
        }
    });
}


function onFailure(error) {
    console.log(error);
}


// Check if the console is open
const isConsoleOpened = () => {
    // This expression generates a side effect that may be detected by some developer tools
    console.log('Warning: Using the developer console may harm your security and privacy.');
    // Check if console.log has been overridden
    if (console.clear) {
	console.log('React Developer Console: Warning: Using the developer console may harm your security and privacy.');
        console.clear(); // Clear the warning message if console.clear is available
    }
};

// Call the function periodically to check if the console is open
//setInterval(isConsoleOpened, 1000);

function showCartCount() {
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

function deleteLotteryData() {
    delete_cookie("setCart");
    delete_cookie("setView");
    $("#notification-batch").text(0);
}

function getDaysDiff(date2) {
    var d1 = new Date();
    var d2 = new Date(date2);
    //                    console.log(d1 + "---" + d2);
    var interval = d2.getTime() - d1.getTime();
    var msecondsPerMinute = 1000 * 60;
    var msecondsPerHour = msecondsPerMinute * 60;
    var msecondsPerDay = msecondsPerHour * 24;
    var days = Math.floor(interval / msecondsPerDay);
    return days;
}
function loginProfileSection() {
    user = getuserdata();
    if (user) {
        if (user.hasOwnProperty("username")) {
            if (user.username != "undefined" && user.username != "null" && user.username.trim() != "") {
                $("#loginName").text(user.username);
            } else {
                $("#loginName").text('Name Surname');
            }
        } else {
            $("#loginName").text('Name Surname');
        }
        // $("#my_account").show();
        // $("#my_wallet").show();
        // $("#my_account_div").show();
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
        updateWalletBalance();
        user = getuserdata();
        $("#rupees").text(mrpSymbol + "" + user.wallet_balance);
    } else {
        $("#loginName").text('');
        // $("#my_account_div").hide();
        // $("#my_account").hide();
        $("#my_profileimg_div").hide();
        $("#my_profileimg").hide();
        $("#menu-item-wallet").hide();
        $("#menu-item-cart").css('margin-left', '110px');
        $("#menu-item-login-div").show();
        $("#menu-item-login").show();
        // var parentDiv = $("#my_account_div").parent();
        // $("#my_account_div").remove(); // Remove the login div
        // $("#menu-item-login-div").appendTo(parentDiv).show();
    }
}

/************************Open Model*******************/

function showModal() {
    $("#switch-modal").addClass('switch-modal_height_width');
    $("#switch-modal-div").addClass('switch-active');
    $("#openModal").addClass('switch-hidden');
}

function hideModal() {
    $("#switch-modal").removeClass('switch-modal_height_width');
    $("#switch-modal-div").removeClass('switch-active');
    setTimeout(() => {
        $("#openModal").removeClass('switch-hidden');
    }, 20);
}




function openModal() {
    showModal();
//    setTimeout(hideModal, 10000);
}

window.onclick = function (event) {
    const modal = document.getElementById('switch-modal');
    if (event.target == modal) {
        hideModal();
    }
}

function closedModel() {
    hideModal();
}

function tryNow() {
    window.open("https://stage.bookmyrajshree.com/");
}
window.onload = function () {
    showModal();
//    setTimeout(hideModal, 10000);
}
