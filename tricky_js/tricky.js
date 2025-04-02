// // Q1
// // let a = {};
// // let b = { key: "b" };
// // let c = { 6: "c" };
// // let d = { key23: "6774664" };

// // a[b] = 123;
// // a[c] = 456;
// // a[d] = 343435;

// // // console.log(a[b], a);

// // console.log(a[b.key], a);


// let a = {};
// let b = { key: "b" };
// let c = { 6: "c" };
// let d = { key23: "6774664" };

// // Using properties of objects as keys
// a[b.key] = 123;            // Sets a["b"] = 123
// a[c[6]] = 456;             // Sets a["c"] = 456
// a[d.key23] = 343435;       // Sets a["6774664"] = 343435

// console.log(a[b.key], a);  // Logs: 123 { b: 123, c: 456, '6774664': 343435 }

// let oo = { 6: "c", 5: '66et', 4: 'hhh', hg: 67 };
// console.log(oo[6]);       // "c"
// console.log(oo[5]);       // "66et"
// console.log(oo[4]);       // "hhh"
// console.log(oo.hg);  // 67

// console.log(oo);




// // Q2
// let obj1 = { key: "value" };
// let obj2 = obj1;
// let obj3 = obj2;

// obj1.key = "new value";
// obj2.key = "newgxgddgdggdgd value";
// obj2 = { key: "another value" };

// console.log(obj1.key, obj2.key, obj3.key);


// const obj = {
//     a: "foo",
//     b: function () {
//       console.log(this.a);
//     },
//   };
  
//   const c = obj.b;
  
//   obj.b();
//   c();
  

// const x = { foo: 1 };
// const y = { foo: 2 };

// function addFoo(obj) {
//   return obj.foo + 1;
// }

// console.log(addFoo(x));
// console.log(addFoo(y));

// const arr = [1, 2, 3, 4, 5];

// for (let i = 0; i < arr.length; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, 1000);
// }

// // resolution of above without removing var 

// for (var i = 0; i < arr.length; i++) {
//     ((i) =>{
//       setTimeout(function () {
//         console.log(i);
//       }, 1000);
//     })(i);
//   }
  

//   let x = 1;

//   console.log(function f() {});
  
//   if (function f() {}) {
//     x += typeof f;
//   }
  
//   console.log(x);

var x = 0;
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    x++;
    console.log(x);
  }, 1000);
}

  