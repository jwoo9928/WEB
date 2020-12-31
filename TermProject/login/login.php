<?php
header("Content-Type: application/json");

$id = $_POST['id'];
$pw= $_POST['pw'];

$found = 0;
$job;
$array = json_decode(file_get_contents("../signin/person.json"),true);
for($i = 0;$i<count($array);$i++) {
    //아이디와 비밀번호가 json안에 존재하는지 확인하는 작업
    if($array[$i]["id"] == $id && $array[$i]["pw"] == $pw) {
        $found = 1;
        $job = $array[$i]["job"];
    }
}
//json파일에 아이디와 비밀번호가 존재하지 않으면 0을 반환하도록한다.
if($found == 0) {echo "0";}
//존재한다면 그 아이디의 job을 반환한다.
else {echo $job;}
?>