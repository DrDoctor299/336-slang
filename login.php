<?php
    include "db/database.php";
    $ret = array();
    $dbConn = getDatabaseConnection();
    
    // Check if username exists already
    $sql = "SELECT * FROM users WHERE username = '".$_GET["sentUsername"] ."' AND password = '".$_GET['sentPassword'] ."'";
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    $records = $statement->fetchAll();
    if(count($records)==1) {
       session_start();
       $_SESSION["username"]=$_GET["sentUsername"]; 
       $_SESSION["password"]=$_GET["sentPassword"];
       $ret["success"] = true;
       echo json_encode($ret);
    }
    // Invalid credentials
    else {
       
    }
        
    
?>