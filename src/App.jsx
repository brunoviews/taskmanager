import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./App.css";
import Board from "./components/Board";

const getDefaultBoards = () => [
  {
    id: 1,
    name: "Proyecto de desarrollo",
    lists: [
      {
        id: 1,
        name: "Por hacer",
        tasks: [
          { id: 1, title: "Configurar proyecto", assignee: "Bruno" },
          { id: 2, title: "Crear componentes", assignee: "Alex" },
        ],
      },
      {
        id: 2,
        name: "En progreso",
        tasks: [],
      },
      {
        id: 3,
        name: "Completado",
        tasks: [],
      },
    ],
  },
];

const App = () => {
  const [boards, setBoards] = useState([]);
  const changeBoardTitle = (boardId, newTitle) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId ? { ...board, name: newTitle } : board
      )
    );
  };

  // Cargar los tableros desde localStorage al iniciar
  useEffect(() => {
    const storedBoards = localStorage.getItem("boards");
    if (storedBoards) {
      try {
        const parsedBoards = JSON.parse(storedBoards);
        // Validar que los datos sean un array de objetos con propiedades válidas
        if (
          Array.isArray(parsedBoards) &&
          parsedBoards.every(
            (board) => board?.id && board?.name && board?.lists
          )
        ) {
          setBoards(parsedBoards);
        } else {
          throw new Error("Datos inválidos en localStorage");
        }
      } catch (error) {
        console.error("Error al cargar los datos de localStorage:", error);
        localStorage.removeItem("boards"); // Limpia datos corruptos
        setBoards(getDefaultBoards());
      }
    } else {
      setBoards(getDefaultBoards());
    }
  }, []);

  // Guardar los tableros en localStorage cada vez que cambien
  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem("boards", JSON.stringify(boards));
    }
  }, [boards]);

  // Estado inicial por defecto

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = boards[0].lists.find(
      (list) => list.id === parseInt(source.droppableId)
    );
    const destinationList = boards[0].lists.find(
      (list) => list.id === parseInt(destination.droppableId)
    );

    const [movedTask] = sourceList.tasks.splice(source.index, 1);
    destinationList.tasks.splice(destination.index, 0, movedTask);

    setBoards([...boards]);
  };

  const addTaskToList = (listId, title) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: [
                  ...list.tasks,
                  {
                    id: Date.now(),
                    title,
                    assignee: "Sin asignar",
                  },
                ],
              }
            : list
        ),
      }))
    );
  };

  const deleteTask = (listId, taskId) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.filter((task) => task.id !== taskId),
              }
            : list
        ),
      }))
    );
  };

  const assignTaskToPerson = (listId, taskId, assignee) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === taskId ? { ...task, assignee } : task
                ),
              }
            : list
        ),
      }))
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app-container">
        <h1 className="app-title">Gestión de Tareas</h1>
        <div className="boards-container">
          {boards.length > 0 ? (
            boards.map((board) =>
              board ? (
                <Board
                  key={board.id}
                  board={board}
                  addTaskToList={addTaskToList}
                  deleteTask={deleteTask}
                  assignTaskToPerson={assignTaskToPerson}
                  changeBoardTitle={changeBoardTitle}
                />
              ) : null
            )
          ) : (
            <p>Cargando datos...</p>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
