<?php
    include 'db/database.php';
    
    session_start();
    $ret = array();
    $dbConn = getDatabaseConnection();
    // Get Language Codes
    $sql = "SELECT * FROM language WHERE language='".$_GET['language1']."';";
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    $records = $statement->fetchAll(); 
    $lang1 = $records[0]["id"];
    
    $sql = "SELECT * FROM language WHERE language='".$_GET['language2']."';";
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    $records = $statement->fetchAll(); 
    $lang2 = $records[0]["id"];
    
    // Make Contribution
    $sql = "INSERT INTO contributions (contributionID, userID, language1, language2, 
                                        dialect1, dialect2, phrase1, phrase2)
                            VALUES (NULL, '".$_SESSION["userID"]."', '$lang1', '$lang2', 
                                    '".$_GET["dialect1"]."', '".$_GET["dialect2"]."', '".$_GET["phrase1"]."', '".$_GET["phrase2"]."');";
    echo $sql;
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
 
         
   
?>