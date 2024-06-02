import React, { useState, useEffect } from 'react';

const TodoList2 = () => {
  const host = 'https://playground.4geeks.com/todo';
  const user = 'Gabriela';

  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // PUT
  const traerTareas = async () => {
    try {
      const uri = `${host}/users/${user}`;
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Error al obtener las tareas: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setTareas(data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  // POST
  const crearTareas = async () => {
    try {
      const uri = `${host}/todos/${user}`;
      const options = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ label: nuevaTarea, is_done: false }),
      };
      const response = await fetch(uri, options);
      if (!response.ok) {
        throw new Error(`Error al crear la tarea: ${response.status} ${response.statusText}`);
      }
      setNuevaTarea('');
      traerTareas();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE
  const eliminarTarea = async (id) => {
      const uri = `${host}/todos/${id}`;
      const options = { method: 'DELETE' };
      const response = await fetch(uri, options);
      if (!response.ok) {
        throw new Error(`Error al eliminar la tarea: ${response.status} ${response.statusText}`);
      }
      traerTareas();

  };

  // GET
  const obtenerTarea = async (id) => {
   // try {
      const uri = `${host}/users/${user}`;
      const options = { method: 'GET' };

      const response = await fetch(uri, options);
      if (!response.ok) {
        throw new Error(`Error al obtener la tarea: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      obtenerTarea(data.todos)
    };

    useEffect(() => {
      traerTareas();
    }, []);

    return (
      <div>
        <h1>To Do List</h1>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(evento) => setNuevaTarea(evento.target.value)}
          placeholder="Escribe una tarea"
        />
        <button onClick={crearTareas}>Agregar</button>
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              {tarea.label}
              <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default TodoList2;
