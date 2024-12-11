let todoLsit=JSON.parse(localStorage.getItem('myTodo'))||[];
const userInput=document.querySelector('.todo-user-input');
const addBtn=document.querySelector(".add-todo-button");
const todoItemsContainer=document.querySelector("#todoItemsContainer");
const res=document.querySelector(".com");


function changeStyle(labelId){
  const checkedLabel=document.querySelector(`#${labelId}`);
  checkedLabel.classList.toggle("checked");
  const num=Number(labelId.slice(6,labelId.length));
  const liIndex=todoLsit.findIndex((eachTodo)=>{
    if( eachTodo.uniqueNum===num){
      return true;
    }else{
      return false;
    }
  });
  
  const todoObject=todoLsit[liIndex];

  
  if(todoObject.isCompleted===false){
    todoObject.isCompleted=true;
  }else{
    todoObject.isCompleted=false;
  }

  console.log(todoObject);


  completedCount();
  saveToLocalStorage();


}




function deleteTodo(todoId){
  const num=Number(todoId.slice(5,todoId.length));
  const selectedLi=document.getElementById(todoId);
  todoItemsContainer.removeChild(selectedLi);
  const newTodolist=[];
  todoLsit.forEach(todo => {
    
    if(todo.uniqueNum!==num){
      
      newTodolist.push(todo);
    }
  });

  todoLsit=newTodolist;
  saveToLocalStorage();
  completedCount();

}





function createTodo(todo){

  const todoId=`todo-${todo.uniqueNum}`;
  const inputId=`input-${todo.uniqueNum}`;
  const labelId=`label-${todo.uniqueNum}`;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoItemsContainer.appendChild(todoElement);
  todoElement.setAttribute('id',todoId);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);
  inputElement.setAttribute('id',inputId);



  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);
  
  let labelElement = document.createElement("label");
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);
  labelElement.setAttribute('for',inputId);
  labelElement.setAttribute('id',labelId);

  inputElement.onclick=()=>{
    changeStyle(labelId);
  }


  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);

  deleteIcon.onclick=()=>{
    deleteTodo(todoId);
  }

  if(todo.isCompleted){
    labelElement.classList.add("checked");
    inputElement.setAttribute('checked',true);
  }


}


for(let todo of todoLsit){
  createTodo(todo);
}

function saveToLocalStorage(){
  localStorage.setItem("myTodo",JSON.stringify(todoLsit));
}

saveToLocalStorage();




function getTodo(){
  const inputVal=userInput.value;
  if(inputVal.trim()===''){
    alert('Enter Valid Todo');
    return
  }

  let unq=JSON.parse(localStorage.getItem('unqCount')||0);
    unq+=1

    localStorage.setItem('unqCount',unq);

  todoLsit.push({
    text:inputVal,
    uniqueNum:unq,
    isCompleted:false
  });

  createTodo({
    text:inputVal,
    uniqueNum:unq,
    isCompleted:false
  })

  saveToLocalStorage();
  completedCount();

  userInput.value='';

}




addBtn.addEventListener('click',()=>{

  getTodo();

});

console.log(todoLsit);



function completedCount(){
  let count=0;
  if (todoLsit.length>0){
    todoLsit.forEach((todo)=>{
      if(todo.isCompleted){
        count+=1
      }
  
    })
  
    res.textContent=(`${count} Completed out of ${todoLsit.length}`);
  }else{
    res.textContent="";
  }



}

completedCount();
