
server = 'Routes.php';
couriesrRadioButton = true;
var loadLotcode = '';
var lotteryDrawdate = '';
var msgCount = 0;
var hist = [];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var directAddMoney = true;
hh = today.getHours()
ii = today.getMinutes()
ss = today.getSeconds();

today = mm + '/' + dd + '/' + yyyy;
currentDateTime = yyyy + '-' + mm + '-' + dd + " " + hh + ":" + ii + ":" + ss;
// var currentDateTime = "2019-12-18 02:00:00";
var interval = "";
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var cart = (getCookie("rlcart") == "" || getCookie("rlcart") == null || getCookie("rlcart") == undefined) ? [] : JSON.parse(getCookie("rlcart"));
var buynow = (getCookie("rlbuynowcart") == "" || getCookie("rlbuynowcart") == null || getCookie("rlbuynowcart") == undefined) ? [] : JSON.parse(getCookie("rlbuynowcart"));
function beautify(dt, format, tf) {

    if (!dt) {
        return "";
    }

    dt = dt.replace(/\s+/g, 'T')
    dt = dt + '.000+05:30';
    let day = new Date(dt);
    dt = dt.replace('T', ' ');
    dt = dt.substring(0, dt.length - 1)
    dt = dt.split(' ')
    d = dt[0].split('-')
    t = dt[1].split(':')
    let date = d[2]
    let month = d[1]
    let year = d[0]
    let hour = t[0]
    let min = t[1]
    let sec = t[2]
    format = format.split('');
    for (i in format) {
        switch (format[i]) {
            case 'd':
                format[i] = date;
                break
            case 'm':
                format[i] = month;
                break;
            case 'M':
                format[i] = monthNames[month - 1];
                break;
            case 'y':
                format[i] = year;
                break;
            case 'D':
                format[i] = dayNames[day.getDay()/*CalDayOfWeek(date,month,year)*/];
                break;
            case 'h':
                if (tf == '24') {
                    format[i] = hour;
                } else {
                    format[i] = (hour > 12) ? hour - 12 : hour;
                }
                break;
            case 'i':
                format[i] = min;
                break;//MINUTES
            case 's':
                format[i] = sec;
                break;//SECOND
            case 'a':
                if (hour >= 12) {
                    format[i] = 'PM';
                } else {
                    format[i] = 'AM';
                }
                break;
            case '3':
                format[i] = monthNames[month - 1].substring(0, 3);
                break;
        }
    }
    // console.log(format)
    let f = ''
    for (let i in format) {
        f += format[i]
    }
    // format=format.join('');
    return f;
}



function getuserdata() {
    if (getCookie('rluser') && getCookie('rluser') != "") {
        return JSON.parse(getCookie('rluser'));
    } else {
        return null;
    }
}
function showLoader() {
    $('#loaderdiv').show();

}
function hideLoader() {
    $('#loaderdiv').hide();
}

function loadData(component, actioncomponent, action, reqParam, actiontype) {
    data = {};
    data['actioncomponent'] = actioncomponent;
    data['componentname'] = component;
    data['actionevent'] = action
    data['actiontype'] = actiontype
    data['AuthToken'] = getCookie("AuthToken");
    data['requestplatform'] = appType;
    // showLoader()
    extend(data, reqParam);
    extend(data, gla_obj);
    console.log('api data', JSON.stringify(data));
    
    let promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: server,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (response) {
                //  hideLoader();
                response = JSON.parse(response);
                setCookie("AuthToken", response.authToken)
                resolve(response);
            },
            error: function (error) {
                //  hideLoader();
                response = JSON.parse(error);
                reject(error);
            }
        });
    });
    return promise;
}

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key))
            obj[key] = src[key];
    }
    return obj;
}

function loadComponent(component, actioncomponent, action, reqParam, actiontype, componentParentID = "#body", callback) {
    // Combine repeated jQuery selectors
    // console.log("component",component,"actioncomponent",actioncomponent,"action",action,"reqParam",reqParam,"actiontype",actiontype);
    
    $('#result-panel, #ifUserOnChrome, #ifUserOnSafari, #ifUserOnChromeShortcut').hide();

    var data = {
        'actioncomponent': actioncomponent,
        'componentname': component,
        'actionevent': action,
        'actiontype': actiontype,
        'AuthToken': getCookie("AuthToken"),
        'requestplatform': appType
    };

    // Show loader
    showLoader();

    // Extend data with request parameters and global objects
    extend(data, reqParam);
    extend(data, gla_obj);

    // Construct URL
    var url = server;

    // Construct fetch options
    var fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Perform fetch request
    fetch(url, fetchOptions)
            .then(response => {
                // Handle non-2xx status codes
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => {
                hideLoader();
                // Handle logout
                if (response.logout) {
                    //                    delete_cookie("kc_user");
                    delete_cookie("rluser");
                    //                    swal.fire("Session Expire");
                    successErrorAlert("error", "", "Session Expire");
                    loadComponent('login', 'REQ002');
                    return;
                }

                // Update AuthToken
                setCookie("AuthToken", response.authToken);

                // Handle error status
                if (response.status.toLowerCase() === "error") {
                    alert(response.message);
                    return;
                }

                // Update token
                if (response.token) {
                    token = response.token;
                }

                // Load body content
                if ("body" in response) {
                    $("#howtoplayvid").hide();
                    $("#homeiconn").attr('src', 'app.static/img/index/home-ticket-icon.png').show();
                    $(componentParentID).html(response.body);
                    $(componentParentID).scrollTop(0);
                    $("#body").scrollTop(0);

                    if (!hist.includes(component)) {
                        hist.push(component);
                    }

                    if ("footer" in response) {
                        $("#footer").html(response.footer);
                    }

                    // Push state to history
                    pushHistoryState(component);
                }
                if (OBJ.hasOwnProperty("componentname")) {
                    if (OBJ.componentname.toLowerCase() == "locationerror") {
                        //$("body").html('');
                        $("body").html(response.body);
                    }
                }

                // Execute callback function
                if (typeof callback === "function") {
                    callback();
                }
            })
            .catch(error => {
                hideLoader();
                console.error('There was a problem with the fetch operation:', error.message);
                // Handle fetch errors
            });
}

function pushHistoryState(component) {
    var pageTitle = component; // Define the page title based on the component
    if (component.toLowerCase() == "home") {
        pageTitle = "./";
    }
    if (component.toLowerCase() == "add-to-cart") {
        if (OBJ.hasOwnProperty("actionevent") && OBJ["actionevent"] != "" && OBJ["actionevent"].hasOwnProperty("data") && OBJ["actionevent"]["data"] != "") {
            if (OBJ["actionevent"]["data"].hasOwnProperty("displayname") && OBJ["actionevent"]["data"].displayname != "") {
                pageTitle = OBJ["actionevent"]["data"].displayname;
                pageTitle = (pageTitle.replaceAll(" ", "_")).toLowerCase();
            }
        }
    }
    if (utm_url_string != "") {
        window.history.pushState({"html": "", "pageTitle": component}, "", utm_url_string);
//        utm_url_string = "";
        pageStringData = "";
    } else if (pageStringData != "") {
        window.history.pushState({"html": "", "pageTitle": component}, "", pageStringData);
//        utm_url_string = "";
        pageStringData = "";
    } else {
        window.history.pushState({"html": "", "pageTitle": component}, "", pageTitle);
//        utm_url_string = "";
        pageStringData = "";
    }
}



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    delete_cookie(cname);
    localStorage.setItem(cname, cvalue);

}

function getCookie(cname) {
    let data = localStorage.getItem(cname);
    return data;

}

/*var delete_cookie = function (name) {
 localStorage.removeItem(name);
 };*/
function delete_cookie(name) {
    localStorage.removeItem(name);
}
;

function changeDateFormat(date) {
    var changedate = date.toString().split("/")
    var ddate = (changedate[2] + "-" + changedate[1] + "-" + changedate[0]);
    return ddate;
}

function SetLoginCookie(param) {
    data = {
        "mobileno": param.mobileno,
        "email": param.email,
        "custcode": param.custcode,
        "username": param.username,
        "mobile_verification": param.mobile_verification_status,
        "email_verification": param.email_verification_status,
        "wallet_balance": param.wallet_balance,
        "promotional_amt": param.promotional_amt,
        "pwt_amt": param.pwt_amt
    };
    setCookie("rluser", JSON.stringify(data));
    //   setCookie("rlprofile",JSON.stringify(data));
}

function showAlert(str) {
    $("#modal-body").html(str);
    $("#hot-trends-modal").modal("show");
}

function clearDBCart() {
    cart = []
    param = {
        "buyer": user.custcode,
        "action": "CLEARCART"
    }
    // delete_cookie("rlcart");
    // loadData('cart', 'REQ001', 'CART', param, 'COMMON').then(responseArr => {

    // });
}

function deleteDBCart(param) {
    // loadData('cart', 'REQ001', 'CART', param, 'COMMON').then(responseArr => {

    // });
}

function updateDBCart(param) {
    // loadData('cart', 'REQ001', 'CART', param, 'COMMON').then(responseArr => {

    // });
}

function addDBCart(param, ticket, addtype) {
    // loadData('cart', 'REQ001', 'CART', param, 'COMMON').then(responseArr => {
    //     if (Object.keys(ticket).length > 0) {
    //         ticket['cartid'] = responseArr['cartid'];
    //         addToCart(ticket, addtype);
    //     }
    //     // return responseArr['cartid'];
    // });
}

function setDBCart(param) {

    if (getCookie('rluser') && getCookie('rluser') != "") {
        user = JSON.parse(getCookie('rluser'));
        param = {
            "type": "customer",
            "buyer": user.custcode,
            "action": "VIEW"
        }
        // loadData('cart', 'REQ001', 'CART', param, 'COMMON').then(lotteryArr => {
        //     if (lotteryArr.status.toUpperCase() != 'ERROR') {
        //         cart = lotteryArr['data'];
        //     } else {
        //         cart = [];
        //     }
        //     // setCookie("rlcart", JSON.stringify(cart), 1);
        //     // $("#notification-batch").html(cart.length);
        // });

    }
}

function getCartId(drawdate, lotcode) {
    // for (let k = 0; k < cart.length; k++) {
    //     if (cart[k].lotcode == lotcode && cart[k].drawdate == drawdate) {
    //         return cart[k].cartid;
    //     }
    // }
}
function createHtmlAttribute(name, value) {
    var attribute = document.createAttribute(name)
    attribute.nodeValue = value
    return attribute
}
function postToURL(url, values, target) {
    values = values || {};
    var formElement = document.createElement("form")
    formElement.method = "POST"
    formElement.action = url
    if (target != null)
        formElement.target = target
    for (var property in values) {
        if (values.hasOwnProperty(property)) {
            var value1 = values[property];
            var inputElement = document.createElement("input");
            inputElement.setAttributeNode(createHtmlAttribute("type", "hidden"))
            inputElement.setAttributeNode(createHtmlAttribute("name", property))
            inputElement.setAttributeNode(createHtmlAttribute("value", value1))
            formElement.appendChild(inputElement)
        }
    }
    var body = document.getElementsByTagName("body")[0]
    body.appendChild(formElement)
    formElement.submit();
    body.removeChild(formElement);
}

function userLogout() {
    delete_cookie("rluser");
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
    $("#n, #overlay , .footer").show();
    $("#overlay").css({"display": "none"});
    $("#menu-item-login").show();
    $("#menu-item-wallet").hide();
    $("#menu-item-cart").css('margin-left', '110px');
    user = getuserdata();
    //    loadComponent('cart', 'REQ002');
    cart = [];
    $(".photo").attr('src', 'app.static/img/myprofile.png');
    $(".hemburger_photo").attr('src', 'app.static/img/images/myprofile.png');
    delete_cookie("rlcart");
    delete_cookie("profile_images");
    // $("#notification-batch").text("0");
    $("#my_account").hide();
    $("#my_account_div").hide();
    $("#my_profileimg_div").hide();
    $("#my_profileimg").hide();
    $("#loginName").text('Name Surname');
    $("#menu-item-login").show();
    $("#menu-item-login-div").show();
    loadComponent('home', 'REQ002');
    successErrorAlert("success", "Logout", "User Logged Out Successfully");
}

function userLogoutWithoutCart() {
    delete_cookie("rluser");
    $(".photo").attr('src', 'app.static/img/myprofile.png');
    $(".hemburger_photo").attr('src', 'app.static/img/images/myprofile.png');
    delete_cookie("profile_images");
    $("#n, #overlay , .footer").show();
    $("#overlay").css({"display": "none"});
    $("#menu-item-login").show();
    $("#menu-item-login-div").show();
    $("#my_account_div").hide();
    $("#my_account").hide();
    $("#my_profileimg_div").hide();
    $("#my_profileimg").hide();
    $("#menu-item-wallet").hide();
    $("#menu-item-cart").css('margin-left', '110px');
    $("#loginName").text('Name Surname');
    user = getuserdata();
    loadComponent("login", 'REQ002');
}

function formatPrize(prize) {
    var x = (Math.floor(prize)).toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

function getLotteryData(lotcode, drawdate) {
    loadLotcode = lotcode;
    lotteryDrawdate = drawdate;
    //alert("testing::" + lotcode + "::" + drawdate);
    let delayTime = 200;
    if (loadLotcode != '' && loadLotcode != null && loadLotcode != undefined && loadLotcode.length > 0) {
        setTimeout(() => {
            loadComponent("lottery", "REQ002");
        }, delayTime);
    }
}

function updateWalletBalance() {
    if (user != null && user != "") {
        var getBalanceParam = {
            "action": "GET_BALANCE",
            "mobile": user.mobileno,
            "custcode": user.custcode,
        };
        loadData('REGISTERUSER', 'REQ001', 'GET_WALLET_BALANCE', getBalanceParam, 'COMMON').then(responseArrBalance => {
            if (responseArrBalance.status.toUpperCase() == "SUCCESS") {
                let updateUserBalance = getuserdata();
                updateUserBalance["wallet_balance"] = responseArrBalance["balance"];
                updateUserBalance["promotional_amt"] = responseArrBalance["promotionalamt"] || 0;
                updateUserBalance["pwt_amt"] = responseArrBalance["pwtamt"];
                setCookie("rluser", JSON.stringify(updateUserBalance));
                $("#rupees").text(mrpSymbol + "" + updateUserBalance["wallet_balance"]);
            }
        });
    }
}

function successErrorAlert(msg, title, text) {
    let messagese = msg.toLowerCase();
    if (messagese == "" || messagese == null || messagese == undefined || messagese == "undefined") {
        messagese = "error";
    }
    Swal.fire({
        title: title,
        text: text,
        icon: messagese,
        showCloseButton: true,
        closeButtonColor: '#a21c1c',
        showConfirmButton: true,
        confirmButtonText: 'Close',
        confirmButtonColor: '#a21c1c',
        confirmButtonClass: 'swal_custom_button_class',
        customClass: {
            popup: 'swal2-popup custom-swal-popup-class'
        },
    });
}
