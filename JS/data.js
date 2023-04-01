let KEY ="d33efd33";
let elForm = select("#form");
let elGenerSelect = select("#generSelect");
let elCardTem = select("#cardTemplate").content;
let elList = select("#list");
let elModalTem = select("#modal__template").content;






elForm.addEventListener("submit", evt =>{
    evt.preventDefault()
    
    let {search, genre , sortBy} =evt.target.elements
    
    
    getApi(search.value.trim(), KEY);
    let regex = new RegExp(search.value.trim(),"gi");
    
    let poiscFilms = data.filter((film) => 
        film.Title.match(regex));
    
    
    if(genre.value !="all"){
        let filtrPoiscByGenre = poiscFilms.filter((film) => 
        film.genres.includes(genre.value));
        //    console.log(filtrPoiscByGenre);
        
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

async function getApi(Search, key,year) {
    let data = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${Search}&y=${year}`)
    .then(resource => resource.json())
    .then ((data) => data.Search)
    .catch(error => console.log(error))
    console.log(data);
    
    renderFunc(data, elList);
}



function renderFunc(array, element){
    
    element.innerHTML = null;

    array.forEach(film => {
        let cloneTemplate =elCardTem.cloneNode(true);
        let li =select("li",cloneTemplate);
        let h2 =select("h2",cloneTemplate);
        let img =select("img",cloneTemplate);
    
        
        h2.textContent = film.Title;
        img.src =film.Poster;
        // btn.dataset.id=film.imdbID;



        // btn.addEventListener("click",(evt) =>{
        //     document.querySelector('#modal__template').setAttribute('style','display: block',)
        //     let filmId =evt.target.dataset.id;
        //     let cloneTemplateModal=elModalTem.cloneNode(true);
        //     let fountFilm =array.find((item) => item.id==filmId); 
        //     let ModalBox=select("#modal__box",cloneTemplateModal);
        //     let iframe=select("img",cloneTemplateModal);
        //     let h2= select("h2",cloneTemplateModal);
        //     let h3= select("h3",cloneTemplateModal);
        //     let p= select("p",cloneTemplateModal);
            
        //     iframe.src =fountFilm.Poster;
        //     h2.textContent= fountFilm.Title;
        //     h3.textContent= `Genres: ${fountFilm.genres.join(', ')}`; 
        //     p.textContent= fountFilm.overview;
            
        //     document.querySelector("body").append(ModalBox);    
    // })
        
        element.append(li)
    });
    
    
    
}
// renderFunc(KEY, elList)