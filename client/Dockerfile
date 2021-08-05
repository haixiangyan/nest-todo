# 使用 node 镜像
FROM node

# 准备工作目录
RUN mkdir -p /app/client
WORKDIR /app/client

# 复制 package.json
COPY package*.json /app/client/

# 安装目录
RUN npm install

# 复制文件
COPY . /app/client/

# 开启 Dev
CMD ["npm", "run", "start"]
