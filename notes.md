# Javascript

## Language features
- Vanilla JS is **not** statically typed, where TypeScript **is** statically typed.
- ES6 is not fully supported by all browsers yet, so we use things like *babel* to convert ES6 syntax to ES5 so we can write code with nice ES6 things and browsers can still run the converted code.


## Browser console
- When embedding JS, place *script* tag at end of body, so HTML loads first.
- We can run JS in the browser console.
- Write to console from script: 
```Javascript
console.log('Hello World!')
console.error()
console.warn()
```


## Syntax

### General
- Semicolons optional, but considered good practice.
- Comments:
`// This is a comment`
- Multiline comments:
`/* This is a multiline comment*/`

### Loops
```Javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
}

let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}

const fruits = ['apple', 'banana', 'cranberry']
for (let fruit of fruits) {
    console.log(fruit);
}
```

### Conditionals
```Javascript
const x = 10;

if (x == 10) {
    console.log(x);
}

if (x == '10') {
    console.log(x); // == doesn't match data types, so x == '10' is true.
} 

if (x === 10) {
    console.log(x);
}

if (x === '10') {
    console.log(x); // === matches data types, so x === '10' is false.
} 

// else ifs
if (x < 10) {
    console.log('Less');
} else if (x > 10) {
    console.log('More');
} else {
    console.log('Equal);
}
```

Boolean operators:
| Operation | Operator |
|:---------:|:--------:|
| AND       | `&&`     |
| OR        | `||`     |

Ternary operator:
```Javascript
let result = r === 255 ? 'red' : 'not red'
```

Switch statements:
```Javascript
const color = 'red';
switch (color) {
    case 'red':
        console.log('STOP');
        break;
    case 'amber':
        console.log('SLOW');
        break;
    case 'green':
        console.log('GO');
        break;
    default:
        console.log('CAUTION')
        break;
}
```

### Functions
```Javascript
// 'Regular' functions
function addRegular(num1=0, num2=0) {
    return num1 + num2;
}

// Arrow functions
const addArrow = (num1=0, num2=0) => {
    return num1 + num2;
}

const addArrowShort = (num1=0, num2=0) => num1 + num2;

const arrowSingleParam = num1 => num1*2;
```


### Constructor Functions and Classes
**ES5**
```Javascript
// Constructor function
function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob);
    this.getFullName = () => `${this.firstName} ${this.lastName}`; // This function is PER INSTANCE
}

Person.prototype.getBirthYear = () => this.dob.getBirthYear(); // This function is stored in the prototype, and is the same for all instances.

// Instantiation
const person = new Person('John', 'Smith', 1-1-1970);
console.log(person.getFullName())
```
**ES6**
Does the same thing under the hood, but is nicer to write and maintain. 
```Javascript
// This is the same as above, but in a class.
// Constructor function
class Person {
    constructor(firstName, lastName, dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = new Date(dob);
        this.getFullName = () => `${this.firstName} ${this.lastName}`; // This function is PER INSTANCE
    }

    getBirthYear() {
        this.dob.getBirthYear(); // This function is stored in the prototype, and is the same for all instances.
    }
}

Person.prototype.getBirthYear = () => this.dob.getBirthYear(); // This function is stored in the prototype, and is the same for all instances.

// Instantiation
const person = new Person('John', 'Smith', 1-1-1970);
console.log(person.getFullName())
```

Additional notes:
`this` keyword in arrow functions has a different scope.


### Interfaces
TODO


## Data types

### Overview
Use `typeof myVar` to get the type of an object.

**Primitive**
`string`: Can be initialised with double or single quotes.
`number`: No float or int, just `number`.
`boolean`: `true` or `false`
`symbol`: (ES6)
`null`
`undefined` 

**Objects**
`object`: e.g. arrays, anonymous objects etc.

Note: `typeof null` returns `object`. Don't rely on this behaviour. 


### var, let and const
- `var` is *globally scoped*, and thus should be replaced with `let` or `const` to avoid problems.
- `let` and `const` were introduced in ES6 (2015).
- `let` allows reassignment, `const` does not (naturally).
- `const` must be initialised at declaration point. `let` can be initialised later, and will have value `undefined`.


### String operations
```Javascript
const s = 'This is a sentence';
console.log(s.split());
```

Concatenation: `'Hello, ' + 'World!'`
Template strings:
```Javascript
name = 'Alex';
age = 20;
console.log(`${name} is ${age} years old.`);
```

### Arrays
Similar to a Python list, in that it supports multiple data types.

```Javascript
const numbers = new Array(1, 2, 3, 4, 5);
const numbersTwo = [1, 2, 3, 4, 5];
```

Array manipulation operations:
```Javascript
arr = ['banana'];
console.log(Array.isArray(arr));
console.log(arr[0]); // Element access
console.log(arr.length); // Get length
arr.push('cranberry'); // Append item to end of array
arr.unshift('apple'); // Insert item at beginning of array
arr.pop() // Pop item from end of array.
console.log(arr.indexOf('banana')); // Lookup
```

Passing functions to manipulate arrays:
```Javascript
arr.forEach(function (item) {
    console.log(item);
})

const firstLetters = arr.map((item) => {
    return item[0];
})

const startsWithA = arr.filter((item) => {
    return item[0] === 'a';
})
```

Additional notes:
- `const` just ensures memory address doesn't change, however the contents of the array can.


### Object literals / anonymous objects
```Javascript
const person = {
    firstName: 'Alex',
    lastName: 'Mirrington',
    hobbies: ['programming', 'music'],
    address: {
        street: '123 Example Street',
        city: 'Sydney',
        state: 'NSW'
    }
};

// To add a new key:
person.age = 20

```

Object destructuring (ES6):
```Javascript
const { firstName, lastName } = person;
console.log(firstName);
console.log(lastName);

//Note that it only searches one level deep e.g.
const { street } = person;
console.log(street); // street is undefined, since there was no key 'street' at the top level of the object.

// To do something like above, we do:
const { address: { street }} = person;
console.log(street); // street is undefined, since there was no key 'street' at the top level of the object.
```

Converting to JSON:
```Javascript
const personJSON = JSON.stringify(person);
```

Additional notes:
- `const` just ensures memory address doesn't change, however the contents of the object can.


## Document Object Model (DOM)
The Window object is the top level object in the browser. It contains the `alert` function, and `localStorage` function, for example. It also contains the `document` object and the `fetch` function.

Note that we don't need to do `window.alert()`, we can just do `alert()`, but it's good to knnow what's happening behind the scenes.


### Selection

```HTML
<html>
  <body>
    <form id="login-form">
      <div class="field">
        <label for="name">Name:</label>
        <input type="text" id="name">
      </div>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" id="email">
      </div>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
```

#### Single element selectors
```Javascript
const loginForm = document.getElementByID('login-form') // Returns the HTML element with the specified ID

// JQuery can be used to select things by attributes other than ID, e.g. class, tags etc. Now we can just use querySelector.
const login = document.querySelector('#login-form') // Returns the first HTML element with a certain id.
const div = document.querySelector('.field') // Returns the first HTML element with a certain class.
const inputs = document.querySelector('input') // Returns the first HTML element with a certain tag.
```

#### Multiple element selectors
```Javascript
const divs = document.querySelectorAll('.field') // Returns all HTML elements with a certain class, in a NodeList structure, which supports forEach, map etc.
divs.forEach((div) => console.log(div));

// There are older ones e.g. document.getElementByClassName and document.getElementByTagName (returns an HTMLCollection, which needs to be manually converted to an array)
```

### Operations on DOM elements
Removing DOM elements:
```Javascript
const div = document.querySelector('.field');
div.remove(); // Removes element from DOM
```

Adding DOM elements:
```Javascript
const main = document.querySelector('#main');

const ul = document.createElement('ul');
ul.appendChild(document.createTextNode('Content'));

main.appendChild(ul);
```

Setting text and inner HTML content:
```Javascript
const ul = document.querySelector('.items');

ul.firstElementChild.textContent = 'This is the first item';
console.log(ul.firstElementChild.value);
ul.children[1].innerText = 'This is the second item';
ul.lastElementChild.innerHTML = '<h1>Inserted HTML!</h1>'
```

Setting styles:
```Javascript
const btn = document.querySelector('.btn');
btn.style.background = 'red';
```

Adding event listeners:
```Javascript
const btn = document.querySelector('.btn');
btn.addEventListener('click', e => {
    e.preventDefault(); // Can be used to prevent default event behaviour
    console.log('Clicked button');
    console.log(e.target);
})

// Other event listeners include 'mouseover' and 'mouseout' 
```

Setting timeouts:
```Javascript
setTimeout(() => console.log('Triggered'), 3000); // Returns a timeout object and triggers the callback after the set amount of milliseconds.
```