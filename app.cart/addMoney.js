var paymentGatewayId = "";
var paidBalanceAmt = 0;
function loadPaymentGateway() {
    let myData = {
        "ysnActive": "1",
        "agentcode": user.custcode,
        "action": "activepaymentgateway"
    };
    loadData('addmoney', 'REQ001', 'ACTIVE_PAYMENT_GATEWAY', myData, 'COMMON').then(responseArr => {
        var res = responseArr;
        console.log("loadPaymentGateway response : " + JSON.stringify(responseArr));
        if (res['status'].toUpperCase() == 'SUCCESS') {
            if (res['data'].length > 0) {
                var paymentGatewayData = res['data'];
                var paymentId = '';
                for (let i = 0; i < paymentGatewayData.length; i++) {
                    let shortName = paymentGatewayData[i].shortname.toLowerCase();
                    if (i == 0) {
                        paymentId = shortName;
                    }
                }
                paymentGatewayId = paymentId;
            } else {
                successErrorAlert("error", "", "No any payment gateway found");
                loadComponent("home", "REQ002");
            }
        } else {
            successErrorAlert("error", "", res.message);
            loadComponent("home", "REQ002");
        }
    });
}

var rechargeAmt = 0;
function addmoneybuttons() {
    var balance = parseInt(user.wallet_balance);
    var cartAmount = totalAddBalance;
    let diff = cartAmount - balance;
    diff = (diff <= 0 || diff == null || diff == undefined) ? 50 : diff;
    paidBalanceAmt = diff;
    var str = `<div class="col-3 col-sm-2 col-md-3 balance-div">
    <button id="insufficientbtn" class="insufficientbtn-class"  onclick="toggleSelectedClass(this);updateRechargeAmount(${diff});updateValue();" style='cursor:pointer;'>
        <sup style="top: 0.0em !important;left: 3px;">
            <span style="font-size: 11px;">&#x20B9</span>
        </sup>
        <span style="font-size: 13px;font-weight: bold;position: relative;bottom: 2px;">${(diff <= 0 || diff == null || diff == undefined) ? 50 : diff}</span>
    </button>
</div>`;
    if (diff < 100) {
        den = 100;
        // diff = (parseInt(diff.toString()[0]) + 1) * den;
    } else if (diff > 100 & diff < 500) {
        den = 500;
        // diff = (parseInt(diff.toString()[0]) + 1) * den;
    } else if (diff > 500 & diff < 1000) {
        den = 1000;
    } else {
        den = ((parseInt(diff.toString()[0])) + 1) * Math.pow(10, diff.toString().length - 1);
    }

    for (let i = 0; i < 3; i++) {
        diff = den * (i + 1);
        str = str + `<div class="col-3 col-sm-2 col-md-3 balance-div">
        <button class="insufficientbtn-class" onclick="toggleSelectedClass(this);updateRechargeAmount(${diff});updateValue();" style='cursor:pointer;'>
            <sup style="top: 0.0em !important;left: 3px;">
                <span style="font-size: 11px;">&#x20B9</span>
            </sup>
            <span style="font-size: 13px;font-weight: bold;position: relative;bottom: 2px;">${diff}</span>
        </button>
    </div>`;
    }
    $("#bottombarmoney").text(0);
    $("#addmoneySelection").html(str);
    $("#insufficientbtn").trigger("click");
    $("#add_balance_text").html(`<b><span style='font-size:14px;'>${mrpSymbol}</span>${paidBalanceAmt}</b>`);
}

function toggleSelectedClass(elem) {
    $("#addmoneySelection button").removeClass("pickedAmt");
    if (elem)
        $(elem).addClass("pickedAmt");
}
function updateRechargeAmount(rechargeAmount) {
    if (isNaN(parseInt(rechargeAmount)))
        rechargeAmount = 0;
    $("#bottombarmoney").text(rechargeAmount);
    rechargeAmt = rechargeAmount;
}
function updateValue() {
    $("#desiredAmount").val('');
}
function validateAmtIP(elem) {
    let val = elem.value;
    if (val.toString().match(/^-{0,1}\d+$/) == null || isNaN(parseInt(val)) || parseInt(val) == 0) {
        elem.value = '';
        return false;
    }
    if (parseInt(val) > 10000) {
        successErrorAlert("error", "", "maximum recharge limit is 10,000");
        elem.value = 10000;
    }
}

function validateRecharge() {
    var paymentOption = paymentGatewayId;
    var payMethod = paymentOption + "payment";
    var balance = parseInt(user.wallet_balance);
    var cartAmount = totalAddBalance;
    let bucket = cartAmount;
    let diff = cartAmount - balance;
    if (bucket != undefined && bucket != "undefined" && !directAddMoney)
        diff = cartAmount - balance;
    if (rechargeAmt < paidBalanceAmt) {
        successErrorAlert("error", "", `Please select at least Rs. ${paidBalanceAmt} to add money`);
        return false;
    }
    if (diff <= 0) {
        successErrorAlert("error", "", `please select at least Rs. ${(diff <= 0) ? 1 : diff} to add money`);
        return false;
    } else {
        directAddMoney = false;
        payToAddMoney(payMethod);
    }
}

function payToAddMoney(payMethod) {
    let payphone = user.mobileno;
    let payUserName = user.username;
    var userData = getCookie('rluser');
    userData = JSON.parse(userData);
    var phone = '';
    var cartAmount = totalAddBalance;
    if (payphone == undefined || payphone == "undefined" || payphone == "") {
        phone = userData.mobileno;
    } else {
        phone = payphone;
    }
    var firstname = '';
    if (payUserName == undefined || payUserName == "undefined" || payUserName == "") {
        if (userData.hasOwnProperty("username")) {
            firstname = userData.username.trim();
        } else {
            firstname = ""
        }
    } else {
        firstname = payUserName.trim();
    }
    if (firstname.trim() == '') {
        firstname = 'Default User';
    }
    let amount = rechargeAmt;
    let requestParams = {};
    console.log(payMethod);
    if (payMethod == "payupayment" || payMethod == "cashfreepayment" || payMethod == "paytmpayment" || payMethod == "nimbblpayment") {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        requestParams["phone"] = phone;
        requestParams["amount"] = amount;
        requestParams["orderdate"] = today;
        requestParams["couponcode"] = "";
        requestParams["firstname"] = firstname;
        requestParams["email"] = (userData.email ? userData.email : '');
        requestParams["custcode"] = userData.custcode;
        requestParams["platform"] = appType;
        coupon_code = "";
    }
    var component = {
        "addressid": "",
        "orderid": "",
        "type": "customer",
        "buyer": user.custcode,
        "mobile": user.mobileno,
        "email": user.email,
        "transactionmode": payMethod == "payupayment" ? 'PAYU' : 'NIMBEL',
        "totalsalemrp": parseInt(cartAmount),
        "directaddmoney": 'false'
    };
    if (payMethod == "nimbblpayment") {
        payMethod = "nimbelpayment";
    }
    promptLocation().then(locationResponse => {
        // gla_obj = {"locationstate": locationResponse.principalSubdivisionCode, "locstate": locationResponse.principalSubdivision, "locality": "", "city": locationResponse.city};
   gla_obj = {"locationstate": "IN-MH", "locstate": "MAHARASHTRA", "locality": "", "city": "Mumbai"};
        var locationParam = {
            // "glocation": {"locationstate": locationResponse.principalSubdivisionCode, "locstate": locationResponse.principalSubdivision, "locality": "", "city": locationResponse.city},
            "glocation": {"locationstate": "IN-MH", "locstate": "MAHARASHTRA", "locality": "", "city": "Mumbai"}
        };
        loadData("myprofile", "REQ001", "LOCATION_STATUS", locationParam, "COMMON").then((responseArr) => {
            if (responseArr.hasOwnProperty("status") && responseArr["status"].toUpperCase() == "SUCCESS") {
                requestParams["component"] = component;
                setCookie('totalSaleMRP', parseInt(cartAmount));
                window.location = "redirector.php?data=" + JSON.stringify(requestParams) + "&actionevent=" + payMethod + "&actiontype=PAYMENT";
            } else {
                if (responseArr.message.toUpperCase() == "ADD BALANCE IS NOT ALLOWED IN YOUR STATE") {
//                    loadComponent("locationerror", "REQ002");
                    successErrorAlert("error", "", responseArr.message);
                } else {
                    successErrorAlert("error", "", responseArr.message);
                }
                return false;
            }
        });
    });

}
