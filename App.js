let form = document.querySelector('#SearchForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    delprevResults();
    let genre = form.category.value;
    const res = await axios.get(` https://api.tvmaze.com/search/shows?q=${form.elements.query.value}`);
    if (res.data.length !== 0) {
        let shows = res.data;
        addResult(shows,genre);
    }
    else {
        addnotfound();
    }
});



function addResult(shows, genre) {
    let flag = false;
    
    for (let results of shows) {
        let genres = results.show.genres;
        if (genres.length !== 0 && results.show.image && genres.includes(genre) || results.show.image && genre === 'Select Genre'  ) {
            flag = true;
            let URL = results.show.image.medium;
            const div = document.createElement('div');
            const img = document.createElement('IMG');
            const h4 = document.createElement('h4');
            const link = document.createElement('a');
            link.id = 'dvs';
            let ref = results.show.officialSite;
            div.id = 'results';
            img.id = 'dvs';
            img.src = URL;
            h4.innerText = results.show.name;
            h4.id = 'dvs';
            div.appendChild(img);
            if (ref != null) {
                link.href = ref;
                link.target = 'blank';
                link.innerText = "Go-to"
                div.appendChild(link);
            }
            div.appendChild(h4);
            div.classList.add("zoom");
            const shows = document.querySelector('#movies');
            shows.append(div);
        }
    }
    if (!flag) {
            addnotfound(); 
    }
}

function delprevResults() {
    const shows = document.querySelector('#movies');
    let h2 = document.querySelector('#popmovies');
    if (h2) {
        shows.removeChild(h2);
    }
    let divs = document.querySelectorAll('div');
    for (let div of divs) {
        shows.removeChild(div);
    }
}

function addnotfound() {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.style.color = 'white';
    h2.style.fontFamily = 'JetBrains Mono';
    h2.style.fontSize = '30px';
    h2.style.padding = '40px';
    h2.style.margin = 'auto';
    h2.style.display = 'flex';
    h2.style.justifyContent = 'space-around';
    h2.innerText = "No Search Results Found!!";
    div.appendChild(h2);
    const shows = document.querySelector('#movies');
    shows.append(div);
}

