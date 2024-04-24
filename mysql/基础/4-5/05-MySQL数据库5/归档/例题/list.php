<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
<style type="text/css">
	table{
		width:780px;
		border:solid 1px #000;
		margin:auto;
	}
	th,td{
		border:solid 1px #000;
	}
</style>
</head>

<body>
<?php
//1、连接数据库
require './inc/conn.php';
//2、获取数据
$rs=mysqli_query($link,'select * from news order by id desc');	//返回结果集对象
$list=mysqli_fetch_all($rs,MYSQLI_ASSOC);		//将结果匹配成关联数组
?>
<a href="./add.php">添加新闻</a>
<table>
	<tr>
		<th>编号</th> <th>标题</th> <th>内容</th> <th>时间</th> <th>修改</th> <th>删除</th>
		<!--3、循环显示数据-->
		<?php foreach($list as $rows):?>
		<tr>
			<td><?php echo $rows['id']?></td>
			<td><?php echo $rows['title']?></td>
			<td><?php echo $rows['content']?></td>
			<td><?php echo date('Y-m-d H:i:s',$rows['createtime'])?></td>
			<td><input type="button" value="修改" onclick="location.href='edit.php?id=<?php echo $rows['id']?>'"></td>
			<td><input type="button" value="删除" onclick="if(confirm('确定要删除吗'))location.href='./del.php?id=<?php echo $rows['id']?>'"></td>
		</tr>
		<?php endforeach;?>
	</tr>
</table>
</body>
</html>