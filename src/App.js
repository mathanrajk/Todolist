import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [text, settext] = useState("");
  const [todolist, settodolist] = useState([]);
  const textadd = (e) => {
    settext(e.target.value)
  }
  const addlist = () => {
    if (text.trim() !== "") {
      settodolist((prev) => [...prev, { id: uuidv4(), taskname: text, isComplete: false }]);
      settext(""); // Clear the input field
    } else {
      // Optionally, handle the case where the text is empty
      alert("Please enter a task.");
    }
  }
  const iscomplate = (taskId) => {
    settodolist((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, isComplete: !task.isComplete }  // Corrected 'isComplete' here
          : task
      )
    );
  }
  return (
    <div className="main_container">
      <h1 className='title'> TODO LIST </h1>

      <div className='text_conntainter'>
        <input type="text" className='textbox' onChange={(e) => textadd(e)} value={text} />
        <button className='complate' onClick={addlist}>  Add </button>
      </div>
      <div className='showlist'>
        {
          todolist.map((task) => {
            return <div className='showcontainter' key={task.id}>
              <p style={{
                textDecoration: task.isComplete ? 'line-through' : 'none',  // Strikethrough completed tasks
                color: task.isComplete ? 'gray' : 'white'  // Optional: color change for completed tasks
              }}
              >{task.taskname}</p>
              <button className='complate' onClick={() => iscomplate(task.id)}>{task.isComplete ? "undo " : " completed"}</button>
            </div>
          })
        }


      </div>
    </div>
  );
}

export default App;
