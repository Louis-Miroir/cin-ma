function afficherfilm(filmId, nomFilmDiv, posterDiv, descriptionDiv) {
    fetch(`http://www.omdbapi.com/?i=${filmId}&apikey=2cfb4a90`)
        .then(response => response.json())
        .then(data => {
            const posterFilm = data.Poster;
            
            nomFilmDiv.innerHTML = `<a href="movie.html?id=${filmId}">${data.Title}</a>`;
            descriptionDiv.innerHTML = data.Plot;
            posterDiv.style.backgroundImage = `url(${posterFilm !== "N/A" ? posterFilm : "https://via.placeholder.com/100"})`;
        })
        .catch(error => {
            console.error("Erreur :", error);
            nomFilmDiv.innerHTML = "Titre non disponible";
            descriptionDiv.innerHTML = "Description non disponible";
            posterDiv.style.backgroundImage = `url('https://via.placeholder.com/100')`;
        });
}

afficherfilm("tt5040012", document.getElementById("nomfilm1"), document.getElementById("poster1"), document.getElementById("description1"));
afficherfilm("tt1262426", document.getElementById("nomfilm2"), document.getElementById("poster2"), document.getElementById("description2"));
afficherfilm("tt18259086", document.getElementById("nomfilm3"), document.getElementById("poster3"), document.getElementById("description3"));

const liste = ["tt18259086", "tt0387564", "tt18259086", "tt17279496", "tt26753003", "tt26442053"];
let filmIndex = 3;

function ajouterFilm() {
    if (filmIndex < liste.length) {
        const filmId = liste[filmIndex];
        filmIndex++;

        const filmsContainer = document.querySelector('.films');
        const filmDiv = document.createElement('div');
        filmDiv.classList.add('film');

        const nomFilmDiv = document.createElement('div');
        const posterDiv = document.createElement('div');
        const descriptionDiv = document.createElement('div');

        nomFilmDiv.classList.add('nomfilm');
        posterDiv.classList.add('poster');
        descriptionDiv.classList.add('description');

        filmDiv.appendChild(nomFilmDiv);
        filmDiv.appendChild(posterDiv);
        filmDiv.appendChild(descriptionDiv);

        filmsContainer.appendChild(filmDiv);

        afficherfilm(filmId, nomFilmDiv, posterDiv, descriptionDiv);
    }
}

document.getElementById('btn').addEventListener('click', ajouterFilm);