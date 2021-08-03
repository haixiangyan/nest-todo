# 后端

使用 Nest.js 实现的 Todo App 后端 API。

## 本地运行

使用 Docker 开启一个 `mysql` 或者 `mariadb` 容器。

```shell
docker run -p 127.0.0.1:3306:3306 --name nest-todo -e MARIADB_ROOT_PASSWORD=123456 -d mariadb:latest
```

在 `mysql` 或者 `mariadb` 里添加 `nest_todo` 数据库。

```sql
CREATE DATABASE nest_todo
```

然后初始化数据库表。

```shell
npm run migration:generate run
```

初始化数据库数据。

```shell
npm run db:seed
```

开始 Redis。

```shell
docker run -p 127.0.0.1:6379:6379 --name some-redis -d redis
```

最后，本地跑 Nest 项目。

```shell
npm run start:dev
```

## 功能

- [x] /user 接口
- [x] /todo 接口
- [x] /auth/login 登陆接口
- [ ] 文件上传接口
- [ ] 多媒体压缩功能
- [x] 搭建数据库
- [ ] 使用 Docker 构建
- [ ] Swagger 构建 API 文档
- [ ] 编写单元测试
- [ ] 编写 e2e 测试
