<?php

if(isset($_FILES['file'])){
    
   if(move_uploaded_file($_FILES['file']['tmp_name'], 'upload/' . $_FILES['file']['name'])){
       echo 'Concluido!';
   }else{
       echo 'Erro no upload';
   }
}