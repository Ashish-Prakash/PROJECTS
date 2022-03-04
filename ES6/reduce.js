let a = [1,2,3,4,5];
function sum(a,b){
    return a+b;
}

let res = a.reduce(sum);
console.log(res);



function myReduce(a,f){
    let res = a[0];
    for (let index = 1; index < a.length; index++) {
        res = f(res, a[index]);
    }
    return res;
}

console.log(myReduce(a,sum));