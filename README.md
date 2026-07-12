# GarGuz - Sistema de Productos de Cafetería

## Integrantes

- Uriel Eduardo Guzmán Ramírez
- Edsai Alejandro Garcia Reyes

## Descripción del proyecto

GarGuz es un mini sistema web desarrollado con React y Vite. El sistema simula el acceso a una plataforma de administración de productos para una cafetería.

El proyecto está basado en el mockup realizado previamente en Figma, por lo que se respetó una estructura visual con pantalla de login, menú lateral, barra superior y una tabla de productos.

El sistema permite iniciar sesión usando una API externa, visualizar productos, filtrarlos por nombre o categoría, navegar entre páginas mediante paginación y realizar acciones CRUD como agregar, editar y eliminar productos.

---

## Objetivo del proyecto

El objetivo principal de este proyecto es practicar el desarrollo de una aplicación en React consumiendo APIs externas. 
---

## Tecnologías utilizadas

- **React:** para construir la interfaz del sistema mediante componentes.
- **Vite:** para crear y ejecutar el proyecto de React de forma rápida.
- **JavaScript:** para la lógica del sistema.
- **CSS:** para el diseño visual y responsivo.
- **DummyJSON API:** para simular autenticación y consumo de productos.
---

## API utilizada para el login

Para la autenticación se utilizó la API de DummyJSON:

```text
https://dummyjson.com/auth/login
```

Esta API recibe un usuario y una contraseña mediante una petición `POST`.

### Credenciales de prueba

```text
Usuario: emilys
Contraseña: emilyspass
```

Si las credenciales son correctas, la API devuelve los datos del usuario, incluyendo nombre, usuario, correo, token e imagen de perfil.

Si las credenciales son incorrectas, el sistema muestra un mensaje de error indicando que las credenciales no son válidas.

---

## API utilizada para productos

Para la tabla de datos se utilizó la API de productos de DummyJSON:

```text
https://dummyjson.com/products
```

La API devuelve productos en formato JSON. Para que el sistema se relacionara mejor con el tema del proyecto, los datos se adaptaron visualmente a productos de cafetería, como bebidas, comida, panadería, postres y snacks.
---

## Funcionalidades implementadas

### Login

El sistema cuenta con una pantalla de inicio de sesión con los siguientes elementos:

- Campo de usuario.
- Campo de contraseña.
- Botón para entrar.
- Validación de campos vacíos.
- Mensaje de error cuando las credenciales son incorrectas.
- Consumo de API mediante método `POST`.

### Sistema principal

Después de iniciar sesión correctamente, se muestra el sistema principal con:

- Sidebar o menú lateral.
- Navbar o barra superior.
- Nombre e imagen del usuario.
- Botón para cerrar sesión.
- Protección de vistas, ya que el sistema solo se muestra si existe un usuario autenticado.

### Tabla de productos

La pantalla de productos incluye:

- Tabla de productos.
- Filtro de búsqueda por nombre.
- Filtro por categoría.
- Paginación.
- Visualización de 10 productos por página.
- Cambio de página mediante botones.
- Actualización de parámetros en la URL, por ejemplo:

```text
?page=2&limit=10
```

### Acciones CRUD

El sistema permite realizar las siguientes acciones:

- **Agregar producto:** se realiza una petición `POST` a la API y después se agrega visualmente al estado local.
- **Editar producto:** se realiza una petición `PUT` a la API y después se actualiza visualmente en la tabla.
- **Eliminar producto:** se realiza una petición `DELETE` a la API y después se elimina visualmente de la tabla.

Es importante mencionar que DummyJSON simula las escrituras, por lo que los cambios no se guardan permanentemente en el servidor. Por esa razón, después de cada petición, el sistema actualiza el estado local con `useState`.

---

## Organización del proyecto

El proyecto se organizó en carpetas para mantener el código más claro y fácil de entender.

```text
src/
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── ProductModal.jsx
│   ├── ProductTable.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── ProductsPage.jsx
├── services/
│   ├── authService.js
│   └── productService.js
├── utils/
│   └── validators.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## Descripción de carpetas principales

### components

En esta carpeta se colocaron los componentes reutilizables del sistema.

Por ejemplo:

- `Navbar.jsx`: muestra la barra superior con los datos del usuario.
- `Sidebar.jsx`: muestra el menú lateral de navegación.
- `ProductTable.jsx`: muestra la tabla de productos.
- `ProductModal.jsx`: muestra el formulario para agregar o editar productos.
- `Pagination.jsx`: controla la navegación entre páginas.

### pages

En esta carpeta se colocaron las vistas principales del sistema.

- `LoginPage.jsx`: contiene la pantalla de inicio de sesión.
- `DashboardPage.jsx`: contiene el panel principal después de iniciar sesión.
- `ProductsPage.jsx`: contiene la tabla de productos, filtros, paginación y acciones CRUD.

### services

En esta carpeta se separaron las llamadas a la API.

- `authService.js`: contiene la petición para iniciar sesión con DummyJSON.
- `productService.js`: contiene las peticiones para obtener, agregar, editar y eliminar productos.

### utils

En esta carpeta se colocaron funciones de apoyo para validaciones.

- `validators.js`: contiene validaciones para el formulario de login y otros campos del sistema.

---

## Validaciones implementadas

El formulario de login valida que los campos no estén vacíos antes de hacer la petición a la API.

También se muestra un mensaje claro cuando ocurre un error, por ejemplo:

```text
Credenciales inválidas
```

Esto ayuda a que el usuario sepa qué ocurrió sin tener que revisar la consola del navegador.

---

## Paginación

La tabla muestra 10 productos por página.  
Cuando se cambia de página, la URL se actualiza usando parámetros como:

```text
?page=1&limit=10
?page=2&limit=10
?page=3&limit=10
```


---

## Diseño

El diseño del sistema está basado en el mockup realizado en Figma.  
Se utilizó una paleta de colores relacionada con una cafetería, usando tonos cafés, blanco, gris claro y naranja como color de acento.

El sistema cuenta con:

- Login visual.
- Menú lateral.
- Barra superior.
- Tabla de productos.
- Botones de acción.
- Estilos responsivos para que pueda visualizarse mejor en pantallas pequeñas.

---

## Cómo ejecutar el proyecto localmente

Primero se deben instalar las dependencias:

```bash
npm install
```

Después se ejecuta el proyecto:

```bash
npm run dev
```

Vite mostrará una dirección local como:

```text
http://localhost:5173/
```

También puede mostrar una dirección de red para abrir el proyecto desde otro dispositivo conectado a la misma red WiFi, por ejemplo:

```text
http://192.168.x.x:5173/
```

## Conclusión

Con este proyecto se practicó el desarrollo de un sistema en React usando componentes, manejo de estado y consumo de APIs externas. También se implementó un login funcional, una tabla con filtros y paginación, y acciones CRUD simuladas con llamadas reales a una API.

La práctica ayudó a comprender mejor cómo organizar un proyecto en carpetas, cómo separar las llamadas a la API en archivos de servicios y cómo actualizar la interfaz usando el estado local de React. Además, se reforzó el uso de Git y GitHub para controlar y subir los avances del proyecto.
