<?php
//连接数据库
require './inc/conn.php';
//1、获取修改的数据库
$sql="select * from news where id={$_GET['id']}";	//拼接SQL语句
$rs=mysqli_query($link,$sql);	//获取修改的数据
$rows=mysqli_fetch_assoc($rs);	//将修改的数据匹配成一维关联数组
//2、执行修改的逻辑
if(!empty($_POST)) {
	$id=$_GET['id'];		//获取修改的id
	$title=$_POST['title'];	//修改的标题
	$content=$_POST['content'];	//修改的内容
	$sql="update news set title='$title',content='$content' where id=$id"; //拼接SQL语句
	if(mysqli_query($link,$sql))
		header('location:list.php');
	else
		echo '错误：'.mysqli_error($link);
	exit;
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>
<form method="post" action="">
	标题： <input type="text" name="title" value='<?php echo $rows['title']?>'> <br /> <br />
	内容:  <textarea name="content" rows="5" cols="30"><?php echo $rows['content']?></textarea> <br /> <br />
	<input type="submit" name="button" value="提交">
	<input type="button" value="返回" onclick="location.href='list.php'">
</form>
</body>
</html>
