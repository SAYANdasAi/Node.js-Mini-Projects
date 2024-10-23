const fs = require('fs');
const filepath = "./todo/tasks.json"

const loadTask = () => {
    try {
       const dataBuffer = fs.readFileSync(filepath); 
       const dataJSON = dataBuffer.toString();
       return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTask = (task) => {
    const dataJSON = fs.writeFileSync(filepath,JSON.stringify(task));
}

const addTask = (task) => {
    const tasks = loadTask();
    tasks.push({task});
    saveTask(tasks);
    console.log("Task added",task)
}

const listTask = () =>{
    const tasks = loadTask();
    tasks.forEach((task,index) => console.log(`${index + 1} - ${task.task}`));
}

const removeTask = (index) => {
    const tasks = loadTask();
    tasks.forEach( task => {
        tasks.splice(index,1);
    })
    saveTask(tasks);
    console.log(`Successfully removed`);
}

const command = process.argv[2]
const argument = process.argv[3]

if(command === 'add'){
    addTask(argument);
}else if(command === 'list'){
    listTask();
}else if(command === 'remove'){
    removeTask(parseInt(argument));
}else{
    console.log("Command not found!");
}