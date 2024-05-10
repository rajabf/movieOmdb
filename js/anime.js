let animeSearchForm = document.querySelector('.anime-search')
let elAnimeInput = document.querySelector('.animeSearchInput')
let elAnimeSubmit = document.querySelector('.animeSearchSubmit')

animeSearchForm.addEventListener('submit', evt => {
    evt.preventDefault()

    fetch(`https://www.2embed.cc/embed/${elAnimeInput}`)
    .then(data => data.json())
    .then(data => {
        data.forEach(element => {
            console.log(element.title)
        });
    })
    .catch(err => console.error(err))
})