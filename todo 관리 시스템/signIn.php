<?php
header("Content-Type: application/json");

$id = $_POST['id'];
$pw= $_POST['pw'];
$action = $_POST['action'];

if($action == 'SignIn') {
    if(!file_exists("person.json")) {
        $array = array();
        array_push($array,array("id" => $id, "pw" => $pw));
        echo "회원 가입이 완료되었습니다";
    }
    else {
        $array = json_decode(file_get_contents("person.json"),true);
        for($i = 0;$i<count($array);$i++) {
            if(array_search($id,$array[$i])){
                echo "이미 아이디가 존재합니다";
                exit();
            }
        }
        array_push($array,array("id" => $id, "pw" => $pw));
        echo "회원 가입이 완료되었습니다";
    }
    file_put_contents("person.json", json_encode($array));
}

else {
    $found = 0;
    $array = json_decode(file_get_contents("person.json"),true);
    for($i = 0;$i<count($array);$i++) {
        if(array_search($id,$array[$i]) && array_search($pw,$array[$i])) {$found = 1;}
    }
    if($found == 0) {echo "입력하신 id가 존재하지 않거나 패스워드가 틀립니다";}
    else{echo $id;}
}

?>