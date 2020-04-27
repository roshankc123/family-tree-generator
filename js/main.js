
i=0;
child=0;

///initilize associative array that is in data['box_id'] format
var data={};

//initilize numeric array for main initial box that has constant id A
data['A']=[];
data['tree_data']=[];
/* Cookie user logged or not */
// Create cookie
function createCookie(ck_name='tree_data', expire=365*10){
    // expire == 10yrs
    var date = new Date();
    var currentTime = date.getTime();
    // string of current time and random number 
    var ck_value = md5(`${currentTime}${Math.round(Math.random()*1000)}`);
    date.setTime(date.getTime() + (expire*24*60*60*1000));
    var expires = date.toUTCString();
    document.cookie = `${ck_name}=${ck_value};expires=${expires};path=/`;
    return ck_value;
}

// Get cookie value from cookie name
function getCookie(ck_name='tree_data'){
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
function isCookieSet(ck_name='tree_data'){
    return document.cookie.indexOf(`${ck_name}=`)>=0;
}

// When window is loaded then only
window.onload = () => {
    if(!isCookieSet()){
        data['tree_data'][0]=createCookie();
    } else {
        data['tree_data'][0]=getCookie();
    }
}

///function that create a view division when popup happens
function view(id){
    var view_container=document.createElement("div");
    view_container.id="view_div";
    // Image path of user image
    var imagePath = data[id][1];
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
            position_add(id,0);
            break;
        case 'View':
            popUpOpen("view",id);
            break;
        case 'Edit':
            popUpOpen("edit",id);
            break;
        default:
            break;
    }
    }
    return button;
}

///function that add up boxes in desired position
function position_add(id,init){
    if(init==0){
        child=0;
        document.getElementById('btn_'+id+"_"+1).onclick=function(){
            position_add(id,1);
        }
    }
    var box = document.createElement("div");
        box.id=id+String.fromCharCode(65+child);
        box.className="box";
        box.onclick=function(){
            appear_btn(box.id,1);
        }
    data[box.id]=[];
    ///name is blank in first
    data[box.id][0]=""; 
    ///image location is blank in first                                                   
    data[box.id][1]="";                                                    
    var p_tag_to_enclose_btn = document.createElement("p");
    var button=button_create("Add",box.id);
        button.className="btn_1";
        button.id="btn_"+box.id+"_"+1;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("View",id+String.fromCharCode(65+child));
        button.className="btn_2";
        button.id="btn_"+box.id+"_"+2;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("Edit",id+String.fromCharCode(65+child));
        button.className="btn_3";
        button.id="btn_"+box.id+"_"+3;
        p_tag_to_enclose_btn.appendChild(button);
        box.appendChild(p_tag_to_enclose_btn);
    var image=document.createElement('img');
        image.alt=box.id;
        image.id="img_"+box.id;
        box.appendChild(image);
    var branch = document.createElement("li");
        branch.id="branch_"+id+String.fromCharCode(65+child);
        branch.className="branch";
        branch.appendChild(box);
    if((init == 0)){
        var ul=document.createElement('ul');
        ul.id="ul_"+id;
        ul.appendChild(branch);
        document.getElementById("branch_"+id).appendChild(ul);
    } else {
        var ul=document.getElementById("ul_"+id);
        ul.appendChild(branch);

    }
    child++;
}

///function that make button appears or dissappear when box is clicked
function appear_btn(id,action){
    var btn_offset=1;
    todo = action!=0 ? "visible" : "hidden";

    if(todo=="visible"){
        try{
            document.querySelector(`#${id} img`).className += " opacity-to-img";
        } catch (exception){
            console.log("Unable to add img tag not added");
        }
    } else {
        try{
            document.querySelector(`#${id} img`).className = " ";
        } catch (exception){
            console.log("Unable to get img tag not added");
        }
    }
    
    for(btn_offset=1;btn_offset<=3;btn_offset++){
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
        document.getElementById('img_'+id).src=data[id][1];
    popUpClose();
}

// Create the ajax request object.
function makeRequest(method, url) {
    var request = new XMLHttpRequest();
    if ("withCredentials" in request) {
        // request for modern browsers
        request.open(method, url, true);
    } 
    else if (typeof XDomainRequest != "undefined") {
        // request for older IE browsers
        request = new XDomainRequest();
        request.open(method, url);
    } else {
        // CORS not supported.
        request = null;
    }
    return request;
}

// When ok button is clicked in edit
function okEditFormClicked(id){
    var file_is_present = document.getElementById('u_image').value.trim();

    if(file_is_present){
        // All data from the form
        var allData = new FormData();

        var image=document.getElementById('u_image');
        ///uploaded image local url create and assigned
        data[id][1]=window.URL.createObjectURL(image.files[0]);
        allData.append("u_image", image.files[0]);

        // Server to send data
        var url = `http://40.71.91.158/api/main.php?div_id=${data['tree_data'][0]+"_"+id}`;

        var request = makeRequest('POST', url);
        if (!request) {
            console.log('Request not supported');
            return;
        }

        // Handle the requests
        request.onreadystatechange = () => {
            if(this.readystate == 4 && this.status == 200){
                var response = JSON.parse(this.responseText);
                return true;
            } else if(this.status != 200 && this.readystate == 4){
                console.log("Some error occured");
                return false;
            }
        };
        request.send(allData);
    }
    else {
        alert("You have to choose image in order to save.");
        return false;
    }
}

function json_send(){
    var json_file=JSON.stringify(data);

    var url = `http://40.71.91.158/api/main.php?user=${getCookie()}`;
    var request = makeRequest('POST', url);
    if(!request) {
        console.log('Request not supported');
        return;
    }

    // Handle the requests
    request.onreadystatechange = () => {
        if(this.readystate == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);
            alert("Data stored successfully");
            return true;
        } else if(this.status != 200 && this.readystate == 4){
            console.log("Some error occured");
            return false;
        }
    };
    request.send({"json_file": json_file});
}

