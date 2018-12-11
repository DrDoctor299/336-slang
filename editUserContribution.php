<?php

session_start();
include "db/database.php";
$dbConn = getDatabaseConnection();

$sql = "UPDATE `contributions` SET".
" `contributionID`='".$_POST["id"]."',`userID`='" . $_SESSION["userID"] . "',`language1`= '" . $_POST["langOne"] . "',`language2`='" . $_POST["langTwo"] . "'," . 
"`dialect1`='" . $_POST["dialectOne"] . "',`dialect2`='" . $_POST["dialectTwo"] . "',`phrase1`='" . $_POST["textOne"] . "',`phrase2`='" . $_POST["textTwo"] . "'" . 
" WHERE contributionID = '".$_POST["id"]."'";


$statement = $dbConn->prepare($sql); 
$statement->execute(); 
//TODO link language options with langID's in dropdown to submit to DB
// $records = $statement->fetchAll();

// header('Content-Type: application/json');
// echo json_encode($sql);

?>