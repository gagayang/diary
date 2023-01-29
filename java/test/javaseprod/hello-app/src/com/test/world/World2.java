package com.test.world;

import java.util.ArrayList;

public class World2 {
  public static void main(String[] args) {
    ArrayList<Integer> scores = new ArrayList<>();
    scores.add(98);
    scores.add(77);
    scores.add(66);
    scores.add(89);
    scores.add(79);
    scores.add(50);
    scores.add(100);
    System.out.println(scores);
    // [98, 77, 66, 89, 79, 50, 100]
    // [98, 66, 89, 50, 100]
    //                   i
//
//    // 1、遍历集合中的每个元素
//        for (int i = 0; i < scores.size(); i++) {
//            int score = scores.get(i);
//            // 2、判断这个分数是否低于80分，如果低于则从集合中删除它
//            if(score < 80){
//                scores.remove(i);
//            }
//        }
//        System.out.println(scores);

    //  结果：
    //  [98, 77, 66, 89, 79, 50, 100]
    //  [98, 66, 89, 50, 100]

    for (int i = scores.size() - 1; i >= 0 ; i--) {
      int score = scores.get(i);
      // 2、判断这个分数是否低于80分，如果低于则从集合中删除它
      if(score < 80){
        scores.remove(i);
      }
    }
    System.out.println(scores);
    //结果：
    //    [98, 77, 66, 89, 79, 50, 100]
    //    [98, 89, 100]
  }
}

