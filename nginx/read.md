判断网站是否大型：

PV（page view，页面浏览量）

用户每打开1个网站页面，记录1个PV。用户多次打开同一页面，PV值累计多次。主要用来衡量网站用户访问的网页数量。是评价网站流量最常用的指标之一。

UV（ unique visitor，网站独立访客）

通过互联网访问、流量网站的自然人。1天内相同访客多次访问网站，只计算为1个独立访客。该概念的引入，是从用户个体的角度对访问数据进行划分。

IP（独立IP）

1天之内（00:00~24:00），访问网站的不重复的IP数。拥有特定唯一IP的计算机访问网站的次数，因为这种统计方式比较容易实现，具有较高的真实性。

IP和UV的区别：比如一个公司5台电脑，对一个网站的访问，就是1个IP，5个UV，这两个一般聊UV

VV（video view，视频播放量）

一个统计周期内，视频被打开的次数。

CV（Content Views，内容播放数）

一个统计周期内，视频被打开，且视频正片内容（除广告）被成功播放的次数。

这些概念都是在数据分析中使用，用于数据统计和用户分析。VV和CV属于播放类指标，PV、UV、IP属于浏览类指标。

负载均衡器的用途

浏览器 =》 负载均衡 =链接=》缓存服务器（避免mysql的不必要访问，还能提高浏览器访问速度） =链接=》多台web服务器（这个服务器除了工作用，还有备份服务器（替补），这种备份在每个环节都可以添加） =》交换机 =》 多台mysql服务器（分主从服务器，主负责写，从1负责查（查很多），从2负责数据同步……读写分离）
注意点：那么从web服务器返回的数据，可以直接给到浏览器，也可以通过负载均衡器返回，但是这样负载均衡器压力就会比较大，但是一般采用这种，不然web服务器直接对接浏览器，web服务器就暴露于公网，不安全

网站并发数？
网站服务器在单位时间内能够处理的最大连接数

负载均衡？
方案1: 硬件，立竿见影，效果好，价格非常贵
方案2: 软件，比如lvs（liunx virtul server），nginx（web服务器，负载均衡）

负载均衡的策略（主要是这三种）：
1、轮询，负载均衡器把请求轮流发给后面的web服务器
2、ip哈希，同一个地址的客户端，始终请求同一台主机
3、最少链接，负载均衡器把请求给负载最小的那台服务器

常见web服务器：
apache：重量级产品，稳定，但是耗费内存。高并发会耗费服务器。
lighttpd：内存开销低，cpu占用率低，模块丰富，轻量级web服务器。
nginx：省资源，省cpu，高并发有优势，能达到3-5万的并发量。不光能够做web服务器，也能做负载均衡器使用。

nginx优点：
1、高并发，官网测试能够支持5万的并发连接
2、内存消耗少，nginx+php（fastCGI）服务器在3万并发数下，开启10个nginx进程消耗150M内存（15M*10=150M），开启64个php-cgi进程消耗1280M内存（20M*64=1280M）
3、成本低
4、配置简单
5、支持rewrite重写规则：能够根据域名、URL不同，将http请求分到不同的后端服务器。
6、内置健康检测，如果nginx proxy后端的某台服务器宕机了，不影响前端访问。
7、节省带宽，支持gzip。
8、稳定性高：用于反向代理，宕机概率低
9、支持热部署：不间断服务情况下进行版本升级。
10、常见的操作系统，linux、MacOS，windows都支持

yum安装和源码安装哪个好？
https://blog.csdn.net/qq_34556414/article/details/104777892

centos7安装nginx
https://juejin.cn/post/6844904134345228301
如果官方yum镜像里面没有nginx，需要如下操作：
https://blog.csdn.net/l_liangkk/article/details/105003088
https://www.jianshu.com/p/21f0918b7bcb
扩展知识：
https://www.jianshu.com/p/21f0918b7bcb
多子域名配置方案：
https://www.jianshu.com/p/21f0918b7bcb

操作完毕后，就可以查看有用的nginx源了：
yum --showduplicates list nginx | expand

Loaded plugins: fastestmirror, langpacks
Loading mirror speeds from cached hostfile

* base: mirrors.aliyun.com
* epel: mirrors.bfsu.edu.cn
* extras: mirrors.aliyun.com
* updates: mirrors.aliyun.com
  Installed Packages
  nginx.x86_64                        1:1.20.1-10.el7                        @epel
  Available Packages
  nginx.x86_64                        1:1.20.1-10.el7                        epel

[root@localhost nginx]# netstat -tunpl | grep 80
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      6236/nginx: master
tcp6       0      0 :::80                   :::*                    LISTEN      6236/nginx: master
当前80端口被nginix占用

nginx配置文件路径：
/etc/nginx/nginx.conf

常用启动命令：
$ sudo systemctl enable nginx # 设置开机启动
$ sudo service nginx start # 启动 nginx 服务
$ sudo service nginx stop # 停止 nginx 服务
$ sudo service nginx restart # 重启 nginx 服务
$ sudo service nginx reload # 重新加载配置，一般是在修改过 nginx 配置文件时使用。

#： nginx -s reload （不停止nginx服务，重新加载配置文件）
#： nginx -s stop （等价于：/usr/sbin/nginx -s stop）
#： nginx -s reopen （重读日志文件）
#： nginx -t （查看配置文件是否有错误）
#： nginx (启动，（等价于：/usr/sbin/nginx）)

该命令来源：
[root@localhost nginx]# nginx -h

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload 【这个】
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -e filename   : set error log file (default: /var/log/nginx/error.log)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file

[root@localhost nginx]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

启动，如果不加参数 -c，默认读取nginx.conf文件

查看某端口被谁占用：
（1）netstat -tunpl | grep 80
（2）lsof -i :80 （可以查看到对应的进程ID）

通过具体服务名查进程ID：
（1）ps -ef | grep nginx
(2) ps aux | grep nginx

[root@localhost nginx]# lsof -i:80
COMMAND  PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx   4608  root    6u  IPv4  65422      0t0  TCP *:http (LISTEN)
nginx   4608  root    7u  IPv6  65423      0t0  TCP *:http (LISTEN)
nginx   4610 nginx    6u  IPv4  65422      0t0  TCP *:http (LISTEN)
nginx   4610 nginx    7u  IPv6  65423      0t0  TCP *:http (LISTEN)
[root@localhost nginx]# ps -ef | grep nginx
root       4608      1  0 20:07 ?        00:00:00 nginx: master process nginx
nginx      4610   4608  0 20:07 ?        00:00:00 nginx: worker process
root       4750   2940  0 20:14 pts/0    00:00:00 grep --color=auto nginx
[root@localhost nginx]# ps aux | grep nginx
root       4608  0.0  0.0  39308   940 ?        Ss   20:07   0:00 nginx: master process nginx
nginx      4610  0.0  0.1  41784  1776 ?        S    20:07   0:00 nginx: worker process
root       6478  0.0  0.0 112808   968 pts/0    R+   22:26   0:00 grep --color=auto nginx

如上，我们想结束nginx进程，可以通过： kill -9 4608 杀死nginx进程
也可以使用：
kill TERM/INT 4608 (TERM/INT代表quick shutdown)
kill HUP 4608 （等于nginx -s reload）
kill USR1 4608 （重新读取日志文件，运维用的较多，平时开发很少用）

常见文件位置：
（1）/var/log/nginx： 存放了日志文件
[root@localhost nginx]# ls
access.log  error.log
（2）/run/nginx.pid： 存放了nginx当前进程的ID
（3）nginx启动文件：/usr/sbin/nginx
（4）nginx配置文件：/etc/nginx/nginx.conf

kill USR1 4608 使用：
比如我们一个日志文件已经写了很多，即使我们通过mv access.log access.log.bak,然后touch access.log,我们访问网页，日志一样是写入access.log.bak,不会写入新建的access.log，这个时候通过执行：kill -USR1 `cat /run/nginx.pid`，就可以将日志文件进行重读，然后访问日志就会写入access.log

额外：我们想把注释的内容过滤掉再查看，可以用这个指令：egrep -v '#|^$' nginx.conf

伪静态：

访问http://www.baidu.com/index.html 实际上是访问http://www.baidu.com/index.php，就是利用nginx 的rewrite功能实现重写，利于SEO

比如：

```
server {
	listen 80;
	server_name www.haha.com;
	location / {
		root html;
		index index.html;
	}
	rewrite ^/index\.php /abc.html last;
}
```

Gzip:

https://www.yisu.com/zixun/588863.html

Gzip原理：

https://juejin.cn/post/6844903661575880717
