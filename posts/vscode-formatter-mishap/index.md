---
title: vscode自动格式化引起的惨案
date: 2019-02-28 22:09:59
tags:
  - php
  - vscode
---

<del>其实我觉得这不是我的锅是 PHP 的锅。</del>

<del>其实我完全不想写关于 PHP 的文章。</del>

## Reproduce

1. 复制下面这段代码进 vscode。

```php
<?php
$result = array_values(array_intersect($array1, $array2));
$result = $result[0];
?>
```

2. <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>

3. 代码变成了

```php
<?php
$result = array_values(array_intersect($array1, $array2))[0];
?>
```

&nbsp;

&nbsp;

&nbsp;

&nbsp;

好像没什么毛病?

> 根据文档 array dereferencing 只有 PHP 5.4+才能使用。

为什么 PHP？

> 不说了都是泪。

为什么 PHP 5.3？

> 不说了都是泪。

## Sum up

1. 真爱生命远离 PHP
2. 团队合作时 format 工具和 IDE 设置尽可能保持一致。
3. 设置`formatter`/`linter`工具时要注意对应语言版本。
4. 弱类型语言真可怕
