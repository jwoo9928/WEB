<?php
$id = $_POST["id"];

//받아온 아이디를 통해 회원정보 json에서 job과 email을 가져와 반환하는 php
$array = json_decode(file_get_contents("../signin/person.json"),true);
for($i = 0;$i<count($array);$i++) {
    if(array_search($id,$array[$i])) {
        $job = $array[$i]["job"];
        $email = $array[$i]["email"];
    }
}
echo $id."/".$job."/".$email;
?>