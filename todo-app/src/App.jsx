import React, {useState} from 'react';

function App() {

  const [tasks, setTask] = useState([]);
  const [taskName, setName] = useState("");
  const [taskContent, setContent] = useState("");
  const [filterName, setFilter] = useState("all");

  function taskNameChange(event){
    setName(event.target.value);
  }

  function taskContentChange(event){
    setContent(event.target.value);
  }

  function addTask(){
    if(taskName.length > 0 && taskContent.length > 0){
      const newTask = {name: taskName,
                      content: taskContent, 
                      isDone: false,
                      show: true
                      }
      
      setTask(t => [...tasks, newTask]);
      setName("");
      setContent("");
    }
    else{
      alert("Nazwa zadania i/lub jego opis nie mogą być puste!");
    }
  }

  function deleteTask(i){
    setTask((t) => t.filter((_, index) => index != i));
  }

  function toggleIsDone(i){
    let temp = [...tasks];

    temp[i].isDone = !temp[i].isDone;
    setTask(temp);
  }

  React.useEffect(() =>{
    let temp = [...tasks];
    switch(filterName){
      case "all": temp.forEach(i => i.show = true); break;
      case "active": temp.forEach(i => (i.isDone ? i.show = false : i.show=true)); break;
      case "done": temp.forEach(i => (i.isDone ? i.show = true : i.show=false)); break;
    }

    setTask(t => temp);
  }, [filterName, JSON.stringify(tasks)]);

  return (
    <>
        <div className="task_inputs">
          <input type="text" value={taskName} placeholder='Nazwa zadania' onChange={taskNameChange}/>
          <textarea value={taskContent} placeholder='Opis zadania' onChange={taskContentChange}/>
          <button onClick={() => addTask()}>Dodaj zadanie</button>
          <div className='filter_con'>
            <label htmlFor="filter">Filtrowanie:</label>
            <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Wszystkie</option>
              <option value="active">W trakcie wykonywania</option>
              <option value="done">Wykonane</option>
            </select>
          </div>
        </div>
        <div className="tasks_con">
          {
          tasks.map((t, index) => 
            <div key={index} className={"task_con " + (t.isDone ? "task_con_done" : "") + (t.show ? " task_active" : "")}>
              <div className="task_left">
                <button className="btn_isDone "onClick={() => toggleIsDone(index)}>{t.isDone && <i className="fa-solid fa-check"></i>}</button>
              </div>
              <div className="task_middle">
                <h1 className="task_title">{t.name}</h1>
                <p className="task_content">{t.content}</p>
              </div>
              <div className="task_right">
                <button className="btn_del" onClick={() => deleteTask(index)}><i className="fa-solid fa-trash"></i></button>
              </div>
          </div>)}
        </div>
    </>
  )
}

export default App
