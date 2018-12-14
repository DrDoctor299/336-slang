<?php
# Includes the autoloader for libraries installed with composer
require __DIR__ . '/composer/vendor/autoload.php';

# Imports the Google Cloud client library
use Google\Cloud\Translate\TranslateClient;
include "db/database.php";
$output = array();
if(!empty($_GET["dialect"])) {
    $sql = "SELECT
                phrase1, 
                phrase2,
                t1.languageCode as lang1,
                t2.languageCode as lang2
            FROM contributions
            LEFT JOIN language AS t1 ON contributions.language1 = t1.id
            LEFT JOIN language AS t2 ON contributions.language2 = t2.id
            WHERE (t1.languageCode = '".$_GET["sourceLang"]."'
                AND t2.languageCode = '".$_GET["targetLang"]."'
                AND contributions.dialect2='".$_GET["dialect"]."'
                AND contributions.phrase1= '".$_GET["message"]."')
            OR (t2.languageCode = '".$_GET["sourceLang"]."'
                AND t1.languageCode = '".$_GET["targetLang"]."'
                AND contributions.dialect1='".$_GET["dialect"]."'
                AND contributions.phrase2= '".$_GET["message"]."')
            LIMIT 1";
            
    $dbConn = getDatabaseConnection();
    $statement = $dbConn->prepare($sql); 
    $statement->execute(); 
    $records = $statement->fetchAll();

}

// Get slang text is possible
if(!empty($records[0])) {
    // If message is part of column set one, get the contents of column set two
    if($records[0]["phrase1"]==$_GET["message"] && $records[0]["lang1"] == $_GET["sourceLang"])
        $output["slangText"] = $records[0]["phrase2"];
    // Else get the opposite
    else
        $output["slangText"] = $records[0]["phrase1"];    
}


// Get Google Translate result if not same lang
if($_GET["sourceLang"] != $_GET["targetLang"]) {
    # Your Google Cloud Platform project ID
    $projectId = 'my-project-1543956958092';
    putenv('GOOGLE_APPLICATION_CREDENTIALS=./composer/vendor/google/cred/credentials.json');
    # Instantiates a client
    $translate = new TranslateClient([
        'projectId' => $projectId
    ]);
        
    # The text to translate
    $text = $_GET["message"];
    # The source language
    $source = $_GET["sourceLang"];
    # The target language
    $target = $_GET["targetLang"];
        
    # Translates the text
    $output["convertedWord"] = $translate->translate($text, [
        'source' => $source,
        'target' => $target
    ]);
}
// Else output same text
else {
    $output["convertedWord"]["text"] = $_GET["message"];
}
echo json_encode($output);
?>