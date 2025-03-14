# 构建阶段
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件
COPY . .

# 暴露3000端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"] 