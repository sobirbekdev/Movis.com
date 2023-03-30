let elForm = select("#form");
let elGenerSelect = select("#generSelect");
let elCardTem = select("#cardTemplate").content;
let elList = select("#list");
let elModalTem = select("#modal__template").content ;

elForm.addEventListener("submit", e =>{
    e.preventDefault()
    
    let {search, genre , sortBy} =e.target.elements
    
    let regex = new RegExp(search.value.trim(), "gi");
    
    let poiscFilms = films.filter((film) => film.Title.match(regex) );
    
    
    if(genre.value !="all"){
        let filtrPoiscByGenre = poiscFilms.filter((film) => film.genres.includes(genre.value));
        console.log(filtrPoiscByGenre);

        poiscFilms=filtrPoiscByGenre;
    }

    if(sortBy.value=="a-z"){
        poiscFilms.sort((a,b) => {
            if(a.Title>b.Title){
                return 1
            }else if(a.Title<b.Title){
                return -1
            }else{
                0
            }
        })
    }else if(sortBy.value=="z-a"){
        poiscFilms.sort((a,b) => {
            if(b.Title>a.Title){
                return 1
            }else if(b.Title<a.Title){
                return -1
            }else{
                0
            }
        })
    }
    renderFunc(poiscFilms,elList);

    
});

function renderGenrel(array, element){
    let generArray =[];
    
    array.forEach((film) =>{
        film.genres.forEach(genre =>{   
            !generArray.includes(genre) ? generArray.push(genre) : null ;
        })
    });
    
    generArray.forEach((genre) =>{
        let newOption =crate("option");
        newOption.textContent =genre;
        newOption.value =genre;
        
        element.append(newOption);
    });
}
renderGenrel(films, elGenerSelect);

function hideModal(){
    document.querySelector('#modal__template').setAttribute('style','display: none',)
}


function renderFunc(array, element){
    
    element.innerHTML = null;
    array.forEach(film => {
        let cloneTemplate =elCardTem.cloneNode(true);
        
        let li =select("li",cloneTemplate);
        let img =select("img",cloneTemplate);
        let h2 =select("h2",cloneTemplate);
        let btn =select("button",cloneTemplate);
        
        
        img.src =film.Poster;
        h2.textContent=film.Title;
        btn.dataset.id=film.id;
        
        
        
        
        btn.addEventListener("click",(evt) =>{
            document.querySelector('#modal__template').setAttribute('style','display: block',)
            let filmId =evt.target.dataset.id;
            let cloneTemplateModal=elModalTem.cloneNode(true);
            let fountFilm =array.find((item) => item.id==filmId); 
            let ModalBox=select("#modal__box",cloneTemplateModal);
            let iframe=select("iframe",cloneTemplateModal);
            let h2= select("h2",cloneTemplateModal);
            let h3= select("h3",cloneTemplateModal);
            let p= select("p",cloneTemplateModal);
            
            iframe.src =fountFilm.link;
            h2.textContent= fountFilm.Title;
            h3.textContent= `Genres: ${fountFilm.genres.join(', ')}`; 
            p.textContent= fountFilm.overview;
            
            document.querySelector("body").append(ModalBox)
            ;    
        })
        
        
        
        
        
        
        
        element.append(li)
    })
}
renderFunc(films, elList)