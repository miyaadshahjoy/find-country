'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Exercises :
/*
// Our First AJAX Call: XMLHttpRequest
const renderCountryData = function (data, className = '') {
  const [currencies] = Object.values(data.currencies);
  const language = Object.values(data.languages);

  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span> ${(
              data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${currencies.name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const findCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountryData(data);
  });
};

// findCountry('Sri Lanka');
// findCountry('Bangladesh');

const findCountryAndNeighbour = function (country) {
  // find country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    renderCountryData(data);
    const neighbouringCountry = data.borders?.[0];

    if (!neighbouringCountry) return;
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbouringCountry}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountryData(data2, 'neighbour');
    });
  });
};

findCountryAndNeighbour('Bangladesh');
findCountryAndNeighbour('Australia');
// findCountryAndNeighbour('usUnited States');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
        setTimeout(() => {
          console.log('5 seconds passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

const getJSON = async function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};
const renderCountryData = function (data, className = '') {
  const [currencies] = Object.values(data.currencies);
  const language = Object.values(data.languages);

  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span> ${(
              data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${currencies.name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const findCountryAndNeighbour = function (country) {
  // find country
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(([data]) => {
      renderCountryData(data);
      const neighbour = data.borders?.[0];
      if (!neighbour) throw new Error('No neighbour found');

      // find neighbouring country
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(([data]) => {
      renderCountryData(data, 'neighbour');
    })
    .catch(err => {
      renderError(`Something went wrong💥💥. ${err.message}. Try again`);
    });
};

findCountryAndNeighbour('bangladesh');

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude, longitude } = position.coords;
    getJSON(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=67217618795933950x103347`
    ).then(data => console.log(data));
  },
  function (error) {
    console.log(error);
  }
);
