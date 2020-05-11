<?php
    class main_tree{
        public $sql;
        public $user;
        function main_tree($raw_user){
            if($raw_user){
                if($this->sql()!=1){
                   die("error connecting with data base"); 
                }
                echo "helo";
                $this->user= $this->sql_filter($raw_user,1);
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

        function clone_data($raw_key){
            $key=$this->sql_filter($raw_key,1);
            if($key=="" || !$key){
                $qry=mysqli_query($this->sql,"select u_json from data 
                                          where def=1 and u_cookie='".$this->user."' order by sn desc limit 1");
              }
              else{
                $qry=mysqli_query($this->sql,"select u_json from data 
                                          where u_key='".$key."' order by sn desc limit 1");
              }
              if(!$qry){echo mysqli_error($this->sql);}
              $data=mysqli_fetch_all($qry);
              return($this->sql_filter($data[0],0));
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

        function delete_data(){
                $qry=mysqli_query($this->sql,"update data set def=0 where u_cookie='".$this->user."';");
                if(!$qry){echo mysqli_error($this->sql);}
                else{ echo $this->user." deleted"; }
        }

        function save_data($raw_tree_name){

        }

    }
    class image_upload extends main_tree{
        public $sub_name;
        public $file;
        function image_upload($raw_user,$raw_sub_name,$file){  ///$file=$_FILES['u_name']
            $this->user=$this->sql_filter($raw_user,1);
            $this->sub_name=$this->sql_filter($raw_sub_name,1);
            $this->file=$file;
            $this->image_add();
        }

        function image_add(){ 
            if(isset($this->file['tmp_name'])){
                $image="images/".$this->user."_".$this->sub_name.".png";
                $fp=fopen($this->file['tmp_name'],'r');
                $fp_w=fopen($image,'w');
                $x=fread($fp,$this->file['size']);
                fwrite($fp_w,$x);
                fclose($fp_w);
                fclose($fp);
            }
        }

    }
?>

<?php
    $a=new image_upload("hel",1,"ppp");
    $b="image_add";
    //print_r($a->clone_data("794264b09e47ec110e938926eac69376"));
    //echo $a->$b("");
?>