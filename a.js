var a = { name: "Sam" };
var b = { name: "Tom" };
var o = {};
o[a] = 1;
o[b] = 2;

// console.log(o[a]===o[b])


class A {
    constructor() {
        console.log(B.name);
    }
}
class B extends A {
    constructor() {
        super();
        this.name = "B";
    }
}

const c = new B()






