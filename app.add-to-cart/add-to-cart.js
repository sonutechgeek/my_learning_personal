var user = getuserdata();
var lotname = "";
var lotcode = "";
var drawdate = "";
var drawtime = "";
var mrp = "";
var salestop = "";
var myorder = "";
var remark = "";
var bunchdetails = "";
var globalSubTotalAmount = 0;
var gloBalSubQty = 0;
var shopcart = {
  view1: [],
  view2: [],
};
var promoStr = "";
var promo2 = "";
var status = "";
var str = ``;
var showDataArr = [];
var strData = "";
var virtualTicket = "";
couriesrRadioButton == true;
var view = 1;
var ticketLoadDrawdate = "";
var prevTicketStr = "";
$("document").ready(() => {});
status = OBJ.actionevent.status || 0;
lotcode = OBJ.actionevent.data.lotcode || "";
lotteryId = OBJ.actionevent.data.id || "";
virtualTicket = "N";
getLotteryDetails(lotcode, lotteryId);
var getLotcodeBaseLotteryData = "";
$(window).scrollTop(0);
function switchEvent(action, divId) {
  if (action.toLowerCase() == "false") {
    view = 1;
  } else {
    view = 0;
  }
  $(".common_checkbox_div").removeClass("check_box_div");
  $(".common_checkbox_div").addClass("uncheck_box_div");
  $("#" + divId).removeClass("uncheck_box_div");
  $("#" + divId).addClass("check_box_div");
  switchViewData(view);
}

function getLotteryDetails(lotcode, lotteryId) {
  let param = {
    action: "LOTTERY_DATA",
    lotcode: lotcode,
    lottery_id: lotteryId,
  };
  //console.log("add-to-cart", JSON.stringify(param));
  loadData("add-to-cart", "REQ001", "LOTTERY_V2", param, "COMMON").then(
    (responseArr) => {
      //console.log("responseArr responseArr", responseArr);
      //console.log("add-to-cart responseArr", JSON.stringify(responseArr));
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        getLotcodeBaseLotteryData = responseArr["lotterydetails"];
        modifyLotteryData(getLotcodeBaseLotteryData);
        lotname =
          getLotcodeBaseLotteryData.displayname ||
          OBJ.actionevent.data.displayname;
        mrp = getLotcodeBaseLotteryData.mrp || OBJ.actionevent.data.mrp;
        drawdate =
          getLotcodeBaseLotteryData["drawdate_list"][0] ||
          OBJ.actionevent.data.drawdate;
        drawtime =
          getLotcodeBaseLotteryData["draw_data"][drawdate].drawtime ||
          OBJ.actionevent.data.drawtime;
        salestop =
          getLotcodeBaseLotteryData["draw_data"][drawdate].salestopdate ||
          OBJ.actionevent.data.salestopdate;
        ticketLoadDrawdate = drawdate;
        viewAllLotteryImageCrousel(getLotcodeBaseLotteryData);
        showLotteryDetail(getLotcodeBaseLotteryData);
        switchViewData(view);
      } else {
        successErrorAlert("error", "Error", responseArr.message);
        loadComponent("home", "REQ002");
      }
    }
  );
}

function viewAllLotteryImageCrousel(lotteryDataArray) {
  if (
    lotteryDataArray.hasOwnProperty("lottery_images") &&
    lotteryDataArray["lottery_images"].length > 0
  ) {
    console.log(lotteryDataArray["lottery_images"]);
    str = `<div id='add_to_cart_Carousel' class='carousel slide feature_p_slider' data-ride='carousel' style='max-width:100%;'>`;
    let str1 = "";
    var loopCount = 0;
    for (let i = 0; i < lotteryDataArray["lottery_images"].length; i++) {
      if (i == 0) {
        str1 =
          str1 +
          ` <div class = "item active">
                        <img class="img-fluid" id='main-img-${i}' style="height: 400px;width:100%;cursor:pointer" src="${lotteryDataArray["lottery_images"][i].image_url}"  alt="${i}">
                    </div>`;
      } else {
        str1 =
          str1 +
          ` <div class = "item">
                        <img class="img-fluid" id='main-img-${i}' style="height: 400px;width:100%;cursor:pointer" src="${lotteryDataArray["lottery_images"][i].image_url}"  alt="${i}">
                    </div>`;
      }
      loopCount++;
    }

    str = str + "" + str1 + `</div>`;
    $("#cart_Carousel_cart").html(str);
    $("#add_to_cart_Carousel").owlCarousel({
      items: 1,
      autoplay: true,
      autoplayTimeout: 5000,
      loop: loopCount > 1 ? true : false,
      nav: false,
      navText: ["", ""],
      responsive: {
        500: {
          items: 1,
        },
      },
      dots: true,
    });
  } else {
    $("#cart_Carousel_cart").hide();
  }
}

function showLotteryDetail(lotteryDataArray) {
  let lotnameArr = lotname.split(" ");
  let lotNameString1 = "";
  let lotNameString2 = "";
  let lotNameString = "";
  var timerInstance = new Timer();
  if (lotnameArr.length > 0) {
    for (let i = 0; i < lotnameArr.length; i++) {
      if (i < 3) lotNameString1 = lotNameString1 + " " + lotnameArr[i];
      else lotNameString2 = lotNameString2 + " " + lotnameArr[i];
    }
    lotNameString =
      "<span class='lontname1'>" +
      lotNameString1.trim() +
      "</span>" +
      " <span>" +
      lotNameString2.trim() +
      "</span>";
  } else {
    lotNameString = lotnameArr[0];
  }
  var saleStopArr = salestop.split(" ");
  var timeString = saleStopArr[1].split(":");
  var saleStopString =
    saleStopArr[0] + "-" + timeString[0] + "-" + timeString[1];
  let str = `<div class='row mt-4'>
        <div class='col-6'>
            <div class='row ml-2' style="line-height: 1.5;">
                <div class='col-12 text-align-ment'>
                    <h4 class='text_color text_size'>${lotNameString}</h4>
                </div>
            </div>
            <div class='row ml-2'>
                <div class='col-12 text-align-ment'>
                    <h6 class='text_color'><nobr>Ticket Price ${mrpSymbol}<span style='font-size:18px;font-weight:500;font-family: sans-serif;'>${mrp}</span></nobr></h6>
                </div>
            </div>
        </div>
        <div class='col-6'>
           <div class='row mt-1'>
                <div class='col-6'></div>
                <div class='col-4 text-align-ment how-to-play-div' data-toggle="modal" onclick="howToPlay()">
                    <nobr><h6 style="margin-top: 5px; cursor: pointer;" class="font-weight-bold">Info</h6></nobr>
                </div>
                <div class='col-2'></div>
           </div>
        </div>
    </div>
    <div class='row'>
            <div class='col-1'></div>
            <div class='col-9'>
                <div class='row'>
                    <div class='col-6'>
                        <nobr><span class='text_color text_size'>Draw Date : ${beautify(
                          drawdate + " " + drawtime,
                          "d/m/y"
                        )}</span></nobr>
                    </div>
                    <div class='col-1'>
                        <h4 style="color:#a21c1c;font-weight: bolder;">|</h4>
                    </div>
                    <div class='col-5'>
                        <nobr><span class='text_color text_size'>Draw Time : ${beautify(
                          drawdate + " " + drawtime,
                          "h:i a"
                        )}</span></nobr>
                    </div>
                </div>
            </div>
           <div class='col-2'></div>
    </div>`;
  /*<div class='col-1'> <div class='timer_div_'><span class='timer_'>${days}</span> <br/><span class='time_1'>Day's</span></div></div><div class='col-1 collon_circle_timer'><span>:</span></div>
     <div class='col-1'> <div class='timer_div_'><span class='timer_'>${10}</span> <br/><span class='time_1'>Hours</span></div></div><div class='col-1 collon_circle_timer'><span>:</span></div>
     <div class='col-1'> <div class='timer_div_'><span class='timer_'>${34}</span> <br/><span class='time_1'>Mins</span></div></div><div class='col-1 collon_circle_timer'><span>:</span></div> 
     <div class='col-1'> <div class='timer_div_'><span class='timer_'>${10}</span> <br/><span class='time_1'>Secs</span></div></div>
     */
  // <div class='row font-weight-bold'
  // style="font-size: 14px;justify-content: center;" id='card-timer-${lotcode + "-" + drawdate}-circle'>
  // ${timerInstance.getTimer(drawdate + " " + drawtime, lotcode + "-" + drawdate + "-" + "circle", "circle")}
  // </div>
  $("#showLotteryDetail").html(str);

  str = `<div class='row mt-4'>
        <div class='col-12'>
            <div class='row' style="border: 2px solid #212529;border-radius: 5px;">
                <div class='common_checkbox_div text-center ${
                  view == "0" ? "check_box_div" : "uncheck_box_div"
                }' id="view_div_0" onclick="switchEvent('true',this.id)">
                    <h4>Choose Quantity</h4>
                </div>
                <div class='common_checkbox_div text-center ${
                  view == "1" ? "check_box_div" : "uncheck_box_div"
                }' id="view_div_1" onclick="switchEvent('false',this.id)">
                    <h4>Choose Ticket Number</h4>
                </div>
            </div>
        </div>
    </div>
    <div class='row mt-3'>
        <div class='col-5 text-right'>
            <h4 class='mt-2 text_color'>Sale closes in</h4>
        </div>
        <div class='col-7'>
            <div class='row font-weight-bold'
             style="font-size: 14px;justify-content: center;" id='card-timer-${
               lotcode + "-" + saleStopString
             }-circle'>
                ${timerInstance.getTimer(
                  salestop,
                  lotcode + "-" + saleStopString + "-" + "circle",
                  "circle"
                )}
             </div>
        </div>
    </div>
    <div id="shoCommonTotal_Div"></div>`;
  $("#showLotteryDetail_1").html(str);
  showSubtotalDetailsView();
}

function showSubtotalDetailsView() {
  if (view == 0)
    $("#shoCommonTotal_Div").html(
      `<div class='row mt-3' id='showSubtotalDetails_${view}'></div>`
    );
  else
    $("#shoCommonTotal_Div").html(
      `<div class='row row mt-3' id="showSubtotalDetails_V${view}"></div>`
    );
  //    $("#shoCommonTotal_Div").html(`<div class='row row mt-3' id="showSubtotalDetails_V${view}" style="padding-left: 2.5vh;padding-right: 2.5vh;"></div>`);
}

function showLotteryData(view, lotteryDataArray) {
  let drawdate = lotteryDataArray["drawdate_list"][0];
  let str = `<div class='row mt-2'>
        <div class='col-1'></div>
        <div class='col-10'>
            <div class='row cart-bottom-border'>
                <div class='col-4 text-left'>
                    <h4 class="font-weight-bold h4_text">*Bunch</h4>
                </div>
                <div class='col-4 text-center'>
                    <h4 class="font-weight-bold h4_text">Quantity</h4>
                </div>    
                <div class='col-4 text-right'>
                    <h4 class="font-weight-bold h4_text">Total</h4>
                </div>
            </div>    
        </div>
        <div class='col-1'></div>
    </div><div id='showBunchDetails_div_${lotcode}'></div>`;

  //    str = str + `<div class='row mt-4'><div class='col-1'></div>
  //            <div class='col-10 ml-2'>
  //                <div class='row'>
  //                    <h4 class="h4_text">
  //                        #Customer Preference
  //                    </h4>
  //                </div>
  //                <div class='row'>
  //                        <textarea class='customer-cart-remark' onkeypress="return KeyPressHandler('ALPHA', event, '')"
  //                        oninput="return RegularExpHandler('ALPHASPACE',this.id,'')"
  //                        placeholder="Enter Message"
  //                        id='${lotcode + "-" + drawdate + "-customer_message"}'></textarea>
  //                </div>
  //            </div>
  //            <div class='col-1'></div>
  //            </div>`;
  // onchange='addRemark(${JSON.stringify(lotteryDataArray['bunchdetails'])},this.id)'
  let drawTimerDiv = drawTimerUI(view, lotteryDataArray);
  str = str + drawTimerDiv;
  $("#showLotteryData").html(str);
  bookDetailDiv(lotteryDataArray, "");
  showSubtotalDetailsView();
}

function bookDetailDiv(lotteryDataArray, textId) {
  let str = ``;
  for (let i = 0; i < lotteryDataArray["bunchdetails"].length; i++) {
    let lotteryBunchDetails = lotteryDataArray["bunchdetails"][i];
    if (
      lotteryBunchDetails.hasOwnProperty("selected_qty") &&
      lotteryBunchDetails["selected_qty"] > 0
    ) {
      var addButton = qtyDiv(
        lotteryBunchDetails["bunch_id"],
        lotcode,
        drawdate,
        JSON.stringify(lotteryBunchDetails),
        i
      );
    } else {
      var addButton = addButtonDiv(
        lotteryBunchDetails["bunch_id"],
        lotcode,
        drawdate,
        JSON.stringify(lotteryBunchDetails),
        i
      );
    }
    str =
      str +
      `<div class='row mt-2'>
            <div class='col-1'></div>
            <div class='col-10'>
                <div class='row cart-bottom-border'>
                    <div class='col-4 text-left pl-4'>
                            <h4 class="h4_text"><nobr>${
                              lotteryBunchDetails["series_qty"]
                            }/${lotteryBunchDetails["qty"]}</nobr></h4>
                    </div>
                    <div class='col-4 text-center'>
                        <div class='row' id="${
                          lotteryBunchDetails["bunch_id"] +
                          "-" +
                          lotcode +
                          "-" +
                          drawdate
                        }-cart-row">
                                ${addButton}
                        </div>
                    </div>
                    <div class='col-4 text-right pr-4'>
                            <h4 class="h4_text">
                            <span style='font-size:0.8rem;position: relative;left:3px;'>${mrpSymbol}</span><span clas='common_cart_amount' id="${
        lotteryBunchDetails["bunch_id"] + "-" + lotcode + "-" + drawdate
      }-cart_amount">
                            ${
                              mrp *
                              lotteryBunchDetails["series_qty"] *
                              lotteryBunchDetails["selected_qty"]
                            }
                            </span></h4>
                    </div>
                </div>    
            </div>
            <div class='col-1'></div>
        </div>`;
  }
  $("#showBunchDetails_div_" + lotcode).html(str);
  setAnimation(textId);
}

function addButtonDiv(bunchId, lotcode, drawdate, dataArr, index) {
  let selectedQty = 0;
  let str = `<div class='col-12'>
                <div class="add-button-buy button-buy common-button--greip add-button--greip pt-1" id="${
                  bunchId + "-" + lotcode + "-" + drawdate + "-add"
                }"
                 onclick='incremenetQtyV1(${bunchId} , ${lotcode} , ${drawdate},this.id,${dataArr},"plus",${selectedQty},${index})'
                 >
                <h4 class='h5-add-text'>Add</h4></div>
            </div>`;
  return str;
}

function qtyDiv(bunchId, lotcode, drawdate, dataArr, index) {
  let tempDataArr = JSON.parse(dataArr);
  let str = `<div class='col-12'>
                <div class='incremenet_decremenet_div row pt-1' id="${
                  bunchId +
                  "-" +
                  lotcode +
                  "-" +
                  drawdate +
                  "-increment_decrement"
                }">
                    <div class='col-4' id="dec_${
                      bunchId + "_" + lotcode
                    }"  onclick='incremenetQtyV1(${bunchId} , ${lotcode} , ${drawdate},"${
    lotcode + "-" + drawdate + "-" + bunchId + "_qtyV1"
  }",${dataArr},"minus",${
    tempDataArr["selected_qty"]
  },${index})' style='cursor:pointer'>
                        ${
                          tempDataArr["selected_qty"] == 1
                            ? `<i class="fa fa-trash-o"
                        style="font-size: 17px;position: relative;bottom: 2px;color: #a21c1c;font-weight: 600;"></i>`
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
                      bunchId + "_" + lotcode
                    }" onclick='incremenetQtyV1(${bunchId} , ${lotcode} , ${drawdate},"${
    lotcode + "-" + drawdate + "-" + bunchId + "_qtyV1"
  }",${dataArr},"plus",${
    tempDataArr["selected_qty"]
  },${index})' style='cursor:pointer'>
                        <i class="fa fa-plus" style="position: relative;bottom: 2px;"></i>
                    </div>
                </div>
            </div>`;
  return str;
}

function incremenetQtyV1(
  bunchId,
  lotcode,
  drawdate,
  id,
  dataArr,
  action,
  qty,
  index
) {
  var textId = "";
  if (action.toLowerCase() == "plus") {
    getLotcodeBaseLotteryData["bunchdetails"][index]["selected_qty"] = qty + 1;
    textId = "inc_" + bunchId + "_" + lotcode;
  } else {
    getLotcodeBaseLotteryData["bunchdetails"][index]["selected_qty"] = qty - 1;
    textId = "dec_" + bunchId + "_" + lotcode;
  }
  bookDetailDiv(getLotcodeBaseLotteryData, textId);
  showSubTotalDiv(getLotcodeBaseLotteryData);
}

function setAnimation(textId) {
  if (textId != "") {
    $("#" + textId).addClass("pressed");
    setTimeout(function () {
      $("#" + textId).removeClass("pressed");
    }, 150);
  }
}

function drawTimerUI(view, lotteryDataArray) {
  let str = `<div class='row mt-4'><div class='col-1'></div>
        <div class='col-10'>
        <div class='row'>
            <h4 class='ml-0 h4_text'>
                <b>Which days you would like to play?</b>
            </h4>
        </div>
        <div class='row'>`;
  //Which days you would like to play?
  // console.log(lotteryDataArray);
  let drawtime = lotteryDataArray["draw_data"][drawdate].drawtime;
  for (let i = 0; i < lotteryDataArray["drawdate_list"].length; i++) {
    let checkMark = "";
    if (i == 0) {
      checkMark = "checked";
    }
    // let drawdate = lotteryDataArray['draw_stock'][i].drawdate;
    let drawdate = lotteryDataArray["drawdate_list"][i];
    str =
      str +
      `<div class='col-4 ${i > 2 ? "mt-1" : ""}'>
                <label class="checkbox_level">
                    ${beautify(drawdate + " " + drawtime, "d/m/y")}
                    <input type="checkbox" ${checkMark} id="${
        drawdate + "-" + lotcode + "-view" + view
      }" onclick=selectDrawdate('${drawdate}','${lotcode}',${view},this.id)>
                    <span class="checkmark"></span>
                </label>
            </div>`;
  }
  str =
    str +
    `</div>
    </div>
    <div class='col-1'></div>
    </div>
    <div class='row mt-1'>
        <div class='col-1'></div>
        <div class='col-10 cart-bottom-border'>&nbsp;</div>
        <div class='col-1'></div>
    </div>
    
    <div class='row mt-4'><div class='col-1'></div>
            <div class='col-10 ml-2'>
                <div class='row'>
                    <h4 class="h4_text">
                        #Customer Preference
                    </h4>
                </div>
                <div class='row'>
                        <textarea class='customer-cart-remark' onkeypress="return KeyPressHandler('ALPHANUMCHAR', event, ' ')" 
                        oninput="return RegularExpHandler('ALPHANUMCHAR',this.id,' ')"
                        placeholder="Enter Message"
                        id='${
                          lotcode + "-" + drawdate + "-customer_message"
                        }'></textarea>
                </div>
            </div>
            <div class='col-1'></div>
            </div>
    
    ${showCommonDiv(view)}`;
  return str;
}

function showCommonDiv(view) {
  let str = `<div class='row mt-2'>
        <div class='col-1'></div>
        <div class='col-10'>
            <div class='row' style='text-align:center'>
                <h5 id="shipingFreeMessage${view}" style='display:none;'>
                    <nobr>*Congrats, Your order is eligible for Free Shipping.</nobr>
                </h5>
            </div> 
            <div class='row' style='text-align:center'>
                <div class='col-1'></div>
                <div class='col-5'>
                    <button class="button-mim button--mimas add-to-cart-color" onclick="addCardButton('${view}','${lotcode}')">
                        <label style='cursor: pointer;'><nobr><i class="fa fa-shopping-cart" style="padding-right:2px;" aria-hidden="true"></i>
                        <span style="font-size:1.2rem;">Add to Cart</span></nobr></label>
                    </button>
                </div>
                <div class='col-5 text-left'>
                    <button onclick="addBuyButton('${view}','${lotcode}')" class="button-buy common-button--greip button--greip buy-cart-color">
                        <lavel><i class="fa fa-paper-plane" style="padding-right:5px;" aria-hidden="true"></i> 
                        <span style="font-size:1.2rem;">Buy</span></lavel>
                    </button>
                </div>
                <div class='col-1'></div>
            </div>
            <div class='row mt-3' style="margin-bottom:20%;">
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
        <div class='col-1'></div>
    </div>`;
  return str;
}

function switchViewData(view) {
  globalSubTotalAmount = 0;
  gloBalSubQty = 0;
  $(".show_div_view").hide();
  $("#show_div_view-" + view).show();
  if (view == 0) {
    $("#showLotteryData_v2").html("");
    showLotteryData(view, getLotcodeBaseLotteryData);
    selectedDrawdate(getLotcodeBaseLotteryData);
    showSubTotalDiv(getLotcodeBaseLotteryData);
  } else {
    resetSecondView();
    $("#showLotteryData").html("");
    secondViewLotteryData(getLotcodeBaseLotteryData);
  }
}

function selectDrawdate(drawdate, lotcode, view, id) {
  if (getLotcodeBaseLotteryData["selected_drawdate_v1"].length > 0) {
    if ($("#" + id).is(":checked")) {
      getLotcodeBaseLotteryData["selected_drawdate_v1"].push(drawdate);
    } else {
      getLotcodeBaseLotteryData["selected_drawdate_v1"] =
        getLotcodeBaseLotteryData["selected_drawdate_v1"].filter(
          (e) => e !== drawdate
        );
    }
  } else {
    getLotcodeBaseLotteryData["selected_drawdate_v1"].push(drawdate);
  }
  showSubTotalDiv(getLotcodeBaseLotteryData);
}

function modifyLotteryData(lotterydataArr) {
  let updateBunchArr = lotterydataArr["bunchdetails"];
  for (let index in updateBunchArr) {
    updateBunchArr[index]["selected_qty"] = 0;
  }
  getLotcodeBaseLotteryData["bunchdetails"] = updateBunchArr;
  getLotcodeBaseLotteryData["selected_drawdate_v1"] = [];
  getLotcodeBaseLotteryData["remark"] = "";
  for (let date_index in getLotcodeBaseLotteryData["drawdate_list"]) {
    for (let pin in getLotcodeBaseLotteryData["draw_data"][
      getLotcodeBaseLotteryData["drawdate_list"][date_index]
    ].stockArr) {
      getLotcodeBaseLotteryData["draw_data"][
        getLotcodeBaseLotteryData["drawdate_list"][date_index]
      ]["offset_" + pin] = 0;
      if (
        !getLotcodeBaseLotteryData["draw_data"][
          getLotcodeBaseLotteryData["drawdate_list"][date_index]
        ].hasOwnProperty("more_ticket")
      )
        getLotcodeBaseLotteryData["draw_data"][
          getLotcodeBaseLotteryData["drawdate_list"][date_index]
        ]["more_ticket"] = {};
      getLotcodeBaseLotteryData["draw_data"][
        getLotcodeBaseLotteryData["drawdate_list"][date_index]
      ]["more_ticket"]["more_" + pin] = 0;
    }
    if (date_index == 0) {
      getLotcodeBaseLotteryData["selected_drawdate_v1"].push(
        getLotcodeBaseLotteryData["drawdate_list"][0]
      );
    }
  }
}

function showSubTotalDiv(lotterydataArr) {
  var subQty = 0;
  var subTotalAmount = 0;
  if (
    lotterydataArr.hasOwnProperty("selected_drawdate_v1") &&
    lotterydataArr["selected_drawdate_v1"].length > 0
  ) {
    let str = `
            <div class='col-12 subtotal_class_div'>
                <div class='row'>
                    <div class='col-3'>
                        <h5 class='h5_text h5_text_color'><b>Date</b></h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class='h5_text h5_text_color'><b>Bunch</b></h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class='h5_text h5_text_color'><b>Qty.</b></h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class='h5_text h5_text_color'><b>Amount</b></h5>
                    </div>
                </div>`;
    var previOusDate = "";
    for (let index in lotterydataArr["selected_drawdate_v1"]) {
      previOusDate = lotterydataArr["selected_drawdate_v1"][index];
      for (let i in lotterydataArr["bunchdetails"]) {
        if (lotterydataArr["bunchdetails"][i].selected_qty < 1) {
          continue;
        }
        if (previOusDate != "") {
          previOusDate = beautify(previOusDate + " " + drawtime, "d/m/y");
        }
        str =
          str +
          `<div class='row'>
                    <div class='col-3'>
                        <h5>${previOusDate}</h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class="h5_text_color">${
                          lotterydataArr["bunchdetails"][i].series_qty
                        }</h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class="h5_text_color">${
                          lotterydataArr["bunchdetails"][i].selected_qty
                        }</h5>
                    </div>
                    <div class='col-3 text-center'>
                        <h5 class="h5_text_color"><span style='font-size:0.8rem;position: relative;left:3px;'>${mrpSymbol}</span>
                        ${
                          lotterydataArr["bunchdetails"][i].selected_qty *
                          lotterydataArr["bunchdetails"][i].series_qty *
                          mrp
                        }
                        </h5>
                    </div>
                </div>`;
        previOusDate = "";
        subTotalAmount =
          subTotalAmount +
          lotterydataArr["bunchdetails"][i].selected_qty *
            lotterydataArr["bunchdetails"][i].series_qty *
            mrp;
        subQty = subQty + lotterydataArr["bunchdetails"][i].selected_qty;
      }
    }
    gloBalSubQty = subQty;
    str =
      str +
      `<div class='row'>
                    <div class='col-4 cart-top-border ml-3'>
                        <h5 class='h5_text h5_text_color' style='font-weight:bold;'>Sub Total</h5>
                    </div>
                    <div class='col-2 text-center cart-top-border'>
                        <h5 class='h5_text h5_text_color'><b></b></h5>
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
      $("#showSubtotalDetails_" + view).html(str);
    } else {
      $("#showSubtotalDetails_" + view).html("");
    }
  } else {
    $("#showSubtotalDetails_" + view).html("");
  }
  getCourierCharge(subTotalAmount);
}

function selectedDrawdate(lotteryData) {
  if (lotteryData["selected_drawdate_v1"].length > 0) {
    for (let key in lotteryData["selected_drawdate_v1"]) {
      // console.log("#"+lotteryData["selected_drawdate_v1"][key]+"-"+lotcode+"-view"+view);
      $(
        "#" +
          lotteryData["selected_drawdate_v1"][key] +
          "-" +
          lotcode +
          "-view" +
          view
      ).prop("checked", true);
    }
  }
}
