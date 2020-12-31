
//로그인 폼 나타내기
$("#join").click(function(){
    var pop = $("#login");
    pop.css("display","block");
    pop.css("top","70px");
    pop.css("left","600px");
});

//로그인 폼 입력 조건 처리 및 POST 전송
function LoginOrSignin(value) {
    inputCheck($("#text").val(), $("#pw").val(), value);
}

$('.submit').click(function() {
   alert($('.submit').val());
});

//입력 조건 체크 함수
function inputCheck(v1,v2, val) {
    var id_reg = /^([A-Za-z0-9]){6,15}$/gi;
    var pw_reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/gi;
    if(id_reg.test(v1) && pw_reg.test(v2)) {
        AjaxCall(val);
    }
    else {
        alert("아이디 또는 패스워드가 입력양식에 맞지 않습니다.");
    }
}

//데이터 생성 및 데이터 전송 함수
function AjaxCall(val) {
    var sendData = {id:$('#text').val(), pw:$('#pw').val(), action:val};
    $.ajax({
        type: "POST",
        url : "./signIn.php?mode=POST",
        data: sendData,
        dataType:"text",
        success : function(data) {
            if(data == $('#text').val()){
                loginSuccess(data,0);
            }
            else {alert(data);}
        }
    });
}

//로그인 성공시 이번주 달력 상단의 년도와 월, 달력에 날짜를 추가하고 변경하는 함수
function loginSuccess(data, n) {
    $("#today").css("display","");
    $("#no").css("display",'none');
    $("#success").append(data);
    var today = new Date();
    if(n == 0) {
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    } else {
        today = new Date(n);
    }
    $("#today").append(String(today.getFullYear())+"년 "+String(today.getMonth()+1)+"월");
    $("#today").css("text-align","center");
    var days = $(".title").children();
    var index = today.getDay();
    for(var i=index;i>=0;i--) {
        var d = today.getDate()-i;
        if(d == 30) {
            $("#today").css("display","none");
            var str = String(today.getFullYear())+"년 "+String(today.getMonth())+","+String(today.getMonth()+1)+"월";
            $("#no").append(str);
            $("#no").css("display",'');
            $("#no").css("text-align","center");
        }
        days.eq(index-i).prepend("<span>"+d+"</span>");
        days.eq(index-i).children().css("color","red");
    }
    for(var i=1;i<7-index;i++) {
        var count = today.getDate();
        if(count >= 30) { count = 0};
        days.eq(index+i).prepend("<span>"+(count+i)+"</span>");
        days.eq(index+i).children().css("color","red");
    }
    showToDo();
    $("#login").css("display","none");
    $("#Add").attr("disabled",false);
}


//todo add 폼 나타내기
$("#Add").click(function(){
    var pop = $("#todo");
    pop.css("display","block");
    pop.css("top","20px");
    pop.css("left","70px");
    $("#date").val("");
    $("#time").val("");
    $("#title").val("");
    $("#description").val("");
    disAndalbe(1, 0);
});

//todo cancle 버튼 기능 함수
$("#Cancel").click(function() {
    $("#todo").css("display","none");
});

//todo list data 생성
function todoData(val) {
    var sendData = {date:$("#date").val(),
    time:$("#time").val(), title:$("#title").val(),
    description:$("#description").val(), id:$("#success").text(), action:val}
    return sendData;
}

$("#Save").click(function() {
    saveAjaxCall('Save','');
    alert("저장되었습니다.");
})


// todo 폼 데이터 가져와서 생성 및 todo 저장 함수
function saveAjaxCall(val, datas) {
    if(val == "Save") {
        var sendData = todoData(val);
    } else {
        var sendData = datas;
    }
    $.ajax({
        type: "POST",
        url : "./saveToDo.php?mode=POST",
        data: sendData,
        dataType:"text",
        complete : function(data) {
            if(data == "true" && datas != "1") {
                alert("저장되었습니다.");
            }
            showToDo();
        }
    });
}

/*확인된 todo list를 화면에 나타내는 힘수*/
function showToDo() {
    var Data = {id:$("#success").text(),date:$("#today").text()};
    var todoData;
    $.ajax({
        type: "POST",
        url : "./checkToDo.php?mode=POST",
        data: Data,
        dataType:"json",
        success : function(data) {
            createToDo(data);
        },
        error : function()  {
            alert("등록된 일정이 없습니다.");
        }
    });
}

//todo list box를 생성하는 함수
function createToDo(data) {
    var table = $(".data").children();
    var day = $(".title").children();
    for(var j=0;j<7;j++) {table.eq(j).empty();}
    for(var i=0;i<data.length;i++) {
        var index = parseInt(data[i]["date"].split("-")[2]);
        for(var j=0;j<7;j++) {
            if(day.eq(j).children().eq(0).text() == index) {
                var todoData = data[i]["date"]+"/"+data[i]["time"]+"/"+data[i]["title"]+"/"+data[i]["discription"];
                table.eq(j).append("<div class='todobox' id='"+todoData+"'>"+data[i]["title"]+"</div>");
            }
        }

    }
}
//todobox의 항목의 disalbe을 결정하는 함수
function disAndalbe(n, s) {
    $able = ["disable",false];
    $("#Save").attr("disabled",$able[n]);
    $("#date").attr("disabled",$able[n]);
    $("#title").attr("disabled",$able[n]);
    $("#time").attr("disabled",$able[n]);
    $("#description").attr("disabled",$able[n]);
    $("#Update").attr("disabled",$able[s]);
    $("#Delete").attr("disabled",$able[s]);
    $("#Submit").attr("disabled","disabled");
}

//todo box를 클릭하여 todo box의 항목들에 값을 넣는 함수
function modify(ev) {
    var datas = ev.target.id.split("/");
    if(datas[1] == null) {exit(0);}
    var pop = $("#todo");
    pop.css("display","block");
    pop.css("top","20px");
    pop.css("left","70px");
    disAndalbe(0, 1);
    $("#date").val(datas[0]);
    $("#time").val(datas[1]);
    $("#title").val(datas[2]);
    $("#description").val(datas[3]);
    $("#Update").click(function () {
        disAndalbe(1, 0);
        $("#Submit").attr("disabled",false);
        $("#Save").attr("disabled","disabled");
    });

    var data = {date:datas[0],
        time:datas[1], title:datas[2],
        description:datas[3], id:$("#success").text(), action:"Submit"};
    
    $("#Submit").click(function () {
        var temp = $("#today").text();
        saveAjaxCall('Save',"1");
        saveAjaxCall("Submit",data);
        for(var i=0;i<7;i++) {
            $(".title").children().eq(i).children().remove();
            $(".data").children().eq(i).children().remove();
        }
        var Date = $("#date").val().split("-");
        var newDate = Date[0]+"/"+Date[1]+"/"+Date[2];
        loginSuccess("",newDate);
        $("#today").empty();
        var new_today = Date[0]+"년 "+Date[1]+"월";
        $("#today").text(new_today);
        showNextMonth(new_today);
        pop.css("display","none");
    });
}

$("#Delete").click(function() {
    var pop = $("#todo");
    alert("삭제되었습니다");
    saveAjaxCall("Submit",todoData("Submit"));
    pop.css("display","none");
});

//로그아웃 버튼 구현
$("#logout").click(function () {
    alert("로그아웃이 되었습니다");
    var days = $(".title").children();
    var todo = $(".data").children();
    for(var i=0;i<7;i++) {
        days.eq(i).children().remove();
        todo.eq(i).children().remove();
    }
    $("#success").text("");
    $("#today").text("");
    $("#Add").attr("disabled","disabled");
})

//다음달이동시 다음달 달력을 보여주는 함수
function showNextMonth(next) {
    var Data = {id:$("#success").text(),date:next};
    $.ajax({
        type: "POST",
        url : "./checkToDo.php?mode=POST",
        data: Data,
        dataType:"json",
        complete : function(data) {
            createToDo(data);
        }
    });
}