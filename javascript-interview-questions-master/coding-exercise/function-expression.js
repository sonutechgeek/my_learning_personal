var y = 1;
if (function f(){}) {
    y += typeof f;
    console.log(y);
}
console.log(y);