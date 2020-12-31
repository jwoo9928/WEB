<?php
//아이디로 아이디.json파일을 찾아 반환
$id = $_POST["id"];
echo file_get_contents("../add_create/".$id.".json");
?>