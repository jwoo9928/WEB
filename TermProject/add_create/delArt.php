<?php
//삭제할 전시회 정보를 가져온다.
$id = $_POST["id"];
$name = $_POST["name"];

//id.json에서 전달받은 전시회정보를 통해 전시회를 삭제
$array = json_decode(file_get_contents("./".$id.".json"),true);
for($i = 0;$i<count($array);$i++) {
    //삭제할 정보를 찾으면 그대로 삭제후 json파일에 반영한다.
    if($array[$i]["name"] == $name){
        unset($array[$i]);
        $array = array_values($array);
        file_put_contents("./".$id.".json", json_encode($array));
    }
}

//전체작품.json에서 전달받은 전시정보를 통해 전시회를 삭제
$array = json_decode(file_get_contents("newExhibition.json"),true);
for($i = 0;$i<count($array);$i++) {
    //삭제할 정보를 찾으면 그대로 삭제후 json파일에 반영한다.
    if($array[$i]["name"] == $name && $array[$i]["id"] == $id){
        unset($array[$i]);
        $array = array_values($array);
        file_put_contents("newExhibition.json", json_encode($array));
        echo "삭제되었습니다.";
    }
}
?>