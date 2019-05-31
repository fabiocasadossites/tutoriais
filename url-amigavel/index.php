<?php require('Link.class.php');

define('REQ', "_main" . DIRECTORY_SEPARATOR);

$link = new Link();

var_dump($link);





if($link->Path != null)
{
	require(REQ . 'pages' . DIRECTORY_SEPARATOR  . $link->Path . '/' . $link->File . '.php' );
}else{
	require(REQ . 'pages' . DIRECTORY_SEPARATOR . '/'  . $link->File . '.php' );
}

?>