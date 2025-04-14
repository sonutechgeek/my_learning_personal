<?php

require_once "../config.php";

$app_root = dirname(__FILE__);
define('APP_SYSROOT', $app_root);
define('APP_VIEWROOT', $app_root . '/');

ini_set('display_errors', 1);
set_time_limit(0);
set_error_handler("myErrorHandler");
register_shutdown_function('ShutDown');

$dir_struct = "";
$fetched_data = "";
$dir_struct = "";
$fetched_data = Config::fetchRequest();

if (isset($fetched_data['actioncomponent'])) {
    $dir_struct = trim($fetched_data['componentname']);
    $obj = new Routes($dir_struct, $fetched_data);
    if ($dir_struct == "payment") {
        /* if (!array_key_exists("locationstate", $fetched_data)) {
          $fetched_data["actioncomponent"] = "REQ002";
          $fetched_data['componentname'] = "locationerror";
          } else {
          $getLocation = checkLocation($fetched_data);
          if (array_key_exists("status", $getLocation) && $getLocation["status"] == "error") {
          $fetched_data["actioncomponent"] = "REQ002";
          $fetched_data['componentname'] = "locationerror";
          }
          } */
    }
    if ($fetched_data['actioncomponent'] == 'REQ001') {
        $response_data = $obj->apifetchData($fetched_data);
    } else if ($fetched_data['actioncomponent'] == 'REQ002') {
        $response_data = $obj->apifetchComponent($fetched_data);
    } else if ($fetched_data['actioncomponent'] == 'REQ003') {
        $response_data = $obj->apifetchComponentWithData($fetched_data);
    } else {
        exit("Invalid actioncomponent");
    }

    if (array_key_exists('action', $fetched_data) && $fetched_data['action'] == 'LOGIN') {
        if ((array_key_exists('status', $response_data) && $response_data['status'] != 'error') || !array_key_exists('status', $response_data))
            $obj->createSession($fetched_data, $response_data);
    } else if (array_key_exists('action', $fetched_data) && $fetched_data['action'] == 'GET_SALT') {
        
    } else if ($fetched_data['componentname'] == 'login') {
        
    } else {
        $response_data['logout'] = $obj->sessionValidate($fetched_data);
    }
} else {
    exit("error");
}

class Routes {

    private $fetched_data;
    private $authToken;
    private $dir_struct;

    public function __construct($dir_struct, $fetched_data) {
        $this->fetched_data = $fetched_data;
        $this->dir_struct = $dir_struct;
        $this->authToken = "";
    }

    public function sessionValidate($request_param) {
        return false;
        session_name("WEBRPOS");
        session_start();
        // print_r($_SESSION);
        if (!isset($_SESSION['logintype']) || !isset($_SESSION['storesid']) || !isset($_SESSION['storedtime']) || !isset($_SESSION['loginname']) || $_SERVER['REQUEST_METHOD'] != "POST") {
            session_destroy();
            return true;
        }
        if (isset($_SESSION["AuthToken"])) {
            if (!isset($request_param["AuthToken"]) || $request_param["AuthToken"] != $_SESSION["AuthToken"]) {
                //                session_destroy();
                //              return true;
            }
        }
        $param = array("sessionid" => $_SESSION['storesid'], "loginname" => $_SESSION['loginname']);
        $action = "VALIDATE_SESSION";
        $request_sess_param['action'] = $action;
        $request_sess_param['sessionid'] = $_SESSION['storesid'];
        $request_sess_param['loginname'] = $_SESSION['loginname'];
        $api_responce = Config::fetchResponse("LOGIN", $request_sess_param);
        $apiData = json_decode($api_responce, true);
        if (strtoupper($apiData['status']) == "SUCCESS") {
            if ($_SESSION['sessionid'] == md5(session_id())) {
                session_regenerate_id();
                $_SESSION['storesid'] = md5(session_id());
                $_SESSION['active_time'] = date("H:i:s");
                $_SESSION['time'] = date("H:i:s");
            }
        } else {
            session_destroy();
            return true;
        }
        return false;
    }

    public function createSession($request_param, $response_param) {
        session_name("WEBRPOS");
        session_start();
        $_SESSION['storesid'] = $response_param['data']['SESSIONID'];
        $_SESSION['loginname'] = $request_param['loginname'];
        $_SESSION['sessionid'] = $response_param['data']['SESSIONID'];
        $_SESSION['storedtime'] = date("Y-m-d H:i:s");
        $_SESSION['logintype'] = "RETAILER";
        $_SESSION["AuthToken"] = $request_param['AuthToken'];
    }

    public function apifetchComponentWithData($request_param) {
        if (isset($this->fetched_data['actionevent']) && isset($this->fetched_data['actiontype'])) {

            $action = strtoupper($request_param['actionevent']);
            $action_type = strtoupper($request_param['actiontype']);

            $api_responce = Config::fetchResponse($action, $request_param, $action_type);
            list($strfooter, $strbody) = $this->fetchComponentFileContent($api_responce, $request_param['componentname'], true);
            return (array('status' => 'SUCCESS', 'body' => $strbody, 'footer' => ""));
        }
    }

    public function apifetchData($request_param) {
        if (isset($this->fetched_data['actionevent']) && isset($this->fetched_data['actiontype'])) {
            $action = strtoupper($request_param['actionevent']);
            $action_type = strtoupper($request_param['actiontype']);
            if ($action == 'PROMOIMG') {
                return $this->promoimg();
            } else if ($action == 'NOTIFICATIONKEY') {
                return $this->notificationkey();
            } else {
                $api_responce = Config::fetchResponse($action, $request_param, $action_type);
                return json_decode($api_responce, true);
            }
        }
    }

    public function apifetchComponent($request_param = "") {
        list($strfooter, $strbody) = $this->fetchComponentFileContent($request_param, $request_param['componentname'], true);
        return (array('status' => 'SUCCESS', 'body' => $strbody, 'footer' => ""));
    }

    function promoimg() {
        $prom_dir = Config::PROMOIMG;
        $prom_array = scandir($prom_dir);
        $arr = array();
        unset($prom_array[0]);
        unset($prom_array[1]);
        foreach ($prom_array as $k => $v) {
            if (strtolower(substr($v, 0, 5)) == 'promo')
                $arr['data'][] = Config::PROMOIMG . $v;
        }
        if (count($arr) <= 0) {
            return ['status' => 'error', 'message' => 'no images available'];
        }
        $arr['status'] = 'success';
        return $arr;
    }

    function notificationkey() {
        $data["vapid_key"] = Config::VAPID_KEY;
        $data["server_key"] = Config::SERVER_KEY;
        $data["status"] = "success";
        return($data);
    }

    function fetchComponentFileContent($response_data, $file_name, $mode = false) {
        $check_arr = is_array($response_data) ? $response_data : json_decode($response_data, true);
        $check_arr["DATETIMESTAMP"] = date("Y-m-d H:i:s");
    
        if (array_key_exists("redirect", $this->fetched_data)) {
            $check_arr["redirect"] = $this->fetched_data["redirect"];
        }
    
        $var = $response_data ? "<script>var OBJ=" . json_encode($response_data) . ";</script>" : "";
        $dir = $mode ? '' : $this->dir_struct . '/';
        $path = APP_VIEWROOT . 'app.' ."{$dir}{$file_name}/{$file_name}.html";
        $strbody = file_get_contents($path);
    
        if (!$mode && array_key_exists('GameCode', $this->fetched_data) && $this->fetched_data['GameCode'] != '89') {
            $path = APP_VIEWROOT . "app.{$this->dir_struct}/{$this->dir_struct}.html";
            $strfooter = file_get_contents($path);
        } else {
            $strfooter = "";
        }
    
        return [$strfooter, $var . $strbody];
    }

}

function checkLocation($param) {
    if (array_key_exists("locationstate", $param)) {
        $state_name = explode(",", $param["locationstate"]);
        $long_name = strtoupper($state_name[0]);
        if (in_array($long_name, Config::LOCATION)) {
            return array("message" => "Location verified", "status" => "success");
        } else {
            return array("message" => "Location not verified", "status" => "error");
        }
    }
}

function myErrorHandler($errno, $errstr, $errfile, $errline) {
    switch ($errno) {
        case E_USER_ERROR:
            echo json_encode(array("message" => $errstr, "LineNo" => $errline, "errorno" => $errno, "File" => $errfile, "status" => "error"));
            break;

        case E_USER_WARNING:
            echo json_encode(array("message" => $errstr, "errorno" => $errno, $errstr, "status" => "error"));
            break;

        case E_USER_NOTICE: {
                echo json_encode(array("message" => $errstr, "status" => "error", "LineNo" => $errline));
                exit;
                break;
            }
        default:
            echo json_encode(array("message" => $errstr, "LineNo" => $errline, "File" => $errfile, "status" => "error"));
            exit;
    }

    return true;
}

function catchError($errno, $errstr, $errfile = '', $errline = '') {
    echo json_encode(array("message" => str_replace("/var/www/html/", '/', $errstr),
        "LineNo" => $errline, "File" => str_replace("/var/www/html/", '/', $errfile),
        "error" => $errno, "status" => "error"));
    exit();
}

function ShutDown() {
    global $response_data;
    $lasterror = error_get_last();
    if (isset($lasterror['type']) && in_array($lasterror['type'], array(E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR, E_RECOVERABLE_ERROR, E_CORE_WARNING, E_COMPILE_WARNING, E_PARSE))) {
        catchError($lasterror['type'], $lasterror['message'], $lasterror['file'], $lasterror['line']);
    }
    $sessionToken = sessionToken();
    $response_data['authToken'] = $sessionToken;
    // $response_data = Encrypt($response_data);
    echo json_encode($response_data);
}

function sessionToken() {
    $authToken = hash('sha256', (uniqid(rand(), true)));
    $_SESSION["AuthToken"] = $authToken;
    return $authToken;
}
