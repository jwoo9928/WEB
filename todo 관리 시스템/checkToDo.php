<?php
header("Content-Type: application/json");

$id = $_POST["id"];
$date = explode("년 ",$_POST["date"]);

/*로그인한 회원의 todo list를 확인하고 화면에 나타내는 처리과정*/
$fileName = $id."_".$date[0];
$count = 0;
$ToDoList = "";
$dateList = "";
$timeList = "";
for($i=1; $i<=12; $i++) {
    if($i<10) {$format = "0".(string)$i;}
    else {$format = (string)$i;}
    if(!file_exists($fileName.$format.".json")) {
        $count++;
    }
}
if($count == 12) {
    echo("fail");
    exit(0);
}
echo(file_get_contents($fileName.explode("월",$date[1])[0].".json"));

?>