$("#n").show();
$("#footer1").show();
var imagecount = 0;
var length = 0;
var ticket_counter = 0;
var prevTicketStr = ``;
var prevTicketStr_L = ``;
var colorCodeIndex = 0;
user = getuserdata();
$(document).ready(() => {
  if (
    directComponettoLoad != "" &&
    directComponettoLoad != null &&
    directComponettoLoad != undefined &&
    user != null &&
    user != undefined
  ) {
    $("#overlay, #navbarNav, .footer").hide();
    loadComponent(directComponettoLoad, "REQ002");
  }
  $("#view-all-lottery").on("click", function () {
    $(".footer").hide();
    loadComponent("lottery", "REQ002");
  });
  var selected_carousel = localStorage.getItem("selected_carousel") || "bumper";
  if (selected_carousel === "bumper") {
    $("#div_bumper_lottery").css("order", "3");
    $("#div_upcommin_lottery").css("order", "1");
  } else {
    $("#div_bumper_lottery").css("order", "1");
    $("#div_upcommin_lottery").css("order", "3");
  }
  $("#switch-button").on("click", function () {
    $("#switch-button").addClass("fade-out");
    const bumperLottery = $("#div_bumper_lottery");
    const upcomingLottery = $("#div_upcommin_lottery");
    if (selected_carousel === "bumper") {
      localStorage.setItem("selected_carousel", "upcoming");
      selected_carousel = "upcoming";
    } else {
      localStorage.setItem("selected_carousel", "bumper");
      selected_carousel = "bumper";
    }
    bumperLottery.addClass("fade-out flip");
    upcomingLottery.addClass("fade-out flip");
    setTimeout(() => {
      if (
        bumperLottery.css("order") === "1" ||
        bumperLottery.css("order") === "0"
      ) {
        bumperLottery.css("order", "3");
        upcomingLottery.css("order", "1");
      } else {
        bumperLottery.css("order", "1");
        upcomingLottery.css("order", "3");
      }
      $("#switch-button").removeClass("fade-out").addClass("fade-in");
      bumperLottery.removeClass("fade-out flip").addClass("fade-in");
      upcomingLottery.removeClass("fade-out flip").addClass("fade-in");
    }, 500);

    setTimeout(() => {
      bumperLottery.removeClass("fade-in");
      upcomingLottery.removeClass("fade-in");
    }, 1000);
  });
  $("#chatWithUsBtn").click(function () {
    const phoneNumber = "9137773732";
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, "_blank");
  });
  $("#emailUsBtn").click(function () {
    const email = "help@myrajshree.com";
    const mailtoURL = `mailto:${email}`;
    window.location.href = mailtoURL;
  });
});
directComponettoLoad = "";
top_carosel();
getMessageCount();
var timerInstance = new Timer();
loadHomeScreen_All_Lottery();
middel_carosel();
loginProfileSection();

function top_carosel() {
  var param = {
    action: "GET_BANNER",
    doctype: "HomeScreen1",
    apptype: "ILDLWEB",
  };
  var path = "app.static/promo/";
  loadData("home", "REQ001", "LOTTERY_V2", param, "COMMON").then(
    (responseArr) => {
      var promoStr =
        "<div id='home_Carousel' class='carousel slide feature_p_slider' data-ride='carousel' style='max-width:100%; margin: auto;'>";
      var promo = "";
      var promo1 = "";
      var promo2 = "";
      var lotarrlength = 0;
      let buy_butn = "";
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        lotarrlength = responseArr.data.length;
        for (var i = 0; i < lotarrlength; i++) {
          var src = path;
          var eventfunction = "";
          let is_show_buy_now = false;
          if (parseInt(responseArr.data[i].is_show_buynow) === 1) {
            is_show_buy_now = true;
          }
          if (
            responseArr.data[i].linked_path_name != "" &&
            responseArr.data[i].linked_path_name != "none" &&
            responseArr.data[i].linked_path != ""
          ) {
            eventfunction = `componentFunctiont("${responseArr.data[i].linked_path_name}","${responseArr.data[i].linked_path_lotcode}","${responseArr.data[i].linked_path_drawdate}","${responseArr.data[i].linked_path}");`;
          }
          src += responseArr.data[i].image;
          promo2 = `${promo2}<div class="item cursor-pointer" onclick='${eventfunction} captureClicks("9", "", "");'><img src="${src}" alt="${i} Image" style='height:440px;width:100%'>
                    <div style="position:absolute; bottom:40px; left: 80%;">
                ${
                  is_show_buy_now
                    ? `<button class="home-button--greip home-common-button--greip home-buy-cart-color home-button-buy" "id="buy_btn"><span><i class="fa fa-paper-plane" aria-hidden="true"></i> Buy Now</span></button>`
                    : ""
                }</div>
                </div>`;
        }
      }
      promoStr = promoStr + promo + "" + promo1 + promo2 + "";
      promoStr = `${promoStr}</div>`;
      var isMulti = lotarrlength > 1 ? true : false;
      $("#home_top_carosel").html(promoStr);
      $("#home_Carousel").owlCarousel({
        center: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        loop: isMulti,
        margin: 1,
        dots: true,
        nav: false,
      });
    }
  );
}

function showCart(lotto) {
  param = {
    data: lotto,
    flag: true,
  };
  loadComponent("add-to-cart", "REQ002", param);
}

function loadHomeScreen_All_Lottery() {
  let param = {
    brand: "PL",
    state: "ME",
    app: "PLPWA",
    action: "HOME_SCREEN",
  };
  loadData("home", "REQ001", "LOTTERY_V2", param, "COMMON").then(
    (responseArr) => {
      console.log("responseArr lottery",responseArr);
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        lotteryDataArr = responseArr;
        if (
          lotteryDataArr["lotterydetails"].hasOwnProperty("SPECIAL_LOTTERY")
        ) {
          bumperAttraction(lotteryDataArr["lotterydetails"]);
          console.log("lotteryDataArr[lotterydetails] bumperAttraction",lotteryDataArr["lotterydetails"]);
          
        }
        if (
          lotteryDataArr["lotterydetails"].hasOwnProperty(
            "UPCOMMING_ATTRACTIONS"
          )
        ) {
          upcommingAttraction(lotteryDataArr["lotterydetails"]);
          console.log("lotteryDataArr[lotterydetails] upcommingAttraction",lotteryDataArr["lotterydetails"]);

        }
      }
    }
  );
}
function bumperAttraction(lotteryDataArr) {
  let str = `<div id='bumper-attraction_Carousel' class='carousel slide feature_p_slider home-mid-uptraction-crousal' data-ride='carousel' style='max-width:94%; margin: auto;'>`;
  if (lotteryDataArr["SPECIAL_LOTTERY"].length > 0) {
    for (let i = 0; i < lotteryDataArr["SPECIAL_LOTTERY"].length; i++) {
      str += upCommingCard(
        i,
        lotteryDataArr["SPECIAL_LOTTERY"][i],
        upColorCode[colorCodeIndex],
        downColorCode[colorCodeIndex],
        colorCodeIndex
      );
      colorCodeIndex++;
      if (colorCodeIndex > upColorCode.length - 1) {
        colorCodeIndex = 0;
      }
    }
    str = str + `</div>`;
    $("#shop-lottery-page-bumper").html(str);
    $("#bumper-attraction_Carousel").owlCarousel({
      center: false,
      // items: 4,
      autoplay: true,
      autoplayTimeout: 5000,
      loop: true,
      nav: true,
      navText: [
        "<i style='font-size:30px;' class='fa fa-chevron-circle-left'></i>",
        "<i style='font-size:30px;' class='fa fa-chevron-circle-right'></i>",
      ],
      dots: false,
      responsiveClass: true,
      responsive: {
        0: { items: 1.01 },
        570: { items: 1.5 },
        630: { items: 1.75 },
        800: { items: 2 },
        900: { items: 2 },
        930: { items: 3 },
        1130: { items: 3 },
        1315: { items: 4 },
        1400: { items: 4 },
        1600: { items: 4 },
        1700: { items: 4 },
        1900: { items: 5 },
        2200: { items: 6 },
        2500: { items: 7 },
      },
    });
  }
}

function upcommingAttraction(lotteryDataArr) {
  let str = `<div id='upcoming-attraction_Carousel' class='carousel slide feature_p_slider home-mid-uptraction-crousal' data-ride='carousel' style='max-width:94%; margin: auto;'>`;
  if (lotteryDataArr["UPCOMMING_ATTRACTIONS"].length > 0) {
    for (let i = 0; i < lotteryDataArr["UPCOMMING_ATTRACTIONS"].length; i++) {
      str += upCommingCard(
        i,
        lotteryDataArr["UPCOMMING_ATTRACTIONS"][i],
        upColorCode[colorCodeIndex],
        downColorCode[colorCodeIndex],
        colorCodeIndex
      );
      colorCodeIndex++;
      if (colorCodeIndex > upColorCode.length - 1) {
        colorCodeIndex = 0;
      }
    }
  }
  str = str + `</div>`;
  $("#shop-lottery-page-upcoming").html(str);
  $("#upcoming-attraction_Carousel").owlCarousel({
    center: false,
    // items: 4,
    autoplay: true,
    autoplayTimeout: 5000,
    loop: true,
    nav: true,
    navText: [
      "<i style='font-size:30px;' class='fa fa-chevron-circle-left'></i>",
      "<i style='font-size:30px;' class='fa fa-chevron-circle-right'></i>",
    ],
    dots: false,
    responsiveClass: true,
    responsive: {
      0: { items: 1.01 },
      570: { items: 1.5 },
      630: { items: 1.75 },
      800: { items: 2 },
      900: { items: 2 },
      930: { items: 3 },
      1130: { items: 3 },
      1315: { items: 4 },
      1400: { items: 4 },
      1600: { items: 4 },
      1700: { items: 4 },
      1900: { items: 5 },
      2200: { items: 6 },
      2500: { items: 7 },
    },
  });
}

function viewAllUpcomming() {
  loadComponent("lottery", "REQ002");
}
function viewAllBumperLottery() {
  loadComponent("lottery", "REQ002");
}

function middel_carosel() {
  var param = {
    action: "GET_BANNER",
    doctype: "HomeScreen2",
    apptype: "ILDLWEB",
  };
  var path = "app.static/promo/";
  loadData("home", "REQ001", "LOTTERY_V2", param, "COMMON").then(
    (responseArr) => {
      if (
        responseArr.status.toUpperCase() == "SUCCESS" &&
        responseArr.hasOwnProperty("data") &&
        responseArr.data.length > 0
      ) {
        var promoStr =
          "<div id='middle_Carousel' class='carousel slide feature_p_slider home-mid-crousal ' data-ride='carousel' style='max-width:100%; margin: auto;'>";
        var promo = "";
        var promo1 = "";
        var promo2 = "";
        let = buy_butn = "";
        var lotarrlength = 0;
        lotarrlength = responseArr.data.length;
        buy_butn = "";
        for (var i = 0; i < lotarrlength; i++) {
          var src = path + responseArr.data[i].image;
          var eventfunction = "";

          let is_show_buy_now1 = false;
          if (parseInt(responseArr.data[i].is_show_buynow) === 1) {
            is_show_buy_now1 = true;
            // alert(is_show_buy_now1);
          }
          if (
            responseArr.data[i].linked_path_name != "" &&
            responseArr.data[i].linked_path_name != "none" &&
            responseArr.data[i].linked_path != ""
          ) {
            eventfunction = `onclick='componentFunctiont("${responseArr.data[i].linked_path_name}","${responseArr.data[i].linked_path_lotcode}","${responseArr.data[i].linked_path_drawdate}","${responseArr.data[i].linked_path}");'`;
          }
          if (i == 0) {
            // alert("ishh"+is_show_buy_now1);
            promo2 += `<div class="item active cursor-pointer" ${eventfunction}>
                                    <img src="${src}" alt="${i}" style="height:440px;width:100%;">
                                        ${
                                          is_show_buy_now1
                                            ? `<div style="position:absolute; bottom:45px; left: 80%;"><button class="home-button--greip home-common-button--greip home-buy-cart-color home-button-buy" id="buy_btn_middle" >
                                            <span><i class="fa fa-paper-plane" aria-hidden="true"></i> Buy Now</span>
                                        </button></div>`
                                            : ""
                                        }
                                </div>`;
          } else {
            promo2 += `<div class="item cursor-pointer" ${eventfunction}>
                                    <img src="${src}" alt="${i} Image" style="height:440px;width:100%;">
                                    <div style="position:absolute; bottom:45px;left: 80%;">
                                        ${
                                          is_show_buy_now1
                                            ? `<button class="home-button--greip home-common-button--greip home-buy-cart-color home-button-buy" id="buy_btn_middle"><span><i class="fa fa-paper-plane" aria-hidden="true"></i> Buy Now</span></button>`
                                            : ""
                                        }
                                    </div>
                                </div>`;
          }
        }

        let loopFlag = lotarrlength <= 1 ? false : true;
        promoStr = promoStr + promo + "" + promo1 + promo2 + "";
        promoStr = `${promoStr}</div>`;
        $("#home_middel_carosel").html(promoStr);
        $("#middle_Carousel").owlCarousel({
          center: true,
          items: 1,
          autoplay: true,
          autoplayTimeout: 5000,
          loop: loopFlag,
          nav: false,
          dots: true,
        });
      } else {
        $("#home_middel_carosel").css({ height: "0px" });
      }
    }
  );
}

function showSingleProduct(lotdata) {
  Swal.fire({
    html: `<cart-card lotname = "${
      lotdata.displayname
    }" showaddbuybtn='true'  lotcode = "${lotdata.lotcode}" drawdate = "${
      lotdata.drawdate
    }" drawtime = "${lotdata.drawtime}" salestop = "${
      lotdata.salestopdate
    }" bunchdetails = ${JSON.stringify(lotdata.bunchdetails)} mrp="${
      lotdata.mrp
    }" ></cart-card>`,
    showCancelButton: false,
    showCloseButton: true,
    showConfirmButton: false,
    closeOnClickOutside: false,
    showClass: {
      popup: "animated fadeInDown faster",
    },
    hideClass: {
      popup: "animated fadeOutUp faster",
    },
  });
}
function BuyTicket(e) {
  alert(e);
}

function updateMassageBatch() {
  if (msgCount == 0) {
    msgCount = 0;
  } else {
    msgCount = msgCount - 1;
  }
  $("#notification-batchs").html(msgCount);
}

function getMessageCount() {
  if (
    user == null ||
    user == "" ||
    user == undefined ||
    !user.hasOwnProperty("custcode") ||
    !user.hasOwnProperty("mobileno")
  ) {
    msgCount = 0;
    $("#notification-batchs").html(msgCount);
  } else {
    var param = { custcode: user.custcode, mobileno: user.mobileno };
    loadData("winner", "REQ001", "GETMESSAGE_COUNT", param, "COMMON").then(
      (messageArr) => {
        if (messageArr.status.toUpperCase() == "SUCCESS") {
          msgCount = parseInt(messageArr.msgcount);
        } else {
          msgCount = parseInt(messageArr.msgcount);
        }
        $("#notification-batchs").html(msgCount);
      }
    );
  }
}

function componentFunctiont(pathName, lotcode, drawdate, path) {
  if (pathName != "" && lotcode != "" && drawdate != "") {
    if (pathName == "none") {
      return false;
    }
    $("#n, #overlay, #navbarNav").hide();
    $(".footer").hide();
    if (pathName == "lottery") {
      getLotteryData(lotcode, drawdate);
    } else {
      loadComponent(pathName, "REQ002");
    }
  } else {
    if (pathName != "") {
      $("#n, #overlay, #navbarNav").hide();
      $(".footer").hide();
      loadComponent(pathName, "REQ002");
    }
  }
}
function get_faq() {
  loadComponent("faq", "REQ002");
}

function ReadMoreAtResult() {
  loadComponent("result", "REQ002");
}
