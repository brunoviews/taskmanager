import React, { useState } from "react";
import "./Board.css";
import TaskList from "./TaskList";

const Board = ({
  board,
  addTaskToList,
  deleteTask,
  assignTaskToPerson,
  changeBoardTitle,
}) => {
  const [newTitle, setNewTitle] = useState("");

  const handleTitleChange = () => {
    if (newTitle.trim()) {
      changeBoardTitle(board.id, newTitle);
      setNewTitle(""); // Limpiar el campo después de actualizar
    }
  };

  return (
    <div className="board">
      <h2 className="board-title">{board.name}</h2>
      <input
        className="change-title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Nuevo nombre del tablero"
      />
      <button className="change-title-button" onClick={handleTitleChange}>
        Cambiar nombre
      </button>
      <div className="board-lists-container">
        {board.lists.map((list) => (
          <TaskList
            key={list.id}
            list={list}
            addTask={addTaskToList}
            deleteTask={deleteTask}
            assignTask={assignTaskToPerson}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
