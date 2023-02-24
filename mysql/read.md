本地mysql：
root wang123456




## 1、**强制踢掉登录用户**

 **标注：** 创建一个test测试用户，test用户使用Xshel工具ssh远程登录linux操作系统。

**强制踢掉登录用户方法一：**

[root@cloucentos6 ~]# w                                   #查看系统登录的用户
23:52:53 up 14:04, 4 users, load average: 0.00, 0.00, 0.00
USER TTY FROM LOGIN@ IDLE JCPU PCPU WHAT
root tty1 :0 14:04 14:04m 2.39s 2.39s /usr/bin/Xorg :0 -nr -verbose -auth /var/
root pts/0 :0.0 14:05 5:43m 0.02s 0.02s /bin/bash -l
root pts/1 10.8.9.11 18:09 0.00s 0.51s 0.08s w
test pts/2 10.8.9.11 23:52 7.00s 0.02s 0.02s -bash

[root@cloucentos6 ~]# pkill -kill -t pts/2              #强制踢掉登录的test用户，pts/2是TTY对应的登录窗口

[root@cloucentos6 ~]# w                                  #查看系统登录的用户
23:54:24 up 14:06, 3 users, load average: 0.00, 0.00, 0.00
USER TTY FROM LOGIN@ IDLE JCPU PCPU WHAT
root tty1 :0 14:04 14:06m 2.40s 2.40s /usr/bin/Xorg :0 -nr -verbose -auth /var/
root pts/0 :0.0 14:05 5:44m 0.02s 0.02s /bin/bash -l
root pts/1 10.8.9.11 18:09 0.00s 0.44s 0.00s w

**强制踢掉登录用户方法二：**

[root@cloucentos6 ~]# ps aux | grep sshd                                 #查看sshd进程PID
root 9749 0.0 0.1 97536 3764 ? Ss 18:09 0:05 sshd: root@pts/1
root 9763 0.0 0.0 63852 1352 ? Ss 18:09 0:00 /usr/sbin/sshd
root 10477 0.4 0.1 97540 3660 ? Ss 23:52 0:00 sshd: test [priv]
test 10482 0.0 0.0 97540 1928 ? S 23:52 0:00 sshd: test@pts/2
root 10519 0.0 0.0 103260 852 pts/1 R+ 23:53 0:00 grep sshd

[root@cloucentos6 ~]# kill -9 10482                                          #杀掉test登录的sshd进程PID

[root@cloucentos6 ~]# w                                                          #查看系统登录的用户
23:54:24 up 14:06, 3 users, load average: 0.00, 0.00, 0.00
USER TTY FROM LOGIN@ IDLE JCPU PCPU WHAT
root tty1 :0 14:04 14:06m 2.40s 2.40s /usr/bin/Xorg :0 -nr -verbose -auth /var/
root pts/0 :0.0 14:05 5:44m 0.02s 0.02s /bin/bash -l
root pts/1 10.8.9.11 18:09 0.00s 0.44s 0.00s w

**禁止用户再次登录系统：**

[root@cloucentos6 ~]# vim /etc/passwd

test❌502:502::/home/test:/sbin/nologin        # 把/bin/bash修改成/sbin/nologin

:wq                                                               #退出并保存
