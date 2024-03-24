const reponse = await fetch('http://localhost:5678/api/works')
const works = await reponse.json()

function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
        
        const projet = works[i]

        const sectionGallery = document.querySelector(".gallery")

        const figure = document.createElement("figure")
        const imageProjet = document.createElement("img")
        imageProjet.src = projet.imageUrl
        imageProjet.alt = projet.title 
        const figCaption = document.createElement("figcaption")
        figCaption.innerText = projet.title

        sectionGallery.appendChild(figure)
        figure.appendChild(imageProjet)
        figure.appendChild(figCaption)
    }
}

genererWorks(works);