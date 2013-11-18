<?php

$dataURL = $_POST["dataURL"];
$fileName = $_POST['fileName'];
$encodedData = explode(',', $dataURL);
$encodedData = $encodedData[1];
$decodedData = base64_decode($encodedData);
$filePath = $fileName;
file_put_contents($filePath, $decodedData);
echo($filePath);


?>