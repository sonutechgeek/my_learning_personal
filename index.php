<?php
//print_r($_REQUEST);
//exit("<h2>Our Website is currently down for scheduled maintenance from 12.15 PM to 12.30 PM. See you right after that.</h2>");

require_once "../config.php";

$agent = $_SERVER["HTTP_USER_AGENT"];
$webapp_version = "0.2.42";

$data_Arr = array();
$isGame = false;
$refercode = 0;
$uri_data = explode("/", $_SERVER['REQUEST_URI']);
$uri_component = ""; //array_slice($uri_data, -1)[0];
// exit($uri_component."123");/
$link = (isset($_SERVER['HTTP_USER_AGENT']) && $_SERVER['HTTP_USER_AGENT'] === 'on' ? "https" : "http") .
    "://" . $_SERVER['HTTP_USER_AGENT_HOST'] .
    $_SERVER['REQUEST_URI'];
$newLink = $link;

if (!array_key_exists('HTTP_USER_AGENT_HOST', $_SERVER) && array_key_exists('SERVER_NAME', $_SERVER)) {
    $newLink = (isset($_SERVER['HTTP_USER_AGENT']) && $_SERVER['HTTP_USER_AGENT'] === 'on' ? "https" : "https") .
        "://" . $_SERVER['SERVER_NAME'] .
        $_SERVER['REQUEST_URI'];
}
//echo $newLink."---".$_SERVER['HTTP_USER_AGENT']."<br/>";
//exit;
$link_array = explode('/', $link);
$page = "";
$page = strtolower(end($link_array));
$page_string = $page;
$utm_provider_string = '';

if (array_key_exists('source', $_REQUEST) || array_key_exists('utm_source', $_REQUEST)) {
    $utm_provider = "";
    //    echo($_REQUEST['utm_source']);
    if (array_key_exists('source', $_REQUEST) && $_REQUEST['source'] != "") {
        $utm_provider = $_REQUEST['source'];
    } else if (array_key_exists('utm_source', $_REQUEST) && $_REQUEST['utm_source'] != "") {
        $utm_provider = $_REQUEST['utm_source'] . "&utm";
    }
    if ($utm_provider != "") {
        $utm_provider_string = $utm_provider;
        $utm_provider_array["utm_provider"] = $utm_provider;
        $utm_provider_array["app"] = "PLWEB";
        $utm_provider_array["brand"] = "ME";
        $utm_provider_array["state"] = "PL";
        $utm_provider_array["action"] = "ADD";
        //        print_r($utm_provider_array);
        $utmCount_json = Config::fetchResponse("UTM_PROVIDER", $utm_provider_array, "COMMON");
        $utmCount_Array = json_decode($utmCount_json, true);
        //        print_r($utmCount_Array);
        if (strtolower($utmCount_Array['status']) == "success") {
            //            print_r($utmCount_Array);
        } else {
            //            echo ($utmCount_Array['message']);
        }
    }
    $page = 'home';
}

$urlLotcode = "";
$urlDrawdate = "";
$redirectMobilePage = true;
if (array_key_exists("drawdate", $_REQUEST) && array_key_exists("lotcode", $_REQUEST) && isset($_REQUEST['drawdate']) && isset($_REQUEST['lotcode']) && $_REQUEST['drawdate'] != "" && $_REQUEST['lotcode'] != "") {
    $urlLotcode = $_REQUEST['lotcode'];
    $urlDrawdate = $_REQUEST['drawdate'];
}
$deepLinkObjArray = array();
if (empty($urlLotcode) && empty($utm_provider_string) && !empty($page_string)) {
    //    $deeplink_array["deeplink"] = $newLink;
    $deeplink_array["deeplink"] = $page_string;
    $deeplink_array["app"] = "PLWEB";
    $deeplink_array["brand"] = "PL";
    $deeplink_array["state"] = "ME";
    $deeplink_array["action"] = "LOTTERY_DEEPLINK_DATA";
    $deepLink_json = Config::fetchResponse("GET_DEEPLINK_DETAIL", $deeplink_array, "COMMON");
    $deepLink_Array = json_decode($deepLink_json, true);
    if (array_key_exists('status', $deepLink_Array) && strtolower($deepLink_Array['status']) == "success") {
        $deepLinkObjArray["data"] = array(
            "id" => $deepLink_Array["lotterydetails"]["lottery_id"],
            "displayname" => $deepLink_Array["lotterydetails"]["displayname"],
            "lotcode" => $deepLink_Array["lotterydetails"]["lotcode"],
            "drawdate" => $deepLink_Array["lotterydetails"]["drawdate"],
            "drawtime" => $deepLink_Array["lotterydetails"]["drawtime"],
            "govtname" => $deepLink_Array["lotterydetails"]["govtname"],
            "salestartdate" => $deepLink_Array["lotterydetails"]["salestartdate"],
            "salestopdate" => $deepLink_Array["lotterydetails"]["salestopdate"],
            "mrp" => $deepLink_Array["lotterydetails"]["mrp"],
            "status" => $deepLink_Array["lotterydetails"]["status"]
        );
        $redirectMobilePage = false;
    }
}

function isMobileDevice()
{
    $aMobileUA = array(
        '/iphone/i' => 'iPhone',
        '/ipod/i' => 'iPod',
        '/ipad/i' => 'iPad',
        '/android/i' => 'Android',
        '/blackberry/i' => 'BlackBerry',
        '/webos/i' => 'Mobile',
    );
    foreach ($aMobileUA as $sMobileKey => $sMobileOS) {
        if (preg_match($sMobileKey, $_SERVER['HTTP_USER_AGENT'])) {
            return "M";
        }
    }
    return "D";
}

$devicetype = isMobileDevice();

if ($devicetype == 'M') {
    //    exit($urlDrawdate."---".$urlDrawdate);
    if (!empty($urlLotcode) && !empty($urlDrawdate)) {
        header("Location: ./mobile/?lotcode=" . $urlLotcode . "&drawdate=" . $urlDrawdate);
    } else if ($redirectMobilePage == false && !empty($deepLinkObjArray)) {
        header("Location: ./mobile/" . $page_string);
    } else if (isset($_REQUEST['qr_ref_id'])) {
        header('Location: ./mobile/?qr_ref_id=' . $_REQUEST['qr_ref_id']);
    } else if (!empty($page_string)) {
        header("Location: ./mobile/" . $page_string);
    } else {
        header("Location: ./mobile/");
    }
    exit;
}

$browser_ = "";

if (preg_match('/MSIE (\d+\.\d+);/', $agent)) {
    $browser_ = "internet explorer";
} else if (preg_match('/Chrome[\/\s](\d+\.\d+)/', $agent)) {
    $browser_ = "chrome";
} else if (preg_match('/CriOS[\/\s](\d+\.\d+)/', $agent)) {
    $browser_ = "chrome";
} else if (preg_match('/Edge\/\d+/', $agent)) {
    $browser_ = "edge";
} else if (preg_match('/Firefox[\/\s](\d+\.\d+)/', $agent)) {
    $browser_ = "firefox";
} else if (preg_match('/OPR[\/\s](\d+\.\d+)/', $agent)) {
    $browser_ = "opera";
} else if (preg_match('/Safari[\/\s](\d+\.\d+)/', $agent)) {
    $browser_ = "safari";
}

$directComponettoLoad = "";
$ticketsold = '';
if (array_key_exists("type", $_POST) && $_POST["type"] == "direct") {
    if ($_POST["option"] == "MY_ORDER") {
        $directComponettoLoad = "myorders";
    }
}
if (array_key_exists("component", $_POST)) {
    $walletBalance = "0";
    $paymentStatus = '';
    $message = '';
    $totalsalemrp = 0;
    $component = json_decode($_POST['component'], true);
    if ($_POST['status'] == "SUCCESS") {
        if (array_key_exists('payment_status', $_POST)) {
            $paymentStatus = $_POST['payment_status'];
        } else {
            $paymentStatus = 'PAID';
        }
        if (strtolower($_POST['status']) == 'success') {
            $ticketsold = 'true';
            $message = "You Balance Succesfully Updated";
            $totalsalemrp = $component['totalsalemrp'];
            $directaddmoney = $component['directaddmoney'];
        } else {
            $ticketsold = 'false';
            $message = "You Balance Not Updated";
        }
    } else {
        $ticketsold = 'false';
        $message = "You Balance Not Updated";
        // echo $ticketsold."aa";
    }
}

unset($_POST);
?>

<!DOCTYPE html>
<html>

<head>
    <!-- Google Tag Manager -->
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-588SQR8');
    </script>
    <!-- End Google Tag Manager -->
    <meta name="google-site-verification" content="S7uSHZQmV-bESwuDPgNrPHCM7wJy-e_1st6YDtZC1HU" />
    <?php
    if ($page == 'aboutus' || $page == 'about-us' || $page == 'contactus' || $page == 'contact-us' || $page == 'result' || $page == 'rajshree-lottery-result' || $page == 'winner' || $page == 'rajshree-lottery-winners' || $page == 'faq' || $page == 'cart' || $page == 'rajshree_1000_monthly_lottery' || $page == 'rajshree_500_monthly_lottery' || $page == 'rajshree_250_monthly_lottery' || $page == 'rajshree_200_monthly_lottery' || $page == 'rajshree_100_monthly_lottery' || $page == 'rajshree_50_monthly_lottery' || $page == 'rajshree_20_monthly_lottery' || $page == 'rajshree_50_weekly_lottey' || $page == 'rajshree_10_evening_weekly_lottery' || $page == 'rajshree_01.00_pm' || $page == 'rajshree_04.00_pm' || $page == 'rajshree_08.00_pm' || $page == 'lottery' || $page == 'rajshree_20_weekly_lottery') {
        if ($page == 'aboutus' || $page == 'about-us') {
            ?>
            <meta name="Title" content="About Rajshree Lottery - Organized, Promoted & Conducted by State Govt" />
            <meta name="description"
                content=" Win exciting prizes with Rajshree Lottery. Your trusted online lottery platform. Buy genuine & legal lottery tickets easily. Don’t miss the chance to win big.">
            <meta property="og:title" content=" About Rajshree Lottery - Organized, Promoted & Conducted by State Govt" />
            <meta property="og:description"
                content=" Win exciting prizes with Rajshree Lottery. Your trusted online lottery platform. Buy genuine & legal lottery tickets easily. Don’t miss the chance to win big." />
            <title>About Rajshree Lottery - Organized, Promoted & Conducted by State Govt</title>
            <?php
        } else if ($page == 'contactus' || $page == 'contact-us') {
            ?>
                <meta name="Title" content="Reach out to Rajshree Lottery - We're Here to Help" />
                <meta name="description"
                    content="Get in touch with Rajshree Lottery's customer support. Contact us for any questions, assistance with tickets, or to claim your winnings.">
                <meta property="og:title" content="Reach out to Rajshree Lottery - We're Here to Help" />
                <meta property="og:description"
                    content="Get in touch with Rajshree Lottery's customer support. Contact us for any questions, assistance with tickets, or to claim your winnings." />
                <title>Reach out to Rajshree Lottery - We're Here to Help</title>
            <?php
        } else if ($page == 'result' || $page == 'rajshree-lottery-result') {
            ?>
                    <meta name="Title" content="Rajshree Lottery Results - Check Your Winning Numbers!" />
                    <meta name="description"
                        content="Stay updated with the latest Rajshree Lottery Results! Find out if you're a winner by checking our weekly and monthly draw results and celebrate your luck with Rajshree Lottery!">
                    <meta property="og:title" content="Rajshree Lottery Results - Check Your Winning Numbers!" />
                    <meta property="og:description"
                        content="Stay updated with the latest Rajshree Lottery Results! Find out if you're a winner by checking our weekly and monthly draw results and celebrate your luck with Rajshree Lottery!" />
                    <title>Rajshree Lottery Results - Check Your Winning Numbers!</title>
            <?php
        } else if ($page == 'cart') {
            ?>
                        <meta name="Title" content="Your Shopping Cart - Rajshree Lottery Online Booking" />
                        <meta name="description"
                            content="Review your selected Rajshree Lottery tickets before checkout. Secure your chance to win big by booking your tickets online now!">
                        <meta property="og:title" content="Your Shopping Cart - Rajshree Lottery Online Booking" />
                        <meta property="og:description"
                            content="Review your selected Rajshree Lottery tickets before checkout. Secure your chance to win big by booking your tickets online now!" />
                        <title>Your Shopping Cart - Rajshree Lottery Online Booking</title>
            <?php
        } else if ($page == 'rajshree_1000_monthly_lottery') {
            ?>
                            <meta name="Title" content="Rajshree 1000 Monthly Lottery - Win Big Every Month!" />
                            <meta name="description"
                                content="Buy Rajshree 1000 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                            <meta property="og:title" content="Rajshree 1000 Monthly Lottery - Win Big Every Month!" />
                            <meta property="og:description"
                                content="Buy Rajshree 1000 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                            <title>Rajshree 1000 Monthly Lottery - Win Big Every Month!</title>
            <?php
        } else if ($page == 'rajshree_500_monthly_lottery') {
            ?>
                                <meta name="Title" content="Rajshree 500 Monthly Lottery - Your Chance to Win Big!" />
                                <meta name="description"
                                    content="Buy Rajshree 500 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                                <meta property="og:title" content="Rajshree 500 Monthly Lottery - Your Chance to Win Big!" />
                                <meta property="og:description"
                                    content="Buy Rajshree 500 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                                <title>Rajshree 500 Monthly Lottery - Your Chance to Win Big!</title>
            <?php
        } else if ($page == 'rajshree_250_monthly_lottery') {
            ?>
                                    <meta name="Title" content="Rajshree 250 Monthly Lottery - Monthly Draw with Exciting Prizes!" />
                                    <meta name="description"
                                        content="Buy Rajshree 250 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                                    <meta property="og:title" content="Rajshree 250 Monthly Lottery - Monthly Draw with Exciting Prizes!" />
                                    <meta property="og:description"
                                        content="Buy Rajshree 250 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                                    <title>Rajshree 250 Monthly Lottery - Monthly Draw with Exciting Prizes!</title>
            <?php
        } else if ($page == 'rajshree_200_monthly_lottery') {
            ?>
                                        <meta name="Title" content="Rajshree 200 Monthly Lottery - Win Exciting Prizes Every Month" />
                                        <meta name="description"
                                            content="Buy Rajshree 200 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                                        <meta property="og:title" content="Rajshree 200 Monthly Lottery - Win Exciting Prizes Every Month" />
                                        <meta property="og:description"
                                            content="Buy Rajshree 200 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                                        <title>Rajshree 200 Monthly Lottery - Win Exciting Prizes Every Month</title>
            <?php
        } else if ($page == 'rajshree_100_monthly_lottery') {
            ?>
                                            <meta name="Title" content="Rajshree 100 Monthly Lottery - Affordable Tickets, Big Wins!" />
                                            <meta name="description"
                                                content="Buy Rajshree 100 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                                            <meta property="og:title" content="Rajshree 100 Monthly Lottery -  Affordable Tickets, Big Wins!" />
                                            <meta property="og:description"
                                                content="Buy Rajshree 100 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                                            <title>Rajshree 100 Monthly Lottery - Affordable Tickets, Big Wins!</title>
            <?php
        } else if ($page == 'rajshree_50_monthly_lottery') {
            ?>
                                                <meta name="Title" content="Rajshree 50 Monthly Lottery -Your Monthly Chance to Win" />
                                                <meta name="description"
                                                    content="Buy Rajshree 50 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                                                <meta property="og:title" content="Rajshree 50 Monthly Lottery -Your Monthly Chance to Win" />
                                                <meta property="og:description"
                                                    content="Buy Rajshree 50 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                                                <title>Rajshree 50 Monthly Lottery -Your Monthly Chance to Win</title>
            <?php
        } else if ($page == 'rajshree_20_monthly_lottery') {
            ?>
                                                    <meta name="Title" content="Rajshree 20 Monthly Lottery - Win exciting prizes at an affordable ticket price" />
                                                    <meta name="description"
                                                        content="Buy Rajshree 20 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners.">
                                                    <meta property="og:title"
                                                        content="Rajshree 20 Monthly Lottery - Win exciting prizes at an affordable ticket price" />
                                                    <meta property="og:description"
                                                        content="Buy Rajshree 20 Monthly Lottery Tickets online and stand a chance to win exciting prizes. Find out how to buy tickets, check draw dates, view results, and see past winners." />
                                                    <title>Rajshree 20 Monthly Lottery - Win exciting prizes at an affordable ticket price</title>
            <?php
        } else if ($page == 'rajshree_50_weekly_lottey') {
            ?>
                                                        <meta name="Title" content="Rajshree 50 Weekly Lottery - Win Every Week with Just Rs 50" />
                                                        <meta name="description"
                                                            content="Buy Rajshree 50 Weekly Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view draw dates, and more.">
                                                        <meta property="og:title" content="Rajshree 50 Weekly Lottery - Win Every Week with Just Rs 50" />
                                                        <meta property="og:description"
                                                            content="Buy Rajshree 50 Weekly Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view draw dates, and more." />
                                                        <title>Rajshree 50 Weekly Lottery - Win Every Week with Just Rs 50</title>
            <?php
        } else if ($page == 'rajshree_20_weekly_lottery') {
            ?>
                                                            <meta name="Title" content="Rajshree 20 Weekly Lottery - Your Weekly Chance to Win Big" />
                                                            <meta name="description"
                                                                content="Buy Rajshree 20 Weekly Lottery Tickets online and have a chance to win amazing prizes. Discover how to buy tickets, view draw dates, and more.">
                                                            <meta property="og:title" content="Rajshree 20 Weekly Lottery - Your Weekly Chance to Win Big" />
                                                            <meta property="og:description"
                                                                content="Buy Rajshree 20 Weekly Lottery Tickets online and have a chance to win amazing prizes. Discover how to buy tickets, view draw dates, and more." />
                                                            <title>Rajshree 20 Weekly Lottery - Your Weekly Chance to Win Big</title>
            <?php
        } else if ($page == 'rajshree_10_evening_weekly_lottery') {
            ?>
                                                                <meta name="Title" content="Rajshree 10 Evening Weekly Lottery - Win Big with Just Rs 10" />
                                                                <meta name="description"
                                                                    content="Buy Rajshree 10 Evening Weekly Lottery Tickets online for just Rs 10 and have a chance to Win exciting prizes every week. Learn how to participate and check evening draw results.">
                                                                <meta property="og:title" content="Rajshree 10 Evening Weekly Lottery - Win Big with Just Rs 10" />
                                                                <meta property="og:description"
                                                                    content="Buy Rajshree 10 Evening Weekly Lottery Tickets online for just Rs 10 and have a chance to Win exciting prizes every week. Learn how to participate and check evening draw results." />
                                                                <title>Rajshree 10 Evening Weekly Lottery - Win Big with Just Rs 10</title>
            <?php
        } else if ($page == 'rajshree_01.00_pm') {
            ?>
                                                                    <meta name="Title" content="Rajshree 1.00 PM Lottery - Exciting Afternoon Prizes Await!" />
                                                                    <meta name="description"
                                                                        content="Buy Rajshree 1.00 PM Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view results, and more">
                                                                    <meta property="og:title" content="Rajshree 1.00 PM Lottery - Exciting Afternoon Prizes Await!" />
                                                                    <meta property="og:description"
                                                                        content="Buy Rajshree 1.00 PM Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view results, and more" />
                                                                    <title>Rajshree 1.00 PM Lottery - Exciting Afternoon Prizes Await!</title>
            <?php
        } else if ($page == 'rajshree_04.00_pm') {
            ?>
                                                                        <meta name="Title" content="Rajshree 4.00 PM Lottery - Your Daily Chance to Win at 4 PM" />
                                                                        <meta name="description"
                                                                            content="Buy Rajshree 4.00 PM Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view results, and more">
                                                                        <meta property="og:title" content="Rajshree 4.00 PM Lottery - Your Daily Chance to Win at 4 PM" />
                                                                        <meta property="og:description"
                                                                            content="Buy Rajshree 4.00 PM Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view results, and more" />
                                                                        <title>Rajshree 4.00 PM Lottery - Your Daily Chance to Win at 4 PM</title>
            <?php
        } else if ($page == 'rajshree_08.00_pm') {
            ?>
                                                                            <meta name="Title" content="Rajshree 8.00 PM Lottery - Exciting Evening Prizes Await!" />
                                                                            <meta name="description"
                                                                                content="Buy Rajshree 8.00 PM Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view results, and more">
                                                                            <meta property="og:title" content="Rajshree 8.00 PM Lottery - Exciting Evening Prizes Await!" />
                                                                            <meta property="og:description"
                                                                                content="Buy Rajshree 8.00 PM Lottery Tickets online and have a chance to win exciting prizes. Discover how to buy tickets, view results, and more" />
                                                                            <title>Rajshree 8.00 PM Lottery - Exciting Evening Prizes Await!</title>
            <?php
        } else if ($page == 'faq') {
            ?>
                                                                                <meta name="Title" content="Rajshree Lottery FAQs - Everything You Need to Know" />
                                                                                <meta name="description" content=" Know everything about Rajshree Lottery from online tickets purchasing to prize claiming. our FAQ covers all your lottery-related queries.
                      <meta property=" og:title" content="Rajshree Lottery FAQs - Everything You Need to Know" />
                                                                                <meta property="og:description"
                                                                                    content=" Know everything about Rajshree Lottery from online tickets purchasing to prize claiming. our FAQ covers all your lottery-related queries." />
                                                                                <title>Rajshree Lottery FAQs - Everything You Need to Know</title>
                                                                                <script type="application/ld+json">
                                                                                                {
                                                                                                "@context": "https://schema.org",
                                                                                                "@type": "FAQPage",
                                                                                                "mainEntity": [{
                                                                                                "@type": "Question",
                                                                                                "name": "What is BookMyRajshree?",
                                                                                                "acceptedAnswer": {
                                                                                                "@type": "Answer",
                                                                                                "text": "BookMyRajshree is India's end to end online portal hosting state government lottery games. We are a licensed and registered business, having our presence in the Indian Lottery market since last 40 Years."
                                                                                                }
                                                                                                }, {
                                                                                                "@type": "Question",
                                                                                                "name": "Is lottery buying and playing legal in India?",
                                                                                                "acceptedAnswer": {
                                                                                                "@type": "Answer",
                                                                                                "text": "Yes. As per Government regulations, for any Resident of India above the age of 18 Years, playing lottery is legal. However, players who want to buy and play lottery should reside in Goa, Maharashtra, or Punjab where lottery is legal."
                                                                                                }
                                                                                                }, {
                                                                                                "@type": "Question",
                                                                                                "name": "Can I buy lottery from any state of India?",
                                                                                                "acceptedAnswer": {
                                                                                                "@type": "Answer",
                                                                                                "text": "As per government regulations, selling/playing lottery is allowed in the states of Goa, Punjab, Sikkim and Maharashtra."
                                                                                                }
                                                                                                }, {
                                                                                                "@type": "Question",
                                                                                                "name": "Where can I buy rajshree lottery?",
                                                                                                "acceptedAnswer": {
                                                                                                "@type": "Answer",
                                                                                                "text": "You can buy rajshree lottery tickets online through bookmyajshree.com. For more details please call our helpline number on 022-68351535"
                                                                                                }
                                                                                                }, {
                                                                                                "@type": "Question",
                                                                                                "name": "How can I pay for my tickets on BookMyRajshree.com?",
                                                                                                "acceptedAnswer": {
                                                                                                "@type": "Answer",
                                                                                                "text": "You can pay for your ticket using following options on BookMyRajshree.com:\n1. PayTM\n2. Debit card\n3. Net banking\n4. Third party wallet"
                                                                                                }
                                                                                                }, {
                                                                                                "@type": "Question",
                                                                                                "name": "Where I can see the Rajshree Lottery results?",
                                                                                                "acceptedAnswer": {
                                                                                                "@type": "Answer",
                                                                                                "text": "In BookMyRajshree website click on result menu. Select your draw date and lottery to view the result."
                                                                                                }
                                                                                                }]
                                                                                                }
                                                                                            </script>
            <?php
        } else if ($page == 'winner') {
            ?>
                                                                                    <meta name="Title" content="Rajshree Lottery Winner - Dreams Come True with a Winning Ticket!" />
                                                                                    <meta name="description"
                                                                                        content="Explore the success story of a recent Rajshree Lottery Winners. From purchasing the ticket to winning big, Read about their journey and how you could be next.">
                                                                                    <meta property="og:title" content="Rajshree Lottery Winner - Dreams Come True with a Winning Ticket!" />
                                                                                    <meta property="og:description"
                                                                                        content="Explore the success story of a recent Rajshree Lottery Winners. From purchasing the ticket to winning big, Read about their journey and how you could be next." />
                                                                                    <title>Rajshree Lottery Winner - Dreams Come True with a Winning Ticket!</title>
            <?php
        } else {
            ?>
                                                                                    <meta name="Title" content="Buy Rajshree Lottery Tickets Online | Your Chance to Win Big!" />
                                                                                    <meta name="description"
                                                                                        content="Participate in our weekly and monthly Rajshree Lottery draws online for a chance to win amazing prizes. Check results and become a part of the winning community today!">
                                                                                    <meta property="og:title" content="Buy Rajshree Lottery Tickets Online | Your Chance to Win Big!" />
                                                                                    <meta property="og:description"
                                                                                        content="Participate in our weekly and monthly Rajshree Lottery draws online for a chance to win amazing prizes. Check results and become a part of the winning community today!" />
                                                                                    <title>Buy Rajshree Lottery Tickets Online | Your Chance to Win Big!</title>
            <?php
        }
    } else {
        ?>
        <meta name="Title" content="Rajshree Lottery - Buy Lottery Tickets Online | State Govt Lottery" />
        <meta name="description"
            content="Rajshree Lottery is organized by State Governments. Trusted by people since decades. Buy your rajshree lottery tickets online today and have a chance to win amazing prizes.">
        <meta property="og:title" content="Rajshree Lottery - Buy Lottery Tickets Online | State Govt Lottery" />
        <meta property="og:description"
            content="Rajshree Lottery is organized by State Governments. Trusted by people since decades. Buy your rajshree lottery tickets online today and have a chance to win amazing prizes." />
        <title>Rajshree Lottery - Buy Lottery Tickets Online | State Govt Lottery</title>
        <?php
    }
    ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180938886-1"></script>
    <link href="https://bookmyrajshree.com/" rel="canonical">
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
            // console.log(" window.dataLayer",  window.dataLayer);
        }
        gtag('js', new Date());

        gtag('config', 'UA-180938886-1');
    </script>
    <!-------------- New Script Add (10-09-24)---------------------->
    <script type="application/ld+json">
            {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rajshree Lottery",
            "url": "https://bookmyrajshree.com",
            "logo": "https://www.bookmyrajshree.com/app.static/img/rajicon.png",
            "sameAs": [
            "https://www.facebook.com/Rajshreelottery",
            "https://www.instagram.com/rajshreelottery",
            "https://x.com/rajshreelottery",
            "https://t.me/s/rajshreelottery",
            "https://www.youtube.com/c/RajshreeLottery",
            "https://www.youtube.com/c/RajshreeLotteryMizoram"
            ]
            }
        </script>
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq)
                return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq)
                f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '218422959606752');
        fbq('track', 'PageView');
    </script>

    <noscript>
        <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=218422959606752&ev=PageView&noscript=1" />
    </noscript>
    <script type="text/javascript">
        var webapp_version = "<?= ($webapp_version); ?>";
        var brow = "<?= ($browser_); ?>";
        var directComponettoLoad = "<?= ($directComponettoLoad); ?>";
        var utm_provider_string = "<?= ($utm_provider_string) ?>";
        var pageStringData = "<?= $page_string ?>";
        if (utm_provider_string != "") {
            var utm_url_string = "<?= ($page_string) ?>";
        } else {
            var utm_url_string = "";
        }
        var appType = "PLWEB";
        var appVersion = "";
        try {
            let deviceInfo = JSON.parse(AndroidNativeHandler.getDeviceData());
            appType = deviceInfo.appType;
            appVersion = deviceInfo.appVersion;
            if (appType != undefined && appType != null && appType != "" && appType.toUpperCase() == "BOOKMYRAJSHREEAPP")
                appType = "APPPL";
        } catch (error) {
            appType = "PLWEB";
            appVersion = "";
            console.log(error);
        }
    </script>

    <?php unset($data_Arr["callbackcomponent"]); ?>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#2bcbba" />
    <meta name="google-signin-client_id"
        content="524465893214-hsgngnuc9ncju16plrpi2c2a14ijkdu6.apps.googleusercontent.com">
    <link rel="manifest" href="/mobile/manifest.json">
    <script src="https://accounts.google.com/gsi/client" async></script>

    <link rel="icon" type="image/png" href="app.static/img/rajicon.png">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!--<link rel="manifest" href="manifest.webmanifest?<?php echo $webapp_version; ?>">-->
    <link rel="stylesheet" type="text/css" media="screen" href="app.static/css/core.css?<?php echo $webapp_version; ?>">
    <link rel="stylesheet" href="app.static/bootstrap/css/bootstrap.css">
    <script src="app.static/js/jquery.min.js"></script>
    <link rel="stylesheet" href="app.static/css/template/main.css">
    <!-- <link rel="stylesheet" href="app.static/css/template/linearicons.css">
    <link rel="stylesheet" href="app.static/css/template/owl.carousel.css">
    <link rel="stylesheet" href="app.static/css/template/font-awesome.min.css">
    <link rel="stylesheet" href="app.static/css/template/themify-icons.css">
    <link rel="stylesheet" href="app.static/css/template/nice-select.css">
    <link rel="stylesheet" href="app.static/css/template/nouislider.min.css">
    <link rel="stylesheet" href="app.static/css/template/bootstrap.css">
    <link rel="stylesheet" href="app.static/css/template/main.css"> -->
    <link rel="stylesheet" href="app.static/bootstrap/datepicker/css/datepicker.css">
    <script src="app.static/bootstrap/datepicker/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- <script src="app.static/js/template/nouislider.min.js"></script> -->
    <!-- <script src="app.static/js/template/jquery.magnific-popup.min.js"></script>
<script src="app.static/js/template/gmaps.min.js"></script>
<script src="app.static/js/template/tempmain.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"></script>
    <script src="app.static/bootstrap/js/bootstrap.min.js"></script>
    <script src='https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js'></script>
    <script src='https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js'></script>
    <script src="app.static/js/index.js?<?php echo $webapp_version; ?>"></script>
    <link rel="stylesheet" href="app.static/css/swal-animate.css">
    <script src="app.static/js/KeyPressHandler.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/RegularExpHandler.js?<?php echo $webapp_version; ?>"></script>
    <link rel="stylesheet" href="app.static/css/index.css?<?php echo $webapp_version; ?>">
    <link rel="stylesheet" href="app.static/css/checkBox_custom.css?<?php echo $webapp_version; ?>">
    <script src="app.static/js/core.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/howtoplay.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/notification.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/mousetrap.min.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/analytics.js?<?php echo $webapp_version; ?>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js"></script>
    <link rel="stylesheet" href="app.static/css/menubar.css">
    <link rel="stylesheet" href="app.static/css/owl.carousel.css">
    <link rel="stylesheet" href="app.static/css/lotteryCard.css?<?php echo $webapp_version; ?>">
    <link rel="stylesheet" href="app.static/css/timer.css?<?php echo $webapp_version; ?>">
    <link rel="stylesheet" href="app.static/css/winner_cart.css?<?php echo $webapp_version; ?>">
    <script src="app.static/js/lotteryCard.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/Timer.js?<?php echo $webapp_version; ?>"></script>
    <script src='app.static/js/owl.carousel.min.js'></script>
    <script src="app.static/js/winner_cart.js?<?php echo $webapp_version; ?>"></script>
    <script src="app.static/js/swal.min.js"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq)
                return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq)
                f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '218422959606752');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=218422959606752&ev=PageView&noscript=1" /></noscript>
    <!-- End Facebook Pixel Code  background-color: #F1F3F7;-->

</head>

<body style="padding-right:0px !important" ondragstart="return false;" ondrop="return false;"
    style="overflow-x:hidden;">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-588SQR8" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="container-fluid" style="padding: 0px;">
        <!--<div class="switch-sticky-button" id="openModal" onclick="openModal()">
            <label><strong><b>Try Old Look</b></strong></label>
        </div>
        <div id="switch-modal" class="switch-modal">
            <div id="switch-modal-div" class="switch-modal-content switch-try-modal-gradient">
                <span  id="closeModal" class="switch-close" onclick="closedModel()">&times;</span>
                <h2><b>Try Old Look</b></h2>
                <p><b>Move To Current View</b></p>
                <button id="tryNow" class="switch-try-button" onclick="tryNow()"><b>Try Now</b></button>
            </div>
        </div>-->

        <nav class="navbar navbar-expand-lg navbar-light bg-light"
            style="position: sticky; top: 0px; z-index: 2;background-color:white!important;">
            <a class="navbar-brand text-center ml-5" href="index.php" id="rajshree-logo"><img
                    src="./app.static/img/images/rajshreelogo.png?v1" style="height: 55px;" alt=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#" id="menu-item-home" onclick="captureClicks('1', '', '');"><img
                                src="app.static/img/header/home.png" alt="" id="menu-icons"><span>Home</span> <span
                                class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="menu-item-lottery" onclick="captureClicks('2', '', '');"><img
                                src="app.static/img/header/voucher.png" alt=""
                                id="menu-icons"><span>Lotteries</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="menu-item-result" onclick="captureClicks('3', '', '');"><img
                                src="app.static/img/header/result.png" alt="" id="menu-icons"><span>Results</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="menu-item-winners" onclick="captureClicks('4', '', '');"><img
                                src="app.static/img/header/trophy.png" alt="" id="menu-icons"><span>Winners</span></a>
                    </li>
                    <li class="nav-item" id='menu-item-login-div' style=" display: contents;">
                        <a class="nav-link font-weight-light" style=" cursor:pointer;" id='menu-item-login login'>
                            <span id='menu-item-signin' href="#" data-toggle="modal" style="font-weight: bold"
                                data-target="#sign-in" onclick="$('#result-panel').hide();
                                          captureClicks('5', '', '');">Log In<span
                                    class="sr-only">(current)</span></span>
                        </a>
                        <span class="nav-link font-weight-light"
                            style='color:black; padding-left: 0px; padding-right: 0px;font-weight: bold;font-size: 18px;'><b>/</b></span>
                        <a class="nav-link font-weight-light" style=" cursor:pointer;margin-right: -51px;"
                            id='menu-item-login'>
                            <span id='menu-item-signup' style="font-weight: bold;font-size: 18px;" href="#"
                                data-toggle="modal" data-target="#signup" onclick="$('#result-panel').hide();
                                          captureClicks('5', '', '');">Register <span
                                    class="sr-only">(current)</span></span>
                        </a>
                    </li>
                    <li class="nav-item" id="my_profileimg_div">
                        <a data-toggle="dropdown" id="my_profileimg">
                            <span><img class="photo hemburger_photo" src="app.static/img/images/myprofile.png" alt=""
                                    style="width:43px;height: 43px;border-radius: 50%;" id="menu-icons" /></span>
                            <span id="loginName" style="font-weight: bold;font-size: 17px; vertical-align: middle;">
                                Name Surname</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-weight-light" id="menu-item-wallet" href="#"
                            onclick="captureClicks('7', '', '');" style='text-decoration: unset !important;'>
                            <nobr><img src="app.static/img/header/wallet-filled-money-tool.png" alt="" id="menu-icons">
                                <span id="rupees"></span>
                            </nobr>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-weight-light" id="menu-item-cart" href="#"
                            onclick="captureClicks('7', '', '');" style='text-decoration: unset !important;'>
                            <div class="badge" id="notification-batch"
                                style="background: #373f4f;color: white;border-radius: 50%;position: relative;left: 30px;bottom: 12px;z-index: 6;min-width: 20px;font-size: 12px;padding: 4px 3px;">
                                +
                            </div>
                            <img src="app.static/img/header/grocery-store.png" alt="" id="menu-icons"><span
                                style="font-weight: bold;position:relative!important;margin-left:0px!important;;font-size: 17px;"
                                id="menu-icons">
                                Cart </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div id='body' style="overflow-x: hidden;"></div>


        <div style="height: 100vh;width: 100vw; top: 0px;left: 0px;position: absolute;background: rgba(000,000,000,0.5);z-index: 2; display:none;"
            id="loaderdiv">
            <center>
                <img src="app.static/img/rajicon.png" style='margin-top: 11%; width: 15%;'><br>
                <img src="app.static/img/rl-loader.gif" style='width: 7%;'><br>
                <label style="font-size: 18px;color: #FFFFFF"><b>Please Wait...</b></label>
            </center>
        </div>
        <div id="ifUserOnChrome"
            style="display: none;z-index:5000;border:5px solid gainsboro;width: 100%;height:100%;font-size: 14px;position: fixed;top: 0px;overflow: auto;background-color: wheat;">
            <h4>Location Access Denied!!</h4>
            <b>
                <ul id="ifUserOnChromeShortcut" style="list-style-type:square;word-break: normal;">
                    <li>Open Chrome Browser</li>
                    <hr>
                    <li>Goto : <span style="font-size:10px;">https://stage.bookmyrajshree.com/mobile/</span>
                        <button onclick="window.open('https://stage.bookmyrajshree.com/mobile/');">Open Now</button>
                    </li>
                    <hr>
                </ul>
                <ol style="word-break: normal;">
                    <li>Click on the green lock icon on the top left of the address bar
                        <img src="app.static/img/chrome/1.png?v1" alt="settings" style="width:80%;">
                    </li>
                    <hr>
                    <hr>
                    <li>Click on "location access"
                        <img src="app.static/img/chrome/2.png?v1" alt="settings" style="width:80%;">
                    </li>
                    <li>Set Location Permission to "ALLOW" and try again
                        <img src="app.static/img/chrome/3.png?v1" alt="settings" style="width:80%;">
                    </li>

                    <hr>
                </ol>
            </b>
        </div>

        <div id="ifUserOnSafari"
            style="display: none;z-index:5000;border:5px solid gainsboro;width: 100%;height:100%;font-size: 14px;position: fixed;top: 0px;overflow: auto;background-color: wheat;">
            <h4>Location Access Denied!!</h4>
            <b>
                <ol style="word-break: normal;">
                    <li>Goto "Settings" from app menu</li>
                    <li>Click on "Privacy" in settings
                        <img src="app.static/img/safari/1.png" alt="settings" style="width:80%;">
                    </li>
                    <li>Click on "location services"
                        <img src="app.static/img/safari/2.png" alt="settings" style="width:80%;">
                    </li>
                    <li>Click on "safari websites"
                        <img src="app.static/img/safari/3.png" alt="settings" style="width:80%;">
                    </li>
                    <li>Click on "while using the app"
                        <img src="app.static/img/safari/4.png" alt="settings" style="width:80%;">
                    </li>
                    <li>try again</li>
                </ol>
            </b>
        </div>
        <footer class="footer_black">
            <div class="container m-auto">
                <div class="row marg_left_top">
                    <div class="col-3">
                        <h3 class="font-weight-bold">Know us</h3>
                        <ul class="list-unstyled">
                            <li class="" id="footer-item-aboutus">About</li>
                            <li class="" id="footer-item-term_of_use">Terms of use</li>
                            <li class="" id="footer-item-privacy_policy">Privacy Policy</li>
                        </ul>
                        <div>
                            <img style="width:100%; margin-top:55px" src="app.static/img/images/GLO_18Plus.png">
                        </div>
                    </div>
                    <div class="col-3">
                        <h3 class="font-weight-bold">Govt. Policy</h3>
                        <ul class="list-unstyled">
                            <li class=""><a href="app.static/docs/lotteries_act_1998.pdf" download>Lotteries
                                    (Regulation) ACT, 1998</a></li>
                            <li class=""><a href="app.static/docs/lotteries_rules_2010.pdf" download>The Lotteries
                                    (Regulation) Rules, 2010</a></li>
                            <li class=""><a href="app.static/docs/MIZORAM Claim Form & Affidavit.pdf"
                                    download="">Mizoram Claim Form</a></li>
                            <li class=""><a href="app.static/docs/Goa Claim Form.pdf" download="">Goa Claim Form</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-3">
                        <h3 class="font-weight-bold">Help</h3>
                        <ul class="list-unstyled">
                            <li class="" id="footer-item-faq">FAQs</li>
                            <li class="" id="footer-item-contactus">Contact us</li>
                        </ul>
                    </div>
                    <div class="col-3">
                        <h3 class="font-weight-bold">Social Platforms</h3>
                        <ul class="list-unstyled">
                            <li class=""><a target="_blank" href="https://www.facebook.com/Rajshreelottery"
                                    onclick="captureClicks('12', '', '');">Facebook</a></li>
                            <li class=""><a target="_blank" href="https://t.me/rajshreelottery">Telegram</a></li>
                            <li class=""><a target="_blank"
                                    href="https://www.instagram.com/rajshreelottery">Instagram</a></li>
                            <li class=""><a target="_blank" href="https://twitter.com/rajshreelottery"
                                    onclick="captureClicks('13', '', '');">Twitter</a></li>
                            <li class=""><a target="_blank"
                                    href="https://api.whatsapp.com/send?phone=919137773732&text=I%20want%20to%20buy%20lottery"
                                    onclick="captureClicks('14', '', '');">Whatsapp</a></li>
                            <li class=""><a target="_blank" href="https://www.youtube.com/@RajshreeLottery"
                                    onclick="captureClicks('14', '', '');">YouTube (Goa)</a></li>
                            <li class=""><a target="_blank" href="https://www.youtube.com/@RajshreeLotteryMizoram"
                                    onclick="captureClicks('14', '', '');">YouTube (Mizoram)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <p class="text-center"> Copyright 2024 @ All Rights Reserved. </p>
        </footer>
        <div class="modal fade" id="howtoplay" tabindex="-1" role="dialog" aria-labelledby="howtoPlayLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content"
                    style="background-color: #fff;width: 200%;line-height: 18px;font-size: 13px;left: -55%; padding-bottom: 20px;">
                    <div class="modal-header" style="padding: 0px 10px 0px 0px; margin: 0px;">
                        <div id="logoHeader" style="width: 100%;">
                        </div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="howtoplaydata" style="padding:0px 15px; text-align: center;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<link rel="stylesheet" href="app.static/css/introjs-rtl.css">
<script type="text/javascript">
    var landing_page = "component_home";
    var ticketsold = "<?= ($ticketsold); ?>";
    if (ticketsold != '') {
        var message = "<?= ($message); ?>";
        if (ticketsold == 'true') {
            var directAddmoney = "<?= ($directaddmoney); ?>";
            console.log(directAddmoney);
            successErrorAlert("success", "", message);
            console.log(directAddmoney);
            if (directAddmoney == "false") {
                var paramdata = {
                    "totalamount": "<?= ($totalsalemrp); ?>",
                    "actionevent": "cart",
                    "direct_sale": "true"
                };
                console.log(paramdata);
                delete_cookie('totalSaleMRP');
                directAddMoney = false;
                setTimeout(() => {
                    $(".swal2-close").click();
                    //                    $("#n, #overlay, #navbarNav, .footer").hide();
                    $("#overlay, #navbarNav, .footer").hide();
                    //                    loadComponent("addmoney", 'REQ002', '', paramdata);
                    loadComponent("cart", 'REQ002', '', paramdata);
                }, 500);
            } else {
                directAddMoney = true;
            }
        } else {
            delete_cookie('totalSaleMRP');
            directAddMoney = true;
            successErrorAlert("error", "", message);
        }
    }

    if (appType.toUpperCase() == 'APPPL') {
        $("#mydownload-app").hide();
    }

    var urlLotcode = "<?= $urlLotcode ?>";
    var urlDrawdate = "<?= $urlDrawdate ?>";
    console.log(urlLotcode + "---" + urlDrawdate);
    if (urlLotcode != "" && urlDrawdate != "") {
        setTimeout(() => {
            getLotteryData(urlLotcode, urlDrawdate);
        }, 2000);
    }
    var objParamData = "";
    objParamData = <?php echo json_encode($deepLinkObjArray) ?>;
    console.log(objParamData);
    if (objParamData != null && objParamData != undefined && objParamData != "" && objParamData.hasOwnProperty("data")) {
        if (objParamData["data"].hasOwnProperty("id") && objParamData["data"].hasOwnProperty("lotcode") &&
            objParamData["data"].hasOwnProperty("drawdate") && objParamData["data"]["id"] != "" && objParamData["data"][
            "lotcode"
            ] != "" && objParamData["data"]["drawdate"] != "") {
            var objParam = {};
            objParam['actionevent'] = objParamData;
            setTimeout(() => {
                loadComponent("add-to-cart", 'REQ002', '', objParam);
            }, 500);
        }
    }
    var pageVisit = "<?= $page ?>";
    let user1 = getuserdata();
    if (pageVisit == 'aboutus' || pageVisit == 'about-us') {
        setTimeout(() => {
            loadComponent("aboutus", "REQ002")
        }, 2000);
    } else if (pageVisit == 'contactus' || pageVisit == 'contact-us') {
        setTimeout(() => {
            loadComponent("contactus", "REQ002")
        }, 2000);
    } else if (pageVisit == 'result' || pageVisit == 'rajshree-lottery-result') {
        setTimeout(() => {
            loadComponent("result", "REQ002")
        }, 2000);
    } else if (pageVisit == 'winner' || pageVisit == 'rajshree-lottery-winners') {
        setTimeout(() => {
            loadComponent("winner", "REQ002")
        }, 2000);
    } else if (pageVisit == 'faq') {
        setTimeout(() => {
            loadComponent("faq", "REQ002")
        }, 2000);
    } else if (pageVisit == 'lottery') {
        setTimeout(() => {
            loadComponent("lottery", "REQ002")
        }, 1000);
    } else if (pageVisit == 'account' || pageVisit == 'bankdetails' || pageVisit == 'address' || pageVisit == 'address') {
        if (!user1 || user1 == null) {
            setTimeout(() => {
                loadComponent("login", "REQ002");
            }, 1000);
        } else {
            setTimeout(() => {
                loadComponent("account", "REQ002");
            }, 1000);
        }
    } else if (pageVisit == 'wallet') {
        if (!user1 || user1 == null) {
            setTimeout(() => {
                loadComponent("login", "REQ002");

            }, 1000);
        } else {
            setTimeout(() => {
                let param = {
                    accessFrom: "wallet"
                };
                loadComponent("account", "REQ002", "", param);
            }, 1000);
        }
    } else if (pageVisit == 'myorders') {
        if (!user1 || user1 == null) {
            setTimeout(() => {
                loadComponent("login", "REQ002");

            }, 1000);
        } else {
            setTimeout(() => {
                let param = {
                    "actionevent": {
                        "actionevent": "myorder"
                    },
                    "accessFrom": "account"
                };
                loadComponent("account", "REQ002", "", param);
            }, 1000);
        }
    } else if (pageVisit == 'cart') {
        if (!user1 || user1 == null) {
            setTimeout(() => {
                loadComponent("login", "REQ002");

            }, 1000);
        } else {
            setTimeout(() => {
                loadComponent("cart", "REQ002");
            }, 1000);
        }
    } else if (pageVisit == 'old-wallet' || pageVisit == 'oldwallet') {
        if (!user1 || user1 == null) {
            setTimeout(() => {
                loadComponent("login", "REQ002");

            }, 1000);
        } else {
            setTimeout(() => {
                let param = {
                    "actionevent": {
                        "actionevent": "oldwallet"
                    },
                    "accessFrom": "account"
                };
                loadComponent("account", "REQ002", '', param);
                // document.getElementById('old-mywallet-head').style.color = 'white';

            }, 2000);
        }
    }else if (pageVisit == 'helpandsupport') {
        if (!user1 || user1 == null) {
            setTimeout(() => {
                loadComponent("login", "REQ002");

            }, 1000);
        } else {
            setTimeout(() => {
                let param = {
                    accessFrom: "helpandsupport"
                };
                loadComponent("account", "REQ002", '', param);
            }, 2000);
        }
    }
</script>

</html>
