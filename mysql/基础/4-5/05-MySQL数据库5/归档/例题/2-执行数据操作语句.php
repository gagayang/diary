<?php
//1、连接数据库
$link=mysqli_connect('localhost','root','root','data');
//2、设置支付编码
mysqli_set_charset($link,'utf8');
//3、执行SQL语句

//3.1  执行insert语句
/*
$rs=mysqli_query($link,"insert into news values (null,'静夜思','床前明月光',unix_timestamp())");
if($rs)
	echo '自动增长的编号是：'.mysqli_insert_id($link);
*/

//3.2  执行update语句
/*
$rs=mysqli_query($link,"update news set content='疑是地上霜' where id=4");
if($rs)
	echo '受影响的记录数是：'.mysqli_affected_rows($link);
else{
	echo '错误码：'.mysqli_errno($link),'<br>';
	echo '错误信息：'.mysqli_error($link);	
}
*/

//3.3  执行delete语句
mysqli_query($link,"delete from news where id=5");
