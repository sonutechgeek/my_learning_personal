let array = [3, 2, 1, 56, 10000, 167];
let min=array[0];
let max=array[0];
for (let i = 1; i < array.length; i++) {
    const element = array[i];
    if(element<min){
        min=element;
    }
    if(element>min && element>max){
        max=element;
    }
    
}
console.log("min ",min , "max",max);
