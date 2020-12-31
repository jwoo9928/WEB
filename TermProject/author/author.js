var authorId;

//window 시작시 url로 전달받은 특정 작가의 아이디를 가져오고 그 작가의 작품과 정보를 출력하도록 하는 함수
window.onload = function() {
    var temp = location.href.split("?");
    authorId = temp[1].split("=")[1];
    //특정 작가의 경력 설명등을 html에 출력하는 함수
    showAuthor(authorId);
    //특정 작가의 작품을 출력하는 함수
    showMyPice();
}

//작가회원이 추가적으로 작성한 개인정보를 작가프로필 화면에 출력하도록 하는 함수
function showAuthor(id) {
    //아이디 기반으로 가져온다.
    var data = {id:id}
    $.ajax({
        type: "POST",
        url : "./getAuthor.php?mode=POST",
        data:data,
        dataType:"json",
        success : function(data) {
            resetAuthor(data[0]);
        }
    });
}

//ajax,php를 통해 가져온 작가의 추가 개인정보를 형식에 맞게 분류하여 화면에 출력하는 함수
function resetAuthor(data) {
    for(var i=0; i<data["career"].length;i++) {
        $("#career").append(data["career"][i]+"<br>");
    }
    $("#explain").append(data["intro"]);
    $("#name").append("본명 : "+data["name"]);
    //이아래로는 입력한 sns를 각 form에 맞게 연결한다.
    $("#twitter").click(function() {
        location.href=data["twitter"];
    })
    
    $("#facebook").click(function() {
        location.href=data["facebook"];
    })
    
    $("#instar").click(function() {
        location.href=data["instar"];
    })
}

//id에 맞는 전시회를 찾아서 화면에 출력하도록 하는 함수
function showMyPice() {
    var data = {id:authorId};
    $.ajax({
        type: "POST",
        url : "../info/show.php?mode=POST",
        data : data,
        dataType:"json",
        success : function(data) {
            addPice(data);

        }
    });
    
}

//가져온 data를 전시회 name으로 분류하여 저장되어있는 이미지 주소를 통해 전시회를 화면에 나타낸다.
function addPice(data) {
    for(var i=data.length-1;i>=0 && i>=data.length-5;i--) {
        var pice = JSON.stringify(data[i]["exhibition"]);
        var pices = data[i]["exhibition"];
        //전시회를 누르면 전시회페이지로 이동할 수 있도록 작성한다.
        var str = "<div class='test'>"+
        data[i]["id"]+" "+"전시회 : "+data[i]["name"]+"<br>"+
        "<img class='showImg' height='200' width='200' src='"+pices[0].split("|")[0]+"' onclick='moveExhibition("+'"'+data[i]["name"]+"|"+data[i]["id"]+'"'+")'>"+
        "</div>";
        $("#authorArt").append(str);
        
    }
}

function authorExhibition() {//작가의 전체작품을 볼수 있는 페이지로 이동
    location.href="./allAuthor.html?id="+authorId;
}