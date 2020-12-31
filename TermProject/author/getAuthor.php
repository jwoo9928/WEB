<?php
$id = $_POST["id"];
echo file_get_contents("../info/".$id."intro".".json");
?>