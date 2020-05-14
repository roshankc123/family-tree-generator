i=0;
child=0;
var sec=['BCT','BEX','BCE','BAM','BME','BGE'];
function view(){
    return 0;
}
function edit(){
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
            view(id);
            break;
        case 'Edit':
            edit();
            break;
        default:
            break;
    }
    }
    return button;
}
function position_add(id,init,present_id){
    if(init==0){
        child=0;
        document.getElementById('btn_'+id+"_"+1).onclick=function(){
            position_add(id,1);
        }
    }
    var box = document.createElement("div");
        box.id=present_id;
        box.className="box";
        box.onclick=function(){
            appear_btn(box.id,1);
        }
    
    var p_tag_to_enclose_btn = document.createElement("p");
    var button=button_create("Add",box.id);
        button.className="btn_1";
        button.id="btn_"+box.id+"_"+1;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("View",box.id);
        button.className="btn_2";
        button.id="btn_"+box.id+"_"+2;
        p_tag_to_enclose_btn.appendChild(button);
    var button=button_create("Edit",box.id);
        button.className="btn_3";
        button.id="btn_"+box.id+"_"+3;
        p_tag_to_enclose_btn.appendChild(button);
        box.appendChild(p_tag_to_enclose_btn);
    var image=document.createElement("img");
        image.src="http://202.70.84.165/img/student/"+box.id+".jpg";
        image.alt=box.id;
        image.width="130";
        image.height="130";
        box.appendChild(image);
    var branch = document.createElement("li");
        branch.id="branch_"+box.id;
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
function start(){
    var offset=0;
    var memory_1;
    var memory_2;
    var off_sec;
    var off_index;
    while(offset<=2){
        memory_1='PAS07'+(4+offset);
        position_add('PAS',offset,memory_1);
        off_sec=0;
        while(sec[off_sec]){
            memory_2=memory_1+sec[off_sec];
            position_add(memory_1,off_sec,memory_2);
            off_index=1;
            while(off_index<=48){
                position_add(memory_2,off_index-1,memory_2+"0"+(((off_index)-(off_index%10))/10)+(off_index%10));
                document.getElementById('top').innerHTML=(memory_2+"0"+(((off_index)-(off_index%10))/10)+(off_index%10));
                off_index++;
            }
        off_sec++;
        }
        offset++;
    }
}


///function that create a view division when popup happens
function view(id){
    document.getElementById("popup_div").style.display = "flex";
    var view_container=document.createElement("div");
    view_container.id="view_div";
    // Image path of user image
    if(id){
        imagePath="http://202.70.84.165/img/student/"+id+".jpg";
    }
    else{
        imagePath="";
    }
    if(imagePath){
        view_container.style.backgroundImage = `url('${imagePath}')`;
    }
    // div for name of user
    var div_0=document.createElement("div");
    div_0.id="view_name_div";
    div_0.innerHTML=id;
    view_container.appendChild(div_0);
    document.getElementById('popup_container').appendChild(view_container);
}

///function for making popup dissappear
function popUpClose(){
    document.getElementById('popup_container').lastChild.remove();
    document.getElementById("popup_div").style.display = "none";
}