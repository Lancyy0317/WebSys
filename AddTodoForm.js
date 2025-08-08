import React, { useState } from 'react';

function AddTodoForm({ onAddTodo, existingTodos = [] }) {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Personal'); // NEW

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = inputText.trim();

    if (trimmedText === '') return;

    const isDuplicate = existingTodos.some(
      (todo) => todo.text.toLowerCase() === trimmedText.toLowerCase()
    );
    if (isDuplicate) return;

    onAddTodo({
      text: trimmedText,
      priority,
      dueDate,
      category, // PASS CATEGORY
    });

    // Reset form
    setInputText('');
    setPriority('Medium');
    setDueDate('');
    setCategory('Personal');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form" style={{ marginBottom: '10px' }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a new TODO..."
        style={{ marginRight: '5px' }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginRight: '5px' }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: '5px' }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: '5px' }}
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Add TODO</button>
    </form>
  );
}

export default AddTodoForm;
