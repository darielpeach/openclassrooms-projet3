const getWorks = await fetch("http://localhost:5678/api/works")
let works = await getWorks.json()
import { genererWorks } from "./works.js"
import { category } from "./works.js"


/***** Ouverture et fermeture de la modal *****/
const btnCloseModal = document.querySelector(".close-modal")
const modal = document.getElementById("modal")

let modall = null

const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modall = target
    modall.addEventListener('click', closeModal)
    modall.querySelector('.close-modal').addEventListener('click', closeModal)
    modall.querySelector('.modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modall === null) return
    e.preventDefault()
    modall.style.display = "none"
    modall.setAttribute('aria-hidden', 'true')
    modall.removeAttribute('aria-modal')
    modall.removeEventListener('click', closeModal)
    modall.querySelector('.close-modal').removeEventListener('click', closeModal)
    modall.querySelector('.modal-stop').removeEventListener('click', stopPropagation)
    modall = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('#btnModifier').forEach(a => {
    a.addEventListener('click', openModal)
    
})




/***************************** *********************/
/******* Fonction d'actualisatin des projets ******/


 async function actualisationProjet() {

    const getNewWorks = await fetch("http://localhost:5678/api/works")
    let refreshWorks = await getNewWorks.json()

    genererWorks(refreshWorks)
}

async function actualisationModal() {
    const getNewWorks = await fetch("http://localhost:5678/api/works")
    let refreshWorks = await getNewWorks.json()

    genererGalleryModal(refreshWorks)
}

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


function deleteProjet(elementId) {
    fetch(`http://localhost:5678/api/works/${elementId}`,  {
           method: "DELETE",
           headers: {"content-type": "application/json", "Authorization": "Bearer "+ localStorage.getItem("token")}
        })
        
        .then(reponse => {
            if (reponse.ok) {
                console.log("le projet a été supprimé")
                actualisationModal()
                actualisationProjet()
                
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
    formAjout.setAttribute("action", "http://localhost:5678/api/works")

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
    btnPhoto.setAttribute("value", "")
    btnPhoto.setAttribute("accept", ".jpg, .png")
    btnPhoto.style = "display : none"

    const labelTitre = document.createElement("label")
    labelTitre.setAttribute("for", "titre")
    labelTitre.innerText = "Titre"

    const inputTitre = document.createElement("input")
    inputTitre.setAttribute("type", "text")
    inputTitre.setAttribute("id", "titre")
    inputTitre.setAttribute("name", "titre")
    inputTitre.setAttribute("value", "")

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

    const btnValider = document.createElement("button")
    btnValider.setAttribute("id", "btnValider")
    btnValider.setAttribute("type", "submit")
    btnValider.innerText = "Valider"
    btnValider.disabled = true

    const messageErreur = document.createElement("p")
    messageErreur.innerText = "Seul les fichiers au format .jpg et .png de moins de 4mo sont accepté"
    messageErreur.setAttribute("id", "messageErreur")
    messageErreur.style = "display: none"
    




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
    formAjout.appendChild(messageErreur)
    formAjout.appendChild(btnValider)

    
    
/***** Bouton précédent modal ******/
   
    btnPrecedent.addEventListener("click", function() {
    galleryModal.innerHTML = ""
    titreModal.innerHTML = "Galerie photo"
    btnAjouter.style.display = ""
    trait.style.display = ""
    actualisationModal()
})


/**** Gestion de l'ajout de photo dans l'input *****/



btnPhoto.addEventListener("change", function(event) {

    const photo = event.target.files[0]

    const imgAjouter = document.createElement("img")
    imgAjouter.src = URL.createObjectURL(photo)
    imgAjouter.classList.add("imgAjouter")

    labelBtnPhoto.appendChild(imgAjouter)

    iconePhoto.style = "display: none"
    btnAjoutPhoto.style = "display: none"
    typeFile.style = "display: none"
    
}
)







/****** Condition pour vérifier que tout les champs formulaire sont remplis ****/

/**  Fonction pour activer ou désactiver le bouton Valider et gérer la classe btnValiderOk */
function activationBtnValider(isFormFilled) {
    btnValider.disabled = !isFormFilled;
    if (isFormFilled) {
        btnValider.removeAttribute('id', 'btnValider');
        btnValider.setAttribute('id', 'btnValiderOk');
    } else {
        btnValider.removeAttribute('id', 'btnValiderOk');
        btnValider.setAttribute('id', 'btnValider');
    }
}


const inputs = document.querySelectorAll('.formAjout input, .formAjout select');

/**** Fonction pour vérifier si tous les champs sont remplis *******/
function checkForm() {
    let isFormFilled = true;
    inputs.forEach(input => {
        if (input.value === '') {
            isFormFilled = false;
        }
    });

    
    activationBtnValider(isFormFilled);
}

/****  Ajout d'un écouteur d'événements à chaque champ du formulaire ******/
inputs.forEach(input => {
    input.addEventListener('input', checkForm);
});


/******* Message d'erreur si le fichier choisie n'a pas le bon format *********/





/******* Bouton valider et appel a l'API pour l'ajout de projet  ********/

formAjout.addEventListener("submit", async function(event) {
    event.preventDefault()

    const formData = new FormData();
    formData.append('image', event.target.querySelector("[name=btnPhoto]").files[0]);
    formData.append('title', event.target.querySelector("[name=titre]").value);
    formData.append('category', parseInt(event.target.querySelector("[name=categorie]").value));

    await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        body: formData
    })

    .then(reponse => {
        if (reponse.ok) {
            console.log("good")
            actualisationProjet()
        }
    })
        
})



})