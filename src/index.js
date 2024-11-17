// for user interface interactions and update of the page info

// import notiflix library
import Notiflix from 'notiflix';

// importing functions from cat-api.js
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
    // selecting working elements
    const breedSelect = document.querySelector('.breed-select');
    const spinnerContainer = document.querySelector('.spinner-container');
    const errorLoader = document.querySelector('.error');
    const catInfoLoader = document.querySelector('.cat-info');

    // hides the initial error message
    errorLoader.classList.add('hidden');

    // event for changing the dropdown selection
    breedSelect.addEventListener("change", onBreedSelect);

    function onBreedSelect(e) {
        // waiting for the page to load
        e.preventDefault();

        // obtaining the ID of the selected breed
        const breedId = e.target.value;
        console.log("Selected breed Id: ", breedId)

        // if ID exists we load data for the selected breed
        if (breedId) {
        loadData(breedId);
        }
    }

    function loadData(breedId) {
        // show spinner
        showLoading();
        console.log("Loading data for Id: ", breedId)

        fetchCatByBreed(breedId)
          .then(data => {
            // taking the first result
            const cat = data[0];
            console.log('Fetching cat breed data: ', cat);

            // if no data found returns error
            if (!cat) {
              showError();
              throw new Error('No cat found!');
            }

            // markup creation for image and text info
            return createMarkup(cat);
          })
          .then(markup => updateCatInfo(markup)) // updating the cat-info div with markup
          .catch(error => {
            showError();
             Notiflix.Notify.failure(`Error fetching cat data: ${error}`);
          })
          .finally(hideLoading); // hiding spinner
    }

    function showLoading() {
        console.log("Show loader");
        spinnerContainer.classList.remove("hidden");    // show spinner
        errorLoader.classList.add('hidden');            // hide error message
        catInfoLoader.classList.add('hidden');          // hide cat-info
    }

    function hideLoading() {
        console.log("Hide loader");
        spinnerContainer.classList.add('hidden');       // hide spinner
        breedSelect.classList.remove("hidden");         // show select drop-down
    }

    function showError() {
      console.log('Show error');
      errorLoader.classList.remove('hidden');       // show error message
      breedSelect.classList.remove('hidden');       // keep select drop-down visible
      catInfoLoader.classList.add('hidden');        // hide cat-info

      setTimeout(() => {
        errorLoader.classList.add('hidden');
      }, 4000);         // error shown for 4 seconds
    }

    function createMarkup(article) {
        console.log('Show article', article);
        const { breeds, url } = article;        // info extraction: breeds and url
        const { name, description, temperament } = breeds[0];   // take info from first breeds element

        console.log("Creating markup");

        return `   
                <img src="${url}" alt="${name}">
                <div class="text">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><strong>Temperament:</strong> ${temperament}</p>
                </div>       
        `;
    }

    function updateCatInfo(markup) {
        console.log("Updating cat info");
        catInfoLoader.innerHTML = markup;   // copy markup content to cat-info innerHTML
        catInfoLoader.classList.remove('hidden');   // show the cat-info new content
    }

    // it returns a list of breeds at page loading
    fetchBreeds()
        .then(breeds => {
            console.log("Fetched breeds: ", breeds);
            breedSelect.innerHTML = breeds
            .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
                .join('');  // we populate the drop-down with breeds
            breedSelect.classList.remove('hidden'); // show drop-down
    })
        .catch(error => {
            showError(); 
             Notiflix.Notify.failure(`Error fetching breeds: ${error}`);
        })
        .finally(hideLoading);      // hide spinner

});
