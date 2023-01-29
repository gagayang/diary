package com.test.hello;

public class HelloWorld {
  //  public static void main(String[] args) {
//    System.out.println("hello world" ) ;
//  }
  public static void main(String[] args) {
    byte a = 123;
    System.out.println(a); // 123;
//    byte aa = 128; // 报错，byte范围：-128～127
    int aaa = 232323;
    long aaaa = 23412341234123L; // 不加L，这个数没有超出long的范围也会报错，因为写的数据默认是int类型，加个L或者l表示这个数据就是long类型
    float s = 98.4F; // 默认写个小数都是double类型，要明确表示浮点型，就在后面加一个F或者f表示浮点型
    double ss = 999.33; // 也可以在后面加上一个D（没必要）
    char sddd = '4';
//    char df = '中国'; // 报错，字符类型只能是1位
    // js中常用的string，在java中只能是引用数据类型，String
    String name = "hahha，网络";
    System.out.println(name);
  }
}
