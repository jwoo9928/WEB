<?php
//id에 맞는 json을 찾아 출력
$id = $_POST["id"];
echo file_get_contents("../add_create/".$id.".json");
?>