const getWorks = await fetch("http://localhost:5678/api/works")
const works = await getWorks.json()





const btnCloseModal = document.querySelector(".close-modal")

btnModifier.addEventListener("click", function(event) {
    const modal = document.getElementById("modal")
     modal.style.display = ""
    
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
    const elementDelete = document.querySelectorAll(".btnDelete")
    elementDelete.forEach(button => {
        button.addEventListener("click", function () {
            const elementId = button.id
            deleteProjet(elementId)
            console.log(elementId)
        })
    })

}

genererGalleryModal(works)

 async function test(){
    const projetApi = await fetch("http://localhost:5678/api/works")
    const projets = await projetApi.json()
    genererGalleryModal(projets)
    console.log(projets)
    
} 

const elementDelete = document.querySelectorAll(".btnDelete")

function deleteProjet(elementId) {
    fetch(`http://localhost:5678/api/works/${elementId}`,  {
           method: "DELETE",
           headers: {"content-type": "application/json", "Authorization": "Bearer "+ localStorage.getItem("token")}
        })
        
        .then(reponse => {
            if (reponse.ok) {
                console.log("le projet a été supprimé")
                test()
                
                console.log(works)
            } else {
                console.log("erreur dans la supression du projet")
            }
        })
        
}





/***** Partie Ajout de Projet ******/

const btnAjouter = document.querySelector(".btnModal")
const titreModal = document.querySelector(".modal-wrapper h2")

btnAjouter.addEventListener("click", function() {
    galleryModal.innerHTML = ""
    titreModal.innerHTML = "Ajout Photo"
    btnAjouter.style.display = "none"
    const trait = document.querySelector(".trait")
    trait.style.display = "none"
    
    galleryModal.innerHTML = `
    <div>
        <button id="btnPrecedent"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="photoFile">
            <span id="iconePhoto"><i class="fa-solid fa-image"></i></span>
            <br></br>
            <button type="submit">+ Ajouter photo</button>
            <p>jpg. png : 4mo max</p>
        </div>
    
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
            <hr class="traitAjout"></hr>
            <input id ="btnValider" type="submit" value="Valider">
        </form>
    </div>
    `
    const btnPrecedent = document.getElementById("btnPrecedent")
    btnPrecedent.addEventListener("click", function() {
    galleryModal.innerHTML = ""
    titreModal.innerHTML = "Galerie photo"
    btnAjouter.style.display = ""
    trait.style.display = ""
    genererGalleryModal(works)
})
})

/***** bouton précédent modal ******/




