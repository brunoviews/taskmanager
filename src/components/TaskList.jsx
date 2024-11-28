import React, { useState } from "react";
import "./TaskList.css";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskList = ({ list, addTask, deleteTask, assignTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(list.id, newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <Droppable droppableId={list.id.toString()}>
      {(provided) => (
        <div
          className="task-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h3 className="task-list-title">{list.name}</h3>
          {list.tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              deleteTask={deleteTask}
              assignTask={assignTask} // Pasamos la función aquí
              listId={list.id}
            />
          ))}
          {provided.placeholder}
          <div className="add-task-form">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Nueva tarea..."
              className="add-task-input"
            />
          </div>
          <button onClick={handleAddTask} className="add-task-button">
            Añadir
          </button>
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
