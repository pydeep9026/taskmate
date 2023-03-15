
import React, { useEffect, useState } from 'react'
import './task.css'
import toast, { Toaster } from 'react-hot-toast';
import mediaclip from './mediaclip.png'
import submit from './submit.png'



function Task() {
    const [editTaskId, setEditTaskId] = useState(0);
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('taskList')) || []);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [newdesc,setnewdesc]=useState("")
    const [newpriority,setnewpriority]=useState("Null")
    const [newdeadline,setnewdeadline]=useState("")

const toggleList = (taskId) => {
    if (openMenuId === taskId) {
        setOpenMenuId(null);
    } else {
        setOpenMenuId(taskId);
    }
}



    const handleFormSubmit = (event) => {
        event.preventDefault();    
        if(editTaskId){
          const date = new Date();
          const today = new Date();
          const selectedTask = taskList.find(task => task.id === editTaskId);
          const dateString = date.toLocaleDateString() === today.toLocaleDateString()
          ? `today at ${date.toLocaleTimeString()}`
          : `${date.toLocaleDateString()} at ${date.toLocaleTimeString}`;
          const updatedTaskList = taskList.map((task) => (
            task.id === selectedTask.id ? 
            {id: date.getTime(), name: newTask,desc:newdesc, time: dateString ,priority:newpriority,deadline:newdeadline}
            : task));
          
          setTaskList(updatedTaskList);
          setEditTaskId(0);
          setNewTask("");
          setnewdesc("")
          setnewpriority("")
          setnewdeadline("")
        }
    
        if(newTask,newdesc,newpriority,newdeadline){
          const date = new Date();
          const today =new Date()
          const dateString = date.toLocaleDateString() === today.toLocaleDateString()
          ? `today at ${date.toLocaleTimeString()}`
          : `${date.toLocaleDateString()} at ${date.toLocaleTimeString}`;
          setTaskList([...taskList, {id: date.getTime(), name: newTask,desc:newdesc, time: dateString ,priority:newpriority,deadline:newdeadline}]);
          setNewTask("");
          setnewdesc("")
          setnewpriority("")
          setnewdeadline("")
        }else{
            toast.error("fill all fields before submitting")
        }
        
      }

      



      const handleEdit = (taskId) => {
        const selectedTask = taskList.find(task => task.id === taskId);
        setNewTask(selectedTask.name);
        setnewdesc(selectedTask.desc)
        setnewpriority(selectedTask.priority)
        setnewdeadline(selectedTask.deadline)
        if(selectedTask){
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        setTaskList(updatedTaskList);
        setNewTask(selectedTask.name);
        setnewdesc(selectedTask.desc)
        setnewpriority(selectedTask.priority)
        setnewdeadline(selectedTask.deadline)
      }
      }


      const handleDelete = (taskId) => {
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        setTaskList(updatedTaskList);
      }

      useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
        const sortedTasks = [...taskList].sort((taskA, taskB) => {
            const priorityValues = { high: 3, medium: 2, low: 1 };
            const priorityA = priorityValues[taskA.priority];
            const priorityB = priorityValues[taskB.priority];
            return priorityB - priorityA;
          })
          setTaskList(sortedTasks)
      }, [taskList]);
    







  return (<>
  <Toaster />
  <div className='taskcontainer'>
    <section className='showTask'>
    <p className="head">
        <span>
            <span className="title">Todo</span>
            <span className="count">{taskList.length}</span>
        </span>
        <span style={{color:"#b3b8bf"}}>project</span>
        <span style={{color:"#b3b8bf"}}>Team</span>
        <span className="clearAll" onClick={() => setTaskList([])}>Clear All</span>
    </p>

    <ul>
        {taskList.map((task) =>(
            <li key={task.id}>
                <p>
                {task.priority === "high" && <span className="highname">{task.name} <div className='due'>due by {task.deadline}</div></span>}
                {task.priority === "medium" && <span className="mediumname">{task.name} <div className='due'>due by {task.deadline}</div></span>}
                {task.priority === "low" && <span className="lowname">{task.name} <div className='due'>due by {task.deadline}</div></span>}

                    <span>{task.desc}</span>
                    <span className="time">{task.time}</span>
                </p>
                <i className="bi bi-three-dots-vertical"  onClick={() => toggleList(task.id)}></i>
                {  openMenuId === task.id &&
                <div className='menu'>
                <span onClick={() => handleEdit(task.id)}>edit</span>
                <span onClick={() => handleDelete(task.id)}>delete</span>
                </div>
                }
            </li>
        ))}
        </ul>
</section>
<section className='addTask'>
          <form onSubmit={handleFormSubmit}>
            <input type="text" name="task" value={newTask} autoComplete="off" placeholder="add task" maxLength="25" onChange={(e) => setNewTask(e.target.value)}/>
            <input type="text" name="task" value={newdesc} autoComplete="off" placeholder="add description" maxLength="80" onChange={(e) => setnewdesc(e.target.value)}/>
            <img src={mediaclip}/>
            <button className='fakebutton'>{ editTaskId ? "~+" : "+"}</button>
            <button className='formsubmit' type='submit'><img src={submit} alt="submit"/></button>
            <div className='subform'>
                <div className='priorityform'>
            <label for="priority">Choose priority:</label>
            <select className="priority" onChange={(e) => setnewpriority(e.target.value)} >
            <option value="null">Null</option>
               <option value="high">High</option>
               <option value="medium">Medium</option>
               <option value="low">Low</option>
            </select>
            </div>
            <div className='deadlineform'>
            <label for="deadline">Select Deadline:</label>
            <input type="date" className="deadline" name="deadline" onChange={(e) => setnewdeadline(e.target.value)}/>
            </div>
            </div>
          </form>
</section>
</div>
</>
  )
}

export default Task