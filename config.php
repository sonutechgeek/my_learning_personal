<?php

final class Config {

    // const SERVERIP = "http://13.201.24.101/LotteryEnssgine/"; 
    const SERVERIP = "http://10.185.3.5/BMREngine/";
    const SITEPATH = "http://13.201.24.101/users/sonu/1_oct_2024_newStageBMR/newstagebookmyrajshree/rajshree-web/";
    // const SERVERIP = "http://192.168.42.221/LotteryEngine/";
    // const SERVERIP = "http://192.168.42.221/LotteryEngineTest/";

    // const SITEPATH = "https://newstage.bookmyrajshree.com";
    const PROMOIMG = "app.static/promo/";
    const VAPID_KEY = "BLLOv22VNTEP26oU5d9qzh_EVXWMDCzE75De2q3w9Pp8NpFny9UgZSo31HwO0rAM1bTfdKqiVwepBiHGDemwklo";
    const SERVER_KEY = "AAAAk_5JFSI:APA91bHGRtt2MPmTadFfXyOA7fGDBqaW_jdhpUfAeUNZn7rog7kxMRA2PdT80KuEV5t9kku2mV1PWRdyBJXzgSP9R78OeuLmCm1G8Z8QoeqlC8ApOagpbvKa_lQzi4n-reh2gVkzvVhJ";
//    const PAYMENTGATEWAY = "https://myrajshree.com/PG_test/plpaymentgateway/";
    const PAYMENTGATEWAY = array(
        "PAYUPAYMENT" => "https://myrajshree.com/PG_test/plpaymentgateway/",
        "NIMBELPAYMENT" => "https://myrajshree.com/PG_test/nimbblPaymentGateway/"
    );
    const RESULT_IMAGE_URL = "https://myrajshri.com/saveresultStage/";
    const APP = "PLWEB";
    const BRAND = "PL";
    const STATE = "ME";
    const LOCATION = array("IN-MH", "IN-UP", "IN-HR", "IN-DL");
    const ALL_ACCESS = array("9045626252");
    const PATHS = array(
        "COMMON" => array(
            "REGISTERUSER_VERYFYUSER" => "PaperLottery/Customer/NewSignIn/verifyUser",
            "REGISTERUSER_OTP" => "PaperLottery/Customer/NewSignIn/requestOTP",
            "REGISTERUSER_VERIFYOTP" => "PaperLottery/Customer/NewSignIn/verifyOTP",
            "WHATSAPPSIGNIN" => "PaperLottery/Customer/NewSignIn/signin",
            /* NEW KEY V2 SCREEN */
            "REGISTERUSER_VERIFYMPIN" => "PaperLottery/Customer/NewSignIn/verifyMPIN",
            "REGISTERUSER_CREATEMPIN" => "PaperLottery/Customer/NewSignIn/createMPIN",
            "REGISTERUSER_UPDATEMPIN" => "PaperLottery/Customer/NewSignIn/resetMPIN",
            "LOTTERY_V2" => "PaperLottery/Customer/V2/LotteryMaster/lotteryMaster",
            "SALE_V2" => "PaperLottery/Customer/V2/Sale/sale",
            /* NEW KEY MPIN */
            /**/
            "LOTTEY_ON_DRAWDATE" => "PaperLottery/Customer/LotteryMaster/getLotteryInformation",
            "VERIFY_PWT" => "PaperLottery/Claim/verifyPWT",
            "LOTTERY" => "PaperLottery/Customer/LotteryMaster/lotteryMaster",
            "REGISTERUSER" => "PaperLottery/Customer/Register/registerUser",
            "LOTTERYDATEWISE" => "PaperLottery/Helper/GetLotteryData",
            "GETWINNERS" => "PaperLottery/Customer/Winners/getWinners",
            "GETWINNERIMAGE" => "PaperLottery/Customer/Winners/getWinnerImage",
            "ALL_LOTTERY" => "PaperLottery/Helper/getAllLotteryInformation",
            "ORDER_DETAILS" => "PaperLottery/Customer/ShippingMaster/shippingMaster",
            "SEND_MOBILE_LINK" => "PaperLottery/Customer/Register/sendAPPLink",
            "PROFILE" => "PaperLottery/Customer/Profile/user",
            "RESET_PASSWORD" => "PaperLottery/Customer/Register/registerUser",
            "SALE" => "PaperLottery/Customer/Sale/sale",
            "SALEUPDATE" => "PaperLottery/Customer/Sale/updateSaleStatus",
            "GET_ADDRESS" => "PaperLottery/Customer/Profile/getAddress",
            "CART" => "PaperLottery/Customer/Cart/cart",
            "ADD_ADDRESS" => "PaperLottery/Customer/Profile/addAddress",
            "DELETE_ADDRESS" => "PaperLottery/Customer/Profile/deleteAddress",
            "EDIT_ADDRESS" => "PaperLottery/Customer/Profile/editAddress",
            "PINCODE" => "Utility/Pincode/getDataByPincode",
            "RESULT" => "PaperLottery/Helper/getLotteryInformation",
            "RESULT_LIST" => "PaperLottery/Customer/Result/result",
            "SEND_OTP" => "PaperLottery/Customer/Result/result",
            "RESULTURL" => "PaperLottery/Result/showResult",
            "STOCKISTTURL" => "PaperLottery/Stockist",
            "WINNERLISTURL" => "PaperLottery/Result/winnerDetails",
            "DRAWDATEWISERESULT" => "PaperLottery/Result/showResult",
            "CHECK_SOCIAL_MEDIA_USER" => "PaperLottery/Customer/Profile/checkSocialMediaUser",
            "REGISTER_SOCIAL_MEDIA_USER" => "PaperLottery/Customer/Profile/registerSocialMediaUser",
            // "GET_WALLET_BALANCE" => "PaperLottery/Customer/Wallet/wallet",
            "GET_WALLET_BALANCE" => "PaperLottery/Customer/V2/Wallet/wallet",
            "WALLET_SALE" => "PaperLottery/Customer/Sale/walletSale",
            "SET_PRIMARY_ADDRESS" => "PaperLottery/Customer/Profile/markAddressPrimary",
            "SEND_OTP_EMAIL" => "PaperLottery/Customer/Profile/sendOTPEmail",
            "VERIFY_OTP_EMAIL" => "PaperLottery/Customer/Profile/verifyOTPEmail",
            "SEND_OTP_MOBILE" => "PaperLottery/Customer/Profile/sendOTPMobile",
            "VERIFY_OTP_MOBILE" => "PaperLottery/Customer/Profile/verifyOTPMobile",
            "INVOICE" => "PaperLottery/Customer/ShippingMaster/shippingMaster",
            "GETLOTTERYIMAGE" => "PaperLottery/Customer/Images/getData",
            "RESULT_ALERT" => "PaperLottery/Customer/Profile/resultAlert",
            "GET_GOVT_SCHEME" => "PaperLottery/Customer/LotteryMaster/lotteryMaster",
            "GET_SCHEMES" => "PaperLottery/Customer/Subscription/getData",
            "WINALL_LOTTERY" => "PaperLottery/Customer/Winners/getAllLotteryInformation",
            "LOTTERY_LIST" => "PaperLottery/Customer/LotteryMaster/getAllLotteryInformation",
            "GET_C_CHARGE" => "PaperLottery/Customer/Courier/getData",
            "PAYOUT" => "PaperLottery/Customer/Payout/payout",
            "GETBANKNAME" => "PaperLottery/Customer/Payout/getDataByIFSC",
            "ANALYTICS" => "PaperLottery/Analytical/Analytics/setAnalyticalData",
            "SUBSCRIPTION" => "PaperLottery/Customer/Subscription/getData",
            "ACTIVE_PAYMENT_GATEWAY" => "PaperLottery/PaymentGatewayMaster/getPaymentGateway",
            "NOTIFICATION" => "PaperLottery/Customer/Notification/getNotification",
            "READNOTIFICATION" => "PaperLottery/Customer/Notification/updateMsgStatus",
            "GETMESSAGE_COUNT" => "PaperLottery/Customer/Notification/getNotificationCount",
            /* KYC API */
	        "UPDATE_PROFILE" => "PaperLottery/Customer/V2/UserKyc/updateBasicDetails",
            "KYC_DOCUMENT_VERIFY" => "PaperLottery/Customer/V2/UserKyc/documentApproveType",
            "KYC_DOCUMENT_UPLOAD" => "PaperLottery/Customer/V2/UserKyc/upload",
            "KYC_DOCUMENT_VIEW" => "PaperLottery/Customer/V2/UserKyc/viewKycData",
            "NOTIFICATION_TOKEN" => "PaperLottery/Customer/Notification/registerPushToken",
            "UTM_PROVIDER" => "PaperLottery/Customer/UtmDetails/utmDetails",
            "ORDER_MASTER" => "PaperLottery/Customer/V2/OrderMaster/orderMaster",
            "GET_DEEPLINK_DETAIL"=>"PaperLottery/Customer/V2/LotteryMaster/lotteryMaster",
	        "GET_WALLET_BALANCE_OLD" => "PaperLottery/Customer/Wallet/wallet",
            "GET_USER_STATUS" => "PaperLottery/Customer/NewSignIn/getuserstatus",
            "LOCATION_STATUS" => "PaperLottery/Customer/V2/UserKyc/getlocationstatus",
            "WITHDRAWAL" => "PaperLottery/Customer/V2/Withdrawal/withdrawal",
            "PROBLEM_TYPE"=>"PaperLottery/Customer/Complaint/problemTypeApp",
            "REGISTER_COMPLAINT" => "PaperLottery/Customer/Complaint/saveComplaints",
            "COMPLAINT_REQUEST_STATUS"=>"PaperLottery/Customer/Complaint/getReportComplaintApp",
            "COMPLAINT_CHAT_STATUS"=>"PaperLottery/Customer/Complaint/getCustomerConversation",
            "COMPLAINT_CHAT_USER_MSG"=>"PaperLottery/Customer/Complaint/replyCustomerConversation",
            "GET_UNREAD_CONVERSATION"=>"PaperLottery/Customer/Complaint/getTotalUnreadConversation",
            "MARK_CONVERSATION_AS_READ"=>"PaperLottery/Customer/Complaint/markConversationAsRead",
            "GET_PROMO_CODE" => "PaperLottery/Customer/Promo/getPromoList",

                        "GET_PROMO_CODE_VALIDATE" => "PaperLottery/Customer/Promo/verify",
            "GET_PROMO_TERM_COND" => "PaperLottery/Customer/Promo/getTermAndCondition"


        ),
        "PAYMENT" => array(
            "PAYUPAYMENT" => "payumoney/webpayment.php",
            "NIMBELPAYMENT" => "nimbbl/webpayment.php"
        ),
    );

    static function getPath(String $gamename, String $action) {
        if (strtoupper($gamename) == "PAYMENT") {
//            if (strtoupper($action) == "PAYUPAYMENT") {
//                return self::PAYMENTGATEWAY . "" . self::PATHS[$gamename][strtoupper($action)];
//            }
            if (strtoupper($action) == "PAYUPAYMENT" || strtoupper($action) == "NIMBELPAYMENT") {
                return self::PAYMENTGATEWAY[strtoupper($action)] . "" . self::PATHS[$gamename][strtoupper($action)];
            }
        }
        return self::SERVERIP . "" . self::PATHS[$gamename][strtoupper($action)];
    }

    static function fetchResponse(String $action, $data_array, String $gamecode = "COMMON") {
        $data_array["brand"] = self::BRAND;
        $data_array["state"] = self::STATE;
        $data_array["app"] = self::APP;
        //    $data_array["GameCode"] = "88";
        $opts = array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => json_encode($data_array),
            ),
        );
        $context = stream_context_create($opts);
        $path_to_call = Config::getPath($gamecode, $action);
	$response_text = file_get_contents($path_to_call, false, $context);
        return $response_text;
    }

    static function fetchRequest($isdecrypted = false) {
        $encodedData = file_get_contents('php://input');
        $decodedData = json_decode($encodedData, true);
        if (json_last_error() == JSON_ERROR_NONE) {
            return $decodedData;
        } else {
            trigger_error("Invalid JSON Data");
        }
    }

}
