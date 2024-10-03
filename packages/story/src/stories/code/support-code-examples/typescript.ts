import { dedent } from "ts-dedent";
export const typescript = dedent`
interface Comparable<T> {
  compareTo(other: T): number;
}

function max<T extends Comparable<T>>(arr: T[]): T {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].compareTo(max) > 0) {
      max = arr[i];
    }
  }
  return max;
}

class Person implements Comparable<Person> {
  constructor(public name: string, public age: number) {}

  compareTo(other: Person) {
    return this.age - other.age;
  }
}

const people: Person[] = [
  new Person("Alice", 30),
  new Person("Bob", 25),
  new Person("Charlie", 35)
];

const oldestPerson = max(people);
console.log(\`The oldest person is \${oldestPerson.name}, who is \${oldestPerson.age} years old.\`);  // Output: The oldest person is Charlie, who is 35 years old.
`;
