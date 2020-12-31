//window시작시 아이디 출력란에 세션에 저장되어있는 아이디를 가져와 출력한다.
window.onload = function() {
    $("#id").append(sessionStorage.getItem("id"));
}

//커리어를 여러개 저장할 array생성
var career = new Array;

//커리어 추가버튼클릭시 array에 저장하고 동시에 화면에 추가된 커리어를 표시해주는 함수
$("#careerAdd").click(function() {
    var c = $("#career").val();
    var date = $("#date").val();
    //형식에 맞지 않으면 에러메세지를 출력해준다.
    if(c=="" || date=="") {
        alert('날짜 혹은 구체적인 커리어가 입력되지 않았습니다. 정상적으로 입력해주십시오');
    }
    else {
        //커리어를 array에 추가
        career.push(date+" : "+c);
        $("#addC").append(date+" : "+c+"<br>");
    }

})

//화면에서 입력한 정보를 ajax를 통해서 저장하는 함수
function addInfo() {
    if($("#realName").val() == "" || $("#introduce").val() == "") {
        alert("본명과  본인소개는 필수입니다.")
    }
    else {
        //아이디 및 여러정보 특히 sns주소 정보를 전달하여 저장하도록 한다.
        var data = {id:sessionStorage.getItem("id"),name:$("#realName").val(),career:career,intro:$("#introduce").val(),
        twitter:$("#twitter").val(),facebook:$("#facebook").val(),instar:$("#instar").val()};
        $.ajax({
            type: "POST",
            url : "./addinfo.php?mode=POST",
            data : data,
            dataType:"text",
            success : function(data) {
                alert(data);
                location.href="../main.html";

            },
            error : function() {
                alert("등록된 전시회가 없습니다.");
            }
        });
    }
}