import React from "react";
import "./TaskCard.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index, deleteTask, listId, assignTask }) => {
  const handleAssign = (e) => {
    assignTask(listId, task.id, e.target.value);
  };
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4 className="task-card-title">{task.title}</h4>
          <p className="task-card-assignee">Asignado a: {task.assignee}</p>
          <select
            className="assign-task-select"
            value={task.assignee}
            onChange={handleAssign}
          >
            <option value="Bruno">Bruno</option>
            <option value="Alex">Alex</option>
            <option value="Maria">Maria</option>
            <option value="Maria">Javier</option>
            <option value="Maria">Antonio</option>
            <option value="Maria">David</option>
            <option value="Maria">Vicente</option>
            <option value="Sin asignar">Sin asignar</option>
          </select>
          <button
            className="delete-task-button"
            onClick={() => deleteTask(listId, task.id)}
          >
            Eliminar
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
