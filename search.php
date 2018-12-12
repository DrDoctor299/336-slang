<?php

session_start();
include "db/database.php";
$dbConn = getDatabaseConnection();


function buildSQL($option) {
    if($option == "search") {
        if($_POST["slang"] != "") {
            //if slang search
            $sql = "SELECT T.contributionID, T.username, T.dialect1, T.dialect2, T.phrase1, T.phrase2, T.lang1plaintext, language.language as lang2plaintext FROM 
                        (SELECT contributionID, users.username, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                        FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                        WHERE phrase1 LIKE '%".$_POST["slang"]."%' OR phrase2 LIKE '%".$_POST["slang"]."%'";    
        }
        else {
            //if no slang search
            $sql = "SELECT T.contributionID, T.username, T.dialect1, T.dialect2, T.phrase1, T.phrase2, T.lang1plaintext, language.language as lang2plaintext FROM 
                        (SELECT contributionID, users.username, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                        FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                        WHERE 1";
        }
    }
    else if($option == "count" || $option == "loggedin") {
        if($_POST["slang"] != "") {
            //if slang search
            $sql = "SELECT COUNT(`T`.`userID`) AS count FROM 
                        (SELECT contributionID, `users`.`userID`, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                        FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                        WHERE phrase1 LIKE '%".$_POST["slang"]."%' OR phrase2 LIKE '%".$_POST["slang"]."%'";    
        }
        else {
            //if no slang search
            $sql = "SELECT COUNT(`T`.`userID`) AS count FROM 
                        (SELECT contributionID, `users`.`userID`, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                        FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                        WHERE 1";
        }
    }
    else if($option == "users") {
        if($_POST["slang"] != "") {
            //if slang search
            $sql = "SELECT COUNT(`T2`.`contributionID`) AS count FROM
                        (SELECT `T`.`contributionID`, `T`.`userID` FROM
                            (SELECT contributionID, `users`.`userID`, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                            FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                            WHERE phrase1 LIKE '%".$_POST["slang"]."%' OR phrase2 LIKE '%".$_POST["slang"]."%'";    
        }
        else {
            //if no slang search
            $sql = "SELECT COUNT(`T2`.`contributionID`) AS count FROM
                        (SELECT `T`.`contributionID`, `T`.`userID` FROM
                            (SELECT contributionID, `users`.`userID`, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                            FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                            WHERE 1";
        }
    }
    
    
    if($_POST["lang"] != "") {
        $sql .= " AND language1 = '".$_POST["lang"]."' OR language2 = '".$_POST["lang"]."'";
    }
    if($_POST["dialect"] != "") {
        $sql .= " AND dialect1 = '".$_POST["dialect"]."' OR dialect2 = '".$_POST["dialect"]."'";
    }
    if($option == "loggedin") {
        $sql .= " AND `users`.`userID` = '".$_SESSION["userID"]."'";
    }
    if($_POST["order"] == "slangByUser") {
        $sql .= " ORDER BY username";
    } 
    else {
        $sql .= " ORDER BY language1";
    }

    
    $sql .= ") AS T JOIN language ON T.language2 = language.id";
    
    if($option == "users") {
        $sql .= " GROUP BY `T`.`userID`) AS T2";
    }    
    
    return $sql;
}

//query the DB for the search results
$statement = $dbConn->prepare(buildSQL("search")); 
$statement->execute(); 
$records = $statement->fetchAll();

//query the DB for the number of results
$statement = $dbConn->prepare(buildSQL("count")); 
$statement->execute(); 
$countArray = $statement->fetchAll();

//add total results to the returning json object
$records["totalResults"] = $countArray[0]["count"];

//query the DB for the number of unique users contributing to results
$statement = $dbConn->prepare(buildSQL("users")); 
$statement->execute(); 
$usersArray = $statement->fetchAll();
 
//add the total number of unique users (usersCount)
$records["usersCount"] = $usersArray[0]["count"];

//query the DB for the number of contributes from the user (if the user is logged in)
if(session_status() == PHP_SESSION_ACTIVE) {
    $statement = $dbConn->prepare(buildSQL("loggedin")); 
    $statement->execute(); 
    $loggedinArray = $statement->fetchAll();    
}

//add the total number contributions made by logged in user (loggedinCount)
$records["loggedinCount"] = $loggedinArray[0]["count"];

//add length property
if(session_status() == PHP_SESSION_ACTIVE) {
    $records["length"] = count($records) - 3;
}
else {
    $records["length"] = count($records) - 2;
}

header('Content-Type: application/json');
echo json_encode($records);

// echo buildSQL("users");

?>