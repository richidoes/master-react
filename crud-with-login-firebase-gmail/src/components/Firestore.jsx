import React from "react";
import { db } from "../firebase";
import swal from "@sweetalert/with-react";
import moment from 'moment';
import 'moment/locale/es-mx' //switch to spanish

const Firestore = (props) => {

  const [tareas, setTareas] = React.useState([]);
  const [tarea, setTarea] = React.useState("");
  const [edicion, setEdicion] = React.useState(false);
  const [id, setId] = React.useState("");
  const [err, setError] = React.useState(null);
  const [ultimo, setUltimo] = React.useState(null)
  const [desactivar, setDesactivar] = React.useState(false)

  React.useEffect(() => {

    const getData = async () => {
      try {
        //button:next dissable until get data
        setDesactivar(true)

        //get collection from db
        const data = await db.collection(props.user.uid)
        .limit(2)
        .orderBy('fecha')
        .get();

        //transform into a simple array
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        //set the last object showed
        setUltimo(data.docs[data.docs.length - 1])

        //sort the obtained data by date (old to new)
        arrayData.sort((a, b) => {
          return a.fecha - b.fecha;
        });

        console.log(arrayData);
        setTareas(arrayData);

        
        //get collection from db
        const query = await db.collection(props.user.uid)
        .limit(2)
        .orderBy('fecha')
        .startAfter(data.docs[data.docs.length - 1])//get following data after last object showed
        .get();

        //activate/desactivate button:next
        if (query.empty) {
          console.log('no hay mas documentos')
          setDesactivar(true)
        }else{
          setDesactivar(false)
        }

      } catch (error) {
        console.log(error);
      }

    };

    getData();

  }, [props.user.uid]);//required , the callback read it and process the data

  const siguiente = async() =>{
    console.log('siguiente')
    try {
      
      //get collection from db
      const data = await db.collection(props.user.uid)
      .limit(2)
      .orderBy('fecha')
      .startAfter(ultimo)//get following data after last object showed
      .get();

      //transform into a simple array
      const arrayData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      //create a single array from 2
      setTareas([
        ...tareas,
        ...arrayData
      ])

      //set the last object showed
      setUltimo(data.docs[data.docs.length - 1])

      //read collection (again) from db
      const query = await db.collection(props.user.uid)
      .limit(2)
      .orderBy('fecha')
      .startAfter(data.docs[data.docs.length - 1])//get following data after last object showed
      .get();
      
      //activate/desactivate button:next
      if (query.empty) {
        console.log('no hay mas documentos')
        swal("No hay más!", "No hay mas documentos...", "warning");
        setDesactivar(true)
      }else{
        setDesactivar(false)
      }

    } catch (error) {

      console.log(error)

    }
  }

  const agregar = async (e) => {
    e.preventDefault();
    //if empty
    if (!tarea.trim()) {
      console.log("Nada que agregar");
      setError("Escriba algo porfavor...");
      swal("Faltan datos!", "Escriba algo por favor...", "error");
      return;
    }
    //else
    try {
      //create new task
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
      };
      //push new task to db
      const data = await db.collection(props.user.uid).add(nuevaTarea);
     
      //clear the form state and error message
      setTarea("");
      setError(null);

      //update the list state on dom
      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
    } catch (error) {
      console.log(error);
    }

    //all good?
    console.log(tarea);
    swal("Exelente!", "Tu tarea se guardo correctamente!", "success");
  };

  /*We don´t use async/await here, because we use promises with swal and that
    that replaces our async/await
    */
  const eliminar = (id) => {

    //confirm delete
    swal({
      title: "Estas seguro?",
      text: "Una vez borrada, no seras capaz de recuperar tu tarea!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //find doc by id and delete in db
        db.collection(props.user.uid).doc(id).delete();

        //filter the array leaving out task deleted
        const arrayFiltrado = tareas.filter((item) => item.id !== id);
        
        //update list without the tasks deleted
        setTareas(arrayFiltrado);

        swal("Poof! Tu tarea ha sido eliminada!", {
          icon: "success",
        });
      } else {
        swal("Tu tarea esta segura!"); //safe alert
      }
    });

  };

  const activarEdicion = (item) => {
    console.log(item);
    //get data from task for edition
    setEdicion(true);
    setTarea(item.name);
    setId(item.id);

  };

  const editar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo porfavor...");
      swal("Faltan datos!", "Escriba algo por favor...", "error");
      return;
    }
    try {
      //set the data that we will update in db
      await db.collection(props.user.uid).doc(id).update({
        name: tarea,
        fecha: Date.now(),
      });

      //if id equal editing id  return new object , else return same object
      const arrayEditado = tareas.map((item) =>
        item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
      );
      
      //update db and dom
      setTareas(arrayEditado);
      
      //clear form states and error message
      setEdicion(false);
      setTarea("");
      setId("");
      setError(null);

    } catch (error) {
      console.log(error);
    }

    swal("Exelente!", "Los cambios se guardaron correctamente!", "success");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              //If empty print
              tareas.length === 0 ? (
                <li className="list-group-item">No hay tareas...</li>
              ) : (
                //Else print
                tareas.map((item) => (
                  <li key={item.id} className="list-group-item">
                    {item.name} - {moment(item.fecha).format('LLL')}
                    <button
                      className="btn btn-outline-danger btn-sm float-right"
                      onClick={() => eliminar(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm float-right mr-3"
                      onClick={() => activarEdicion(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              )
            }
          </ul>
          <button 
          className="btn btn-outline-info btn-block mt-2 btn-sm"
          onClick={() => siguiente()}
          disabled={desactivar}>
            Siguiente...
          </button>
        </div>
        <div className="col-md-6">
          <h3>{edicion ? "Editar tarea" : "Agregar tarea"}</h3>
          <form onSubmit={edicion ? editar : agregar}>
            {err ? <span className="text-danger">{err}</span> : null}
            <input
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <button
              className={
                edicion
                  ? "btn btn-outline-warning btn-block"
                  : "btn btn-outline-success btn-block"
              }
              type="submit"
            >
              {edicion ? "Editar" : "Guardar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Firestore;
