<?php
//1、连接数据库
$link=@mysqli_connect('localhost','root','root','data') or die('错误信息：'.mysqli_connect_error());
//2、设置字符编码
mysqli_query($link,'set names utf8');
//3、执行查询语句
$rs=mysqli_query($link,'select * from news');
//var_dump($rs);	//object(mysqli_result)
//4、获取对象中的数据
//4.1  将对象中的一条数据匹配成索引数组,指针下移一条
//$rows=mysqli_fetch_row($rs);

//4.2  将对象中的一条数据匹配成关联数组,指针下移一条
//$rows=mysqli_fetch_assoc($rs);

//4.3  将对象中的一条数据匹配成索引，关联数组,指针下移一条
//$rows=mysqli_fetch_array($rs);

//4.4  总列数、总行数
//echo '总行数'.mysqli_num_rows($rs),'<br>';
//echo '总列数'.mysqli_num_fields($rs),'<br>';

//4.5  获取所有数据
//$list=mysqli_fetch_all($rs);		//默认是索引数组
//$list=mysqli_fetch_all($rs,MYSQLI_NUM);		//匹配成索引数组
//$list=mysqli_fetch_all($rs,MYSQLI_ASSOC);		//匹配成关联数组
$list=mysqli_fetch_all($rs,MYSQLI_BOTH);		//匹配成关联、索引数组

echo '<pre>';
print_r($list);

//5、销毁结果集
mysqli_free_result($rs);

//6、关闭连接
mysqli_close($link);



