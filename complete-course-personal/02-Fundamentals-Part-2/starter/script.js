'use strict';

let hasDriverLicense = false;
const passTest = true;

if(passTest){
    hasDriverLicense = true;
}
if(hasDriverLicense) console.log("driver license detected")

function logger(apples, oranges){
    const juice = `Juice with ${apples} apples`;
    return juice;
    
}

console.log(logger(15,20));

function calcAge1(birthYear){
    const currYear = 2024;
    return currYear - birthYear;
}

const age1 = calcAge1(1999);
console.log(age1);

const age2 = function (birthyear){
    return 2024 - birthyear
}

console.log(age2(1999));

const age3 = birthyear => 2024 - birthyear;

console.log(age3(1999));

const friends = ["Michael", "Steven", "Peter"]
console.log(friends);

const year = new Array(1991, 1984, 2008, 2020);
console.log(year);

console.log(year[0]);
console.log(year.length);
year[0] = 'Bob';
console.log(year[0]);
console.log(year)
console.log(year.push('bob'));
console.log(year.push('bob'));
console.log(year.includes('bob'));

const tip = 100;

const object1 = {
    size : 10,
    name : "foo",
    id : 101,
    array1 : ['Bob', 'John', 'Sam'],
    isValid : false,
    calcSize : function (){
        this.year = 2023 - this.size;
        return this.year;
    },
    getSummary : function(){
        console.log(`Object ${this.name} has id ${this.id} and size ${this.size} and ${this.isValid ? "is valid" : "is not valid"}`)
    }
};

console.log(object1.id);
console.log(object1['i' + 'd']);
object1.location = 'France';
console.log(object1);

console.log(`${object1.name} has size ${object1.size} and id ${object1.id} and the first member of its array is ${object1.array1[0]}`)
console.log(object1.calcSize(53));
object1.getSummary()

for(let i = 0; i <= object1.array1.length - 1; i++){
    console.log(object1.array1[i]);
}

const years = [1989, 1987 ,2014, 2015];
const ages = [];

for(let i = 0; i < years.length; i++){
    ages.push(2024 - years[i]);
}

console.log(ages);

let dice = Math.trunc(Math.random() * 6) + 1
while(dice !== 6){
    dice = Math.trunc(Math.random() * 6) + 1
    console.log(dice);
};