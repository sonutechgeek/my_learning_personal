user = getuserdata();
var totalcart = "";
var view = "";
var globalCartSubTotalAmount = 0;
var subtotalSeriesQty = 0;
var subTotalAmount = 0;
var ticketMrp = 0;
var deliveryCharges = 0;
var discountPromo = 0;
var courier_keep_button = true;
var globalLotteryArr = "";
var totalAddBalance = 0;
var rechargeMoney = false;
$(document).ready(function () {
  $("#cogratulation_div").hide();
  window.onclick = function (event) {
    if (event.target == "collapsed") {
      // modifyAddModal.style.display = "none";
      // modifyAddress.style.display = "none";
      $("#modify_add_container_row").collapse("hide");
    }
  };
  // var span_closed_icon = document.getElementsByClassName("modify-add-closes")[0];
  // span_closed_icon.onclick = function () {
  //     // modifyAddModal.style.display = "none";
  //     modifyAddress.style.display = "none";
  // }
  $(window).scrollTop(0);
});
getCartData();
function getCartData() {
  if (
    getCookie("setCart") != null &&
    getCookie("setCart") != "" &&
    getCookie("setView") != null &&
    getCookie("setView") != ""
  ) {
    totalcart = JSON.parse(getCookie("setCart"));
    view = getCookie("setView");
  }
  if (totalcart == null || totalcart == "undefined" || totalcart == "") {
    showEmptyCart();
  } else {
    delete_cookie("buy_button");
    if (
      user == null ||
      user == undefined ||
      user == "" ||
      !user.hasOwnProperty("mobileno") ||
      user.mobileno == "" ||
      user.mobileno.length != 10
    ) {
      setCookie("buy_button", "SAVE_BUY_BUTTON");
      loadComponent("login", "REQ002");
    }
    //        $("#heading_cart_total").html(totalcart.length);
    //        $("#notification-batch").html(totalcart.length);
    //        var view = totalcart[0]["view"];
    ticketMrp = totalcart[0]["mrp"];
    if (!OBJ.hasOwnProperty("direct_sale") || OBJ["direct_sale"] == "false") {
      delete_cookie("virtualticket");
    }
    if (view == "0") {
      if (totalcart[0]["selected_drawdate_v1"].length > 0) {
        modifyGameData();
        firstViewDataShow(view);
        showPlayOption();
        if (user != null && user.mobileno != "" && user.mobileno.length == 10) {
          discountPromo = user["promotional_amt"] || 0;
          showTotalWalletBalance();
          if (
            OBJ.hasOwnProperty("direct_sale") &&
            OBJ["direct_sale"] == "true"
          ) {
            setTimeout(() => {
              if (
                getCookie("virtualticket") != "null" &&
                getCookie("virtualticket") != undefined &&
                getCookie("virtualticket") == "false"
              ) {
                $("#courier_ticket").prop("checked", true);
                checkCourierButton("courier");
              } else {
                playNowButton();
              }
            }, 500);
          }
        } else {
          $("#shipingFreeMessage").hide();
        }
      } else {
        showEmptyCart();
      }
    } else if (view == "1") {
      globalLotteryArr = totalcart;
      secondViewDataShow();
      showPlayOption();
      if (user != null && user.mobileno != "" && user.mobileno.length == 10) {
        discountPromo = user["promotional_amt"] || 0;
        showTotalWalletBalance();
        if (OBJ.hasOwnProperty("direct_sale") && OBJ["direct_sale"] == "true") {
          setTimeout(() => {
            if (
              getCookie("virtualticket") != "null" &&
              getCookie("virtualticket") != undefined &&
              getCookie("virtualticket") == "false"
            ) {
              $("#courier_ticket").prop("checked", true);
              checkCourierButton("courier");
            } else {
              playNowButton();
            }
          }, 500);
        }
      } else {
        $("#shipingFreeMessage").hide();
      }
      if (globalCartSubTotalAmount <= 0) {
        showEmptyCart();
      }
    } else {
      showEmptyCart();
    }
  }
}

function showEmptyCart() {
  //    str = `<div class='row'><center style="width: 100%;padding:100px;"><h3 class='common_font_color'><b>Cart is Empty</b></h3></center></div>`;
  var str = `<div class='row'>
                    <div class='col-12 text-right' style="padding-top: 100px;padding-bottom: 100px;">
                        <h3 class='common_font_color' style="position: relative;left: 10%;"><b>Cart is Empty</b></h3>
                    </div>
                </div>`;
  $(".empty_cart_row").html(str);
  $("#heading_cart_total").text(0);
  $("#notification-batch").html(0);
  delete_cookie("setCart");
  $("#show_Cart_Lottery_Data_div").html("");
  $("#show_Cart_wallet_div").html("");
  $("#show_play_option").html("");
  $("#show_play_option_new").html("");
  $("#textMyCart").removeClass("text-center");
  $("#textMyCart").addClass("text-right");
  $("#empty_css").css({ position: "relative", left: "8%" });
}

function modifyGameData() {
  console.log(totalcart);
  for (let i = 0; i < totalcart.length; i++) {
    var tempTotalCart = totalcart[i];
    console.log(tempTotalCart);
    if (!tempTotalCart.hasOwnProperty("selected_drawdate_cart")) {
      tempTotalCart["selected_drawdate_cart"] = {};
      for (let key in tempTotalCart["selected_drawdate_v1"]) {
        tempTotalCart["selected_drawdate_cart"][
          tempTotalCart["selected_drawdate_v1"][key]
        ] = [];
        for (let bunchIndex in tempTotalCart["bunchdetails"]) {
          tempTotalCart["selected_drawdate_cart"][
            tempTotalCart["selected_drawdate_v1"][key]
          ].push(tempTotalCart["bunchdetails"][bunchIndex]);
        }
      }
    }
    totalcart[i] = tempTotalCart;
  }
}

function firstViewDataShow(view) {
  let str = ``;
  subTotalAmount = 0;
  if (totalcart.length > 0) {
    globalLotteryArr = totalcart;
    setCookie("setCart", JSON.stringify(globalLotteryArr));
    let totalCartArr = totalcart;
    var timerInstance = new Timer();

    for (let key in totalCartArr) {
      var lotterydataArr = totalCartArr[key];
      var drawtime = lotterydataArr["drawtime"];
      var saleStopTime =
        lotterydataArr["draw_data"][lotterydataArr["drawdate_list"][0]][
          "sale_stop"
        ];
      var lotcode = lotterydataArr["lotcode"];
      var mrp = lotterydataArr["mrp"];
      if (
        lotterydataArr.hasOwnProperty("selected_drawdate_v1") &&
        lotterydataArr["selected_drawdate_v1"].length > 0
      ) {
        let drawdate = lotterydataArr["selected_drawdate_v1"][0];
        let lotnameArr = lotterydataArr["displayname"];
        let lotteryStringArr = getLotteryName(
          lotterydataArr["displayname"]
        ).split("~");
        str =
          str +
          `
                <div class='col-12'>
                    <div class='row' ${
                      key > 0 ? "style=margin-top:0.5rem;" : ""
                    }>
                        <div class='col-6 text-left mt-1'>
                            <h5 class="common_color" style='font-weight:600;'>${
                              lotteryStringArr[0] +
                              " " +
                              lotteryStringArr[1] +
                              " " +
                              lotteryStringArr[2]
                            }</h5>
                        </div>
                        <div class='col-6 pl-4'>
                            <div class='row font-weight-bold'
                                style="font-size: 14px;" id='card-timer-${
                                  lotcode + "-" + drawdate
                                }-circle-cart'>
                                ${timerInstance.getTimer(
                                  saleStopTime,
                                  lotcode +
                                    "-" +
                                    drawdate +
                                    "-" +
                                    "circle-cart",
                                  "circle"
                                )}
                            </div>
                        </div>
                    </div>
                    <div class='row mt-1'>
                        <div class='col-3'>
                            <h5 class='h5_text h5_text_color'><b>Date</b></h5>
                        </div>
                        <div class='col-2 text-center'>
                            <h5 class='h5_text h5_text_color'><b>Bunch</b></h5>
                        </div>
                        <div class='col-4 text-center'>
                            <h5 class='h5_text h5_text_color'><b>Qty.</b></h5>
                        </div>
                        <div class='col-3 text-right'>
                            <h5 class='h5_text h5_text_color'><b>Amount</b></h5>
                        </div>
                    </div>`;
        var previOusDate = "";
        for (let date_index in lotterydataArr["selected_drawdate_cart"]) {
          previOusDate = date_index;
          str =
            str +
            `<div class='row mt-1' id="${
              previOusDate + "-" + lotcode + "-row-" + key + "_"
            }">`;
          for (let i in lotterydataArr["selected_drawdate_cart"][date_index]) {
            let lotteryBunchDetails =
              lotterydataArr["selected_drawdate_cart"][date_index][i];
            var addButton = qtyDiv_Cart(
              lotteryBunchDetails["bunch_id"],
              lotcode,
              date_index,
              key,
              i
            );
            var addButton1 = addButtonDiv_Cart(
              lotteryBunchDetails["bunch_id"],
              lotcode,
              date_index,
              key,
              i
            );
            if (previOusDate != "") {
              previOusDate = beautify(previOusDate + " " + drawtime, "d/m/y");
            }
            str =
              str +
              `<div class='col-12 mt-2'><div class='row'>
                                    <div class='col-3'>
                                        <h5>${previOusDate}</h5>
                                    </div>
                                    <div class='col-2 text-center'>
                                        <h5 class="h5_text_color"><nobr>${
                                          lotteryBunchDetails["series_qty"]
                                        }/${
                lotteryBunchDetails["qty"]
              }</nobr></h5>
                                    </div>
                                    <div class='col-4 text-center'>
                                        <div ${
                                          lotteryBunchDetails["selected_qty"] >
                                          0
                                            ? ""
                                            : "style=display:none;"
                                        }>
                                            ${addButton}
                                        </div>
                                        <div ${
                                          lotteryBunchDetails["selected_qty"] ==
                                          0
                                            ? ""
                                            : "style=display:none;"
                                        }>
                                            ${addButton1}
                                        </div>
                                    </div>
                                    <div class='col-3 text-right'>
                                        <h5 class="h5_text_color"><span style='font-size:0.8rem;position: relative;left:3px;'>${mrpSymbol}</span>
                                        ${
                                          lotteryBunchDetails.selected_qty *
                                          lotteryBunchDetails.series_qty *
                                          mrp
                                        }
                                        </h5>
                                    </div>
                                    </div></div>`;
            previOusDate = "";
            subTotalAmount =
              subTotalAmount +
              lotterydataArr["selected_drawdate_cart"][date_index][i]
                .selected_qty *
                lotterydataArr["selected_drawdate_cart"][date_index][i]
                  .series_qty *
                mrp;
            subtotalSeriesQty =
              subtotalSeriesQty +
              lotterydataArr["selected_drawdate_cart"][date_index][i]
                .selected_qty *
                lotterydataArr["selected_drawdate_cart"][date_index][i]
                  .series_qty;
          }
          str = str + `</div>`;
        }
        str = str + `</div>`;
      }
    }
    str =
      str +
      `<div class='row mt-1'>
                        <div class='col-4 cart-top-border_cart ml-4'>
                            <h5 class='h5_text h5_text_color' style='font-weight:bold;'>Sub Total</h5>
                        </div>
                        <div class='col-2 text-center cart-top-border_cart'>
                            <h5 class='h5_text h5_text_color'><b></b></h5>
                        </div>
                        <div class='col-5 text-right cart-top-border_cart'>
                            <h5 class='h5_text h5_text_color'>
                                <span style='font-size:0.8rem;position: relative;left:3px;'>
                                    ${mrpSymbol}
                                </span>
                                <b><span id="cart_subtotalAmount_">${subTotalAmount}</span></b>
                            </h5>
                        </div>
                </div>`;
    globalCartSubTotalAmount = subTotalAmount;
    $("#show_Cart_Lottery_Data_div").html(str);
    $("#show_Cart_Lottery_Data_div").addClass("subtotal_class_div_cart");
    funSubTotalUpdated();
  } else {
    $("#show_Cart_Lottery_Data_div").html("");
  }
  showCartCount();
}

function funSubTotalUpdated() {
  if (
    globalCartSubTotalAmount == null ||
    globalCartSubTotalAmount == "undefined" ||
    globalCartSubTotalAmount == "" ||
    globalCartSubTotalAmount == 0
  ) {
    $("#show_Cart_Lottery_Data_div").html("");
    $("#show_Cart_wallet_div").html("");
    $("#show_play_option").html("");
    $("#show_Cart_Lottery_Data_div").removeClass("subtotal_class_div_cart");
    showEmptyCart();
  }
}

function showBunchDetailsDiv_Cart(
  previOusDate,
  drawtime,
  onload,
  rowIndex,
  buttonId
) {
  let str = ``;
  globalLotteryArr = JSON.parse(getCookie("setCart"));

  let lotterydataArr = globalLotteryArr[rowIndex];
  let mrp = lotterydataArr["mrp"];
  let drawdate = previOusDate;
  let lotcode = lotterydataArr["lotcode"];
  for (let i in lotterydataArr["selected_drawdate_cart"][drawdate]) {
    let lotteryBunchDetails =
      lotterydataArr["selected_drawdate_cart"][drawdate][i];
    var addButton = qtyDiv_Cart(
      lotteryBunchDetails["bunch_id"],
      lotcode,
      drawdate,
      rowIndex,
      i
    );
    var addButton1 = addButtonDiv_Cart(
      lotteryBunchDetails["bunch_id"],
      lotcode,
      drawdate,
      rowIndex,
      i
    );
    if (previOusDate != "") {
      previOusDate = beautify(previOusDate + " " + drawtime, "d/m/y");
    }
    str =
      str +
      `<div class='col-12 mt-2'><div class='row'>
        <div class='col-3'>
            <h5>${previOusDate}</h5>
        </div>
        <div class='col-2 text-center'>
            <h5 class="h5_text_color"><nobr>${
              lotteryBunchDetails["series_qty"]
            }/${lotteryBunchDetails["qty"]}</nobr></h5>
        </div>
        <div class='col-4 text-center'>
            <div ${
              lotteryBunchDetails["selected_qty"] > 0
                ? ""
                : "style=display:none;"
            }>
                ${addButton}
            </div>
            <div ${
              lotteryBunchDetails["selected_qty"] == 0
                ? ""
                : "style=display:none;"
            }>
                ${addButton1}
            </div>
        </div>
        <div class='col-3 text-right'>
            <h5 class="h5_text_color"><span style='font-size:0.8rem;position: relative;left:3px;'>${mrpSymbol}</span>
            ${
              lotteryBunchDetails.selected_qty *
              lotteryBunchDetails.series_qty *
              mrp
            }
            </h5>
        </div>
        </div></div>`;
    previOusDate = "";
  }
  $("#" + drawdate + "-" + lotcode + "-row-" + rowIndex + "_").html("");
  $("#" + drawdate + "-" + lotcode + "-row-" + rowIndex + "_").html(str);
  setAnimation(buttonId);
  subTotalCart_View1(rowIndex, mrp);
  if (user != null) {
    showUserTotalBalnce();
  } else {
    getCourierCharge();
  }
  showCartCount();
}

function setAnimation(buttonId) {
  if (buttonId != "") {
    var plusMinusButton = buttonId;
    $("#" + plusMinusButton).addClass("pressed");
    setTimeout(function () {
      $("#" + plusMinusButton).removeClass("pressed");
    }, 150);
  }
}

function addButtonDiv_Cart(bunchId, lotcode, drawdate, rowIndex, i) {
  let selectedQty = 0;
  let str = `<div class='row'><div class='col-1'></div><div class='col-10 ml-3'>
                <div id="inc_${
                  bunchId + "_" + lotcode + "_" + drawdate
                }" class='cart-add-button-div_cart cart-anim-btn cart-common-button--greip cart-common-red-button cart-add-qty-radious-button pt-1' id="${
    bunchId + "-" + lotcode + "-" + drawdate + "-add"
  }"
                    onclick='incremenetQtyCart_V1(${lotcode} , "${drawdate}","plus",${selectedQty},"${rowIndex}",${i},"inc_${
    bunchId + "_" + lotcode + "_" + drawdate
  }")'>
                <span><h4 class='h5-add-text'>ADD</h4></span></div>
            </div><div class='col-1'></div></div>`;
  return str;
}

function qtyDiv_Cart(bunchId, lotcode, drawdate, rowIndex, i) {
  let tempDataArr = globalLotteryArr[rowIndex];
  tempDataArr = tempDataArr["selected_drawdate_cart"][drawdate][i];
  let str = `<div class='row'>
                <div class='col-2'></div>
                <div class='col-8'>
                <div class='incremenet_decremenet_div_cart row pt-1' id="${
                  i + "-" + lotcode + "-" + drawdate + "-increment_decrement"
                }">
                    <div class='col-4' id="dec_${
                      bunchId + "_" + lotcode + "_" + drawdate
                    }" onclick='incremenetQtyCart_V1(${lotcode} , "${drawdate}","minus",${
    tempDataArr["selected_qty"]
  },"${rowIndex}","${i}","dec_${
    bunchId + "_" + lotcode + "_" + drawdate
  }")' style='cursor:pointer;'>
                        ${
                          tempDataArr["selected_qty"] == 1
                            ? `<i class="fa fa-trash-o"
                        style="font-size: 20px;position: relative;bottom: 2px;color: #a21c1c;font-weight: 600;"></i>`
                            : `<i class="fa fa-minus" style="position: relative;bottom: 2px;"></i>`
                        }
                    </div>
                    <div class='col-4'>
                       <div class='row' style="background-color:white;color:#212529;justify-content: center;position: relative;bottom: 0.25rem;height: 1.7rem;font-size: 19px;" id="${
                         lotcode + "-" + drawdate + "-" + bunchId + "_qtyV1"
                       }">
                            ${tempDataArr["selected_qty"]}
                        </div>
                    </div>
                    <div class='col-4' id="inc_${
                      bunchId + "_" + lotcode + "_" + drawdate
                    }" onclick='incremenetQtyCart_V1(${lotcode} , "${drawdate}","plus",${
    tempDataArr["selected_qty"]
  },"${rowIndex}","${i}","inc_${
    bunchId + "_" + lotcode + "_" + drawdate
  }")' style='cursor:pointer;'>
                        <i class="fa fa-plus" style="position: relative;bottom: 2px;"></i>
                    </div>
                </div>
            </div><div class='col-2'></div>
            </div>`;
  return str;
}

var cartCookieArray = [];
function incremenetQtyCart_V1(
  lotcode,
  drawdate,
  action,
  qty,
  rowIndex,
  i,
  buttonId
) {
  globalLotteryArr = JSON.parse(getCookie("setCart"));
  let tempDataArr = globalLotteryArr[rowIndex];
  if (action.toLowerCase() == "plus") {
    // alert(tempDataArr["selected_drawdate_cart"][drawdate][i]['selected_qty']+"--date-----"+drawdate+"--"+action+"--"+qty+"--"+rowIndex+"--indexing----"+i);
    tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] =
      tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] + 1;
    // alert(tempDataArr["selected_drawdate_cart"][drawdate][i]['selected_qty']+"--date-----"+drawdate+"--"+action+"--"+qty+"--"+rowIndex+"--indexing----"+i);
    if (
      tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] == 1
    ) {
      buttonId = "";
    }
  } else if (action.toLowerCase() == "minus") {
    if (
      tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] < 2
    ) {
      buttonId = "";
    }
    // alert(tempDataArr["selected_drawdate_cart"][drawdate][i]['selected_qty']+"--date-----"+drawdate+"--"+action+"--"+qty+"--"+rowIndex+"--indexing----"+i);
    if (
      tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] > 0
    ) {
      tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] =
        parseInt(
          tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"]
        ) - 1;
    } else {
      tempDataArr["selected_drawdate_cart"][drawdate][i]["selected_qty"] = 0;
      buttonId = "";
    }
    // alert(tempDataArr["selected_drawdate_cart"][drawdate][i]['selected_qty']+"--date-----"+drawdate+"--"+action+"--"+qty+"--"+rowIndex+"--indexing----"+i);
  }
  globalLotteryArr[rowIndex] = tempDataArr;
  //    cartCookieArray.push(globalLotteryArr[rowIndex]);
  cartCookieArray = globalLotteryArr;
  setCookie("setCart", JSON.stringify(cartCookieArray));
  showBunchDetailsDiv_Cart(
    drawdate,
    globalLotteryArr[rowIndex]["drawtime"],
    (onload = 1),
    rowIndex,
    buttonId
  );
}

function subTotalCart_View1(rowIndex, mrp) {
  subtotalAmount = 0;
  globalLotteryArr = JSON.parse(getCookie("setCart"));
  globalCartSubTotalAmount = 0;
  for (let i = 0; i < globalLotteryArr.length; i++) {
    //        var lotterydataArr = globalLotteryArr[rowIndex];
    var lotterydataArr = globalLotteryArr[i];
    mrp = globalLotteryArr[i].mrp;
    subtotalSeriesQty = 0;
    for (let date_index in lotterydataArr["selected_drawdate_cart"]) {
      var subSeriesQty = 0;
      for (let bunchIndex in lotterydataArr["selected_drawdate_cart"][
        date_index
      ]) {
        let tempBunchData =
          lotterydataArr["selected_drawdate_cart"][date_index][bunchIndex];
        subSeriesQty =
          subSeriesQty +
          tempBunchData["selected_qty"] * tempBunchData["series_qty"];
      }
      subtotalSeriesQty = subtotalSeriesQty + subSeriesQty;
    }
    globalCartSubTotalAmount =
      globalCartSubTotalAmount + subtotalSeriesQty * mrp;
  }
  $("#cart_subtotalAmount_").text(globalCartSubTotalAmount);
  funSubTotalUpdated();
}

function showTotalWalletBalance() {
  let str = `<div class='col-12 border_class_div_cart'>
            <div class='row mt-2'>
                <div class='col-6'>
                    <h5 class="common_color">
                        <b>Keep Ticket Safe</b> (Free)<span class="img-info" data-toggle="modal" data-target="#ticketsafe">
                            <img src="app.static/img/info.jpg" style="width: 20px;margin-left: 2px;cursor:pointer;">
                        </span>
                    </h5>
                </div>
                <div class='col-6 text-right radion_button_div'>
                    <input type="radio" name="courier" id="keep_ticket" checked onclick="checkCourierButton(this.id)">
                </div>
            </div>
            <div class='row'>
                <div class='col-6'>
                    <h5 class="common_font_color">
                        <b>Door Step Delivery</b>
                    </h5>
                </div>
                <div class='col-3'>
                    <h5 class="modify_addresh cart-anim-btn cart-common-button--greip cart-common-gray-button cart-modify-radious-button" id="modify_addresh_id" onclick="modifyAddresh()" data-toggle="collapse" data-target="#modify_add_container_row">
                        <span>
                            Modify
                        <span>
                    </h5>
                </div>
                <div class='col-3 text-right radion_button_div'>
                    <input type="radio" name="courier" id="courier_ticket" onclick="checkCourierButton(this.id)">
                </div>
            </div>
            <div class='row mt-1' id="user_addresh_div_row">
                <div class='col-12'>
                    <h4 class="common_font_color"><b><span>Address:</span></b>
                        <span id="user_address" class="common_font_color" style='font-size:16px;'>
                        </span>
                    </h4>
                </div>
            </div>
            <div class="row mt-3 collapse show" id="modify_add_container_row" style="">
                <div class="col-12" id="modify_add_container"></div>
            </div>
            <div class='row mt-1' style="padding-left: 1rem;padding-right: 1rem;">
                <div class='col-12 cart-top-border_cart'></div>
            </div>
            <div class='row mt-1' style='display:none;'>
                <div class='col-9'>
                    <div class='row'>
                        <div class='col-5'>
                            <h5 class='common_font_color' onclick="viewpromoCode()"><nobr><span style="position: relative;bottom: 3px;">View Promo</span>
                            <i class="fa fa-angle-right" style="font-size: 24px;color:#a21c1c;font-weight: 600;"></i>
                            </nobr></h5>
                        </div>
                        <div class='col-6'>
                            <div class='row'>
                                <div class='col-12'>
                                    <h5 class='common_font_color'><nobr><b><span id="applied_promocode">"Try New" applied</span></b></nobr>
                                    <nobr><span style="font-size: 14px;">
                                        You Saved ${mrpSymbol}<span id="promo_code_mrp">80</span> With Promo Code
                                    </span></nobr>
                                    </h5>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
                <div class='col-3 text-right'>
                    <h4 style='color:#a21c1c;'><nobr>Remove</nobr></h4>
                </div>
            </div>
        </div>`;
  $("#show_Cart_wallet_div").html(str);
  if (
    getCookie("virtualticket") == "null" ||
    getCookie("virtualticket") == null ||
    getCookie("virtualticket") == undefined ||
    getCookie("virtualticket") == "undefined" ||
    getCookie("virtualticket") == "" ||
    getCookie("virtualticket") == "true"
  ) {
    $("#keep_ticket").prop("checked", true);
    checkCourierButton("keep_ticket");
  }
  showTotalBalance();
}

function checkCourierButton(id) {
  if (id.toLowerCase() == "keep_ticket") {
    $("#modify_addresh_id").hide();
    $("#user_addresh_div_row").hide();
    courier_keep_button = true;
    deliveryCharges = 0;
    $("#shipingFreeMessage").hide();
    showTotalBalance();
    setCookie("virtualticket", "true");
    $("#modify_add_container_row").collapse("hide");
  } else {
    $("#modify_addresh_id").show();
    $("#user_addresh_div_row").show();
    courier_keep_button = false;
    getCourierCharge();
    getUserAddresh();
  }
}

function showTotalBalance() {
  totalAddBalance = deliveryCharges + globalCartSubTotalAmount;
  let str = `<div class="col-12 subtotal_class_div_cart" style='background-color:#f4f5f8;'>
            <div class='row mt-1'>
                <div class='col-8'>
                    <h6 class='common_font_color'>
                        <b>Wallet Money</b>
                    </h6>
                </div>
                <div class='col-4 text-right'><h5 class='common_font_color'><b><span style='font-size:12px;'>${mrpSymbol}</span>${
    user.wallet_balance
  }</b></h5></div>
            </div>
            <div class='row'>
                <div class='col-8'>
                    <h6 class='common_font_color'>
                        <nobr><b>Ticket Price</b> <!--(${subtotalSeriesQty} Tickets X <span style='font-size:14px;'>${mrpSymbol}</span>${ticketMrp})--></nobr>
                    </h6>
                </div>
                <div class='col-4 text-right'>
                    <h6 class='common_font_color'>
                        <b><span style='font-size:10px;'>${mrpSymbol}</span>${globalCartSubTotalAmount}</b>
                    </h6>
                </div>
            </div>
            <div class='row'>
                <div class='col-8'>
                    <h6 class='common_font_color'>
                        <b>Delivery Charges</b>
                    </h6>
                </div>
                <div class='col-4 text-right'>
                    <h6 class='common_font_color'>
                        <b><span style='font-size:10px;'>${mrpSymbol}</span>${deliveryCharges}</b>
                    </h6>
                </div>
            </div>
            <div class='row'>
                <div class='col-8'>
                    <h6 class='common_font_color'>
                        <b>Discount/Promo</b>
                    </h6>
                </div>
                <div class='col-4 text-right'>
                    <h6 class='common_font_color'>
                        <b><span style='font-size:12px;'>${mrpSymbol}</span>${discountPromo}</b>
                    </h6>
                </div>
            </div>
            <div class='row mt-1' style="padding-left: 1rem;padding-right: 1rem;">
                <div class='col-12 cart-top-border_cart'></div>
            </div>
            <div class='row mt-1' style="height: 25px;">
                <div class='col-6'>
                    <h5 class='common_font_color'>
                        <b>Amount Payble</b>
                    </h5>
                </div>
                <div class='col-2 text-center'>
                    <h5 class='common_font_color' style="font-size: 30px;position: relative;bottom: 8px;">
                        <b>-</b>
                    </h5>
                </div>
                <div class='col-4 text-right'>
                    <h5 class='common_font_color'>
                        <b><span style='font-size:14px;'>${mrpSymbol}</span>${
    globalCartSubTotalAmount + deliveryCharges - discountPromo
  }</b>
                    </h5>
                </div>
            </div>
            ${
              totalAddBalance > parseInt(user.wallet_balance)
                ? `
            <div class='row' style="height: 25px;">
                <div class='col-6'>
                    <h5 class='common_font_color' style='color:red;'>
                        <b>Balance To Be Paid</b>
                    </h5>
                </div>
                <div class='col-2 text-center'>
                    <h5 class='common_font_color' style="font-size: 30px;position: relative;bottom: 8px;color:red;">
                        <b>-</b>
                    </h5>
                </div>
                <div class='col-4 text-right'>
                    <h5 class='common_font_color' style='color:red' id='add_balance_text'></h5>
                </div>
            </div>
        <div class="row" style="margin-left: -10px;font-size: 20px;">
                <div class="col-12 col-sm-12 col-md-12" style="padding-top: 8px;">
                    <h6 class="common_font_color"><b>Select any one to recharge</b></h6>
                </div>
                <div class="col-12 col-sm-12 col-md-12">
                    <div class="row" style="margin-top: 6px;" id="addmoneySelection"></div>
                </div>
                <div class="col-12 col-sm-12 col-md-12" style="margin-top:5px;font-size: 16px; color: darkgray; display:none;">
                    <span style="font-size: 18px;">enter your desired amount</span>
                </div>
                <div class="col-12 col-sm-12 col-md-12" style="margin-left: 0px;">
                    <button style="border:0px;border-bottom:2px solid #999999;margin-bottom: 8px;margin-top: 8px; width: 100%; padding-left: 2px;text-align:left;background-color: #f4f5f8;">
                        <sup style="top: -0.1em !important;">
                            <span style="color:#373f4f;font-size: 14px;/* margin-left: 5px; */">&#x20B9</span>
                        </sup>
                        <input id="desiredAmount" type="tel" style="border:0px;font-size: 18px;font-weight: bold;width:95%;background-color:#f4f5f8;" oninput="validateAmtIP(this);toggleSelectedClass();updateRechargeAmount(this.value);"
                               placeholder="Eg. 100">
                    </button>
                </div>
            </div>
            <div class="row" id='bottombaraddmoney'>
                <div class="col-12 col-sm-12 col-md-12 bottombarmoney-class" style="margin-top:15px;margin-bottom: 5px;padding-left: 25px;">
                    <sup style="top: 0.0em !important;">
                        <span style="color:#565656;;font-size: 14px;">&#x20B9</span>
                    </sup>
                    <span style="color:#565656;font-size: 22px;font-weight: bold;" id='bottombarmoney'>0.0</span>
                </div>                    
            </div>`
                : ""
            }
        </div>`;
  // <b><span style='font-size:14px;'>${mrpSymbol}</span>${(globalCartSubTotalAmount+deliveryCharges)-(parseInt(user.wallet_balance)+discountPromo)}</b>
  $("#total_wallet_amount_row").html(str);
  if (totalAddBalance > parseInt(user.wallet_balance)) {
    rechargeMoney = true;
    if (
      paymentGatewayId == undefined ||
      paymentGatewayId == "undefined" ||
      paymentGatewayId == ""
    )
      loadPaymentGateway();
    addmoneybuttons();
  }
}

function modifyAddresh() {
  if (
    getCookie("userAddresh") != null &&
    getCookie("userAddresh") != undefined &&
    getCookie("userAddresh") != ""
  ) {
    $("#modify_add_container").css({ display: "block" });
  } else {
    if (user != null) {
      $("#modify_add_container_row").collapse("hide");
      loadComponent("account", "REQ002", "modifyAdd");
    }
  }
}

function showPlayOption() {
  let str = `<div class='row mt-2' style="padding-right: 0.5rem;padding-left: 0.5rem;"><div class='col-12'>
        <div class='row'>
            <div class='col-12 text-center'>
                <h4 class='common_font_color' id="shipingFreeMessage">
                    <b><nobr>*Congrats, Your order is eligible for Free Shipping.</nobr></b>
                </h4>
            </div>
        </div>
        <div class='row mt-3' style="margin-bottom:25%;">
            <div class='col-12'>
                <h4>
                  <b><p class='note_message mx-2'>NOTE:</p></b>
                    <ol style="list-style:none;">
                        <li>
                            <span class='note_message'>*Book of same number</span>
                        </li>
                        <li>
                            <span class='note_message'>#You can write your choice digit an explanation</span>
                            <span class='note_message'>remark box be will try to fulfil </span>
                        </li>
                    </ol>
                </h4>
            </div>
        </div>
    </div></div>`;
  $("#show_play_option").html(str);
  showPlayOptionNew();
}
function showPlayOptionNew() {
  var str = `
            <div class='row' id="total_wallet_amount_row" style="padding-right: 0.94rem;">
            </div>
            <div class='row mt-4'>
                <div class='col-3'></div>
                <div class='col-6 text-center'>
                        <button class="add-to-buy-button_cart cart-anim-btn cart-common-button--greip cart-common-red-button cart-radious-submit" onclick="playNowButton();">
                            <span>
                            <i class="fa fa-paper-plane" style="padding-right:5px;" aria-hidden="true"></i>
                            <span style="font-size: 1.3rem;font-weight: 600;">Pay Now</span></span>
                        </button>
                </div>
                <div class='col-3'></div>
            </div>`;
  $("#show_play_option_new").html(str);
}
function showUserTotalBalnce() {
  if (courier_keep_button == true) {
    deliveryCharges = 0;
    showTotalBalance();
  } else {
    getCourierCharge();
  }
}

function viewpromoCode() {
  console.log("show promocode");
}
/**************************************************************************************************************/
/********************************Second View Functionality Start***********************************************/

function secondViewDataShow() {
  globalCartSubTotalAmount = 0;
  var subTotal = 0;
  subtotalSeriesQty = 0;
  var totalCartCount = 0;
  if (globalLotteryArr.length > 0) {
    let str = ``;
    var subTotal = 0;
    str = `<div class="row row" style="padding-left: 1rem;padding-right: 1rem;">
            <div class='col-12 subtotal_class_div_1_cart'>`;
    for (let key in globalLotteryArr) {
      str =
        str +
        `<div class='row mt-1'>
                    <div class='col-4 text-center'>
                        <h5 class="h5_text"  style="width: 80%;">
                             <nobr><b>Draw Date</b></nobr>
                        </h5>
                    </div>
                    <div class='col-4'>
                        <div class='row'>
                            <div class='col-2'></div>
                            <div class='col-8 text-center'>
                                <h5 class="h5_text">
                                    <nobr><b>Ticket No.</b></nobr>
                                </h5>
                            </div>
                            <div class='col-2'></div>
                        </div>
                    </div>
                    <div class='col-2 text-center'>
                        <h5 class="h5_text">
                             <b>Qty.</b>
                        </h5>
                    </div>
                    <div class='col-2 text-left'>
                        <h5 class="h5_text">
                             <b>Amt.</b>
                        </h5>
                    </div>
                </div>
		<div class='row'>
                    <div class='col-12 text-center'>
                        <h5 class="common_color"><b>${
                          globalLotteryArr[key]["displayname"] +
                          " (" +
                          beautify(
                            globalLotteryArr[key]["drawdate_list"][0] +
                              " " +
                              globalLotteryArr[key]["drawtime"],
                            "h:i a"
                          ) +
                          ")"
                        }</b></h6>
                    </div>
                </div>`;
      var drawtime = globalLotteryArr[key]["drawtime"];
      ticketMrp = globalLotteryArr[key]["mrp"];
      for (let date_index in globalLotteryArr[key]["selected_number_v2"]) {
        let lotteryData =
          globalLotteryArr[key]["selected_number_v2"][date_index];
        let previOusDate = date_index;
        for (let pin in lotteryData) {
          for (let ticket_no in lotteryData[pin]) {
            let ticketNoArr = lotteryData[pin][ticket_no];
            if (previOusDate != "") {
              previOusDate = beautify(previOusDate + " " + drawtime, "d/m/y");
            }
            str =
              str +
              `<div class='row'>
                                <div class='col-4 text-center'>
                                    ${
                                      previOusDate == ""
                                        ? ""
                                        : `<h5 class="h5_v2_" style="font-size: 0.9rem;">${previOusDate}</h5>`
                                    }
                                </div>
                                <div class='col-4'>
                                   <div class='row'>
                                        <div class='col-12 text-center ticket_no_cart_v2'>
                                            <h5 style="font-weight: 600;">
                                                <nobr>${ticket_no}</nobr>
                                            </h5>
                                        </div>
                                   </div>
                                </div>
                                <div class='col-2 text-center'>
                                    <h5 class="h5_v2_ ml-2">${
                                      ticketNoArr["qty"]
                                    }</h5>
                                </div>
                                <div class='col-2 text-left'>
                                    <div class='row'>
                                        <div class='col-6'>
                                            <h6 class="h5_text_color" style='font-weight:bold'>
                                                <nobr>
                                                    <span style="font-size:0.8rem;position: relative;left:3px;">
                                                        ${mrpSymbol}
                                                    </span>
                                                    ${
                                                      ticketNoArr["qty"] *
                                                      ticketMrp *
                                                      parseInt(pin)
                                                    }
                                                </nobr>
                                            </h6>
                                        </div>
                                        <div class='col-6'>
                                            <nobr>
                                                <span style="position: relative;left: 0px;bottom: 5px;cursor:pointer" onclick='deleteTicketView2("${pin}","${date_index}","${ticket_no}","${key}")'>
                                                    <img src="app.static/img/image_cancel.jpeg" style="width: 20px;">
                                                </span>
                                            </nobr>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            previOusDate = "";
            subTotal =
              subTotal + parseInt(pin) * ticketNoArr["qty"] * ticketMrp;
            subtotalSeriesQty =
              subtotalSeriesQty + parseInt(pin) * ticketNoArr["qty"];
            totalCartCount = totalCartCount + parseInt(ticketNoArr["qty"]);
          }
        }
      }
    }
    str =
      str +
      `<div class='row mt-1 mb-1'>
            <div class="col-4 cart-top-border ml-4">
                <h5 class="h5_text h5_text_color" style="font-weight:bold;">Sub Total</h5>
            </div>
            <div class='col-2 text-center cart-top-border'>
                <h5>&nbsp;</h5>
            </div>
            <div class="col-5 text-right cart-top-border">
                    <h5 class="h5_text h5_text_color">
                        <nobr>
                            <span style="font-size:0.8rem;position: relative;left:3px;">${mrpSymbol}</span>
                            <b><span id="cart_subtotalAmount_">${subTotal}</span></b>
                        </nobr>
                    </h5>
            </div>
        </div>`;
    str = str + `</div></div>`;
    $("#show_Cart_Lottery_Data_div").html(str);
    globalCartSubTotalAmount = subTotal;
    funSubTotalUpdated();
  } else {
    showEmptyCart();
  }
  $("#heading_cart_total").text(totalCartCount);
  $("#notification-batch").text(totalCartCount);
}

function deleteTicketView2(pin, drawdate, ticketNo, key) {
  let deletCart = JSON.parse(getCookie("setCart"));
  //    console.log(deletCart);
  delete deletCart[key]["selected_number_v2"][drawdate][pin][ticketNo];
  setCookie("setCart", JSON.stringify(deletCart));
  getCartData();
}
/********************************Second View Functionality End***********************************************/
/**************************************************************************************************************/
