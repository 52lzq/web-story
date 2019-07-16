# manjaro （xfce版本） 安装及配置

## 进度
基本配置正在填写中...

## 安装系统
1.在ｍanjaro官网上选择适合自己的版本进行下载

2.使用Refus制作U盘启动盘，进入Refus界面后选择对应的iso文件，所有选项默认，点击开始后的对话框选择**以dd镜像模式写入**

3.插入启动盘，以启动盘模式启动系统，选择tz(时域)为Asia/Shanghai，lang(语言)可选zh_CN(中文)，driver(驱动)可选nonfree(闭源)驱动  *PS:闭源驱动更加稳定*

4.进入启动盘图形桌面，按照介绍进行安装之后重启

## 基本配置
- 选择国内镜像源 *PS:可选择多个镜像源*
~~~ 
  sudo pacman-mirrors -i -c China -m rank
~~~
换源后更新缓存
若此时出现(无法锁定数据库)错误
可删除 /var/lib/pacman/db.lck
 *PS 指令: sudo rm -rf /var/lib/pacman/db.lck*
~~~
sudo pacman -Syy
~~~
- 配置 pacman.conf  添加archlinuxcn源
~~~
sudo vi /etc/pacman.conf
~~~
在文件最底部
添加
~~~
[archlinuxcn]
SigLevel = Optional TrustAll
Server = httPS://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
~~~
再次更新缓存
~~~
sudo pacman -Syy
~~~
- 添加kerying 防止安装及更新系统失败
~~~
sudo pacman -S archlinux-keyring
~~~
- 更新整个系统
*PS:此操作可能需要较长时间*
~~~
sudo pacman -Syu
~~~
- 安装yay AUR助手
~~~
sudo pacman -S yay
~~~
- 安装搜狗输入法
~~~
sudo pacman -S fcitx-im
sudo pacman -S fcitx-configtool
sudo pacman -S  fcitx-sogoupinyin
~~~
在每个环境下都使用输入法
~~~
vi ~/.xprofile
~~~
添加如下内容
~~~
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
~~~
进行重启 reboot
此时则可以使用输入法了

如果搜狗输入法频繁出现请删除xx，则可以安装fcitx-qt4来修复搜狗输入法
~~~
yay -S fcitx-qt4
~~~
安装完搜狗输入法后可以配置翻墙资源，我采用的是ssr节点形式

- 安装chrome
~~~
sudo pacman -S google-chrome 
~~~

指定chrome在代理端口下运行以便运行chrome的代理插件`Proxy SwitchyOmega`
~~~
google-chrome-stable --proxy-server="socks5://127.0.0.1:1080"
~~~

PS:这里贴上`Proxy SwitchyOmega`插件的规则配置资源网址
~~~
https://github.com/FelisCatus/SwitchyOmega/wiki/GFWList
~~~

此时可以按照自己喜欢设置系统，有一个痛点就是在高分辨率屏幕下字体十分小，可以在设置字体处将字体dpi设置的较高一点。

- 安装

- 安装zsh 
~~~
sudo pacman -S zsh
~~~
此时可以用`cat /etc/shells`查看所有shell

更改默认shell为zsh`chsh -s /usr/bin/zsh`

可以用`echo $SHELL`查看当前默认的shell

- 安装oh-my-zsh
~~~
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
~~~
我安装不是zsh默认含有的主题，地址在git上，故`git clone https://github.com/caiogondim/bullet-train.zsh`,将下载的主题放置于~/.oh-my-zsh/themes/bullet-train.zsh-theme

- 安装插件
高亮插件
~~~
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
~~~
命令建议和补全
~~~
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
~~~
此时可以更改 `~/.zshrc`找到并更改`ZSH_THEME="bullet-train"`更改`plugins=(git zsh-syntax-highlighting zsh-autosuggestions)`

在命令行输入`source ~/.zshrc`以生效

注意：安装上述主题时可能会显示不正确，此时需要安装powerline字体

powerline字体地址
~~~
https://github.com/powerline/fonts
~~~
可按照上述地址内的ReadMe进行安装字体

- 查看所有安装的字体
~~~
fc-list|cut -d: -f2
~~~
当安装完字体后如果不显示可更新字体缓存
- 更新字体缓存
~~~
fc-cache -fv
~~~
我在终端字体选择的是`Droid Sans Mono for Powerline`

在vscode自带终端下字体选择的是`Menlo for Powerline`

- 安装powerline-vim
~~~
sudo pacman -S powerline-vim
~~~
然后更改vim配置脚本`vim ~/.vimrc`

~~~js
let g:powerline_pycmd="py3"
set laststatus=2
set t_Co=256
syntax on
~~~

- 安装vscode
~~~
sudo pacman -S visual-studio-code-bin
~~~
此时下载完vscode可以同步vscode设置
在插件列表中下载Settings Sync

按下 Shift + Alt + D  
输入token 在打开的页面中可重复生成token 
然后查询到自己保存的github gist 进行同步更新

如果你是第一次使用此插件还没有在github上保存过vscode的设置，可按照下述步骤将当前设置同步保存上去

1. 下载完插件，按下Shift + Alt + U，*PS:如果未生效，请重启vscode或者打开一个文件*在跳出的页面点击 generate new tooken，然后在新的页面里写上token描述，勾选上gist，此时就会生成一个token,输入到vscode输入框中

2. 上传完成后会生成一个gist ID,使用 Shift + Alt + D，输入ID，进行同步，如果ID忘了或者没找到？可以在google一下github gists 然后登陆账号就可以查看到自己所有生成的gists，在对应的那个点击进去的url后缀就是对应的ID

3. 其实在我理解token是相当于判断当前用户属于谁，后面的gists ID是指当前用户底下的哪条gists信息

- 清除系统中无用的包
~~~
sudo pacman -R $(pacman -Qdtq)
~~~

- 清除已下载的安装包
~~~
sudo pacman -Scc
~~~

若出现无法挂载Ｕ盘情况
可以输入以下命令查看所有的disk信息
~~~
sudo fdisk -l 
~~~

查看到插入的U盘所属的disk名称例如dev/sdb4

此时就可以挂载U盘到自己的文件系统里进行查看,例如我想将其挂载在 /mnt/usb下，使用以下命令： 
~~~
sudo mount /dev/sdb4 /mnt/usb
~~~
*PS：若没有此目录，可以sudo mkdir 生成一个文件夹*

解除挂载U盘
~~~
sudo umount /mnt/usb
~~~

若无法启动蓝牙服务，可卸载默认社区的community/blueman
~~~
sudo pacman -Rs blueman
~~~
安装aur上的blueman-git
~~~
yay -S blueman-git
~~~
