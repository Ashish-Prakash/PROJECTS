let inputtodo = document.querySelector(".todo-input");
let addtodo = document.querySelector(".todo-button");
// console.log(addtodo);

addtodo.addEventListener("click", function(){
    addTodo();
});

addtodo.addEventListener("keypress", function(event){
    if(event.code == "ente  r"){
        addTodo();
    }
});
function addTodo(){
    let inputval = inputtodo.value;
    if(inputval){
        let listItem = document.createElement("list");
        listItem.classList.add("todo-item");
        let ptag = document.createElement("p");
        ptag.classList.add("todo");

    }
    else{
        alert("Enter todo");
    }
}
