var addreshArr = [];
function getUserAddresh(id) {
    param = {
        custcode: user.custcode
    };
    delete_cookie("userAddresh");
    var lot = {};
    loadData("address", "REQ001", "GET_ADDRESS", param, "COMMON").then(responseArr => {
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            $("#top_add_header").text("Saved Address");
            $.each(responseArr.address, function (key, value) {
                lot[value.id] = value;
                if (value["type"] != "P") {
                    getAddreshId = value.id;
                    addreshCondition = false;
                }
            });
            addressDataArr = lot;
            makeAddComp(addressDataArr);
            setCookie('virtualticket', 'false');
            if (OBJ.hasOwnProperty("direct_sale") && OBJ["direct_sale"] == "true") {
                playNowButton();
            }
        } else {
            setCookie('virtualticket', 'true');
        }
    });
}

function makeAddComp(makeAddData) {
    str = ``;
    addressStr = "";
    addDefaultId = "";
    console.log(makeAddData);
    var checkAddreshCondition = true;
    $.each(makeAddData, function (keyId, Addvalue) {
        let addStr = Addvalue.username + ", " + Addvalue.address + ", " + Addvalue.city + ", " + Addvalue.district + ", " + Addvalue.userstate + " - " + Addvalue.pincode;
        if (Addvalue.type == "P") {
            addDefaultId = keyId;
            updateAddress(Addvalue.type, keyId, addStr, Addvalue);
            checkAddreshCondition = false;
        }

        str += `<div class="mb-4" id="${" Add-container" + keyId}" onclick='return updateAddress("${Addvalue.type}",${keyId},"${addStr}",${JSON.stringify(Addvalue)});'>
            <div class="addrs-aadhaar-rel">
            <div class="row">
                <div class="col-2">
                    <div class="all-radio-btn">
                        <label><input id="${"user_select_addresh" + keyId}"  type="radio" name="select_address" class="select-address common_addreshs_class" value="updateSelectedAddress" ${Addvalue.type == "P" ? `checked` : `` }></label>
                    </div>
                </div>
                <div class="col-10">
                    <p class="mt-3 mb-0 add-name add-name-addresh-p">${Addvalue.username}</p>
                    <p class="m-0 add-name-addresh-p">${Addvalue.address + ", " + Addvalue.city + ", " + Addvalue.district}</p>
                    <p class="m-0 add-name-addresh-p">${Addvalue.userstate + ", " + Addvalue.pincode}</p>
                    <p class="m-0 add-name-addresh-p">Phone Number:- ${Addvalue.altmob}</p>
                </div>
            </div>
        </div></div>`;
    });

    $("#modify_add_container").html(str);
    $("#modify_add_container").css({"display": "none"});
    if (checkAddreshCondition == true) {
        for (let keyId in makeAddData) {
            let Addvalue = makeAddData[keyId];
            addDefaultId = keyId;
            let addStr = Addvalue.username + ", " + Addvalue.address + ", " + Addvalue.city + ", " + Addvalue.district + ", " + Addvalue.userstate + " - " + Addvalue.pincode;
            updateAddress(Addvalue.type, keyId, addStr, Addvalue);
            $("#user_select_addresh" + keyId).prop("checked", true);
            break;
        }
    }
}

function updateAddress(addType, keyId, addStr, AddArray) {
    $(".common_addreshs_class").prop("checked", false);
    $("#user_select_addresh" + keyId).prop("checked", true);
    $("#user_address").text(addStr);
    setCookie("userAddresh", JSON.stringify(AddArray));

    $('#modify_add_container_row').collapse('hide');
    if (addType != "P") {
        chkAddress(keyId);
    }
}

function chkAddress(keyid) {
    param = {
        custcode: user.custcode,
        addressid: keyid
    };
    loadData("address", "REQ001", "SET_PRIMARY_ADDRESS", param, "COMMON").then(responseArr => {
        console.log(responseArr);
    });
}

function getCourierCharge() {
    if (globalCartSubTotalAmount > 0) {
        let param = {
            "qty": globalCartSubTotalAmount,
            "buyer": user == null ? "" : user.custcode,
            "type": "customer",
            "action": "GET_RATE"
        }
        loadData("courier_charges", "REQ001", "GET_C_CHARGE", param, "COMMON").then(responseArr => {
            // console.log(responseArr);
            if (responseArr.status.toUpperCase() == "SUCCESS") {
                deliveryCharges = parseInt(responseArr.rate);
            }
            if (deliveryCharges == 0) {
                $("#shipingFreeMessage").show();
            } else {
                $("#shipingFreeMessage").hide();
            }
            totalAddBalance = deliveryCharges + globalCartSubTotalAmount;
            if (user != null) {
                showTotalBalance();
            }
        });
    }
}

var saletUserAddresh = "";
var userSaleLocation = "";

function playNowButton() {
    if (user == null) {
        let parram = {
            page_name: "cart"
        };
        loadComponent("login", "REQ002", parram);
        return false
    }
    if ($("#cart_subtotalAmount_").text() == "" || parseInt($("#cart_subtotalAmount_").text()) < 1 || globalCartSubTotalAmount == 0) {
        successErrorAlert("error", "", "Please select at least 1 qty");
        return false;
    }
    if (!courier_keep_button) {
        if (getCookie("userAddresh") == null || getCookie("userAddresh") == "") {
            successErrorAlert("error", "", "First Add Your Shipping Address, Then Proceed to Payment!");
            loadComponent("account", "REQ002", "modifyAdd");
            return false;
        }
    }
    if (OBJ.hasOwnProperty("direct_sale") && OBJ["direct_sale"] == "true") {
        if (totalAddBalance > user.wallet_balance) {
            OBJ["direct_sale"] = "false";
            return;
        }
    }
    if (totalAddBalance > user.wallet_balance) {
        directAddMoney = false;
        validateRecharge();
        return true;
    }
    if (getCookie("userAddresh") != "") {
        saletUserAddresh = JSON.parse(getCookie("userAddresh"));
    }
    promptLocation().then(locationResponse => {
        // gla_obj = {"locationstate": locationResponse.principalSubdivisionCode, "locstate": locationResponse.principalSubdivision, "locality": "", "city": locationResponse.city};
        // userSaleLocation = {"locationstate": locationResponse.principalSubdivisionCode, "locstate": locationResponse.principalSubdivision, "locality": "", "city": locationResponse.city};
        userSaleLocation = {"locationstate": "IN-MH", "locstate": "MAHARASHTRA", "locality": "", "city": "Mumbai"};
        globalLotteryArr = JSON.parse(getCookie("setCart"));
        if (globalLotteryArr[0]["view"] == 0) {
            firstScreenSale();
        } else {
            secondScreenSale();
        }
    });
}


function showCartCount() {
    let lotteryArr = JSON.parse(getCookie("setCart"));
    let totalCartCount = 0;
    for (let rowIndex in lotteryArr) {
        let lotteryData = lotteryArr[rowIndex];
        if (view == "0") {
            for (let dateIndex in lotteryData['selected_drawdate_cart']) {
                for (let index in lotteryData['selected_drawdate_cart'][dateIndex]) {
                    if (lotteryData['selected_drawdate_cart'][dateIndex][index]["selected_qty"] > 0) {
                        totalCartCount = totalCartCount + parseInt(lotteryData['selected_drawdate_cart'][dateIndex][index]["selected_qty"]);
                    }
                }
            }
        }
    }
    $("#heading_cart_total").text(totalCartCount);
    $("#notification-batch").text(totalCartCount);
}
