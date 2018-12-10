<?php

include "db/database.php";

function getSupportedLanguages() {
    
    $dbConn = getDatabaseConnection();
    
    $sql = "SELECT language FROM language WHERE 1";
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    $records = $statement->fetchAll();
    
    $result = array();
    foreach($records as $record) {
        array_push($result, $record["language"]);
    };
    
    return $result;
    
}



?>