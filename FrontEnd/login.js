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

    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value 

    fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, password})
    })
    .then(reponse => {
        if (reponse.ok) {
            return reponse.json()
        } else {
            messageErreur.textContent ="Identifiant incorrects."
            messageErreur.style.display = "block"
        }
    })

    .then(data => {
        localStorage.setItem("token", data.token)
        window.location.href = "index.html"
        console.log(data.token)
    })
  
})