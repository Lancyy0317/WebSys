import React, { useState } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from './AddTodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const sortByPriority = (todoList) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return todoList.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const addTodo = ({ text, priority, dueDate, category }) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    priority,
    dueDate,
    category,
  };
  setTodos((prev) => sortByPriority([...prev, newTodo]));
};


  const toggleTodo = (id) => {
    setTodos((prev) =>
      sortByPriority(
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText, newPriority, newDueDate) => {
    setTodos((prev) =>
      sortByPriority(
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, text: newText, priority: newPriority, dueDate: newDueDate }
            : todo
        )
      )
    );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Add TODO List</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <AddTodoForm onAddTodo={addTodo} existingTodos={todos} />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
