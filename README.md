# 自适应重复缺陷报告检测系统

这是一个基于React的自适应重复缺陷报告检测系统前端界面。系统能够基于缺陷库规模动态选择合适的检测算法，有效识别重复的缺陷报告。

## 功能特点

- **自适应算法选择**：根据缺陷库规模自动选择最合适的检测算法
  - 大规模缺陷库：使用MFLLM（多模态融合大语言模型）算法
  - 小规模缺陷库：使用DLLM（轻量级大语言模型）算法
- **缺陷报告管理**：浏览、查看和管理系统中的缺陷报告
- **重复检测**：检测缺陷报告之间的相似度，识别潜在的重复报告
- **统计分析**：查看缺陷报告的统计数据和分析图表

## 技术栈

- React 18
- TypeScript
- React Router v6
- Material-UI (MUI)
- Chart.js
- Docker

## 项目结构

```
src/
├── components/        # 可复用组件
├── pages/             # 页面组件
├── data/              # 模拟数据
├── types/             # TypeScript类型定义
└── utils/             # 工具函数
```

## 主要页面

1. **首页**：系统概述和功能导航
2. **缺陷报告列表**：查看和筛选所有缺陷报告
3. **报告详情**：查看单个缺陷报告的详细信息
4. **重复检测**：使用自适应算法检测重复报告
5. **算法详情**：了解系统使用的检测算法
6. **统计分析**：查看缺陷报告的统计数据和图表

## 开始使用

### 方法一：本地开发

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 运行。

#### 构建生产版本

```bash
npm run build
```

### 方法二：使用Docker

#### 从Docker Hub拉取镜像

```bash
docker pull your-dockerhub-username/bug-detection-system:latest
```

#### 运行容器

```bash
docker run -d -p 3000:3000 your-dockerhub-username/bug-detection-system:latest
```

应用将在 [http://localhost:3000](http://localhost:3000) 运行。

#### 使用Docker Compose

```bash
# 设置Docker Hub用户名
export DOCKER_HUB_USERNAME=your-dockerhub-username

# 启动服务
docker-compose up -d
```

### 方法三：自行构建Docker镜像

#### 构建镜像

```bash
docker build -t bug-detection-system .
```

#### 运行容器

```bash
docker run -d -p 3000:3000 bug-detection-system
```

## 部署到Docker Hub

1. 编辑`docker-build-push.sh`脚本，将`your-dockerhub-username`替换为您的Docker Hub用户名
2. 运行脚本：

```bash
./docker-build-push.sh
```

## 使用流程

1. 浏览缺陷报告列表
2. 查看报告详情
3. 选择一个报告进行重复检测
4. 系统会根据缺陷库规模自动选择合适的算法
5. 查看检测结果，识别潜在的重复报告

## 注意事项

- 本项目仅包含前端界面，使用模拟数据进行演示
- 实际部署时，需要连接后端API获取真实数据
- 系统中的算法选择逻辑可根据实际需求进行调整
