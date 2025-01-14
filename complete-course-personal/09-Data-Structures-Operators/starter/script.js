'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function({starterIndex = 1, mainIndex, time, address}){
    console.log(starterIndex, time, address);
  },

  orderPasta : function(ing1, ing2, ing3){
    console.log(`Here is your delicious pasta ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function(mainIngredient, ...otherIngredient){
    console.log(mainIngredient, otherIngredient);
  }
};



const ordersSet = new Set(['pasta','pizza','risotto','pasta']);
console.log(ordersSet)


/*
if(restaurant.openingHours.mon.open){
  console.log(restaurant.openingHours.mon.open);
}

console.log(restaurant.openingHours.mon?.open);



const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for(const item of menu){
  console.log(item);
}

for(const [i, element] of menu.entries()){
  console.log(`${i + 1}: ${element}`);
}


const properties = Object.keys(restaurant);
console.log(properties);



const rest1 = {
  name : "Capri",
  numGuests : 20,
};

const rest2 = {
  name : "La piazza",
  owner : 'Giorgio Armani',
};

rest2.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

let a = 1 ;

a &&= 5;
//console.log(a);

//console.log(rest2.numGuests)

//restaurant.orderPizza('mushrooms', 'tomato', 'mozzarela')

console.log( 3 || 'Jonas');
console.log("", 'Jonas'); //Jonas
console.log(true || 0); //true
console.log(undefined || null); //null

restaurant.numGuests = 23;

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;

const guests2 = restaurant.numGuests || 10
console.log(guests1, guests2);

console.log( 23 && 'Jonas' && '' && 'Hello' && null) //return undefined

const ingre = ["test","test2","test3"];
restaurant.orderPasta(...ingre)

const newRestaurant = {...restaurant, founder : 'Giuseppe'}
const newnewrestaurant = newRestaurant
newRestaurant.name = "test";

console.log(newRestaurant)
console.log(newnewrestaurant)



restaurant.orderDelivery({time : '22:30', address : "test", mainIndex: 2, strarterIndex :2});


const arr = [2,3,4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x,y,z] = arr;
let [first, ,second] = restaurant.categories;
console.log(first, second);
[second, first] = [first, second];
console.log(first, second)
const [starter, main] = restaurant.order(2,0)
console.log(restaurant.order(2,0))

const nested = [2,4,[2,4]];
const [f, d, [g,k]] = nested;
console.log(f,d,g,k);

const [p,q,r = 1] = [8,9];
console.log(p,q,r);


const {name, openingHours,categories} = restaurant;
console.log(openingHours);
const {name: restaurantName, openingHours : hours, categories : tags = [], menu = []} = restaurant;
console.log(menu);

let a = 111;
let b = 999;
const obj = {
  a : 23,
  b: 7,
  c: 14
};

({a,b} = obj);
console.log(a,b);



const {openingHours : hours2} = restaurant

console.log(fri)


const arr = [7,8,9];
const newArray = [1,2, ...arr];
console.log(newArray);
console.log(...newArray);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

const mainMenuCopy = [...restaurant.mainMenu];

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
const str = "Henri";
const letters = [...str, ' ', 's'];
console.log(letters)


const [a, b, ...others] = [1,2,3,4,5];
console.log(others);

const [pizza, ,risotto, ...otherFood] = [
  ...restaurant.mainMenu, ...restaurant.starterMenu];
  console.log(pizza, risotto, otherFood);

  const { sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays);

const add = function(...numbers){
  let sum = 0;
  for(let i = 0; i< numbers.length; i++){
    sum += numbers[i];
  }
  return sum;
}

console.log(add(5,3,7,2));
*/