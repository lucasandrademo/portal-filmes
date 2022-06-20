const detalhes = document.querySelectorAll("#detalhes");

const renderMovieData = (data) => {
    console.log(data)


    const divPoster = document.createElement("div");
    divPoster.classList.add("col-lx-6", "col-lg-6", "col-md-12", "col-sm-12", "div-poster");
    
    const poster = document.createElement("img");
    poster.classList.add("img_author");
    poster.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    
    divPoster.appendChild(poster);

    const divDetalhe = document.createElement("div");
    divDetalhe.classList.add("col-lx-6", "col-lg-6", "col-md-12", "col-sm-12", "div-detalhe");
    
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("titulo-detalhe");
    divDetalhe.appendChild(titleDiv);
    const title = document.createElement("h1");
    title.innerHTML = data.title;
    
    titleDiv.appendChild(title);

    const subTitleDiv = document.createElement("div");
    subTitleDiv.classList.add("titulo-detalhe");
    divDetalhe.appendChild(subTitleDiv);
    const subTitle = document.createElement("h4");
    subTitle.innerHTML = data.tagline;
    
    subTitleDiv.appendChild(subTitle);
    
    const voteDiv = document.createElement("div");
    voteDiv.classList.add("desc-detalhe");
    divDetalhe.appendChild(voteDiv);

    const movieStars = document.createElement("p");
    const stars = Math.round(data.vote_average/2);
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
    movieVoteCount.innerHTML = '  ' + data.vote_count + ' votos';
    movieStars.appendChild(movieVoteCount)

    voteDiv.appendChild(movieStars)

    const descDiv = document.createElement("div");
    descDiv.classList.add("desc-detalhe");
    divDetalhe.appendChild(descDiv);
    
    const desc = document.createElement("p");
    desc.innerHTML = data.overview;
    
    descDiv.appendChild(desc);

    const productionDiv = document.createElement("div");
    productionDiv.classList.add("desc-detalhe");
    divDetalhe.appendChild(productionDiv);

    const prodBy = document.createElement("p");
    prodBy.innerHTML = '<strong>Produzido por: </strong>';
    productionDiv.appendChild(prodBy);
    
    data.production_companies.forEach(production => {
        const prodRow = document.createElement("div");
        prodRow.classList.add("row");
        productionDiv.appendChild(prodRow);
        const prodCol1 = document.createElement("div");
        prodCol1.classList.add("col-1");
        prodRow.appendChild(prodCol1);
        if(production.logo_path != null){
            const prodImg = document.createElement("img");
            prodImg.classList.add("img_author");
            prodImg.src = `https://image.tmdb.org/t/p/w500/${production.logo_path}`;
            prodCol1.appendChild(prodImg);
        }
        const prodCol4 = document.createElement("div");
        prodCol4.classList.add("col-4");
        prodRow.appendChild(prodCol4);
        const prod = document.createElement("p");
        prod.classList.add("production");
        prod.innerHTML = production.name + ' - ' + production.origin_country + ' ';
        prodCol4.appendChild(prod);
    });

    const releaseDiv = document.createElement("div");
    releaseDiv.classList.add("desc-detalhe");
    divDetalhe.appendChild(releaseDiv);

    const releaseBy = document.createElement("p");
    releaseBy.innerHTML = `<strong>Lançado em: </strong>${data.release_date} <strong>${data.status}</strong>`;
    releaseDiv.appendChild(releaseBy);

    const movieTimeDiv = document.createElement("div");
    movieTimeDiv.classList.add("desc-detalhe");
    divDetalhe.appendChild(movieTimeDiv);
    const runtimeData = document.createElement("p");
    runtimeData.innerHTML = `${data.runtime} minutos de filme`;
    movieTimeDiv.appendChild(runtimeData);

    const genderDiv = document.createElement("div");
    genderDiv.classList.add("desc-detalhe");
    divDetalhe.appendChild(genderDiv);
    const cardP = document.createElement("p");
    genderDiv.appendChild(cardP);

    data.genres.forEach(genre => {
        const genreSpan = document.createElement("span");
        genreSpan.classList.add("badge", "bg-secondary");
        genreSpan.innerHTML = `${genre.name} `;
        cardP.appendChild(genreSpan);
    });

    detalhes[0].appendChild(divPoster);
    detalhes[0].appendChild(divDetalhe);
}

window.onload = () => {
    const data = JSON.parse(localStorage.getItem("movieData"));
    renderMovieData(data)
}