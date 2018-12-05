<?php
$output = array();
# Includes the autoloader for libraries installed with composer
require __DIR__ . '/composer/vendor/autoload.php';

# Imports the Google Cloud client library
use Google\Cloud\Translate\TranslateClient;

# Your Google Cloud Platform project ID
$projectId = 'my-project-1543956958092';
putenv('GOOGLE_APPLICATION_CREDENTIALS=./credentials/credentials.json');

$translate = new TranslateClient();
foreach ($translate->localizedLanguages() as $lang) {
    $output[] = $lang;
}

echo json_encode($output);
?>