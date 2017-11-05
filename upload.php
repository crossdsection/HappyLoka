<?php
$target_dir = "images/files/";

$images = file_get_contents('js/images.json');
$images = json_decode( $images, true );
$fileNames = $images['gallery'];
$lastFileName = end( $fileNames );
$matches = ( preg_replace('/\D/', '', $lastFileName ) + 1 );
$newImageFileName = 'yoga'.$matches.'.jpeg';
$fileNames[] = $target_dir . $newImageFileName;
$images['gallery'] = $fileNames;
$target_file = $target_dir . $newImageFileName;

$imageFileType = pathinfo( $target_file, PATHINFO_EXTENSION );
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if( $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ( $uploadOk == 0 ) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if ( move_uploaded_file( $_FILES["fileToUpload"]["tmp_name"], $target_file ) ) {
        $newImages = json_encode( $images );
        file_put_contents('js/images.json', $newImages);
        echo "The file ". basename( $_FILES["fileToUpload"]["name"] ). " has been uploaded as ".$target_file;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
