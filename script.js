import APIKEY from "./apikey.js";
const apiURL = `https://crudcrud.com/api/${APIKEY}/users`
const $ = selector => document.querySelector(selector);

const inputName = $("#txtNombre");
const inputEmail = $("#txtEmail");
const formAdd = $("#form-add");
const ulResult = $("#result");
const btnAdd = $("#btnAdd");
document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
})
function loadUsers() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            ulResult.innerHTML = "";
            data.forEach(user => {
                const li = document.createElement("li");
                li.innerHTML = `
                <strong>${user.name}</strong>
                <p id="mail${user._id}">${user.email}</p>
                <button class="btn edit" data-id="${user._id}">Editar</button>
                <button class="btn del" data-id="${user._id}">Eliminar</button>

            `
                ulResult.appendChild(li);
            });
        })
}

formAdd.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = {
        name: inputName.value,
        email: inputEmail.value,
    }
    fetch(apiURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(() => {
            loadUsers();
        })
    inputName.value = "";
    inputEmail.value = "";
})
ulResult.addEventListener("click", e => {
    const boton = e.target;
    const id = boton.dataset.id;
    if (boton.classList.contains('edit')) {
        const newName = prompt("Escibe el nuevo nombre");
        const user = {
            name: newName,
            email: $(`#mail${id}`).textContent
        }
        fetch(apiURL + "/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() => {
            loadUsers();
        })

    }
    if (boton.classList.contains('del')) {
        fetch(apiURL + "/" + id, {
            method: "DELETE",

        }).then(() => {
            loadUsers();
        })
    }
})

