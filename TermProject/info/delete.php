<?php
$id = $_POST["id"];

//회원의 정보가 들어있는 json에 접근하여 탈퇴할 아이디를 찾아 그 값을 제거한다.
$array = json_decode(file_get_contents("../person.json"),true);
for($i = 0;$i<count($array);$i++) {
    if($array[$i]["id"] == $id){
        //데이터 제거
        unset($array[$i]);
        $array = array_values($array);
        echo $array[$i]["id"];
        file_put_contents("../person.json", json_encode($array));
        exit();
    }
}
?>