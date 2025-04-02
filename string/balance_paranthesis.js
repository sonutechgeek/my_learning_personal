function isValidParentheses(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char); 
        } else {
            const top = stack.pop(); 
            if (
                (char === ')' && top !== '(') ||
                (char === '}' && top !== '{') ||
                (char === ']' && top !== '[')
            ) {
                return false; 
            }
        }
    }
    return stack.length === 0; 

    
}

console.log(isValidParentheses("()"));  // true
console.log(isValidParentheses("{[()]}"));  // true
console.log(isValidParentheses("{[(])}"));  // false
console.log(isValidParentheses("{{"));  // false
