import './shoppingCart.js' 
import cloneDeep from 'lodash-es'
import 'core-js/stable'

if(module.hot){
  module.hot.accept();
}

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

class Person{
  #greeting = 'Hey';
  constructor(name){
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log(cart.find(el => el.quantity >= 2))