function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
    console.log("Hello111, " + name);
}

function sayBye() {
    console.log("Goodbye!");
}

greet("John", sayBye);
