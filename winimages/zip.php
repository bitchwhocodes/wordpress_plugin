<?php


$imagePath = $_POST["imagePath"];
$fileName = $_POST['fileName'];
error_log($fileName);
$files = array();
foreach (glob($imagePath."*.png") as $file) {
  $files[] = $file;


}



$result = create_zip($files,$fileName,true);
echo($result);



function create_zip($files = array(),$destination = '',$overwrite = false) {
	//if the zip file already exists and overwrite is false, return false
	if(file_exists($destination) && !$overwrite) { return false; }
	//vars
	$valid_files = array();
	//if files were passed in...
	if(is_array($files)) {
		//cycle through each file
		foreach($files as $file) {
			//make sure the file exists
			if(file_exists($file)) {
				$valid_files[] = $file;
				 
			}
		}
	}
	//if we have good files...
	if(count($valid_files)) {
		//create the archive
		$zip = new ZipArchive();

		if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			
			return false;
		}
		//add the files
		foreach($valid_files as $file) {
			$fileName =  basename($file); 
			$zip->addFile($file,$fileName);
		}
		//debug
		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;
		
		//close the zip -- done!
		$zip->close();
		
		//check to make sure the file exists
		error_log($destination);
		return file_exists($destination);
	}
	else
	{
		return false;
	}
}


?>