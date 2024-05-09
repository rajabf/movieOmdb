let elList = document.querySelector('.list')
let elInput = document.querySelector('.input')
let elSubmit = document.querySelector('.submit')
let elForm = document.querySelector('.input-form')
let togleDiv = document.getElementById('exampleModal')
let leftSide = document.querySelector('.more-left')

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
    leftSide.innerHTML = 
    `
    <div class="card mb-3 p-3 text-bg-ligh" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img class="img-fluid rounded-star" src="${obj.poster}"  alt="poster">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title"><b>Name:</b> ${obj.title}</h5>
                    <p class="card-text"><b>Year:</b> ${obj.year}</p>
                    <p class="card-text"><b>Rating:</b> ${obj.rated}</p>
                    <p class="card-text"><b>Released:</b> ${obj.released}</p>
                    <p class="card-text"><b>Duration:</b> ${obj.runtime}</p>
                    <p class="card-text"><b>Genre:</b> ${obj.genre}</p>
                    <p class="card-text"><b>Director:</b> ${obj.director}</p>
                    <p class="card-text"><b>Writer:</b> ${obj.writer}</p>
                    <p class="card-text"><b>Actors:</b> ${obj.actors}</p>
                    <p class="card-text"><b>Plot:</b> ${obj.plot}</p>
                    <p class="card-text"><b>Language:</b> ${obj.languege}</p>
                    <p class="card-text"><b>Country:</b> ${obj.country}</p>
                    <p class="card-text"><b>Awards:</b> ${obj.awards}</p>
                    <p class="card-text"><b>Rating Source:</b> ${obj.ratingSource}</p>
                    <p class="card-text"><b>Value:</b> ${obj.ratingValue}</p>
                    <p class="card-text"><b>Metascore:</b> ${obj.metascore}</p>
                    <p class="card-text"><b>imdbRating:</b> ${obj.imdbRating}</p>
                    <p class="card-text"><b>imdbVotes:</b> ${obj.imdbVotes}</p>
                    <p class="card-text"><b>imdbID:</b> ${obj.imdbID}</p>
                    <p class="card-text"><b>type:</b> ${obj.type}</p>
                    <p class="card-text"><b>totalSeasons:</b> ${obj.totalSeasons}</p>
                    <p class="card-text"><b>response:</b> ${obj.response}</p>
                    <button class="btn btn-primary" onclick="fetchMore('${obj.title}')">learn more</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function fetchMore(name){
    // console.log(name);
    fetch(`https://www.omdbapi.com/?apikey=efc24d52&t=${name}`)
    .then(res => res.json())
    .then(data => {
        let result = 
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
    leftSide.innerHTML = ''
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