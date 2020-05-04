
i=0;
child=0;
var intial_zoom=1;
var zoom_step=0.3;

///initilize associative array that is in data['box_id'] format
var data={};
//initilize numeric array for main initial box that has constant id A
data['A']=[];
data['A'][0]="";
data['A'][1]="";
data['A'][2]=-1;
// When window is loaded then only
window.onload = () => {
    if(!isCookieSet()){
        createCookie("tree_cookie",3650*24*60*60,"site");
    } else {
        var tmp_cookie=getCookie("tree_cookie");
        if(raw_data=getCookie("tree_data")){
            data=JSON.parse(raw_data);
            console.log("cookie data found");
        }
        else{
        // get_json return the data that is from server, if server sent json data then now we can JSON.parse(get_json())
            get_json();
            console.log("data from server");
        }
        //data['tree_cookie'][0]=tmp_cookie;

    }
}

function zoomIn(e){
    if(intial_zoom<2.5){
        intial_zoom+=zoom_step;
        document.getElementById("tree").style.transform=`scale(${intial_zoom})`;
    }
}
function zoomOut(e){
    if(intial_zoom>0.1){
        intial_zoom-=zoom_step;
    }
    document.getElementById("tree").style.transform=`scale(${intial_zoom})`;
}
function zoomReset(e){
    intial_zoom=1;
    document.getElementById("tree").style.transform=`scale(${intial_zoom})`;
}

// call back for get_json 
function callback(response, callback_arg){
    if(callback_arg=="get_json"){
        data=JSON.parse(response);
        document.getElementById('img_A').src="13.68.145.80/images/"+data['A'][1]+".png";
        return response;
    }
    else if(callback_arg=="delete_clicked"){
        // When delete clicked
    }
    
}

// Json send from get_json
function get_json(){
    var url = `http://13.68.145.80/main.php?user=${getCookie("tree_cookie")}&get_json=1`;

    var request = makeRequest('GET', url);
    
    sendActualRequest(request, callback_arg="get_json");
}

/* Cookie user logged or not */
// Create cookie
function createCookie(ck_name, expire,ck_for){
    var date = new Date();
    var currentTime = date.getTime();
    if(ck_for!="data"){
        var ck_value = md5(`${currentTime}${Math.round(Math.random()*1000)}`);
    }
    else{
        var ck_value = JSON.stringify(data);
    }
    date.setTime(date.getTime() + (expire*1000));
    document.cookie = `${ck_name}=${ck_value};expires=${date.toUTCString()};path=/`;
    //return ck_value;
}

// Delete cookie by name
function delete_cookie(ck_name) {
    document.cookie = ck_name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

///function to update data in cookie
function update_cache(){
    createCookie("tree_data",86400,"data");
}
// Get cookie value from cookie name
function getCookie(ck_name){
    var decodedCookie = decodeURIComponent(document.cookie);
    var each_cookie_item = decodedCookie.split(';');
    for(var i = 0; i <each_cookie_item.length; i++) {
        var val = each_cookie_item[i];
        while (val.charAt(0) == ' ') {
            val = val.substring(1);
        }
        if (val.indexOf(`${ck_name}=`) == 0) {
            return val.substring(`${ck_name}=`.length, val.length);
        }
    }
    return null;
}

// If cookie is set return true, false otherwise
function isCookieSet(ck_name='tree_cookie'){
    return document.cookie.indexOf(`${ck_name}=`)>=0;
}

///function that create a view division when popup happens
function view(id){
    var view_container=document.createElement("div");
    view_container.id="view_div";
    var edit_btn=document.createElement("button");
    edit_btn.innerHTML="edit";
    edit_btn.id="edit_btn";
    edit_btn.onclick=function(){
        popUpOpen("edit",id);
    }
    view_container.appendChild(edit_btn);
    // Image path of user image
    var imagePath = "13.68.145.80/images/"+data[id][1]+".png";
    view_container.style.backgroundImage = `url('${imagePath}')`;
    // div for name of user
    var div_0=document.createElement("div");
    div_0.id="view_name_div";
    div_0.innerHTML=data[id][0];
    view_container.appendChild(div_0);
    document.getElementById('popup_container').appendChild(view_container);
}

///function that create a edit division when popup happens
function edit(id){
    document.getElementById('popup_container').lastChild.remove();
    var edit_container=document.createElement("div");
    edit_container.id="edit_div";
    var div_0=document.createElement("div");
    var input_name=document.createElement("input");
        input_name.type="text";
        input_name.placeholder="Name";
        input_name.id="u_name";
        div_0.appendChild(input_name);
    var div_1=document.createElement("div");
    var input_image=document.createElement("input");
        input_image.type="file";
        input_image.id="u_image";
        div_1.appendChild(input_image);
    var button=document.createElement('button');
        button.id="submit_btn";
        button.innerHTML="Ok";
        button.onclick=function(){
            data_add(id);
        }
        edit_container.appendChild(div_0);
        edit_container.appendChild(div_1);
        edit_container.appendChild(button);
    document.getElementById('popup_container').appendChild(edit_container);
    document.getElementById('u_name').value=data[id][0];
    document.getElementById('u_image').value="";
    return 0; 
}

///function that create button element with desired onclick effect and return button object
function button_create(name,id){
    var button=document.createElement('BUTTON');
        button.innerHTML=name;
        button.style.visibility="hidden";
        button.onclick=function(){
        switch(name){
            case 'Add':
                position_add(id,0,0);
                break;
            case 'View':
                popUpOpen("view",id);
                break;
            case 'xpnd':
                expand(id);
                break;
            case 'del':
                delete_box(id);
                break;
            default:
                break;
        }
    }
    return button;
}

///function that add up boxes in desired position
function position_add(id,init,view_only){  ////view_only 1 for just viewing
    if(init==0){
        child=0;
        document.getElementById('btn_'+id+"_"+1).onclick=function(){
            position_add(id,1,0);
        }
    }
    else if(init!=0 && view_only!=1){
        child=data[id][2]+1;                                  ///problem here
        console.log("child assined parent index");
    }
    var box = document.createElement("div");
        box.id=id+String.fromCharCode(65+child);
        box.className="box";
        box.onclick=function(){
            appear_btn(box.id,1);
        }
    //increasing child box count
    if(!data[box.id]){
        console.log("data object created");
        data[box.id]=[];
        ///name is blank in first
        data[box.id][0]=""; 
        ///image location is blank in first                                                   
        data[box.id][1]="";
        data[box.id][2]=-1;
    }                                         
    var p_tag_to_enclose_btn = document.createElement("p");
    var button=button_create("Add",box.id);
        button.className="btn_1";
        button.id="btn_"+box.id+"_"+1;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("View",id+String.fromCharCode(65+child));
        button.className="btn_2";
        button.id="btn_"+box.id+"_"+2;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("xpnd",id+String.fromCharCode(65+child));
        button.className="btn_3";
        button.id="btn_"+box.id+"_"+3;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("del",id+String.fromCharCode(65+child));
        button.className="btn_4";
        button.id="btn_"+box.id+"_"+4;
        p_tag_to_enclose_btn.appendChild(button);
        box.appendChild(p_tag_to_enclose_btn);
    var image=document.createElement('img');
        image.alt=box.id;
        image.id="img_"+box.id;
        if(data[id][1]){
            image.src="13.68.145.80/images/"+data[id][1]+".png";
        }
        box.appendChild(image);
    var branch = document.createElement("li");
        branch.id="branch_"+id+String.fromCharCode(65+child);
        branch.className="branch";
        branch.appendChild(box);
    var ul=document.createElement('ul');
    //var ul_check=document.getElementById("ul_"+id);
    if((init == 0)){
        ul.id="ul_"+id;
        ul.appendChild(branch);
        document.getElementById("branch_"+id).appendChild(ul);
        console.log("init is 0");
    } 
    else {
        ul=document.getElementById("ul_"+id);
        if(!ul){
            expand(id);
            ul=document.getElementById("ul_"+id);
            console.log("ul created");
        }
        ul.appendChild(branch);
        console.log("init not 0");
    }
    if(view_only!=1){
        data[id][2]++;
        console.log("not view only");
        //alert(id+":"+data[id][2]);
    }
    update_cache();
    child++;
    var button=document.getElementById('btn_'+id+'_3');
    button.innerHTML="mrge";
    button.onclick=function(){
        merge(id);
    }
    // Many take documentElement
    document.documentElement.scrollTop=document.getElementById("tree").offsetHeight;
    // Some browsers take body
    document.body.scrollTop=document.getElementById("tree").offsetHeight;
}

///function to remove box
function position_remove(id){
    document.getElementById("ul_"+id).style.visibility="hidden";
}

///function to expand
function expand(id){
    var ul_branch=document.getElementById("ul_"+id);
    if(ul_branch){
        ul_branch.style.visibility="visible";  ///needed for ref#1
    }
    else{
        var expand_offset=0;
        for(expand_offset=0;expand_offset<=data[id][2];expand_offset++){
            position_add(id,expand_offset,1);
            //document.getElementById("img_"+id+String.fromCharCode(65+expand_offset)).src="images/"+getCookie("tree_cookie")+"_"+id+String.fromCharCode(65+expand_offset)+".png";
            console.log(expand_offset);
        }
    }
    var button=document.getElementById('btn_'+id+'_3');
    button.innerHTML="mrge";
    button.onclick=function(){
        merge(id);
    }
}

////function to merge
function merge(id){
    var merge_offset=0;
    var ul_object=document.getElementById("ul_"+id);
    if(ul_object){
        //ul_object.style.visibility="hidden";   ///some errors with this ref#1
        ul_object.remove();
    }
    var button=document.getElementById('btn_'+id+'_3');
    button.innerHTML="xpnd";
    button.onclick=function(){
        expand(id);
    }
}

///function that make button appears or dissappear when box is clicked
function appear_btn(id,action){
    var btn_offset=1;
    todo = action!=0 ? "visible" : "hidden";

    if(todo=="visible"){
        document.querySelector(`#${id} img`).className += " opacity-to-img";
    } else {
        document.querySelector(`#${id} img`).className = " ";
    }
    
    for(btn_offset=1;btn_offset<=4;btn_offset++){
        document.getElementById("btn_"+id+"_"+btn_offset).style.visibility=todo;
    }
    document.getElementById(id).onclick=function(){
        appear_btn(id,(action+1)%2);
    }
}

///function for making popup appear
function popUpOpen(type,id){
    document.getElementById("popup_div").style.display = "flex";
    if(type=="edit"){
        edit(id);
    }
    else if(type=="view"){
        view(id);
    }
}

///function for making popup dissappear
function popUpClose(){
    document.getElementById('popup_container').lastChild.remove();
    document.getElementById("popup_div").style.display = "none";
}

//function to push,edit array data
function data_add(id){
        data[id][0]=document.getElementById('u_name').value;
        okEditFormClicked(id);                                                           ///no else condition as no upload gives previous image
    popUpClose();
}

// Create the ajax request object.
function makeRequest(method, url) {
    var request = new XMLHttpRequest();
    if ("withCredentials" in request) {
        request.open(method, url, true);
    } 
    else if (typeof XDomainRequest != "undefined") {
        request = new XDomainRequest();
        request.open(method, url);
    } else {
        request = null;
    }
    return request;
}

// Send get request
function sendActualRequest(request, callback_arg=null, data=null){
    if(!request) {
        console.log('Request not supported');
        return;
    }
    // Handle the requests
    request.onreadystatechange = () => {
        if(request.readyState==4&&request.status==200){
            var response=request.responseText;
            if(response!=""&&!callback_arg){
                callback(response, callback_arg);
            }
        }
        else if(request.readyState==4&&request.status!=200){
            console.log("Error occured!!!");
        }
    };
    request.send(data);
}

// When ok button is clicked in edit
function okEditFormClicked(id){
    var file_is_present = document.getElementById('u_image').value.trim();

    if(file_is_present){
        var allData = new FormData();

        var image=document.getElementById('u_image');
        document.getElementById('img_'+id).src=window.URL.createObjectURL(image.files[0]);
        allData.append("u_image", image.files[0]);
        var image_id=getCookie("tree_cookie")+"_"+Date.now();
        data[id][1]=image_id;
        // Server to send data
        var url = `http://13.68.145.80/main.php?div_id=${image_id}`;

        var request = makeRequest('POST', url);
        if (!request) {
            return;
        }

        // Handle the requests
        request.onreadystatechange = () => {
            if(request.readystate == 4 && request.status == 200){
                return true;
            } else if(request.status != 200 && request.readystate == 4){
                return false;
            }
        };
        request.send(allData);
    }
    else {
        //alert("You have to choose image in order to save.");
        return false;
    }
}

function json_send(){
    var json_file=JSON.stringify(data);

    var formData = new FormData();
    formData.append('json_file', json_file);

    var url = `http://13.68.145.80/main.php?user=${getCookie("tree_cookie")}`;

    var request = makeRequest('POST', url);
        if (!request) {
            return;
        }

        // Handle the requests
        request.onreadystatechange = () => {
            if(request.readystate == 4 && request.status == 200){
                return true;
            } else if(request.status != 200 && request.readystate == 4){
                return false;
            }
        };
        request.send(formData);
}


function init(){

}

// Delete button clicked
function delete_clicked(){
    createCookie(ck_name="trash_data", expire=24*60*60, ck_for="data");
    delete_cookie(ck_name="tree_data");

    var url = `http://13.68.145.80/main.php?user=${getCookie("tree_cookie")}&delete=1`;

    var request = makeRequest('GET', url);
    request.onreadystatechange = () => {
        if(request.readystate == 4 && request.status == 200){
            window.location="";
            return true;
        } else if(request.status != 200 && request.readystate == 4){
            return false;
        }
    };

    // If success directly go to callback function
    sendActualRequest(request, callback_arg="delete_clicked");
}

///function to delete box
function delete_box(id){
    var tmp_id=id;
    tmp_id=tmp_id.split("");
    var rmv=tmp_id.pop();
        console.log(rmv+"::removed");
    tmp_id=tmp_id.join("");
    var parent=tmp_id;
    rmv=rmv.charCodeAt(0);
    var buffered_rmv=tmp_id+String.fromCharCode(rmv);
    rmv++;
    while((index_rmv=(tmp_id+String.fromCharCode(rmv))) && (a=data[index_rmv])){
        console.log("from "+index_rmv +" to "+buffered_rmv);
        data[buffered_rmv]=data[index_rmv];
        delete data[index_rmv];
        buffered_rmv=index_rmv;
        rmv++;
    }
    data[parent][2]--;
    console.log(tmp_id);
    merge(parent);
    expand(parent);
}