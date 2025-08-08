import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newPriority, setNewPriority] = useState(todo.priority || 'Medium');
  const [newDueDate, setNewDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    if (newText.trim() === '') return;
    onEdit(todo.id, newText, newPriority, newDueDate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewText(todo.text);
    setNewPriority(todo.priority);
    setNewDueDate(todo.dueDate);
    setIsEditing(false);
  };

  const priorityColors = {
    High: '#ff4d4f',
    Medium: '#faad14',
    Low: '#52c41a',
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      style={{
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isOverdue ? '#ffe6e6' : 'transparent', // Light red background if overdue
        padding: '6px',
        borderRadius: '4px',
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{ marginRight: '5px' }}
          />

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            style={{ marginRight: '5px' }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            style={{ marginRight: '5px' }}
          />

          <button type="button" onClick={handleSave} style={{ marginRight: '5px' }}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            onClick={() => onToggle(todo.id)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginRight: '10px',
              color: isOverdue ? '#d9363e' : 'inherit', // Red text if overdue
              flexGrow: 1,
            }}
          >
            {todo.text}
          </span>

          {todo.dueDate && (
            <span style={{ fontSize: '0.8em', marginRight: '10px', color: isOverdue ? '#d9363e' : '#888' }}>
              Due: {todo.dueDate}
            </span>
          )}

          <span
            style={{
              backgroundColor: priorityColors[todo.priority],
              color: '#fff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.8em',
              marginRight: '10px',
              minWidth: '60px',
              textAlign: 'center',
            }}
          >
            {todo.priority}
          </span>

          <button type="button" onClick={() => setIsEditing(true)} style={{ marginRight: '5px' }}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
