//first exercices
const country = "France";
const continent = "Europe";
let population = 130000000;
const meanpop = 33000000;
const isIsland = false;
let language;
language = "French";

console.log(typeof isIsland, typeof population, typeof country,typeof language)

//basic operator
console.log("population : ", population/2);
console.log(population > 6000000);
console.log(population > 33000000);
const description = country + " is in " + continent + ", and its " + population + " people speak " + language;
console.log(description);

//strings and template litterals
console.log(`${country} is in ${continent}, and its ${population} people speak ${language}`)

//if else
if(population > meanpop){
    console.log(`${country}'s population is ${population - meanpop} above average`);
}
else{
    console.log(`${country}'s population is ${meanpop - population} below average`);
}

//type conversion and coercion
console.log('9' - '5'); //4
console.log('19' - '13' + '17'); // 617
console.log('19' - '13' + 17); // 23
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2); // 1143

//equality operator
//numNeighbours = Number(prompt('How many neighbour countries does your contry have?'));

if(numNeighbours === 1){
    console.log("Only one border !");
}
else if(numNeighbours > 1){
    console.log("More than one border");
}
else{
    console.log("0 borders");
}

//logical operators
