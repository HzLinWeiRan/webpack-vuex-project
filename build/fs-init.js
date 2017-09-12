var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var beautify = require('js-beautify').js_beautify;
//fs.readFileSync('../src/')

var remain = process.argv.slice(2);

// 文件删除方法
deleteFolderRecursive = function (path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);

  }

};

// 字符串正则替换
/* function replaceStr(str, data) {
  Object.keys(data).forEach(function (item) {
    var reg = new RegExp("\\$\\{\\s*" + item + "\\s*\\}", "g");
    str = str.replace(reg, data[item]);
  });
  return str;
} */

// 名字转化方法
function parseName(fileName) {
  var names = fileName.split('-');
  var resultName = "";
  names.forEach(function (item, i) {
    if (i != 0) {
      item = item.charAt(0).toUpperCase() + item.substr(1);
    }
    resultName += item;
  });
  return resultName;
}

// 初始化类型校验
if (remain[0] === "page" || remain[0] === "component") {
  // 参数校验
  if (!remain[1]) {
    console.error("传入参数不正确!");
    return;
  }

  // 参数转化
  var data = {
    name: remain[1],
    fileName: parseName(remain[1])
  }

  var pagePath = path.resolve(__dirname, remain[0] === "page" ? "../src/pages" : "../src/components");

  var tempValues = {
    parentPath: '/',
    name: data.name
  }
  // 新建模块为页面时，在路由文件中添加配置
  if (remain[0] === "page") {
    let count = 0;
    process.stdout.write('parentPath (/):');
    process.stdin.on('data', (chunk) => {
      if (count === 0) {
        if (chunk.toString().trim() !== '') {
          tempValues.parentPath = chunk.toString().trim();
        }
        process.stdout.write('name (' + tempValues.name + '):');
      } if (count === 1) {
        if (chunk.toString().trim() !== '') {
          tempValues.name = chunk.toString().trim();
        }
        process.stdin.emit('end');
      }
      count++;
    })
    process.stdin.on('end', () => {
      var routePath = path.resolve(__dirname, '../src/routes.js');
      var routes = require(routePath);
      if (tempValues.parentPath == '/') {
        routes.push({
          path: '/' + data.fileName,
          name: tempValues.name,
          component: eval('(resolve => \
              require([\'./pages' + tempValues.parentPath + data.fileName + '\'], resolve)\
          )')
        });
      } else {
        function getParent(routes, path) {
          for (var i = 0; i < routes.length; i++) {
            var el = routes[i];
            if (path) {
              var newPath = path + '/' + el.path;
            } else {
              var newPath = el.path;
            }
            if (newPath === tempValues.parentPath) {
              return el;
            } else if (el.children && el.children.length > 0) {
              var temp = getParent(el.children, newPath)
              if (temp) return temp
            }
          }
        }
        var route = getParent(routes);
        if (route) {
          route.children || (route.children = []);
          if (route.children.length > 0) {
            for (var i = 0; i < route.children.length; i++) {
              var el = route.children[i];
              if (el.path == tempValues.parentPath) {
                console.error('改文件已存在！')
                return;
              }
            }
          }
        } else {
          console.error('父节点不存在！')
          return
        }
        route.children.push({
          path: data.fileName,
          name: tempValues.name,
          component: eval('(resolve => \
              require([\'./pages' + tempValues.parentPath + '/' + data.fileName + '\'], resolve)\
          )')
        });
      }

      var routeWriteStr = "module.exports=";

      // 改变文件路由
      function parseRoutes(item) {
        var isArray = item instanceof Array;
        !isArray && (routeWriteStr += "{");
        isArray && (routeWriteStr += "[");
        const keys = Object.keys(item)
        keys.forEach(function (it, j) {
          !isArray && (routeWriteStr += it + ":")
          if (typeof item[it] === "object") {
            parseRoutes(item[it]);
          } else if (typeof item[it] === "function") {
            routeWriteStr += item[it];
          } else {
            routeWriteStr += "'" + item[it] + "'";
          }
          if (j !== keys.length - 1) {
            routeWriteStr += ","
          }
        });


        !isArray && (routeWriteStr += "}")
        isArray && (routeWriteStr += "]")

      }
      parseRoutes(routes);
      routeWriteStr = beautify(routeWriteStr, { indent_size: 4 })
      //fs.rmdirSync(routePath);
      fs.writeFileSync(routePath, routeWriteStr);
      var pageDir = path.resolve(pagePath, '.' + tempValues.parentPath, data.fileName)
      mkdirFiles(pageDir);
    });
  } else {
    var pageDir = path.resolve(pagePath, data.fileName)
    mkdirFiles(pageDir);
  }

  function mkdirFiles(pageDir) {
    console.log(pageDir)
    // 文件校验
    if (fs.existsSync(pageDir)) {
      console.warn("该文件已存在!");
      // deleteFolderRecursive(pageDir); //方便测试
      return;
    }
    var result = fs.mkdirSync(pageDir);
    // 创建vue文件
    var vueFile = fs.readFileSync(path.resolve(__dirname, './tempJs/index.vue'));
    var vueTemplate = handlebars.compile(vueFile.toString());
    fs.writeFileSync(path.resolve(pageDir, remain[1] + ".vue"), vueTemplate(data), { encoding: 'utf-8', mode: 438, flag: 'w' });

    // 创建js文件
    var jsFile = fs.readFileSync(path.resolve(__dirname, './tempJs/index.js'));
    var jsTemplate = handlebars.compile(jsFile.toString());
    fs.writeFileSync(path.resolve(pageDir, "index.js"), jsTemplate(data), { encoding: 'utf-8', mode: 438, flag: 'w' });

    // 创建less文件
    var lessFile = fs.readFileSync(path.resolve(__dirname, './tempJs/index.less'));
    var lessTemplate = handlebars.compile(lessFile.toString());
    fs.writeFileSync(path.resolve(pageDir, remain[1] + ".less"), lessTemplate(data), { encoding: 'utf-8', mode: 438, flag: 'w' });


  }

}