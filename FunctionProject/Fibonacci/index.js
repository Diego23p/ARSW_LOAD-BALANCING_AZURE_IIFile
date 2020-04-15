var bigInt = require("big-integer");

var memory = [];
function recursiveFibonacci(n){
    if(n==0 || n==1){
        return bigInt.one;
    }else{
        if(memory[n]!=-1) { 
			return memory[n];
		} else {
			memory[n] = recursiveFibonacci(n-1).add(recursiveFibonacci(n-2));
			return memory[n];
		}
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        if(nth+1>memory.length){
            memory = [];
            for(var i=0;i<nth+1;i++){
                memory.push(-1);
            }
        }
        answer = recursiveFibonacci(nth);
    }

    context.res = {
        body: answer.toString()
    };
}