<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>
<?php
if(!empty($_POST)) {
	//2、连接数据库
	require './inc/conn.php';
	//3、插入数据
	$time=time();	//获取时间戳
	$sql="insert into news values (null,'{$_POST['title']}','{$_POST['content']}',$time)";
	//执行SQL语句
	if(mysqli_query($link,$sql))
		header('location:./list.php');	//插入成功就跳转到list.php页面
	else{
		echo 'SQL语句插入失败<br>';
		echo '错误码：'.mysqli_errno($link),'<br>';
		echo '错误信息：'.mysqli_error($link);
	}
}
?>
<!--1、创建表单-->
<form method="post" action="">
	标题： <input type="text" name="title"> <br /> <br />
	内容:  <textarea name="content" rows="5" cols="30"></textarea> <br /> <br />
	<input type="submit" name="button" value="提交">
</form>
</body>
</html>