import Notiflix from 'notiflix';

export function fetchCountries(inputToSearch) {
  fetch(
    `https://restcountries.com/v3.1/name/${inputToSearch}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
