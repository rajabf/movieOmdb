// Promise -> Vada

// pending -> kurilmoqda
// fullfilled -> to'ldirilgan
// rejected -> rad etilgan

// const vada = new Promise((resolve, reject) => {
//     let vijdon = true
//     if(vijdon)
    //         resolve('Vijdon')
//     else
//         reject('Vijdon emas')
// })

// vada.then(response => console.log(response))
// .catch(err => console.error(err))
// .finally(() => console.log('bajarildi'));

let elList = document.querySelector('.list')
let elInput = document.querySelector('.input')
let elSubmit = document.querySelector('.submit')
let elForm = document.querySelector('.input-form')
let togleDiv = document.getElementById('exampleModal')

fetch(`https://www.omdbapi.com/?apikey=efc24d52&s=naruto`)
    .then(res => res.json())
    .then(data => {
        data.Search.forEach(element => {
            let result = 
            {
                poster: element.Poster,
                title: element.Title,
                year: element.Year,
                type: element.Type
            }
            renderResults(result)
        })
    })
    .catch(err => console.error(err))

function modalRender(obj){
    elList.innerHTML = 
    `
    <div class="card" style="width: 18rem">
        <img src="${result.poster}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">${result.year}</p>
            <p class="card-text">${result.type}</p>
            <a href="#" class="btn btn-primary" onclick="fetchMore('${result.title}')">learn more</a>
        </div>
    </div>
    `
}

function fetchMore(name){
    // console.log(name);
    fetch(`https://www.omdbapi.com/?apikey=efc24d52&t=${name}`)
    .then(res => res.json())
    .then(data => {
        let result += 
        {
            title: data.Title,
            year: data.Year,
            rated: data.Rated,
            released: data.Released,
            runtime: data.Runtime,
            genre: data.Genre,
            director: data.Director,
            writer: data.Writer,
            actors: data.Actors,
            plot: data.Plot,
            languege: data.Language,
            country: data.Country,
            awards: data.Awards,
            poster:data.Poster,
            ratingSource: data.Ratings[0].Source,
            ratingValue: data.Ratings[0].Value,
            metascore: data.Metascore,
            imdbRating: data.imdbRating,
            imdbVotes: data.imdbVotes,
            imdbID: data.imdbID,
            type: data.Type,
            totalSeasons: data.totalSeasons,
            response: data.Response
        }
        modalRender(result)
    })
    .catch(err => console.error(err))
}

function renderResults(result){
    elList.innerHTML += 
    `
    <li class="result-item" style="width: 18rem; list-style: none;">
        <div class="card" style="width: 18rem">
            <img src="${result.poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">${result.year}</p>
                <p class="card-text">${result.type}</p>
                <a href="#" class="btn btn-primary" onclick="fetchMore('${result.title}')">learn more</a>
            </div>
        </div>
    </li>
    `
}

elForm.addEventListener('submit', evt => {
    elList.innerHTML = ''
    evt.preventDefault();
    fetch(`https://www.omdbapi.com/?apikey=efc24d52&s=${elInput.value}`)
    .then(res => res.json())
    .then(data => {
        data.Search.forEach(element => {
            let result = 
            {
                poster: element.Poster,
                title: element.Title,
                year: element.Year,
                type: element.Type
            }
            renderResults(result)
        })
    })
    .catch(err => console.error(err))
    
    console.log(elList);
})