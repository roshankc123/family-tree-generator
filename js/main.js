i=0;
child=0;
var data={};
data['A']=[];
function view(){
    return 0;
}
function edit(id){
    document.getElementById('form_div_name').value="";
    document.getElementById('form_div_image').value="";
    data[id]=[];
    //document.getElementsByTagName("body")[0].style.overflow = "hidden";
    document.getElementById("top-edit-form").style.display = "flex";
    document.getElementById('form_div_btn').onclick=function(){
        data_add(id);
    }
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
            view();
            break;
        case 'Edit':
            edit(id);
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
function popUpOpen(){
    document.getElementById('edit_form').style.visibility="visible";
}
function popUpClose(){
    //document.getElementsByTagName("body")[0].style="";
    document.getElementById("top-edit-form").style.display = "none";
}
function data_add(id){
    data[id][0]=document.getElementById('form_div_name').value;
    var image=document.getElementById('form_div_image');
    if(image.value){
    data[id][1]=window.URL.createObjectURL(image.files[0]);
    }
    else{
        data[id][1]="";
    }
    document.getElementById('img_'+id).src=data[id][1];
    popUpClose();
}
function ok(){
    var a=document.getElementById('form_div_image');
    document.getElementById('img_1').src=window.URL.createObjectURL(a.files[0]);
    
    alert(window.URL.createObjectURL(a.files[0]));
}
