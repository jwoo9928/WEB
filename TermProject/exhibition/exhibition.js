//window 시작시 url로 넘어온 id,name값을 사용할 수 있도록 변환하는 함수
window.onload = function() {
    var temp = location.href.split("?");
    data = temp[1].split("=")[1].split("%27")[1];
    showMyPice(data.split("|"));
    //작가 페이지버튼을 누르면 그 작가의 개인정보 페이지로 넘어가는 함수
    $("#author").click(function() {
        location.href="../author/author.html?id="+data.split("|")[1];
    });
}

//전시회 슬라이드의 첫 시작 index
var slideIndex = 1;
showSlides(slideIndex);

//이 함수를 통해 슬라이드 이동을 조작
function plusSlides(n) {
  showSlides(slideIndex += n);
}

//현재 슬라이드 출력
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showMyPice(id) {
    var data = {id:id[1]};
    $.ajax({
        type: "POST",
        url : "./exhibition.php?mode=POST",
        data:data,
        dataType:"json",
        success : function(data) {
            addPice(data,id[0]);
        },
        error : function()  {
            alert("등록된 전시회가 없습니다.");
        }
    });
}

//전시회 json에 전시회이미지가 저장되어있다. 이를 array에서 하나씩 꺼내 html에 삽입하는 함수
//제목과 설명도 같이 출력하도록 한다.
function addPice(data,name) {
    for(var i=data.length-1;i>=0 && i>=data.length-5;i--) {
        if(JSON.stringify(data[i]["name"])=== ('"'+name+'"')) {
            var images = data[i]["exhibition"];
            for(var j=0;j<images.length;j++) {
                //슬라이드로 이용할 수 있도록 설정해주는 작업 및 제목, 설명 추가하는 작업
                var str = '<div class="mySlides fade" >'+
                '<img src="'+images[j].split("|")[0]+'" style="width:90%">'+
                '<br><br><p id="test11">'+'제목 : '+images[j].split("|")[1]+'</p>'+
                '<br><br><p id="test11">'+'작품 설명</p><br>'+images[j].split("|")[2]+
                '</div>';
                $("#art").append(str);
            }
        }
    }
}

//슬라이드를 조절하고 화면에 알맞게 슬라이드를 출력해주는 함수
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  //만약 인덱스가 주어진것보다 커지면 다시 처음 페이지로 이동
  if (n > slides.length) {slideIndex = 1}
  //만약 인덱스가 음수가 되면 처음 이미지로 돌아간다.
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      //현재 인덱스가 아닌 슬라이드는 전부 보이지 않게 해준다.
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      //보여줄 페이지는 보이도록 한다
      dots[i].className = dots[i].className.replace(" active", "");
  }
  //보여줄 페이지는 보이도록 한다
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

