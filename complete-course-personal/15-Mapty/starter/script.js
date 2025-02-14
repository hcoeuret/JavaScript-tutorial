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
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence){
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace = this.duration / this.distance;

  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elGain){
    super(coords, distance, duration);
    this.elGain = elGain;
    this.speed = this.distance / (this.duration/60);
  }
}

/////////////////////////////////////
// APPLICATION ARCHITECTURE
class App{

  #map;
  #mapEvent;
  #workouts = [];

  constructor(){
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
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

    this.#map = L.map('map').setView(coords, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
 + ''
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE){
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
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
    console.log(workout);

    // Render workout on map as marker
    this.renderWorkoutMarker(workout);

    // Render workout on list

    // Hide the form

    // Clear input fields
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
    
  }

  renderWorkoutMarker(workout){
    
    L.marker(workout.coords)
    .addTo(this.#map)
    .bindPopup(L.popup({
      maxWidth : 250,
      minWidth : 100,
      autoClose : false,
      closeOnClick : false,
      className : `${workout.type}-popup`,
    }))
    .setPopupContent('+workout.distance')
    .openPopup();
  }
}

const app = new App();


