let currentPage = 1;
let currentQuery = "";

document.getElementById("load-more-button").addEventListener("click", function () {
    currentPage++;
    searchMovies(currentQuery, currentPage);
});

document.getElementById("search-input").addEventListener("input", function () {
    currentQuery = document.getElementById("search-input").value.trim();
    currentPage = 1;
    searchMovies(currentQuery, currentPage);
});

function searchMovies(query, page) {
    const apiKey = "2cfb4a90"; 
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`;

    
    const resultsDiv = document.getElementById("results");
    if (page === 1) {
        resultsDiv.innerHTML = "";
    }

    if (query === "") {
        resultsDiv.innerHTML = "<p>Veuillez entrer un titre.</p>";
        return;
    }

   
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                data.Search.forEach((movie, index) => {
                    const filmIndex = (page - 1) * 10 + index + 1;
                    const movieDiv = document.createElement("div");
                    movieDiv.classList.add("film");

                    const nomFilmDiv = document.createElement("div");
                    const posterDiv = document.createElement("div");
                    const descriptionDiv = document.createElement("div");

                    const filmIdStr = `nomfilm${filmIndex}`;
                    const posterIdStr = `poster${filmIndex}`;
                    const descriptionIdStr = `description${filmIndex}`;

                    nomFilmDiv.id = filmIdStr;
                    posterDiv.id = posterIdStr;
                    descriptionDiv.id = descriptionIdStr;

                    nomFilmDiv.innerHTML = movie.Title;
                    descriptionDiv.innerHTML = movie.Year;
                    posterDiv.style.backgroundImage = `url(${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100"})`;

                    movieDiv.appendChild(nomFilmDiv);
                    movieDiv.appendChild(posterDiv);
                    movieDiv.appendChild(descriptionDiv);

                    resultsDiv.appendChild(movieDiv);
                });

               
                if (data.totalResults > currentPage * 10) {
                    document.getElementById("load-more-button").style.display = "block";
                } else {
                    document.getElementById("load-more-button").style.display = "none";
                }
            } else {
                resultsDiv.innerHTML = `<p>Aucun résultat trouvé pour "${query}".</p>`;
                document.getElementById("load-more-button").style.display = "none";
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
            resultsDiv.innerHTML = `<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>`;
            document.getElementById("load-more-button").style.display = "none";
        });
}