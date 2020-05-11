
function ajax_call(ajax_for,args){     ///args represent any argument to be passed
    var user=getCookie("tree_cookie");
    var url="http://127.0.0.1:8081/main.php";
    var formData = new FormData();
    formData.append('user', user);
    switch (ajax_for) {
        case 'get_json':
            
            break;
        case 'json_send':
            formData.append('json_file', JSON.stringify(data));
            break;
        case 'okeditformclicked':
            var id=args;
            var file_is_present = document.getElementById('u_image').value.trim();
            if(file_is_present){
                var image=document.getElementById('u_image');
                temp[id]=window.URL.createObjectURL(image.files[0]);
                document.getElementById('img_'+id).src=temp[id];
                formData.append("u_image", image.files[0]);
                formData.append("box_id",id);
                formData.append("time",Date.now());
            }
            break;
        case 'clone':
            formData.append('key',args);
            break;
        case 'save_pw':
            formData.append('key',args);
            formData.append('json_file', JSON.stringify(data));
            break;
        case 'delete':
            break;
        default:
            break;
    }
    var request = makeRequest('POST', url);
    if(!request) {
        console.log('Request not supported');
        return;
    }
    // Handle the requests
    request.onreadystatechange = () => {
        if(request.readyState==4&&request.status==200){
            var response=request.responseText;
            switch (ajax_for) {
                case 'get_json':
                    if(response!=""){
                        callback(response,"get_json");
                    }
                    break;
                case 'json_send':
                    backed_up=1;
                    callback(response,"json_send");
                    break;
                case 'editform clicked':
                    callback(response,"image_uploaded");
                    break;
                case 'clone' || 'save_pw':
                    backed_up=1;
                    callback(response,ajax_for);
                    break;
                case 'delete':
                    callback(response, "reload");
                    break;
                default:
                    break;
            }
        }
        else if(request.readyState==4&&request.status!=200){
            console.log("Error occured!!!");
        }
    };
    request.send(formData);
}