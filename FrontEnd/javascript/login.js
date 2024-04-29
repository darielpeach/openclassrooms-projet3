/****** Ajout redirection vers la page index.html ******/
const projets = document.getElementById("projets")

projets.addEventListener("click", function () {
    window.location.href = "index.html"
})

/****** Ajout de l'onglet login en gras ******/

const navLogin = document.getElementById("login")
navLogin.style.fontWeight = "bold"

/****** Vérification des identifiants ******/

const loginForm = document.getElementById("loginForm")
const messageErreur = document.getElementById("messageErreur")

loginForm.addEventListener("submit", function(event) {
    event.preventDefault()

    // récupération des données saisie par l'utilisateur
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value 
    let user = {
        "email": email,
        "password": password
    }

    // Envoie à l'API
    fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    // Gestion de la réponse de l'APi
    .then(reponse => {
        if (reponse.ok) {
            return reponse.json()
        } else {
            messageErreur.textContent ="Identifiant incorrects."
            messageErreur.style.display = "block"
        }
    })
    // Redirection si les identifiants sont correct
    .then(data => {
        localStorage.setItem("token", data.token)
        window.location.href = "./index.html"
    })
})

/*** Reidrection vers la partie Contact index.html ****/

document.querySelector('li a[href="index.html#contact"]').addEventListener('click', function(event) {
    event.preventDefault()
    window.location.href = 'index.html?fromLogin#contact' // Ajoute ?fromLogin à l'URL 
});

