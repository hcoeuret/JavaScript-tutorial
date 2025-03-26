'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://countries-api-836d.onrender.com/countries/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
/*
const getCountryData = function(country){
  const request = new XMLHttpRequest();
  request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
  request.send();

  request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
  console.log(data);

  const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  });

};





const getCountryAndNeighbourData = function(country){
  // AJAX call 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
  request.send();

  
  request.addEventListener('load', function(){
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1 
    renderCountry(data)

    // Get neighbour country
    const neighbour = data.borders?.[0];
    console.log(neighbour);

    // AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function(){
      const data2 = JSON.parse(this.responseText);
      console.log(data2)
      // Render country 2 
      renderCountry(data2, 'neighbour')
    });

  });

};



getCountryAndNeighbourData('portugal')
getCountryAndNeighbourData('usa')








btn.addEventListener('click', function(){
  getCountryData('australia')
})


///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀



const whereAmI = function(lat, lon){
  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`)
  .then(response => {
    if(!response.ok) throw new Error("data not found, try reloading")
    return response.json()
  })
  .then(data => {
    console.log(`You are in ${data.city}, ${data.countryName}`)
    getCountryData(data.countryName)
  })
  .catch(err => console.log(err.message))
}

whereAmI(-33.933, 18.474);
whereAmI(-33.933, 18.474);


console.log('Test start');
setTimeout(() => console.log('0 sec timer'),0);
Promise.resolve('Resolved promise 1').then(res => console.log(res))
Promise.resolve('Resolved promise 2').then(res2 => {
  for(let i = 1; i < 1000000000; i++){}
  console.log(res2)
})
console.log('Test end')


const prom = new Promise(function(resolve, reject) {
  
  console.log('ITS HAPPENING');

  setTimeout(function(){
    if(Math.random() >= 0.5) {resolve('you Win')}
    else{
      reject(new Error('you Lose'));
    }
  }, 2000)
})
prom.then(res => console.log(res)).catch(err => console.log(err));

const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000)
  })
}

wait(2).then(() => {
  console.log('I waited for 2 seconds')
  return wait(1);
 });


 
 const whereAmI = function(){

  getPosition().then(pos => {
    console.log(pos)
    const {latitude : lat, longitude : lng} = pos.coords;
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
  })  
  .then(response => {
    if(!response.ok) throw new Error("data not found, try reloading")
    return response.json()
  })
  .then(data => {
    console.log(`You are in ${data.city}, ${data.countryName}`)
    getCountryData(data.countryName)
  })
  .catch(err => console.log(err.message))
}

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////
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


const imageContainer = document.querySelector('.images');
let currentImg;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};


const createImage = function(imgPath){
  return new Promise(function(resolve, reject){
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function() {
      imageContainer.append(img);
      resolve(img);
    })
    img.addEventListener('error', function(){
      reject('image failed to load')
    })
  })
}


createImage('img/img-1.jpg')
.then(function(img){
  console.log('success')
  currentImg = img;
  return wait(2)
})
.then(function(){
  currentImg.style.display = 'none'
  return createImage('img/img-2.jpg');
})
.then(function(img){
  currentImg = img;
  console.log('success')
  return wait(2)
})
.then(function(){
  currentImg.style.display = 'none'
})
.catch(err => console.log(err))


function renderError(msg){
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}

function renderCountry(data, className =''){
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

 const getCountryData = function(country){
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
  .then((response) => {
    if(!response.ok)
      throw new Error("country not found" +response.status);
    return response.json();
  })
  .then((data) => {
    renderCountry(data[0]);

    const neighbour = data[0]?.borders[0];

    if(!neighbour){
      throw new Error('No neighbour found');
    };
    return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`)
  })
  .then(response => response.json())
  .then(data => renderCountry(data, 'neighbour'))
  .catch(err => {
    console.log('Error')
    renderError(``);
  })
  
}

const getPosition = function(){
  return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve,reject);
  })
 }


const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.countryName}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    throw err;

  }
};


whereAmI();


const get3Countries = async function(c1,c2,c3){
  try{
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)
    ]);
    console.log(data.map(d => d[0].capital));

  }
  catch(err){
    console.error("err");
  }
}

( async function(){
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)
  ]);
}
)



get3Countries('portugal', 'france', 'italy');
*/
///////////////////////////////////////
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

const imageContainer = document.querySelector('.images');
let currentImg;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};


const createImage = function(imgPath){
  return new Promise(function(resolve, reject){
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function() {
      imageContainer.append(img);
      resolve(img);
    })
    img.addEventListener('error', function(){
      reject('image failed to load')
    })
  })
}



const loadNPause = async function(){
  try{
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none'
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none'
  }
  catch(err){
    console.log(err.message)
  }
  
}

const loadAll = async function(imgArr){
  const imgs = imgArr.map(path => createImage(path));
  const data = await Promise.all(imgs);
  data.forEach(img => img.classList.add('parallel'))
  console.log(data);
}

const imgArr1 = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']

loadAll(imgArr1);