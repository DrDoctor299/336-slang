<?php

session_start();
include "db/database.php";


$dbConn = getDatabaseConnection();
    
$sql = "";

$statement = $dbConn->prepare($sql); 
$statement->execute(); 
// results should be true or false
$records = $statement->fetchAll();


header('Content-Type: application/json');
echo json_encode($records);

?>