const getWorks = await fetch("http://localhost:5678/api/works")
const works = await getWorks.json()

const getCategory = await fetch("http://localhost:5678/api/categories")
const category = await getCategory.json()

const sectionProjets = document.querySelector("#portfolio h2")
const gallery = document.querySelector(".gallery")
const divProjets = document.createElement("div")

sectionProjets.appendChild(divProjets)


/***** Affichage des projets *****/

function genererWorks(works) {
    gallery.innerHTML = ""

    for (let i = 0; i < works.length; i++) {

        const figureProjet = document.createElement("figure")

        const imageProjet = document.createElement("img")
        imageProjet.src = works[i].imageUrl
        imageProjet.alt = "Image" + works[i].title

        const figCaption = document.createElement("figcaption")
        figCaption.innerText = works[i].title

        gallery.appendChild(figureProjet)
        figureProjet.appendChild(imageProjet)
        figureProjet.appendChild(figCaption)
    }
}

genererWorks(works)

/***** Création boutons "Tous" *****/

const btnTous = document.createElement("button")
btnTous.innerText = "Tous"
btnTous.classList.add("styleBtn")
divProjets.appendChild(btnTous)

btnTous.addEventListener("click", function() {
    genererWorks(works)
})

/***** Création des autres boutons *****/

function filtrage(projetFiltre) {
    let j = 0
    const btnFiltrer = []
    for (let i = 0; i < works.length; i++) {
        if (works[i].category.name === projetFiltre) {
            btnFiltrer[j] = works[i]
            j++
        }
    }
    genererWorks(btnFiltrer)
}


for (let i = 0; i < category.length; i++) {
    const btn = document.createElement("button")
    btn.innerText = category[i].name
    btn.classList.add("styleBtn")
    divProjets.appendChild(btn)

    btn.addEventListener("click", function() {
        const projetFiltre = btn.innerText
        console.log(projetFiltre)
        filtrage(projetFiltre)
    })
}





