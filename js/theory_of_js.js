// JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.


// first-class functions.{
  // A programming language is said to have First-class functions when functions in that language are treated like any other variable. For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable.
// }


 // Q. -> why js is proto type language ;
    //prototype based class

    var car = {
      make: 'Toyota',
      model: 'Corolla',
      drive: function() {
        console.log('Driving...');
      },
      stop: function() {
        console.log('Stopped.');
      }
    };
    
    var myCar = Object.create(car);
    myCar.color = 'blue';
    myCar.year = 2024;
    console.log(myCar);
    console.log(myCar.drive());
    console.log(myCar.stop());
    
    // different 
    
    // traditional based class 
    class Car {
      constructor(make, model) {
        this.make = make;
        this.model = model;
      }
    
      drive() {
        console.log('Driving... real');
      }
    
      stop() {
        console.log('Stopped. real');
      }
    }
    
    const myCar1 = new Car('Toyota', 'Corolla');
    console.log(myCar1);
    console.log(myCar1.drive());
    console.log(myCar1.stop());

//Q. why js is lightweight?
// Ans.JavaScript is often considered lightweight due to several key characteristics:

// 1. **Interpreted and Just-In-Time (JIT) Compiled:** JavaScript is an interpreted language, meaning it's executed line-by-line by an interpreter in the browser or by a JavaScript engine like V8 in Node.js. JIT compilation techniques optimize performance by compiling parts of the code at runtime into native machine code, improving execution speed.

// 2. **Single-threaded Event Loop:** JavaScript utilizes a single-threaded event loop model, which means it processes tasks sequentially in a non-blocking manner. This design is efficient for handling asynchronous operations, such as I/O operations or network requests, without blocking the main execution thread.

// 3. **Dynamic Typing:** JavaScript is dynamically typed, meaning variables can hold values of any type without explicit type declarations. This flexibility simplifies development but can also lead to lighter code compared to statically typed languages.

// 4. **Prototypal Inheritance:** JavaScript employs a prototypal inheritance model, allowing objects to inherit properties and methods from other objects directly. This approach often results in simpler and more flexible object-oriented programming constructs compared to classical inheritance systems.

// 5. **Garbage Collection:** JavaScript engines automatically manage memory through garbage collection, freeing developers from manual memory management tasks. While garbage collection can introduce occasional performance overhead, it generally contributes to a smoother and more developer-friendly programming experience.

// 6. **Cross-platform Compatibility:** JavaScript runs on virtually every modern web browser and can also be executed on server-side environments (via Node.js) and embedded systems (e.g., IoT devices). Its ubiquity and versatility contribute to its lightweight nature by allowing developers to write code that can run across different platforms without significant modifications.

// Overall, these characteristics contribute to JavaScript's reputation as a lightweight and versatile language suitable for a wide range of applications, from simple web scripting to complex web applications and server-side development.





// A language that is multi-paradigm, single-threaded, dynamic, and supports object-oriented, imperative, and declarative styles is quite versatile, allowing developers to use various programming approaches depending on the problem at hand. Let's break down each aspect and provide an example in JavaScript, a language that fits this description.

// 1. **Multi-paradigm**: This means the language supports multiple programming paradigms, such as object-oriented, imperative, and declarative (functional programming). Developers can choose the paradigm that best fits the problem they are solving.

// 2. **Single-threaded**: Single-threaded refers to the language's execution model, where tasks are handled sequentially within a single thread of execution. This means that operations are performed one after another, rather than concurrently in multiple threads.

// 3. **Dynamic**: A dynamic language allows for flexible and runtime changes to variables, types, and functions. This can lead to more expressive and adaptable code.

// 4. **Object-oriented**: Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects," which can contain data in the form of fields (often known as attributes or properties) and code in the form of procedures (often known as methods). Objects are instances of classes, which define the structure and behavior of objects.

// 5. **Imperative**: Imperative programming focuses on describing how a program operates by providing a sequence of commands or statements that change the program's state. It emphasizes control flow and the modification of mutable state.

// 6. **Declarative (functional programming)**: Declarative programming expresses the logic of a computation without explicitly describing its control flow. Functional programming is a subset of declarative programming that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

// JavaScript is a language that fits these criteria well. Let's illustrate each aspect with an example:

// ```javascript
// // Object-oriented style
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const john = new Person('John', 30);
john.greet();

// Imperative style
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log('Sum:', sum);

// Declarative (functional programming) style
const numbers = [1, 2, 3, 4, 5];
const sumFunctional = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum (Functional):', sumFunctional);
// ```

// In this example:

// - We define a `Person` class using object-oriented style.
// - We calculate the sum of numbers using an imperative for loop.
// - We calculate the sum of numbers using a declarative approach with the `reduce` function, a typical functional programming construct.

// JavaScript's flexibility allows developers to mix and match these styles as needed, making it suitable for a wide range of programming tasks.


// different between imprative and declarative programming 

// The difference between imperative programming and declarative programming lies in how they approach describing the logic of a computation and handling state changes.

// 1. **Imperative Programming**:
//    - **Focus**: Imperative programming focuses on describing the step-by-step process of how a task should be accomplished. It emphasizes the control flow and the explicit manipulation of mutable state.
//    - **Procedure-Oriented**: Programs in imperative style are often structured around procedures or routines that perform specific tasks.
//    - **Mutability**: Mutable state is common in imperative programming. Variables can be reassigned, and data structures can be modified in place.
//    - **Example**: Traditional programming languages like C, Pascal, and early versions of BASIC typically follow an imperative style.

// 2. **Declarative Programming**:
//    - **Focus**: Declarative programming, on the other hand, focuses on expressing what the desired outcome is without specifying the step-by-step procedure to achieve it. It emphasizes the logic of the computation rather than the control flow.
//    - **Functional Approach**: Declarative programming often aligns with functional programming paradigms, where programs are written as a series of function evaluations.
//    - **Immutability**: Declarative programming tends to favor immutability, where data structures and variables are not changed once they are created. Instead, new values are created through transformations.
//    - **Example**: Languages like SQL for database queries, HTML/CSS for web development, and functional programming languages like Haskell and Clojure are often used in a declarative style.

// **Example Comparison**:

// Consider a simple task of summing up all numbers in an array:

// - **Imperative Approach**:
//   ```javascript
  let numbers1 = [1, 2, 3, 4, 5];
  let sum1 = 0;
  for (let i = 0; i < numbers1.length; i++) {
      sum1 += numbers1[i];
  }
  console.log(sum1); // Output: 15
//   ```

// - **Declarative Approach**:
//   ```javascript
  let numbers2 = [1, 2, 3, 4, 5];
  let sum2 = numbers2.reduce((acc, curr) => acc + curr, 0);
  console.log(sum1); // Output: 15
//   ```

// In the imperative approach, we explicitly define the steps to iterate over the array and update the sum. In the declarative approach, we use the `reduce()` function, which abstracts away the loop and the update operation, focusing solely on the computation of the sum.

// In summary, imperative programming focuses on describing the specific steps to achieve a task, while declarative programming focuses on expressing the desired outcome without specifying the exact steps to get there.

// ECMA 

// Overall, ECMAScript serves as the standardized specification for scripting languages like JavaScript, providing a common foundation for web developers to create interactive and dynamic web applications.

// Q. Single-threaded single-threaded event loop model,
 
// JavaScript utilizes a single-threaded event loop model for handling asynchronous operations and concurrency. 
// This model is crucial for building responsive and non-blocking applications, 
// especially in environments like web browsers where user interaction and network requests are common.

// Here's a detailed explanation of how the single-threaded event loop model works in JavaScript:

// 1. **Single-threaded**: JavaScript is inherently single-threaded, meaning it has only one call stack and one memory heap. This single thread executes code synchronously, one command at a time, from top to bottom.

// 2. **Event Loop**: The event loop is a core mechanism in JavaScript that allows asynchronous operations to be handled without blocking the main thread. It continuously checks the call stack and the callback queue to determine if there's any work to be done.

// 3. **Call Stack**: The call stack is a data structure that keeps track of the currently executing function(s). Whenever a function is invoked, it's added to the top of the call stack. When a function completes, it's removed from the stack. This is how JavaScript maintains the order of execution.

// 4. **Callback Queue (Task Queue)**: Asynchronous operations, such as setTimeout, setInterval, DOM events, and AJAX requests, are not executed immediately. Instead, their callback functions are queued in the callback queue once their associated tasks are completed.

// 5. **Event Loop Process**:
//    - Initially, the call stack is empty.
//    - When an asynchronous operation completes, its callback function is placed in the callback queue.
//    - The event loop continuously checks if the call stack is empty and if there are any tasks in the callback queue.
//    - If the call stack is empty and there are tasks in the callback queue, the event loop moves the first callback function from the queue to the call stack for execution.
//    - The callback function is executed synchronously, and any additional functions called within it are added to the call stack.
//    - This process repeats indefinitely, allowing asynchronous tasks to be executed without blocking the main thread.

// 6. **Concurrency and Non-blocking**: Since JavaScript is single-threaded, it can only execute one piece of code at a time. However, asynchronous operations allow it to perform non-blocking I/O operations, such as fetching data from a server or responding to user input, without freezing the UI or halting other operations.

// In summary, the single-threaded event loop model in JavaScript enables asynchronous programming by leveraging callback functions and a task queue, allowing for responsive and non-blocking behavior in web applications.

//Q. what is callback in javascript 
// A callback function in JavaScript is a function that is passed as an argument to another function and is intended to be executed after a particular operation or event has occurred. Callback functions are a fundamental concept in JavaScript, especially when dealing with asynchronous code, event handling, and higher-order functions.
// Here's how callback functions work and some common use cases:

// 1. **Asynchronous Operations**: When performing asynchronous operations such as fetching data from a server, reading a file, or waiting for a user interaction, JavaScript often uses callback functions to handle the result of the operation. For example, when making an AJAX request using the XMLHttpRequest object or modern fetch API, you typically specify a callback function that will be called when the request completes.

//    javascript
//    // Example of using a callback function with AJAX (XMLHttpRequest)
//    function fetchData(url, callback) {
//        var xhr = new XMLHttpRequest();
//        xhr.onreadystatechange = function() {
//            if (xhr.readyState === XMLHttpRequest.DONE) {
//                if (xhr.status === 200) {
//                    // If the request is successful, call the callback function with the response data
//                    callback(null, xhr.responseText);
//                } else {
//                    // If there is an error, call the callback function with the error object
//                    callback(new Error('Failed to fetch data'));
//                }
//            }
//        };
//        xhr.open('GET', url);
//        xhr.send();
//    }

//    // Usage
//    fetchData('https://api.example.com/data', function(error, data) {
//        if (error) {
//            console.error(error);
//        } else {
//            console.log(data);
//        }
//    });
  

// // 2. **Event Handling**: When responding to user interactions or browser events such as clicks, mouse movements, or keyboard input, callback functions are often used to define what should happen when the event occurs.

//    javascript
//    // Example of event handling with callback functions
//    document.getElementById('myButton').addEventListener('click', function() {
//        console.log('Button clicked!');
//    });

// // 3. **Higher-Order Functions**: Callback functions are frequently used with higher-order functions, which are functions that take other functions as arguments or return functions. This allows for a flexible and reusable code structure.

//   // javascript
//    // Example of a higher-order function with a callback
//    function higherOrderFunction(callback) {
//        // Do some processing
//        callback();
//    }

//    // Usage
//    higherOrderFunction(function() {
//        console.log('Callback function called by the higher-order function');
//    });
   

// // Callback functions allow JavaScript to execute code asynchronously, handle events, and create modular and reusable code patterns. They are essential for writing non-blocking code and implementing features like event-driven programming and functional programming paradigms.

// //Q. What are the different data types present in javascript?

// JavaScript supports several data types that represent different kinds of values. These data types can be categorized into two main groups: primitive data types and non-primitive data types (also known as reference types).

// ### Primitive Data Types:

// 1. **Number**: Represents numeric values, including integers and floating-point numbers.

//    ```javascript
//    let num = 42; // Integer
//    let floatNum = 3.14; // Floating-point number
//    ```

// 2. **String**: Represents a sequence of characters, enclosed in single (' ') or double (" ") quotes.

//    ```javascript
//    let str = "Hello, world!";
//    ```

// 3. **Boolean**: Represents a logical value indicating true or false.

//    ```javascript
//    let isTrue = true;
//    let isFalse = false;
//    ```

// 4. **Undefined**: Represents a variable that has been declared but not assigned a value.

//    ```javascript
//    let undefinedVar;
//    ```

// 5. **Null**: Represents the intentional absence of any object value.

//    ```javascript
//    let nullValue = null;
//    ```

// 6. **Symbol**: Represents a unique identifier, introduced in ECMAScript 2015 (ES6).

//    ```javascript
//    const sym = Symbol('description');
//    ```

// ### Non-Primitive Data Types (Reference Types):

// 7. **Object**: Represents a collection of key-value pairs, where keys are strings and values can be of any data type, including other objects.

//    ```javascript
//    let person = {
//        name: "John",
//        age: 30,
//        city: "New York"
//    };
//    ```

// 8. **Array**: Represents an ordered collection of values, typically of the same type, accessed by numeric indices.

//    ```javascript
//    let numbers = [1, 2, 3, 4, 5];
//    ```

// 9. **Function**: Represents a reusable block of code that can be executed when called.

//    ```javascript
//    function greet(name) {
//        return "Hello, " + name + "!";
//    }
//    ```

// 10. **Date**: Represents a specific point in time.

//     ```javascript
//     let today = new Date();
//     ```

// 11. **RegExp**: Represents a regular expression pattern used for pattern matching within strings.

//     ```javascript
//     let regex = /[a-z]+/;
//     ```

// These are the main data types in JavaScript. Understanding them is fundamental for writing JavaScript code effectively and efficiently.
// typeof of primitive types :
// typeof "John Doe" // Returns "string"
// typeof 3.14 // Returns "number"
// typeof true // Returns "boolean"
// typeof 234567890123456789012345678901234567890n // Returns bigint
// typeof undefined // Returns "undefined"
// typeof null // Returns "object" (kind of a bug in JavaScript)
// typeof Symbol('symbol') // Returns Symbol

// Q. Symble in detail
// Sure, let's delve into an example to illustrate how `Symbol` creates unique identifiers:

// ```javascript
// // Creating two symbols with the same description
// const sym1 = Symbol('description');
// const sym2 = Symbol('description');

// // Checking if they are equal
// console.log(sym1 === sym2); // false

// // Creating two symbols with different descriptions
// const sym3 = Symbol('foo');
// const sym4 = Symbol('bar');

// // Checking if they are equal
// console.log(sym3 === sym4); // false

// // Creating a symbol without a description
// const sym5 = Symbol();
// const sym6 = Symbol();

// // Checking if they are equal
// console.log(sym5 === sym6); // false
// ```

// In this example:

// - We create two symbols, `sym1` and `sym2`, with the same description `'description'`.
// - We also create two symbols, `sym3` and `sym4`, with different descriptions `'foo'` and `'bar'`, respectively.
// - Finally, we create two symbols, `sym5` and `sym6`, without any description.

// Despite having the same description or no description at all, the symbols are all unique. This uniqueness is guaranteed by JavaScript. When we check if they are equal using the `===` operator, we get `false` for all comparisons because each symbol is a distinct and immutable value.

// This uniqueness property makes symbols useful for scenarios where you need to create private or hidden object properties, as well as for defining unique keys in objects, such as in the case of using symbols as property keys:

// ```javascript
// const myObj = {};

// const privateProperty = Symbol('private');
// myObj[privateProperty] = 'This is a private property';

// console.log(myObj[privateProperty]); // 'This is a private property'
// ```

// Q. immutabiity 
// In this case, `privateProperty` is a unique symbol used as a key to create a private property in `myObj`. Because symbols are unique, there's a low chance of accidental collision with other property names. Additionally, because symbols are not enumerable, this property won't show up in iterations over object properties, helping to maintain encapsulation and privacy.
// In programming, immutability refers to the property of an object whose state cannot be modified after it has been created. Once an immutable object is created, its state remains constant throughout its lifetime. This means that any attempt to change the object's state will result in the creation of a new object with the modified state, leaving the original object unchanged.

// Here's a breakdown of what immutability means:

// 1. **Unchanging State**: Once an immutable object is created, its internal state (i.e., its properties or values) cannot be modified. Any operation that appears to modify the object actually creates a new object with the desired changes, leaving the original object intact.
// 2. **Predictability**: Immutability ensures predictability in the behavior of objects. Since immutable objects cannot be changed after creation, their state remains constant, making it easier to reason about their behavior and preventing unexpected side effects.
// 3. **Thread Safety**: Immutable objects are inherently thread-safe because their state cannot be modified. This eliminates the need for synchronization mechanisms such as locks or mutexes when dealing with concurrent access by multiple threads.
// 4. **Value Semantics**: Immutable objects exhibit value semantics, meaning that their identity is determined solely by their values, not by any mutable state. Two immutable objects with the same values are considered equal, regardless of whether they are the same instance.
// 5. **Copy-On-Write**: In some implementations, immutable objects leverage a copy-on-write strategy, where modifications create copies of only the parts of the object that are being changed. This optimization helps minimize memory usage and improve performance.
// In JavaScript, primitive data types like numbers, strings, and symbols are immutable by nature. Once they are created, their values cannot be changed. However, objects and arrays in JavaScript are mutable, meaning that their properties or elements can be modified. To achieve immutability with objects and arrays, you typically need to use techniques such as object spread syntax, array spread syntax, or libraries like Immutable.js to create new copies with the desired changes instead of modifying the original objects directly.

// Q. strict mode in js

// Strict mode in JavaScript is a way to opt into a restricted variant of JavaScript, where certain actions that may have been ignored or interpreted differently in normal JavaScript are instead flagged as errors. It helps developers write cleaner, more secure, and more maintainable code by enforcing stricter rules and preventing common mistakes.
// Here are some reasons why we use strict mode in JavaScript:
// 1. **Error Detection**: Strict mode helps catch common coding errors and unsafe actions that might otherwise fail silently or produce unexpected behavior in normal mode. For example, assigning values to undeclared variables, using reserved keywords as variable names, or deleting undeletable properties will result in errors in strict mode, making it easier to identify and fix such issues.
// 2. **Prevents Implicit Globals**: In normal JavaScript, if you assign a value to a variable without declaring it first, JavaScript will create a global variable with that name. This can lead to unintended consequences and hard-to-debug issues. Strict mode prevents this behavior by throwing an error when attempting to assign a value to an undeclared variable.
// 3. **Makes `this` Binding Safer**: In strict mode, the value of `this` inside a function will be `undefined` if the function is called without an explicit receiver (i.e., not using `call()` or `apply()`). This prevents accidental usage of the global object as `this`, which can cause unexpected behavior and security vulnerabilities.
// 4. **Restricts Function Parameter Names**: Strict mode prohibits the use of certain identifiers as parameter names in function declarations and expressions, such as `arguments`, `eval`, and `with`. This prevents potential conflicts and enhances code clarity.
// 5. **Enhanced Security**: By disallowing certain features that are considered unsafe or prone to vulnerabilities, strict mode helps improve the security of JavaScript code running in browsers and other environments.
// To enable strict mode, you simply add the `"use strict";` directive at the beginning of a script or a function:

// ```javascript
// "use strict";

// // Strict mode enabled for this script

// function myFunction() {
//     "use strict";
//     // Strict mode enabled for this function
// }
// ```

// By using strict mode, developers can write cleaner, safer, and more predictable JavaScript code, ultimately leading to better software quality and maintainability.


// function name(params) {
//   console.log("test"); // Log "test" to the console
//   setTimeout(function name(params) {
//       console.log(params, "hiiii"); // Log the value of params and "hiiii" to the console after 2 seconds
//   }, 2000);
//   console.log("Last"); // Log "Last" to the console
// }
// name("hiiiiiiiiiiiiiiiiiiiiiiiii");
// we can not pass the params to the inner set time out function in js 
// VM1925:2 test
// VM1925:6 Last
// undefined
// VM1925:4 undefined 'hiiii'

// function name(params) {
//   console.log("test"); // Log "test" to the console
//   setTimeout(function tame() {
//       console.log(params, "hiiii"); // Log the value of params and "hiiii" to the console after 2 seconds
//   }, 2000);
//   console.log("Last"); // Log "Last" to the console
// }

