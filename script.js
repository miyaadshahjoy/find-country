'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
/*
const getLatLng = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getLatLng()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=67217618795933950x103347`
      );
    })

    .then(response => {
      if (!response.ok) throw new Error('Some error occured');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      findCountryAndNeighbour(data.country);
    })

    .catch(err => console.log(err));
};

btn.addEventListener('click', whereAmI);
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject); // the promise will be resolved with the position object or be rejected with an error
  });
};

const whereAmI = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const geoResponse = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=67217618795933950x103347`
    );
    if (!geoResponse.ok) throw new Error('Country not found');
    const geoLocation = await geoResponse.json();
    const country = geoLocation.country;
    findCountryAndNeighbour(country);
  } catch (err) {
    console.error(err);
    renderError(err);
  }
};

btn.addEventListener('click', whereAmI);
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
const getCountry = function () {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const { latitude, longitude } = position.coords;
            return getJSON(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=67217618795933950x103347`
    );
},
    function (error) {
      console.log(error);
    }
);
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

btn.addEventListener('click', function () {
    console.log(getCountry());
});

*/
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
/*
const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=67217618795933950x103347`
  )
    .then(response => {
      if (!response.ok) throw new Error('Some error occured');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      findCountryAndNeighbour(data.country);
    })

    .catch(err => console.log(err));
};

whereAmI(52.508, 13.381);

// The Event Loop in Practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');

// Output:
// Test start
// Test end
// Resolved promise 1
// Resolved Promise 2
// 0 sec timer

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() <= 0.5) resolve('You WIN 💰');
    else reject('You loose the money 💩');
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
.then(() => {
  console.log('1 second passed');
  return wait(1);
})
.then(() => {
  console.log('2 seconds passed');
  return wait(1);
})
.then(() => {
  console.log('3 seconds passed');
  return wait(1);
})
  .then(() => {
    console.log('4 seconds passed');
  });
  
  
  Promise.resolve('abc').then(x => console.log(x));
  Promise.reject('Error').then(err => console.error(err));
  */
// Coding Challenge #2

/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};
let currentImage;
createImage('img/img-1.jpg')
.then(img => {
  currentImage = img;
  console.log('First image loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Second image loaded');

    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));
  
  // Consuming Promises with Async/Await
  // Error Handling With try...catch
  
  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject); // the promise will be resolved with the position object or be rejected with an error
    });
  };

  const whereAmI = async function () {
    try {
      const position = await getPosition();
      const { latitude: lat, longitude: lng } = position.coords;
      const geoResponse = await fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=67217618795933950x103347`
    );
    if (!geoResponse.ok) throw new Error('Country not found');
    const geoLocation = await geoResponse.json();
    const country = geoLocation.country;
    findCountryAndNeighbour(country);
  } catch (err) {
    console.error(err);
    renderError(err);
  }
};

btn.addEventListener('click', whereAmI);

*/
// Running Promises in Parallel

/*
const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(
    `https://restcountries.com/v3.1/name/${c1}`,
    'Country not found'
  );
  console.log(data1.capital);

  const [data2] = await getJSON(
    `https://restcountries.com/v3.1/name/${c2}`,
    'Country not found'
  );
  console.log(data2.capital);

  const [data3] = await getJSON(
    `https://restcountries.com/v3.1/name/${c3}`,
    'Country not found'
  );
  console.log(data3.capital);
  console.log(data1.capital, data2.capital, data3.capital);
  const data = await Promise.all([
    getJSON(`https://restcountries.com/v3.1/name/${c1}`, 'Country not found'),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`, 'Country not found'),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`, 'Country not found'),
    ]);
    
    data.map(dt => {
      console.log(dt[0].capital[0]);
    });
  } catch (err) {
    console.log(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania');


const timeout = function (second) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject('Operation took too long');
    }, second * 100);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(5),
])
.then(([data]) => console.log(data.capital[0]))
.catch(err => console.error(err));

//Promise.allSettled()

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Again Success'),
])
.then(res => console.log(res))
  .catch(err => console.error(err));
  
  
  // Promise.any()
  Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Again Success'),
  ])
  .then(res => console.log(res))
  .catch(err => console.error(err));
  
  // Promise.any() returns a promise that is fulfilled with the value of the first fulfilled input promise
  
  */

// Coding Challenge #3

/*
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};
/*
const loadNPause = async function () {
  try {
    let currentImage = await createImage('img/img-1.jpg');
    console.log('First image loaded');
    await wait(2);
    currentImage.style.display = 'none';
    currentImage = await createImage('img/img-2.jpg');
    console.log('Second image loaded');
    await wait(2);
    currentImage.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
loadNPause();
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(imgPath => createImage(imgPath));
    console.log(imgs);
    const images = await Promise.all(imgs);
    console.log(images);
    images.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/
