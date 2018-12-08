<?php
// INCOMPLETE

    include 'db/database.php';
    
    $ret = array();
    $dbConn = getDatabaseConnection();
    $sql = "INSERT INTO Contributions (word, convertedWord, languageCode, dialect, userID, contributionID)
            VALUES" .$S . ;
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    $records = $statement->fetchAll(); 
        
    $ret["age"] = 2018 - intval($records[0]['yob']);
    $ret["breed"] = $records[0]["breed"];
    $ret["desc"] = $records[0]["description"];
    $ret["img"] = "img/" . $records[0]["pictureURL"];
        
    return $ret;
         
    echo json_encode(;
?>