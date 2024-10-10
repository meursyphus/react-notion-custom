import { dedent } from "ts-dedent";
export const javascript = dedent`
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}

class Cat extends Animal {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}
`;
