import React, { useState, useEffect } from 'react';

const TodoList2 = () => {
  const host = 'https://playground.4geeks.com/todo';
  const user = 'Gabriela';

  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [tareaEditada, setTareaEditada] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  // GET
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
  const crearTarea = async () => {
    try {
      const uri = `${host}/todos/${user}`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  // PUT
  const editarTarea = async (id) => {
    try {
      const uri = `${host}/todos/${id}`;
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: textoEditado, is_done: false }),
      };
      const response = await fetch(uri, options);
      if (!response.ok) {
        throw new Error(`Error al editar la tarea: ${response.status} ${response.statusText}`);
      }
      setTareaEditada(null);
      setTextoEditado('');
      traerTareas();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE
  const eliminarTarea = async (id) => {
    try {
      const uri = `${host}/todos/${id}`;
      const options = { method: 'DELETE' };
      const response = await fetch(uri, options);
      if (!response.ok) {
        throw new Error(`Error al eliminar la tarea: ${response.status} ${response.statusText}`);
      }
      traerTareas();
    } catch (error) {
      console.error(error);
    }
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
      <button onClick={crearTarea}>Agregar</button>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tareaEditada === tarea.id ? (
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
                onBlur={() => editarTarea(tarea.id)}
              />
            ) : (
              <>
                {tarea.label}
                <button onClick={() => {
                  setTareaEditada(tarea.id);
                  setTextoEditado(tarea.label);
                }}>Editar</button>
                <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList2;
