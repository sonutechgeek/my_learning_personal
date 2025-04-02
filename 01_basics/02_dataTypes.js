"use strict"; // treat all JS code as newer version

// alert( 3 + 3) // we are using nodejs, not browser

console.log(3 
    +
     3) // code readability should be high

console.log("Hitesh")


let name = "hitesh";
let age = 18;
let isLoggedIn = false;
let state;

console.log(typeof age);

// primitive
// number => 2 to power 53
// bigint
// string => ""
// boolean => true/false
// null => standalone value datatype also; representation of empty value;
// undefined => it is also a type of variable 
// symbol => unique :usefull in react for identifying uniqueness in componemts;


// non primitive
// object

console.log(typeof undefined); // undefined
console.log(typeof null); // object


let user={
    "usercode": "G0001",
    "username": "Summit Online Trade Solutions Pvt. Ltd.",
    "loginname": "Summit",
    "outletname": "Summit Online Trade Solutions Pvt. Ltd.",
    "password1": "6c1762a370e3a3e08ad5cf214e435ee5",
    "password2": "",
    "password3": "",
    "mpin": "",
    "address": "",
    "pancard": "",
    "city": null,
    "district": "",
    "state": "Maharashtra",
    "zip": null,
    "country": "INDIA",
    "phoneno": null,
    "ph2": null,
    "mobile": "9050092978",
    "email": "",
    "entrydate": "0000-00-00 00:00:00",
    "level": 0,
    "parent": "",
    "block": "N",
    "login_time": "0000-00-00 00:00:00",
    "openingbal": 0,
    "gstin": "",
    "business_proof_type": "",
    "residence_proof_type": "",
    "business_doc": "",
    "residence_doc": "",
    "license": "",
    "lastupdate": "2024-01-15 17:02:48",
    "branchcode": "B01",
    "stockist_type": "",
    "serno": 0,
    "loginstatus": "L",
    "pwdate": "2023-11-28 15:46:36",
    "mobileupdate": "2020-11-27 14:56:02",
    "l3parent": "",
    "bank_account_no": "",
    "bank_name": "",
    "ifsc_code": "",
    "account_holder_name": "",
    "creditlimit": 0,
    "used_balance": 0,
    "pandate": "0000-00-00",
    "txtPanHolderName": null,
    "txtApplicationStatus": "Approved",
    "intStatusChangedBy": null,
    "txtApplicationRemark": null,
    "datStatusChanged": null
  }
  console.table(user);