var email_v = "";
var mob_v = "";
var imageidArr = [];
$("document").ready(function () {
  if (OBJ.actionevent == "modifyAdd") {
    tabClick("myaddress");
  }

  if (OBJ.actionevent == "personaldetail") {
    tabClick("personaldetail");
  }

  if (OBJ.actionevent == "bankdetails") {
    tabClick("bankdetails");
  }

  if (OBJ.actionevent == "mykyc") {
    tabClick("mykyc");
  }

  $("#old-mywallet-icon-btn").hide();
  $("#dobDropdown").dateDropdowns({
    minAge: 18,
    dayLabel: "Date",
    daySuffixes: false,
  });

  var location = "";
  if (gla_obj.hasOwnProperty("city")) {
    location =
      gla_obj.city.charAt(0).toUpperCase() + gla_obj.city.slice(1) + ", ";
  }
  if (gla_obj.hasOwnProperty("locstate")) {
    location +=
      gla_obj.locstate.charAt(0).toUpperCase() +
      gla_obj.locstate.slice(1).toLowerCase();
  }

  if (location != "") {
    $("#location").text(location);
  }

  $("#myProfile_header").on("click", "#back-to-Account-screen", function () {
    loadComponent("account", "REQ002");
  });

  $("#myorder-icon-btn").on("click", function () {
    loadInnerComponents("myorders", "#my-order", "", "");
  });

  $("#mywallet-icon-btn").on("click", function () {
    var param = {
      actionevent: "account",
      accessFrom: "account",
    };
    loadInnerComponents("wallet", "#my-wallet", "mywallet", param);
  });

  $("#desktop_help_support_btn").on("click", function () {
    var param = {
      actionevent: "account",
      accessFrom: "account",
    };
    loadInnerComponents(
      "helpandsupport",
      "#desktop_help_support",
      "helpandsupport",
      param
    );
  });

  x = window.innerHeight;
  $("#My_profile_Div").css({
    "overflow-y": "scroll",
    height: x - 75,
    "overflow-x": "hidden",
  });

  getProfile();
  user = getuserdata();
  if (user) {
    if (
      user.username != "undefined" &&
      user.username != "null" &&
      user.username.trim() != ""
    ) {
      $("#profile-username").text(user.username);
    } else {
      $("#profile-username").text("Full Name");
    }
    let param = {
      mobileno: user.mobileno,
      custcode: user.custcode,
    };
    loadData("myprofile", "REQ001", "GET_USER_STATUS", param, "COMMON").then(
      (responseArr) => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
          if (responseArr["data"].user_status.toUpperCase() == "OLD") {
            $("#old-mywallet-icon-btn").show();
            var str = `<label class="lbl-icon" id="old-mywallet-head" style='color:black;'>Old Txn Summary</label>
                   <i class="fa fa-angle-right" id="old-rightarrow-mywallet"></i>`;
            $("#old-mywallet-icon-btn").html(str);
            $("#old-mywallet-icon-btn").attr("onclick", "oldMywallet()");
            if (
              OBJ.hasOwnProperty("actionevent") &&
              OBJ["actionevent"].hasOwnProperty("actionevent") &&
              OBJ["actionevent"].actionevent.toUpperCase() == "OLDWALLET"
            ) {
              $("#old-mywallet-icon-btn").trigger("click");
              OBJ["actionevent"].actionevent = "";
            }
          } else {
            $("#old-mywallet-icon-btn").hide();
            if (
              OBJ.hasOwnProperty("actionevent") &&
              OBJ["actionevent"].hasOwnProperty("actionevent") &&
              OBJ["actionevent"].actionevent.toUpperCase() == "OLDWALLET"
            ) {
              OBJ["actionevent"].actionevent = "";
            }
          }
        } else {
          $("#old-mywallet-icon-btn").hide();
          if (
            OBJ.hasOwnProperty("actionevent") &&
            OBJ["actionevent"].hasOwnProperty("actionevent") &&
            OBJ["actionevent"].actionevent.toUpperCase() == "OLDWALLET"
          ) {
            OBJ["actionevent"].actionevent = "";
          }
        }
      }
    );
  }

  //getProfile();

  // --------------- New code add ----------------------------------
  $("#myprofile-icon-btn").click(function () {
    getProfile();
    $("#myprofile-icon-btn").css({
      "background-color": "#ad1b26",
      "border-radius": "25px",
    });
    $("#rightarrow-myprofile").css({ color: "#fff" });
    $(
      "#rightarrow_help_n_support,#rightarrow-mywallet,#rightarrow-myorder,#old-rightarrow-mywallet"
    ).css({
      color: "#ad1b26",
    });
    $("#myprofile-head").css({ color: "#fff" });
    $("#help_n_support,#myorder-head,#mywallet-head,#old-mywallet-head").css({
      color: "#000",
    });
    $(
      "#desktop_help_support_btn,#myorder-icon-btn,#invoiceorder-icon-btn,#mywallet-icon-btn,#old-mywallet-icon-btn,#payout-icon-btn,#logout-icon-btn,#subscription-icon-btn"
    ).css({ "background-color": "#FFFFFF" });
    if (OBJ.hasOwnProperty("actionevent")) {
      if (OBJ.actionevent == "") {
        $("#myprofile-btn").click();
      }
      if (OBJ.actionevent.hasOwnProperty("stype")) {
        if (OBJ.actionevent.stype == "0") {
          $("#myprofile-btn").click();
        } else if (OBJ.actionevent.stype == "1") {
          $("#myprofile-address-btn").click();
        } else if (OBJ.actionevent.stype == "2") {
          $("#myprofile-bankdetails-btn").click();
        } else if (OBJ.actionevent.stype == "3") {
          $("#myprofile-changepassword-btn").click();
        }
      } else {
        $("#myprofile-btn").click();
      }
    } else {
      $("#myprofile-btn").click();
    }
    $("#track-order").hide();
    $("#invoice-order").hide();
    $("#challan-order").hide();
    $("#view-order").hide();
  });

  $("#mywallet-icon-btn").click(function () {
    $("#mywallet-icon-btn").css({
      "background-color": "#ad1b26",
      "border-radius": "25px",
    });
    $("#rightarrow-mywallet").css({ color: "#fff" });
    $(
      "#rightarrow_help_n_support,#rightarrow-myprofile,#rightarrow-myorder,#old-rightarrow-mywallet"
    ).css({ color: "#ad1b26" });
    $("#help_n_support,#myorder-head,#myprofile-head,#old-mywallet-head").css({
      color: "#000",
    });
    $("#mywallet-head").css({ color: "#fff" });
    $(
      "#desktop_help_support_btn,#myprofile-icon-btn,#myorder-icon-btn,#payout-icon-btn,#old-mywallet-icon-btn,#invoiceorder-icon-btn,#subscription-icon-btn,#logout-icon-btn"
    ).css("background-color", "#FFFFFF");
    $("#total-wallet-balance-btn").click();
    $("#track-order").hide();
    $("#invoice-order").hide();
    $("#challan-order").hide();
    $("#view-order").hide();
  });

  $("#myorder-icon-btn").click(function () {
    $("#myorder-icon-btn").css({
      "background-color": "#ad1b26",
      "border-radius": "25px",
    });
    $("#rightarrow-myorder").css({ color: "#fff" });
    $(
      "#rightarrow_help_n_support,#rightarrow-myprofile,#rightarrow-mywallet,#old-rightarrow-mywallet"
    ).css({ color: "#ad1b26" });
    $("#myorder-head").css({ color: "#fff" });
    $("#help_n_support,#myprofile-head,#mywallet-head,#old-mywallet-head").css({
      color: "#000",
    });
    $(
      "#desktop_help_support_btn,#myprofile-icon-btn,#invoiceorder-icon-btn,#subscription-icon-btn,#mywallet-icon-btn,#old-mywallet-icon-btn,#payout-icon-btn,#logout-icon-btn"
    ).css("background-color", "#FFFFFF");
    $("#current-order-btn").click();
    $("#invoice-order").hide();
    $("#track-order").hide();
    $("#challan-order").hide();
    $("#view-order").hide();
  });

  // help and support
  $("#desktop_help_support_btn").click(function () {
    $("#desktop_help_support_btn").css({
      "background-color": "#ad1b26",
      "border-radius": "25px",
    });
    $("#rightarrow_help_n_support").css({ color: "#fff" });
    $(
      "#rightarrow-myorder,#rightarrow-myprofile,#rightarrow-mywallet,#old-rightarrow-mywallet"
    ).css({ color: "#ad1b26" });
    $("#help_n_support").css({ color: "#fff" });
    $("#myprofile-head,#myorder-head,#mywallet-head,#old-mywallet-head").css({
      color: "#000",
    });
    $(
      "#myprofile-icon-btn,#myorder-icon-btn,#invoiceorder-icon-btn,#subscription-icon-btn,#mywallet-icon-btn,#old-mywallet-icon-btn,#payout-icon-btn,#logout-icon-btn"
    ).css("background-color", "#FFFFFF");
    $("#invoice-order").hide();
    $("#track-order").hide();
    $("#challan-order").hide();
    $("#view-order").hide();
    $("#myprofile-section").hide();
  });
  // help and support

  $("#logout-icon-btn").click(function () {
    $("#logout-icon-btn").css("background-color", "#F1F3F7");
    $(
      "#desktop_help_support_btn,#myprofile-icon-btn,#mywallet-icon-btn,#mywallet-icon-btn,#old-mywallet-icon-btn,#invoiceorder-icon-btn,#subscription-icon-btn,#myorder-icon-btn"
    ).css("background-color", "#FFFFFF");
  });

  if (
    OBJ.hasOwnProperty("returnFrom") &&
    OBJ.returnFrom != "" &&
    OBJ.returnFrom.toUpperCase() == "WALLET"
  ) {
    $("#mywallet-icon-btn").click();
  } else if (
    (OBJ.hasOwnProperty("returnFrom") &&
      OBJ.returnFrom != "" &&
      OBJ.returnFrom.toUpperCase() == "MYORDER") ||
    (OBJ.hasOwnProperty("actionevent") &&
      OBJ.actionevent != "" &&
      OBJ.actionevent.actionevent.toUpperCase() == "MYORDER")
  ) {
    $("#myorder-icon-btn").click();
  } else {
    $("#myprofile-icon-btn").click();
  }
  if (
    OBJ.hasOwnProperty("accessFrom") &&
    OBJ.accessFrom != "" &&
    OBJ.accessFrom.toUpperCase() == "WALLET"
  ) {
    console.log(OBJ);
    $("#mywallet-icon-btn").click();
  }
  if (
    OBJ.hasOwnProperty("accessFrom") &&
    OBJ.accessFrom != "" &&
    OBJ.accessFrom.toUpperCase() == "HELPANDSUPPORT"
  ) {
    // console.log(OBJ);
    $("#desktop_help_support_btn").click();
  }
  getNotificationBadgeHelpAndSupport();
});
var dob = "";

function oldMywallet() {
  $("#my-profile").hide();
  $("#my-order").hide();
  $("#my-wallet").hide();
  $("#desktop_help_support").hide();
  $("#old-my-wallet").show();
  captureClicks("22", "", "");
  $("#myprofile-section").hide();
  $("#old-mywallet-icon-btn").css({
    "background-color": "#ad1b26",
    "border-radius": "25px",
  });
  $("#old-rightarrow-mywallet").css({ color: "#fff" });
  $(
    "#rightarrow_help_n_support,#rightarrow-mywallet,#rightarrow-myprofile,#rightarrow-myorder"
  ).css({
    color: "#ad1b26",
  });
  $("#help_n_support,#mywallet-head,#myorder-head,#myprofile-head").css({
    color: "#000",
  });
  $("#old-mywallet-head").css({ color: "#fff" });
  $(
    "#desktop_help_support_btn,#mywallet-icon-btn,#myprofile-icon-btn,#myorder-icon-btn,#payout-icon-btn,#invoiceorder-icon-btn,#subscription-icon-btn,#logout-icon-btn"
  ).css("background-color", "#FFFFFF");
  var param = {
    actionevent: "account",
    accessFrom: "old-wallet",
  };
  loadInnerComponents("old-wallet", "#old-my-wallet", "", param);
}

function loadInnerComponents(tabId, divId, aria_labelledId, param) {
  //    alert(tabId + "---" + divId + "-----" + aria_labelledId);
  loadComponent(tabId, "REQ002", "", param, "", divId, function () {
    var header = $(this).find("#" + aria_labelledId);
    var content = $(this).find(divId);
    header.on("click", function () {
      content.slideToggle(10);
    });
  });
}

function getProfile() {
  var param = {
    action: "GETBASICDETAILS",
    type: "customer",
    custcode: user.custcode,
    mobile: user.mobileno,
  };
  console.log(JSON.stringify(param));
  loadData("profile", "REQ001", "PROFILE", param, "COMMON").then(
    (responseArr) => {
      console.log(JSON.stringify(responseArr));
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        if (responseArr["data"].firstname != "") {
          $("#fullname").val(responseArr["data"].firstname);
        }
        //            if (responseArr['data'].firstname != "") {
        //                $('#fname').val(responseArr['data'].firstname);
        //            }
        //            if (responseArr['data'].lastname != "") {
        //                $('#lname').val(responseArr['data'].lastname);
        //            }
        if (responseArr["data"].gender != "") {
          $(
            'input[type="radio"][name="gender"][value="' +
              responseArr["data"].gender +
              '"]'
          ).prop("checked", true);
        }
        email_v = responseArr["data"].email_verification_status;
        mob_v = responseArr["data"].mobile_verification_status;
        if (responseArr["data"].mobile_verification_status == 0) {
          $("#phone").show();
          $("#p_image_hide").show();
          $("#p_image_show").hide();
          $("#mno").prop("readonly", false);
        } else {
          $("#phone").hide();
          $("#p_image_hide").hide();
          $("#p_image_show").show();
          $("#mno").prop("readonly", true);
        }
        if (responseArr["data"].email_verification_status == 0) {
          $("#email_add").show();
          $("#e_image_hide").show();
          $("#e_image_show").hide();
          $("#email_address").prop("readonly", false);
        } else {
          $("#email_add").hide();
          $("#e_image_hide").hide();
          $("#e_image_show").show();
          $("#email_address").prop("readonly", true);
        }
        if (responseArr["data"].mobile != "") {
          $("#mno").val(responseArr["data"].mobile);
        }
        if (responseArr["data"].email != "") {
          $("#email_address").val(responseArr["data"].email);
        }
        var date_regex =
          /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        dob = responseArr["data"].dateofbirth;
        if (
          responseArr["data"].dateofbirth != "" &&
          date_regex.test(responseArr["data"].dateofbirth)
        ) {
          var dobArr = responseArr["data"].dateofbirth.split("-");
          if (dobArr[0] > "1950") {
            $(".date-dropdowns").find(".day").val(dobArr[2]);
            $(".date-dropdowns").find(".month").val(dobArr[1]);
            $(".date-dropdowns").find(".year").val(dobArr[0]);

            $(".date-dropdowns").find(".year").trigger("change");
            $(".date-dropdowns").find(".month").trigger("change");
            $(".date-dropdowns").find(".day").trigger("change");

            // $("#dobDropdown").val(responseArr["data"].dateofbirth);
          }
        }
        SetLoginCookie({
          mobileno: user.mobileno,
          username: responseArr["data"].firstname,
          custcode: user.custcode,
          email: responseArr["data"].email,
          email_verification_status: email_v,
          mobile_verification_status: mob_v,
          wallet_balance: user.wallet_balance,
          promotional_amt: user.promotional_amt,
          pwt_amt: user.pwt_amt,
        });
        user = getuserdata();
        getProfilePhoto();
        //$('#resultdate').val(responseArr['data'].dateofbirth.split("-").reverse().join("-"));
      } else if (responseArr.status.toUpperCase() == "ERROR") {
        successErrorAlert("error", "", responseArr.message);
      }
    }
  );
}

function updateProfile() {
  if (!updateProfileValidate()) return false;
  if (!underAgeValidate()) {
    return false;
  }
  //    if (email_v == 0) {
  //        successErrorAlert("error", "", "Verify The Email");
  //        return false;
  //    } else
  if (mob_v == 0) {
    successErrorAlert("error", "", "Verify The Mobile");
    return false;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ad1b26",
    cancelButtonColor: "#fff",
    confirmButtonText: "Yes, Update it!",
  }).then((r) => {
    if (r.value) {
      //let dob=$('#resultdate').val();
      // dob=dob.split("-").reverse().join("-");
      var usermobile = "";
      var useremail = "";
      if (user.mobileno == "" && mob_v == 0) {
        usermobile = $.trim($("#mno").val());
      } else {
        usermobile = user.mobileno;
      }
      if (email_v == 0) {
        useremail = $.trim($("#email_address").val());
      } else {
        useremail = user.email;
      }
      var param = {
        action: "UPDATEBASICDETAILS",
        type: "customer",
        custcode: user.custcode,
        firstname: $("#fullname").val(),
        //                'firstname': $('#fname').val(),
        lastname: "",
        gender: $('input[type="radio"][name="gender"]:checked').val(),
        dateofbirth: dob,
        email: useremail,
        mobile: usermobile,
      };
      console.log(param);
      loadData("profile", "REQ001", "UPDATE_PROFILE", param, "COMMON").then(
        (responseArr) => {
          console.log(responseArr);
          if (responseArr.status.toUpperCase() == "SUCCESS") {
            successErrorAlert(
              "success",
              "Update!",
              "Your Profile has been Updated."
            );
            // successErrorAlert('success', 'Update!', 'Your Profile has been Updated.');
            SetLoginCookie({
              mobileno: usermobile,
              username: $("#fullname").val(),
              custcode: user.custcode,
              email: useremail,
              email_verification_status: email_v,
              mobile_verification_status: mob_v,
              wallet_balance: user.wallet_balance,
              promotional_amt: user.promotional_amt,
              pwt_amt: user.pwt_amt,
            });
            user = getuserdata();
          } else if (responseArr.status.toUpperCase() == "ERROR") {
            successErrorAlert("error", "", responseArr.message);
          }
        }
      );
    }
  });
}

// $("#resultdate").datepicker({
//   setDate: new Date(),
//   format: "dd-mm-yyyy",
//   autoclose: true,
//   closeOnDateSelect: true
// }).on('changeDate', function () {
//   $(this).datepicker('hide');
// });

function updateProfileValidate() {
  //    if ($('#fname').val() == ""){
  //        $('#fname').focus();
  if ($("#fullname").val() == "") {
    $("#fullname").focus();
    successErrorAlert("error", "", "Please Update your Personal Information");
    return false;
  }
  //    else if ($('#email_address').val() == "") {
  //        $('#email_address').focus();
  //        successErrorAlert("error", "", "Please Enter your E-mail Address");
  //        return false;
  //    }
  else if ($("#mno").val() == "") {
    $("#mno").focus();
    successErrorAlert("error", "", "Please Enter your Mobile Number");
    return false;
  } else if ($(".date-dropdowns").find(".day").val() == "") {
    $(".date-dropdowns").find(".day").focus();
    successErrorAlert("error", "", "Please Enter your Date of DOB");
    return false;
  } else if ($(".date-dropdowns").find(".month").val() == "") {
    $(".date-dropdowns").find(".month").focus();
    successErrorAlert("error", "", "Please Enter your Month of DOB");
    return false;
  } else if ($(".date-dropdowns").find(".year").val() == "") {
    $(".date-dropdowns").find(".year").focus();
    successErrorAlert("error", "", "Please Enter your Year of DOB");
    return false;
  } else if ($("#mno").val().length < 10 || $("#mno").val().length > 10) {
    $("#mno").focus();
    successErrorAlert("error", "", "Invalid Moble Number");
    return false;
  }
  if ($("#dobDropdown").val() == "") {
    successErrorAlert("error", "", "DOB could not be blank");
    return false;
  }
  return true;
}

function underAgeValidate() {
  /************ DOB Sart Code ***********/
  var currentDate = new Date();
  var d = String(currentDate.getDate()).padStart(2, "0");
  var m = String(currentDate.getMonth() + 1).padStart(2, "0");
  var y = String(currentDate.getFullYear());
  var currentDateArr = [m, d, y];
  var dobSelected = $("#dobDropdown").val().split("-");
  var yearData = dobSelected[0];
  var monthData = dobSelected[1];
  var dateData = dobSelected[2];

  dobArr = [monthData, dateData, yearData];

  dob = $("#dobDropdown").val();
  /************ DOB End Code ***********/

  if (Math.floor(dateDiff(dobArr, currentDateArr) / 365) <= 17) {
    successErrorAlert("error", "", "DOB must be 18+");
    return false;
  }
  /************ DOB End Code ***********/
  return true;
}

function sendOTP_Mobile() {
  if ($("#mno").val() == "") {
    $("#mno").focus();
    successErrorAlert("error", "", "Mobile Number could not be blank");
    return false;
  } else if ($("#mno").val().length < 10 || $("#mno").val().length > 10) {
    $("#mno").focus();
    successErrorAlert("error", "", "Invalid Moble Number");
    return false;
  }

  param = {
    brand: "PL",
    state: "WB",
    app: "PLWEB",
    mobileno: $("#mno").val(),
    custcode: user.custcode,
  };
  loadData("profile", "REQ001", "SEND_OTP_MOBILE", param, "COMMON").then(
    (responseArr) => {
      if (responseArr.status.toLowerCase() == "error") {
        successErrorAlert("error", "", responseArr.message);
      } else {
        console.log(responseArr);

        reQId = responseArr.requestid;
        swal
          .fire({
            html:
              '<form><label style="color: #6f6f6f;font-size: smaller;">Please Enter 5 digit OTP </label>' +
              '<div class="row" style="margin-left: 10px;">' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="0g" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="color:black;border: none;border-bottom: 1px solid lightgrey;outline: none;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="1g" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="color:black;border: none;border-bottom: 1px solid lightgrey;outline: none;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="2g" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="color:black;border: none;border-bottom: 1px solid lightgrey;outline: none;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="3g" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="color:black;border: none;border-bottom: 1px solid lightgrey;outline: none;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="4g" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="color:black;border: none;border-bottom: 1px solid lightgrey;outline: none;outline: none;text-align: center;width: 100%;"></div>' +
              "</div></form>",
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#4D9E9E",
            confirmButtonText: "Submit",
          })
          .then((rq) => {
            if (rq.value) {
              otp =
                $("#0g").val() +
                $("#1g").val() +
                $("#2g").val() +
                $("#3g").val() +
                $("#4g").val();
              param = {
                brand: "PL",
                state: "WB",
                app: "PLWEB",
                mobileno: $("#mno").val(),
                custcode: user.custcode,
                requestid: reQId,
                otp: md5(otp),
              };
              loadData(
                "profile",
                "REQ001",
                "VERIFY_OTP_MOBILE",
                param,
                "COMMON"
              ).then((responseArr) => {
                if (responseArr.status.toLowerCase() == "error") {
                  successErrorAlert("error", "", responseArr.message);
                } else {
                  getProfile();
                  successErrorAlert("success", "", responseArr.message);
                }
              });
            }
          });
      }
    }
  );
}

function sendOTP_Email() {
  if ($("#email_address").val() == "") {
    $("#email_address").focus();
    successErrorAlert("error", "", "E-mail address could not be blank");
    return false;
  }
  param = {
    brand: "PL",
    state: "WB",
    app: "PLWEB",
    email: $("#email_address").val(),
    custcode: user.custcode,
  };
  loadData("profile", "REQ001", "SEND_OTP_EMAIL", param, "COMMON").then(
    (responseArr) => {
      if (responseArr.status.toLowerCase() == "error") {
        successErrorAlert("error", "", responseArr.message);
      } else {
        console.log(responseArr);

        reqId = responseArr.requestid;
        swal
          .fire({
            html:
              '<form><label style="color: #6f6f6f;font-size: smaller;padding: 10px;">The one-time password (OTP) is sent to registered Email ID.</label>' +
              '<div class="row" style="margin-left: 10px;">' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="0a" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="border-radius: 12px;color:black;border: 2px solid grey;padding: 15px;margin: 10px;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="1a" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="border-radius: 12px;color:black;border: 2px solid grey;padding: 15px;margin: 10px;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="2a" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="border-radius: 12px;color:black;border: 2px solid grey;padding: 15px;margin: 10px;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="3a" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="border-radius: 12px;color:black;border: 2px solid grey;padding: 15px;margin: 10px;outline: none;text-align: center;width: 100%;"></div>' +
              '<div class="col-2 col-sm-2 " style="padding:2px">' +
              '<input type="tel" name="otp" id="4a" class="otp-input" minlength="1" maxlength="1" placeholder=""autocomplete="off" onkeyup="changeFocus(this.id,event)"style="border-radius: 12px;color:black;border: 2px solid grey;padding: 15px;margin: 10px;outline: none;text-align: center;width: 100%;"></div>' +
              '</div><label style="color: #6f6f6f;font-size: smaller;">Please Enter 5 digit OTP </label></form>',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#a21c1c",
            confirmButtonText: "Submit",
          })
          .then((result) => {
            if (result.value) {
              otp =
                $("#0a").val() +
                $("#1a").val() +
                $("#2a").val() +
                $("#3a").val() +
                $("#4a").val();
              param = {
                brand: "PL",
                state: "WB",
                app: "PLWEB",
                email: $("#email_address").val(),
                custcode: user.custcode,
                requestid: reqId,
                otp: md5(otp),
              };
              loadData(
                "profile",
                "REQ001",
                "VERIFY_OTP_EMAIL",
                param,
                "COMMON"
              ).then((responseArr) => {
                if (responseArr.status.toLowerCase() == "error") {
                  successErrorAlert("error", "", responseArr.message);
                } else {
                  getProfile();
                  successErrorAlert("success", "", responseArr.message);
                }
              });
            }
          });
      }
    }
  );
}

function changeFocus(ID, e) {
  if (ID == "0g") {
    $("#1g").focus();
  } else if (ID == "1g") {
    $("#2g").focus();
  } else if (ID == "2g") {
    $("#3g").focus();
  } else if (ID == "3g") {
    $("#4g").focus();
  } else {
  }

  if (ID == "0a") {
    $("#1a").focus();
  } else if (ID == "1a") {
    $("#2a").focus();
  } else if (ID == "2a") {
    $("#3a").focus();
  } else if (ID == "3a") {
    $("#4a").focus();
  } else {
  }
}
function dateDiff(SDate, EDate) {
  SDate = new Date(SDate);
  EDate = new Date(EDate);
  var interval = EDate.getTime() - SDate.getTime(); // Difference in ms.

  // Establish larger units based on milliseconds.
  var msecondsPerMinute = 1000 * 60;
  var msecondsPerHour = msecondsPerMinute * 60;
  var msecondsPerDay = msecondsPerHour * 24;
  // Calculate how many days the interval contains, then subtract that
  // many days from the interval to come up with a remainder.
  var days = Math.floor(interval / msecondsPerDay);
  return days;
}
function uploadProfileImg(id) {
  $("#image").attr("src", "");
  $("#uploaded-images").attr("src", "");
  $("#image-type").val("");
  $("#image-name").val("");
  $("#image").val("");
  $("#uploaded-images").val("");
  loadData(
    "account",
    "REQ001",
    "PROFILE",
    {
      action: "GETIMAGE",
      type: "customer",
      image_type: id,
      custcode: user.custcode,
      mobile: user.mobileno,
    },
    "COMMON"
  ).then((responseArr) => {
    if (responseArr.status.toUpperCase() == "SUCCESS") {
      if (responseArr["data"].image != "") {
        $("#uploaded-images").attr("src", responseArr["data"].image);
      } else {
        $("#uploaded-images").attr("src", "app.static/img/myprofile/cloud.png");
      }
    } else if (responseArr.status.toUpperCase() == "ERROR") {
      $("#uploaded-images").attr("src", "app.static/img/myprofile/cloud.png");
    }
  });

  $("#image-type").val(id);
  $("#profileImageModal1").modal("show");
}
$("#img-update-btns").on("click", function () {
  if (!imageProfileValidation()) return false;

  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ad1b26",
    cancelButtonColor: "#fff",
    confirmButtonText: "Yes",
  }).then((r) => {
    if (r.value) {
      console.log({
        action:
          $("#image-type").val() != "PROFILE"
            ? "ADDIMAGE"
            : "UPDATEPROFILEIMAGE",
        type: "customer",
        image_type: $("#image-type").val(),
        imagename: $("#image-name").val(),
        custcode: user.custcode,
        mobile: user.mobileno,
        image: $("#uploaded-images").attr("src"),
      });
      loadData(
        "account",
        "REQ001",
        "PROFILE",
        {
          action:
            $("#image-type").val() != "PROFILE"
              ? "ADDIMAGE"
              : "UPDATEPROFILEIMAGE",
          type: "customer",
          image_type: $("#image-type").val(),
          imagename: $("#image-name").val(),
          custcode: user.custcode,
          mobile: user.mobileno,
          image: $("#uploaded-images").attr("src"),
        },
        "COMMON"
      ).then((responseArr) => {
        console.log(responseArr);
        if (responseArr.status.toUpperCase() == "SUCCESS") {
          imageidArr.push(responseArr.imageid);
          getProfilePhoto();
          successErrorAlert("success", "", responseArr.message);
          //successErrorAlert('success', 'Update!', responseArr.message);
          $("#img-cancel-btns").click();
        } else if (responseArr.status.toUpperCase() == "ERROR") {
          successErrorAlert("error", "", responseArr.message);
        }
      });
    }
  });
});

function imageProfileValidation() {
  if ($("#uploaded-images").attr("src") == "") {
    successErrorAlert("error", "", "Please Select Image");
    return false;
  } else if ($("#image-type").val() == "") {
    successErrorAlert("error", "", "Please Select Image Type");
    return false;
  } else if ($("#image-name").val() == "") {
    successErrorAlert("error", "", "Please Select Image Name");
    return false;
  }
  return true;
}

$("#img-cancel-btns").on("click", function () {
  $("#profileImageModal1").modal("hide");
  $("#profile_image").attr("src", "");
  $("#profile_uploaded-images").attr("src", "");
  $("#profile_image-type").val("");
  $("#profile_image-name").val("");
  $("#profile_image").val("");
  $("#profile_uploaded-images").val("");
});

function getProfilePhoto() {
  try {
    loadData(
      "account",
      "REQ001",
      "PROFILE",
      {
        action: "GETIMAGE",
        type: "customer",
        image_type: "PROFILE",
        custcode: user.custcode,
        mobile: user.mobileno,
      },
      "COMMON"
    ).then((responseArr) => {
      if (responseArr.status.toUpperCase() == "SUCCESS") {
        if (responseArr["data"].image != "") {
          $(".photo").attr("src", responseArr["data"].image);
          setCookie("profile_images", responseArr["data"].image);
        } else {
          $(".photo").attr("src", "app.static/img/myprofile.png");
        }
      } else if (responseArr.status.toUpperCase() == "ERROR") {
        $(".photo").attr("src", "app.static/img/myprofile.png");
      }
    });
  } catch (err) {
    $(".photo").attr("src", "app.static/img/myprofile.png");
  }
}

var button = document.querySelector("#update-profile");
button.addEventListener("click", (e) => {
  e.preventDefault();
  button.classList.add("animate");

  setTimeout(() => {
    button.classList.remove("animate");
  }, 600);
});

function readProfileURL(input) {
  $("#img").attr("src", "");
  if (input.files[0].size / 1024 > 1024) {
    successErrorAlert(
      "error",
      "",
      "File size should be less than or equal 1 MB"
    );
    return false;
  }
  let ext = input.files[0].name
    .substr(input.files[0].name.lastIndexOf(".") + 1)
    .toLowerCase();
  if (ext == "png" || ext == "jpg" || ext == "jpeg") {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#uploaded-images").attr("src", e.target.result);
        $("#image-name").val(input.files[0].name);
        $("#profile-img-name").text(input.files[0].name);
      };
      reader.readAsDataURL(input.files[0]);
      $("#img").show();
    }
  } else {
    successErrorAlert("error", "", "File Extension Not Allowed");
    $("#image").attr("src", "");
    $("#uploaded-images").attr("src", "");
    $("#image").val("");
    $("#profile-img-name").text("No file choosen");
    $("#uploaded-image").val("");
    return false;
  }
}

function getNotificationBadgeHelpAndSupport() {
  let badgeParam = {
    intMobileNo: user.mobileno,
  };
  loadData(
    "account",
    "REQ001",
    "GET_UNREAD_CONVERSATION",
    badgeParam,
    "COMMON"
  ).then((responseArr) => {
    console.log("9045626252 responseArr", responseArr);
    if (
      responseArr.status.toUpperCase() == "SUCCESS" &&
      responseArr.intTotalUnreadConversation > 0
    ) {
      $("#lable_for_badge_notification").show();
      $("#help_support_badge_count").text(
        responseArr.intTotalUnreadConversation
      );
    } else {
      $("#lable_for_badge_notification").hide();
      $("#help_support_badge_count").text("");
    }
  });
}
