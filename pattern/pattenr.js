function pattern1(n, pattern = "") {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      pattern += "* ";
    }
    pattern += "\n";
  }
  console.log(1);
  console.log(pattern);
}

pattern1(5);

function pattern2(n, pattern = "") {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      pattern += "* ";
    }
    pattern += "\n";
  }
  console.log(2);
  console.log(pattern);
}

pattern2(5);

function pattern3(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      pattern += j + " ";
    }
    pattern += "\n";
  }
  console.log(3);
  console.log(pattern);
}
pattern3(5);

function pattern4(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      pattern += i + " ";
    }
    pattern += "\n";
  }
  console.log(4);
  console.log(pattern);
}
pattern4(5);

function pattern5(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n - i + 1; j++) {
      pattern += "* ";
    }
    pattern += "\n";
  }
  console.log(5);

  console.log(pattern);
}
pattern5(5);

function pattern6(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n - i + 1; j++) {
      pattern += j + " ";
    }
    pattern += "\n";
  }
  console.log(6);
  console.log(pattern);
}
pattern6(5);

// let pattern='';
function pattern7(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n - i; j++) {
      pattern += " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
      pattern += "*";
    }
    for (let j = 1; j <= n - i; j++) {
      pattern += " ";
    }
    pattern += "\n";
  }
  console.log(7);
  console.log(pattern);
}
pattern7(5);

function pattern8(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      pattern += " ";
    }
    for (let j = 1; j <= n * 2 - 2 * i + 1; j++) {
      pattern += "*";
    }
    for (let j = 1; j <= i; j++) {
      pattern += " ";
    }
    pattern += "\n";
  }
  console.log(8);
  console.log(pattern);
}
pattern8(5);

function pattern9(n, pattern = "") {
  for (let i = 1; i <= 2 * n - 1; i++) {
    let star = i;
    if (i > n) star = 2 * n - i;
    for (let j = 1; j <= star; j++) {
      pattern += "*";
    }
    pattern += "\n";
  }
  console.log(9);
  console.log(pattern);
}
pattern9(5);

function pattern10(n, pattern = "") {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if ((i + j) % 2 == 0) {
        pattern += " 1";
      } else {
        pattern += " 0";
      }
    }
    pattern += "\n";
  }
  console.log(10);
  console.log(pattern);
}
pattern10(5);

function pattern11(n, pattern = "") {
  let space = 2 * (n - 1);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      pattern += j;
    }
    for (let j = 1; j <= space; j++) {
      pattern += " ";
    }
    for (let j = i; j >= 1; j--) {
      pattern += j;
    }
    space = space - 2;
    pattern += "\n";
  }
  console.log(11);
  console.log(pattern);
}
pattern11(4);

function pattern12(n, pattern = "") {
  let count = 1;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      pattern += count + " ";
      count++;
    }

    pattern += "\n";
  }
  console.log(12);
  console.log(pattern);
}
pattern12(5);

function pattern13(n, pattern = "") {
  for (let i = 0; i < n; i++) {
    // for(let ch='A';ch<='A'+i; ch++){
    //     pattern+=ch+" ";
    // }
    for (let ch = "A".charCodeAt(0); ch <= "A".charCodeAt(0) + i; ch++) {
      pattern += String.fromCharCode(ch) + " ";
    }
    pattern += "\n";
  }
  console.log(13);
  console.log(pattern);
}
pattern13(5);

function pattern14(n, pattern = "") {
  for (let i = 0; i < n; i++) {
    for (
      let ch = "A".charCodeAt(0);
      ch <= "A".charCodeAt(0) + (n - i - 1);
      ch++
    ) {
      pattern += String.fromCharCode(ch) + " ";
    }
    pattern += "\n";
  }
  console.log(14);
  console.log(pattern);
}
pattern14(5);

function pattern15(n, pattern = "") {
  for (let i = 1; i <= 2 * n - 1; i++) {
    let star = i;
    pattern += "+";
    if (i > n) star = 2 * n - i;
    for (let j = 2; j <= star; j++) {
      if (star == j) {
        pattern += "+";
      } else {
        pattern += "+";
      }
    }

    pattern += "\n";
  }
  console.log(15);
  console.log(pattern);
}
pattern15(5);

function pattern16(n) {
  let pattern = "";
  for (let i = 1; i <= 2 * n - 1; i++) {
    let star = i <= n ? i : 2 * n - i;
    pattern += "1";
    for (let j = 2; j <= star; j++) {
      if (j === star) {
        pattern += j;
      } else {
        pattern += " ";
      }
    }
    pattern += "\n";
  }
  console.log(16);
  console.log(pattern);
}

pattern16(5);

function pattern17(n) {
  let pattern = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i == 1 || j == 1 || j == n || i == n) {
        pattern += "*";
      } else {
        pattern += " ";
      }
    }
    pattern += "\n";
  }
  console.log(17);

  console.log(pattern);
}

pattern17(5);

function pattern18(n) {
  let pattern = "";
  let num = n;
  for (let i = 0; i < 2 * n - 1; i++) {
    for (let j = 0; j < 2 * n - 1; j++) {
      let count = "";
      if (i == j) {
        pattern += " " + num - i + " ";
      } else {
        pattern += " " + i + "," + j + " ";
      }
    }
    pattern += "\n";
    num = num - 1;
  }
  console.log(18);
  console.log(pattern);
}

pattern18(4);

function pattern19(n) {
  let pattern = "";
  let space = 2 * n - 2;
  for (let i = 1; i <= 2 * n - 1; i++) {
    let stars = i;
    if (i > n) {
      stars = 2 * n - i;
    }
    for (let j = 1; j <= stars; j++) {
      pattern += "*";
    }

    for (let j = 1; j <= space; j++) {
      pattern += " ";
    }

    for (let j = 1; j <= stars; j++) {
      pattern += "*";
    }
    pattern += "\n";

    if (i < n) {
      space = space - 2;
    } else {
      space = space + 2;
    }
  }
  console.log(19);
  console.log(pattern);
}

pattern19(5);

function pattern20(n) {
  let star = "";
  let space = 0;
  let pattern = "";
  for (let i = 1; i <= 2 * n - 1; i++) {
    if (i < n) {
      star = n - i;
    } else {
      star = i - n;
    }
    for (let j = 0; j <= star; j++) {
      pattern += "*";
    }
    for (let j = 1; j <= space; j++) {
      pattern += " ";
    }
    for (let j = 0; j <= star; j++) {
      pattern += "*";
    }
    if (i < n) {
      space = space + 2;
    } else {
      space = space - 2;
    }
    pattern += "\n";
  }

  console.log(20);
  console.log(pattern);
}
pattern20(5);


function pattern21(n){
    let pattern='';
    for(let i=0;i<n;i++){
        for(let j=0;j<n-i;j++){
            pattern+='*';
        }
        for(let j=0;j<2*i;j++){
            pattern+=' ';
        }
        for(let j=0;j<n-i;j++){
            pattern+='*';
        }
        pattern+='\n';
    }

    for(let i=1;i<=n;i++){
        for(let j=1;j<=i;j++){
            pattern+='*';
        }
        for(let j=1;j<=2*n-2*i;j++){
            pattern+=' ';
        }
        for(let j=1;j<=i;j++){
            pattern+='*';
        }
        pattern+='\n';
    }
    console.log(21);
    console.log(pattern);
    
}

pattern21(5);