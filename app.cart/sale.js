var timeCounter = 4; // The delay in seconds before redirecting.

function firstScreenSale() {
    var ticketData = [];
    var _count = 0;
    var ticketCondition = false;
    _count = 0;
    // console.log("globalLotteryArr", globalLotteryArr);

    for (let rowIndex in globalLotteryArr) {
        for (let dateIndex in globalLotteryArr[rowIndex]["selected_drawdate_cart"]) {
            let lotteryData = globalLotteryArr[rowIndex]["selected_drawdate_cart"][dateIndex]
            let ticketArr = [];
            let ticket_count = 0;
            for (let ticketIndex in lotteryData) {
                if (lotteryData[ticketIndex]["selected_qty"] > 0) {
                    ticketArr[ticket_count] = {
                        "qty": lotteryData[ticketIndex]["selected_qty"],
                        "book": lotteryData[ticketIndex]["series_qty"]
                    };
                    ticket_count++;
                    ticketCondition = true;
                }
            }
            if (ticketCondition == true) {
                ticketData[_count] = {
                    "drawdate": dateIndex,
                    "lotcode": globalLotteryArr[rowIndex]["lotcode"],
                    "lotteryid": globalLotteryArr[rowIndex]["id"],
                    "lotteryname": globalLotteryArr[rowIndex]["displayname"],
                    "ticketmrp": globalLotteryArr[rowIndex]["mrp"],
                    "freq": globalLotteryArr[rowIndex]["freq"],
                    "tickets": ticketArr
                };
                _count++;
                ticketCondition = false
            }
        }
    }
    commonSale(ticketData);
}

function secondScreenSale() {
    var ticketData = [];
    var _count = 0;
    var ticketCondition = false;
    for (let rowIndex in globalLotteryArr) {
        for (let dateIndex in globalLotteryArr[rowIndex]["selected_number_v2"]) {
            let lotteryDataDate = globalLotteryArr[rowIndex]["selected_number_v2"][dateIndex];
            console.log("lotteryDataDate ", lotteryDataDate);

            let ticketArr = [];
            let ticket_count = 0;
            for (let pinIndex in lotteryDataDate) {
                let lotteryData = lotteryDataDate[pinIndex];
                for (let ticketIndex in lotteryData) {
                    ticketArr[ticket_count] = {
                        "ticketno": lotteryData[ticketIndex]["ticketno"],
                        "qty": lotteryData[ticketIndex]["qty"],
                        "book": lotteryData[ticketIndex]["book"],
                        "series": lotteryData[ticketIndex]["series"],
                        "seriesupto": lotteryData[ticketIndex]["seriesupto"],
                        "numfrom": lotteryData[ticketIndex]["numfrom"],
                        "numto": lotteryData[ticketIndex]["numto"]
                    };
                    ticket_count++;
                    ticketCondition = true;
                }
            }
            if (ticketCondition == true) {
                ticketData[_count] = {
                    "drawdate": dateIndex,
                    "lotcode": globalLotteryArr[rowIndex]["lotcode"],
                    "lotteryid": globalLotteryArr[rowIndex]["id"],
                    "lotteryname": globalLotteryArr[rowIndex]["displayname"],
                    "ticketmrp": globalLotteryArr[rowIndex]["mrp"],
                    "freq": globalLotteryArr[rowIndex]["freq"],
                    "tickets": ticketArr
                };
                _count++;
                ticketCondition = false
            }
        }
    }
    //    console.log(ticketData);
    commonSale(ticketData);
}

function commonSale(ticketData) {
    var virtualTicket = "Y";
    var addreshId = "";
    var username = "";
    if (!courier_keep_button) {
        virtualTicket = "N";
        addreshId = saletUserAddresh["id"];
    }
    if (user.username == null || user.username == "") {
        if (saletUserAddresh == null || saletUserAddresh == undefined || saletUserAddresh == "" || !saletUserAddresh.hasOwnProperty("username")) {
            username = "";
        } else {
            username = saletUserAddresh.username;
        }
    } else {
        username = user.username;
    }
    let ticketParam = {
        "mobile": user.mobileno,
        "requestplatform": appType,
        "email": user.email,
        "username": username,
        "buyer": user.custcode,
        "addressid": addreshId,
        "totalamt": globalCartSubTotalAmount,
        "virtualticket": virtualTicket,
        "remark": (view == "0" ? globalLotteryArr[0]["remark"] : ""),
        "glocation": userSaleLocation,
        "data": ticketData,
        "type": "customer",
        "courier_charges": deliveryCharges
    };
    // let add_to_car = {
    //     currency: "INR",
    //     value: globalCartSubTotalAmount,
    //     items: ticketData.flatMap(ticket => 
    //         ticket.tickets.map(singleTicket => ({
    //             item_id: ticket.lotcode,
    //             item_name: ticket.lotteryname,
    //             item_category: ticket.freq,
    //             price: ticket.ticketmrp,
    //             quantity: singleTicket.qty 
    //         }))
    //     )
    // };
    
    // console.log("add-to-cart", add_to_car);
    showLoader();
    loadData("SALE", "REQ001", "SALE_V2", ticketParam, "COMMON").then(responseArr => {
        hideLoader();
        if (responseArr.hasOwnProperty("status") && responseArr.status.toUpperCase() == "SUCCESS") {
            gtag("event", "add_to_cart", {
                currency: "INR",
                value: globalCartSubTotalAmount,
                items: ticketData.flatMap(ticket => 
                    ticket.tickets.map(singleTicket => ({
                    item_id: ticket.lotcode,
                    item_name: ticket.lotteryname,
                    item_category: ticket.freq,
                    price: ticket.ticketmrp,
                    quantity: singleTicket.qty
                    }))
                )
            });
            showCongratulation(responseArr, username, globalCartSubTotalAmount);
        } else {
            successErrorAlert("error", "Message", responseArr.message);
            OBJ["direct_sale"] = false;
        }
    });
}

function showCongratulation(responseArr, username, globalCartSubTotalAmount) {
    //    successErrorAlert("success", "Message", "Your ordered is Confirmed!");
    $("#cogratulation_div").show();
    let str = `<div class="main_wrap_cart_congratulation" style="text-align: center;">
                <h2 id="congrax-congratulation">Congratulations!</h2>
                <div id="cust-name-congratulation">Hey! ${username}</div>
                <div id="order-status-congratulation">Your ordered is Confirmed! & your Order ID is <b>${responseArr["orderid"]}</b></div>
                <div>
                    <img id="congrax-img-icon-congratulation" src="./app.static/img/login_images/congratulations-cart.png" class="img-fluid" alt="" />
                </div>
                <button id="check-status-congratulation" class="btn" onclick="checkStatus()">Check Status</button>
            </div>`;

    // let str  = `<div style="text-align:center;">
    //     <h1 style='text-align: center; font-weight: bold;'>Thank you showing interest in Rajshree Lottery!</h1>
    //     <h3 style="text-align: center;font-weight: normal;margin: auto;margin-top: 20px;width: 75%;margin-bottom: 20px;">Participate in our weekly and monthly draws and stand a chance to win amazing prizes. Check results and become a part of the winning community today! </h3>
    //     <H2 style='text-align: center; font-weight: bold;'>This page will redirect in <span id="timer"></span>s.</H2>
    //     </div>`;

    $("#cogratulation_div").html(str);
    // countDown();
    delete_cookie('setCart');
    $("#notification-batch").text("0");
    $("#cart_details_div").html("");
    $("#main-div").css({
        "overflow-y": "hidden",
        "height": "inherit"
    });
    $(window).scrollTop(0);
    fbq('track', 'Purchase', {Content_type: "Product", currency: "INR", value: globalCartSubTotalAmount});
    globalCartSubTotalAmount = 0;
    updateWalletBalance();
    if (OBJ.hasOwnProperty("direct_sale")) {
        OBJ["direct_sale"] = "false";
    }
    delete_cookie("virtualticket");
}

function checkStatus() {
    let param = {
        "actionevent": "myorder",
        "accessFrom": "account"
    };
    loadComponent("account", "REQ002", param);
}

// function countDown() {
//     if (timeCounter >= 0) {
//         $("#timer").text(timeCounter--);
//         setTimeout("countDown()", 1000);
//     } else {
//         loadComponent("home", "REQ002");
//     }
// }
