<?php
header("Content-Type: application/json");

$id = $_POST['id'];
$pw= $_POST['pw'];
$email = $_POST['email'];
$job = $_POST['job'];

//만약 person.json이 존재하지않을경우
if(!file_exists("person.json")) {
    //array를 새로 생성해서 데이터를 저장한다.
    $array = array();
    array_push($array,array("id" => $id, "pw" => $pw,"email" => $email, "job"=>$job));
    echo "회원 가입이 완료되었습니다";
}
else {
    //파일이 존재할경우 파일을 디코드하여 추가적으로 데이터를 저장하도록 한다.
    $array = json_decode(file_get_contents("person.json"),true);
    for($i = 0;$i<count($array);$i++) {
        if(array_search($id,$array[$i])){
            echo "이미 아이디가 존재합니다";
            exit();
        }
    }
    array_push($array,array("id" => $id, "pw" => $pw,"email" => $email, "job"=>$job));
    echo "회원 가입이 완료되었습니다";
}
//파일 저장
file_put_contents("person.json", json_encode($array));

?>