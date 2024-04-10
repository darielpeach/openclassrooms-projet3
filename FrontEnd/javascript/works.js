const getWorks = await fetch("http://localhost:5678/api/works")
const works = await getWorks.json()

const getCategory = await fetch("http://localhost:5678/api/categories")
const category = await getCategory.json()

const sectionPortfolioTitre = document.querySelector("#portfolio h2")
const introPorfolio = document.getElementById("introPortfolio")
const gallery = document.querySelector(".gallery")
const divBtn = document.getElementById("divBtn")
divBtn.classList.add("divProjets")





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

/***** Partie Login *****/

let token = localStorage.getItem("token");
const projetModal = document.querySelector("#portfolio")

if (token !== null) {

    const btnLogin = document.getElementById("login")
    btnLogin.style.display = "none"

    const btnLogout = document.getElementById("logout")
    btnLogout.style.display = "block"

    const btnModifier = document.getElementById("btnModifier")
    btnModifier.style.display = "block"

    const stylEdition = document.querySelector(".modeEdition")
    stylEdition.style.display =""
    
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("token")
        location.reload()
    })
}



/***** Création boutons "Tous" *****/

const btnTous = document.createElement("button")
btnTous.innerText = "Tous"
btnTous.classList.add("styleBtn", "btnClicked")
divBtn.appendChild(btnTous)

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
    divBtn.appendChild(btn)

    btn.addEventListener("click", function() {
        const projetFiltre = btn.innerText
        console.log(projetFiltre)
        filtrage(projetFiltre)
    })
}

const btnClicked = document.querySelectorAll(".styleBtn")

btnClicked.forEach(button => {
    button.addEventListener("click", function(event){
        btnClicked.forEach(btn => {
            btn.classList.remove("btnClicked")
        })
        const btnSelected = event.target
        btnSelected.classList.add("btnClicked")
    })
})







    



