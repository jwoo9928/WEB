<?php

//아이디, 본명, 이력, sns주소를 받아온다.
$id = $_POST["id"];
$name = $_POST["name"];
$career = $_POST["career"];
$intro = $_POST["intro"];
$twitter = $_POST["twitter"];
$face  = $_POST["facebook"];
$instar = $_POST["instar"];


//이값을 토대로 아이디+intro.json파일로 저장한다.
$array = array();
array_push($array,array("name"=> $name,"career" => $career,"intro"=>$intro,"twiter"=>$twitter,"facebook"=>$face,"instar"=>$instar));
file_put_contents($id."intro.json", json_encode($array));
echo "저장되었습니다.";