'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//variable 
let curAcc;
let sorted = false;

//code
const displayMovements = function(movements, sort = false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov, i){

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = 
    `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  })
  
}

const calcDisplayBalance = function(account){
  account.balance = account.movements.reduce((acc, cur) => acc + cur)
  labelBalance.textContent = `${account.movements.reduce((acc, cur) => acc + cur)}€`;
}

const calcDisplaySummary = function(account){
  labelSumIn.textContent = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov) + "€";
  labelSumOut.textContent = Math.abs(account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov)) + "€";
  
  labelSumInterest.textContent = account.movements
    .filter(mov => mov > 0)
    .map(cur => cur * account.interestRate/100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);
}

const initialName = accounts.forEach(function(account){
  account.username = 
  account.owner
  .toLowerCase()
  .split(" ")
  .map((word) => word[0])
  .join("");
})

const updateUI = function(curAcc){
  displayMovements(curAcc.movements, sorted);
  calcDisplayBalance(curAcc);
  calcDisplaySummary(curAcc)
}

const performTransfer = function(e){
  e.preventDefault();
  const destAcc = accounts.find(acc => acc.username === inputTransferTo.value) ;
  const amount = Number(inputTransferAmount.value);
  
  if(amount > 0 && curAcc.balance > amount && destAcc?.username !== curAcc?.username){
    // Add negative movement to origin
    curAcc.movements.push(-amount);
    // Add positive movement to dest
    destAcc.movements.push(amount);
    // Update the 
    updateUI(curAcc);

    //Reset interface
    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferTo.blur();
    inputTransferAmount.blur();
  };
};

const closeAccount = function(e){
  e.preventDefault();

  if(inputCloseUsername.value === curAcc.username && Number(inputClosePin.value) === curAcc.pin){
    //Find and remove account to delete
    const iToDel = accounts.findIndex(cur => cur.username === inputCloseUsername.value);
    accounts.splice(iToDel, 1);

    //Display UI message
    labelWelcome.textContent = `Log in to get started`
      
    //Display movements
    containerApp.style.opacity = "0";
  };
  
}

const requestLoan = function(e){
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if(loan > 0 && curAcc?.movements.some(mov => mov >= 0.1 * loan)){
    curAcc.movements.push(loan);
  }
  updateUI(curAcc);
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  
}

//Event handlers
btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  curAcc = accounts.find((cur) => cur.username === username);
  if(curAcc?.pin === pin){
      //display UI message
      labelWelcome.textContent = `Welcome ${curAcc.owner.split(" ")[0]} !`
      
      //Display movements
      containerApp.style.opacity = "100";

      //Clear input fields
      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();
      inputLoginUsername.blur();

      updateUI(curAcc);
  }
});
btnTransfer.addEventListener('click', performTransfer);
btnClose.addEventListener('click', closeAccount);
btnLoan.addEventListener('click', requestLoan);
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  sorted = !sorted;
  updateUI(curAcc);
});

///////////////////////////////////////
// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).

dogs.forEach(el => el.recommendedFood = el.weight ** 0.75 * 28);
console.log(dogs);

//2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const sarahDogs = dogs.find(cur => cur.owners.find(cur2=> cur2 ==='Sarah'))
console.log(`Sarah dogs is eating too much ? ${sarahDogs.curFood > sarahDogs.recommendedFood}`);

//3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs.filter(cur => cur.curFood > cur.recommendedFood).flatMap(dog => dog.owners);;
const ownersTooLittle = dogs.filter(cur => cur.curFood < cur.recommendedFood).flatMap(dog => dog.owners);;
console.log(ownersTooMuch);
console.log(ownersTooLittle);

//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
ownersTooMuch.forEach((el) => {
  console.log(`${el.owners.join(' and ')}'s dogs eat too much`);
})
ownersTooLittle.forEach((el) => {
  console.log(`${el.owners.join(' and ')}'s dogs eat too little`);
})

//5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.map(el => el.curFood - el.recommendedFood).includes('0'));

//6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
console.log(dogs.every(el => el.curFood > (el.recommendedFood * 0.90) && el.curFood < (el.recommendedFood * 1.10)));

//7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
console.log(dogs.filter(el => el.curFood > (el.recommendedFood * 0.90) && el.curFood < (el.recommendedFood * 1.10)));

//8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
const groupByQuantity = Object.groupBy(dogs, dog => {
  if(dog.curFood > dog.recommendedFood) return 'too-much';
  if(dog.curFood < dog.recommendedFood) return 'too-little';
  if(dog.curFood === dog.recommendedFood) return 'exact';
  return 'defualt'
});

console.log(groupByQuantity);

//9. Group the dogs by the number of owners they have
const groupbyOwner = Object.groupBy(dogs, dog => {
  return dog.owners.length;
});

console.log(groupbyOwner)

//10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const sortedDogs = dogs.toSorted((a,b) => {
  if(a.recommendedFood > b.recommendedFood) return 1;
  if(a.recommendedFood < b.recommendedFood) return -1;
});

console.log(sortedDogs);

/*
const groupedMovements = Object.groupBy(movements, movement => movement > 0 ? 'deposits' : 'withdrawal');
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if(movementCount >= 8) return 'very active';
  if(movementCount >= 4) return 'active';
  if(movementCount >= 1) return 'moderate';
  return 'inactive';
})

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

movements.sort((a,b) => {
  if(a > b){
    return 1;
  }
  if(b > a){
    return -1;
  }
});

console.log(movements);

const arr = [[1,2,3], [4,5,6], 7, 8];
console.log(arr.flat());
const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.find(mov => mov > 0));

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const deposit = account1.movements.filter(function(mov){
  return mov > 0;
});

console.log(deposit);

const withdrawals = account1.movements.filter(function(mov){
  return mov < 0;
});

console.log(withdrawals);

const balance = movements.reduce(function(acc, cur, i, arr){
  return acc + cur;
}, 100);

const balance2 = movements.reduce((acc, cur) => acc > cur ? acc : cur);

console.log(balance);
console.log(balance2);


//pipeline
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  //.map(mov => mov * eurToUsd)
  .map((mov, i, arr) =>{
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, cur) => acc + cur);
console.log(totalDepositsUSD);
*/

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:



const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

//1 store the average weight of a "Husky" in a variable "huskyweight"
const huskyweight = breeds.find(cur => cur.breed === 'Husky').averageWeight;
console.log(huskyweight);

//2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
const breedName = breeds.find(cur => cur.activities.includes('fetch') && cur.activities.includes('running') ).breed;
console.log(breedName);


//3. Create an array "allActivities" of all the activities of all the dog breeds //4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
const allActivities = [...new Set(breeds.flatMap(cur => cur.activities))];
console.log(allActivities);


//5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
const arrayAdjacent = [...new Set(breeds
  .filter(cur => cur.activities.includes('swimming'))
  .flatMap(cur=> cur.activities))];
arrayAdjacent.splice(arrayAdjacent.indexOf('swimming'),1);
console.log(arrayAdjacent);

// 6.
console.log(breeds.every(breed => breed.averageWeight > 10));

//7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
console.log(breeds.some(cur => cur.activities.length >= 3))



//BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
const fetchBreeds = breeds.filter(cur => cur.activities.includes('fetch')).map(cur => cur.averageWeight);
console.log(fetchBreeds);
const heaviestFetchBreed = Math.max(...fetchBreeds);
console.log(heaviestFetchBreed);
*/








