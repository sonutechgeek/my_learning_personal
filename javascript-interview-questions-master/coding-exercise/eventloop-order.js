function main(){
    console.log('A');
    setTimeout(
        function print(){ console.log('B'); }
        );
    console.log('C');
    for (let index = 0; index < 10; index++) {
        const element = index;
        console.log(element);
        
        
    }
    setTimeout( ()=>{
        console.log("test");
        
    },0)
}
main(); // A,C and B