package com.test.haa;

public class Test {
  public static void main(String[] args) {
    // 如何去获取汽车的对象。
    Car c1 = new Car();
    System.out.println(c1);
    c1.name = "宝马X3";
    c1.price = 37.89;
    System.out.println(c1.name);
    System.out.println(c1.price);
    c1.start();
    c1.run();

    System.out.println("-------------------");
    Car c2 = new Car();
    c2.name = "奔驰GLC";
    c2.price = 39.89;
    System.out.println(c2.name);
    System.out.println(c2.price);
    c2.start();
    c2.run();
    byte[] bytes = {97, 98, 99, 65, 66, 67};
    String s4 = new String(bytes);
    System.out.println(s4); // System.out.println("---------------------------------------");
    String ss1 = "abc";
    String ss2 = "abc";
    System.out.println(ss1 == ss2);
    char[] chars1 = {'a' , 'b' , 'c'};
    String ss3 = new String(chars1);
    String ss4 = new String(chars1);
    System.out.println(ss3 == ss4);
  }
}
