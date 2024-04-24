<?php
//连接数据库，连接成功返回连接对象
$link=@mysqli_connect('localhost','root','root','data','3306');
//var_dump($link);			//object(mysqli)
if(mysqli_connect_error()){
	echo '错误号：'.mysqli_connect_errno(),'<br>';	//显示错误编码
	echo '错误信息：'.mysqli_connect_error();		//显示错误信息
	exit;
}
//设置字符编码
mysqli_set_charset($link,'utf8');
