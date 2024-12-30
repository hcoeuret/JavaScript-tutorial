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

/*Arrays 
2 ways of initializing. Note : you can declare array with const and change particular values but you cannot change the whole array at the same type
You can also create an array containing multiple differrent types
array are built in objects
*/
const friends = [1920 -500, function1(variable1), "Michal"]; //this one is more usual
const year = new Array(1991, 1984, 2008, 2020); //this one works but less used
const friends = [] //empty array 
friends[0]; //access array element 0
friends.length; //return size of array (property of array)
friends[0] = 'Jay'; //write value
friends.push('Bob'); //push value at the end of the array and return length of new array
friends.unshift('john') //push value at the beginning and return length of array
const popped = friends.pop();//remove last element of array and returns it
const popped = friends.shift(); //remove first element
friends.indexOf('Bob'); //return index of element if exist, -1 if not found
friends.includes('bob'); //return true if found, false if not (strict equality)

/*Objects
function are a list of key - value pair
size, name and id are called properties
they are multiple ways of creating objects
to write a function in an object you need to use an expression not declaration, because object works with expressions
this return the called object 
*/
//object litteral
const object1 = {
    size : 10,
    name : "foo",
    id : 101,
    isValid : true
    calcSize : function (){
        return 2023 - this.size;
    }
};
object1.id //get id from object1
object1['i' + 'd'] //get id from object1, can be any expression inside the brackets. return undefined if does not exist (falsy value)
const choice prompt("choose id or age");
object1[choice]; //to do dynamic choosing
object1.location = 'France'; //Add new property
object1['social'] = "twitter"; //Add new property
object1.calcSize() //call function

//for loop
for(let i = 1; let < 10; i++){
    //code
    continue; //skip to the next iteration
    break; //exit the loop
};

//while loop
let dice = Math.trunc(Math.random() * 6) + 1
while(dice !== 6){
    dice = Math.trunc(Math.random() * 6) + 1
    console.log(dice);
};


//random numbers
Math.random //return random number between 0 and 1

//interesting extension
prettier //for automatic formating (change options in vscode as well)
settings sync in VS code
TODO highlight //to highlight todo

//to have live changes
method 1 : live server extension
method 2 : install node.js and execute "npm install live-server -g" then "live-server"

//console.table(object)
return the object in the console in a table

//debugger
debugger; //open the debugger when the program arrives here in the code

//html font-size
to have consistent font size, you can define a font size in the html style like
font-size : 62.5%; //62.5% of default 16px = 10px
then in the other styles you put
font-size : 1rem //1times the font size of root element html
font-size : 0.8em //0.8 times the font size of the parent element

//html classes
div class="modal hidden"//the div has two classes, modal and hidden, and you can add style in .modal and in .hidden separately. The two classes are stored in a classList


//id vs class
id is unique compared to classs which are grouped element
used a lot with javascript to target a scpecific element
class="myClass"
.myClass //class in css and javascript
id="myId"
#myId //id in CSS and javascript

//DOM
Document object Model = structured representation of html document
connexion point between html and javascript
it is a tree structure generated from the html code
Every element of a tree is a node, and child and parents are built from the code hierarchie
Document is the first object and has html as child. It is the entry point of the DOM
siblings = two childs with the same parent
DOM is not part of javascript but part of Web API that we can use in javascript

//select html element 
const message = document.querySelector(".message"); //#message with id
document.querySelector(".message").textContent = 23 ;//change the text content of html element 

//event 
document.querySelector(".check").addEventListener("click", function()) //listen for click event of the check button and run the function in the 2nd argument

//change CSS style
document.querySelector("body").style.backgroundColor = "#60b347"; //background-color becomes backgroundColor. The changed value needs to be a string. 
//this does not change the CSS file but it is inline style

/*
queryselector selects single elements. If you target a class it will only select the first element of this class
instead use this function. the return is a node list
*/
const btnOpenModal = document.querySelectorAll('.show-modal');
for(let i = 0; i < btnOpenModal.length ; i++){
    console.log(btnOpenModal[i].textContent);
}

//remove or add classes of html element, used all the time to make things go away and appear in html
overlay.classList.remove('hidden'); //note it is 'hidden' not '.hidden'
modal.classList.add('hidden');
modal.classList.contains('hidden') //return true if contain is in the list of classes

//global events (like keyboards presses). You listen for those wherever they happen so they are not bound to one unique element
document.addEventListener('keydown', function);

//event object, pass an argument of any name, javascript will put the event object inside. You can then manipulate the object to detect key press for example
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideModal();
    }
  });

//three type of key press
'keydown' //when the key is pressed down
'keyup' //when the key is pressed up
'keypress' //fires continusly while key is pressed