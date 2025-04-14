function captureClicks(eventid, action, data) {
    let user = getuserdata();
    let loginFlag = "0";
    let mobileNo = "";
    let customerCode = "";
    if (user != null) {
        loginFlag = "1";
        mobileNo = user.mobileno;
        customerCode = user.custcode;
    }
    let postData = {
        eventid: eventid,
        loginflag: loginFlag,
        mobileno: mobileNo,
        platform: "PWA",
        action: action,
	    custcode: customerCode,
        data: data
    };
   loadData("ANALYTICS", "REQ001", "ANALYTICS", postData, "COMMON").then(responseArr => {
       //console.log(JSON.stringify(responseArr));
   });
}
