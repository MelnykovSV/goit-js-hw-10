import { fetchCountries } from './fetchCountries';
const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', () => {
  const valueToSerach = inputToQuery();
  fetchCountries(valueToSerach);
});

function inputToQuery() {
  console.log(searchBox.value);
  return searchBox.value;
}

// fetchCountries('somerandomshit');
