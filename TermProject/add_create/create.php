<?php
//생성할 전시회의 여러 정보를 받아옴
$ex = $_POST["exhibition"];
$id = $_POST["id"];
$name = $_POST["name"];

//로그인한 아이디의 json파일이 재하지 않을 경우 array를 생성해서 전시회 정보를 array에 저장
if(!file_exists($id.".json")) {
    $array = array();
    array_push($array,array("name"=> $name,"exhibition" => $ex));
}
else {
    //존재하는 json 파일을 디코드하여 새로 받은 전시회 정보를 저장
    $array = json_decode(file_get_contents($id.".json"),true);
    array_push($array,array("name"=> $name,"exhibition" => $ex));
}
//array에 저장된 작품을 json에 다시 저장
file_put_contents($id.".json", json_encode($array));

//전체 작품을 저장하는 json파일도 역시 위와 같은 처리를 통해 새로운 전시회 작품을 저장
if(!file_exists("newExhibition.json")) {
    $array = array();
    array_push($array,array("id"=>$id,"name"=> $name,"exhibition" => $ex));
}
else {
    $array = json_decode(file_get_contents("newExhibition.json"),true);
    array_push($array,array("id"=>$id,"name"=> $name,"exhibition" => $ex));
}
file_put_contents("newExhibition.json", json_encode($array));
echo "전시회 생성이 완료되었습니다.";
?>