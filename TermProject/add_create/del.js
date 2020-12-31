//window로드시 작품을 보여주는 함수 작동
window.onload = function() {
    showMyPice();
}

//html 화면에 로그인한 계정의 작품들을 일괄적으로 보여주도록 하는 함수
function showMyPice() {
    //php에 로그인한 아이디를 전달해주기위해 data를 세션스토리지에 있는 아이디값을 가져와 생성
    var data = {id:sessionStorage.getItem("id")};
    $.ajax({
        type: "POST",
        url : "../info/show.php?mode=POST",
        data : data,
        dataType:"json",
        success : function(data) {
            //제대로 id.json파일을 가져왓다면 html에 전시회를 출력하는 함수를 실행
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
        "<img class='showImg' height='200' width='200' src='"+pices[0].split("|")[0]+"'>"+
        '<br><input type="radio" class="test" value="'+data[i]["name"]+'"></input>'+
        "</div>";
        //특정 div에 이미지를 삽입
        $("#allEx").append(str);
    }
}

//선택된 전시회radio버튼을 확인하여 삭제함수를 실행
$("#del").click(function() {
    $('.test:checked').each(function(){
        delArt($(this).val());
    });
})

//선택되지 않는 radio버튼을 찾아 전부 체크하는 전체선택함수
$("#selectAll").click(function() {
    $('.test:not(:checked)').each(function(){
        $(this).attr("checked",true);
    });
})

//아이디와 작품이름을 전달하여 id.json과 전체작품.json에서 전달한 작품을 제거하는 함수
function delArt(name) {
    var data = {name:name,id:sessionStorage.getItem("id")};
    $.ajax({
        type: "POST",
        url : "delArt.php?mode=POST",
        data : data,
        dataType:"text",
        success : function(data) {
            alert(data);
            //화면을 다시 접속하여 삭제된 작품을 반영한다.
            location.href="del_exhibition.html";
        },
        error : function()  {
            alert("등록된 전시회가 없습니다.");
        }
    });
    
}