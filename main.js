
    i=0;
    child=0;
    var data={};
    data['A']=[];
    function view(){
        return 0;
    }
    function edit(id){
        data_add(id);
        return 0;
    }
    function button_create(name,id){
        var button=document.createElement('BUTTON');
            button.innerHTML=name;
            button.style.visibility="hidden";
            button.onclick=function(){
            switch(name){
            case 'add':
                position_add(id,0);
                break;
            case 'view':
                view();
                break;
            case 'edit':
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
        var box = document.createElement("span");
            box.id=id+String.fromCharCode(65+child);
            box.className="box";
            box.onclick=function(){
                appear_btn(box.id,1);
            }
        var button=button_create("add",box.id);
            button.className="btn_1";
            button.id="btn_"+box.id+"_"+1;
            box.appendChild(button);
        var button=button_create("view",box.id);
            button.className="btn_2";
            button.id="btn_"+box.id+"_"+2;
            box.appendChild(button);
        var button=button_create("edit",box.id);
            button.className="btn_3";
            button.id="btn_"+box.id+"_"+3;
            box.appendChild(button);
        var box_p = document.createElement("p");
            box_p.innerHTML=box.id;
            box.appendChild(box_p);
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
        array_name=box.id;
        data[box.id]=[];
        child++;
    }
    function appear_btn(id,action){
        var btn_offset=1;
        if(action!=0){
            todo="visible";
        }
        else{
            todo="hidden";
        }
        for(btn_offset=1;btn_offset<=3;btn_offset++){
            document.getElementById("btn_"+id+"_"+btn_offset).style.visibility=todo;
        }
        document.getElementById(id).onclick=function(){
            appear_btn(id,(action+1)%2);
        }
    }
    function data_add(id){
        data[id][0]="aye";
        data[id][1]="bey";
    }