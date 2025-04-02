function fibbonaccci_series(n){
    for (let i = 0; i < n; i++) {
        console.log(fibbo_recu(i));
        // process.stdout.write(`${i} `);
    }
}

function fibbo_recu(n){
    if(n==0||n==1){
        return n;
    }
    else{
        return fibbo_recu(n-1)+fibbo_recu(n-2);
    }
}
fibbonaccci_series(10);
