function login() {//로그인 함수
    var setdata = {id:$("#id").val(),pw:$("#pw").val()};
    $.ajax({
        type: "POST",
        url : "./login.php?mode=POST",
        data: setdata,
        dataType:"text",
        success : function(data) {
            if(data == "0") {
                alert("입력하신 계정이 존재하지 않습니다.");
            }
            else {
                //계정이 존재하면 로그인시킨다.
                sessionStorage.setItem("id",$("#id").val());
                sessionStorage.setItem("job",data);
                location.replace("../main.html");
            }
        }
    });
}