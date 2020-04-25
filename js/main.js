i=0;
child=0;
var data={};
data['A']=[];
function view(){
    return 0;
}
function edit(id){
    var edit_container=document.createElement("div");
        edit_container.id="edit_container";
    var div_0=document.createElement("div");
    var input_name=document.createElement("input");
        input_name.type="text";
        input_name.placeholder="name";
        input_name.id="u_name";
        div_0.appendChild(input_name);
    var div_1=document.createElement("div");
    var input_image=document.createElement("input");
        input_image.type="file";
        input_image.id="u_image";
        div_1.appendChild(input_image);
    var button=document.createElement('button');
        button.id="submit_btn";
        button.innerHTML="ok";
        button.onclick=function(){
            data_add(id);
        }
        edit_container.appendChild(div_0);
        edit_container.appendChild(div_1);
        edit_container.appendChild(button);
    document.getElementById('popup_div').appendChild(edit_container);
    //input_name.remove();
    document.getElementById('u_name').value=data[id][0];
    document.getElementById('u_image').value="";
    //document.getElementsByTagName("body")[0].style.overflow = "hidden";
    return 0; 
}
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
function popUpOpen(type,id){
    //document.getElementById('edit_form').style.visibility="visible";
    document.getElementById("popup_div").style.display = "flex";
    if(type=="edit"){
        edit(id);
    }
    else if(type=="view"){
        view(id);
    }
    //document.getElementById(type+'-container').style.visibility="visible";
}
function popUpClose(){
    //document.getElementsByTagName("body")[0].style="";
    document.getElementById('popup_div').lastElementChild.remove();
    document.getElementById("popup_div").style.display = "none";
}
function data_add(id){
    data[id][0]=document.getElementById('u_name').value;
    var image=document.getElementById('u_image');
    if(image.value){
    data[id][1]=window.URL.createObjectURL(image.files[0]);
    }
    else{
        data[id][1]="";
    }
    document.getElementById('img_'+id).src=data[id][1];
    popUpClose("edit");
}
function ok(){
    var a=document.getElementById('u_image');
    document.getElementById('img_1').src=window.URL.createObjectURL(a.files[0]);
    
    alert(window.URL.createObjectURL(a.files[0]));
}
