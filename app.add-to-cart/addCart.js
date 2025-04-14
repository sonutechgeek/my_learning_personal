delete_cookie("buy_button");
function addCardButton(view, lotcode) {
  if (!commonBuyButton(view, lotcode, "cart")) return false;
}

function addBuyButton(view, lotcode) {
  if (!commonBuyButton(view, lotcode, "buy")) return false;
  if (
    user != null &&
    user != undefined &&
    user != "" &&
    user.mobileno != "" &&
    user.mobileno.length == 10
  ) {
    loadComponent("cart", "REQ002");
  } else {
    console.log("----------");
    setCookie("buy_button", "SAVE_BUY_BUTTON");
    //        let param = {componennt_name: "cart"};
    loadComponent("login", "REQ002");
  }
}

var cartCookieArray = [];
function commonBuyButton(view, lotcode, addType) {
  var subAmount = $("#V_subtotalAmount_" + view)
    .text()
    .trim();
  var subQty = $("#V_subtotalAmount_" + view)
    .text()
    .trim();
  if (subAmount != "" && subAmount != null) {
    // console.log("#"+lotcode+"-"+getLotcodeBaseLotteryData["drawdate_list"][0]+"-customer_message");
    getLotcodeBaseLotteryData["remark"] = $(
      "#" +
        lotcode +
        "-" +
        getLotcodeBaseLotteryData["drawdate_list"][0] +
        "-customer_message"
    ).val();
    getLotcodeBaseLotteryData["view"] = view;
    getLotcodeBaseLotteryData["sub_amount"] = globalSubTotalAmount;
    getLotcodeBaseLotteryData["sub_qty"] = gloBalSubQty;
    let getCartView = getCookie("setView");
    if (getCartView != null && getCartView != "" && getCartView != view) {
      delete_cookie("setCart");
      delete_cookie("setView");
    }
    let getCartCookie = getCookie("setCart");
    let matchLotcode = false;
    if (
      getCartCookie == "null" ||
      getCartCookie == null ||
      getCartCookie == "undefined" ||
      getCartCookie == undefined ||
      getCartCookie == ""
    ) {
      cartCookieArray = [];
      if (view == "0") {
        var tempTotalCart = getLotcodeBaseLotteryData;
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
        cartCookieArray.push(tempTotalCart);
      } else {
        cartCookieArray.push(getLotcodeBaseLotteryData);
      }
    } else {
      cartCookieArray = [];
      let getCartArr = JSON.parse(getCartCookie);
      if (getCartArr.length > 0) {
        for (let i = 0; i < getCartArr.length; i++) {
          if (lotcode == getCartArr[i]["lotcode"]) {
            if (view == "0") {
              var newDateArray = getCartArr[i]["selected_drawdate_v1"].concat(
                getLotcodeBaseLotteryData["selected_drawdate_v1"]
              );
              getCartArr[i]["selected_drawdate_v1"] = newDateArray.filter(
                (item, pos) => newDateArray.indexOf(item) === pos
              );
              for (let j = 0; j < getCartArr[i]["bunchdetails"].length; j++) {
                getCartArr[i]["bunchdetails"][j]["selected_qty"] =
                  parseInt(getCartArr[i]["bunchdetails"][j].selected_qty) +
                  parseInt(
                    getLotcodeBaseLotteryData["bunchdetails"][j].selected_qty
                  );
              }
              for (let key in getLotcodeBaseLotteryData[
                "selected_drawdate_v1"
              ]) {
                if (
                  !getCartArr[i]["selected_drawdate_cart"].hasOwnProperty([
                    getLotcodeBaseLotteryData["selected_drawdate_v1"][key],
                  ])
                ) {
                  getCartArr[i]["selected_drawdate_cart"][
                    getLotcodeBaseLotteryData["selected_drawdate_v1"][key]
                  ] = [];
                  for (let bunchIndex in getLotcodeBaseLotteryData[
                    "bunchdetails"
                  ]) {
                    getCartArr[i]["selected_drawdate_cart"][
                      getLotcodeBaseLotteryData["selected_drawdate_v1"][key]
                    ].push(
                      getLotcodeBaseLotteryData["bunchdetails"][bunchIndex]
                    );
                  }
                } else {
                  for (let bunchIndex in getLotcodeBaseLotteryData[
                    "bunchdetails"
                  ]) {
                    getCartArr[i]["selected_drawdate_cart"][
                      getLotcodeBaseLotteryData["selected_drawdate_v1"][key]
                    ][bunchIndex].selected_qty +=
                      getLotcodeBaseLotteryData["bunchdetails"][
                        bunchIndex
                      ].selected_qty;
                  }
                }
              }
            } else {
              for (let date_key1 in getLotcodeBaseLotteryData[
                "selected_number_v2"
              ]) {
                if (
                  !getCartArr[i]["selected_number_v2"].hasOwnProperty(date_key1)
                ) {
                  getCartArr[i]["selected_number_v2"][date_key1] = {};
                }
                for (let pin_key1 in getLotcodeBaseLotteryData[
                  "selected_number_v2"
                ][date_key1]) {
                  if (
                    !getCartArr[i]["selected_number_v2"][
                      date_key1
                    ].hasOwnProperty(pin_key1)
                  ) {
                    getCartArr[i]["selected_number_v2"][date_key1][pin_key1] =
                      {};
                  }
                  for (let stock_key in getLotcodeBaseLotteryData[
                    "selected_number_v2"
                  ][date_key1][pin_key1]) {
                    if (
                      !getCartArr[i]["selected_number_v2"][date_key1][
                        pin_key1
                      ].hasOwnProperty(stock_key)
                    ) {
                      getCartArr[i]["selected_number_v2"][date_key1][pin_key1][
                        stock_key
                      ] =
                        getLotcodeBaseLotteryData["selected_number_v2"][
                          date_key1
                        ][pin_key1][stock_key];
                    } else {
                      successErrorAlert(
                        "error",
                        "",
                        "This stock " +
                          stock_key +
                          " number all ready added in the cart"
                      );
                      return false;
                    }
                  }
                }
              }
            }
            matchLotcode = true;
          }
        }
        if (matchLotcode == false) {
          var tempTotalCart = getLotcodeBaseLotteryData;
          if (view == "0") {
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
          }
          getCartArr.push(tempTotalCart);
        }
        cartCookieArray = getCartArr;
      }
    }
    setCookie("setCart", JSON.stringify(cartCookieArray));
    setCookie("setView", view);
    showSubCartCount();
    /*        if (addType.toLowerCase() == "buy")
            loadComponent("cart", "REQ002");
        else {
            successErrorAlert("success", "", "Your cart is updated");
            getLotteryDetails(lotcode, lotteryId);
        } */
    if (addType.toLowerCase() != "buy") {
      Swal.fire({
        title: "",
        text: "Your cart is updated",
        icon: "success",
        closeButtonColor: "#a21c1c",
        showConfirmButton: true,
        confirmButtonText: "Close",
        confirmButtonColor: "#a21c1c",
        confirmButtonClass: "swal_custom_button_class",
        customClass: {
          popup: "swal2-popup custom-swal-popup-class",
        },
      }).then((result) => {
        if (result.value) {
          loadComponent("home", "REQ002");
        }
      });
      //successErrorAlert("success", "", "Your cart is updated");
      //getLotteryDetails(lotcode, lotteryId);
    }
    return true;
  } else {
    if (
      view == "0" &&
      getLotcodeBaseLotteryData.hasOwnProperty("selected_drawdate_v1") &&
      getLotcodeBaseLotteryData["selected_drawdate_v1"].length < 1
    ) {
      successErrorAlert("error", "", "Please select at least 1 drawdate");
    } else {
      successErrorAlert("error", "", "Please select at least 1 qty");
    }
    return false;
  }
}

function getCourierCharge(subAmount) {
  //    alert(subAmount + "---" + view + "~~~~");
  if (subAmount > 0) {
    let param = {
      qty: subAmount,
      buyer: user == null ? "" : user.custcode,
      type: "customer",
      action: "GET_RATE",
    };
    loadData("courier_charges", "REQ001", "GET_C_CHARGE", param, "COMMON").then(
      (responseArr) => {
        //            console.log(responseArr);
        var deliveryCharges = "";
        if (responseArr.status.toUpperCase() == "SUCCESS") {
          deliveryCharges = parseInt(responseArr.rate);
        }
        if (deliveryCharges == 0) {
          $("#shipingFreeMessage" + view).show();
        } else {
          $("#shipingFreeMessage" + view).hide();
        }
      }
    );
  } else {
    $("#shipingFreeMessage" + view).hide();
  }
}

function showSubCartCount() {
  let totalCartCount = 0;
  if (
    getCookie("setView") != null &&
    getCookie("setCart") != null &&
    getCookie("setView") != "" &&
    getCookie("setCart") != ""
  ) {
    let lotteryArr = JSON.parse(getCookie("setCart"));
    let view = getCookie("setView");
    for (let rowIndex in lotteryArr) {
      let lotteryData = lotteryArr[rowIndex];
      if (view == "0") {
        for (let dateIndex in lotteryData["selected_drawdate_cart"]) {
          for (let index in lotteryData["selected_drawdate_cart"][dateIndex]) {
            if (
              lotteryData["selected_drawdate_cart"][dateIndex][index][
                "selected_qty"
              ] > 0
            ) {
              var date2 = beautify(
                dateIndex + " " + lotteryData["drawtime"],
                "y-m-d h:m:s",
                "24"
              );
              var days = getDaysDiff(date2);
              if (days >= 0) {
                totalCartCount =
                  totalCartCount +
                  parseInt(
                    lotteryData["selected_drawdate_cart"][dateIndex][index][
                      "selected_qty"
                    ]
                  );
              }
            }
          }
        }
      } else if (view == "1") {
        for (let date_index in lotteryData["selected_number_v2"]) {
          var date2 = beautify(
            date_index + " " + lotteryData["drawtime"],
            "y-m-d h:m:s",
            "24"
          );
          var days = getDaysDiff(date2);
          if (days >= 0) {
            let lotteryDateData = lotteryData["selected_number_v2"][date_index];
            for (let pin in lotteryDateData) {
              for (let ticketNo in lotteryDateData[pin]) {
                totalCartCount =
                  totalCartCount +
                  parseInt(lotteryDateData[pin][ticketNo]["qty"]);
              }
            }
          }
        }
      }
    }
  }
  $("#heading_cart_total").text(totalCartCount);
  $("#notification-batch").text(totalCartCount);
  if (totalCartCount < 1) {
    deleteLotteryData();
  }
}
