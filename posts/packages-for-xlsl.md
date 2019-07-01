---
title: packages-for-xlsl
date: 2019-02-02 23:54:28
tags:
 - node
 - python
 - xlsx
---

node与python的excel库使用分享



因为工作原因需要读写excel文件，试着用了下python和node的对应库都不错，记录一下基础使用。

## Node

xlsx: [https://github.com/SheetJS/js-xlsx](https://github.com/SheetJS/js-xlsx)

### Install 

`yarn add xlsx` 

### Example

```js
import * as XLSX from 'xlsx';

// read xlsx file to workbook 
const workbook = XLSX.readFile(`${__dirname}/some.xlsx`);
// get first sheet
const sheetName = workbook.SheetNames[0];
// convert sheet to json
const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//  ...
//  do things with the sheet
//  ... 
```

## python

### Install 

`pip install openpyxl`

### Example

```py
# read xlsx file to workbook 
workbook = load_workbook('some.xlsx')
sheet_name = 'some_sheetname'
# get first sheet by name
sheet = workbook[sheet_name]
# iterate over rows
for row in sheet.rows:
    for cell in row:
        print(cell.value)
```
