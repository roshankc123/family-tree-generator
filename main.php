<?php
header('Access-Contr­ol-Allow-Origin: *');
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
      if($_GET['json_file']){
        $json_file_filter=str_replace(array("'","-"),array("&qot","&das"),$_GET['json_file']);
        $data=json_decode($json_file_filter,1);
        //$data['tree_data'][0];
        $conn=mysqli_connect("<censored>");
        if(!$conn){ die(mysqli_connect_error());}
        $qry=mysqli_query($conn,"insert into data values('0',
                                    '".$data['tree_data'][0]."',
                                    '".$json_file_filter."');");
        if(!$qry){ echo mysqli_error($conn); }

      }
?>