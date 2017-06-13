# vue-vuex-vux-demo

> A Vue.js project

## 项目结构 ##

```
.
├── static  --------------------------- 资源配置
├── abc.json  ------------------------- 项目构建配置文件
├── package.json  --------------------- 项目配置
├── README.md  ------------------------ 说明文件
├── build  ---------------------------- 构建代码文件
├── config  --------------------------- 构建配置文件
├── index.html  ----------------------- 入口页面
└── src  ------------------------------ 源码目录
    ├── assets  ----------------------- 项目资源文件目录（图片、字体等）
    ├── components  ------------------- 业务模块集合目录（组件）
    ├── fetch  ------------------------ ajax请求管理文件
    ├──   └── api  -------------------- 请求配置
    ├── pages  ------------------------ 页面集合目录
    ├── store  ------------------------ vuex文件目录
    ├── App.vue  ---------------------- vue公共配置文件
    └── main.js  ---------------------- 项目级入口配置文件
```

## 环境准备

``` bash
# 安装依赖
npm install

# 启动本地调试 localhost:8080
npm run dev

# 本地打包压缩
npm run build

# 本地打包压缩并查看项目
npm run build --report
```
## 反代理配置

本地代码想要访问测试环境接口可以通过以下配置
`/config/index.js` 
``` bash
dev: {
  proxyTable: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: {'^/api': ''}
    }
  }
}
```

## 本地ajax mock 配置

可以直接返回一段json例如
`/mock/users/user.json` 

``` bash
{
  "code|1": [0, 0, 0, 0, 1],
  "data": {
    "list|10": [
      {
        "id|+1": 1,
        "name": "@name",
        "age|20-30": 1,
        "email": "@email",
        "date": "@date"
      }
    ]
  }
}
```

也可以写业务代码自定义返回参数
`/mock/users/user.js` 

``` bash
module.exports = function (req) {
  var uid = req.query.uid;

  if (!uid) {
    return {
      code: -1,
      msg: 'no uid',
    }
  }

  return {
    code: 0,
    data: {
      "uid": +uid,
      "name": "@name",
      "age|20-30": 1,
      "email": "@email",
      "date": "@date",
    },
  };
};
```

引入以上配置在`config/mock.js`文件中添加配置
``` bash
module.exports = {
    'GET::/api/1.json': 'mock::/users/list.json',
    'GET::/test/2.json': 'mock::/users/user.js',
}
