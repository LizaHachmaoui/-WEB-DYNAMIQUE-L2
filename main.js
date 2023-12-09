const gallery = document.querySelector('.image-container');


async function ghibliApi() {
    const res = await fetch('https://ghibliapi.vercel.app/films');
    const films = await res.json();

    displayMovies(films);
}

function displayMovies(films) {
    for (let film of films) {
        console.log(film.title, film.image);
        if (film.image) {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');

            const img = document.createElement('img');
            img.src = film.image;

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('details-container');

            const title = document.createElement('h2');
            title.textContent = film.title;
            title.classList.add('title');

            const originalTitle = document.createElement('p');
            originalTitle.textContent = film.original_title;
            originalTitle.classList.add('originalTitle');

            const producer = document.createElement('p');
            producer.textContent = film.producer;
            producer.classList.add('producer');

            const year = document.createElement('p');
            year.textContent = film.release_date
            year.classList.add('year');

            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';
            viewButton.classList.add('viewButton');

            viewButton.addEventListener('click', () => {
                openModal(film);
            });

            detailsContainer.append(title, originalTitle, producer);
            movieContainer.append(img, detailsContainer, viewButton, year);
            gallery.append(movieContainer);
            

        }
    }
}

function openModal(film) {
    modalDetailsContainer.innerHTML = `
        <img src="${film.image}" alt="${film.title}" class="modal-image">
        <h2>${film.title}</h2>
        <p>${film.description}</p>
    `;
    
    modalOverlay.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.classList.remove('modal-open');
}

ghibliApi();

