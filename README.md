# zyf_cms
赵裔府 cms

安装步骤：<br/>
1. 安装python2.7，django1.5.1版本<br/>
2. 安装mysql数据库<br/>
3. 安装MySQL-python-1.2.3插件和django-pagination1.0.7分页插件<br/><br/>
4. 安装gunicorn（Python WSGI服务器） 建议安装nginx作为反向代理服务器<br/>
5. 下载项目源码，解压，进入到项目目录下，即zyf_cms文件夹下，进入zyf_cms子文件夹，
修改settings.py里面DATABASES配置，使用新安装的mysql数据库的配置<br/>
6. 退出到父目录，执行python manage.py syncdb创建表，并且输入管理员账号密码和邮箱<br/>
7. 创建完后，执行sql文件夹下zyf_cms_init_data.sql脚本<br/>
8. 执行linux命令，启动服务器，gunicorn zyf_cms.wsgi:application –w 3 –b 0.0.0.0:<port> –log-level=error –log-file=<log dir>
其中，端口号和日志文件路径自己指定<br/>
9. 如果使用nginx，则配置下反向代理，实例如下：<br/>
location /static {<br/>
    root <proj static dir>;<br/>
}<br/>

location / {<br/>
    proxy_pass http://ip:port;<br/>
}<br/>
10. 使用管理员账号登陆系统，创建一条总店记录和总店用户记录 注：只创建一条总店记录，总店用户可以创建多个

