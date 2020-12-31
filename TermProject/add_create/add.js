//html에서 받은 이미지의 주소를 상대경로로 변환하여 이를 토대로 다시 html에 이미지를 출력
function img_add() {
    var image = $("#image").val().split("\\")[2];
    if($("#image").val() == "") {
        alert("파일을 선택해 주십시오");
    } else {
        $("#checking").html('<img src="../testimg/'+image+'" style="width:90%" id="img"></img>');
    }
}

//상단바의 개인정보아이콘 클릭시 개인정보html로 이동하는 함수
$("#member").click(function() {
    location.replace("../info/info.html");
});

var array = new Array();

//작품의 제목과 내용을 가져와서 입력되지 않았으면 입력하라는 메세지를,
//정상적으로 입력했다면 이를 정리하여 array에 삽입하는 함수
function next_img() {
    var title = $("#title").val();
    var content = $("#content").val();
    var image = "../testimg/"+$("#image").val().split("\\")[2];
    if(title==""||content=="") {
        alert("제목과 내용을 올바르게 적어주십이오.");
    }
    else {
        array.push(image+"|"+title+"|"+content);
        //array에 삽입 후에는 다음 작품을 입력할 수 있도록 입력 칸들을 전부 비운다.
        $("#image").val("");
        $("#checking").html("");
        $("#title").val("");
        $("#content").val("");
    }
}

//입력받은 데이터로 전시회를 생성하는 함수
function create(name) {
    //세션스토리지에 저장되어있는 id값을 이용을 한다.
    var data = {exhibition:array,id:sessionStorage.getItem("id"),name:name};
    $.ajax({
        type: "POST",
        url : "./create.php?mode=POST",
        data: data,
        dataType:"text",
        success : function(data) {
            alert(data);
        },
        error : function()  {
        }
    });
}

//지금까지 array에 저장한 작품들을 사용해서 전시회를 생성하도록 하는 함수
function createEx() {
    //입력된 작품이 없을시 오류 출력
    if(array.length <= 0) {
        alert('입력된 작품이 존재하지 않습니다.');
        exit(0);
    }
    //작품등록확인 팝업 띄우기
    var pop = document.getElementById("create");
    pop.style.display = "block";
    pop.style.left= ((window.innerWidth- 300)/2)+"px";
    pop.style.top = ((window.innerHeight - 200)/2)+"px";
    $("#cancle").click(function() {
        pop.style.display = "none";
    })
    $("#add").click(function() {
        //전시회 이름 확인
        var name = $("#name").val();
        if(name == "") {
            alert("전시회 이름을 입력해 주십시오");
        }
        else {
            //이름이 정상적으로 입력되면 creat함수를 작동시키고 팝업을 제거
            create(name);
            pop.style.display = "none";
            //info화면으로 돌아감
            location.href="../info/info.html";
        }
    })

}