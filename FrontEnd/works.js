const reponse = await fetch('http://localhost:5678/api/works')
const works = await reponse.json()
const sectionGallery = document.querySelector(".gallery")

/*********** Création des boutons de filtres *****************/

const sectionFiltre = document.querySelector("#portfolio h2")
const divFiltres = document.createElement("div")

const styleBtn = document.createElement("style")
document.head.appendChild(styleBtn)

const cssBtn = `
    .classBtn button {
        font-family: 'Syne';
        color : #1D6154;
        text-align : center;
        margin : 0.5%;
        margin-top : 3em;
        padding : 10px;
        padding-left : 20px ;
        padding-right : 20px;
        width : 5em auto;
        background-color : white;
        border-radius : 60px;
        border : solid 1px #1D6154;
        font-weight : bold;
    }

    .classBtn button:hover {
        color : white;
        background-color : #1D6154;
    }
`
styleBtn.appendChild(document.createTextNode(cssBtn))
divFiltres.classList.add("classBtn")


const btnTous = document.createElement("button")
btnTous.innerText = "Tous"

const btnObjets = document.createElement("button")
btnObjets.innerText = "Objets"

const btnAppartements = document.createElement("button")
btnAppartements.innerText = "Appartements"


const btnHotels = document.createElement("button")
btnHotels.innerText = "Hotels & restaurants"


sectionFiltre.appendChild(divFiltres)
divFiltres.appendChild(btnTous)
divFiltres.appendChild(btnObjets)
divFiltres.appendChild(btnAppartements)
divFiltres.appendChild(btnHotels)


/******************** Génération des travaux ********************/

function genererWorks(works) {
    sectionGallery.innerHTML = ""
    for (let i = 0; i < works.length; i++) {
        
        
        const projet = works[i]

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

/******************** Partie dynamique des boutons *****************/

 /** création d'une fonction pour le trie **/

function filtrerBtn (btnFiltrer, btnName) {
    let j = 0
    for (let i = 0; i < works.length; i++) {
        if (works[i].category.name === btnName) {
            btnFiltrer[j] = works[i]
            j++
        }
    }
    genererWorks(btnFiltrer)
}


btnTous.addEventListener("click", function () {
    genererWorks(works)
})

btnObjets.addEventListener("click", function () {
    const objetsFiltre = []
    const categoryObjets = "Objets"
    filtrerBtn(objetsFiltre, categoryObjets)
})   

btnAppartements.addEventListener("click", function () {
    const appartementsFiltre = []
    const categoryAppartement = "Appartements"
    filtrerBtn(appartementsFiltre, categoryAppartement)
})

btnHotels.addEventListener("click", function () {
    const hotelsFiltre = []
    const categoryHotel = "Hotels & restaurants"
    filtrerBtn(hotelsFiltre, categoryHotel)
})
    


