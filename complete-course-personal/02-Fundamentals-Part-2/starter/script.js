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