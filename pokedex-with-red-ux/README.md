Aplicación Web que nos muestra un listado de pokemones traido de una
Api externa (pokeapi.co), podremos ver algunos de los atributos y la
apariencia del pokemon que seleccionemos.

La web utiliza un sistema de rutas protegidas donde
solo el usuario registrado tiene acceso al listado asi como a otras
caracteristicas como cambiar su foto de perfil y su nombre de usuario.

## Inicio rapido

------------------- INSTRUCCIONES DE USO -------------------------------

1-**descarga el repositorio**

Si desea ejecutar el proyecto tenga en cuenta lo siguiente:

2-Asegurese de tener instalado: Node.js.
3-use el terminal y acceda al directorio donde coloco el proyecto, una vez dentro **Ejecuta los comandos:**

```shell

yarn install / npm install

```

4-Asegurese de tener un proyecto de firebase creado, ya que necesitara agregar los datos de su propia base de datos.
5-Ahora entre al la siguiente ruta: _src/_ y dentro cree un fichero con el nombre _firebase.js_
6-Dentro de _firebase.js_ coloque la informacion de configuracion de su proyecto de firebase.
7-Tambien es necesario hacer las importaciones y exportaciones mostradas en el ejemplo:

---

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
apiKey: "suApiKey",
authDomain: "SuDominio",
databaseURL: "dbURL",
projectId: "SuIdDeProyecto",
storageBucket: "",
messagingSenderId: "",
appId: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };

---

8-Una vez que alla concluido con los pasos anteriores , solo queda iniciar su proyecto:

```shell

yarn start / npm start
```

9-**Disfruta!**
