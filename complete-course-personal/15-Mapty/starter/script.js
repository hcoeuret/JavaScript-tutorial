'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/////////////////////////////////////
// CLASSE DEFINITIONS

class Workout {

  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration){
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription(){
  // prettier-ignore
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence){
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace = this.duration / this.distance;
    this._setDescription();
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elGain){
    super(coords, distance, duration);
    this.elGain = elGain;
    this.speed = this.distance / (this.duration/60);
    this._setDescription();
  }
}

/////////////////////////////////////
// APPLICATION ARCHITECTURE
class App{

  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];
  

  constructor(){
    this._getPosition();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this));

    // Get data from local storage
    this._getLocalStorage();
  }

  _getPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
          alert('could not get your position')
        })
    }
  }

  _loadMap(position){
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
 + ''
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    })
  }

  _showForm(mapE){
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm(){
    // Clear input fields
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
    
  }

  _toggleElevationField(e){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e){

    const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const {lat, lng} = this.#mapEvent.latlng;
    let workout;

    // If running, create running object
    if(type === 'running'){
      const cadence = Number(inputCadence.value);
      if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration,cadence)) return alert('inputs have to be positive number !'); 
      workout = new Running([lat, lng], distance, duration, cadence);
    };

    // If cycling, create cycling object
    if(type === 'cycling'){
      const elevation = Number(inputElevation.value);
      if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) return alert('inputs have to be positive number !');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to Workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout)

    // Hide the form
    this._hideForm();

    // Set local storage to all workout
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout){
    
    L.marker(workout.coords)
    .addTo(this.#map)
    .bindPopup(L.popup({
      maxWidth : 250,
      minWidth : 100,
      autoClose : false,
      closeOnClick : false,
      className : `${workout.type}-popup`,
    }))
    .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}  ${workout.description}`)
    .openPopup();
  }

  _renderWorkout(workout){
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if(workout.type === 'running'){
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
      `
    }
    if(workout.type === 'cycling'){
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li> 
      `;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  _moveToPopUp(e){

    const workoutEl = e.target.closest('.workout');
    if(!workoutEl) return;

    const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

    this.#map.setView(workout.coords,this.#mapZoomLevel, {
      animate : true,
      pan: {
        duration : 1,
      }
    });

  }

  _setLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workouts))
  }

  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'));

    if(!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    })
  }

  reset(){
    localStorage.removeItem("workouts");
    location.reload();
  }

}

const app = new App();


