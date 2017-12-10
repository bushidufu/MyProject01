## 目录结构说明 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|		|-- page                   	 // 主要路由页面
	|           |-- BaseCharts.vue       // 基础图表
	|           |-- BaseForm.vue         // 基础表单
	|           |-- BaseTable.vue        // 基础表格
	|           |-- Login.vue          	 // 登录
	|           |-- Markdown.vue         // markdown组件
	|           |-- Readme.vue           // 自述组件
	|           |-- Upload.vue           // 图片上传
	|           |-- VueEditor.vue        // 富文本编辑器
	|           |-- VueTable.vue         // vue表格组件
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明
	
	
## dependencies说明 ##

axios ： vue2.x resource 推荐的网络交互方式axios 基于ECMAScript 6

babel-polyfill : 适配浏览器对于es6支持的组建

element-ui : 饿了么发布的ui框架

vue : vue.js模板和数据binding的组件

vue-core-image-upload : 上传图片截取裁剪组件

vue-datasource ： vue数据组件，用来渲染vue的数据表格

vue-schart : vue图表支持的组件

vue-quill-editor ： vue家族富文本组件支持

vue-router : router设置路径跳转的组件

vue-simplemde : 对markdown支持的组件


## devDependencies ##

autoprefixer : 自动添加浏览器前缀的应用，
适配浏览器css，配合打包工具如webpack或者grunt使用

babel-core ： es6代码转换norml script也就是es5代码。

babel-loader ： es6代码转换norml script也就是es5代码。

babel-plugin-transform-runtime ：es6代码转换norml script也就是es5代码。

babel-preset-es2015 ： es6代码转换norml script也就是es5代码。

babel-preset-stage-2 ： es6代码转换norml script也就是es5代码。

babel-register ： es6代码转换norml script也就是es5代码。

chalk ： 定制化控制太输出组件

extract-text-webpack-plugin ： express web插件，用来设置网络request,可暂时忽略

file-loader ： 包打包器

friendly-errors-webpack-plugin ： webpack错误提示插件，将更友好，更确定的锁定错误

function-bind : function绑定到object的支持组件

html-webpack-plugin : webpack定义主函数以及打包可部署dist插件

http-proxy-middleware ： http代理插件

opn ： 打开特定url，提供的特定的组件，应用场景暂不明

ora ： 自定义loading插件

semver ： 类死断言构造，可以比较，判断等逻辑组件

shelljs ： js跨平台操作运营shell

url-loader ： 按照规则load指定的url

vue-loader ： 结合webpack处理指定的vue code





















