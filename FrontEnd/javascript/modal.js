
const getWorks = await fetch("http://localhost:5678/api/works")
const works = await getWorks.json()

let projets = []

window.addEventListener("load", () => {
    test()
    console.log(projets)
})

const btnCloseModal = document.querySelector(".close-modal")

btnModifier.addEventListener("click", function(event) {
    event.preventDefault()
    const modal = document.getElementById("modal")
    setTimeout(() =>{

     modal.style.display = ""}, 5) 
    
})

btnCloseModal.addEventListener("click", function () {
    modal.style.display = "none"
})

const galleryModal = document.querySelector(".galleryModal")

function genererGalleryModal(works) {
    galleryModal.innerHTML = ""
    
    for (let i = 0; i < works.length; i++) {

        const figureProjet = document.createElement("figure")
        figureProjet.id = works[i].id
        const btnDelete = document.createElement("button")
        btnDelete.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>"
        btnDelete.id = works[i].id
        btnDelete.classList.add("btnDelete")

        const imageProjet = document.createElement("img")
        imageProjet.src = works[i].imageUrl
        imageProjet.alt = "Image" + works[i].title
        imageProjet.id = works[i].id
        
        imageProjet.classList.add("imgModal")

        galleryModal.appendChild(figureProjet)
        figureProjet.appendChild(imageProjet)
        figureProjet.appendChild(btnDelete)
    }
}

genererGalleryModal(projets)
console.log(projets)
 async function test(){
    await fetch("http://localhost:5678/api/works")
    .then((reponse) => reponse.json())
    .then((data) => {projets = data
    console.log(data)
    console.log(projets)
})
    
} 

const elementDelete = document.querySelectorAll(".btnDelete")

async function deleteProjet(elementId) {
    await fetch(`http://localhost:5678/api/works/${elementId}`,  {
           method: "DELETE",
           headers: {"content-type": "application/json", "Authorization": "Bearer "+ localStorage.getItem("token")},
        })
        
        .then(reponse => {
            if (reponse.ok) {
                console.log("le projet a été supprimé")
                test()
            } else {
                console.log("erreur dans la supression du projet")
            }
        })
}


elementDelete.forEach(button => {
    button.addEventListener("click", function (event) {
        event.stopPropagation()
        const elementId = button.id
        deleteProjet(elementId)
       
    })
})


/***** Partie Ajout de Projet ******/

const btnAjouter = document.querySelector(".btnModal")
const titreModal = document.querySelector(".modal-wrapper h2")

btnAjouter.addEventListener("click", function() {
    galleryModal.innerHTML = ""
    titreModal.innerHTML = "Ajout Photo"
    btnAjouter.style.display = "none"
    
    galleryModal.innerHTML = `
    <input type= "file"<button id=photoFile>Ajouter Photo</button>>
    <form class="formAjout" action="#" methode="post">
        <label for="titre">Titre</label>
        <input type= "text" name="titre" id="titre">
        <label for="categorie">Catégorie</label>
        <select id="categorie" name="categorie">
            <option value=""></option>
            <option value="1">Objets</option>
            <option value="2">Appartements</option>
            <option value="3">Hotels & restaurants</option>
        </select><br>
        <input id ="btnValider" type="submit" value="Valider">
    </form>
    `
})
