<!-- index.php -->

<?php
session_start();
require("./controller/controller.php");

$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : "landing";

try {
    switch ($action) {
        case "landing":
            landing();
            break;
        case "login":
            login();
            break;
        case "checkLogin":
            if (!empty($_REQUEST['emailLogin']) && !empty($_REQUEST['passwordLogin'])) {
                checkLogin($_REQUEST);
            } else {
                header("Location: index.php?action=login&error=login");
            }
            break;
        case "registration":
            registration();
            break;
        case "registrationInput":
            if (!empty($_REQUEST['username']) && !empty($_REQUEST['password']) && !empty($_REQUEST['email'])) {
                addNewMember($_REQUEST);
            } else {
                header("Location: index.php?action=registration&error=registration");
            }
            break;
        case "logout":
            logout();
            break;
        case "kakao":
            testShowKakaoLogin($action);
            break;
        case "kakaoResult":
            $kakaoNickname = isset($_REQUEST["kakaoNickname"]) ? $_REQUEST["kakaoNickname"] : NULL;
            $kakaoEmail = isset($_REQUEST["kakaoEmail"]) ? $_REQUEST["kakaoEmail"] : NULL;
            // $kakaoid = isset($_REQUEST["kakaoid"]) ? $_REQUEST["kakaoid"] : NULL;

            echo $kakaoNickname;
            echo "<br>";
            echo $kakaoEmail;
            echo "<br>";

            if ($kakaoNickname and $kakaoEmail) {
                testKakaoLogin($kakaoNickname, $kakaoEmail);
            } else {
                throw new Exception("Kakao Login is failed", 1000);
            }
            break;
        default:
            landing();
            break;
    }
} catch (Exception $e) {
    require("./view/error.php");
}
