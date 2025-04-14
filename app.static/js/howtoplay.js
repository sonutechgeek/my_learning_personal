var lotterySchemeDetails= {};
var lotcode = "";
var govt = "";
var freq = "";
var lotteryData = "";
function howToPlay() {
    lotteryData = OBJ.actionevent.data;
    lotcode = lotteryData.lotcode;
    var govtname = lotteryData.govtname.split(" ");
    govt = govtname[govtname.length-1].toUpperCase();
    var param = {
        action: "GET_SCHEME_DETALS",
        lotcode: lotcode,
        drawdate: lotteryData.drawdate
    };
    loadData('orderdetails', 'REQ001', 'LOTTERY_V2', param, 'COMMON').then(responseArr => {
        if (responseArr.status.toUpperCase() == "SUCCESS") {
            lotterySchemeDetails = responseArr.lottery_scheme;
            var frequency = lotterySchemeDetails.freq.split(" ");
            freq = frequency[frequency.length-1].toUpperCase();
            lotteryLogoHeader();
            var htmlData = ``;
            htmlData += lotteryDetailHeader();
            htmlData += lotteryHowToMatchChart();
            htmlData += lotteryKeyPoints();
            $("#howtoplaydata").html(htmlData);
            $("#howtoplay").modal("toggle");
        } else {
            successErrorAlert("error", "", responseArr.message);
            return false;
        }
    });
}

function lotteryLogoHeader() {
    var lotteryWiseLogoArr = {
        "0" : "app.static/img/logo.png",
        "1210": "app.static/img/lottery_logo/rajshree_1_pm_lottery.png",
        "1211": "app.static/img/lottery_logo/rajshree_4_pm_lottery.png",
        "1212": "app.static/img/lottery_logo/rajshree_8_pm_lottery.png",
        "1223": "app.static/img/lottery_logo/rajshree_10_evening_weekly_lottery.png",
        "1224": "app.static/img/lottery_logo/rajshree_20_weekly_lottery.png",
        "1225": "app.static/img/lottery_logo/rajshree_50_weekly_lottery.png",
        "1221": "app.static/img/lottery_logo/rajshree_20_monthly_lottery.png",
        "1218": "app.static/img/lottery_logo/rajshree_50_monthly_lottery.png",
        "1217": "app.static/img/lottery_logo/rajshree_100_monthly_lottery.png",
        "1219": "app.static/img/lottery_logo/rajshree_200_monthly_lottery.png",
        "1216": "app.static/img/lottery_logo/rajshree_250_monthly_lottery.png",
        "1220": "app.static/img/lottery_logo/rajshree_500_monthly_lottery.png",
        "1222": "app.static/img/lottery_logo/rajshree_1000_monthly_lottery.png"
    };

    var govtwiseLogoArr = {
        "GOA": "app.static/img/images/govt_loggo/goa_with_name.png",
        "MIZORAM": "app.static/img/images/govt_loggo/mizoram_with_name.png"
    };

    var lotteryLogoPath = "";
    if(lotcode in lotteryWiseLogoArr) {
        lotteryLogoPath = lotteryWiseLogoArr[lotcode];
    } else {
        lotteryLogoPath = lotteryWiseLogoArr[0];
    }
    var htmlLogoHeader = ``;
    htmlLogoHeader += `<div class='row'>`;
    htmlLogoHeader += `<div class='col-3'></div>`;
    htmlLogoHeader += `<div class='col-6' style='text-align: center;'><img src='${lotteryLogoPath}' style='max-width:100%; height: 90px; background:white; margin-bottom:10px;' /></div>`;
    htmlLogoHeader += `<div class='col-3'><img src='${govtwiseLogoArr[govt]}' style='width:95px; height: 80px; float: right; margin-top: 5px;' /></div>`;
    htmlLogoHeader += `</div>`;
    $("#logoHeader").html(htmlLogoHeader);
}

function lotteryDetailHeader() {
    var schemeData = lotterySchemeDetails;
    console.log(schemeData.series_list.length + " == " +JSON.stringify(schemeData));
    var htmlLotteryDetailsHeader = ``;
    htmlLotteryDetailsHeader += `<div class='container'>`;
    htmlLotteryDetailsHeader += `<div class='row'><div class='col-12'><h3 style="text-align: center; font-size: x-large; font-weight: bold;">`;
    htmlLotteryDetailsHeader +=`<u style="border-bottom: 4px dashed #b20505; text-decoration: none;"> &nbsp;&nbsp;HOW TO PLAY?&nbsp;&nbsp; </u>`;
    htmlLotteryDetailsHeader += `</h3></div></div>`;
    var seriesNumbering = "";
    var seriesNumberingCount;
    if(schemeData.series_from != "" && schemeData.series_upto != "" && schemeData.series_list.length > 0) {
        seriesNumbering = schemeData.series_from + "-" + schemeData.series_upto + "/ " + schemeData.series_list.join(", ");
        seriesNumberingCount = (parseInt(schemeData.series_upto) - parseInt(schemeData.series_from) + 1) * parseInt(schemeData.series_list.length);
    } else if(schemeData.series_from != "" && schemeData.series_upto != "" && schemeData.series_list.length == 0) {
        seriesNumbering = schemeData.series_from + "-" + schemeData.series_upto;
        seriesNumberingCount = (parseInt(schemeData.series_upto) - parseInt(schemeData.series_from) + 1);
    } else if(schemeData.series_from == "" && schemeData.series_upto == "" && schemeData.series_list.length > 0) {
        seriesNumbering = schemeData.series_list.join(", ");
        seriesNumberingCount = parseInt(schemeData.series_list.length);
    }

    htmlLotteryDetailsHeader += `<div class='row'><div class='col-12'><p style="font-size: 18px; line-height: normal; text-align: justify;">`;
    htmlLotteryDetailsHeader += `Each ticket you buy will have a unique set of ${convertNumberToWords(schemeData.nofrom.length)}-digit numbers, along with a series. This scheme will have ${indianNumberFormat(schemeData.nom_of_tickets)} (${convertNumberToWords(schemeData.nom_of_tickets)}) tickets in ${seriesNumberingCount} series numbering from ${seriesNumbering} and tickets numbering from ${schemeData.nofrom} to ${schemeData.noupto}.`;

    if(freq.toUpperCase() == "MONTHLY" || lotcode == '1224' || lotcode == '1225') {
        htmlLotteryDetailsHeader += ` You can buy as many tickets as you want.`;
    }
    htmlLotteryDetailsHeader += `</p></div></div>`;
    if(freq.toUpperCase() == "WEEK" && lotcode != '1224' && lotcode != '1225') {
        var pinning = schemeData.pinning.split(",");
        var strPinning = pinning.slice(0, -1).join(', ') + ' or ' + pinning.slice(-1);
        htmlLotteryDetailsHeader += `<div class='row'><div class='col-12'><p style="font-size: 18px; line-height: normal; text-align: justify;">`;
        htmlLotteryDetailsHeader += `You have the option to buy a bunch of minimum ${strPinning} tickets, known as "pinning." When you buy a bunch of ${pinning.length} tickets, all ${convertNumberToWords(pinning.length)} tickets will have the different series labelled, but their ${convertNumberToWords(schemeData.nofrom.length)}-digit numbers will be the same.`;
        htmlLotteryDetailsHeader += `</p></div></div>`;
    }
    return htmlLotteryDetailsHeader;
}

function lotteryHowToMatchChart() {
    var htmlMatchChart = ``;
    htmlMatchChart = `<div class='container'>`;
    htmlMatchChart += `<div class='row'><div class='col-12'>`;
    htmlMatchChart += `<label style="width: max-content; background: ${lotteryData.downBgColorCode}; padding: 12px; border-radius: 30px; border: 3px solid yellow; margin: 10px; font-size: 18px; color: white; font-weight: bold;">HOW TO MATCH TICKET NUMBERS WITH RESULT NUMBERS?</label>`;
    htmlMatchChart += `</div></div>`;
    htmlMatchChart += `<div class='row'><div class='col-12'>`;
    htmlMatchChart += `<div style="border-right: 5px solid black;border-bottom: 5px solid black;border-radius: 30px; width: 70%; margin: auto;">`;
    htmlMatchChart += `<table class='table' id='schemeTable' style='margin-bottom: 0px; color: white;'>`;
    // htmlMatchChart += `<thead style="width: 100%; display: table-caption;">`;
    htmlMatchChart += `<tbody style="width: 100%; display: table-caption;">`;
    
    htmlMatchChart += `<tr style="background: ${lotteryData.downBgColorCode};font-size: 16px;line-height: 16px;border: 2px solid yellow; display: flex; border-top-left-radius: 25px;border-top-right-radius: 25px;">`;
    htmlMatchChart += `<td style="border: 2px solid yellow; border-left: 0px; border-top: 0px; border-bottom: 0px; width: 25%;">Prizes</td>`;
    htmlMatchChart += `<td style="border: 2px solid yellow; border-top: 0px; border-bottom: 0px; width: 25%;">No. of Results<br>to be Drawn</td>`;
    htmlMatchChart += `<td colspan='2' style="border: 2px solid yellow;border-top: 0px;border-right: 0px;border-bottom: 0px; width: 50%;"><label style='float: left; margin-left: 10px; margin-right: 10px;'>Demo<br>Ticket No.</label><label><br>&</label><label style='float: right; margin-left: 10px; margin-right: 10px;'>How<br>to Match?</label></td>`;
    htmlMatchChart += `</tr>`;
    // htmlMatchChart += `</thead>`;
    var schemeCounter = 0;
    for (var loopCounter in lotterySchemeDetails.scheme) {     
        schemeCounter++;   
        var schemeDetail = lotterySchemeDetails.scheme[loopCounter];
        var superscriptStr = "<sup>th</sup>";

        if(schemeDetail.prizeno == 1){
            superscriptStr = "<sup>st</sup>";
        } else if(schemeDetail.prizeno == 2) {
            superscriptStr = "<sup>nd</sup>";
        } else if(schemeDetail.prizeno == 3) {
            superscriptStr = "<sup>rd</sup>";
        }

        var demoTicketNo = schemeDetail.demo_ticket_no;
        var matchDigit = schemeDetail.matchdigits;
        var tempDemoTicketNo = demoTicketNo.slice(-matchDigit)

        if(tempDemoTicketNo.includes("-")) {
            matchDigit = matchDigit + 1;
            tempDemoTicketNo = demoTicketNo.slice(-matchDigit);
        } 
        if(schemeDetail.chkseries == 1 && lotterySchemeDetails.nofrom.length == matchDigit) {
            tempDemoTicketNo = demoTicketNo;
        }
        demoTicketNo = demoTicketNo.replace(tempDemoTicketNo, "");
        demoTicketNo = demoTicketNo + "<span style='background-color: yellow; color: blue;'>" + tempDemoTicketNo + "</span>";

        var strPrizeNo = schemeDetail.prizeno + superscriptStr;
        if(schemeDetail.prizeno == 99) {
            strPrizeNo = "Cons.";
        }

        var trStyling = "";
        var firstTdStyling = "";
        var midTdStyling = "";
        var lastTdStyling = "";
        if(schemeCounter == lotterySchemeDetails.scheme.length) {
            trStyling = "border: 2px solid yellow; border-top: 0px;border-bottom-left-radius: 25px;border-bottom-right-radius: 25px;"
            firstTdStyling = "border-left: 0px; border-top: 0px; border-bottom: 0px;";
            midTdStyling = "border-top: 0px; border-bottom: 0px;";
            lastTdStyling = "border-top: 0px;border-right: 0px;border-bottom: 0px;";
        }

        htmlMatchChart += `<tr style='background: ${lotteryData.upBgColorCode}; ${trStyling} display: flex;'>`;
        htmlMatchChart += `<td style='font-size: 12px;line-height: 12px; width: 25%; vertical-align: middle; border: 2px solid yellow; ${firstTdStyling}'>${strPrizeNo} Prize<br>₹${indianNumberFormat(schemeDetail.prizeamt)}<br>(No. of Prizes: ${indianNumberFormat(schemeDetail.no_of_prize)})</td>`;
        htmlMatchChart += `<td style='font-size: 14px;line-height: 14px; width: 25%; vertical-align: middle; border: 2px solid yellow; ${midTdStyling}'><b>${indianNumberFormat(schemeDetail.result_draw_on)}</b></td>`;
        htmlMatchChart += `<td style='font-size: 14px;line-height: 14px; width: 25%; vertical-align: middle; border: 2px solid yellow; ${midTdStyling}'><b>${demoTicketNo}</b></td>`;
        htmlMatchChart += `<td style='font-size: 12px;line-height: 12px; width: 25%; vertical-align: middle; border: 2px solid yellow;  ${lastTdStyling}'>${schemeDetail.how_to_match}</td>`;
        htmlMatchChart += `</tr>`;
    }

    htmlMatchChart += `</tbody>`;
    htmlMatchChart += `</table>`;
    htmlMatchChart += `</div></div></div>`;
    htmlMatchChart += `</div>`;
    return htmlMatchChart;
}

function lotteryKeyPoints(){
    var officeAddress;
    var daysAllowed;
    var expirationDaysAllowed;
    var officeCity;
    var strPurchaseSold;
    var secondLastKeyPointPrefix;
    var resultLink;
    var youtubeLink;
    if(govt.toUpperCase() == "MIZORAM") {
        officeAddress = "Institutional Finance & State Lotteries, Tuikhuahtlang, Aizawl, Mizoram";
        daysAllowed = 60;
        expirationDaysAllowed = 90;
        officeCity =  "Aizawl-Mizoram";
        strPurchaseSold = "sold";
        secondLastKeyPointPrefix = "For more details, visit";
        resultLink = "https://ifsl.mizoram.gov.in/";
        youtubeLink = "https://www.youtube.com/@RajshreeLotteryMizoram";
    } else {
        officeAddress = "Small Savings & Goa State Lotteries, Serra Building, Altinho, Panaji, Goa";
        daysAllowed = 30;
        expirationDaysAllowed = 90;
        officeCity = "Panaji-Goa";
        strPurchaseSold = "purchased";
        secondLastKeyPointPrefix = "Results & Claim form along with affidavit, are available on";
        resultLink = "https://statelotteries.goa.gov.in/lottery-results/";
        youtubeLink = "https://www.youtube.com/@RajshreeLottery";
    }
    var keyPointsArr = [
        "All the prize winning tickets above ₹" + indianNumberFormat(lotterySchemeDetails.claim_maxprize_amt) + "/- should reach the office of the Director, " + officeAddress + ", on the prescribed application form along with the genuine prize winning ticket, 4 passport size photographs, PAN card, and proper residence proof either issued by central or any state government organization within " + daysAllowed + " days from the date of draw and publication of the result.",
        "The director may, after the " + daysAllowed + " days but before the expiration of " + expirationDaysAllowed + " days from the date of draw, entertain a claim if he/she is satisfied that the delay in claiming the prize amount is for reasons beyond the control of the claimant. T.D.S on prizes will be deducted at source while making payments.",
        "Prizes up to ₹" + indianNumberFormat(lotterySchemeDetails.claim_maxprize_amt) + "/- should be claimed directly from the point of sale within " + daysAllowed + " days from the date of draw and publication of the result.",
        "The defective ticket should be immediately returned to the issuing authority.",
        "No joint claim on any prize winning ticket shall be entertained by any group of individuals formed for the purpose of sharing the prize among themselves.",
        "One ticket shall be eligible for only one prize, whichever is higher.",
        "All prize winners will be paid in Indian currency.",
        "Prize amount for any prize winning ticket against which a case is filed in any court of law or is the subject matter under investigation by Police or Income Tax Authority shall not be paid unless such a case is settled.",
        "A ticket which is forged, torn, mutilated, or tampered with shall be rejected, except in cases where it is possible to verify the genuineness of the ticket. In such cases, the decision of the director shall be final and binding on the claimant.",
        "Government reserves the right to change the date & time of the draw.",
        "All litigation arising relating to the lottery shall be decided by the court having jurisdiction, within the limits of the city of " + officeCity + " only.",
        "Tickets shall not be " + strPurchaseSold + " in those states where prohibitory order exists.",
        secondLastKeyPointPrefix + " the official website of " + govt[0] + govt.slice(1).toLowerCase() + " State Lotteries <br><a href='" + resultLink + "' target='_blank' rel='noopener noreferrer' style='color:#b2367f;'>" + resultLink + "</a>",
        "Result of this draw will be streamed LIVE on <br><a href='" + youtubeLink + "' target='_blank' rel='noopener noreferrer' style='color:#b2367f;'>" + youtubeLink + "</a>"
    ];   

    var htmlKeyPoints = ``;
    htmlKeyPoints = `<div class='container'>`;
    htmlKeyPoints += `<div class='row'><div class='col-12'><h3 style="text-align: center; font-size: x-large; font-weight: bold;"><u style="border-bottom: 4px dashed #b20505; text-decoration: none;"> &nbsp;&nbsp;Key points &nbsp;&nbsp;</u></h3></div></div>`;
    htmlKeyPoints += `<div class='row'><div class='col-12'><ul style="text-align: left;font-size: 18px;line-height: initial;">`;
    for (var keyPoint in keyPointsArr) {
        htmlKeyPoints += `<li style='list-style-type: disc;'>${keyPointsArr[keyPoint]}</li>`;
    }    
    htmlKeyPoints += `</ul></div></div>`;
    htmlKeyPoints += `</div>`;
    return htmlKeyPoints;
}

function indianNumberFormat(amount) {
    amount=amount.toString();
    var lastThree = amount.substring(amount.length-3);
    var otherNumbers = amount.substring(0,amount.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var formatedAmount = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    if(formatedAmount.length <= 1) {
        formatedAmount = "0" + formatedAmount;
    }
    return formatedAmount;
}

function convertNumberToWords(num) {
    const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
       const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
       const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
       const formatTenth = (digit, prev) => {
          return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
       };
       const formatOther = (digit, next, denom) => {
          return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
       };
       let res = "";
       let index = 0;
       let digit = 0;
       let next = 0;
       let words = [];
       if (num += "", isNaN(parseInt(num))){
          res = "";
       }
       else if (parseInt(num) > 0 && num.length <= 10) {
          for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
             case 0:
                words.push(formatOther(digit, next, ""));
             break;
             case 1:
                words.push(formatTenth(digit, num[index + 1]));
                break;
             case 2:
                words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
                break;
             case 3:
                words.push(formatOther(digit, next, "Thousand"));
                break;
             case 4:
                words.push(formatTenth(digit, num[index + 1]));
                break;
             case 5:
                words.push(formatOther(digit, next, "Lakh"));
                break;
             case 6:
                words.push(formatTenth(digit, num[index + 1]));
                break;
             case 7:
                words.push(formatOther(digit, next, "Crore"));
                break;
             case 8:
                words.push(formatTenth(digit, num[index + 1]));
                break;
             case 9:
                words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
          };
          res = words.reverse().join("")
       } else res = "";
       return $.trim(res);
    }



