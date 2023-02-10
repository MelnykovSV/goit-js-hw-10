import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener(
  'input',
  debounce(() => {
    const valueToSearch = searchBox.value.trim();
    if (!valueToSearch) {
      clearElements(countryInfo, countryList);
      hide(countryInfo, countryList);
      return;
    }

    fetchCountries(valueToSearch)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.warning(
            'To many countries found. Please enter a more specific name.'
          );
          clearElements(countryInfo, countryList);
          hide(countryInfo, countryList);
          return;
        }
        if (data.length === 1) {
          renderInfo(data[0]);
          return;
        }
        renderList(data);
        return data;
      })
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        hide(countryInfo, countryList);
      });
  }, DEBOUNCE_DELAY)
);

//renders country card

function renderInfo({ name, capital, population, flags, languages }) {
  clearElements(countryList);
  hide(countryList);
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

  countryInfo.innerHTML = markup;
  show(countryInfo);
}

//renders countries list

function renderList(arrayOfObjects) {
  clearElements(countryInfo);
  hide(countryInfo);
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
  show(countryList);
  return listArray;
}

//hides elements

function hide() {
  for (let i = 0; i < arguments.length; i += 1) {
    arguments[i].classList.remove('active');
    arguments[i].classList.add('visually-hidden');
  }
}

//shows elements

function show() {
  for (let i = 0; i < arguments.length; i += 1) {
    arguments[i].classList.add('active');
    arguments[i].classList.remove('visually-hidden');
  }
}

// clears given Elements

function clearElements() {
  for (let i = 0; i < arguments.length; i += 1) {
    arguments[i].innerHTML = '';
    arguments[i].innerHTML = '';
  }
}
