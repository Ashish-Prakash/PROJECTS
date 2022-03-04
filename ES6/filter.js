let a = [1,2,3,4,5];

function isEven(x){
    if(x%2==0) return true;
    return false;
}
let res = a.filter(isEven); //[2,4]

console.log(res);

function myFilter(a, f){
    let res = []
    for (let index = 0; index < a.length; index++) {
        if(f(a[index])){
            res.push(a[index]);
        }
    }
    return res;
}
console.log(myFilter(a,isEven));