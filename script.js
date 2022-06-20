const ApiKey = 'bb96eaa1c71307f287297dde58cc7c30';
const lancamentos = document.querySelectorAll("#lancamentos-container");
const avaliacoesHtml = document.querySelectorAll(".avaliacoes-container");
let moviesData = [];
let countAvaliacoes = 0;

const renderAvaliacoes = (avaliacoes) => {
    if(countAvaliacoes >= 6 || avaliacoes[0].content.length > 1200){
        return
    }
    if(avaliacoes[0] != null){
        countAvaliacoes+= 1;
    }

    let avatar = avaliacoes[0].author_details.avatar_path
    if(avatar.includes('https')){
        avatar = avatar.replace(/^./, ""); 
    }else{
        avatar = `https://image.tmdb.org/t/p/w300/${avatar}`;
    }

    const avaliacaoDiv = document.createElement("div");
    avaliacaoDiv.classList.add("col-xl-4", "col-lg-6", "col-md-6");

    const avaliacaoCard = document.createElement("div");
    avaliacaoCard.classList.add("card", "mb-3", "avaliacoes-card");
    
    avaliacaoDiv.appendChild(avaliacaoCard);

    const avaliacaoRow = document.createElement("div");
    avaliacaoRow.classList.add("row", "g-0");

    avaliacaoCard.appendChild(avaliacaoRow);

    const avaliacaoAuthorAvatar = document.createElement("div");
    avaliacaoAuthorAvatar.classList.add("col-md-2", "avaliacoes-user");

    avaliacaoRow.appendChild(avaliacaoAuthorAvatar);
    
    const AvatarImg = document.createElement("img");
    AvatarImg.classList.add("img_author");
    AvatarImg.src = `${avatar}`;
    
    avaliacaoAuthorAvatar.appendChild(AvatarImg);

    const descAuthor = document.createElement("div");
    descAuthor.classList.add("col-md-10");

    avaliacaoRow.appendChild(descAuthor);

    const cardbodyAuthor = document.createElement("div");
    cardbodyAuthor.classList.add("card-bod");
    
    descAuthor.appendChild(cardbodyAuthor);
    
    const authorName = document.createElement("h5");
    authorName.classList.add("card-title");
    authorName.innerHTML = avaliacoes[0].author;

    const authorContent = document.createElement("p");
    authorContent.classList.add("card-text");
    authorContent.innerHTML = `<strong>Avaliação: </strong>${avaliacoes[0].content}`;

    const authorLastUpdate = document.createElement("p");
    authorLastUpdate.classList.add("card-text");
    authorLastUpdate.innerHTML = `<strong>Atualizado em: </strong>${avaliacoes[0].updated_at}`;
    
    cardbodyAuthor.appendChild(authorName);
    cardbodyAuthor.appendChild(authorContent);
    cardbodyAuthor.appendChild(authorLastUpdate);
    avaliacoesHtml[0].appendChild(avaliacaoDiv);
};

const renderMovies = (movies) => {
    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("lancamento-card", "card", "col-xl-2", "col-lg-4", "col-md-6");
        
        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        
        const movieTitle = document.createElement("h3");
        movieTitle.innerHTML = movie.title;
        
        const movieReleaseDate = document.createElement("p");
        movieReleaseDate.innerHTML = 'Data de Lançamento: ' +movie.release_date;
        
        const movieStars = document.createElement("p");
        const stars = Math.round(movie.vote_average/2);
        for (let index = 0; index < stars; index++) {
            const star = document.createElement("span");
            star.classList.add('lancamentos-star-full');
            movieStars.appendChild(star);
        }
        for (let index = 0; index < (5-stars); index++) {
            const star = document.createElement("span");
            star.classList.add('lancamentos-star-out');
            movieStars.appendChild(star);
        }
        const movieVoteCount = document.createElement("span");
        movieVoteCount.innerHTML = '  ' + movie.vote_count + ' votos';
        movieStars.appendChild(movieVoteCount)
        
        const movieDetailsButton = document.createElement("button");
        movieDetailsButton.innerHTML = "Detalhes";
        movieDetailsButton.setAttribute("id", `${movie.id}`);
        movieDetailsButton.classList.add("btn-details");
        
        movieContainer.appendChild(movieImage);
        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(movieReleaseDate);
        movieContainer.appendChild(movieStars);
        movieContainer.appendChild(movieDetailsButton);

        lancamentos[0].appendChild(movieContainer);

        fetchReviews(movie.id).then((res) =>{
            renderAvaliacoes(res)
        })
    })
    fetchMovieById();
};

const fetchMovies = async () => {
    const result = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${ApiKey}&language=pt-BR`
    );
    const data = await result.json();
    return data.results;
};

const fetchReviews = async (movie_id) => {
    const result = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${ApiKey}&language=pt-BR`
    );
    const data = await result.json();
    return data.results;
};

window.onload = () => {
    fetchMovies().then((res) =>{
        moviesData = res;
        renderMovies(moviesData);
    });
}

const search = document.querySelector("#busca");
search.addEventListener("keyup", (event) => {
    const inputValue = event.target.value;
    const filterMoviesData = moviesData.filter((movie) => movie.title.toLowerCase().includes(inputValue.toLowerCase()));
    lancamentos[0].innerHTML = "";
    renderMovies(filterMoviesData);
})

const fetchMovieById = () => {
    let movieDetailsButton = document.querySelectorAll(".btn-details");
    
    movieDetailsButton.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${event.target.id}?api_key=${ApiKey}&language=pt-BR`
            );
            let data = await res.json();
            localStorage.setItem("movieData", JSON.stringify(data));
            window.location.href = "detalhes.html";
            return data;
        });
    });
};