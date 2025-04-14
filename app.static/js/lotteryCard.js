var mrpSymbol = "₹";
var upColorCode = [
  "#643d90",
  "#50b280",
  "#002437",
  "#297832",
  "#703718",
  "#1a7359",
  "#3f898c",
  "#cc262d",
  "#ee542c",
];
var downColorCode = [
  "#e94761",
  "#ee542c",
  "#104899",
  "#7eaf2c",
  "#48150e",
  "#ef9e08",
  "#0e312f",
  "#850c16",
  "#297832",
];

function bumperCard(i, lotteryArr) {
  const {
    prizeamt,
    lotcode,
    drawdate,
    drawtime,
    salestopdate,
    mrp,
    displayname,
  } = lotteryArr;
  const colorIndex = upColorCode.length;
  const modeIndex = i >= colorIndex ? i % colorIndex : i;
  const upBgColorCode = upColorCode[modeIndex];
  const downBgColorCode = downColorCode[modeIndex];

  const govtName =
    Object.keys(govtNameMap).find(
      (key) =>
        lotteryArr.hasOwnProperty("govtname") &&
        lotteryArr["govtname"].toLowerCase().includes(key)
    ) || "";

  const lotteryStringArr = getLotteryName(displayname).split("~");
  const encodedSvg = setSvgBackgroundBumper(upBgColorCode, downBgColorCode);

  const lotteryString = `${lotteryStringArr[0]}<span style='font-size: 0.9rem;position: relative;bottom: 7px;left:5px;'>${lotteryStringArr[1]}</span>`;

  const timerId = `${lotcode}-${drawdate}-bumper`;

  return `<div class='row'>
            <div class='bumper_main-card' style='background-image: url("data:image/svg+xml,${encodedSvg}")'>
                <div class="lottery_card_left-part">
                    <div class='row'>
                        <div class='col-12 text-right mt-2' style='font-weight: 400;'>
                            <h4>Win First Prize</h4>
                        </div>
                        <div class='col-3 d-none'>
                            <img class='img-fluid upcoming_govt_image_bumper' src='./app.static/img/login_images/govt_loggo/${govtName}.png'>
                        </div>
                    </div>
                    <div style=' border-bottom: 2px solid ${downBgColorCode};' class="bumper_div_bottom_border"></div>
                    <div class='row'>
                        <div class='col-12 text-center'>
                            <h1><span class='first_Prize_mrp_symbol font-weight-bold'>${mrpSymbol}</span>${firstPrizeAmountFormat(
    prizeamt
  )}</h1>
                        </div>
                    </div>
                    <div class='row mt-3' style="font-size: 14px;justify-content: center;color: ${downBgColorCode};background: white;height: 5vh;font-weight: 600;border-radius: 10px;margin-left: 1%;margin-right: 5%;"
                               id='card-timer-${timerId}'>
                               ${timerInstance.getTimer(
                                 salestopdate,
                                 timerId,
                                 "normal"
                               )}
                    </div>
                </div>
                <div class="lottery_card_right-part">
                        <div class='row'>
                            <div class='col-12 text-left'>
                                <h3>${lotteryString}</h3>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-12 text-left'>
                                <nobr style="font-size: 0.8rem;"><h7 class="ml-3">Draw: ${beautify(
                                  drawdate + " " + drawtime,
                                  "d.m.y"
                                )}</h7></nobr>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-12 text-left'>
                                <nobr style="font-size: 0.8rem;"><h7 class="ml-3">Time: ${beautify(
                                  drawdate + " " + drawtime,
                                  "h:i a"
                                )}</h7></nobr>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-12 text-left'>
                                <nobr style="font-size: 0.8rem;"><h7 class="ml-3">Ticket Price: ${mrpSymbol}${mrp}/-</h7></nobr>
                            </div>
                        </div>
                </div>
            </div>
            <div class='col-12'>
                <div class='row'>
                    <div class='col-1'></div>
                    <div class='col-4 text-center'>
                        <button onclick='showBumperCard(${JSON.stringify(
                          lotteryArr
                        )}, "${upBgColorCode}", "${downBgColorCode}")' class='upcoming-buy-button btn'  style='background-color:${downBgColorCode}'><i class="fa fa-shopping-cart" style='padding-right:10px;' aria-hidden="true"></i><span style='font-size:0.8rem;'>Add to Cart</span></button>
                    </div>
                    <div class='col-2'></div>
                    <div class='col-4 text-center'>
                        <button onclick='showBumperCard(${JSON.stringify(
                          lotteryArr
                        )}, "${upBgColorCode}", "${downBgColorCode}")' class='upcoming-buy-button btn'><i class="fa fa-paper-plane" style='padding-right:10px;' aria-hidden="true"></i><span style='font-size:0.8rem;'>Buy now</span></button>
                    </div>
                    <div class='col-1'></div> 
                </div>
            </div>
    </div>`;
}

function setSvgBackgroundBumper(primaryColor, secondaryColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 770 490" preserveAspectRatio="none" style="width: 100%; height: 100%"><g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 -1 1 0 -255 1205)"><path fill="${primaryColor}" d="M750.77,726.93h0.06c0-0.01,0-0.02,0-0.02h418.29c0.02-8.14,6.62-14.73,14.76-14.73  c0.38,0,0.75,0.03,1.12,0.06V332.52c0-30.69-24.88-55.57-55.57-55.57H790.57c-30.69,0-55.57,24.88-55.57,55.57v379.7  c0.33-0.02,0.67-0.05,1.01-0.05C744.16,712.17,750.77,718.78,750.77,726.93z" /><path fill="${secondaryColor}" d="M1169.13,726.93C1169.13,726.93,1169.13,726.93,1169.13,726.93l-418.29-0.01c-0.02,0.33-0.07,0.65-0.11,0.98  c-0.46,6.99-5.77,12.64-12.6,13.62c-1.01,0.2-2.06,0.31-3.13,0.31v214.71c0,25.57,20.93,46.5,46.5,46.5h357  c25.58,0,46.5-20.93,46.5-46.5V741.84c-0.85,0-1.68-0.08-2.5-0.21C1175,740.93,1169.13,734.62,1169.13,726.93z" /><g id="XMLID_58_">	<path id="XMLID_59_" fill="#F6F7F8" d="M796.47,731.79v-4.88h14.64v4.88H796.47z M830.64,731.79v-4.88h19.53v4.88H830.64z    M869.69,731.79v-4.88h19.53v4.88H869.69z M908.75,731.79v-4.88h19.53v4.88H908.75z M947.8,731.79v-4.88h19.53v4.88H947.8z    M986.85,731.79v-4.88h19.53v4.88H986.85z M1025.9,731.79v-4.88h19.53v4.88H1025.9z M1064.95,731.79v-4.88h19.53v4.88H1064.95z    M1104,731.79v-4.88h19.53v4.88H1104z" /></g></g></svg>`;
  return encodeURIComponent(svg);
}

function setSvgBackground(primaryColor, secondaryColor) {
  const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="715 255 490 770" preserveAspectRatio="none" style="width: 100%; height: 100%">
   <!-- Your SVG content -->
   <path fill="${primaryColor}" d="M750.77,726.93h0.06c0-0.01,0-0.02,0-0.02h418.29c0.02-8.14,6.62-14.73,14.76-14.73
   c0.38,0,0.75,0.03,1.12,0.06V332.52c0-30.69-24.88-55.57-55.57-55.57H790.57c-30.69,0-55.57,24.88-55.57,55.57v379.7
   c0.33-0.02,0.67-0.05,1.01-0.05C744.16,712.17,750.77,718.78,750.77,726.93z"/>
   <path fill="${secondaryColor}" d="M1169.13,726.93C1169.13,726.93,1169.13,726.93,1169.13,726.93l-418.29-0.01c-0.02,0.33-0.07,0.65-0.11,0.98
   c-0.46,6.99-5.77,12.64-12.6,13.62c-1.01,0.2-2.06,0.31-3.13,0.31v214.71c0,25.57,20.93,46.5,46.5,46.5h357
   c25.58,0,46.5-20.93,46.5-46.5V741.84c-0.85,0-1.68-0.08-2.5-0.21C1175,740.93,1169.13,734.62,1169.13,726.93z"/>
   <g id="XMLID_58_">
       <path id="XMLID_59_" fill="#F6F7F8" d="M796.47,731.79v-4.88h14.64v4.88H796.47z M830.64,731.79v-4.88h19.53v4.88H830.64z
           M869.69,731.79v-4.88h19.53v4.88H869.69z M908.75,731.79v-4.88h19.53v4.88H908.75z M947.8,731.79v-4.88h19.53v4.88H947.8z
           M986.85,731.79v-4.88h19.53v4.88H986.85z M1025.9,731.79v-4.88h19.53v4.88H1025.9z M1064.95,731.79v-4.88h19.53v4.88H1064.95z
           M1104,731.79v-4.88h19.53v4.88H1104z"/>
   </g>
</svg>`;
  return encodeURIComponent(svg);
}

var govtNameMap = {
  goa: "goa",
  mizoram: "mizoram",
  sikkim: "sikkim",
  arunachal: "arunachal",
  maharashtra: "maharashtra",
};

function upCommingCard(
  i,
  lotteryArr,
  upColorCodeBg,
  downColorCodeBG,
  colorCodeCount
) {
  const colorIndex = upColorCode.length;
  const modeIndex = i >= colorIndex ? i % colorIndex : i;
  const upBgColorCode = upColorCodeBg;
  const downBgColorCode = downColorCodeBG;
  const addToCartClass = "add_to_cart_" + colorCodeCount; //"add_to_cart_" + modeIndex;
  const buyNowClass = "buy_now_" + colorCodeCount; //"buy_now_" + modeIndex;
  const govtName =
    Object.keys(govtNameMap).find(
      (key) =>
        lotteryArr.hasOwnProperty("govtname") &&
        lotteryArr["govtname"].toLowerCase().includes(key)
    ) || "";

  // const lotteryStringArr = getLotteryName(lotteryArr["displayname"]).split("~");
  // const lotteryStringArr = lotteryArr["displayname"];

  const encodedSvg = setSvgBackground(upBgColorCode, downBgColorCode);
  let lotteryNameAtPm = "";
  let lotteryName = "";
  if (
    lotteryArr["short_displayname"] != " " ||
    lotteryArr["short_displayname"] != undefined
  ) {
    lotteryName = lotteryArr["short_displayname"];
  } else {
    lotteryName = lotteryArr["displayname"];
  }
  const lotteryStringArr = lotteryName.split(" ");
  const formattedArr = lotteryStringArr.map((word) => {
    if (word.toUpperCase() === "AM" || word.toUpperCase() === "PM") {
      return word.toUpperCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  const formattedString = formattedArr.join(" ");
  lotteryNameAtPm = formattedString;
  // if (lotteryArr["short_displayname"] === "") {
  //   if (lotteryStringArr[1].trim().toUpperCase() === "PM") {
  //     lotteryNameAtPm = (
  //       lotteryStringArr[0] +
  //       " " +
  //       lotteryStringArr[1].toUpperCase()
  //     );
  //   } else {
  //     lotteryNameAtPm = (
  //       lotteryStringArr[0] +
  //       " " +
  //       lotteryStringArr[1]
  //     );
  //   }
  // } else {
  //   // let lotteryStringArr1 = getLotteryName(lotteryArr["short_displayname"]).split("~");
  //   let lotteryStringArr1 = lotteryArr["short_displayname"];

  //   if (lotteryStringArr1[1].trim().toUpperCase() === "PM") {
  //     lotteryNameAtPm =
  //       lotteryStringArr1[0] + " " + lotteryStringArr1[1].toUpperCase();
  //   } else {
  //     lotteryNameAtPm = (
  //       lotteryStringArr1[0] +
  //       " " +
  //       lotteryStringArr1[1]
  //     );
  //   }
  // }

  const firstPrizeAmount = firstPrizeAmountFormat(lotteryArr["prizeamt"]);

  const lotteryCard = `<div class='upcoming_card' onclick='showCartUpcomingCard(${JSON.stringify(
    lotteryArr
  )}, "${upBgColorCode}", "${downBgColorCode}")' style='height:400px; background-repeat: no-repeat;
  background-size: cover;
  background-position: center; background-image: url("data:image/svg+xml,${encodedSvg}");
  '>
    <div class="lottery_card_upper_part">
    <div class='row mt-2'>
        <div class='col-12 text-center mx-auto'>
              ${
                lotteryNameAtPm.length > 20
                  ? `<div class='row marquee-container' style="padding-top:10px;"><nobr class="marquee-text-wrapper">
                    <h4 class="font-weight-bold" style="font-size:21px">
                      <span class="marquee-text">${lotteryNameAtPm}</span>
                      <span class="marquee-text">${lotteryNameAtPm}</span>
                      <span class="marquee-text">${lotteryNameAtPm}</span>
                    </h4>
                  </nobr> </div>`
                  : `<h4 class="font-weight-bold" style="font-size:21px; text-align: center; padding-top:10px;">${lotteryNameAtPm}</h4>`
              }
        </div>
        <div class='col-3 d-none'>
            <img class='img-fluid upcoming_govt_image' src='./app.static/img/login_images/govt_loggo/${
              govtNameMap[govtName] || ""
            }.png'>
        </div>
    </div>
    <div style='border-bottom: 2px solid ${downBgColorCode};' class="div_bottom_border"></div>
    <div class='row'>
        <div class='col-12 text-center mt-1'>
        
        ${
          firstPrizeAmount.includes("Lakhs") ||
          firstPrizeAmount.includes("Crore")
            ? `<h4 style="margin: 0; font-size: 22px;" class="font-weight-bold">${
                lotteryArr["display_prize_heading_one"]
                  ? lotteryArr["display_prize_heading_one"]
                  : "Win First Prize"
              }</h4>`
            : `<h4 style="margin: 0; font-size: 22px;" class="font-weight-bold">${
                lotteryArr["display_prize_heading_one"]
                  ? lotteryArr["display_prize_heading_one"]
                  : "Win"
              }</h4>
               <h4 style="margin: 0; font-size: 22px;" class="font-weight-bold">${
                 lotteryArr["display_prize_heading_one"]
                   ? lotteryArr["display_prize_heading_two"] || "&nbsp;"
                   : "First Prize"
               }</h4>`
        }
        
        </div>
    </div>
    <div class='row'>
        <div class='col-12 text-center'>
        ${
          firstPrizeAmount.includes("Lakhs") ||
          firstPrizeAmount.includes("Crore")
            ? `<h2><span class="first_Prize_mrp_symbol">${mrpSymbol}</span><span class="font-weight-bold">${firstPrizeAmount}</span></h2>`
            : `<h2 class="show_amount"><span class="first_Prize_mrp_symbol">${mrpSymbol}</span><span class="font-weight-bold">${firstPrizeAmount}</span></h2>`
        }
            
        </div>
    </div>
    <div class='row mb-5 d-none'>
        <button  onclick='showCartUpcomingCard(${JSON.stringify(
          lotteryArr
        )}, "${upBgColorCode}", "${downBgColorCode}")' id='lottery_cart_add_to_cart_${
    lotteryArr["id"] +
    "_" +
    lotteryArr["lotcode"] +
    "_" +
    lotteryArr["drawdate"]
  }' 
            class='button-l-mim button-l-mimas btn'><span><i class="fa fa-shopping-cart" style='padding-right:10px;' aria-hidden="true"></i><span style='font-size:1rem;'>Add to Cart</span></span>
        </button>
    </div>
    </div>
    <div class="lottery_card_lower_part">
    <div class='row'>
        <button  id='lottery_cart_buy_button_${
          lotteryArr["id"] +
          "_" +
          lotteryArr["lotcode"] +
          "_" +
          lotteryArr["drawdate"]
        }' 
class='button-next button--greip btn'>
<span><i class="fa fa-paper-plane" style='padding-right:10px;' aria-hidden="true"></i>
<span style='font-size:1rem;'>Buy now</span></span></button>
    </div>
    <div class='row' style='color:white'>
            <nobr style="font-size: 1rem;text-align: center; margin-top:12px;"><h7>Draw: ${beautify(
              lotteryArr["drawdate"] + " " + lotteryArr["drawtime"],
              "d.m.y"
            )}</h7>&nbsp;
            <h7>Time: ${beautify(
              lotteryArr["drawdate"] + " " + lotteryArr["drawtime"],
              "h:i a"
            )}</h7></nobr>
    </div>
    <div class='row mb-1' style='color:white'>
        <div class='col-12 text-center'>
            <nobr style="font-size: 1rem;"><h7>Ticket Price: ${mrpSymbol}${
    lotteryArr["mrp"]
  }</h7></nobr>
        </div>
    </div>
    </div>
        </div>`;
  // $(
  //   `<style type='text/css'> #lottery_cart_buy_button_${
  //     lotteryArr["id"] +
  //     "_" +
  //     lotteryArr["lotcode"] +
  //     "_" +
  //     lotteryArr["drawdate"]
  //   }::before {background: ${upBgColorCode};} </style>`
  // ).appendTo("head");
  // $(
  //   `<style type='text/css'> #lottery_cart_add_to_cart_${
  //     lotteryArr["id"] +
  //     "_" +
  //     lotteryArr["lotcode"] +
  //     "_" +
  //     lotteryArr["drawdate"]
  //   }::before {background: ${downBgColorCode};} </style>`
  // ).appendTo("head");
  return lotteryCard;
}

function getLotteryName(lotteryName) {
  let LotteryName = "";
  LotteryName = lotteryName.trim();
  LotteryName = LotteryName.toLowerCase();
  //    LotteryName = LotteryName.replace('lottery', '');
  let LotteryName1 = "";
  let LotteryName2 = "";
  let LotteryName3 = "";
  let newLotteryName = "";
  if (lotteryName.indexOf(" ") >= 0) {
    let lotteryArray = LotteryName.split(" ");
    for (let i = 0; i < lotteryArray.length; i++) {
      let lottery = lotteryArray[i];
      if (lottery != "") {
        lottery = lottery[0].toUpperCase() + lottery.substr(1);
      }
      if (i < 2) {
        LotteryName1 = LotteryName1 + lottery + " ";
      } else if (i > 1 && i < 4) {
        LotteryName2 = LotteryName2 + lottery + " ";
      } else {
        LotteryName3 = LotteryName3 + lottery + " ";
      }
    }
    //        LotteryName3 = LotteryName3 + " Lottery";
  } else {
    LotteryName1 = `${lotteryName}`;
    LotteryName2 = "&nbsp;";
    LotteryName3 = "&nbsp;";
  }
  newLotteryName = LotteryName1 + "~" + LotteryName2 + "~" + LotteryName3;
  return newLotteryName;
}

function firstPrizeAmountFormat(firstPrize) {
  const len_amount = Math.floor(firstPrize).toString().length;
  let formattedAmount;

  if (len_amount <= 5) {
    formattedAmount = `<span style="font-size:68px; line-height:70px; display:inline-block; height:78px;">${parseFloat(
      firstPrize
    )}</span>`;
  } else if (len_amount < 8) {
    const lakhs = firstPrize / 100000;
    formattedAmount = `<span style="font-size:68px; line-height:70px; display:inline-block; height:78px;">${
      Number.isInteger(lakhs) ? lakhs : Math.trunc(lakhs * 10) / 10
    }</span><br> <span style="font-size:56px ;line-height:36px">Lakhs</span>`;
  } else {
    const crores = firstPrize / 10000000;
    formattedAmount = `<span style="font-size:68px; line-height:70px; display:inline-block; height:78px;">${
      Number.isInteger(crores) ? crores : Math.trunc(crores * 10) / 10
    }</span><br><span style="font-size:56px ;line-height:36px">Crore</span>`;
  }
  return formattedAmount;
}

function showCartUpcomingCard(lotteryData, upBgColorCode, downBgColorCode) {
  var tempLotteryData = lotteryData;
  tempLotteryData.upBgColorCode = upBgColorCode;
  tempLotteryData.downBgColorCode = downBgColorCode;
  var param = {
    data: tempLotteryData,
    flag: true,
  };
  loadComponent("add-to-cart", "REQ002", param);
}

function showBumperCard(lotteryData, upBgColorCode, downBgColorCode) {
  var tempLotteryData = lotteryData;
  tempLotteryData.upBgColorCode = upBgColorCode;
  tempLotteryData.downBgColorCode = downBgColorCode;
  var param = {
    data: tempLotteryData,
    flag: true,
  };
  loadComponent("add-to-cart", "REQ002", param);
}
