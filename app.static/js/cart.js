
function addToCart(newCart, addtype) {
    flag = false;
    if (cart.length == 0) {
        cart.push(newCart);
    }
    for (let k = 0; k < cart.length; k++) {
        if (cart[k].lotcode == newCart.lotcode && cart[k].drawdate == newCart.drawdate) {
            cart[k] = newCart;
            flag = true;
        }
    }
    if (flag == false) {
        cart.push(newCart);
    }
    updateCart(addtype);
    updateCartSubTotal();
}

function addToBuyNow(newCart, addtype, isValid) {
    flag = false;
    if (buynow.length == 0) {
        /*********add code as per requirement*******/
        buynow = [];
        if (getCookie("rlcart") != "") {
            var totalcart = JSON.parse(getCookie("rlcart"));
            for (let k = 0; k < totalcart.length; k++) {
                buynow.push(totalcart[k]);
            }
        } else {
            buynow.push(newCart);
        }
        /*********end code as per requirement*******/
//        buynow.push(newCart);
    }
    for (let k = 0; k < buynow.length; k++) {
        if (buynow[k].lotcode == newCart.lotcode && buynow[k].drawdate == newCart.drawdate) {
            buynow[k] = newCart;
            flag = true;
        }
    }
    if (flag == false) {
        buynow.push(newCart);
    }
    // console.log(newCart);

    updateBuyNowCart(addtype, isValid);
    /****Add Code Courier Charges*/
    if (couriesrRadioButton == false) {
        $("#sub-scribe-checkbox").attr('checked', true).trigger('click');
        for (let k = 0; k < buynow.length; k++) {
            buynow[k]['virtualticket'] = 'N';
        }
    } else {
        couriesrRadioButton = true;
        for (let k = 0; k < buynow.length; k++) {
            buynow[k]['virtualticket'] = 'Y';
        }
        $("#sub-scribes-checkbox").attr('checked', true).trigger('click');
    }
    /****End Code Courier Charges*/

    updateCartSubTotal();
}

function updateCartSubTotal() {
    totmrp = 0;
    subsAmt = 0;
    subsDiscount = 0;
    withoutvirtualticket = 0;
    subTotalPayable = 0;
    totalwitoutpayable = 0;
    if (curpage.toLowerCase() == "cart") {
        var totalcart = JSON.parse(getCookie("rlcart"));
    } else if (curpage.toLowerCase() != "cart" && getCookie("rlbuynowcart") != "")
        var totalcart = JSON.parse(getCookie("rlbuynowcart"));
    else {
        $(".cart-sub-total").html(0);
        $(".subs-amt-sub-total").html(0);
        $(".discount-sub-total").html(0);
        $(".cart-sub-total-payable").html(0);
        $(".courier_charges").html(0);
        $(".cart-sub-totals-payable").html(0);
        return;
    }
    if (totalcart.length == 0) {
        $(".cart-sub-total").html(0);
        $(".subs-amt-sub-total").html(0);
        $(".discount-sub-total").html(0);
        $(".cart-sub-total-payable").html(0);
        $(".courier_charges").html(0);
        $(".cart-sub-totals-payable").html(0);
        return;
    }
    for (let l = 0; l < totalcart.length; l++) {
        shopcart = totalcart[l];
        withoutvirtualticket = 0;
        /**********Add if condition Code Regarding Requirement*************/
//        if (curpage.toLowerCase() == "placeorder") {
        if ($("input[id='cart-checkbox" + shopcart['drawdate'] + shopcart['lotcode'] + "']:checked").val()) {
            for (let k = 0; k < shopcart.bunchdetails.length; k++) {
                totmrp = parseInt(totmrp) + shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty'];
                $(".cart-sub-total").html(totmrp);
                if (shopcart.virtualticket == "N") {
                    withoutvirtualticket = parseInt(withoutvirtualticket) + shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty'];
                }
            }
            subsAmt += parseInt(shopcart['subs_amt']);
            subsDiscount += parseInt(shopcart['subs_discount']);
            subTotalPayable = totmrp + subsAmt
            if (shopcart.virtualticket == "N")
                totalwitoutpayable += parseInt(withoutvirtualticket) + parseInt(shopcart['subs_amt']);
            $(".subs-amt-sub-total").html(subsAmt);
            $(".discount-sub-total").html(subsDiscount);
        }
//        } else {
//            /**********Add Code Regarding Requirement*************/
//            for (let k = 0; k < shopcart.bunchdetails.length; k++) {
//                totmrp = parseInt(totmrp) + shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty'];
//                $(".cart-sub-total").html(totmrp);
//                if (shopcart.virtualticket == "N") {
//                    withoutvirtualticket = parseInt(withoutvirtualticket) + shopcart['mrp'] * shopcart['bunchdetails'][k]['selectedqty'] * shopcart['bunchdetails'][k]['qty'];
//                }
//            }
//            subsAmt += parseInt(shopcart['subs_amt']);
//            subsDiscount += parseInt(shopcart['subs_discount']);
//            subTotalPayable = totmrp + subsAmt
//            if (shopcart.virtualticket == "N")
//                totalwitoutpayable += parseInt(withoutvirtualticket) + parseInt(shopcart['subs_amt']);
//            $(".subs-amt-sub-total").html(subsAmt);
//            $(".discount-sub-total").html(subsDiscount);
//        }
    }
    if (totalwitoutpayable > 0) {
        let param1 = {
            "qty": totalwitoutpayable,
            "buyer": user == null ? "" : user.custcode,
            "type": "customer",
            "action": "GET_RATE"
        }
        loadData('shop', 'REQ001', 'GET_C_CHARGE', param1, 'COMMON').then(response => {
            if (response.status.toUpperCase() == "SUCCESS") {
                $(".courier_charges").html(response.rate);
                $(".cart-sub-total-payable").html(subTotalPayable + parseInt(response.rate) - parseInt(subsDiscount));
                $(".cart-sub-totals-payable").html(subTotalPayable + parseInt(response.rate) - parseInt(subsDiscount));
            }
        });
    } else {
        $(".courier_charges").html('0');
        $(".cart-sub-total-payable").html(subTotalPayable - parseInt(subsDiscount));
        $(".cart-sub-totals-payable").html(subTotalPayable - parseInt(subsDiscount));
    }
}


function removeFromCart(lotcode, drawdate) {
    for (let k = 0; k < cart.length; k++) {
        if (cart[k].lotcode == lotcode && cart[k].drawdate == drawdate) {
            cart.splice(k, 1);
            setCookie("rlcart", JSON.stringify(cart), 1)
            $("#notification-batch").html(cart.length > 9 ? "9+" : cart.length);
        }
    }
    updateSchemeData(JSON.parse(getCookie("rlcart")));
}

function updateBuyNow(drawdate, lotcode) {
    for (let k = 0; k < cart.length; k++) {
        if (cart[k].lotcode == lotcode && cart[k].drawdate == drawdate) {
            buynow.push(cart[k]);
            // console.log(cart[k]);
            setCookie("rlbuynowcart", JSON.stringify(buynow), 1)
        }
    }
//    couriesrRadioButton = false;
//    $("#sub-scribe-checkbox").attr('checked', true).trigger('click');
    updateCartSubTotal();
}
function removeBuyNow(drawdate, lotcode) {
    for (let k = 0; k < buynow.length; k++) {
        if (buynow[k].lotcode == lotcode && buynow[k].drawdate == drawdate) {
            buynow.splice(k, 1);
            setCookie("rlbuynowcart", JSON.stringify(buynow), 1);
        }
    }
//    couriesrRadioButton = false;
//    $("#sub-scribe-checkbox").attr('checked', true).trigger('click');
    updateCartSubTotal();
}

function updateCart(addtype) {
    // if (val) {
    //     cart = [];
    //     for (i in val){
    //         cart.push(val[i]);
    //     }
    // } else {
    setCookie("rlcart", JSON.stringify(cart), 1);
    // }
    $("#notification-batch").html(cart.length > 9 ? "9+" : cart.length);
    if (addtype == 'add') {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Ticket has been added to cart',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    } else if (addtype == 'remark') {

    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Ticket has been removed from cart',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    }
}
function updateBuyNowCart(addtype, isValid) {
    setCookie("rlbuynowcart", JSON.stringify(buynow), 1);
    if (!isValid)
        return false;
    if (addtype == 'add') {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Ticket has been added to cart',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    } else if (addtype == 'remark') {

    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Ticket has been removed from cart',
            showConfirmButton: false,
            timer: 1500,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    }
    // loadComponent('placeorder','REQ002');
}
function getSaleCart() {
    saleCart = [];
    buynow = JSON.parse(getCookie("rlbuynowcart"));
    for (let k = 0; k < buynow.length; k++) {
        saleCart[k] = []
        saleCart[k]['drawdate'] = buynow[k].drawdate
        saleCart[k]['lotcode'] = buynow[k].lotcode
        saleCart[k]['frontimage'] = buynow[k].frontimage
        saleCart[k]['backimage'] = buynow[k].backimage
        saleCart[k]['drawtime'] = buynow[k].drawtime
        saleCart[k]['lotname'] = buynow[k].lotname
        saleCart[k]['salestopdate'] = buynow[k].salestopdate
        saleCart[k]['mrp'] = buynow[k].mrp
        saleCart[k]['subscription_id'] = buynow[k].subscription_id
        saleCart[k]['lotterydetails'] = [];
        for (let l = 0; l < buynow[k]['bunchdetails'].length; l++) {
            if (buynow[k]['bunchdetails'][l]['selectedqty'] != 0) {
                saleCart[k]['lotterydetails'][l] = {};
                saleCart[k]['lotterydetails'][l]['lotcode'] = buynow[k]['bunchdetails'][l].lotcode
                saleCart[k]['lotterydetails'][l]['drawdate'] = buynow[k]['bunchdetails'][l].drawdate
                saleCart[k]['lotterydetails'][l]['qty'] = buynow[k]['bunchdetails'][l].selectedqty
                saleCart[k]['lotterydetails'][l]['series_qty'] = buynow[k]['bunchdetails'][l].series_qty
                saleCart[k]['lotterydetails'][l]['book_qty'] = buynow[k]['bunchdetails'][l].qty
                if (buynow[k].subscription_id == "")
                    saleCart[k]['lotterydetails'][l]['amt'] = buynow[k]['bunchdetails'][l].amt
                else
                    saleCart[k]['lotterydetails'][l]['amt'] = parseInt(buynow[k]['bunchdetails'][l].amt * buynow[k].noofdraw)
                saleCart[k]['lotterydetails'][l]['remark'] = buynow[k].remark
            }
        }
        saleCart[k]['virtualticket'] = buynow[k].virtualticket
        saleCart[k]['lotterydetails'] = saleCart[k]['lotterydetails'].filter(function (el) {
            return el != [];
        });
    }
    return saleCart;
}

function removeticket(n, d) {
    if (typeof cart === "object" && cart.length > 0) {
        cart.splice(n, 1)
    }
    if (cartlength == 0) {
        cart = ""
        domain = ""
        delete_cookie('rlcart')
        // $("#body").css("background-image","")
    } else if (cart.length > 0)
        setCookie("rlcart", JSON.stringify(cart), 1)
    updateCart()
}

function updateSchemeData(cart) {
    setCookie("rlcart", JSON.stringify(cart));
    setCookie("rlbuynowcart", JSON.stringify(cart));
    //alert("updateSchemeData");
    updateCartSubTotal();
}
