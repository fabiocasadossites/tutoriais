<?php

$dir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads';

if(!is_dir($dir)){
	mkdir($dir, 0777, true);
}

if(isset($_FILES['file'])){
    
   if(move_uploaded_file($_FILES['file']['tmp_name'], $dir . DIRECTORY_SEPARATOR . $_FILES['file']['name'])){
       echo 'Concluido!';
   }else{
       echo 'Erro no upload';
   }
}
