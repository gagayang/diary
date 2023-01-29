windows（闭源）
mac （闭源）
uninx
linux（开源），加入了GNU计划（开源计划）所以也叫做GNU/Linux

linus's uninx 简称 linux

linux有三大分支： RedHat(centos是其应用最广的子分支), ubantu，debian

虚拟机：Vmare WorkStation，Virtual Box等

1、官网下载地址： https://www.centos.org/download/

    具体镜像地址： http://isoredirect.centos.org/centos/7/isos/x86_64/

2、选择阿里云站点进行下载 http://mirrors.aliyun.com/centos/7/isos/x86_64/

各个版本的ISO镜像文件说明：
CentOS-7-x86_64-DVD-1708.iso 标准安装版（推荐）
CentOS-7-x86_64-Everything-1708.iso 完整版，集成所有软件（以用来补充系统的软件或者填充本地镜像）
CentOS-7-x86_64-LiveGNOME-1708.iso GNOME桌面版
CentOS-7-x86_64-LiveKDE-1708.iso KDE桌面版
CentOS-7-x86_64-Minimal-1708.iso 精简版，自带的软件最少
CentOS-7-x86_64-NetInstall-1708.iso 网络安装版（从网络安装或者救援系统）
————————————————
版权声明：本文为CSDN博主「qazxsw635241」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qazxsw635241/article/details/127390210
（百度云有备份）

/： 根目录，一般根目录下只存放目录，不要存放文件，/etc、/bin、/dev、/lib、/sbin应该和根目录放置在一个分区中
/bin:/usr/bin: 可执行二进制文件的目录，如常用的命令ls、tar、mv、cat等。
/boot： 放置linux系统启动时用到的一些文件。/boot/vmlinuz为linux的内核文件，以及/boot/gurb。建议单独分区，分区大小100M即可
/dev： 存放linux系统下的设备文件，访问该目录下某个文件，相当于访问某个设备，常用的是挂载光驱mount /dev/cdrom /mnt。
/etc： 系统配置文件存放的目录，不建议在此目录下存放可执行文件，重要的配置文件有/etc/inittab、/etc/fstab、/etc/init.d、/etc/X11、/etc/sysconfig、/etc/xinetd.d修改配置文件之前记得备份。注：/etc/X11存放与x windows有关的设置。
/home： 系统默认的用户家目录，新增用户账号时，用户的家目录都存放在此目录下，~表示当前用户的家目录，~test表示用户test的家目录。建议单独分区，并设置较大的磁盘空间，方便用户存放数据
/lib:/usr/lib:/usr/local/lib： 系统使用的函数库的目录，程序在执行过程中，需要调用一些额外的参数时需要函数库的协助，比较重要的目录为/lib/modules。
/lost+fount： 系统异常产生错误时，会将一些遗失的片段放置于此目录下，通常这个目录会自动出现在装置目录下。如加载硬盘于/disk 中，此目录下就会自动产生目录/disk/lost+found
/mnt:/media： 光盘默认挂载点，通常光盘挂载于/mnt/cdrom下，也不一定，可以选择任意位置进行挂载。
/opt： 给主机额外安装软件所摆放的目录。如：FC4使用的Fedora 社群开发软件，如果想要自行安装新的KDE 桌面软件，可以将该软件安装在该目录下。以前的 Linux 系统中，习惯放置在 /usr/local 目录下
/proc： 此目录的数据都在内存中，如系统核心，外部设备，网络状态，由于数据都存放于内存中，所以不占用磁盘空间，比较重要的目录有/proc/cpuinfo、/proc/interrupts、/proc/dma、/proc/ioports、/proc/net/*等
/root： 系统管理员root的家目录，系统第一个启动的分区为/，所以最好将/root和/放置在一个分区下。
/sbin:/usr/sbin:/usr/local/sbin： 放置系统管理员使用的可执行命令，如fdisk、shutdown、mount等。与/bin不同的是，这几个目录是给系统管理员root使用的命令，一般用户只能"查看"而不能设置和使用。
/tmp： 一般用户或正在执行的程序临时存放文件的目录,任何人都可以访问,重要数据不可放置在此目录下
/srv： 服务启动之后需要访问的数据目录，如www服务需要访问的网页数据存放在/srv/www内
/usr： 应用程序存放目录，/usr/bin 存放应用程序， /usr/share 存放共享数据，/usr/lib 存放不能直接运行的，却是许多程序运行所必需的一些函数库文件。/usr/local:存放软件升级包。/usr/share/doc: 系统说明文件存放目录。/usr/share/man: 程序说明文件存放目录，使用 man ls时会查询/usr/share/man/man1/ls.1.gz的内容建议单独分区，设置较大的磁盘空间
/var： 放置系统执行过程中经常变化的文件，如随时更改的日志文件 /var/log，/var/log/message： 所有的登录文件存放目录，/var/spool/mail： 邮件存放的目录， /var/run: 程序或服务启动后，其PID存放在该目录下。建议单独分区，设置较大的磁盘空间

/dev： 目录
　　dev是设备(device)的英文缩写。/dev这个目录对所有的用户都十分重要。因为在这个目录中包含了所有Linux系统中使用的外部设备。但是这里并不是放的外部设备的驱动程序，这一点和

windows,dos操作系统不一样。它实际上是一个访问这些外部设备的端口。我们可以非常方便地去访问这些外部设备，和访问一个文件，一个目录没有任何区别。

　　Linux沿袭Unix的风格，将所有设备认成是一个文件。

　　设备文件分为两种：块设备文件(b)和字符设备文件(c)

　　设备文件一般存放在/dev目录下，对常见设备文件作如下说明：

　　/dev/hd[a-t]：IDE设备

　　/dev/sd[a-z]：SCSI设备

　　/dev/fd[0-7]：标准软驱

　　/dev/md[0-31]：软raid设备

　　/dev/loop[0-7]：本地回环设备

　　/dev/ram[0-15]：内存

　　/dev/null：无限数据接收设备,相当于黑洞

　　/dev/zero：无限零资源

　　/dev/tty[0-63]：虚拟终端

　　/dev/ttyS[0-3]：串口

　　/dev/lp[0-3]：并口

　　/dev/console：控制台

　　/dev/fb[0-31]：framebuffer

　　/dev/cdrom => /dev/hdc

　　/dev/modem => /dev/ttyS[0-9]

　　/dev/pilot => /dev/ttyS[0-9]

　　/dev/random：随机数设备

　　/dev/urandom：随机数设备

　　(PS：随机数设备，后面我会再写篇博客总结一下)

　　/dev目录下的节点是怎么创建的?

　　devf或者udev会自动帮你创建得。

　　kobject是sysfs文件系统的基础，udev通过监测、检测sysfs来获取新创建的设备的。

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

/etc： 目录
　　包含很多文件.许多网络配置文件也在/etc 中.
/etc/rc   or /etc/rc.d   or /etc/rc*.d  　　启动、或改变运行级时运行的scripts或scripts的目录.
/etc/passwd
　　用户数据库，其中的域给出了用户名、真实姓名、家目录、加密的口令和用户的其他信息.
/etc/fstab
　　启动时mount -a命令(在/etc/rc 或等效的启动文件中)自动mount的文件系统列表. Linux下，也包括用swapon -a启用的swap区的信息.
/etc/group
　　类似/etc/passwd ，但说明的不是用户而是组.
/etc/inittab
　　init 的配置文件.
/etc/issue
　　getty 在登录提示符前的输出信息.通常包括系统的一段短说明或欢迎信息.内容由系统管理员确定.
/etc/motd
　　Message Of The Day，成功登录后自动输出.内容由系统管理员确定.经常用于通告信息，如计划关机时间的警告.
/etc/mtab
　　当前安装的文件系统列表.由scripts初始化，并由mount 命令自动更新.需要一个当前安装的文件系统的列表时使用，例如df 命令.
/etc/shadow
　　在安装了影子口令软件的系统上的影子口令文件.影子口令文件将/etc/passwd 文件中的加密口令移动到/etc/shadow 中，而后者只对root可读.这使破译口令更困难.
/etc/login.defs
　　login 命令的配置文件.
/etc/printcap
　　类似/etc/termcap ，但针对打印机.语法不同.
/etc/profile , /etc/csh.login , /etc/csh.cshrc
　　登录或启动时Bourne或C shells执行的文件.这允许系统管理员为所有用户建立全局缺省环境.
/etc/securetty
　　确认安全终端，即哪个终端允许root登录.一般只列出虚拟控制台，这样就不可能(至少很困难)通过modem或网络闯入系统并得到超级用户特权.
/etc/shells
　　列出可信任的shell.chsh 命令允许用户在本文件指定范围内改变登录shell.提供一台机器FTP服务的服务进程ftpd 检查用户shell是否列在 /etc/shells 文件中，如果不是将不允许该用户登录.
/etc/sysconfig
　　网络配置相关目录

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

/proc： 目录

档名    文件内容
/proc/cmdline     加载 kernel 时所下达的相关参数！查阅此文件，可了解系统是如何启动的！
/proc/cpuinfo     本机的 CPU 的相关资讯，包含时脉、类型与运算功能等
/proc/devices     这个文件记录了系统各个主要装置的主要装置代号，与 mknod 有关呢！
/proc/filesystems     目前系统已经加载的文件系统罗！
/proc/interrupts     目前系统上面的 IRQ 分配状态。
/proc/ioports     目前系统上面各个装置所配置的 I/O 位址。
/proc/kcore     这个就是内存的大小啦！好大对吧！但是不要读他啦！
/proc/loadavg     还记得 top 以及 uptime 吧？没错！上头的三个平均数值就是记录在此！
/proc/meminfo     使用 free 列出的内存资讯，嘿嘿！在这里也能够查阅到！
/proc/modules     目前我们的 Linux 已经加载的模块列表，也可以想成是驱动程序啦！
/proc/mounts     系统已经挂载的数据，就是用 mount 这个命令呼叫出来的数据啦！
/proc/swaps     到底系统挂加载的内存在哪里？呵呵！使用掉的 partition 就记录在此啦！
/proc/partitions     使用 fdisk -l 会出现目前所有的 partition 吧？在这个文件当中也有纪录喔！
/proc/pci     在 PCI 汇流排上面，每个装置的详细情况！可用 lspci 来查阅！
/proc/uptime     就是用 uptime 的时候，会出现的资讯啦！
/proc/version     核心的版本，就是用 uname -a 显示的内容啦！
/proc/bus/*     一些汇流排的装置，还有 U盘 的装置也记录在此喔！

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

/usr： 目录
　　/usr 文件系统经常很大，因为所有程序安装在这里. /usr 里的所有文件一般来自Linux distribution；本地安装的程序和其他东西在/usr/local 下.这样可能在升级新版系统或新distribution时无须重新安装全部程序.
/usr/etc            存放设置文件
/usr/games      存放游戏和教学文件
/usr/include      存放C开发工具的头文件
/usr/share         存放结构独立的数据
/usr/bin
　　几乎所有用户命令.有些命令在/bin 或/usr/local/bin 中.
/usr/sbin
　　根文件系统不必要的系统管理命令，例如多数服务程序.
/usr/share/man , /usr/share/info , /usr/share/doc
　　手册页、GNU信息文档和各种其他文档文件.
/usr/include
　　C编程语言的头文件.为了一致性这实际上应该在/usr/lib 下，但传统上支持这个名字.
/usr/lib
　　程序或子系统的不变的数据文件，包括一些site-wide配置文件.名字lib来源于库(library); 编程的原始库存在/usr/lib 里.
/usr/local
　　本地安装的软件和其他文件放在这里.
/usr/src             存放程序的源代码

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

/var： 目录
　　/var 包括系统一般运行时要改变的数据.每个系统是特定的，即不通过网络与其他计算机共享.
/var/catman
　　当要求格式化时的man页的cache.man页的源文件一般存在/usr/man/man* 中；有些man页可能有预格式化的版本，存在/usr/man/cat* 中.而其他的man页在第一次看时需要格式化，格式化完的版本存在/var/man 中，这样其他人再看相同的页时就无须等待格式化了. (/var/catman 经常被清除，就象清除临时目录一样.)
/var/lib
　　系统正常运行时要改变的文件.
/var/local
　　/usr/local 中安装的程序的可变数据(即系统管理员安装的程序).注意，如果必要，即使本地安装的程序也会使用其他/var 目录，例如/var/lock .
/var/lock
　　锁定文件.许多程序遵循在/var/lock 中产生一个锁定文件的约定，以支持他们正在使用某个特定的设备或文件.其他程序注意到这个锁定文件，将不试图使用这个设备或文件.
/var/log
　　各种程序的Log文件，特别是login  (/var/log/wtmp log所有到系统的登录和注销) 和syslog (/var/log/messages 里存储所有核心和系统程序信息. /var/log 里的文件经常不确定地增长，应该定期清除.
/var/run
　　保存到下次引导前有效的关于系统的信息文件.例如， /var/run/utmp 包含当前登录的用户的信息.
/var/spool
　　mail, news, 打印队列和其他队列工作的目录.每个不同的spool在/var/spool 下有自己的子目录，例如，用户的邮箱在/var/spool/mail 中.
/var/tmp
　　比/tmp 允许的大或需要存在较长时间的临时文件. (虽然系统管理员可能不允许/var/tmp 有很旧的文件.)

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

 比较重要的目录

    在 Linux 系统中，有几个目录是特别需要注意的，以下提供几个需要注意的目录，以及预设相关的用途：　
        /etc： 这个目录相当重要，如前所述，你的开机与系统数据文件均在这个目录之下，因此当这个目录被破坏，那你的系统大概也就差不多该死掉了！而在往后的文件中，你会发现我们常常使用这个目录下的 /etc/rc.d/init.d 这个子目录，因为这个 init.d 子目录是开启一些 Linux 系统服务的 scripts （可以想成是批次檔 ）的地方。而在 /etc/rc.d/rc.local 这个文件是开机的执行档。　
        /bin, /sbin, /usr/bin, /usr/sbin： 这是系统预设的执行文件的放置目录，例如 root 常常使用的 userconf, netconf, perl, gcc, c++ 等等的数据都放在这几个目录中，所以如果你在提示字符下找不到某个执行档时，可以在这四个目录中查一查！其中， /bin, /usr/bin 是给系统使用者使用的指令，而 /sbin, /usr/sbin 则是给系统管理员使用的指令！  　
        /usr/local： 这是系统预设的让你安装你后来升级的套件的目录。例如，当你发现有更新的 Web 套件（如 Apache ）可以安装，而你又不想以 rpm 的方式升级你的套件，则你可以将 apache 这个套件安装在 /usr/local 底下。安装在这里有个好处，因为目前大家的系统都是差不多的，所以如果你的系统要让别人接管的话，也比较容易上手呀！也比较容易找的到数据喔！因此，如果你有需要的话，通常我都会将 /usr/local/bin 这个路径加到我的 path 中。　
        /home： 这个是系统将有账号的人口的家目录设置的地方。    　
        /var： 这个路径就重要了！不论是登入、各类服务的问题发生时的记录、以及常态性的服务记录等等的记录目录，所以当你的系统有问题时，就需要来这个目录记录的文件数据中察看问题的所在啰！而 mail 的预设放置也是在这里，所以他是很重要的    　
        /usr/share/man, /usr/local/man： 这两个目录为放置各类套件说明档的地方，例如你如果执行 man man，则系统会自动去找这两个目录下的所有说明文件

文件种类：

谈完了文件格式之后，再来谈谈所谓的文件种类吧！我们在刚刚的属性介绍中提到了最前面的标志 ( d 或 - ) 可以代表目录或文件，那就是不同的文件种类啦！Linux 的文件种类主要有底下

这几种：
    正规文件( regular file )：就是一般类型的文件，在由 ls –al 所显示出来的属性方面，第一个属性为 [ - ]。另外，依照文件的内容，又大略可以分为两种文件种类：
        纯文字文件(ascii) ：这是 Unix 系统中最多的一种啰，几乎只要我们可以用来做为设定的文件都属于这一种；
        二进制文件(binary) ：通常执行档除了 scripts （文字型批次文件）之外，就是这一种文件格式；
    目录 (directory)：就是目录！第一个属性为 [ d ]；
    连结档 (link)：就是类似 Windows 底下的快捷方式啦！第一个属性为 [ l ]；
    设备档 (device)：与系统周边相关的一些文件，通常都集中在 /dev 这个目录之下！通常又分为两种：
    区块 (block) 设备档 ：就是一些储存数据，以提供系统存取的接口设备，简单的说就是硬盘啦！例如你的一号硬盘的代码是 /dev/hda1 等等的文件啦！第一个属性为 [ b ]；
    字符 (character) 设备档 ：亦即是一些串行端口的接口设备，例如键盘、鼠标等等！第一个属性为 [ c ]。

Linux 的文件系统( inode )：
　

在 Linux 系统当中，每个文件不止有文件的内容数据，还包括文件的种种属性，例如：所属群组、所属使用者、能否执行、文件建立时间、文件特殊属性等等。我们将每个文件的内容分为两个部分来储存，一个是文件的属性，另一个则是文件的内容。
　
为了应付这两个不同的咚咚，所以 ext2 规划出 inode 与 Block 来分别储存文件的属性( 放在 inode 当中 )与文件的内容( 放置在 Block area 当中 )。当我们要将一个 partition 格式化( format )为 ext2 时，就必须要指定 inode 与 Block 的大小才行，也就是说，当 partition 被格式化为 ext2 的文件系统时，他一定会有 inode table 与 block area 这两个区域。

Block 已经在前面说过了，他是数据储存的最小单位。那么 inode 是什么？！简单的说， Block 是记录『文件内容数据』的区域，至于 inode 则是记录『该文件的相关属性，以及文件内容放置在哪一个 Block 之内』的信息。简单的说， inode 除了记录文件的属性外，同时还必须要具有指向( pointer )的功能，亦即指向文件内容放置的区块之中，好让操作系统可以正确的去取得文件的内容啊

    该文件的拥有者与群组(owner/group)；
    该文件的存取模式；
    该文件的类型；
    该文件的建立日期(ctime)、最近一次的读取时间(atime)、最近修改的时间 (mtime)；
    该文件的容量；
    定义文件特性的旗标(flag)，如 SetUID...；
    该文件真正内容的指向 (pointer)；

[bytedance@localhost ~]$
bytedance： 当前登录用户名
@：在
localhost：当前主机名
~：当前工作目录
$: 普通用户
#: 超级管理员
普通用户切换超管：su+密码，exit退出

指令手册：例如ls：
#: man ls

#： ls [路径]： 列出当前或者对应路径下的目录
[bytedance@localhost ~]$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
[bytedance@localhost ~]$ ls Desktop/
hhaha

ls -al：l：列表展示，a：包括隐藏文件

#：clear 清除当前终端输出信息（只是隐藏到了上面）

#：whoami 查看当前用户名
bytedance@localhost ~]$ whoami
bytedance

#: su
su 和su root都是往超管切
su wang，往wang账户上切
低权限往高权限切换，需要输入密码，高权限往低权限切，不需要密码

#： cd [路径] 切换目录

#： touch [路径] 创建文件 eg: touch ./www/index.php
#： mkdir [-p] [路径] 递归创建目录

drwxr-xr-x.  20 root root 3360 Jan  2 18:14 dev
d：文件夹
-：普通文件
c：字符设备文件
b：块状设备文件
l：连接文件（快捷方式）
s：套接字文件

#： cp [-r] 需要复制的文档路径 需要保存的位置
-r：递归，如果是文件夹就加上-r

比如复制index.php文件：cp /index.php  /home/ 就行（后面的目标地址不用写名字，代表复制并不改动文件名，如果改名字，就加上文件名：cp /index.php  /home/s.php）

#： mv 需要操作的文档 新的文档位置 移动/剪切/重命名 （和cp类似，但是没有-r）

mv /a/b /a/c 重命名
mv /a/b /c/b 移动
mv /a/b /c/d 移动+重命名

#： rm [-rf] 需要删除的文档
-r：递归
-f：强制（避免反复询问是否删除）

超管用户： #： mr -rf / --no--preserve-root 就会让系统崩溃

#： tail -n 文件路径  -》 查看文件的末尾n行内容，默认10行
#： head -n 文件路径  -》 查看文件的头部n行内容，默认10行
#： cat 看看文件内容，可以同时查看多个文件 cat 文件1 文件2 文件3……
#： tac 和cat一样是查看，但是文件内容是倒置输出
#： vim 编辑文件

#： reboot 关机重启指令（作为了解）
#： shutdown 关机
shutdown -h now：立即关机
shutdown 5： 5min后关机

#：其他关机指令：
init 0
poweroff
#：其他重启指令：
init 6

快速定位光标到前后：control+a  control+e

#: 将执行结果覆盖进文件 >
#: 将执行结果追加进文件 >>

#： du -sh XX 查看某个目录的磁盘占用情况
[bytedance@localhost /]$ ls
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
[bytedance@localhost /]$ du -sh home
108M	home

#： df -h -》 查看磁盘占用情况 ROM df：disk free
[bytedance@localhost /]$ df -h
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        471M     0  471M   0% /dev
tmpfs           487M     0  487M   0% /dev/shm
tmpfs           487M  8.6M  478M   2% /run
tmpfs           487M     0  487M   0% /sys/fs/cgroup
/dev/sda3        18G  4.5G   14G  25% /
/dev/sda1       297M  152M  145M  52% /boot
tmpfs            98M   44K   98M   1% /run/user/1000

#： free -m 查看内容占用情况 -m：以M的单位展示 RAM
[bytedance@localhost /]$ free
              total        used        free      shared  buff/cache   available
Mem:         995676      653608       74956       20664      267112      175816
Swap:       2097148       93952     2003196

#： find 查找文件，参数较多，用到再查

#： ps： process show，查看进程
ps -ef
e： 等价于a，全部
f： full，显示全部的列
或者： ps aux
例子：
[bytedance@localhost Desktop]$ ps -ef
UID         PID   PPID  C STIME TTY          TIME CMD
root          1      0  0 Jan02 ?        00:00:04 /usr/lib/systemd/systemd --swi
root          2      0  0 Jan02 ?        00:00:00 [kthreadd]
UID 代表执行者身份
PID 进程的ID号！
PPID 父进程的ID；
C CPU使用的资源百分比
TTY 登入者的终端机位置；这里的？表示非终端cmd发起
TIME 使用掉的 CPU 时间。
CMD 所下达的指令名称
STIME： start time

#: kill PID 杀死进程

#： top 查看资源占用情况（一般不用这个指令查看）
[bytedance@localhost Desktop]$ top

top - 06:43:11 up 12:29,  2 users,  load average: 0.10, 0.05, 0.06
Tasks: 207 total,   1 running, 206 sleeping,   0 stopped,   0 zombie（僵尸进程）
%Cpu(s):  3.4 us,  1.4 sy,  0.0 ni, 95.3 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :   995676 total,    76572 free,   704644 used,   214460 buff/cache
KiB Swap:  2097148 total,  2001916 free,    95232 used.    99256 avail Mem

   PID USER      PR  NI    VIRT    RES    SHR S %CPU（CPU占用） %MEM     TIME+ COMMAND
 56526 root      20   0  336948  53536  27484 S  1.7            5.4   0:16.33 X
 56986 bytedan+  20   0 3008784 169508  51008 S  1.7            17.0   0:52.15 gnome-shell
 58015 bytedan+  20   0  671356  26804  15984 S  0.7            2.7   0:04.73 gnome-term+
   612 root      20   0   90568     80     72 S  0.3            0.0   0:02.88 rngd
   639 root      20   0  295376   1580   1192 S  0.3            0.2   1:30.67 vmtoolsd

#： service
service 服务名 start/stop/restart
例如使用service启动apache：service httpd start
如果是centos7：可以用 systemctl start/stop/restart 服务名

#: grep 过滤
grep 关键词 路径/内容
例子1:grep搭配ls查看包含de关键字的内容：
[bytedance@localhost /]$ ls
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
[bytedance@localhost /]$ ls | grep de
dev
例子2:只查看apache的进程：
[bytedance@localhost Desktop]$ ps -ef | grep 'https'
bytedan+  63261  58022  0 04:40 pts/0    00:00:00 grep --color=auto https

#：wc：统计文件指标：lwc参数分别代表：l：行，w：单词数，c：字符数量
[bytedance@localhost Desktop]$ wc -lwc a.php
 6  4 21 a.php
[bytedance@localhost Desktop]$ cat a.php
sd
asdf

asdfa

asdf

#： mount 挂载
https://blog.csdn.net/qq_39521554/article/details/79501714

用户和用户组

/etc/passwd 存储用户关键信息
/etc/group 存储用户组的关键信息
/etc/shadow 存储用户的密码信息

#：useradd 用于添加一个linux账户
详解：https://blog.csdn.net/bigwood99/article/details/126621034
eg： useradd zhangsan

[bytedance@localhost Desktop]$ whoami
bytedance
[bytedance@localhost Desktop]$ useradd wang_test_001
useradd: Permission denied.
useradd: cannot lock /etc/passwd; try again later.
[bytedance@localhost Desktop]$ su
Password:
[root@localhost Desktop]# useradd wang_test_001
[root@localhost Desktop]# tail -1 /etc/passwd
wang_test_001❌1001:1001::/home/wang_test_001:/bin/bash （成功）
[wang_test_001@localhost Desktop]$ ls /home/ 家目录也有了wang_test_001
bytedance  wang_test_001
[wang_test_001@localhost Desktop]$ id wang_test_001 （创建用户如果没有指定组，就会创建一个和用户名同名的组）
uid=1001(wang_test_001) gid=1001(wang_test_001) groups=1001(wang_test_001)

认识一下passwd文件：
[wang_test_001@localhost Desktop]$ cat /etc/passwd
root❌0:0:root:/root:/bin/bash
usbmuxd❌113:113:usbmuxd user:/:/sbin/nologin
……
wang_test_001❌1001:1001::/home/wang_test_001:/bin/bash
解释root❌0:0:root:/root:/bin/bash：
root：用户名
x：密码
0:用户ID
0:用户组ID
root：注释
root：家目录
/bin/bash：解释器shell
————————————————————
用户名：创建新用户的名称，登录使用
密码：这里的“X”，表示密码的占位
用户ID：用户的识别符；[-u]
用户组ID：该用户所属的主组ID；[-g]
注释：解释用户是做什么用的；[-c]
家目录：用户登录进系统后默认的位置；[-d]
解释器shell：等待用户进入系统之后，用户输入指令之后，该解释器会收集用户输入的指令，传递给内核处理；如果解释器是/bin/bash，表示用户可以登录到系统，如果是/sbin/nologin表示该用户不能登录到系统;[-s]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

给新账户添加密码：
#： passwd wangwu （只有root用户才能指定用户名，如果是自己，输入passwd就是更改自己的密码）
输入密码
再次输入密码

eg:创建用户wangwu，让wangwu属于501主组，附加组500，自选靓号666，并且要求不能登录到系统，可以写注释为“user wangwu”：
#: useradd -g 501 -G 555 -u 666 -s /sbin/nologin -c "user wangwu" wangwu (如果是多个附加组，就写成-G 555,666,777……)

[root@localhost bytedance]# useradd -g 0 -G 500 -u 666 -s /sbin/nologin -c "user wangwu" wangwu
useradd: group '500' does not exist （如果组和附加组不存在，会创建失败）
[root@localhost bytedance]# useradd -g 0 -G 0 -u 666 -s /sbin/nologin -c "user wangwu" wangwu
[root@localhost bytedance]# id wangwu
uid=666(wangwu) gid=0(root) groups=0(root)
[root@localhost bytedance]# ^C
[root@localhost bytedance]# tail -1 /etc/passwd
wangwu❌666:0:user wangwu:/home/wangwu:/sbin/nologin
----------------------------------------------------

添加完后，查看用户主组信息可以cat /etc/passwd，查看附件组信息，可以cat /etc/group

#：usermod 用于修改一个linux账户，参数和useradd一样
eg：[root@localhost bytedance]# usermod -g 1001 -G 1001 -u 666 -s /sbin/nologin -c "user wangwu" wangwu
修改名字：usermod -l 新名字 老名字
eg：
[root@localhost bytedance]# usermod -l wangliu wangwu
[root@localhost bytedance]# id wangliu
uid=666(wangliu) gid=1001(wang_test_001) groups=1001(wang_test_001)

#： userdel [-r] 删除用户
-r: 删除用户的同时，同时删除其家目录 （如果该用户在当前cmd登录过，会提示不能删除，可以kill 对应PID或者退出当前用户的登录）

用户组管理
每一个用户都有一个用户组
对用户组的管理（增删改查），其实就是操作/etc/group文件

[bytedance@localhost ~]$ cat /etc/group
root❌0:
bin❌1:
daemon❌2:
sys❌3:
adm❌4:bin,wangtest

adm: 用户组名
x：密码占位符
4：用户组ID
bin,wangtest：组内用户名（看附加组用的）

#：添加用户组： groupadd [-g] 用户组名
-g：自定义用户组ID，如果不指定，默认从1000开始
eg：
[root@localhost bytedance]# groupadd test1
[root@localhost bytedance]# tail -1 /etc/group
test1❌1002:

#：修改用户组： groupmod [-g] [-n] 用户组名
修改id： groupmod -g 1003 test1
修改用户组名： groupmod -n test1-new test1
eg:
[root@localhost bytedance]# groupmod -g 1003 test1
[root@localhost bytedance]# tail -1 /etc/group
test1❌1003:
[root@localhost bytedance]# groupmod -n test1-new test1
[root@localhost bytedance]# tail -1 /etc/group
test1-new❌1003:

#: 用户组删除 groupdel 用户组名
如果某个用户组是某个用户的主组，则不能直接删除该组，如果是附加组，则可以直接删除该组，作为主组，想要被删除，只能删除对应的用户，或者将对应的用户从该组中迁出。

如何将用户从一个组中移除？
gpasswd -d userName groupName

以上用户，用户组指令，除了passwd以外，其他指令一般情况下只有root可以操作

权限管理
在linux中分别有读/写/执行的权限
读：
  对于文件夹，影响用户是否能够列出目录结构
  对于文件来说，影响用户是否可以查看文件内容
写：
  对于文件夹，影响用户是否可以在文件夹中“创建/删除/复制到/移动到”文档（不能多也不能少）
  对于文件，影响用户是否可以编辑文件内容
执行：
  一般都是对于文件来说，特别是脚本文件
  对于文件来说，执行权限影响文件是否可以运行
  对于文件夹来说，影响用户在文件夹中是否可以执行命令

身份介绍
owner身份（文档所有者）
由于Linux是多用户、多任务的操作系统，因此可能常常有多人同时在某台主机上工作，但每个人均可在主机上设置文件的权限，让其成为个人的“私密文件”，即个人所有者。因为设置了适当的文件权限，。【所有者可以更改文档的权限】
Group身份（与文档所有者同组的用户）
与文件所有者同组最有用的功能就体现在多个团队在同一台主机上开发资源的时候。例如主机上有A、B两个团体（用户组），A中有a1,a2,a3三个成员，B中有b1,b2两个成员，这两个团体要共同完成一份报告F。由于设置了适当的权限，A、B团体中的成员都能互相修改对方的数据，但是团体C的成员则不能修改F的内容，甚至连查看的权限都没有。同时，团体的成员也能设置自己的私密文件，让团队的其它成员也读取不了文件数据。在Linux中，每个账户支持多个用户组。如用户a1、b1即可属于A用户组，也能属于B用户组【主组和附加组】。
Others身份（其他人，相对于所有者与同组用户）
这个是个相对概念。打个比方，大明、二明、小明一家三兄弟住在一间房，房产证上的登记者是大明（owner所有者），那么，大明一家就是一个用户组，这个组有大明、二明、小明三个成员；另外有个人叫张三，和他们三没有关系，那么这个张三就是其他人（others）了。同时，大明、二明、小明有各自的房间，三者虽然能自由进出各自的房间，但是小明不能让大明看到自己的情书、日记等，这就是文件所有者（用户）的意义。
Root用户（超级用户）
在Linux中，还有一个神一样存在的用户，这就是root用户，因为在所有用户中它拥有最大的权限 ，所以管理着普通用户。因此以后在设置文档的权限的时候不必考虑root用户。

权限查看： ls -al

[root@localhost bytedance]# ls -l
total 0
drwxr-xr-x. 3 bytedance bytedance 45 Jan  3 04:37 Desktop
drwxr-xr-x. 2 bytedance bytedance  6 Jan  2 18:18 Documents
-rw-------.  1 bytedance bytedance   16 Jan  2 18:18 .esd_auth
-rw-------.  1 bytedance bytedance 1252 Jan  3 16:34 .ICEauthority

解释：drwxr-xr-x
第一位: d: 文档类型 （d：文件夹，-：文件，l：软链，s：套接字，c：字符设备，b：块状设备）
第2-4位: rwx: 表示owner的权限情况，第2位表示读权限（取值r/-），第3位表示写权限（取值w/-），第4位表示执行权限（取值x/-）
第5-7位: r-x: 取值和2-4一样，表示的是和owner同一个组的用户的读/写/执行权限。
第8-9位: -x: 取值和2-4一样，表示的是其他用户的读/写权限。

注意：rwx的顺序代表读/写/执行，他们的顺序是固定的

权限设置
语法：#chmod  [选项] 权限模式 文档路径
常用选项：
			-R：递归设置权限	（当文档类型为文件夹的时候）
注意点：如果想要给文档设置权限，操作者要么是root用户，要么就是文档的所有者。

u：表示所有者身份owner（user）
g：表示给所有者同组用户设置（group）
o：表示others，给其他用户设置权限
a：表示all，给所有人（包含ugo部分）设置权限

如何设置-权限分配方式：
	+：表示给具体的用户新增权限（相对当前）
	-：表示删除用户的权限（相对当前）
	=：表示将权限设置成具体的值（注重结果）【赋值】

例如：需要给/root/anaconda-ks.cfg文件（-rw-------.）设置权限，要求所有者拥有全部的权限，同组用户拥有读和写权限，其他用户只读权限。
答案：
	#chmod u+x,g+rw,o+r /root/anaconda-ks.cfg
	或者：
	#chmod u=rwx,g=rw,o=r /root/anaconda-ks.cfg

如果有两部分权限一样则可以合在一起写: chmod ug=rwx /root/anaconda-ks.cfg

例如：如果anaconda-ks.cfg文件什么权限都没有，可以使用root用户设置所有的人都有执行权限，则可以写成
什么权限都没有应该是：----------
目标的效果：---x--x--x
#chmod a=x anaconda-ks.cfg
#chmod a+x anaconda-ks.cfg
#chmod u+x,g+x,o+x anaconda-ks.cfg
#chmod ugo=x anaconda-ks.cfg
#chmod ugo+x anaconda-ks.cfg
#chmod +x anaconda-ks.cfg			[当不指定给谁赋予权限的是默认为“a”]

例子 ：给新建的a.txt修改权限
[root@localhost Desktop]# ls -l
-rw-r--r--. 1 root      root       0 Jan  4 16:11 a.txt
[root@localhost Desktop]# chmod u+x,g=rw,o=r ./a.txt
[root@localhost Desktop]# ls -l
-rwxrw-r--. 1 root      root       0 Jan  4 16:11 a.txt

数字权限：
读 R ： 4，
写 W ： 2，
执行 X ：1
没有任何权限（-）：0

数字      权限                  目录列表
0        不能读/写/执行           ---
1        不能读/写，可执行         --x
2        不能读/执行，可写         -w-
3        不能读，可写/执行         -wx
4        可读，不能写/执行         r--
5        可读/执行，不能写         r-x
6        可读/写，不能执行         rw-
7        可读/写/执行             rwx

比如更改上面的a.txt
#: chmod 777 a.txt

eg：
①使用root用户设置文件夹/root/20180811的权限为：所有者全部权限，同组用户拥有读和执行权限，其他用户没有权限，请使用数字权限的形式设置，写出指令；750
②请使用root用户写出设置文件/root/20180811.txt文件的权限，权限要求为：所有者拥有全部权限，同组用户要求可以读写，其他用户只读，要求使用数字形式；764
③张三疯（root）收到某个MM的情书，请使用数字形式设置张三疯的Email情书权限（文件为/root/email.doc），权限要求只有所有者可以读写，除此之外任何人没有权限；600
注意：
1、在赋值权限的时候，千万不要设置类似731这种写法，中间的3代表写+执行权限，有写的权限，但是没有读的权限-》“奇葩权限”，不报错但是不合理
2、文件夹/可执行文件有执行权限，这是刚需
3、如果一个用户对于某个文件夹没有写的权限，对于该目录的下的文件没有“创建/删除/复制到/移动到”（一个不能多一个不能少）的权限（即使对应该目录下的文件有777的权限，如果对于这个文件夹没有写的权限，一样不能增删）

在Linux中，如果要删除一个文件，不是看文件有没有对应的权限，而是看文件所在的目录是否有写权限、执行权限，如果有才可以删除。

属主与属组
属主：所属的用户（文件的主人），文档所有者
属组：所属的用户组（同组用户的组名称）

[root@localhost Desktop]# ls -l
-rw-rw-r--. 1 bytedance bytedance 21 Jan  3 04:37 a.php
属主：第一个bytedance
属组：第二个bytedance
一个文件被创建，默认会设置成创建人的信息，比如一旦这个人离职，那么需要对这里文件的所有权进行更改，就用到了chwon

语法：#chown  [-R]  新的username 文档路径
例子：将先前设置的/oo目录的所有者设置成成linux123
#chown -R linux123 /oo

注意：修改所有者的人必须是root或者所有者自己（也可能出现没有权限的情况），其他人无权修改所有者。修改后的所有者拥有了之前所有者的权限

#： chgrp （很少使用）
作用：更改文档的所属用户组（change group）
语法：#chgrp  [-R]  groupname  文档的路径
例子：将刚才oo目录的所有用户组名改为linux123
#chgrp -R linux123 /oo

如何通过一个命令实现既可以更改所属的用户，也可以修改所属的用户组呢？
#： chown  [-R]  username:groupname   文档路径 (因为chown就能坐chgrp的事情，所以chgrp很少使用)

#：sudo

#： ifconfig

[root@localhost Desktop]# ifconfig
ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.107.132  netmask 255.255.255.0  broadcast 192.168.107.255 【这个】
        inet6 fe80::badd:28f0:2d29:a72  prefixlen 64  scopeid 0x20 `<link>`
        ether 00:0c:29:f5:e1:cf  txqueuelen 1000  (Ethernet)
        RX packets 940  bytes 765577 (747.6 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 678  bytes 87698 (85.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10 `<host>`
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 64  bytes 5568 (5.4 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 64  bytes 5568 (5.4 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

virbr0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 192.168.122.1  netmask 255.255.255.0  broadcast 192.168.122.255
        ether 52:54:00:48:a7:be  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

对于vim操作，补充一个，当我们想查看vim打开的文件第几行时，可以执行：
#： vim a.text
#： set num 就可以看到文本左侧有行数了

linux里面host文件位置： /etc/hosts

#： date 查看日期
#： date -d yesterday 查看昨天日期
#： date -d yesterday +%Y%m%d%H%M 格式化输出昨天日期
[root@localhost nginx]# date -d yesterday +%Y%m%d%H%M
202301051830
[root@localhost nginx]# date
Fri  6 Jan 18:27:12 PST 2023
[root@localhost nginx]# date -d yesterday
Thu  5 Jan 18:27:17 PST 2023

#: date -s '2022-02-12 9:30' 设置时间


查看进程：netstat -lntp
