const getWorks = await fetch("http://localhost:5678/api/works")
const works = await getWorks.json()

const getCategory = await fetch("http://localhost:5678/api/categories")
export const category = await getCategory.json()



const gallery = document.querySelector(".gallery")
const divBtn = document.getElementById("divBtn")
divBtn.classList.add("divProjets")





/***** Affichage des projets *****/

export async function genererWorks(works) {
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


if (token !== null) {

    const btnLogin = document.getElementById("login")
    btnLogin.style.display = "none"

    const btnLogout = document.getElementById("logout")
    btnLogout.style.display = "block"

    const btnModifier = document.getElementById("btnModifier")
    btnModifier.style.display = "block"

    
    
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("token")
        location.reload()
    })
    const body = document.body
    const divEdition = document.createElement('div')
    const modeEdition = document.createElement('p')
    const iconEdition = document.createElement('i')


    divEdition.classList.add("modeEdition")
    iconEdition.classList.add('fa-solid', 'fa-pen-to-square')
    modeEdition.innerText = " Mode édition"

    body.insertBefore(divEdition, body.firstChild)
    divEdition.appendChild(iconEdition)
    divEdition.appendChild(modeEdition)

}



/***** Création boutons "Tous" *****/
async function generationBtnTous() {
    const getWorks = await fetch("http://localhost:5678/api/works")
    const works = await getWorks.json()
    genererWorks(works)
}
const btnTous = document.createElement("button")
btnTous.innerText = "Tous"
btnTous.classList.add("styleBtn", "btnClicked")
divBtn.appendChild(btnTous)

btnTous.addEventListener("click", function() {
    generationBtnTous()
})

/***** Création des autres boutons *****/

async function filtrage(projetFiltre) {
    const getWorks = await fetch("http://localhost:5678/api/works")
    const works = await getWorks.json()
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







    



