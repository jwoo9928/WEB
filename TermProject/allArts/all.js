window.onload = function () {
    showAuthorPice();
}

//전체 전시회 json파일을 가져오고 작품출력함수로 넘기는 함수
function showAuthorPice() {
    $.ajax({
        type: "POST",
        url : "all.php?mode=POST",
        dataType:"json",
        success : function(data) {
            addPice(data);

        },
        error : function()  {
            alert("등록된 전시회가 없습니다.");
        }
    });
    
}

//html에 직접 전시회들을 출력해주는 함수
//json파일에 들어있는 여러정보를 분류하여 html에 알맞게 출력
//가져온 데이터들은 여러 이미지 주소를 가지고 있어 이를 분리하여 반복문으로 하나씩 화면에 출력해준다.
function addPice(data) {
    for(var i=0;i<data.length;i++) {
        var pices = data[i]["exhibition"];
        //이미지를 단순히 추가하지 않고 div를 통해 출력하도록 한다.
        var str = "<div class='test'>"+
        data[i]["id"]+" "+"전시회 : "+data[i]["name"]+"<br>"+
        "<img class='showImg' height='200' width='200' src='"+pices[0].split("|")[0]+"' onclick='moveExhibition("+'"'+data[i]["name"]+"|"+data[i]["id"]+'"'+")'>"+
        "</div>";
        $("#art").append(str);

    }
}