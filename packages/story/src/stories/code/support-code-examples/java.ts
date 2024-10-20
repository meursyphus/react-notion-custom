import { dedent } from "ts-dedent";

export const java = dedent`
public class Animal {
  private String name;
  private int age;

  public Animal(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }
}

public class Cat extends Animal {
  private String color;

  public Cat(String name, int age, String color) {
    super(name, age);
    this.color = color;
  }

  public String getColor() {
    return color;
  }
}
`;
