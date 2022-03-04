let a = [1,2,3,4,5];

function double(x){
    return 2*x;
}

let ans = a.map(double);   //[2,4,6,8,10];
console.log(a);
console.log(ans);


// replica of map

function myMap(a,f){
    let res = [];
    for (let index = 0; index < a.length; index++) {
        res.push(f(a[index]));
    }  
    return res;
}
console.log(myMap(a,double));