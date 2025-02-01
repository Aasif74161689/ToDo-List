import React, { useState } from "react";
import "./styles.css";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  function addTask() {
    if (task === "") return;
    const newTodo = {
      text: task,
      id: Date.now(),
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTask("");
  }

  function deleteTask(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const handleComplete = (id) => {
    const updatedtodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedtodos);
  };

  const handleUpdateTask = (id) => {
    if (task === "") return;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: task,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
    setTask("");
    setSelectedTodoId(null);
  };

  const handleSelectTodo = (id) => {
    setSelectedTodoId(id);
    const selectedTodo = todos.find((todo) => todo.id === id);
    if (selectedTodo) {
      setTask(selectedTodo.text);
    }
  };

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        {selectedTodoId ? ( // Update button if a todo is selected
          <button
            className="update-button"
            onClick={() => handleUpdateTask(selectedTodoId)}
          >
            Update
          </button>
        ) : (
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        )}
      </div>

      <ol>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span
              className="task"
              onClick={() => handleComplete(todo.id)}
              style={{ textDecoration: todo.completed && "line-through" }}
            >
              {todo.text}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteTask(todo.id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleSelectTodo(todo.id)}
            >
              Update
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
