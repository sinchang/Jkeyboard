## 介绍

为买单定制的数字键盘，只支持数字以及小数点的输入。

## 预览

![](https://ooo.0o0.ooo/2017/01/16/587c3729c6523.gif)

扫描下方二维码查看：

![](https://ooo.0o0.ooo/2017/01/16/587c379b2129c.png)

## 使用

```
<script type="text/javascript" src="./dist/Jkeyboard.min.js"></script>
<script type="text/javascript">
    new Jkeyboard({
        el: 'text', // input id
        decimal: 3, // 保留几位小数
        callback: function(value) {
            console.log(value); // 每次输入的回调
        }
    });
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
