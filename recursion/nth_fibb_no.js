let fibbonacci_series = [];
function find_nth_fib_num(n) {
  let num = 0;
  for (let i = 1; i < n+1; i++) {
   num= fibbonaccci_series(i);
   fibbonacci_series.push(num);
  }
  console.log(fibbonacci_series);
  
  return(fibbonacci_series[n-1]);
}

function fibbonaccci_series(n) {
  if (n == 0 || n == 1) {
    return n;
  } else {
    return fibbonaccci_series(n - 1) + fibbonaccci_series(n - 2);
  }
}

console.log(find_nth_fib_num(6));
