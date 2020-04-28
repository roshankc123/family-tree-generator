<?php
    header('Access-Control-Allow-Origin: *');
    if($_FILES['u_image']['tmp_name']){
      $image="images/".$_REQUEST['div_id'].".png";
        $fp=fopen($_FILES['u_image']['tmp_name'],'r');
        $fp_w=fopen($image,'w');
        $x=fread($fp,$_FILES['u_image']['size']);
        fwrite($fp_w,$x);
        fclose($fp_w);
        fclose($fp);
        echo $image."::done";
      }
      echo "post:";
      print_r($_POST);
      echo '<br>get';
      print_r($_GET);
      echo '<br>files';
      print_r($_FILES);
      if($_POST['json_file'] && $_GET['user']){
        $json_file_filter=str_replace(array("'","-"),array("&qot","&das"),$_POST['json_file']);
        $user=str_replace(array("'","-"),array("&qot","&das"),$_GET['user']);
        $conn=mysqli_connect("<censored>");
        if(!$conn){ die(mysqli_connect_error());}
        $qry=mysqli_query($conn,"insert into data values('0',
                                    '".$user."',
                                    '".$json_file_filter."');");
        if(!$qry){ echo mysqli_error($conn); }
        echo "ok";
      }