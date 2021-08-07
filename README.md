# nest-todo

使用 React.js + Nest.js 实现一个简单的 Todo App。

## Demo

[Demo 可点击这里查看。](http://nest-todo.thedemo.cn)

## 本地运行

使用 docker-compose 的方式来启动 redis, mariadb 2 个容器。

> 一般来说本地开发都会使用 `npm run start` 这样的命令来启动项目，就不用放在 docker-compose 里一键启动了。
> 不过，为了大家也能学习到怎么用 docker-compose 一键本地运行，所以也注释后的脚本放在 docker-compose 里了。

```shell
docker-compose -f dev-docker-compose.yml up -d
```

然后，初始化数据库结构和数据内容。

```shell
# 进入后端目录
cd server

# 数据库迁移
npm run migration:generate run

# 插入初始数据
npm run db:seed
```

开启后端。

```shell
cd server
npm run start:dev
```

最后，开启前端。

```shell
cd client

npm run start
```

访问 [http://localhost:3000](http://localhost:3000) 即可。

## 生产部署

```shell
docker-compose -f prod-docker-compose.yml up -d --build
```

然后再次初始化数据库和数据：

```shell
npm run migration:run

npm run db:seed
```

打开 [http://localhost](http://localhost) 即可访问。

## 技术栈

### 前端

* React.js
* Sass
* TypeScript

### 后端

* Nest.js
* TypeScript

## 功能

- [x] user 和 todo 两个资源的 CRUD 接口
- [x] 数据库模块：TypeORM x mariadb（不用 mysql 是因为 M1 电脑无法使用 mysql 镜像），数据库迁移，数据库 seed
- [x] 文件上传模块，使用 Express 的 Multer 实现
- [x] 配置文件模块，使用 ConfigModule 读取本地 ENV 变量
- [x] 日志模块，ReportLogger 模拟日志上报
- [x] 静态资源模块，使用 StaticModule 使现
- [x] 用户身份验证：local 和 jst 两种策略
- [x] 用户角色验证：区分普通用户和管理员两种角色
- [x] Docker 部署环境
- [x] Swagger 构建 API 文档
- [x] WebSocket 实现数据传输
- [x] Http 模块，http 的转发功能
- [x] Error 模块，出错时，拦截错误，并按一定格式输出
- [x] Transform 模块，以规定格式返回数据
- [x] Task Scheduling 定时推送消息
- [ ] 编写单元测试
- [ ] 编写 e2e 测试
