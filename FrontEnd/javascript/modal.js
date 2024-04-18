const getWorks = await fetch("http://localhost:5678/api/works")
let works = await getWorks.json()
import { genererWorks } from "./works.js"
import { category } from "./works.js"


/***** Ouverture et fermeture de la modal *****/
const btnCloseModal = document.querySelector(".close-modal")

btnModifier.addEventListener("click", function(event) {
    const modal = document.getElementById("modal")
     modal.style.display = ""
    
})

btnCloseModal.addEventListener("click", function () {
    modal.style.display = "none"
})
/***************************** *********************/


/****** Affichag de la première page modal + fonction delete ********/


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
    const elementDelete = document.querySelectorAll(".btnDelete")
    elementDelete.forEach(button => {
        button.addEventListener("click", function () {
            const elementId = button.id
            deleteProjet(elementId)
            
            console.log(elementId)
        })
    genererWorks(works)
    })

}

genererGalleryModal(works)

/*** Recup des projets pour la mise a jour suite au delete *******/


 async function recuperationProjet(){
    const projetApi = await fetch("http://localhost:5678/api/works")
    const projets = await projetApi.json()
    genererGalleryModal(projets)
    console.log(projets)
    works = projets
} 



function deleteProjet(elementId) {
    fetch(`http://localhost:5678/api/works/${elementId}`,  {
           method: "DELETE",
           headers: {"content-type": "application/json", "Authorization": "Bearer "+ localStorage.getItem("token")}
        })
        
        .then(reponse => {
            if (reponse.ok) {
                console.log("le projet a été supprimé")
                recuperationProjet()
                
                console.log(works)
            } else {
                console.log("erreur dans la supression du projet")
            }
        })
        
}

/******* Fin de la premiere page modal *******/



/***** Partie Ajout de Projet ******/

const btnAjouter = document.querySelector(".btnModal")
const titreModal = document.querySelector(".modal-wrapper h2")

/****** Bouton ajouter et supression de la galerie *******/

btnAjouter.addEventListener("click", function(event) {
    event.preventDefault()
    galleryModal.innerHTML = ""
    titreModal.innerHTML = "Ajout Photo"
    btnAjouter.style.display = "none"
    const trait = document.querySelector(".trait")
    trait.style.display = "none"


/******* Création des éléments pour le formulaire d'ajout ********/

    const divAjout = document.createElement("div")

    const btnPrecedent = document.createElement("button")
    btnPrecedent.innerHTML = "<i class=\"fa-solid fa-arrow-left\">"
    btnPrecedent.id = "btnPrecedent"

    const formAjout = document.createElement("form")
    formAjout.classList.add("formAjout")
    formAjout.setAttribute("enctype", "multipart/form-data")
    formAjout.setAttribute("method", "POST")

    const typeFile = document.createElement("p")
    typeFile.innerText = "jpg, png : 4mo max"
    typeFile.id = "typeFile"

    const labelBtnPhoto = document.createElement("label")
    labelBtnPhoto.setAttribute("for", "btnPhoto")
    labelBtnPhoto.classList.add("btnPhoto")

    const iconePhoto = document.createElement("span")
    iconePhoto.innerHTML = "<i class=\"fa-solid fa-image\"></i>"

    const btnAjoutPhoto = document.createElement("p")
    btnAjoutPhoto.innerText = "+ Ajouter photo"
    btnAjoutPhoto.setAttribute("id", "ajoutPhoto")

    const btnPhoto = document.createElement("input")
    btnPhoto.setAttribute("type", "file")
    btnPhoto.setAttribute("id", "btnPhoto")
    btnPhoto.setAttribute("name", "btnPhoto")
    btnPhoto.style = "display : none"

    const labelTitre = document.createElement("label")
    labelTitre.setAttribute("for", "titre")
    labelTitre.innerText = "Titre"

    const inputTitre = document.createElement("input")
    inputTitre.setAttribute("type", "text")
    inputTitre.setAttribute("id", "titre")
    inputTitre.setAttribute("name", "titre")

    const labelCategorie = document.createElement("label")
    labelCategorie.setAttribute = ("for", "categorie")
    labelCategorie.innerText = "Catégorie"
    
    const selectCategorie = document.createElement("select")
    selectCategorie.setAttribute("id", "categorie")
    selectCategorie.setAttribute("name", "categorie")

    const optionVide = document.createElement("option")
    optionVide.text = ""
    optionVide.value = ""

    const traitFormAjout = document.createElement("hr")
    traitFormAjout.classList.add("traitAjout")

    const btnValider = document.createElement("input")
    btnValider.setAttribute("id", "btnValider")
    btnValider.setAttribute("type", "submit")
    btnValider.setAttribute("value", "Valider")
    btnValider.disabled = true



/******* Ajout du formulaire *************/  


    galleryModal.appendChild(divAjout)

    divAjout.appendChild(btnPrecedent)
    divAjout.appendChild(formAjout)

    formAjout.appendChild(labelBtnPhoto)

    labelBtnPhoto.appendChild(iconePhoto)
    labelBtnPhoto.appendChild(btnAjoutPhoto)
    labelBtnPhoto.appendChild(typeFile)
    labelBtnPhoto.appendChild(btnPhoto)

    formAjout.appendChild(labelTitre)
    formAjout.appendChild(inputTitre)

    formAjout.appendChild(labelCategorie)
    formAjout.appendChild(selectCategorie)
    selectCategorie.insertBefore(optionVide, selectCategorie.firstChild)

    for (let i = 0; i < category.length; i++) {
        const optionAjout = document.createElement("option")
        optionAjout.innerText = category[i].name
        optionAjout.setAttribute("value", category[i].id)
        selectCategorie.appendChild(optionAjout)
    }

    formAjout.appendChild(traitFormAjout)
    formAjout.appendChild(btnValider)

    
    
/***** Bouton précédent modal ******/
   
    btnPrecedent.addEventListener("click", function() {
    galleryModal.innerHTML = ""
    titreModal.innerHTML = "Galerie photo"
    btnAjouter.style.display = ""
    trait.style.display = ""
    genererGalleryModal(works)
})

/******* Bouton valider et appel a l'API pour l'ajout de projet  ********/



btnValider.addEventListener("submit", async function(event) {
    event.preventDefault()

    const newImage = document.getElementById("#btnPhoto")
    const newTitre = document.getElementById("titre")
    const newCategorie = document.getElementById("categorie")

    const newProjet = {
        "image": newImage,
        "titre": newTitre,
        "category": newCategorie
    }

    
        await fetch("http://localhost:5678/api/works", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "multipart/form-data", "Authorization": "Bearer "+ localStorage.getItem("token")},
        body: JSON.stringify(newProjet)
    })

    
})

})