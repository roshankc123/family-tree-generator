<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
    class main_tree{
        public $sql;
        public $user;
        function main_tree($raw_user){
            if($raw_user){
                $this->user=$this->sql_filter($raw_user,1);
              }
        }

        function sql(){
            $conn=mysqli_connect("127.0.0.1","root","","tree");
            if(!$conn){ return(mysqli_connect_error());}
            else{
                $this->sql=$conn;
                return 1;
            }
        }

        function clone_data(){
            $key=$this->sql_filter($_POST['key'],1);
            if($key=="" || !$key){
                $qry=mysqli_query($this->sql,"select u_json from data 
                                          where def=1 and u_cookie='".($this->user)."' order by sn desc limit 1");
              }
              else{
                $qry=mysqli_query($this->sql,"select u_json from data 
                                          where u_key='".$key."' order by sn desc limit 1");
              }
              if(!$qry){echo mysqli_error($this->sql);}
              $data=mysqli_fetch_all($qry);
              return $this->sql_filter($data[0][0],0);
        }

        function sql_filter($value,$for_sql){
            if($for_sql==1){
                $first=array("'","-");
                $second=array("&qot","&das");
            }
            else{
                $first=array("&qot","&das");
                $second=array("'","-");
            }
            return (str_replace($first,$second,$value));
        }

        function delete_data($type){
            if ($type!="perm"){
                $qry=mysqli_query($this->sql,"update data set def=0 
                                                where u_cookie='".$this->user."';");
            }
            else{
                $tree_key=$this->sql_filter($_POST['tree_id'],1);
                $qry=mysqli_query($this->sql,"update data set u_cookie='deleted'
                                                where u_cookie='".$this->user."' and u_key='".$tree_key."';");
            }
                if(!$qry){echo mysqli_error($this->sql);}
                else{ return json_encode(array($tree_key,"deleted")); }
        }

        function image_add($box_id){ 
            $image_name=$this->user."_".time()."_".$this->sql_filter($box_id,1);
            if(isset($_FILES['u_image']['tmp_name'])){
                $image="images/".$image_name.".png";
                $fp=fopen($_FILES['u_image']['tmp_name'],'r');
                $fp_w=fopen($image,'w');
                $x=fread($fp,$_FILES['u_image']['size']);
                $action=fwrite($fp_w,$x);
                fclose($fp_w);
                fclose($fp);
                if($action==FALSE){
                    return "file saving error";
                }
                else{
                    return $image_name;
                }
            }
        }

        function save_data(){
            if($_POST['json_file']){
                $tree_name=$this->sql_filter($_POST['tree_name'],1);
                $key=hash("md5",$_POST['tree_name'].$user.time());
                $json_file_filter=str_replace(array("'","-"),array("&qot","&das"),$_POST['json_file']);
                $qry=mysqli_query($this->sql,"insert into data values('0',
                                            '".$this->user."',
                                            '".$json_file_filter."',
                                            1,
                                            '".$key."',
                                            '".$tree_name."',
                                            '".time()."');");
                if(!$qry){ echo mysqli_error($this->sql);die("error"); }
                else{ return $key; }
            }
        }

        function get_note(){
            if($_POST['last_time']){
                $last_time=$this->sql_filter($_POST['last_time'],1);
            }
            else{
                $last_time=time();
            }
            $qry=mysqli_query($this->sql,"select tree_name,u_key,added_time from data 
                                          where u_cookie='".$this->user."' and 
                                          added_time<'".$last_time."' order by added_time desc limit 10");
              if(!$qry){echo mysqli_error($this->sql);}
              $data=mysqli_fetch_all($qry);
              return $this->sql_filter(json_encode($data),0);
        }

    }

?>
<?php
    $tree=new main_tree($_POST['user']);
    if($_POST['action']=="save_image"){
        echo $tree->image_add($_POST['box_id']);
    }
    else{
        if($tree->sql()){
            switch ($_POST['action']){
                case 'delete':
                    echo $tree->delete_data("clean");
                break;
                case 'get_json':
                    echo $tree->clone_data();
                break;
                case 'clone':
                    echo $tree->clone_data();
                break;
                case 'save_json':
                    echo $tree->save_data();
                break;
                case 'get_note':
                    echo $tree->get_note();
                break;
                case 'delete_perm':
                    echo $tree->delete_data("perm");
                break;
                default:
                break;
            }
        }
    }

?>
