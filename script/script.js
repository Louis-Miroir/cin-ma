function afficherfilm(filmId, film, poster) {
    fetch(` http://www.omdbapi.com/?i=${filmId}&apikey=2cfb4a90`)
        .then(response => response.json())
        .then(data => {
            const posterFilm = data.Poster;

            document.getElementById(film).innerHTML = data.Title;
           
            document.getElementById(poster).style.backgroundImage = `url(${posterFilm})`;
        });
}

afficherfilm("tt18259086", "nomfilm1", "poster1");
afficherfilm("tt0387564", "nomfilm2", "poster2");
afficherfilm("tt18259086", "nomfilm3", "poster3");
