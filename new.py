#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
from datetime import datetime
import shutil
import os


def new(title='new'):
    os.chdir('./posts/articles/')

    filename = f'{title}.md'

    now = str(datetime.fromtimestamp(time.time())).split('.')[0]
    print(now)

    with open(filename, 'w') as new:
        new.write(f'''---
title: {title}
date: {now}
tags:
 - new
---

<!-- more -->

''')
    os.system(f'open {filename}')

if __name__ == "__main__":
    new()
