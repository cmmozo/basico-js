// Fake API to test fetch requests
// https://jsonplaceholder.typicode.com


// Primeros test para recuperar informacion de la API
// Recupera 100 posts
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Recupera el post con id 3
  fetch("https://jsonplaceholder.typicode.com/posts/3")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Recupera 5000 fotos
  fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => response.json())
  .then((data) => console.log(data));

  // Recupera los comentarios del post con id 1
  fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
  .then((response) => response.json())
  .then((data) => console.log(data));

/*************************************************************+**/

// Creando el codigo para obtener posts y mostrarlos en el DOM

/*************************************************************+**/


  // Variables de los Elmentos del DOM
  const listElement = document.querySelector(".posts");
  const postTemplate = document.getElementById("single-post");
  const form = document.querySelector("#new-post form");
  const fetchButton = document.querySelector("#available-posts button");
  const postList = document.querySelector("#posts-container");



  // Creando una funcion para GET
  function sendHttpRequest(method, url, data) {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),  // Convierte el objeto data a una cadena JSON
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
        return response.json(); // Convierte la respuesta a JSON
    });
  }

  async function fetchPosts() {
    const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
    console.log(responseData);
    
    // Imprimiendo los datos obtenidos
    const listOfPosts = responseData; // copiando los datos obtenidos a una variable

    for (const post of listOfPosts) {
        const postContainer = document.createElement("article");
        postContainer.id = post.id;
        postContainer.classList.add("post-item");

        const title = document.createElement("h2");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.textContent = post.body;

        const button = document.createElement("button");
        button.textContent = "DELETE Content";

        postContainer.append(title);
        postContainer.append(body);
        postContainer.append(button);

        listElement.append(postContainer);
    }
}

// Agregando un boton para obtener los posts
fetchButton.addEventListener("click", fetchPosts);


// Creando código para enviar posts (POST)

// Funcion createPost()
// 1. Necesitamos el titulo y el contenido como argumentos
// 2. Revisar la estructura de los datos que espera la API
//    en este caso requiere un ID, UserID, title y body
async function createPost(title, content) {
    const userId = Math.random(); // Generando un ID de usuario aleatorio
    // Creando el objeto post con la estructura requerida por la API
    const post = {
        title: title,
        body: content,
        userId: userId
    };

// Llamando a la funcion sendHttpRequest para enviar un POST
sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}


// Al form (ver variables del DOM) le vamos a agregar un event listener para el submit
form.addEventListener('submit', event => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del form y evitar que la pagina se recargue
    // Obtener los valores de los campos del form
    const title = event.currentTarget.querySelector('#title').value; // title viene del id en el archivo html
    const content = event.currentTarget.querySelector('#content').value; // content viene del id en el archivo html
    
    console.log(title, content); // Imprimiendo los valores para verificar que se obtienen correctamente
    
    createPost(title, content); // Llamando a la funcion createPost con los valores obtenidos del form
    
});