//window시작시 세션에 저장되어있는 작가 혹은 일반인 여부를 확인하여 작가전용기능을 표기할지 정하는 함수
window.onload = function() {
    if(sessionStorage.getItem("job") == "author") {
        showMyPice();
    } else {
        showInfo();
    }
}
//탈퇴 확인 레이어 close 함수
function signout_cancle() {
    var pop = document.getElementById("signout_window");
    pop.style.display = "none";
}

//만약 로그인한 회원이 작가일 경우 전시회 생성,삭제 및 작품을 보여줄 div 추가함수
if(sessionStorage.getItem("job") == "author") {
    showInfo();
    $("#author_window").append('<button class="btn btn-outline-success"id="create">전시회 생성</button> ');
    $("#author_window").append('<button class="btn btn-outline-primary" id="delete">전시회 삭제</button><br>')
    $("#author_window").append('<div id="pice" class="row text-center"></div>');
}

//생성버튼 클릭시 생성페이지로 이동하는 함수
$("#create").click(function() {
    location.href="../add_create/add_exhibition.html";
})
//삭제버튼 클릭시 삭제페이지로 이동하는 함수
$("#delete").click(function() {
    location.href="../add_create/del_exhibition.html";
})

//정보를 화면에 출력해주는 함수이다.
function showInfo() {
    var info = {id:sessionStorage.getItem("id")};
    $.ajax({
        type: "POST",
        url : "./info.php?mode=POST",
        data: info,
        dataType:"text",
        success : function(data) {
            var set = data.split("/");
            $("#info_id").text(set[0]);
            $("#classification").text("class : "+set[1]);
            $("#info_email").text(set[2]);
        }
    });
}

//탈퇴버튼 클릭시 탈퇴 팝업을 나타내는 함수
function signout_window() {
    var pop = document.getElementById("signout_window");
    pop.style.display = "block";
    pop.style.top= "100px";
    pop.style.left = "100px";
}

//id에 맞는 전시회를 찾아서 화면에 출력하도록 하는 함수
function showMyPice() {
    var data = {id:sessionStorage.getItem("id")};
    $.ajax({
        type: "POST",
        url : "./show.php?mode=POST",
        data : data,
        dataType:"json",
        success : function(data) {
            addPice(data);

        },
        error : function()  {
            alert("등록된 전시회가 없습니다.");
        }
    });
    
}

//가져온 data를 전시회 name으로 분류하여 저장되어있는 이미지 주소를 통해 전시회를 화면에 나타낸다.
function addPice(data) {
    for(var i=0;i<data.length;i++) {
        var pices = data[i]["exhibition"];
        //전시회를 누르면 전시회페이지로 이동할 수 있도록 작성한다.
        var str = "<div class='test'>"+
        sessionStorage.getItem("id")+" "+"전시회 : "+data[i]["name"]+"<br>"+
        "<img class='showImg' height='200' width='200' src='"+pices[0].split("|")[0]+"' onclick='moveExhibition("+'"'+data[i]["name"]+"|"+sessionStorage.getItem("id")+'"'+")'>"+
        "</div>";
        $("#pice").append(str);

    }
}

//전시회페이지로 이동하는 함수
function moveExhibition(data) {
    location.href="../exhibition/exhibition.html?id='"+data+"'";
}

//작가 개인정보 추가 페이지로 이동하는 함수
$("#addInfo").click(function() {
    location.href="./addInfo.html";
})

//탈퇴시 계정을 학제하는 함수
$("#del").click(function() {
    var data = {id:sessionStorage.getItem("id")};
    $.ajax({
        type: "POST",
        url : "./delete.php?mode=POST",
        data : data,
        dataType:"text",
        success : function(data) {
            alert(data);
            sessionStorage.clear();
            location.href="../main.html";

        }
    });
})