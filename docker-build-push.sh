#!/bin/bash

# 设置变量
IMAGE_NAME="bug-detection-system"
DOCKER_HUB_USERNAME="your-dockerhub-username"  # 请替换为您的Docker Hub用户名
TAG="latest"

echo "===== 开始构建Docker镜像 ====="
echo "构建直接使用Node.js在3000端口运行的镜像..."
docker build -t $IMAGE_NAME .

echo "===== 为镜像添加标签 ====="
docker tag $IMAGE_NAME $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG

echo "===== 登录Docker Hub ====="
echo "请输入您的Docker Hub密码:"
docker login -u $DOCKER_HUB_USERNAME

echo "===== 推送镜像到Docker Hub ====="
docker push $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG

echo "===== 完成! ====="
echo "镜像已成功推送到: $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG"
echo "您可以使用以下命令运行容器:"
echo "docker run -d -p 3000:3000 $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG" 