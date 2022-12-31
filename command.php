<?php
     $BLOQUED=["rm","touch","mkdir"]; // Between the commands you don't want to run

     $c=$_POST["command"];
     $c=str_replace("'","",$c);
     $c_arg=strtok($c," ");

     if(in_array($c_arg, $BLOQUED)){
       echo "<p style='font-size:1em;color:crimson;'>$ Command $c banned</p>";
     }else{
      system(" ''".$c."'' ",$r);
     if($r!=0){
       echo "<p style='font-size:1em;color:crimson;'>$ Error command $c not found</p>";
       }
     }
?>
