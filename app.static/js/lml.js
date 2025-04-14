$(document).ready(function () {
    // your code
})
var user = getuserdata();
var previewSrc = "";
{
    //-------------------winnerball

    class WinnerCard extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
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


    // New Tag registration named winning-ball
    customElements.define("winner-card", WinnerCard);
    function createWinnerCard(that) {
        that.str = `<div class="card" style="height: 475px; width: 236px; padding: 0px;box-shadow: 1px 1px 1px 1px lightgray;">
    <div class="card-body" style="padding: 0px;background: white;text-align: center;font-weight: bold;"><div> <label style="font-family: bariol; font-size: 14px;font-weight: bold;">${that.getAttribute("name")}</label></div>
    <div> <label style="font-family: bariol; font-size: 14px;font-weight: bold;">${that.getAttribute("place")}</label></div>
    <div style="padding-left: 13px; padding-right: 13px; height: 325px; width: 100%;"><new-winner data-phno=${that.getAttribute("mdata-phno")} winIMG='${that.getAttribute("winIMG")}' winid=${that.getAttribute("winid")}></new-winner></div>
    <div><span style="font-family: bariol; font-size: 17px;font-weight: bold;">${that.getAttribute("lotteryname")}</span></div>
    <div><span style="font-family: bariol; font-size: 12px;font-weight: bold; color:gray;">Draw Date:${that.getAttribute("drawdate")}</span></div>
    <div style="font-family: bariol; color:#0055FF;font-size: 18px;font-weight: bold;"><sup style="top: -0.1em !important;color:#0055FF;">
    <span style="font-size: 15px;">₹</span>
    </sup>${formatPrize(parseInt(that.getAttribute("winamt")))}</div>
    <div></div>
    </div>
    </div>`;
    }
    //--------------
}




// Winner block

class NewWinner extends HTMLElement {
    static get observedAttributes() {
        return ['no'];
    }
    connectedCallback() {
        showWinnerImage(this);
    }
}

function showWinnerImage(that) {
    var winIMGURL = that.getAttribute("winIMG");
    if (winIMGURL != "")
        that.innerHTML = `<img class="winnerimage" name="${that.getAttribute("data-phno")}" style="width: 100%; height: 325px;" src="${winIMGURL}">`;
    else
        that.innerHTML = `<img class="winnerimage" name="${that.getAttribute("data-phno")}" style="width: 100%; height: 325px;" src="${winIMGURL}" alt="">`;
    // var param = {}
    // param["action"] = "GETWINNERIMAGE";
    // param["mobileno"] = that.getAttribute("data-phno");
    // param["id"] = that.getAttribute("winid");
    // loadData('winner', 'REQ001', 'GETWINNERIMAGE', param, 'COMMON').then(response => {
    //     // console.log(response)
    //     if (response.status == "SUCCESS") {
    //         that.innerHTML = `<img class="winnerimage" name="${param["mobileno"]}" style="width: 100%; height: 325px;" src="data:image/jpeg;base64,${response.imagedata}">`;
    //     } else {
    //         that.innerHTML = `<img class="winnerimage" name="${param["mobileno"]}" style="width: 100%; height: 325px;" src="data:image/jpeg;base64,${response.imagedata}">`;
    //     }
    // });
}


customElements.define("new-winner", NewWinner);




//Timer Block
{
    {/*
     TO start using this tag you need to use it as
     Example:
     <count-down  end="00:00:00:20"></count-down><br>
     <count-down  end="00:00:00:40"></count-down><br>
     Attributes:
     end:  needs to be set with the remaining time in format dd:hh:mm:ss (mandatory)
     */
    }
    class CountDown extends HTMLElement {
        static get observedAttributes() {
            return ['end'];
        }
        connectedCallback() {
            settimer(this);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            settimer(this);
        }

    }
    function settimer(that) {
        var id = that.getAttribute('id') || "";
        var fr = that.getAttribute('for') || "";
        var left = that.getAttribute('end').split(":") || "00:00:00";
        if (left[0] >= 1 || left[1] >= 1) {
            that.innerHTML = "<b>" + left[0] + "</b><sup>h</sup> <b>" + left[1]
                + "</b><sup>m</sup> <b>" + left[2] + "</b><sup>s</sup>";
            // + left[3] + "</b><sup>s</sup>";
        } else {
            that.innerHTML = left[2] + "</b><sup>s</sup>";
        }
        if (that.timer)
            clearInterval(that.timer);
        that.timer = setInterval(function () {
            left = minus(that, left)
        }, 1000);
    }
    customElements.define("count-down", CountDown);
    // function to reduce time by 1 sec
    var minus = function (obj, time) {
        // if (time[3] > 0) {
        //     time[3] -= 1;
        //     if (time[3].toString().length == 1) {
        //         time[3] = '0' + time[3]
        //     }
        // }
        // else {
        if (time[2] > 0) {
            time[2] = parseInt(time[2]) - 1;
            // time[3] = 59;
            if (time[2].toString().length == 1) {
                time[2] = '0' + time[2]
            }
        } else {
            if (time[1] > 0) {
                time[1] = parseInt(time[1]) - 1;
                time[2] = 59;
                //time[3] = 59;
                if (time[1].toString().length == 1) {
                    time[1] = '0' + time[1]
                }
            } else {
                if (time[0] > 0) {
                    time[0] = parseInt(time[0]) - 1;
                    time[1] = 23;
                    time[2] = 59;
                    //time[3] = 59;
                }
                if (time[0].toString().length == 1) {
                    time[0] = '0' + time[0]
                } else {
                    clearInterval(obj.timer);
                    timerup(obj);
                    // loadComponent('component_viewTicket');
                }
            }
        }
        // }
        if (time[0] >= 1 || time[1] >= 1) {
            obj.innerHTML = "<b>" + time[0] + "</b><sup>h</sup> <b>" + time[1]
                + "</b><sup>m</sup> <b>" + time[2] + "</b><sup>s</sup>";
            // + time[3] + "</b><sup>s</sup>";
        } else {
            obj.innerHTML = time[2] + "</b><sup>s</sup>";
        }
        // obj.innerHTML = "<b>" + time[0] + "</b><sup>d</sup> <b>" + time[1]
        //     + "</b><sup>h</sup> <b>" + time[2] + "</b><sup>m</sup>" + time[3] + "</b><sup>s</sup>";
        return time;
    }

}

{
    //-------------------winnerball

    class ShopLotteryCard extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createcard(this);
            this.innerHTML = this.str;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            createcard(this);
            this.innerHTML = this.str;
        }
    }



    // New Tag registration named winning-ball
    customElements.define("shop-lottery-card", ShopLotteryCard);
    function createcard(that) {
        var lotname = that.getAttribute('lotname') || "";
        var lotcode = that.getAttribute('lotcode') || "";
        var drawdate = that.getAttribute('drawdate') || "";
        var drawtime = that.getAttribute('drawtime') || "";
        var salestop = that.getAttribute('salestop') || "";
        var mrp = that.getAttribute('mrp') || "";
        var lotImgType = that.getAttribute('imagetype') || "";
        var pagelottery = that.getAttribute('pagelottery') || 'false';
        var imgFURL = that.getAttribute('imgFURL') || "";
        var courier_charges = that.getAttribute('courier_charges') || "";

        that.str = `<div onclick="" style="cursor:pointer;font-weight: bold;${pagelottery == 'true' ? "padding:2px" : "padding:20px"}">
    <div class="single-product ${drawdate + "_" + lotcode + "_lotteryClassId"}" id='${lotcode}' style="margin:0px;background: white;${lotImgType == 'P' ? "width: 270px;" : "width: 510px;"} ${pagelottery == 'true' ? "height: 560px" : "height: 510px;"}box-shadow: 1px 1px 1px 1px lightgrey;">
    <shop-lottery-card-img drawdate='${drawdate}' imgFURL="${imgFURL}" lotcode='${lotcode}'  style='background-color: #F1F3F7; border: 4px solid #fff; display:block;${pagelottery == 'true' ? "height: 400px; width: 100%;" : "height: 400px; width: 100%;"}' > </shop-lottery-card-img>`

        // if (pagelottery == 'true') {
        let dataArr = [{ lotcode: lotcode, drawdate: drawdate }];
        that.str += `    <div class="add-to-cart" id="addToCartBtn_${lotcode + drawdate}" style="color: white; background-color: #FFBD39; text-align: center; font-weight: bold; padding: 7px;"  onclick='captureClicks("25","ADD",${JSON.stringify(dataArr)});'>
      ADD TO CART
      </div>`;
        // }


        that.str += `<div class="product-details" style="padding:7px;text-align: left;">
    <div class="row" style="font-size:small;padding: 0px 20px 0px 15px;">

    <div style="text-align: center; font-family: bariol; padding:0px;${lotImgType == 'P' ? "font-size: 14px;" : "font-size: 20px;"};color: gray;" class="price col-12">Draw Date :
    <b>${beautify(drawdate + " 00:00:00", 'd.m.y')}</b> : Time : <b>${beautify(drawdate + " " + drawtime, 'h:i a')}</b>
    </div>
    <div class='col-12' style="text-align: center; font-family: bariol; font-weight: bold;${lotImgType == 'P' ? "font-size: 14px;" : "font-size: 20px;"};color: grey;">
    Sale Stop At : <b>${beautify(salestop, 'd.m.y h:i a')}</b>
    </div>
    </div>
    </div>
    </div>
    </div>`;
    }

    //--------------
}

{
    //-------------------winnerball

    class cartCard extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createcartcard(this);
            this.innerHTML = this.str;
            //            ((this.getAttribute('showaddbuybtn') != null) ? $('.magnifier-preview').show() : $('.magnifier-preview').hide())
        }
        attributeChangedCallback(name, oldValue, newValue) {

        }
    }

    function hideShow(id, pagelottery, drawdate) {
        // if (pagelottery == 'true') {
        $('#addToCartBtn_' + id + drawdate).css('visibility', 'visible');
        // }
    }

    function hideShow1(id, pagelottery, drawdate) {
        // if (pagelottery == 'true') {
        $('#addToCartBtn_' + id + drawdate).css('visibility', 'hidden');
        // }
    }



    // New Tag registration named winning-ball
    customElements.define("cart-card", cartCard);

    function createcartcard(that) {
        var lotname = that.getAttribute('lotname') || "";
        var lotcode = that.getAttribute('lotcode') || "";
        var drawdate = that.getAttribute('drawdate') || "";
        var drawtime = that.getAttribute('drawtime') || "";
        var salestop = that.getAttribute('salestop') || "";
        var myorder = that.getAttribute('myorder') || false;
        var remark = that.getAttribute('remark') || "";
        var imgFURL = that.getAttribute('imgFURL') || "";
        var imgBURL = that.getAttribute('imgBURL') || "";
        var otherImgURL = that.getAttribute('otherImgURL') || "";
        // otherImgURL = JSON.parse(otherImgURL);
        var bunchdetails = that.getAttribute('bunchdetails') || "";
        bunchdetails = JSON.parse(bunchdetails);
        var mrp = that.getAttribute('mrp') || "";
        var showAddBuyBtn = that.getAttribute('showaddbuybtn') || false;

        var sub_scriptid = that.getAttribute('subid') || "";
        var discount_amount = that.getAttribute('discount') || "";
        var noofdraws = that.getAttribute('noofdraws') || "";
        var subscription_amt = that.getAttribute('subscription_amt') || "";
        var mrpamt = that.getAttribute('mrpamt') || "";
        var discountpercent = that.getAttribute('discountpercent') || "";
        var courier_charges = that.getAttribute('courier_charges') || "";

        var virtualTicket = that.getAttribute('virtualticket') || "N";

        shopcart = [];
        if (getCookie("rlcart") != "" && getCookie("rlcart") != null && getCookie("rlcart") != undefined) {
            var totalcart = JSON.parse(getCookie("rlcart"));
            for (let l = 0; l < totalcart.length; l++) {
                if (totalcart[l].lotcode == lotcode && totalcart[l].drawdate == drawdate) {
                    shopcart = totalcart[l];
                    break;
                }
            }
        }
        flag = 0;
        if (shopcart.hasOwnProperty('bunchdetails') && !myorder)
            flag = 1;

        that.str = `<div id='cart-box${drawdate}${lotcode}' style="font-size: smaller; ">
    <div class="row modal-body text-left" style="background:white;padding:0px;padding-top: 10px;">`;
        if (!showAddBuyBtn && myorder == false) {
            that.str += `<div class="col-sm-1 col-md-1 col-lg-1" style='padding-top: 200px;width:unset'>
      <input class='cart-checkbox' type="checkbox" id="cart-checkbox${drawdate}${lotcode}" drawdate="${drawdate}" lotcode="${lotcode}" name='cart-lotterycheck-box' onclick='addInBuyNow(this)' style='display:none' />
      <label for="cart-checkbox${drawdate}${lotcode}"></label>
      </div>`
        }
        that.str += `<div class="${!showAddBuyBtn ? 'col-sm-11 col-md-3 col-lg-3' : 'col-sm-12 col-md-5 col-lg-5'}" style='padding:0px;width:unset'>

        <main-lottery-card-img style='    width: 100%;display: block;' drawdate='${drawdate}' lotcode='${lotcode}' imgFURL="${imgFURL}" ></main-lottery-card-img>
    <!--<img class="img-fluid" style="max-height: 402px;width:100%;" src="app.static/img/front-1022.jpg" alt="">-->`;
        if (showAddBuyBtn) {
            that.str += `<multi-lottery-image imgFURL="${imgFURL}" imgBURL="${imgBURL}" otherImgURL=${otherImgURL} drawdate='${drawdate}' lotcode='${lotcode}'>  </multi-lottery-image>`;
        }
        that.str += `</div>
    <div class="${!showAddBuyBtn ? 'col-sm-12 col-md-7 col-lg-7 offset-lg-1' : 'col-sm-12 col-lg-6 offset-lg-1'}" style="">
    <div class="s_product_text" style="margin-top: 10px;">
    <div class='row'>
    <div class='col-10'>
    <h3 style="margin:0px;color: gray;">${lotname}</h3>
    </div>`;
        if (!showAddBuyBtn && myorder == false) {
            that.str += `<div class='col-1'>
      <i style="font-size:24px" onclick='wishList("${flag == 1 ? shopcart.cartid : ""}",this,"${drawdate}","${lotcode}");'  class="fa ${flag == 1 ? (shopcart.favourite == 1 ? "fa-heart" : "fa-heart-o") : "fa-heart-o"}"></i>
      </div>
      <div class='col-1' onclick='removeticket("${lotcode}","${drawdate}");removeBuyNow("${drawdate}","${lotcode}");' >
      <i style="font-size:24px"  class="fa">&#xf014;</i>
      </div>`;
        }

        that.str += `</div>
    <h3 style="margin:0px;font-weight: bold;font-size: 19px;    margin-top: 10px;margin-bottom: 10px;">₹ ${mrp}.00</h3>
    <ul class="list" style='line-height:1.8'>
    <li style="color: black;">
    <a class="" href="#" style="color: black;">
    <span style="color: black;">Drawdate</span> : ${beautify(drawdate + " " + drawtime, 'd.m.y')}</a>
    </li>
    <li>
    <a href="#">
    <span>Draw Time</span> : ${beautify(drawdate + " " + drawtime, 'h:i a')}</a>
    </li>

    <li style="color: black;font-size: 15px;">Sale Stop Date &amp; Time :
    <span style="color: black;">${beautify(salestop, 'd.m.y h:i a')}</span>
    </li>
    </ul>
    <table id="cart-product-table" style="width: 100%;    margin-top: 25px;margin-bottom: 10px;" class="table">
    <thead>
    <tr>
    <th style="    padding: 0px;padding-top: 5px;font-size: 15px;padding-bottom: 5px;" ><h5 style='width:70px'>*Book</h5></th>
    <th style="    padding: 0px;padding-top: 5px;font-size: 15px;padding-bottom: 5px; text-align: center;" ><h5 style='width:90px' >Quantity</h5></th>
    <th style="    padding: 0px;padding-top: 5px;font-size: 15px;padding-bottom: 5px;" ><h5 style='width:90px' >Total</h5></th>
    </tr>
    </thead>
    <tbody id="cart-product-table">`;
        totmrp = 0;
        totqty = 0;
        if (flag != 0) {
            bunchdetails = shopcart['bunchdetails'];
        }
        for (let k = 0; k < bunchdetails.length; k++) {
            that.str += `<tr>
      <td style="border: none;padding-bottom:0px;padding-top:17px;padding-bottom:5px">
      <h5 style='width:70px' > ${bunchdetails[k]['series_qty'] || 5}/${bunchdetails[k]['qty'] || 25}</h5>
      </td>
      <td style="border: none;padding: 0px;padding-top:5px;padding-bottom:5px">
      <div class="product_count"  style="margin-bottom: 0px;border:1px solid">
      <input ${myorder ? "disabled" : ""} type="button" onclick='dcrQty(${mrp},"${imgFURL}","${imgBURL}",${otherImgURL == "" ? "null" : `${otherImgURL}`}, ${bunchdetails[k]['qty']},"${drawdate}","${lotcode}","${drawtime}" ,"${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${k},${showAddBuyBtn},${courier_charges})' style="    font-size: 23px;    background: white;border: none;width:unset" name="qty" value='-' >
      <input ${myorder ? "disabled" : ""}  type="text" style="padding: 5px;width: 30px;background: white;border: none;border-radius: 0px;text-align: center;font-size: 15px;margin-top: 2px;"
      name="qty" id="sst${drawdate}${lotcode}${k}" maxlength="12" value="${flag == 0 ? bunchdetails[k]['selectedqty'] || 0 : shopcart['bunchdetails'][k]['selectedqty']}" title="Quantity:" class="input-text qty"
      disabled="">
      <input ${myorder ? "disabled" : ""} type="button" onclick='incrQty(${mrp},"${imgFURL}","${imgBURL}",${otherImgURL == "" ? "null" : `${otherImgURL}`}, ${bunchdetails[k]['qty']},"${drawdate}","${lotcode}","${drawtime}" ,"${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${k},${showAddBuyBtn},${courier_charges})' value='+' style="    font-size: 23px;background: white;border: none;width:unset">
      </div>
      </td>
      <td style="border: none;padding:0px;padding-top:17px;padding-bottom:5px">
      <h5 style='width:90px'>₹<span id='total-mrp${drawdate}${lotcode}${k}'>${flag == 0 ? (mrp * bunchdetails[k]['selectedqty'] * bunchdetails[k]['qty']) || 0 : shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty']}</span>.00</h5>
      </td>
      </tr>`;
            if (flag == 1) {
                totmrp = parseInt(totmrp) + shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty'];
                totqty = parseInt(totqty) + parseInt(shopcart['bunchdetails'][k]['selectedqty']);
            } else {
                totmrp = parseInt(totmrp) + mrp * bunchdetails[k]['selectedqty'] * bunchdetails[k]['qty'];
                totqty = parseInt(totqty) + parseInt(bunchdetails[k]['selectedqty']);
            }

        }


        that.str += `
        <tr style="border-top: 2px solid #dee2e6;">
    <td style="border: none;padding:0px;padding-top:4px">

    </td>
    <td style="border: none;padding:0px;padding-top:4px">

    </td>
    <td style="border: none;padding:0px;padding-top:4px">

    </td>
    </tr>
    <!--<tr>
    <td style="border: none;padding-bottom:0px;    vertical-align: middle;overflow:hidden">
    <h5 style="width:70px;font-weight:bold;white-space: nowrap;"> #Customer Preference</h5>
    </td>
    <td colspan="2" style="border: none;padding-bottom:0px">
    <div class="form-group">
    <textarea  style='height: 50px;' class="form-control" onchange='addremarkToCartBuyNow("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${drawdate}","${lotcode}","${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${showAddBuyBtn},${courier_charges})' name="remark${drawdate}${lotcode}" id="remark${drawdate}${lotcode}" rows="1" placeholder="Enter Message" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'Enter Remark'">${flag == 0 ? remark : shopcart['remark']}</textarea>
    </div>
    </td>
    </tr>-->
    </tbody>
    </table>
    <div class = 'row'>
    <div class='col-lg-6 col-md-6 col-sm-12' style="border: none;padding-bottom:0px;    vertical-align: middle;overflow:hidden">
    <h5 style="width:70px;font-weight:bold;white-space: nowrap;"> #Customer Preference</h5>
    </div>
    <div class='col-lg-6 col-md-6 col-sm-12'  style="border: none;padding-bottom:0px">
    <div class="form-group">
    <textarea ${myorder ? "disabled" : ""}  style='height: 50px;' class="form-control" onchange='addremarkToCartBuyNow("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${drawdate}","${lotcode}","${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${showAddBuyBtn},${courier_charges})' name="remark${drawdate}${lotcode}" id="remark${drawdate}${lotcode}" rows="1" placeholder="Enter Message" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'Enter Remark'" onkeypress="return KeyPressHandler('ALPHA', event, ' ')"
                                   oninput="return RegularExpHandler('ALPHASPACE',this.id,' ')">${flag == 0 ? remark : shopcart['remark']}</textarea>
    </div>
    </div>
    </div>

    `;

        that.str += `</div>
    
    </div><div class ='col-12'  style="  ${myorder ? 'display:none; background-color: #fbecec; padding-bottom: 20px; font-size: 16px;line-height: 1.5;color: black;font-size: 18px; font-weight:500; padding-top:1%; border: 1px solid #eae3d3;' : 'margin-left: 14px;'}  " >
    
    `;
        if (myorder == false) {
            that.str += `<div class="col-12 row" style= 'background-color: #fbecec; padding-bottom: 20px; font-size: 16px;line-height: 1.5;color: black;font-size: 18px; font-weight:500; padding-top:1%; border: 1px solid #eae3d3;display:none;'>
       <div class="col-6" id="subscription-row">`;
            that.str += `<div class='col-12 mt-2'>
      <sub-scription-for-all style='width: 100%;display: block;'lotcode='${lotcode}'  drawdate='${drawdate}' mrp='${mrp}' showbtn='${showAddBuyBtn}'></sub-scription-for-all>
      </div>
      </div>`;
            that.str += `<div class='col-6' id='virtual-ticket${drawdate}${lotcode}'>
      <div class ='col-12' >
        <label></label>
        <div class="row">
          <div class="col-12" style="padding-top:30px;">
              <div class="tool-tip">
                <label  class="Sub_Script"  style="display:inline;">View Your Ticket Service 
                  <input type="checkbox"  ${myorder ? "disabled" : ""} ${virtualTicket == "Y" ? "checked" : ""}  name="virtual${drawdate + lotcode}" id="virtual${drawdate + lotcode}" onchange='setVirtualTicket("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${drawdate}","${lotcode}","${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${showAddBuyBtn},${courier_charges});'/>
                  <span class="checkmark"></span>
                </label>
                <img id="toolTipImg${lotcode}" class="tool-tip-img"  src="https://img.icons8.com/flat_round/64/000000/question-mark.png" style="width:20px;cursor: pointer; position: relative;" onmouseover="showTooltip('tooltipContent${lotcode}')" onmouseout="hideTooltip('tooltipContent${lotcode}')" />
                <div id="tooltipContent${lotcode}" class="tooltip-content" style="font-size: 12px; position: absolute; bottom: 0; width: 100%; background-color: #aadbf9; padding: 10px; padding-bottom: 0; box-sizing: border-box; border-radius: 4px; visibility: hidden; opacity: 0; transition: 0.5s; transform: translateX(3%) translateY(40px); z-index: 2;" onmouseover="showTooltip('tooltipContent${lotcode}')" onmouseout="hideTooltip('tooltipContent${lotcode}')">
                  <p>What is keep ticket safe?<br>a.Keep ticket safe is a service which we are providing to our customers in which all the purchased ticket are kept safe to our office. However we scan all the tickets which you have bought and display the same to you on website at transaction<br> <p style="text-align: right;"><b data-toggle="modal" data-target="#tooltipModal" style="cursor: pointer;">More</b></p></p>
                </div>
              </div>
          </div>
          <div class ='col-12' >
          <img src="app.static/img/Safe_Ticket_Symbol.jpg"/><label style='    display: contents;font-weight:18px; font-style:italic' class="Sub_Script">Your Tickets Safe With Us</label>
          </div>
        </div>
      </div>
    </div></div>
    </div>
    `;
            that.str += `<div class='col-12' style='background-color:white;'>
      <div class='col-12 mt-2' style= 'padding-bottom: 0px; font-size: 16px;color: black;font-size: 18px; font-weight:500; background-color: #c1f4c1;; padding-top:1%; border: 2px solid #eae3d3;'>
      <sub-scription-details style='    width: 100%;display: block;'lotcode="${lotcode}" mrp="${mrp}"  drawdate="${drawdate}"></sub-scription-details>
      </div>
      </div>`;
        } else {
            var discountPrct = (discountpercent == "undefined" ? 0 : parseInt(discountpercent));
            var ticketPrice = (mrpamt == "undefined" ? 0 : parseInt(mrpamt));
            var subscriptionAmt = (subscription_amt == "undefined" ? 0 : (parseInt(subscription_amt) - ticketPrice));
            var discountAmount = '';
            if (discount_amount == "undefined" || discount_amount == "" || discount_amount == null) {
                discountAmount = 0;
            } else {
                discountAmount = parseInt(discount_amount) * (noofdraws);
            }
            var sub_Total = ticketPrice + subscriptionAmt - discountAmount;

            if (sub_scriptid == "undefined" || sub_scriptid == "" || sub_scriptid == null) {

                that.str += `<div class='col-6' id='virtual-ticket${drawdate}${lotcode}'>
        <div class ='col-12' >
          <label></label>
          <div class="row">
            <div class="col-12" style="padding-top:30px;">
                <div class="tool-tip">
                  <label  class="Sub_Script"  style="display:inline;">View Your Ticket Service 
                    <input type="checkbox"  ${myorder ? "disabled" : ""} ${virtualTicket == "Y" ? "checked" : ""}  name="virtual${drawdate + lotcode}" id="virtual${drawdate + lotcode}" onchange='setVirtualTicket("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${drawdate}","${lotcode}","${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${showAddBuyBtn},${courier_charges});'/>
                    <span class="checkmark"></span>
                  </label>
                  <img id="toolTipImg${lotcode}" class="tool-tip-img"  src="https://img.icons8.com/flat_round/64/000000/question-mark.png" style="width:20px;cursor: pointer; position: relative;" onmouseover="showTooltip('tooltipContent${lotcode}')" onmouseout="hideTooltip('tooltipContent${lotcode}')" />
                  <div id="tooltipContent${lotcode}" class="tooltip-content" style="font-size: 12px; position: absolute; bottom: 0; width: 100%; background-color: #aadbf9; padding: 10px; padding-bottom: 0; box-sizing: border-box; border-radius: 4px; visibility: hidden; opacity: 0; transition: 0.5s; transform: translateX(3%) translateY(40px); z-index: 2;" onmouseover="showTooltip('tooltipContent${lotcode}')" onmouseout="hideTooltip('tooltipContent${lotcode}')">
                    <p>What is keep ticket safe?<br>a.Keep ticket safe is a service which we are providing to our customers in which all the purchased ticket are kept safe to our office. However we scan all the tickets which you have bought and display the same to you on website at transaction<br> <p style="text-align: right;"><b data-toggle="modal" data-target="#tooltipModal" style="cursor: pointer;">More</b></p></p>
                  </div>
                </div>
            </div>
            <div class ='col-12' >
            <img src="app.static/img/Safe_Ticket_Symbol.jpg"/><label style='    display: contents;font-weight:18px; font-style:italic' class="Sub_Script">Your Tickets Safe With Us</label>
            </div>
          </div>
        </div>
      </div></div>`;
            } else {
                that.str += ` <div class="col-6" >`;
                that.str += `<div class='col-12 mt-2' style= 'background-color: #fbecec; padding-bottom: 20px; font-size: 16px;line-height: 1.5;color: black;font-size: 18px; font-weight:500; padding-top:1%; border: 1px solid #eae3d3;'>`
                that.str += `<label style="font-size: 16px;padding-left: 14px;">Select Your subscription tickets.</label>
        <div class="row">
        <div class="col-12" style='border-top: 3px solid #eae3d3;'>
        <div class="row mt-3 mb-2">
        <div class="col-12" style="padding-left : 30px;">
        <label class="Sub_Script">Subscription
        <input type="checkbox"  id="sub-scribe" checked disabled>
        <span class="checkmark"></span>
        </label>
        </div>

        <div class="col-12" style="padding-left: 0px; padding-right: 25px;">
        <div  style="color: #6f6f6f;margin-top: 10px;">
        <div class="pap-list" style="color: lightgrey;">
        <select  class="form-control" style="font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:40%;margin-left:66px;    border: 1px solid;" disabled>
        <option>${noofdraws} Draws (${discountPrct}% Discount)</option>
        </select>
        </div> 
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        `
                that.str += `<div class='col-6' id='virtual-ticket${drawdate}${lotcode}'>
        <div class ='col-12' >
          <label></label>
          <div class="row">
            <div class="col-12" style="padding-top:30px;">
                <div class="tool-tip">
                  <label  class="Sub_Script"  style="display:inline;">View Your Ticket Service 
                    <input type="checkbox"  ${myorder ? "disabled" : ""} ${virtualTicket == "Y" ? "checked" : ""}  name="virtual${drawdate + lotcode}" id="virtual${drawdate + lotcode}" onchange='setVirtualTicket("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${drawdate}","${lotcode}","${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},${showAddBuyBtn},${courier_charges});'/>
                    <span class="checkmark"></span>
                  </label>
                  <img id="toolTipImg${lotcode}" class="tool-tip-img"  src="https://img.icons8.com/flat_round/64/000000/question-mark.png" style="width:20px;cursor: pointer; position: relative;" onmouseover="showTooltip('tooltipContent${lotcode}')" onmouseout="hideTooltip('tooltipContent${lotcode}')" />
                  <div id="tooltipContent${lotcode}" class="tooltip-content" style="font-size: 12px; position: absolute; bottom: 0; width: 100%; background-color: #aadbf9; padding: 10px; padding-bottom: 0; box-sizing: border-box; border-radius: 4px; visibility: hidden; opacity: 0; transition: 0.5s; transform: translateX(3%) translateY(40px); z-index: 2;" onmouseover="showTooltip('tooltipContent${lotcode}')" onmouseout="hideTooltip('tooltipContent${lotcode}')">
                    <p>What is keep ticket safe?<br>a.Keep ticket safe is a service which we are providing to our customers in which all the purchased ticket are kept safe to our office. However we scan all the tickets which you have bought and display the same to you on website at transaction<br> <p style="text-align: right;"><b data-toggle="modal" data-target="#tooltipModal" style="cursor: pointer;">More</b></p></p>
                  </div>
                </div>
            </div>
            <div class ='col-12' >
            <img src="app.static/img/Safe_Ticket_Symbol.jpg"/><label style='    display: contents;font-weight:18px; font-style:italic' class="Sub_Script">Your Tickets Safe With Us</label>
            </div>
          </div>
        </div>
      </div></div>`;
            }

            that.str += `
      <div class='col-12 mt-2 mb-2' style='font-weight:500; background-color: #c1f4c1; font-size: 16px; border: 2px solid #f1f3f7;'>
      <div class='col-12 mt-1' style= 'padding-bottom: 0px; color: black; font-weight:500; padding-top:1%;'>
      <div class="col-12">
      <div class="row mt-1 mb-1" id="Ticket Details">


      <div class="col-9" >
      <h5 style="">
      <nobr>Ticket Price(<label style="" id="total-qty">${totqty}</label> Tickets X ₹ ${mrp}.00)
      </nobr>
      </h5>
      </div>
      <div class="col-3" style="text-align: right;">
      ₹<span id="total-amt">${ticketPrice}</span>.00
      </div>




      <div class="col-12 mt-1 mb-1" style="    width: 100%; display:${sub_scriptid == "undefined" ? "none" : "block"}" id="Subscription_draw">
      <div class="row">
      <div class="col-9">
      <nobr> Subscription Amount(<label id="Subscription-draw-no">${(noofdraws - 1)} Draws</label>)</nobr>
      </div>
      <div class="col-3" style="text-align: right;">
      <nobr>₹<label id="Subscribtion-draw-amount">${subscriptionAmt}</label>.00</nobr>
      </div>
      </div>
      </div>
      <div class="col-12 mt-1 mb-1" style="width: 100%; color:#247fca" id="Subscribtion_discount">
      <div class="row">
      <div class="col-9">
      Discount
      </div>
      <div class="col-3" style="text-align: right;">
      - ₹ <label id="Subscribtion-discount-amount">${discountAmount}</label>.00
      </div>
      </div>
      </div>
      <div class="col-12 mb-1 pt-1" style="font-weight:bold; border-top:2px solid;    width: 100%;" id="Subtotal">
      <div class="row">
      <div class="col-9">
      Sub Total
      </div>
      <div class="col-3" style="text-align: right;">
      ₹<label id='Subtotalamount'>
      ${sub_Total}
      </label>.00
      </div>

      </div></div></div>`


        }

        if (showAddBuyBtn) {
            let dataArr = [{ lotcode: lotcode, drawdate: drawdate }];
            that.str += `<div class="col-12"><div class="row" style="margin-top: 15px;">
      <div class="col-6">
      <div class = 'row' style= 'font-size: 11px;line-height: 1.5;color: black;'>
      <div class='col-12'>
      Note:
      <ul style='list-style-type: square;'>
      <li> * Book of same number</li>
      <li> # You can write your choice digit an explanation remark box be will try to fulfill </li>
      </ul>
      </div>
      </div>
      </div>
      <div class="col-6 s_product_text" style="margin-top: 15px;">
      <div class="row" style="color: black;font-weight: bold;font-size: small;">
      <div class="col-lg-6 col-md-6 col-sm-12 card_area d-flex align-items-center" style="margin-bottom:10px;padding:0px;    text-align: center;">
      <a class="primary-btn" id="add-to-cart" style="width:100%" onclick='addticket("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${0}","${drawdate}","${lotcode}"," ${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},"${0}","add","cart","${courier_charges}"); captureClicks("25", "ADD", ${JSON.stringify(dataArr)});'>Add to Cart</a>

      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 card_area d-flex align-items-center" style="margin-bottom:10px;padding:0px;    text-align: center;">
      <a class="primary-btn" id="buy-now" style="width:100%;background-color: #ef7f07;" onclick='LoadPlaceOrderPageLML("${drawdate}","${lotcode}"); addticket("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${0}","${drawdate}","${lotcode}"," ${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},"${0}","add","buynow","${courier_charges}");'>Buy Now</a>
      </div>
      </div></div>
      </div></div>`;
            //<a class="primary-btn" id="buy-now" style="width:100%;background-color: #ef7f07;" onclick='buynow=[];addticket("${mrp}","${imgFURL}","${imgBURL}",${otherImgURL},"${0}","${drawdate}","${lotcode}"," ${drawtime}","${lotname}","${salestop}",${JSON.stringify(bunchdetails)},"${0}","add","buynow","${courier_charges}");LoadPlaceOrderPageLML()'>Buy Now</a>
        }
        that.str += `</div>
        </div>`;

        that.str += `<div class="modal fade" id="tooltipModal" tabindex="-1" role="dialog" aria-labelledby="tooltipModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="background: #c7bfe6; color: #000;">
              <div class="modal-body" style="font-size: 12px;">
                <button type="button" class="close float-right" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <p class="text-center" style="text-decoration: underline;"><b>Keep Ticket Safe</b></p>

                <p style="text-align: left;">
                  1) What is keep ticket safe?<br><br>
                  <span style="padding-top: 5px;">
                    a. Keep ticket safe is a service which we are providing to our customer in which all the purchased
                    ticket are kept safe to our office. However, we scan all the ticket which you have bought and
                    display the same to you on website at transaction -&gt; scan ticket page. This scanned copy
                    guarantees your ownership of ticket and only you will be entitled to benefit of prize money.
                  </span>
                </p>
                <p style="text-align: left;">
                  2) Am I able to see my purchased ticket before draw?<br><br>
                  <span style="padding-top: 5px;">
                    a. Yes, we will take maximum care to upload your purchased tickets on website so that you can
                    view it before the draw starts. In an unfortunate situation if we are unable to upload the tickets
                    then we will cancel your transaction &amp; we will keep you update on situation at earliest.
                  </span>
                </p>
                <p style="text-align: left;">
                  3) Where is my original ticket?<br><br>
                  <span style="padding-top: 5px;">
                    a. Original tickets are stored at our operational office. Where dispatch &amp; handling takes place.
                    These tickets are stored safely with your name on the back of ticket.
                  </span>
                </p>
                <p style="text-align: left;">
                  4) How do I know that displayed ticket belongs to me?<br><br>
                  <span style="padding-top: 5px;">
                    a. This has 2-layer system firstly you can view the invoice/delivery challan copy in your order section
                    and secondly when we are scanning the tickets, we will also scan the backside of the one of the
                    tickets where you can see your name mentioned on it.
                  </span>
                </p>
                <p style="text-align: left;">
                  5) Why I opt this service?<br><br>
                  <span style="padding-top: 5px;">
                    a. With opting this service firstly, it is totally free of cost.
                    b. Zero your courier charges, as these tickets are not couriered.
                    c. Time taken to view this ticket by you reduced as it is uploaded on portal, without waiting for
                      courier to reach to you which normally takes 1 or 2 days.
                    d. Any winning which is below 10 thousand arising from your bought ticket will be credited
                      immediately to your account this will facilitate you on buying your next lucky ticket earliest.
                  </span>
                </p>
                <p style="text-align: left;">
                  6) How do I know when my tickets are uploaded?<br><br>
                  <span style="padding-top: 5px;">
                    a. We will send an email to you confirming that your tickets are scanned, after which you can login to bookmyrajshree.com and check in my orders section.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>`;

        that.str += `<div class="modal fade" id="errorMessageModal" tabindex="-1" role="dialog" aria-labelledby="errorMessageLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="color: #000;">
            <div class="modal-body box" style="font-size: 22px;">
              <button type="button" class="close float-right qty" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <p class="qty-text"><span class="icon-img"><img src="app.static/assets/warning.png"></span><b>Please select book and qty</b></p>
            </div>
          </div>
        </div>
      </div>`;
        //   updateCartSubTotal();
    }

    //--------------
}

function showTooltip(x) {
    $('#' + x).css({ "visibility": "visible", "opacity": "1", "transform": "translateX(3%) translateY(-40px)" });
}

function hideTooltip(x) {
    $('#' + x).css({ "visibility": "hidden", "opacity": "0", "transform": "translateX(3%) translateY(-50px)" });
}

function LoadPlaceOrderPageLML(drawdate, lotcode) {
    user = getuserdata();
    if (user != null && user != undefined && user != '' && user.hasOwnProperty('mobileno')) {
        //        if (user.mobileno == '' || user.mobile_verification_status == 0) {
        //            swal.fire("Mobile Number Not Verify");
        //            return false;
        //        }
        //        if (user.email == '' || user.email_verification_status == 0) {
        //            swal.fire("Email Id Not Verify");
        //            return false;
        //        }
        if ($('#total-amt' + drawdate + lotcode).html() > 0) {
            loadComponent("placeorder", 'REQ002');
        }

        //         param = {
        //             "brand": "PL",
        //             "state": "WB",
        //             "app": "PLWEB",
        //             "custcode": user.custcode
        //         }
        //         loadData('address', 'REQ001', 'GET_ADDRESS', param, 'COMMON').then(responseArr => {
        // //            console.log(responseArr);
        //             if (responseArr.status == "error") {
        //                 swal.fire(responseArr.message)
        //                 loadComponent("placeorder", 'REQ002');
        //                 return false;
        //             } else
        //                 loadComponent("placeorder", 'REQ002');
        //         });
    } else {
        $('#signup').modal('show');
        sigupCommonFunction();
    }

}

{

    class MultiLotteryCardImg extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createmultilotterycardimg(this, 0);
            // this.innerHTML = this.str;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            createmultilotterycardimg(this, 0);
            this.innerHTML = this.str;
        }
    }

    // New Tag registration named winning-ball
    customElements.define("multi-lottery-image", MultiLotteryCardImg);

    function createmultilotterycardimg(that, count) {
        var imgFURL = that.getAttribute('imgFURL') || "";
        var imgBURL = that.getAttribute('imgBURL') || "";
        var otherImgURL = that.getAttribute('otherImgURL') || "";
        otherImgURL = JSON.parse(otherImgURL);

        str = `<div class=" testimonial-group"><div class="row s_product_carousal_img" style='margin: 10px;'>`;
        if (imgFURL != "" && imgBURL != "") {
            str += `<div class="col-3" style="padding:2px">
          <img class="img-fluid" onclick="setMainImage('${imgFURL}')" style="max-height: 70px;min-height: 70px;max-width: 70px;min-width: 70px;  cursor: pointer;"
          src="${imgFURL}"
          alt="">
          </div>
          <div class="col-3" style="padding:2px">
          <img class="img-fluid" onclick="setMainImage('${imgBURL}')" style="max-height: 70px;min-height: 70px;max-width: 70px;min-width: 70px;  cursor: pointer;"
          src="${imgBURL}"
          alt="">
          </div>
          `;
        }
        if (otherImgURL != "") {
            for (let k = 0; k < otherImgURL.length; k++) {
                str += `<div class="col-3" style="padding:2px">
            <img class="img-fluid" onclick="setMainImage('${otherImgURL[k]['image_url']}')" style="max-height: 70px;min-height: 70px;max-width: 70px;min-width: 70px; cursor: pointer;"
            src="${otherImgURL[k]['image_url']}"
            alt="">
            </div>`;
            }
        }
        str += `</div></div>`;

        that.innerHTML += str;

        $(".s_product_carousal_img").owlCarousel({
            items: 4,
            autoplay: true,
            autoplayTimeout: 5000,
            loop: false,
            nav: false,
            navText: ["", ""],
            dots: false,
            autoWidth: true,
        });

    }

    function setMainImage(img) {
        //        alert("okk1----" + img);
        previewSrc = img;
        $("#main-img-large").attr("src", img);
        $("#main-img").attr("src", img);
    }


}

{
    class subscriptiondetails extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createsubscriptiondetails(this);
            // this.innerHTML = this.str;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            createsubscriptiondetails(this);
            this.innerHTML = this.str;
        }
    }
    customElements.define("sub-scription-details", subscriptiondetails);
    function createsubscriptiondetails(that) {


        that.innerHTML = `<div class="col-12" style="font-size: 16px;">
        <div class="row" id="Ticket Details${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">
    
        <div class="row mt-1 mb-1" style="width: 100%;">
        <div class="col-6" >
        <h5 style="margin-bottom: 0px;">
        <nobr>Ticket Price(<label style="" id="total-qty${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">   ${flag == 0 ? totqty || 0 : totqty}    </label> Tickets X ₹${that.getAttribute('mrp')}.00 )
        </nobr>
        </h5>
        </div>
        <div class="col-3" style="text-align: right;">
        ₹<span id="total-amt${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">  ${flag == 0 ? totmrp || 0 : totmrp} </span>.00
        </div>
        </div>
    
    
    
    
        <div class="row mt-1 mb-1" style="width: 100%;" id="Subscription_draw${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">
    
        </div>
        <div class="row mt-1 mb-1" style="width: 100%; color:#247fca" id="Subscribtion_discount${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">
        <div class="col-6">
        Discount
        </div>
        <div class="col-3" style="text-align: right;">
        - ₹ <label id="Subscribtion-discount-amount${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">0</label>.00
        </div>
        </div>
        <div class="row mb-2 pt-2" style="font-weight:bold; width: 100%;" id="Subtotal${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}">
        <div class="col-6" style="border-top:2px solid;">
        Sub Total
        </div>
        <div class="col-3" style="text-align: right; border-top:2px solid;">
        ₹<label id='Subtotalamount${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}'>
        </label>.00
        </div>
    
        </div></div>`;
    }

    // Subscription
    class SubscriptionForAll extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createsubscription(this);
            // this.innerHTML = this.str;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            createsubscription(this);
            this.innerHTML = this.str;
        }
    }
    customElements.define("sub-scription-for-all", SubscriptionForAll);
    function createsubscription(that) {
        var param = {
            "action": "GET_SCHEMES",
            "lotcode": that.getAttribute('lotcode'),
            "status": "ACTIVE"
        }
        loadData('shop', 'REQ001', 'GET_SCHEMES', param, 'COMMON').then(response => {
            if (response.status.toUpperCase() == "SUCCESS") {
                var sub_option;
                $.each(response.data, function (key, value) {
                    sub_option += `  <option value='${response.data[key].schemeid}|${response.data[key].lotcode}|${response.data[key].noofdraws}|${response.data[key].enddate}|${response.data[key].discount}|${that.getAttribute('drawdate')}|${that.getAttribute('lotcode')}'>
              ${response.data[key].noofdraws} Draws (${response.data[key].discount}% Discount)
              </option>`
                });

                that.innerHTML = `
            <label style="font-size: 16px;padding-left: 14px;">Select Your subscription tickets.</label>
            <div class="row">
            <div class="col-12" style='border-top: 3px solid #eae3d3;'>
            <div class="row mt-3 mb-2">
            <div class="col-12" style="padding-left : 30px;">
            <label class="Sub_Script">Subscription
            <input type="checkbox"  id="sub-scribe-checkbox${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}" onchange="subscription_checkbox(this.checked,this.id,'${that.getAttribute('drawdate')}','${that.getAttribute('lotcode')}',${that.getAttribute('showbtn')})">
            <span class="checkmark"></span>
            </label>
            </div>
            <div class="col-12" style="padding-left: 0px; padding-right: 25px;">
            <div  style="color: #6f6f6f;margin-top: 10px;">
            <div class="pap-list" style="color: lightgrey;">
            <select id="PAP_LIST${that.getAttribute('drawdate')}${that.getAttribute('lotcode')}" onchange="changeScheme(this.id,'${that.getAttribute('drawdate')}',${that.getAttribute('showbtn')},${that.getAttribute('lotcode')})" class="form-control" style="font-family: Helvetica Neue,Helvetica,Arial,sans-serif; width:80%;margin-left:66px;    border: 1px solid;">
    
            </select>
            </div>
            </div>
    
            </div></div>`
                $('#PAP_LIST' + that.getAttribute('drawdate') + that.getAttribute('lotcode')).html('<option value="" select>Select Scheme</option>' + sub_option);

            } else {
                $('#subscription-row').hide();
            }

        });

    }
    //-------------------winnerball

    class ShopLotteryCardImg extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createcardimg(this);
            // this.innerHTML = this.str;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            createcardimg(this);
            this.innerHTML = this.str;
        }
    }


    // New Tag registration named winning-ball
    customElements.define("shop-lottery-card-img", ShopLotteryCardImg);

    function createcardimg(that) {

        var imgFURL = that.getAttribute("imgFURL");
        if (imgFURL != "")
            that.innerHTML = `<img class="img-fluid"  style='margin-bottom: 20px;margin:0px; max-height: 392px;min-height: 392px;'  src="${imgFURL}" alt=""> `;
        else
            that.innerHTML = `<img class="img-fluid" style='margin-bottom: 20px;margin:0px; max-height: 392px;min-height: 392px;'  src="app.static/img/front-1022.jpg" alt=""> `;

        // var param = {}
        // param["action"] = "GET_FRONT_BACK_IMAGE";
        // param["drawdate"] = that.getAttribute("drawdate");
        // param["lotcode"] = that.getAttribute("lotcode");
        // loadData('shop', 'REQ001', 'LOTTERY', param, 'COMMON').then(response => {
        //     // console.log(response)
        //     if (response.status.toUpperCase() == "SUCCESS") {
        //         that.innerHTML = `<img class="img-fluid"  style='margin-bottom: 20px;margin:0px; max-height: 422px;min-height: 422px;'  src="${response.lotterydetails[0].frontimage}" alt=""> `;
        //     } else {
        //         that.innerHTML = `<img class="img-fluid" style='margin-bottom: 20px;margin:0px; max-height: 422px;min-height: 422px;'  src="app.static/img/front-1022.jpg" alt=""> `;
        //     }
        // });
    }
    //--------------
}

{
    //-------------------winnerball

    class MainLotteryCardImg extends HTMLElement {
        static get observedAttributes() {
            return ['result'];
        }
        connectedCallback() {
            createmaincardimg(this);
            // this.innerHTML = this.str;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            createmaincardimg(this);
            this.innerHTML = this.str;
        }
    }


    // New Tag registration named winning-ball
    customElements.define("main-lottery-card-img", MainLotteryCardImg);

    function createmaincardimg(that) {

        //        var imgFURL = that.getAttribute("imgFURL");
        //        if (imgFURL != undefined && imgFURL != "undefined" && imgFURL != null && imgFURL != "null" && imgFURL != "") {
        //            if (imgFURL != "")
        //                that.innerHTML = `<div class="magnifier-thumb-wrapper">
        //      <img class="img-fluid" id='main-img' style='margin-bottom: 20px;margin:0px;width:95%;  min-height:315px;  max-height: 315px; cursor: zoom-in;'  src="${imgFURL}" alt="">
        //      <div id="preview" class="magnifier-preview"></div>
        //    </div>`;
        //            else
        //                that.innerHTML = `<img class="img-fluid" style='margin-bottom: 20px;margin:0px;width:95%;  max-height:315px;  min-height: 315px;'  src="app.static/img/front-1022.jpg" alt=""> `;
        //        } else {
        //            var param = {};
        //            param["action"] = "GET_FRONT_BACK_IMAGE";
        //            param["drawdate"] = that.getAttribute("drawdate");
        //            param["lotcode"] = that.getAttribute("lotcode");
        //            loadData('shop', 'REQ001', 'LOTTERY', param, 'COMMON').then(response => {
        //                // console.log(response)
        //                if (response.status.toUpperCase() == "SUCCESS") {
        //                    that.innerHTML = `<div class="magnifier-thumb-wrapper">
        //                    <img class="img-fluid" style='margin-bottom: 20px;margin:0px;width:95%;  min-height:315px;  max-height: 315px;'  src="${response.lotterydetails[0].frontimage}" alt="">
        //                    <div id="preview" class="magnifier-preview"></div>
        //                 </div>`;
        //                } else {
        //                    that.innerHTML = `<div class="magnifier-thumb-wrapper">
        //                                <img class="img-fluid" style='margin-bottom: 20px;margin:0px;width:95%;  max-height:315px;  min-height: 315px;'  src="app.static/img/front-1022.jpg" alt="">
        //                            <div id="preview" class="magnifier-preview"></div> 
        //                        </div>`;
        //                }
        //            });
        //        }
        var imgFURL = that.getAttribute("imgFURL");
        if (imgFURL != undefined && imgFURL != "undefined" && imgFURL != null && imgFURL != "null" && imgFURL != "") {
            if (imgFURL != "") {
                previewSrc = imgFURL;
                that.innerHTML = `<div class="magnifier-thumb-wrapper">
                        <img class="img-fluid" id='main-img' style='margin-bottom: 20px;margin:0px;width:95%;  min-height:392px;  max-height: 392px; cursor: pointer;'  src="${imgFURL}" alt="" onclick="showFullImages()">
                    </div>
                    <div id="preview-img">
                    </div>`;
            } else {
                previewSrc = 'app.static/img/front-1022.jpg';
                that.innerHTML = `<div class="magnifier-thumb-wrapper"><img class="img-fluid" style='cursor: pointer;margin-bottom: 20px;margin:0px;width:95%;  max-height:315px;  min-height: 315px;'  src="app.static/img/front-1022.jpg" alt="" onclick="showFullImages()">
                </div><div id="preview-img">
                </div>`;
            }
        } else {
            var param = {};
            param["action"] = "GET_FRONT_BACK_IMAGE";
            param["drawdate"] = that.getAttribute("drawdate");
            param["lotcode"] = that.getAttribute("lotcode");
            loadData('shop', 'REQ001', 'LOTTERY', param, 'COMMON').then(response => {
                // console.log(response)
                if (response.status.toUpperCase() == "SUCCESS") {
                    previewSrc = response.lotterydetails[0].frontimage;
                    that.innerHTML = `<div class="magnifier-thumb-wrapper">
                        <img class="img-fluid" style='margin-bottom: 20px;margin:0px;width:95%;  min-height:315px;  max-height: 315px;cursor: pointer;'  src="${response.lotterydetails[0].frontimage}" alt="" onclick="showFullImages()">
                    </div>
                    <div id="preview-img">
                    </div>`;
                } else {
                    previewSrc = 'app.static/img/front-1022.jpg';
                    that.innerHTML = `<div class="magnifier-thumb-wrapper">
                            <img class="img-fluid" style='margin-bottom: 20px;margin:0px;width:95%;  max-height:315px;  min-height: 315px;cursor: pointer;'  src="app.static/img/front-1022.jpg" alt="" onclick="showFullImages()">
                        </div>
                        <div id="preview-img">
                        </div>`;
                }
            });
        }
    }
    //--------------
}

function addremarkToCartBuyNow(mrp, imgFURL, imgBURL, otherImgURL, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, showAddBuyBtn, courier_charges) {
    // addticket(mrp,0,drawdate,lotcode,drawtime,lotname,salestop,bunchdetails,0,"remark","cart")
    if (!showAddBuyBtn)
        addticket(mrp, imgFURL, imgBURL, otherImgURL, 0, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, 0, "remark", "buynow", courier_charges);
}
function setVirtualTicket(mrp, imgFURL, imgBURL, otherImgURL, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, showAddBuyBtn, courier_charges) {
    // addticket(mrp,0,drawdate,lotcode,drawtime,lotname,salestop,bunchdetails,0,"remark","cart")
    if (!showAddBuyBtn)
        addticket(mrp, imgFURL, imgBURL, otherImgURL, 0, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, 0, "remark", "buynow", courier_charges);
}


function addInBuyNow(that) {
    let drawdate = that.getAttribute('drawdate');
    let lotcode = that.getAttribute('lotcode');
    if (that.checked)
        updateBuyNow(drawdate, lotcode)
    else {
        removeBuyNow(drawdate, lotcode)
    }
}

function incrQty(mrp, imgFURL, imgBURL, otherImgURL, qty, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, k, showAddBuyBtn, courier_charges) {
    var result = document.getElementById('sst' + drawdate + lotcode + k);
    var sst = result.value;
    if (!isNaN(sst))
        result.value++;
    document.getElementById('total-mrp' + drawdate + lotcode + k).innerHTML = result.value * parseInt(mrp) * parseInt(qty);
    document.getElementById('total-qty' + drawdate + lotcode).innerHTML = parseInt(document.getElementById('total-qty' + drawdate + lotcode).innerHTML) + 1;
    document.getElementById('total-amt' + drawdate + lotcode).innerHTML = parseInt(document.getElementById('total-amt' + drawdate + lotcode).innerHTML) + parseInt(mrp) * parseInt(qty);
    if (!showAddBuyBtn) {


        $.ajax({
            url: commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lotcode, drawdate, showAddBuyBtn),
            success: function () {
                addticket(mrp, imgFURL, imgBURL, otherImgURL, qty, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, k, 'add', 'cart', courier_charges);
            }
        })
        return false;
    }

    // cartTotal = $(".cart-sub-total").html();
    // $(".cart-sub-total").html( parseInt(cartTotal) + (mrp * 1 * bunchdetails[k].qty) );
    commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lotcode, drawdate, showAddBuyBtn);
    return false;
}

function dcrQty(mrp, imgFURL, imgBURL, otherImgURL, qty, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, k, showAddBuyBtn, courier_charges) {
    var result = document.getElementById('sst' + drawdate + lotcode + k);
    var sst = result.value;
    if (!isNaN(sst) && sst > 0)
        result.value--;
    if (result.value > 0)
        document.getElementById('total-mrp' + drawdate + lotcode + k).innerHTML = result.value * parseInt(mrp) * parseInt(qty);
    else
        document.getElementById('total-mrp' + drawdate + lotcode + k).innerHTML = 0;
    if (sst > 0) {
        document.getElementById('total-qty' + drawdate + lotcode).innerHTML = parseInt(document.getElementById('total-qty' + drawdate + lotcode).innerHTML) - 1;
        document.getElementById('total-amt' + drawdate + lotcode).innerHTML = parseInt(document.getElementById('total-amt' + drawdate + lotcode).innerHTML) - parseInt(mrp) * parseInt(qty);
    }
    if (!showAddBuyBtn) {


        $.ajax({
            url: commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lotcode, drawdate, showAddBuyBtn),
            success: function () {
                addticket(mrp, imgFURL, imgBURL, otherImgURL, qty, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, k, '', 'cart', courier_charges);
            }
        });
        return false;
    }
    //     cartTotal = $(".cart-sub-total").html();
    // $(".cart-sub-total").html( parseInt(cartTotal) - (mrp * 1 * bunchdetails[k].qty) );

    // removeFromCart(lotcode,drawdate)
    commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lotcode, drawdate, showAddBuyBtn);

    return false;
}

function changeScheme(tid, ddate1, sowbtn, lotco) {
    //    console.log(sowbtn);

    var schemeValue = $.trim($('select#PAP_LIST' + ddate1 + lotco + ' option:selected').val());
    //    console.log(schemeValue);

    if (schemeValue == "") {

    } else {
        arr = schemeValue.split("|");
        ddate = arr[5];
        lcode = arr[6];

        commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lcode, ddate, sowbtn);
    }
}

function commonModule(s, lot, dwdate, btncheck) {



    let ar = s.split("|")
    let tamt = ar[0];// for total amount
    let subtamt = ar[1];// sub total amount
    let subdis = ar[2];// sun discount
    let subdraw = ar[3];// sub-discount
    let schec = ar[4];//check

    let cb = document.getElementById(`${schec + dwdate + lot}`);
    if (cb != null) {

        if (cb.checked) {
            var schemeValue = $.trim($('select#PAP_LIST' + dwdate + lot + ' option:selected').val());
            if (schemeValue == "") {

            } else {


                arr = schemeValue.split("|");
                //                console.log(schemeValue);
                subid = arr[0];
                sublotcode = arr[1];
                subnooddraw = arr[2];
                subenddate = arr[3];
                subdiscount = arr[4];
                ddate = arr[5];
                lcode = arr[6];
                total_ticket_cost = $('#total-amt' + ddate + lcode).html();


                let sub = `<div class="col-6">
        <nobr> Subscription Amount(<label id="Subscription-draw-no${ddate}${lcode}">
        ${parseInt(subnooddraw - 1)} Draws
        </label>
        </nobr>)
        </div>
        <div class="col-3" style="text-align: right;">
        <nobr>
        ₹<label id="Subscribtion-draw-amount${ddate}${lcode}">
        ${parseInt((subnooddraw - 1) * total_ticket_cost)}
        </label>.00
        </nobr>
        </div>`
                $('#Subscription_draw' + ddate + lcode).html(sub);
                total_cost = $('#Subscribtion-draw-amount' + ddate + lcode).html();
                var all_cost = parseInt(total_cost) + parseInt(total_ticket_cost);


                $('#Subscribtion-discount-amount' + ddate + lcode).html(parseInt((all_cost * parseInt(subdiscount)) / 100));
                dis_amount = $('#Subscribtion-discount-amount' + ddate + lcode).html();
                $('#Subtotalamount' + ddate + lcode).html(parseInt(all_cost - dis_amount));


                if (btncheck == false) {

                    var totalcart = "";
                    if (curpage.toLowerCase() == "cart") {
                        totalcart = JSON.parse(getCookie("rlcart"));
                    }
                    if (totalcart != "" || totalcart != undefined || totalcart != null) {
                        for (let l = 0; l < totalcart.length; l++) {
                            let shpcrt = totalcart[l];

                            if (shpcrt.lotcode == lot)
                                addticket(shpcrt.mrp, shpcrt.front_image_url, shpcrt.back_image_url, shpcrt.other_images, "0", shpcrt.drawdate, shpcrt.lotcode, shpcrt.drawtime, shpcrt.lotname, shpcrt.salestopdate, shpcrt.bunchdetails, "0", 'remark', 'cart', shpcrt.courier_charges);

                        }
                    } else {

                        var rlbuy = JSON.parse(getCookie("rlbuynowcart"));
                        //                        console.log(rlbuy);

                        if (rlbuy != "") {

                            for (let l = 0; l < rlbuy.length; l++) {
                                let shpcrt = rlbuy[l];
                                if (shpcrt.lotcode == lot)
                                    addticket(shpcrt.mrp, shpcrt.front_image_url, shpcrt.back_image_url, shpcrt.other_images, "0", shpcrt.drawdate, shpcrt.lotcode, shpcrt.drawtime, shpcrt.lotname, shpcrt.salestopdate, shpcrt.bunchdetails, "0", 'remark', 'buynow', shpcrt.courier_charges);//'cart'
                            }
                        }
                    }
                }





            }
        } else {
            $('#Subscription_draw' + dwdate + lot).html("");
            $('#Subscribtion-discount-amount' + dwdate + lot).html("0")
            $('#Subtotalamount' + dwdate + lot).html($('#' + tamt + dwdate + lot).html());
            if (btncheck == false) {


                var totalcart = "";
                if (curpage.toLowerCase() == "cart") {
                    totalcart = JSON.parse(getCookie("rlcart"));
                }
                if (totalcart != "" || totalcart != undefined || totalcart != null) {
                    for (let l = 0; l < totalcart.length; l++) {
                        let shpcrt = totalcart[l];
                        if (shpcrt.lotcode == lot)
                            addticket(shpcrt.mrp, shpcrt.front_image_url, shpcrt.back_image_url, shpcrt.other_images, "0", shpcrt.drawdate, shpcrt.lotcode, shpcrt.drawtime, shpcrt.lotname, shpcrt.salestopdate, shpcrt.bunchdetails, "0", 'remark', 'cart', shpcrt.courier_charges);

                    }
                } else {

                    var rlbuy = JSON.parse(getCookie("rlbuynowcart"));
                    if (rlbuy != "") {

                        for (let l = 0; l < rlbuy.length; l++) {
                            let shpcrt = rlbuy[l];
                            if (shpcrt.lotcode == lot)
                                addticket(shpcrt.mrp, shpcrt.front_image_url, shpcrt.back_image_url, shpcrt.other_images, "0", shpcrt.drawdate, shpcrt.lotcode, shpcrt.drawtime, shpcrt.lotname, shpcrt.salestopdate, shpcrt.bunchdetails, "0", 'remark', 'buynow', shpcrt.courier_charges);//'cart'
                        }
                    }
                }
            }

        }

    } else {
        $('#Subscription_draw' + dwdate + lot).html("");
        $('#Subscribtion-discount-amount' + dwdate + lot).html("0")
        $('#Subtotalamount' + dwdate + lot).html($('#' + tamt + dwdate + lot).html());

        if (btncheck == false) {


            var totalcart = "";
            if (curpage.toLowerCase() == "cart") {
                totalcart = JSON.parse(getCookie("rlcart"));
            }
            if (totalcart != "" && totalcart != undefined && totalcart != null) {
                for (let l = 0; l < totalcart.length; l++) {
                    let shpcrt = totalcart[l];

                    if (shpcrt.lotcode == lot)
                        addticket(shpcrt.mrp, shpcrt.front_image_url, shpcrt.back_image_url, shpcrt.other_images, "0", shpcrt.drawdate, shpcrt.lotcode, shpcrt.drawtime, shpcrt.lotname, shpcrt.salestopdate, shpcrt.bunchdetails, "0", 'remark', 'cart', shpcrt.courier_charges);

                }
            } else {

                var rlbuy = JSON.parse(getCookie("rlbuynowcart"));
                if (rlbuy != "") {

                    for (let l = 0; l < rlbuy.length; l++) {
                        let shpcrt = rlbuy[l];
                        if (shpcrt.lotcode == lot)
                            addticket(shpcrt.mrp, shpcrt.front_image_url, shpcrt.back_image_url, shpcrt.other_images, "0", shpcrt.drawdate, shpcrt.lotcode, shpcrt.drawtime, shpcrt.lotname, shpcrt.salestopdate, shpcrt.bunchdetails, "0", 'remark', 'buynow', shpcrt.courier_charges);//'cart'
                    }
                }
            }
        }

    }
}


function subscription_checkbox(value, id, ddate, lotc, showbtn) {
    let checkedValue = value;
    var schemeValue = $.trim($('select#PAP_LIST' + ddate + lotc + ' option:selected').val());
    if (checkedValue == true) {

        if (schemeValue == "") {
            $("#" + id).prop('checked', false);
            swal.fire("Please Select Subscription Scheme");
            return false;
        } else {
            arr = schemeValue.split("|");
            ddate = arr[5];
            lcode = arr[6];

            commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lcode, ddate, showbtn);

        }

    } else {
        commonModule("total-amt|Subtotalamount|Subscription_draw|Subscription_discount|sub-scribe-checkbox", lotc, ddate, showbtn);
    }
}

function removeticket(lotcode, drawdate) {
    user = getuserdata();
    let dataArr = [{ lotcode: lotcode, drawdate: drawdate }];
    captureClicks("26", "DELETE", JSON.stringify(dataArr));
    Swal.fire({
        title: 'Remove Item',
        text: "Are you sure you want to remove this item",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#ffbd39',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: "cancel-btn"
    }).then((result) => {
        if (result.value) {
            if (user) {
                cartid = getCartId(drawdate, lotcode)
                param = {
                    "type": "customer",
                    "buyer": user.custcode,
                    "action": "DELETE",
                    "cartid": cartid
                };
                deleteDBCart(param);
            }


            removeFromCart(lotcode, drawdate);
            // removeBuyNow(drawdate,lotcode)
            $('#cart-box' + drawdate + lotcode).hide();
            $("#no-of-ticket-in-cart").html(cart.length);
            if (cart.length == 0) {
                couriesrRadioButton = true;
                $("#sub-scribes-checkbox").attr('checked', true).trigger('click');
                subTotalPayable = 0;
                subsDiscount = 0;
                $(".cart-sub-total-payable").html(subTotalPayable - parseInt(subsDiscount));
                $(".cart-sub-totals-payable").html(subTotalPayable - parseInt(subsDiscount));
            }
        } else {
            buynow = JSON.parse(getCookie("rlcart"));
            setCookie("rlbuynowcart", getCookie("rlcart"), 1);
            updateCartSubTotal();
        }
    });



    //   if (getCookie("rlcart") != "")
    //     var totalcart = JSON.parse(getCookie("rlcart"));
    // else{
    //     $(".cart-sub-total").html(0);return;
    // }
    //   totmrp=0;
    //     for (let l = 0; l < totalcart.length; l++) {
    //       shopcart = totalcart[l];
    //       for (let k = 0; k < shopcart.bunchdetails.length; k++) {
    //           totmrp = parseInt(totmrp) + shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty'];
    //           $(".cart-sub-total").html(totmrp);
    //       }
    //     }
}

function addticket(mrp, imgFURL, imgBURL, otherImgURL, qty, drawdate, lotcode, drawtime, lotname, salestop, bunchdetails, key, addtype, carttype, courier_charges) {
    if ($('#total-amt' + drawdate + lotcode).html() <= 0) {
        //        $(".cart-sub-total-payable").html(0);
        //        $(".cart-sub-totals-payable").html(0);
        //        $(".cart-sub-total").html(0);
        //        $(".courier_charges").html(0);
        // showAlert("Please select book and qty");
        // Swal.fire({
        //   position: 'center',
        //   icon: "error",
        //   title: 'Please select book and qty',
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        $('#errorMessageModal').modal('show');
        if (curpage == "home" || curpage == "lottery") {
            return false;
        }
    }
    var ticket = {};
    var tid = 'remark' + drawdate + lotcode;
    ticket['remark'] = ((document.getElementById('remark' + drawdate + lotcode).value == null || document.getElementById('remark' + drawdate + lotcode).value == undefined) ? "null" : document.getElementById('remark' + drawdate + lotcode).value)
    //ticket['remark'] = (document.getElementById('remark' + drawdate + lotcode).value?"null":document.getElementById('remark' + drawdate + lotcode).value)
    ticket['drawdate'] = drawdate
    ticket['lotcode'] = lotcode
    ticket['drawtime'] = drawtime
    // ticket['cartid'] = data.cartid

    ticket['lotname'] = lotname
    ticket['salestopdate'] = salestop
    ticket['mrp'] = mrp
    var virtualTicket = "N";
    if (couriesrRadioButton) {
        virtualTicket = "Y";
    }
    //    if (document.getElementById("virtual" + drawdate + lotcode).checked) {
    //        virtualTicket = "Y";
    //    }
    ticket["virtualticket"] = virtualTicket;


    let keycheck = document.getElementById(`${"sub-scribe-checkbox" + drawdate + lotcode}`);
    if (keycheck != null) {
        if (keycheck.checked) {
            ticket['subs_details'] = $.trim($('select#PAP_LIST' + drawdate + lotcode + ' option:selected').val());
            var subsdetails = ticket['subs_details'].split("|")

            ticket['subscription_id'] = subsdetails[0];
            ticket['noofdraw'] = subsdetails[2];
        } else {
            ticket['subs_details'] = ""
            ticket['subscription_id'] = "";
            ticket['noofdraw'] = "";
        }
    } else {
        ticket['subs_details'] = ""
        ticket['subscription_id'] = "";
        ticket['noofdraw'] = "";
    }
    if ($.trim($('#Subscribtion-draw-amount' + drawdate + lotcode).text()) == "") {
        ticket['subs_amt'] = 0;
    } else {
        ticket['subs_amt'] = $.trim($('#Subscribtion-draw-amount' + drawdate + lotcode).text());
    }

    if ($.trim($('#Subscribtion-discount-amount' + drawdate + lotcode).text()) == "") {
        ticket['subs_discount'] = 0;
    } else {
        ticket['subs_discount'] = $.trim($('#Subscribtion-discount-amount' + drawdate + lotcode).text());
    }
    ticket['front_image_url'] = imgFURL
    ticket['back_image_url'] = imgBURL
    ticket['other_images'] = otherImgURL
    ticket['bunchdetails'] = []

    user = getuserdata();
    if (user) {
        param = {
            "type": "customer",
            "buyer": user.custcode,
            "mobile": user.mobileno,
            "drawdate": drawdate,
            "lotcode": lotcode,
            "cartid": data.cartid,
            "remark": document.getElementById('remark' + drawdate + lotcode).value,
            "action": "ADD",
        }
        param['tickets'] = [];
    }
    for (let k = 0; k < bunchdetails.length; k++) {
        ticket['bunchdetails'][k] = JSON.parse(`{ "lotcode" : "${lotcode}","drawdate" : "${drawdate}","selectedqty" : "${document.getElementById('sst' + drawdate + lotcode + k).value}","series_qty" : "${bunchdetails[k]['series_qty']}","qty" : "${bunchdetails[k]['qty']}","amt" : "${document.getElementById('total-mrp' + drawdate + lotcode + k).innerHTML}"}`);
        if (document.getElementById('sst' + drawdate + lotcode + k).value != 0) {
            if (user) {
                param['tickets'].push(
                    JSON.parse(`{"qty" : "${document.getElementById('sst' + drawdate + lotcode + k).value}","series_qty" : "${bunchdetails[k]['series_qty']}","amt" : "${document.getElementById('total-mrp' + drawdate + lotcode + k).innerHTML}"}`)
                );
            }
        }
    }

    if (user == null || user == undefined || user == '') {
        if (carttype == 'buynow')
            carttype = 'cart';
    }

    if (carttype == 'buynow') {
        addDBCart(param, ticket, addtype);
        addToBuyNow(ticket, addtype, true);
    } else {
        if ($("input[id='cart-checkbox" + drawdate + lotcode + "']:checked").val()) {
            addToBuyNow(ticket, addtype, false);
        }
        if (user) {
            addDBCart(param, ticket, addtype);
        } else {
            addToCart(ticket, addtype);
        }
    }
}
function wishList(cartid, that, drawdate, lotcode) {

    if (user == null) {
        $("#menu-item-signin").click();
    } else {
        if (that.className == 'fa fa-heart') {
            wishlist = 1;
            that.className = 'fa fa-heart-o'
        } else {
            wishlist = 0;
            that.className = 'fa fa-heart'
        }

        params = {
            "type": "customer",
            "buyer": user.custcode,
            "action": "UPDATEFAVOURITE",
            "cartid": cartid,
            "favourite": wishlist,
        }

        loadData('cart', 'REQ001', 'CART', params, 'COMMON');

        for (let k = 0; k < cart.length; k++) {
            if (cart[k].lotcode == lotcode && cart[k].drawdate == drawdate) {
                cart[k]['favourite'] = wishlist;

            }
        }
        setCookie("rlcart", JSON.stringify(cart), 1)
    }
}
function hideFullImages() {
    $("#preview-img").css({ "display": "none" });
    $("#preview-img").html('');
}

function showFullImages() {
    if (curpage.toLowerCase() == 'lottery' || curpage.toLowerCase() == 'home') {
        $("#preview-img").css({ "display": "block" });
        var imsgStr = `<i class="fa fa-close" style="top: 1%;left: 95%;font-size: 25px;position: absolute;color: gray;cursor:pointer;" onclick="hideFullImages();"></i>
                    <img class="img-fluid" src="${previewSrc}" style="margin-bottom: 5px;width: 90%;min-height: 400px;max-height: 400px;margin-top: 3%;" alt="">
                        <br>
                    <button class="btn btn-primary" style="font-weight: 600;font-size: 20px;margin-top:5px;width: 15%;" onclick="hideFullImages();">OK</button>`;
        $("#preview-img").html(imsgStr);
        //    $("#preview").css({"top": document.querySelector('.card-class').getBoundingClientRect().top + "%"});
        $("#preview-img").css({ "top": "0%" });
    }
}
