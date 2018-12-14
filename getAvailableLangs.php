<?php
# Includes the autoloader for libraries installed with composer
require __DIR__ . '/composer/vendor/autoload.php';

# Imports the Google Cloud client library
use Google\Cloud\Translate\TranslateClient;
include "db/database.php";
$output = array();

$sql = "SELECT dialect1 AS dialects
        FROM contributions
        UNION DISTINCT
        SELECT dialect2 
        FROM contributions
        JOIN language ON contributions.language2 = language.id
        WHERE language.language = '".$_GET["language2"]."';";
        
$dbConn = getDatabaseConnection();
$statement = $dbConn->prepare($sql); 
$statement->execute(); 
$records = $statement->fetchAll();

foreach ($records as $record) {
    $output["slangs"][] = $record[0];
}



# Your Google Cloud Platform project ID
$projectId = 'my-project-1543956958092';
putenv('GOOGLE_APPLICATION_CREDENTIALS=./composer/vendor/google/cred/credentials.json');

$translate = new TranslateClient();

foreach ($translate->localizedLanguages() as $lang) {
    $output["langs"][] = $lang;
}

echo json_encode($output);
?>