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



