function afficherfilm(filmId, film, poster,description) {
    fetch(` http://www.omdbapi.com/?i=${filmId}&apikey=2cfb4a90`)
        .then(response => response.json())
        .then(data => {
            const posterFilm = data.Poster;
            
            document.getElementById(film).innerHTML = data.Title;
            document.getElementById(description).innerHTML = data.Plot;
            document.getElementById(poster).style.backgroundImage = `url(${posterFilm})`;
        });
}

afficherfilm("tt18259086", "nomfilm1", "poster1", "description1");
afficherfilm("tt0387564", "nomfilm2", "poster2", "description2");
afficherfilm("tt18259086", "nomfilm3", "poster3", "description3");

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

        const filmIdStr = `nomfilm${filmIndex}`;
        const posterIdStr = `poster${filmIndex}`;
        const descriptionIdStr = `description${filmIndex}`;

        nomFilmDiv.id = filmIdStr;
        posterDiv.id = posterIdStr;
        descriptionDiv.id = descriptionIdStr;

        filmDiv.appendChild(nomFilmDiv);
        filmDiv.appendChild(posterDiv);
        filmDiv.appendChild(descriptionDiv);

        filmsContainer.appendChild(filmDiv);

        afficherfilm(filmId, filmIdStr, posterIdStr, descriptionIdStr);
    }
}

document.getElementById('btn').addEventListener('click', ajouterFilm);
