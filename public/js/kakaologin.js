// Kakao Login

Kakao.cleanup();
Kakao.init("cea8248c64bf22c135e642408c2fb6c2");

const loginWithKakao = (signUp) => {
    //TODO: try/catch for fail
    Kakao.Auth.loginForm({
        success: function(authObj) {
            requestUserInfo(function(id, nickname, email, thumbnailURL) {
                const form = document.querySelector("#kakaoForm");
                form.querySelector("#kakaoNickname").value = nickname;
                form.querySelector("#kakaoEmail").value = email;
                form.querySelector("#kakaoid").value = id;
                if (thumbnailURL) {
                    form.querySelector("#kakaoThumbnailURL").value = thumbnailURL;
                }
                (signUp) ? 
                    form.querySelector("#kakaoSignUp").value = true :
                    form.querySelector("#kakaoSignUp").value = false;
                //TODO: Direct to user profile page?????
                form.action = "index.php?action=kakaoLogin";
                form.submit();
            });
        },
        fail: function(err) {
            // console.log("Login Failed!!");
            // console.log(error);
        },
    });
};

const requestUserInfo = (callback) => {
    //TODO: try/catch for fail
    Kakao.API.request({
        url: '/v2/user/me',
        success: function(response) {
            const id = response.id;
            const nickname = response.properties.nickname;
            const email = response.kakao_account.email;
            const thumbnailURL = response.properties.thumbnail_image;
            callback(id, nickname, email, thumbnailURL);
        },
        fail: function(error) {
            // console.log("[requestUserInfo]");
            // console.log(error);
        }
    });
};

function logoutWithKakao (){
    //Franco
    if (Kakao){
        if (!Kakao.Auth.getAccessToken()) {
            // console.log("[logoutWithKakao]");
            // alert("Not logged in");
            return;
        }
        Kakao.Auth.logout(() => {
            // console.log("[logoutWithKakao]");
            // console.log('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken());
        });
    } //Franco
}

// For deleting account of Poodle
const disconnectWithKakao = () => {
    Kakao.API.request({
        url: "/v1/user/unlink",
        success: function(response) {
            // console.log("[disconnectWithKakao]");
            // console.log(response);
        },
        fail: function(error) {
            // console.log("[disconnectWithKakao][Error]");
            // console.log(error);
        }
    });
};

// const kakaoSignUpBtn = document.querySelector("#kakaoSignUp");
// if (kakaoSignUpBtn) {
//     kakaoSignUpBtn.addEventListener("click", () => loginWithKakao(true));
// }

// const kakaoLoginBtn = document.querySelector("#kakaoLogin");
// if (kakaoLoginBtn) {
//     alert('Login');
//     kakaoLoginBtn.addEventListener("click", () => loginWithKakao(false));
// }

const kakaoLogoutBtn = document.querySelector("#kakaoLogout");
if (kakaoLogoutBtn) {
    kakaoLogoutBtn.addEventListener("click", logoutWithKakao);
}

//TODO: Disconnect button for deleting account
// const kakaoDisconnectBtn = document.querySelector("#kakaoDisconnect");
// if (kakaoDisconnectBtn) {
//     kakaoDisconnectBtn.addEventListener("click", disconnectWithKakao);
// }


