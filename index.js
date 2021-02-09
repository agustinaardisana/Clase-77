const list = document.querySelector(".list");
const formulario = document.querySelector(".formulario");
const botonAgregarUsuario = document.querySelector(".agregar-usuario");
const nombreUsuario = document.getElementById("nombre");
const emailUsuario = document.getElementById("email");
const direccionUsuario = document.getElementById("direccion");
const telefonoUsuario = document.getElementById("telefono");
const formularioParaModificar = document.querySelector(".formulario-modificar");
const nombreUsuarioModif = document.getElementById("nombre-modificar");
const emailUsuarioModif = document.getElementById("email-modificar");
const direccionUsuarioModif = document.getElementById("direccion-modificar");
const telefonoUsuarioModif = document.getElementById("telefono-modificar");
const botonModificarUsuario = document.querySelector(".modificar-usuario");

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
          <button class="modificar-usuario" data-fullname="${usuario.fullname}" data-phone="${usuario.phone}" data-address="${usuario.address}" data-email="${usuario.email}">Modificar</button>
          </li>`);
  });
  borrarOnClick();
  modificarOnClick(data);
};

const borrarOnClick = () => {
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
      //Ahora deberia actualizar
      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          crearLista(data);
        });
    });
};

formulario.onsubmit = (e) => {
  e.preventDefault();
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

      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          crearLista(data);
        });
    });
};

const modificarOnClick = () => {
  const botonesModificar = document.querySelectorAll(".modificar-usuario");

  botonesModificar.forEach((boton) => {
    boton.onclick = () => {
      formularioParaModificar.classList.remove("hidden");
      console.log(boton.parentElement.id);
      console.log(boton.dataset.phone);

      nombreUsuarioModif.value = boton.dataset.fullname;
      emailUsuarioModif.value = boton.dataset.email;
      direccionUsuarioModif.value = boton.dataset.address;
      telefonoUsuarioModif.value = boton.dataset.phone;

      id = boton.parentElement.id;
      newUrl = `${baseURL}/${id}`;
    };
  });
};

formularioParaModificar.onsubmit = (e) => {
  e.preventDefault();
};

botonModificarUsuario.onclick = () => modifyUser(newUrl);

const modifyUser = (newUrl) => {
  console.log(newUrl);
  fetch(newUrl, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: `${direccionUsuarioModif.value}`,
      email: `${emailUsuarioModif.value}`,
      fullname: `${nombreUsuarioModif.value}`,
      phone: `${telefonoUsuarioModif.value}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          crearLista(data);
        });
    });
};
