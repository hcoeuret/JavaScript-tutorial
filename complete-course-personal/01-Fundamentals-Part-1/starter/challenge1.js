/* Write your code below. Good luck! 🙂 */
const massJohn = 78;
const heightJohn = 169;
const massMark = 92;
const heightMark = 188;

const BMIJohn = massJohn / (heightJohn*heightJohn);
const BMIMark = massMark / (heightMark*heightMark);

const markHigherBMI = BMIMark > BMIJohn;

console.log("BMI John: ", BMIJohn, "BMI Mark: ", BMIMark, "markHigherBMI: ", markHigherBMI);
