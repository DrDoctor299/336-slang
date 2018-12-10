<?php

session_start();
include "db/database.php";


$dbConn = getDatabaseConnection();
    
$sql = "DELETE FROM `contributions` WHERE contributionID = " . $_GET["id"];

$statement = $dbConn->prepare($sql); 
$statement->execute(); 

?>