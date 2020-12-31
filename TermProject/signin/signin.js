//회원가입을 하는 함수
function signin() {
    var job = document.getElementsByName('job');
    for(var i=0;i<job.length;i++) {
        //작가 일반 checked된r adio버튼 값 가져오기
        if(job[i].checked == true) {
            var value = job[i].value;
        }
    }
    //로그인 양식에 맞는지 확인하는 과정
    var id_reg = /^([A-Za-z0-9]){6,15}$/gi;
    var pw_reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/gi;
    if(id_reg.test($("#id").val()) && pw_reg.test($("#pw").val())) {
        //맞다면 회원가입으로 넘어간다.
        if($("#email").val()!="") {
            sign(value);
        }
        else {//아닐경우 에러메세지 출력
            alert("이메일을 입력하지 않으셨습니다.");
        }
    }
    else {//양식에 맞지 않을 경우 에러메세지 출력
        alert("아이디 또는 패스워드가 입력양식에 맞지 않습니다.");
    }
}

//json파일에 아이디,비밀번호를 추가하는 함수
function sign(value) {
    var setdata = {id:$("#id").val(),pw:$("#pw").val(),email:$("#email").val(),job:value};
    alert("test");
    $.ajax({
        type: "POST",
        url : "./signin.php?mode=POST",
        data: setdata,
        dataType:"text",
        success : function(data) {
            //회원가입후 로그인 페이지로 돌아간다.
            location.replace("../login/login.html");
        }
    });
}