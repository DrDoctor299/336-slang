<?php
// connect to our mysql database server
function getDatabaseConnection() {
    if (strpos($_SERVER['SERVER_NAME'], "c9users") !== false) {
        // running on cloud9
        $host = "localhost";
        $username = "joshuawilliams19";
        $password = "cst336";
        $dbname = "finalproj"; 
    } else {
        // running on Heroku
        $host = "us-cdbr-iron-east-01.cleardb.net";
        $username = "b7950bece186a3";
        $password = "9694bde7";
        $dbname = "heroku_efe8658e087ab3b"; 
    }
    
    
    // Create connection
    $dbConn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $dbConn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConn; 
}
// temporary test code
//$dbConn = getDatabaseConnection(); 
?>