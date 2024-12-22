//automatic conversion
const jonas = "I'm " + firstName + ", a " + 2024 //auto convert to string the 2024 

//template litterals ES6
assemble multiple pieces in one final String
To not forget the back tick instead of normal ticks
const jonasNew = `I'm ${firstName}, a ${2024 - birthYear} years old ${job}`
you can write any expressions inside the curly BroadcastChannel.

//multiline string with template literals (just insert return)
console.log(`String 
with
multiple
line`)
console.log("String /n/ multiple /n/ line") //old way of doing it 

//windows + . = open emoji tab on windows

//if-else statement
if(condition){
    //do something
}
else if{
    //do something
}
else{
    //do something
}

//if with on line
if(condition) console.log("test");

//manual type conversion, the input value is not changed, only the output is converted. only three primitive type support conversion, which are : 
Number(inputValue); 
String(inputValue);
Boolean(inputValue);

//invalid number
Number("Jonas") //return NaN (not a number)

//type coersion that javascript does on its own 
console.log("I am " + 23 + " years old") //23 is converted to string
console.log("23"-"10"-3); //return 10 (- works on Numbers)
console.log('23' + '10' + 3); //returns 23103 (+ works on strings)
console.log("23" / "10"); //return 2.3 (/ works on numbers)
console.log("23" * "2"); //return 46 (* works on numbers)
console.log(2+3+4+5+'9'); //return 149 (first normal addition than coersion to string )

//truthly and falsy values = values that will respectively give true or false when converted or coerced to boolean
falsy : 0, "", undefined, NaN, null
truthy : everything else
console.log(Boolean("")); //return false
console.log(Boolean("Jonas")); //return true
if(0){}; // 0 will be converted to false
let height; //if(height) will lead to false path because height is undefined

// === vs ==
=== is strict equal (does not do type conversion) better to use
!== is strict unequal (does not do type conversion, better to use)
== is loose equal (does type conversion) prone to bug (do not use)
!= is loose unequal (same thing, do not use)
(18 === '18') //is false
(18 == '18') //is true

//input in web page
const value = prompt("text_to_prompt"); //return a string

//logic operators
&& //AND
|| //OR
! //NOT

//switch statement 
//comparison between variable and case are strict equality (variable === firstcase)
switch(variable){
    case 'firstcase':
    //do stuff
    break;
    case 'secondcase':
    case 'thirdcase':
    //do more stuff
    break;
    default:
    //do stuff
};

//statement vs expressions
expressions -> produce a value
3+4 is a expressions
statement -> perform an action
if/else is a statements
const = 3 + 4 is a statements

//for example in template litteral we can only put expressions not statement
`I'm ${89-23} years old` //is ok
`I'm ${if(89-23)}` //not ok

//ternary operator (conditional operator) can be used in template literal ! (because it is an operator so it is an expression)
const personType = age > 18 ? "adult" : "kiddo"; //return adult or kiddo according to condition

//javascript history
was invented by Netscape and standardized by ECMA in 1997
ECMAScript is the standard, javascript the language in practice
ES6 released in 2015

//javascript backward compatibility
Javascript code of ES1 still works with ES6 web browser 
core principle = don't break the web !
old feature are never removed to make all website works

//javascript forward compatibility
old browser will not work with new website

//how to code a javascript web app
During dev use the latest google chrome
During production you can use Babel to transpile and polyfill code to ensure compatibility with old browser and ES5
ES5 is safe for all browsers
ES6+ (ES2015 to ES2020) only supported by modern browser
ESNext(ES2021 - now) implemented in some modern browser but not safe to use

//strict mode (more safe code) has to be the very first line of code beside comment
'use strict';
- error when assining a undeclared variable;
- error when using a word that is a language keyword
- etc 

//FUNCTIONS
//there are three type of syntax, declaration or expression. You can use one or the other depending on what you prefer

/*function declaration
parameter is the placeholder, argument is the actual value (here 15 is argument)
Can be called before being declared
*/
function logger(parameter1,parameter2){
    //code
    return 10;
};
logger(15, 20);

/*function expression
cannot be used before being declared
*/
const logger2 = function (parameter1, parameter2){
    //code
    return 20;
};
logger2(15, 20);

/*Arrow function
works the same as expression function, but with syntax perfect for simple one line function. 
arrow function does not get a this keyword unlike the other functions
*/
//one line arrow function
const logger3 = parameter1 => 2037 - parameter1;
logger3(argument1);
//more complex arrow function
const logger4 = (parameter1, parameter2) => {
    const var1 = parameter1 - parameter2;
    return var1;
}