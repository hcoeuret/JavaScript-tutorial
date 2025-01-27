'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Marta Gouveia',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300,1900],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2025-01-24T12:01:20.894Z',
    '2025-01-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Henri Coeuret',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 1800],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2025-01-24T12:01:20.894Z',
    '2025-01-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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
let timer;

//code
const displayMovements = function(account, sort = false){
  containerMovements.innerHTML = '';

  const combinedMovsDates = account.movements.map((mov, i)=> {
    return {
      movement : mov,
      movementDate : account.movementsDates.at(i)
    }
  })

  if(sort) combinedMovsDates.sort((a,b) => a.movement - b.movement);

  combinedMovsDates.forEach(function(obj, i){

    const {movement, movementDate} = obj;

    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const displayDate = formatMovementDate(movementDate, curAcc.locale);

    const formattedMov = new Intl.NumberFormat(account.locale, {
      style: 'currency',
      currency: 'EUR'
    }).format(movement);
    

    const html = 
    `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  })
  
}

const calcDisplayBalance = function(account){
  account.balance = account.movements.reduce((acc, cur) => acc + cur)
  const balance = account.movements.reduce((acc, cur) => acc + cur);
  const formattedMov = new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(balance); 
  labelBalance.textContent = formattedMov;
}

const calcDisplaySummary = function(account){
  const SumIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  const SumOut = Math.abs(account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov));
  const SumInterest = account.movements
    .filter(mov => mov > 0)
    .map(cur => cur * account.interestRate/100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);
  
  labelSumIn.textContent = new Intl.NumberFormat(account.locale, {style: 'currency',currency: 'EUR'}).format(SumIn); 
  labelSumOut.textContent = new Intl.NumberFormat(account.locale, {style: 'currency',currency: 'EUR'}).format(SumOut);
  labelSumInterest.textContent = new Intl.NumberFormat(account.locale, {style: 'currency',currency: 'EUR'}).format(SumInterest);
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
  displayMovements(curAcc, sorted);
  calcDisplayBalance(curAcc);
  calcDisplaySummary(curAcc);
  updateTime(curAcc);
}

const updateTime = function(curAcc){
  const now = new Date();
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: 'long'
  }
 
  labelDate.textContent = new Intl.DateTimeFormat(curAcc.locale, options).format(now);
}

const formatMovementDate = function(date, locale){
  
  date = new Date(date);
  
  const calcDayPassed = (firstDate, secondDate)=> Math.round(Math.abs(secondDate - firstDate)/(1000 * 60 * 60 *24));

  let daysPass = calcDayPassed(new Date(), date);

  if(daysPass === 0) return 'Today';
  if(daysPass === 1)  return 'Yesterday';
  if(daysPass <= 7) return `${daysPass} days ago`;

  const options = {
    day : 'numeric',
    month : 'numeric',
    year : 'numeric',
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}

const performTransfer = function(e){
  e.preventDefault();
  const destAcc = accounts.find(acc => acc.username === inputTransferTo.value) ;
  const amount = Number(inputTransferAmount.value);
  
  if(amount > 0 && curAcc.balance > amount && destAcc?.username !== curAcc?.username){
    // Add negative movement to origin
    curAcc.movements.push(-amount);
    curAcc.movementsDates.push(new Date().toISOString());
    // Add positive movement to dest
    destAcc.movements.push(amount);
    destAcc.movementsDates.push(new Date().toISOString());

    resetTimer(timer);
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
  const loan = Math.floor(inputLoanAmount.value);
  if(loan > 0 && curAcc?.movements.some(mov => mov >= 0.1 * loan)){
    const timer = setTimeout(function(){
      curAcc.movements.push(loan);
      curAcc.movementsDates.push(new Date().toISOString());
      updateUI(curAcc);
    }, 3000);
  }
  
  resetTimer(timer);
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
  
}

const resetTimer = function(timer){
  if(timer) clearInterval(timer);
  timer = startLogOutTimer();
}

function startLogOutTimer(){
  //set time to 5 minutes
  let timeOut = 5 * 60;

  const tick = function(){
    const min = String(Math.trunc((timeOut / 60))).padStart(2,0);
    const seconds = String(timeOut%60).padStart(2,0);
    labelTimer.textContent =` ${min}:${seconds}`;
    if(timeOut === 0){
      clearInterval(timer);
      containerApp.style.opacity = "0";
      labelWelcome.textContent = "Log in to get started"
    } 
    timeOut--;
  }
  //call the timer every second
  tick();
  timer = setInterval(tick,1000);

  return timer;
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

      resetTimer(timer);
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES