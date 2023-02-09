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
          renderCard(data[0]);
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

function renderCard({ name, capital, population, flags, languages }) {
  console.log(name.official);
  console.log(capital[0]);
  console.log(population);
  console.log(flags.svg);
  console.log(Object.values(languages));
}
function renderList(arrayOfObjects) {
  console.log('started');
  const listArray = arrayOfObjects.map(item => {
    const listData = {};
    listData.name = item.name;
    listData.flag = item.flags.svg;
    return listData;
  });
  console.log(listArray);
  //   let markup = '';
  const markup = listArray
    .map(item => {
      return `<li class="country-list__item"><a href="#" class="country-list__link"><img src="${item.flag}" alt="Flag of ${item.name}" width="200" height="" /><p class="country-list__name">${item.name.official}</p></a></li>`;
    })
    .join('');

  countryList.innerHTML = markup;
  console.log('markup: ' + markup);
  console.log(done);
  return listArray;
}
