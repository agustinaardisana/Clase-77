const list = document.querySelector(".list");
const botonAgregarUsuario = document.querySelector(".agregar-usuario");
const nombreUsuario = document.getElementById("nombre");
const emailUsuario = document.getElementById("email");
const direccionUsuario = document.getElementById("direccion");
const telefonoUsuario = document.getElementById("telefono");

const baseURL = "https://601da02bbe5f340017a19d60.mockapi.io/users";
let newUrl = "";

fetch(baseURL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    crearLista(data);
  });

const crearLista = (data) => {
  list.innerHTML = "";
  data.map((usuario) => {
    return (list.innerHTML += `
          <li id="${usuario.id}">${usuario.fullname}
          <button class="borrar-usuario">Borrar</button>
          </li>`);
  });
  botonOnClick();
};

const botonOnClick = () => {
  const botonesBorrar = document.querySelectorAll(".borrar-usuario");

  botonesBorrar.forEach(
    (boton) =>
      (boton.onclick = () => {
        console.log(boton.parentElement.id);
        id = boton.parentElement.id;
        newUrl = `${baseURL}/${id}`;
        console.log(newUrl);

        deleteUser(newUrl);
      })
  );
};

const deleteUser = (newUrl) => {
  fetch(newUrl, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      crearLista(data);
    });
};

botonAgregarUsuario.onclick = () => addUser(baseURL);

const addUser = (baseURL) => {
  console.log(baseURL);
  fetch(baseURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: `${direccionUsuario.value}`,
      email: `${emailUsuario.value}`,
      fullname: `${nombreUsuario.value}`,
      phone: `${telefonoUsuario.value}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      crearLista(data);
    });
};
