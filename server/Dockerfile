FROM node:14

ENV ENVIRONMENT=production

# 定义工作目录
WORKDIR /app

# 安装依赖
COPY package*.json ./

RUN npm install

# 复制项目
COPY . .

# 项目构建
RUN npm run build

# 暴露端口
EXPOSE 80

# 运行（入口）
CMD ['node', './dist/src/main.js']
