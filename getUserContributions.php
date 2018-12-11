<?php

session_start();
include "db/database.php";
$dbConn = getDatabaseConnection();

//retrieves one contribution by id (if passed an id)
if(isset($_POST["id"])) {
    $sql = "SELECT contributions.contributionID, users.username, `language`.`language` as language1, language.id as langID1, contributions.dialect1, contributions.dialect2, contributions.phrase1, contributions.phrase2".
    " FROM contributions JOIN `users` ON users.userID = contributions.userID".
    " LEFT JOIN `language` ON contributions.language1=`language`.`id`".
    " WHERE contributions.contributionID = '".$_POST["id"]."'";
    
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    //results contain username, language1, dialect1, dialect2, phrase1, phrase2,
    $records = $statement->fetchAll();
    $sql = "SELECT `language`.`language` as language2, language.id as langID2".
    " FROM contributions JOIN `users` ON users.userID = contributions.userID".
    " LEFT JOIN `language` ON contributions.language2 =`language`.`id`".
    " WHERE contributions.contributionID = '".$_POST["id"]."'";
    
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    //results contain language2
    $recordsSide2 = $statement->fetchAll();
    $records[0]["language2"] = $recordsSide2[0][0];
    $records[0]["langID2"] = $recordsSide2[0][1];
} 
//passes all contributions back from the currently logged in user
else {

    $sql = "SELECT contributions.contributionID, users.username, `language`.`language` as language1, contributions.dialect1, contributions.dialect2, contributions.phrase1, contributions.phrase2".
    " FROM contributions JOIN `users` ON users.userID = contributions.userID".
    " JOIN `language` ON contributions.language1=`language`.`id`".
    " WHERE users.username = '".$_SESSION["username"]."'";
    
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    //results contain username, language1, dialect1, dialect2, phrase1, phrase2,
    $records = $statement->fetchAll();
    $sql = "SELECT `language`.`language` as language2".
    " FROM contributions JOIN `users` ON users.userID = contributions.userID".
    " JOIN `language` ON contributions.language2 =`language`.`id`".
    " WHERE users.username = '".$_SESSION["username"]."'";
    
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    //results contain language2
    $recordsSide2 = $statement->fetchAll();
    for ($i = 0; $i < count($records); $i++) {
        array_push($records[$i], $recordsSide2[$i][0]);
    }

}

header('Content-Type: application/json');
echo json_encode($records);

?>