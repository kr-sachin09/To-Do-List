document.addEventListener("DOMContentLoaded" , ()=>{
    const input = document.getElementById("inputTask");
    const add = document.getElementById("addTask");
    const ulList = document.getElementById("ulList");

    let tasks= JSON.parse(localStorage.getItem("tasks")) ||[];
    tasks.forEach((task)=>renderTask(task));

    add.addEventListener("click",()=>{
        const taskText =input.value.trim();
        if (taskText === "") {
          return;
        };
        const newTask = {
            id : Date.now(),
            text : taskText,
            completed : false
        };
        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        input.value = "";


    })

    function renderTask(task){
        const li = document.createElement("li");
        li.setAttribute("dataID",task.id);
        if(task.completed){
            li.classList.add("completed")
        }
        li.innerHTML = `<span>${task.text}</span><button>delete</button>`;
        li.addEventListener("click",(e)=>{
            if(e.target.tagName === "BUTTON"){
                return;
            }
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTask();
        })

        li.querySelector("button").addEventListener("click",(e)=>{
            e.stopPropagation();
            tasks = tasks.filter((a)=>a.id !== task.id);
            li.remove();
            saveTask();
        });
        ulList.appendChild(li);
    }




    function saveTask(){
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }




})