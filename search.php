<?php

// "SELECT T.contributionID, T.userID, T.dialect1, T.dialect2, T.phrase1, T.phrase2, T.lang1plaintext, language.language as lang2plaintext FROM 
//     (SELECT contributionID, contributions.userID, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
//     FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
//     WHERE 1 AND language1 = '46' OR language2 = '46' ORDER BY language1)
// AS T JOIN language ON T.language2 = language.id"

if($_POST["slang"] != "") {
    //if slang search
    $sql = "SELECT T.contributionID, T.userID, T.dialect1, T.dialect2, T.phrase1, T.phrase2, T.lang1plaintext, language.language as lang2plaintext FROM 
                (SELECT contributionID, contributions.userID, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                WHERE phrase1 LIKE '%".$_POST["slang"]."%' OR phrase2 LIKE '%".$_POST["slang"]."%'";    
}
else {
    //if no slang search
    $sql = "SELECT T.contributionID, T.userID, T.dialect1, T.dialect2, T.phrase1, T.phrase2, T.lang1plaintext, language.language as lang2plaintext FROM 
                (SELECT contributionID, contributions.userID, language1, language2, dialect1, dialect2, phrase1, phrase2, language.language as lang1plaintext 
                FROM contributions JOIN `users` ON users.userID = contributions.userID JOIN `language` ON contributions.language1=`language`.`id` 
                WHERE 1";
}
if($_POST["lang"] != "") {
    $sql .= " AND language1 = '".$_POST["lang"]."' OR language2 = '".$_POST["lang"]."'";
}
if($_POST["dialect"] != "") {
    $sql .= " AND dialect1 = '".$_POST["dialect"]."' OR dialect2 = '".$_POST["dialect"]."'";
}
if($_POST["order"] == "slangByUser") {
    $sql .= " ORDER BY username";
} 
else {
    $sql .= " ORDER BY language1";
}

$sql .= ") AS T JOIN language ON T.language2 = language.id";

$statement = $dbConn->prepare($sql); 
$statement->execute(); 
//results contain username, language1, dialect1, dialect2, phrase1, phrase2,
$records = $statement->fetchAll();


echo $sql;

?>