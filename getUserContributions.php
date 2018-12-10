<?php

session_start();
include "db/database.php";

$dbConn = getDatabaseConnection();
    
$sql = "SELECT users.username, `language`.`language` as language1, dialect.dialect as dialect1, contributions.phrase1" + 
" FROM contributions JOIN `users` ON users.userID = contributions.userID" + 
" JOIN `language` ON contributions.language1=`language`.`id`" + 
" JOIN `dialect` ON contributions.dialect1=`dialect`.`id`" + 
" WHERE users.username = 'josh'";

print_r($sql);

// .$_SESSION["username"]
$statement = $dbConn->prepare($sql); 
$statement->execute(); 
//results contain username, language1, dialect1, and phrase1
$recordsSide1 = $statement->fetchAll();


?>