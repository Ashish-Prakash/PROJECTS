let a = [1,2,3,];
let b = [4,5];

let c = [...a,...b];
console.log(c);


let o1 = {a:1, b:2};
let o2 = {c:3, d:4};

let o3 = {...o1,...o2};
console.log(o3);

let res = [...a.slice(0,1),4,5,...a];
console.log(res);