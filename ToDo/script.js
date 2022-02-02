let inputtodo = document.querySelector(".todo-input");
let list = document.querySelector("#list");

inputtodo.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        
        let li = document.createElement("li");
        let task = e.currentTarget.value;
        if(task){
            li.innerHTML = task;
            list.append(li);
            e.currentTarget.value = "";
            li.addEventListener("dblclick", function(e){
                e.currentTarget.remove();
            })
        }
    }
})