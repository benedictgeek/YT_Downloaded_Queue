export {};

interface PersonParams {
  name: string;
}
class Person {
  myname: string;

  constructor({ name }: PersonParams) {
    this.myname = name;
  }

  greet() {
    return this.myname;
  }
}

let p = new Person({ name: "Shola" });

let fn = () => {};

console.log(p.greet());
