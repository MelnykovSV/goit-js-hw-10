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
          console.log('found one country');
          renderInfo(data[0]);
          return;
        }
        if (data.length > 10) {
          console.log('to many countries found');
          return;
        }
        // console.log(data);
        renderList(data);
        return data;
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, 300)
);

function inputToQuery() {
  return searchBox.value;
}

function renderInfo({ name, capital, population, flags, languages }) {
  countryList.innerHTML = '';
  console.log(name.official);
  console.log(capital[0]);
  console.log(population);
  console.log(flags.svg);
  console.log(Object.values(languages));
  const markup = `<div class="country-info__name-container"><img src="${
    flags.svg
  }" alt="Flag of ${
    name.official
  }" width="200" height="" class="country-info__flag"/><p class="country-info__name">${
    name.official
  }</p></div><div class='country-info__capital'>${
    capital[0]
  }</div><div class='country-info__population'>${population}</div><div class='country-info__languages'>${Object.values(
    languages
  )}</div>`;

  console.log(markup);
  countryInfo.innerHTML = markup;
}
function renderList(arrayOfObjects) {
  countryInfo.innerHTML = '';
  console.log('started');
  const listArray = arrayOfObjects.map(item => {
    const listData = {};
    listData.name = item.name;
    listData.flag = item.flags.svg;
    return listData;
  });
  console.log(listArray);
  const markup = listArray
    .map(item => {
      return `<li class="country-list__item"><img src="${item.flag}" alt="Flag of ${name.official}" width="40" height="" class="country-list__flag"/><p class="country-list__name">${item.name.official}</p></li>`;
    })
    .join('');

  countryList.innerHTML = markup;
  countryList.classList.add('animate__animated');
  countryList.classList.add('animate__slideInDown');
  console.log('markup: ' + markup);
  console.log(done);
  return listArray;
}
