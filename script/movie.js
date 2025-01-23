document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('id');
    const apiKey = "2cfb4a90";

    if (filmId) {
        fetch(`https://www.omdbapi.com/?i=${filmId}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    document.getElementById("film-title").innerHTML = `<h2>${data.Title}</h2>`;
                    document.getElementById("film-poster").style.backgroundImage = `url(${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300"})`;
                    document.getElementById("film-plot").innerHTML = `<p>${data.Plot}</p>`;
                    document.getElementById("film-genre").innerHTML = `<p><strong>Genre:</strong> ${data.Genre}</p>`;
                    document.getElementById("film-actors").innerHTML = `<p><strong>Acteurs:</strong> ${data.Actors}</p>`;
                    
                    // Bonus: notes obtenues par le film
                    const ratings = data.Ratings.map(rating => `<p>${rating.Source}: ${rating.Value}</p>`).join("");
                    document.getElementById("film-ratings").innerHTML = `<div><strong>Notes:</strong> ${ratings}</div>`;
                    
                    // Bonus: date de sortie en DVD formatée en français
                    if (data.DVD !== "N/A") {
                        const dvdDate = new Date(data.DVD);
                        const formattedDate = dvdDate.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                        document.getElementById("film-dvd").innerHTML = `<p><strong>Date de sortie en DVD:</strong> ${formattedDate}</p>`;
                    }
                } else {
                    document.getElementById("film-title").innerHTML = `<p>Film non trouvé.</p>`;
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
                document.getElementById("film-title").innerHTML = `<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>`;
            });
    } else {
        document.getElementById("film-title").innerHTML = `<p>Aucun film sélectionné.</p>`;
    }
});