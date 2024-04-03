
const getWorks = await fetch("http://localhost:5678/api/works")
const works = await getWorks.json()

const btnCloseModal = document.querySelector(".close-modal")

btnModifier.addEventListener("click", function() {
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
        btnDelete.innerText = "delete"
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

genererGalleryModal(works)

const elementDelete = document.querySelectorAll(".btnDelete")

elementDelete.forEach(button => {
    button.addEventListener("click", function () {
        const elementId = button.id
        
        fetch(`http://localhost:5678/api/works/${elementId}`, {
           method: "DELETE",
           headers: {"content-type": "application/json"},
        })

        .then(reponse => {
            if (reponse.ok) {
                const workADelete = getElementById(elementId)
                workADelete.remove()
            }
        })  
    })
})


