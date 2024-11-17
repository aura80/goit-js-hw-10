
// import axios from 'axios';

// const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
// const ENDPOINT_SEARCH = 'https://api.thecatapi.com/v1/images/search';

// const API_KEY =
//   'live_g35nUQ6dKqrhb0EPxHZU5PrFcgDxDxwBXisPV7cxSG7VLBcvCPJDyeeRNxhBo4bC';

// axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

//  async function fetchBreeds() {
//   const res = await axios.get(`${ENDPOINT}`);
//     // console.dir(res);
//     return res.data;
// }

//  async function fetchCatByBreed(breedId) {
//   const res = await axios.get(`${ENDPOINT_SEARCH}?breed_ids=${breedId}`);
// //   console.dir(res);
//   return res.data;
// };

// export { fetchBreeds, fetchCatByBreed };

import axios from 'axios';

// endpoints for 'The Cat API' API's
const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const ENDPOINT_SEARCH = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_g35nUQ6dKqrhb0EPxHZU5PrFcgDxDxwBXisPV7cxSG7VLBcvCPJDyeeRNxhBo4bC';

// setting the API key for all axios request
axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

// it returns a list of cats breeds
async function fetchBreeds() {
  const res = await axios.get(ENDPOINT);
  return res.data;
}

// it returns infos for one cat based on the breed ID
async function fetchCatByBreed(breedId) {
  const res = await axios.get(`${ENDPOINT_SEARCH}?breed_ids=${breedId}`);
  return res.data; // return all the matrix data
}

// export functions to be used in index.js
export { fetchBreeds, fetchCatByBreed };
