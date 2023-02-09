import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(() => {
    const valueToSearch = inputToQuery();

    fetchCountries(valueToSearch)
      .then(data => {
        if (data.length === 1) {
          renderInfo(data[0]);
          return;
        }
        if (data.length > 10) {
          Notiflix.Notify.warning('To many countries found');
          countryInfo.classList.remove('active');
          countryList.classList.remove('active');
          countryInfo.classList.add('visually-hidden');
          countryList.classList.add('visually-hidden');
          return;
        }
        renderList(data);
        return data;
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryInfo.classList.remove('active');
        countryList.classList.remove('active');
        countryInfo.classList.add('visually-hidden');
        countryList.classList.add('visually-hidden');
      });
  }, 300)
);

function inputToQuery() {
  return searchBox.value;
}

function renderInfo({ name, capital, population, flags, languages }) {
  countryList.innerHTML = '';
  countryList.classList.remove('active');

  countryList.classList.add('visually-hidden');
  const markup = `<div class="country-info__name-container"><img src="${
    flags.svg
  }" alt="Flag of ${
    name.official
  }" width="40" height="" class="country-info__flag"/><p class="country-info__name">${
    name.official
  }</p></div><div class='country-info__capital'><span class="bold">Capital: </span>${
    capital[0]
  }</div><div class='country-info__population'><span class="bold">Population: </span>${population}</div><div class='country-info__languages'><span class="bold">Languages: </span>${Object.values(
    languages
  ).join(', ')}</div>`;

  countryInfo.classList.add('active');
  countryInfo.classList.remove('visually-hidden');
  countryInfo.innerHTML = markup;
}
function renderList(arrayOfObjects) {
  countryInfo.classList.remove('active');
  countryInfo.classList.add('visually-hidden');
  countryInfo.innerHTML = '';
  const listArray = arrayOfObjects.map(item => {
    const listData = {};
    listData.name = item.name;
    listData.flag = item.flags.svg;
    return listData;
  });
  const markup = listArray
    .map(item => {
      return `<li class="country-list__item"><img src="${item.flag}" alt="Flag of ${name.official}" width="40" height="" class="country-list__flag"/><p class="country-list__name">${item.name.official}</p></li>`;
    })
    .join('');

  countryList.innerHTML = markup;
  countryList.classList.add('active');
  countryList.classList.remove('visually-hidden');
  return listArray;
}
