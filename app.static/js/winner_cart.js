{
  class WinnerCard extends HTMLElement {
    static get observedAttributes() {
      return ["result"];
    }
    connectedCallback() {
      createWinnerCard(this);
      this.innerHTML = this.str;
    }
    attributeChangedCallback(name, oldValue, newValue) {
      createWinnerCard(this);
      this.innerHTML = this.str;
    }
  }

  customElements.define("winner-card", WinnerCard);
  function createWinnerCard(that) {
    let Name = "";
    let Name1 = "";
    let count = 0;
    let printName = "";
    let lengthName = that.getAttribute("name").trim();
    let fontSmall = "";
    if (lengthName.indexOf(" ") >= 0) {
      for (let i = 0; i < lengthName.length; i++) {
        if (lengthName[i] == " ") {
          count = count + 1;
        }
        if (count < 2) {
          Name += lengthName[i];
        }
        if (count == 2 || count == 3) {
          Name1 += lengthName[i];
        }
      }
      printName = `${Name}`;
      if (Name1 != "" && Name1.length > 0) {
        printName += ` ${Name1}`;
      }
    } else {
      printName = `${that.getAttribute("name")}`;
    }
    if (printName.length > 21) {
      fontSmall = "font-size:19px;";
    } else {
      fontSmall = "font-size:22px;";
    }
    printName = printName.substring(0, 28);
    // printName=printName;

    let LotteryName = "";
    let NewlotteryName = "";
    let NewlotteryName1 = "";
    var printLottery = "";

    if (
      that.getAttribute("lotteryShortName") !== undefined &&
      that.getAttribute("lotteryShortName") !== null &&
      that.getAttribute("lotteryShortName").trim() !== "undefined"
    ) {
      LotteryName = that.getAttribute("lotteryShortName").trim();
    } else if (
      that.getAttribute("lotteryname") !== undefined &&
      that.getAttribute("lotteryname") !== null &&
      that.getAttribute("lotteryname").trim() !== ""
    ) {
      LotteryName = that.getAttribute("lotteryname").trim();
    }
    LotteryName = LotteryName.toLowerCase();
    LotteryName = LotteryName.replace("lottery", "");
    count = 0;
    // if (that.getAttribute("lotteryname").indexOf(' ') >= 0) {
    if (LotteryName.indexOf(" ") >= 0) {
      for (let i = 0; i < LotteryName.length; i++) {
        if (count < 2) {
          NewlotteryName += LotteryName[i];
          if (LotteryName[i] == " ") {
            count = count + 1;
          }
        }
        if (count == 2 || count == 3) {
          if (LotteryName[i] == " ") {
            count = count + 1;
          }
          NewlotteryName1 += LotteryName[i];
        }
        if (count == 4) {
          NewlotteryName1 += LotteryName[i];
        }
      }
      printLottery = (
        NewlotteryName.charAt(0).toUpperCase() +
        NewlotteryName.slice(1) +
        NewlotteryName1
      ).substring(0, 24);
    } else {
      // printLottery = `${that.getAttribute("lotteryname").substring(0,24)}`;
      printLottery = LotteryName.substring(0, 24);
    }

    that.str = `<div class="crrousel_content">
                        <div class="win_card_content">
                            <div class="winner_cart" style="background-color: ${
                              that.getAttribute("color-code") || "#104899"
                            }">
                                <span class="winner_border"></span><span class="winner_border"></span>
                                <span class="winner_border"></span><span class="winner_border"></span>
                                <span class="winner_border"></span><span class="winner_border"></span>
                                <span class="winner_border"></span><span class="winner_border"></span>
                                <span class="winner_border"></span><span class="winner_border"></span>
                                <div class="cart_row">
                                <h5 class="winner_amount" style="color:#ffff00;"><span style="font-weight:bold;font-size:30px;">Won </span> <span style="font-weight:bold;font-size:21px;"> &#x20b9;</span><lable style="font-weight:bold;font-size:30px;">${winnerAmountFormat(
                                  parseInt(that.getAttribute("winamt"))
                                )}</label></h5>
                            </div>
                            <div class="cart_row">
                            <h5 class="winner_lottery_name"><lable class="font-weight-bold">${printLottery}</label></h5>
                        </div>
                                <div class="cart_row"style="height:170px;">
                                    <img name="${that.getAttribute(
                                      "data-phno"
                                    )}"  src='${that.getAttribute(
      "winimage"
    )}' alt="1" style='width: 165px; border-radius:50%; height:165px;'>
                                </div>
                                <div class="cart_row below-label d-flex align-items-start">
                                    <h5 class="winner_name" style="${fontSmall}"><lable class="font-weight-bold">${printName}</label></h5>
                                </div>
                                <div class="cart_row below-label d-none">
                                    <h6 class="winner_location"><label><img src="app.icon/map-marker.png" class="icon1"></label><lable>${that.getAttribute(
                                      "place"
                                    )}</label></h6>
                                </div>
                                <div class="cart_row below-label d-none" style="position:relative;">
                                    <h5 class="winner_date"><label><img src="app.icon/calender.png" class="icon2"></label><lable class="font-weight-bold">${that.getAttribute(
                                      "drawdate"
                                    )}</label></h5>
                                </div>
                            </div>
                        </div>
                    </div>`;
  }
}
function winnerAmountFormat(firstPrize) {
  const len_amount = Math.floor(firstPrize).toString().length;
  let formattedAmount;

  if (len_amount <= 5) {
    formattedAmount = `<span style="font-size:52px;">${parseFloat(
      firstPrize
    )}</span>`;
  } else if (len_amount < 8) {
    const lakhs = firstPrize / 100000;
    formattedAmount = `<span style="font-size:52px;">${
      Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)
    }</span> Lakhs`;
  } else {
    const crores = firstPrize / 10000000;
    formattedAmount = `<span style="font-size:52px;">${
      Number.isInteger(crores) ? crores : crores.toFixed(1)
    }</span> Cr`;
  }

  return formattedAmount;
}
