// Longest word ina string
const findLongestWord=(str)=>{
    const arrofstr=str.trim().split(' ');
    let strLen=0;
    console.log(arrofstr);
    
    // arrofstr.forEach(element => {
    //     if(element.length>strLen){
    //         strLen=element.length; 
    //     }
    // });
    arrofstr.forEach(element => {
        if (element.length > strLen) {
            strLen = element.length;
        }
    });
    // for (let i = 0; i < arrofstr.length; i++) {
    //     const element = arrofstr[i];
    //     if(strLen<arrofstr[i].length){
    //         strLen=arrofstr[i].length;
    //     }
        
    // }
    return strLen;

}

console.log(findLongestWord("watch Thapa Technical Javascript course on youtube"))