//main.html을 제외한 모든 js파일에 적용되는 js파일이다.

$(window).ready(function() {//topbar 로그인 혹은 마이페이지 조정 함수
    //로그인을 안했을 경우 상단바 오른쪽에 로그인 출력
    if(!sessionStorage.getItem("id")) {
        $("#member").text("로그인");
        $("#member").click(function() {
            location.href="./login/login.html";
        });
    }
    else {//로그인했을 경우 상단바 오른쪽에 개인정보 아이콘과 로그아웃 버튼 출력
        $("#member").append("<img height='30' width='30' src='../imgs/mypage.png'>");
        $("#logout").text("logout");
        $("#member").click(function() {
            location.href="../info/info.html";
        });
    }
})

//로그아웃을 누를경우 세션을 비우고 다시 main화면으로 이동
$("#logout").click(function() {
    sessionStorage.clear();
    location.replace("../main.html");
})

function move_main() { //메인화면으로 이동하는 함수
    location.href="../main.html";
}

//메뉴버튼을 누를경우 모든 작품글자를 띄우고 모든작품을 볼 수 있는 페이지로 넘어가는
//주소를 연결하는 함수
$("#menu").children().first().click(function() {
    $("#menu").append('<div id="showAllArt">모든 작품 보기</div>');
    var pop = document.getElementById("showAllArt");
    pop.style.display = "block";
    pop.style.top= "40px";
    pop.style.left = "1px";
    $("#showAllArt").click(function() {
        location.href = "../allArts/allArts.html";
    });
})

