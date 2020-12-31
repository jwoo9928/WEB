//main.html에만 연결된 자바스크립트이다.
//윈도우 시작시 최근에 추가된 5개의 전시회를 출력하고 
//메뉴버튼을 누를경우 모든 작품글자를 띄우고 모든작품을 볼 수 있는 페이지로 넘어가는
//주소를 연결하는 함수
//또한 메인화면의 광고 페이지를 3초마다 다음으로 넘어가도록 하는 함수
window.onload = function() {
    //윈도우 시작시 최근에 추가된 5개의 전시회를 출력
    showMyPice();
    //또한 메인화면의 광고 페이지를 3초마다 다음으로 넘어가도록 하는 함수
    setInterval(aoutoSlides,3000);
    $('#cc').click(function() {
        $("#menu").append('<div id="showAllArt">모든 작품 보기</div>');
        var pop = document.getElementById("showAllArt");
        pop.style.display = "block";
        pop.style.top= "40px";
        pop.style.left = "1px";
        $("#showAllArt").click(function() {
            location.href = "./allArts/allArts.html";
        });
    })
}


$(window).ready(function() {//topbar 로그인 혹은 마이페이지 조정 함수
    if(!sessionStorage.getItem("id")) {
        $("#member").text("로그인");
        $("#member").click(function() {
            location.href="./login/login.html";
        });
    }
    else {
        $("#member").append("<img height='30' width='30' src='./imgs/mypage.png'>");
        $("#logout").text("logout");
        $("#member").click(function() {
            location.href="./info/info.html";
        });
    }
})
$("#logout").click(function() {
    sessionStorage.clear();
    location.replace("../main.html");
})
//전시회 슬라이드의 첫 시작 index
var slideIndex = 1;
showSlides(slideIndex);
//이 함수를 통해 슬라이드 이동을 조작
function plusSlides(n) {
  showSlides(slideIndex += n);
}
//자동으로 다음으로 넘어가도록 하기위해 형식을 맞춘 함수
function aoutoSlides() {
    showSlides(slideIndex += 1);
}
//현재 슬라이드 출력
function currentSlide(n) {
  showSlides(slideIndex = n);
}
//슬라이드를 조절하고 화면에 알맞게 슬라이드를 출력해주는 함수
function showSlides(n) { //전시회 작품 이동 함수
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
    //만약 인덱스가 주어진것보다 커지면 다시 처음 페이지로 이동
  if (n > slides.length) {slideIndex = 1}
    //만약 인덱스가 음수가 되면 처음 이미지로 돌아간다.    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      //보여줄 페이지는 보이도록 한다
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//가져온 데이터를 통해 전시회를 화면에 보여줄 수 있도록 하는 함수
function showMyPice() {
    $.ajax({
        type: "POST",
        url : "./exhibition.php?mode=POST",
        dataType:"json",
        success : function(data) {
            addPice(data);
        },
        error : function()  {
            alert("등록된 전시회가 없습니다.");
        }
    });
    
}
//전시회 json에 전시회이미지가 저장되어있다. 이를 array에서 하나씩 꺼내 html에 삽입하는 함수
//제목과 설명도 같이 출력하도록 한다.
function addPice(data) {
    for(var i=data.length-1;i>=0 && i>=data.length-5;i--) {
        var pice = JSON.stringify(data[i]["exhibition"]);
        var pices = data[i]["exhibition"];
        //슬라이드로 이용할 수 있도록 설정해주는 작업 및 제목, 설명 추가하는 작업
        var str = "<div class='text-center line'>"+
        data[i]["id"]+" "+"전시회 : "+data[i]["name"]+"<br>"+
        "<img class='showImg' height='200' width='200' src='"+pices[0].split("|")[0]+"' onclick='moveExhibition("+'"'+data[i]["name"]+"|"+data[i]["id"]+'"'+")'><br><br>"+
        "</div>";
        $("#newEx").append(str);
    }
}

//전시회페이지로 이동하는 함수
function moveExhibition(data) {
    location.href="./exhibition/exhibition.html?id='"+data+"'";
}


