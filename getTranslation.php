<?php
include "db/database.php";

$output = array();

# Includes the autoloader for libraries installed with composer
require __DIR__ . '/composer/vendor/autoload.php';

# Imports the Google Cloud client library
use Google\Cloud\Translate\TranslateClient;

# Your Google Cloud Platform project ID
$projectId = 'my-project-1543956958092';
putenv('GOOGLE_APPLICATION_CREDENTIALS=./credentials/credentials.json');
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
$output["rawTranslatedText"] = $translate->translate($text, [
    'source' => $source,
    'target' => $target
]);

echo json_encode($output);
?>