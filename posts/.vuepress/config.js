module.exports = {
    title: '浅色圆锥曲线爱好者',
    description: '兴趣选手',
    head: [
        ['link', {rel: 'icon',  href: '/favicon.ico'}],
        ['script',{src:'https://source.pixiv.net/source/embed.js'}],
        //['script', {src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML'}],
        //['script', {type:"text/x-mathjax-config"},"MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});"]
    ],
    ga: 'UA-127908059-1',
    serviceWorker: false,//true,
    markdown: {
        lineNumbers: true
      },
      themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            {text: 'Home', link: '/'},
            {text:'Articles',link:'/articles/'},
            {text: 'twitter', link: 'https://twitter.com/nerd_yue'},
            {text: 'ko-fi', link: 'https://ko-fi.com/nerdyue'}
        ],
        sidebar: [
            ['/', 'Home'],
            ['/about', 'About me'],
            //['/articles/','Articles']
            ['/lab', 'Lab'],
            ['/links','Links']
        ]
    },
      evergreen: true
  }