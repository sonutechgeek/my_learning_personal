var shoapCArtArraView2 = [];
var pin_onload = 0;
var fixOffSetValue = 25;
var setOffsetValue = 15;
var drawdateSelectedId = "";
var pinSelectedId = "";
function secondViewLotteryData(getLotcodeBaseLotteryData) {
  pin_onload = 0;
  let str = `<div class="secondview_ticket-select-process">
        <div class='secondview_div' ${
          getLotcodeBaseLotteryData["bunchdetails"].length > 1
            ? ""
            : "style='display:none;'"
        }>
            <p class="secondview-heading">Select Bunch</p>
            <div class='secondview_select-pin-no' id="show_second_view_pin">
                ${getPinningView(getLotcodeBaseLotteryData, pin_onload)}
            </div>
        </div>
        <div class='secondview_div'>
            <p class="secondview-heading">Select Ticket Number</p>
            <div class='row secondview_ticket_no' id="secondview_ticket_show_div">
            </div>
        </div>
        <div class='row secondview_div'>
            <div class='row'>
                <div class='col-12 text-center' id='moreTicketLoad' onclick="moreTicketLoad()">
                    <h5><span class='more_span'>More</span><i class="fa fa-angle-down ml-2 more_fa_icon"></i></h5>
                </div>
            </div>
        </div>
        <div class='secondview_div'>
            <p class="secondview-heading">Add Another Draw</p>
            <div class='row secondview_ticket_no' >
            ${getDrawDateView2(getLotcodeBaseLotteryData)}
            </div>
        </div>
    </div>${showCommonDiv(view)}`;
  $("#showLotteryData_v2").html(str);
  showSubtotalDetailsView();
  getTicketView(getLotcodeBaseLotteryData, pin_onload);
  if (drawdateSelectedId != "") {
    $("#" + drawdateSelectedId).click();
    drawdateSelectedId = "";
  }
  if (pinSelectedId != "") {
    $("#" + pinSelectedId).click();
    $("#" + pinSelectedId).prop("selected", true);
    pinSelectedId = "";
  }
  showSubtotalDetailsView();
  getTicketView(getLotcodeBaseLotteryData, pin_onload);
}

var pinArray = [];
function getPinningView(lotteryData, pin_onload) {
  let str = "";
  let drawdate = ticketLoadDrawdate;
  let bunchData = lotteryData["bunchdetails"];
  pinSelectedId = "";
  for (let i = 0; i < bunchData.length; i++) {
    bunchDetails = bunchData[i];
    if (i == 0) {
      pinArray = bunchDetails;
    }
    if (
      lotteryData["draw_data"][ticketLoadDrawdate]["stockArr"][
        bunchDetails["series_qty"]
      ].length > 0
    ) {
      str =
        str +
        `<input type="checkbox" class='check-box-class' id='${
          bunchDetails["bunch_id"] +
          "-" +
          lotcode +
          "-" +
          drawdate +
          "view" +
          view
        }' onclick='selectPin(${
          bunchDetails["bunch_id"]
        },${drawdate},${lotcode},this.id,${JSON.stringify(bunchDetails)})'>
                <label for='${
                  bunchDetails["bunch_id"] +
                  "-" +
                  lotcode +
                  "-" +
                  drawdate +
                  "view" +
                  view
                }'>${bunchDetails["series_qty"]}</label>`;
      if (pinSelectedId == "") {
        pinSelectedId = `${
          bunchDetails["bunch_id"] +
          "-" +
          lotcode +
          "-" +
          drawdate +
          "view" +
          view
        }`;
      }
    } else {
      str =
        str +
        `<input disabled type="checkbox" class='check-box-class' id='${
          bunchDetails["bunch_id"] +
          "-" +
          lotcode +
          "-" +
          drawdate +
          "view" +
          view
        }'>
                <label class="label-with-cross" for='${
                  bunchDetails["bunch_id"] +
                  "-" +
                  lotcode +
                  "-" +
                  drawdate +
                  "view" +
                  view
                }' style='border: dotted 2px black;'>${
          bunchDetails["series_qty"]
        } 
        <span class="cross-line"></span>
        <span class="cross-line"></span></label>`;
    }
    //        if (pin_onload == 0) {
    //        if (lotteryData["draw_data"][ticketLoadDrawdate]["stockArr"][bunchDetails['series_qty']].length > 0 && checked == "checked") {
    ////            if (i == 0) {
    //            checked = "";
    ////                pinArray = bunchDetails;
    ////        }
    //        }
    //        }
  }
  return str;
}

function getTicketView(lotteryData, pin_onload) {
  let ticketDataArr = lotteryData["draw_data"][ticketLoadDrawdate].stockArr;
  // console.log(ticketDataArr);
  let drawdate = ticketLoadDrawdate;
  let tempCount = 1;
  let str = ``;
  let ticketArr = ticketDataArr[pinArray["series_qty"]];
  for (let j = 0; j < ticketArr.length; j++) {
    let marginTop = tempCount > 3 ? "mt-2" : "";
    str =
      str +
      `<div class='col-4 ${marginTop}'>
                        <div class='ticket_no_div'
                            id="${
                              ticketArr[j].ticketno.replace("/", "-") +
                              "-" +
                              lotcode +
                              "-" +
                              drawdate +
                              "-ticket_view" +
                              view
                            }"
                            onclick='selectedTicketNumber_2("${lotcode}","${drawdate}","${
        ticketArr[j].ticketno
      }",this.id,${j},${JSON.stringify(ticketArr[j])})'>
                            <h5 class="h5_text">${ticketArr[j].ticketno}</h5>
                        </div>
                </div>`;
    tempCount++;
  }
  $("#secondview_ticket_show_div").html(str);
  //    hideMoreButton(getLotcodeBaseLotteryData["draw_data"][drawdate]["offset_" + pinArray['series_qty']]);

  //    $("#moreTicketLoad").show();
  //    alert(getLotcodeBaseLotteryData["draw_data"][ticketLoadDrawdate]["stockArr"][pinArray["series_qty"]].length + "-------" + getLotcodeBaseLotteryData["draw_data"][ticketLoadDrawdate]["more_ticket"]["more_" + pinArray["series_qty"]])
  if (pin_onload != 0) {
    if (
      getLotcodeBaseLotteryData["draw_data"][ticketLoadDrawdate]["more_ticket"][
        "more_" + pinArray["series_qty"]
      ] >
      getLotcodeBaseLotteryData["draw_data"][ticketLoadDrawdate]["stockArr"][
        pinArray["series_qty"]
      ].length
    )
      $("#moreTicketLoad").show();
    else $("#moreTicketLoad").hide();
  } else {
    if (
      getLotcodeBaseLotteryData["draw_data"][ticketLoadDrawdate]["more_ticket"][
        "more_" + pinArray["series_qty"]
      ] ==
      getLotcodeBaseLotteryData["draw_data"][ticketLoadDrawdate]["stockArr"][
        pinArray["series_qty"]
      ].length
    )
      $("#moreTicketLoad").hide();
    else {
      if (ticketArr.length > 0) {
        onloadHideShowButton();
      }
    }
  }

  if (ticketArr.length == 0) {
    hideMoreButton(fixOffSetValue);
  }
  showSelectedNumber(getLotcodeBaseLotteryData);
  showSubTotalDiv_V2(getLotcodeBaseLotteryData);
}
function onloadHideShowButton() {
  var offset = setOffsetValue;
  let drawdate = ticketLoadDrawdate;
  if (getLotcodeBaseLotteryData["draw_data"].hasOwnProperty(drawdate)) {
    offset =
      getLotcodeBaseLotteryData["draw_data"][drawdate][
        "offset_" + pinArray["series_qty"]
      ] + setOffsetValue;
  }
  var param = {
    action: "LOAD_MORE_STOCK",
    lotcode: lotcode,
    drawdate: drawdate,
    lotteryid: getLotcodeBaseLotteryData["id"],
    book: pinArray["series_qty"],
    offset: offset,
  };
  console.log(param);
  loadData("add-to-cart", "REQ001", "LOTTERY_V2", param, "COMMON").then(
    (responseArr) => {
      console.log(responseArr);
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        if (responseArr["stock_data"].length > 0) {
          $("#moreTicketLoad").show();
        } else {
          $("#moreTicketLoad").hide();
        }
      }
    }
  );
}

function moreTicketLoad() {
  var offset = setOffsetValue;
  let drawdate = ticketLoadDrawdate;
  if (getLotcodeBaseLotteryData["draw_data"].hasOwnProperty(drawdate)) {
    offset =
      getLotcodeBaseLotteryData["draw_data"][drawdate][
        "offset_" + pinArray["series_qty"]
      ] + setOffsetValue;
  }

  var param = {
    action: "LOAD_MORE_STOCK",
    lotcode: lotcode,
    drawdate: drawdate,
    lotteryid: getLotcodeBaseLotteryData["id"],
    book: pinArray["series_qty"],
    offset: offset,
  };
  //INITIALLY 0 than plus 15
  //    console.log(param);
  loadData("add-to-cart", "REQ001", "LOTTERY_V2", param, "COMMON").then(
    (responseArr) => {
      // console.log(responseArr);
      var errorMessage = true;
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        var tempNewArr = getLotcodeBaseLotteryData;
        var dateCondition = true;
        if (tempNewArr["draw_data"].hasOwnProperty(drawdate)) {
          tempNewArr["draw_data"][drawdate][
            "offset_" + pinArray["series_qty"]
          ] =
            tempNewArr["draw_data"][drawdate][
              "offset_" + pinArray["series_qty"]
            ] + setOffsetValue;
          if (
            getLotcodeBaseLotteryData["draw_data"][drawdate]["more_ticket"][
              "more_" + pinArray["series_qty"]
            ] <= 0
          )
            getLotcodeBaseLotteryData["draw_data"][drawdate]["more_ticket"][
              "more_" + pinArray["series_qty"]
            ] = parseInt(responseArr["total_stock"]);
          if (responseArr["stock_data"].length > 0) {
            tempNewArr["draw_data"][drawdate].stockArr[pinArray["series_qty"]] =
              tempNewArr["draw_data"][drawdate].stockArr[
                pinArray["series_qty"]
              ].concat(responseArr["stock_data"]);
            // tempNewArr['draw_data'][drawdate].stockArr[pinArray['series_qty']] = tempNewArr['draw_data'][drawdate].stockArr[pinArray['series_qty']].filter((value, index, array) => array.indexOf(value['ticketno']) === index);
            // for(let new_stockcount=0;new_stockcount<responseArr['stock_data'].length;new_stockcount++)
            //     tempNewArr['draw_data'][drawdate].stockArr[pinArray['series_qty']].push(responseArr['stock_data'][new_stockcount])
          } else {
            errorMessage = false;
          }
        } else {
          tempNewArr["draw_data"][drawdate] = {};
          tempNewArr["draw_data"][drawdate].stockArr[pinArray["series_qty"]] =
            tempNewArr["draw_data"][drawdate].stockArr[
              pinArray["series_qty"]
            ].concat(responseArr["stock_data"]);
          // for(let new_stockcount=0;new_stockcount<responseArr['stock_data'].length;new_stockcount++)
          //     tempNewArr['draw_data'][drawdate]["stockArr"][pinArray['series_qty']].push(responseArr['stock_data'][new_stockcount])
        }
        getLotcodeBaseLotteryData["draw_data"] = tempNewArr["draw_data"];
        getTicketView(getLotcodeBaseLotteryData, pinArray["series_qty"]);
        if (errorMessage == false) {
          //                successErrorAlert("error", "No More Ticket", "No More Ticket Available");
          hideMoreButton(fixOffSetValue);
        }
      }
    }
  );
}

function hideMoreButton(offsetValue) {
  if (offsetValue == fixOffSetValue) {
    $("#moreTicketLoad").hide();
  } else {
    $("#moreTicketLoad").show();
  }
}

function getDrawDateView2(lotteryData) {
  let drawdateDataArr = lotteryData["drawdate_list"];
  let drawdateDataDisableEnableArr = lotteryData["draw_data"];
  let tempCount = 1;
  let str = ``;
  drawdateSelectedId = "";
  for (let j in drawdateDataArr) {
    let marginTop = tempCount > 4 ? "mt-2" : "";
    if (drawdateDataDisableEnableArr[drawdateDataArr[j]].disabledate == "0") {
      str =
        str +
        `<div class='col-3 ${marginTop}'>
                      <div class='ticket_no_div ${
                        ticketLoadDrawdate == drawdateDataArr[j]
                          ? "selected_drawdate"
                          : ""
                      }'
                      id="${
                        j +
                        "-" +
                        lotcode +
                        "-" +
                        drawdateDataArr[j] +
                        "-ticket_drawdate_view" +
                        view
                      }"
                       onclick="selectDrawdateView_2('${lotcode}','${
          drawdateDataArr[j]
        }',this.id,${j})">
                          <h5 class="h5_text">
                              ${beautify(
                                drawdateDataArr[j] + " " + drawtime,
                                "d/m/y"
                              )}
                          </h5>
                      </div>
                  </div>`;
      if (drawdateSelectedId == "") {
        drawdateSelectedId = `${
          j +
          "-" +
          lotcode +
          "-" +
          drawdateDataArr[j] +
          "-ticket_drawdate_view" +
          view
        }`;
      }
    } else {
      str =
        str +
        `<div class='col-3 ${marginTop}'>
                      <div class='ticket_no_div'
                      id="${
                        j +
                        "-" +
                        lotcode +
                        "-" +
                        drawdateDataArr[j] +
                        "-ticket_drawdate_view" +
                        view
                      }"
                      style='border: dotted 2px black;'>
                          <h5 class="h5_text label-with-cross">
                              ${beautify(
                                drawdateDataArr[j] + " " + drawtime,
                                "d/m/y"
                              )}
                            <span class="cross-line"></span>
                            <span class="cross-line"></span>
                            </h5>
                      </div>
                  </div>`;
    }
    tempCount++;
    ``;
  }
  return str;
}

function selectPin(bunch_id, drawdate, lotcode, id, bunchArray) {
  // console.log(bunch_id+"--"+ drawdate+"--"+ lotcode+"--"+ id)
  // console.log(bunchArray);
  let checkedBoxValue = $("#" + id).is(":checked");
  if (checkedBoxValue == true) {
    pinArray = bunchArray;
  }
  $(".check-box-class").prop("checked", false);
  $("#" + id).prop("checked", true);
  getTicketView(getLotcodeBaseLotteryData, pin_onload);
}

function selectDrawdateView_2(lotcode, drawdate, id, index) {
  // console.log(lotcode+"--"+drawdate+"--___"+id+"___--"+index);
  if (!$("#" + id).hasClass("selected_drawdate")) {
    $(".ticket_no_div").removeClass("selected_drawdate");
    $("#" + id).addClass("selected_drawdate");
  }
  if (getLotcodeBaseLotteryData["draw_data"].hasOwnProperty(drawdate)) {
    if (drawdate != ticketLoadDrawdate) {
      ticketLoadDrawdate = drawdate;
      getTicketView(getLotcodeBaseLotteryData, pin_onload);
      showSelectedNumber(getLotcodeBaseLotteryData);
      $("#show_second_view_pin").html(
        getPinningView(getLotcodeBaseLotteryData, pin_onload)
      );
      if (pinSelectedId != "") {
        $("#" + pinSelectedId).click();
        $("#" + pinSelectedId).prop("selected", true);
        pinSelectedId = "";
      }
    }
  } else {
    var param = {
      action: "LOTTERY_STOCK_DATA",
      lotcode: lotcode,
      drawdate: drawdate,
    };
    console.log(JSON.stringify(param));
    loadData("add-to-cart", "REQ001", "LOTTERY_V2", param, "COMMON").then(
      (responseArr) => {
        console.log(JSON.stringify(responseArr));
        if (responseArr.status.toUpperCase() == "SUCCESS") {
          getLotcodeBaseLotteryData["draw_data"][drawdate] =
            responseArr["lotterydetails"];
          for (let pin in getLotcodeBaseLotteryData["draw_data"][drawdate]
            .stockArr) {
            getLotcodeBaseLotteryData["draw_data"][drawdate][
              "offset_" + pin
            ] = 0;
            if (
              !getLotcodeBaseLotteryData["draw_data"][drawdate].hasOwnProperty(
                "more_ticket"
              )
            )
              getLotcodeBaseLotteryData["draw_data"][drawdate]["more_ticket"] =
                {};
            getLotcodeBaseLotteryData["draw_data"][drawdate]["more_ticket"][
              "more_" + pin
            ] = 0;
          }
          ticketLoadDrawdate = drawdate;
          getTicketView(getLotcodeBaseLotteryData, pin_onload);
          $("#show_second_view_pin").html(
            getPinningView(getLotcodeBaseLotteryData, pin_onload)
          );
          if (pinSelectedId != "") {
            $("#" + pinSelectedId).click();
            $("#" + pinSelectedId).prop("selected", true);
            pinSelectedId = "";
          }
        }
      }
    );
  }
}

function selectedTicketNumber_2(
  lotcode,
  drawdate,
  ticketNo,
  id,
  index,
  ticketDataArr
) {
  if (!getLotcodeBaseLotteryData.hasOwnProperty("selected_number_v2")) {
    getLotcodeBaseLotteryData["selected_number_v2"] = {};
  }
  if (
    !getLotcodeBaseLotteryData["selected_number_v2"].hasOwnProperty(drawdate)
  ) {
    getLotcodeBaseLotteryData["selected_number_v2"][drawdate] = {};
  }
  if (
    !getLotcodeBaseLotteryData["selected_number_v2"][drawdate].hasOwnProperty(
      pinArray["series_qty"]
    )
  ) {
    getLotcodeBaseLotteryData["selected_number_v2"][drawdate][
      pinArray["series_qty"]
    ] = {};
  }
  if (
    !getLotcodeBaseLotteryData["selected_number_v2"][drawdate][
      pinArray["series_qty"]
    ].hasOwnProperty(ticketNo)
  ) {
    getLotcodeBaseLotteryData["selected_number_v2"][drawdate][
      pinArray["series_qty"]
    ][ticketNo] = ticketDataArr;
    $("#" + id).addClass("selected_ticket_no");
  } else {
    delete getLotcodeBaseLotteryData["selected_number_v2"][drawdate][
      pinArray["series_qty"]
    ][ticketNo];
    $("#" + id).removeClass("selected_ticket_no");
  }
  showSubTotalDiv_V2(getLotcodeBaseLotteryData);
}

function showSelectedNumber(lotterydataArr) {
  if (
    lotterydataArr.hasOwnProperty("selected_number_v2") &&
    lotterydataArr["selected_number_v2"].hasOwnProperty(ticketLoadDrawdate) &&
    lotterydataArr["selected_number_v2"][ticketLoadDrawdate].hasOwnProperty(
      pinArray["series_qty"]
    )
  ) {
    for (let ticketno_key in lotterydataArr["selected_number_v2"][
      ticketLoadDrawdate
    ][pinArray["series_qty"]]) {
      $(
        "#" +
          ticketno_key.replace("/", "-") +
          "-" +
          lotcode +
          "-" +
          ticketLoadDrawdate +
          "-ticket_view" +
          view
      ).addClass("selected_ticket_no");
    }
  }
}

function showSubTotalDiv_V2(lotterydataArr) {
  var subQty = 0;
  var subTotalAmount = 0;
  gloBalSubQty = 0;
  globalSubTotalAmount = 0;
  if (lotterydataArr.hasOwnProperty("selected_number_v2")) {
    let str = `
            <div class='col-12 subtotal_class_div_1'>
                <div class='row'>
                    <div class='col-4'>
                        <h5 class='h5_text'><b>Date</b></h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class='h5_text'><b>Bunch</b></h5>
                    </div>
                    <div class='col-2 text-center'>
                        <h5 class='h5_text'><b>Qty.</b></h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class='h5_text'><b>Amount</b></h5>
                    </div>
                </div>`;
    var previOusDate = "";
    for (let dateIndex in lotterydataArr["selected_number_v2"]) {
      previOusDate = dateIndex;
      let dateObjectArray = lotterydataArr["selected_number_v2"][dateIndex];
      for (let pinIndex in dateObjectArray) {
        let pinObjectArr = dateObjectArray[pinIndex];
        for (let ticketNo_Key in pinObjectArr) {
          if (previOusDate != "") {
            previOusDate = beautify(previOusDate + " " + drawtime, "d/m/y");
          }
          str =
            str +
            `<div class='row'>
                    <div class='col-4 text-center'>
                        <h5 class='${
                          previOusDate == "" ? "" : "h5_v2_"
                        }'>${previOusDate}</h5>
                    </div>
                    <div class='col-3 text-center' style="background: #212529;border-radius: 10px;padding-top: 5px;height: 29px;color:white;padding-left: 10px;">
                        <h5 style="font-size: 15px;"><nobr>${ticketNo_Key}</nobr></h5>
                    </div>
                    <div class='col-2 text-center'>
                        <h5 class='h5_v2_'>${
                          pinObjectArr[ticketNo_Key]["qty"]
                        }</h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class='h5_text_color'><span style='font-size:0.8rem;position: relative;left:3px;'>${mrpSymbol}</span>
                        ${pinObjectArr[ticketNo_Key]["qty"] * mrp * pinIndex}
                        </h5>
                    </div>
                    </div>`;
          previOusDate = "";
          subTotalAmount =
            subTotalAmount + pinObjectArr[ticketNo_Key]["qty"] * mrp * pinIndex;
          subQty = subQty + parseInt(pinObjectArr[ticketNo_Key]["qty"]);
        }
      }
    }
    gloBalSubQty = subQty;
    globalSubTotalAmount = subTotalAmount;
    str =
      str +
      `<div class='row'>
                    <div class='col-4 cart-top-border ml-3'>
                        <h5 class='h5_text h5_text_color' style='font-weight:bold;'>Sub Total</h5>
                    </div>
                    <div class='col-2 text-center cart-top-border'>
                        <h5 class='h5_text'><b></b></h5>
                    </div>
                    <div class='col-5 text-right cart-top-border'>
                        <h5 class='h5_text h5_text_color'>
                            <span style='font-size:0.8rem;position: relative;left:3px;'>
                                ${mrpSymbol}
                            </span>
                            <b><span id="V_subtotalAmount_${view}">${subTotalAmount}</span></b>
                        </h5>
                    </div>
            </div>`;
    str = str + `</div>`;
    if (subTotalAmount > 0) {
      $("#showSubtotalDetails_V" + view).html(str);
    } else {
      $("#showSubtotalDetails_V" + view).html("");
    }
  } else {
    $("#showSubtotalDetails_V" + view).html("");
  }
  getCourierCharge(subTotalAmount);
}

function resetSecondView() {
  prevTicketStr = ``;
}
