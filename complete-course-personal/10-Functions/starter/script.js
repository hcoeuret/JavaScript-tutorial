'use strict';


const secureBooking = function(){
  let passengerCount = 0;

  return function(){
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  }
}

const booker = secureBooking();
booker();
booker();
booker();

let f;
const g = function(){
  const a = 23;
  f = function(){
    console.log(a * 2);
  }
}
g();
f();

const h = function(){
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
}

const boardPassenger = function(n,wait){
  const perGroup = n/3;

  setTimeout(function() {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`)
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`)
}

boardPassenger(180,3);





/*
const bookingArr = [];

const createBooking = function(flightNum, numPassengers, price){

  numPassengers = numPassengers || 1;
  price = price || 1;

  const booking ={
    flightNum,
    numPassengers,
    price,
  };
  
  bookingArr.push(booking);
  console.log(booking);
}

createBooking('LH123');

const flight = "LH234";
const Henri = {
  name: "Henri Coeuret",
  passport : 2323232546
};
const checkIn = function(flightNum, passenger){
  flightNum = 'LH622';
  passenger.name = 'Mr. ' + passenger.name;

  if(passenger.passport === 1323232546){
    alert('Checked in');
  }
  else{
    alert('Wrong passport');
  }
}

checkIn(flight, Henri);
console.log(flight, Henri);


const oneWord = function(str){
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str){
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function(str, func){
  console.log("original string " + str);
  console.log("Transformed string " + func(str));
  console.log("Transformed by : " + func.name);
}
transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

const greet = function(greeting){
  return function(name){
    console.log(`${greeting} ${name}`);
  }
}
const greeterHey = greet('Hey');
greeterHey('Henri'); //print Hey Henri


const lufthansa = {
  airline: "lufthansa",
  code: "LH",
  bookings: [],
  book(flightNum, name){
    console.log(`${name} booked a seat on ${this.airline} flight ${this.code}${flightNum}`);
    this.bookings.push({flight : `${this.code}${flightNum}`, name})
  },
};

const eurowings = {
  airline: "Eurowings",
  code: "EW",
  bookings: [],
}

const book = lufthansa.book;

//book(23, 'Sarah Williams');

book.call(eurowings, 23, 'Sarah Willaims');
console.log(eurowings)

const bookEw = book.bind(eurowings);
bookEw(23, 'Steven Williams');

const bookEw23 = book.bind(eurowings,23);
bookEw23('Henri Coeuret');

lufthansa.planes = 300;
lufthansa.buyPlane = function(){
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

const addTax = (rate, value) => value + value * rate
console.log(addTax(0.1,200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

const addTaxRate = function(rate){
  return function(value){
    return value + value * rate;
  }
}

const addTaxVAT2 = addTaxRate(0.23);
console.log(addTaxVAT2(100));
*/