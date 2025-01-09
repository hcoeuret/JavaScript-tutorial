'use strict';

var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function() {
    console.log(this);
    console.log(2037- this.year);

    isMillenial: () => console.log(this.year >=1991 && this.year <= 1996);

  },
  greet: () => console.log(`Hey ${this.firstName}`)
}



jonas.calcAge();
jonas.greet()

const addExpr = function(a,b){
  console.log(arguments);
  return a+ b;
}

var addArrow = (a,b) => a+b;

addExpr(5,6)

const jessica1 = {
  firstName : 'Jessica',
  lastName : 'Williams',
  age: 27
};

function marryPerson(person, newLastName){
  person.lastName = newLastName;
  return person;
}

const jessica2 = {
  firstName : 'Jessica',
  lastName : 'Williams',
  age: 27,
  family : ['Alice', 'Bob'],
};

//shallow copy
const jessicaCopy = {...jessica2};
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

//deep copy
const deepJessicaCopy = structuredClone(jessica2)
deepJessicaCopy.family.push('Henri');
deepJessicaCopy.family.push('Pierre');


console.log(jessica2);
console.log(jessicaCopy);
console.log(deepJessicaCopy);