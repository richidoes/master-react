import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [list, setList] = React.useState([]);
  const [edicion, setEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [err, setError] = React.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    //if empty
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo porfavor...");
      return;
    }
    console.log(tarea);
    //generate task and add it to existing list
    setList([...list, { id: shortid.generate(), Tarea: tarea }]);
    //clear task and error message
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    //if item id is same as item id selected
    const arrFiltrado = list.filter((item) => item.id !== id);
    //then delete , otherwise add it
    setList(arrFiltrado);
  };

  const editar = (item) => {
    console.log(item);
    setEdicion(true);
    setTarea(item.Tarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    //if empty
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo porfavor...");
      return;
    }

    const ArrEditado = list.map((item) =>
      item.id === id ? { id: id, Tarea: tarea } : item
    );
    setList(ArrEditado);

    //restart form values and clear error message
    setEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listas de tareas</h4>
          <ul className="list-group">
            {
              //If empty print
              list.length === 0 ? (
                <li className="list-group-item">
                  No hay tareas...
                  </li>
              ) : (
                //Else print
                list.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.Tarea}</span>
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {edicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>

          <form onSubmit={edicion ? editarTarea : agregarTarea}>
            {err ? <span className="text-danger">{err}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tareas"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />

            {edicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-success btn-block" type="submit">
                Guardar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
