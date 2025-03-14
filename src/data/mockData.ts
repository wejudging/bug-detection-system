import { AlgorithmDetails, AlgorithmType, BugReport } from '../types';

// 模拟缺陷报告数据
export const mockBugReports: BugReport[] = [
  {
    id: 'BUG-001',
    title: '登录页面在移动设备上显示异常',
    description: '当在iPhone 12上访问登录页面时，输入框被截断，无法看到完整的输入内容。',
    steps: '1. 使用iPhone 12访问应用\n2. 导航至登录页面\n3. 尝试在用户名输入框中输入文本',
    screenshot: '/images/bug1.png',
    severity: 'medium',
    status: 'open',
    createdAt: '2023-10-15T08:30:00Z',
    createdBy: '张三',
    component: '用户认证'
  },
  {
    id: 'BUG-002',
    title: '移动端登录页面UI错位',
    description: '在iPhone设备上登录页面的输入框显示不完整，用户无法看到输入的全部内容。',
    steps: '1. 在iPhone设备上打开应用\n2. 进入登录页面\n3. 在用户名字段输入文本',
    screenshot: '/images/bug2.png',
    severity: 'medium',
    status: 'duplicate',
    duplicateOf: 'BUG-001',
    createdAt: '2023-10-16T10:15:00Z',
    createdBy: '李四',
    component: '用户认证'
  },
  {
    id: 'BUG-003',
    title: '数据导出功能失败',
    description: '尝试导出报表数据时系统返回500错误。',
    steps: '1. 登录管理员账户\n2. 导航至报表页面\n3. 点击"导出数据"按钮',
    severity: 'high',
    status: 'in-progress',
    createdAt: '2023-10-17T14:20:00Z',
    createdBy: '王五',
    component: '报表系统'
  },
  {
    id: 'BUG-004',
    title: '无法导出数据到Excel',
    description: '点击导出按钮后系统显示服务器错误，无法生成Excel文件。',
    steps: '1. 以管理员身份登录\n2. 进入报表模块\n3. 选择导出选项',
    severity: 'high',
    status: 'duplicate',
    duplicateOf: 'BUG-003',
    createdAt: '2023-10-18T09:45:00Z',
    createdBy: '赵六',
    component: '报表系统'
  },
  {
    id: 'BUG-005',
    title: '用户资料页面加载缓慢',
    description: '用户资料页面加载时间超过10秒，影响用户体验。',
    steps: '1. 登录任意用户账户\n2. 导航至个人资料页面\n3. 观察页面加载时间',
    severity: 'low',
    status: 'open',
    createdAt: '2023-10-19T16:30:00Z',
    createdBy: '孙七',
    component: '用户管理'
  },
  {
    id: 'BUG-006',
    title: '搜索功能返回不相关结果',
    description: '使用搜索功能时，返回的结果与搜索关键词不相关。',
    steps: '1. 导航至搜索页面\n2. 输入特定关键词\n3. 查看搜索结果',
    severity: 'medium',
    status: 'open',
    createdAt: '2023-10-20T11:20:00Z',
    createdBy: '周八',
    component: '搜索引擎'
  },
  {
    id: 'BUG-007',
    title: '通知功能无法正常工作',
    description: '系统通知没有按预期发送给用户。',
    steps: '1. 创建触发通知的事件\n2. 检查用户是否收到通知',
    severity: 'high',
    status: 'resolved',
    createdAt: '2023-10-21T13:40:00Z',
    createdBy: '吴九',
    component: '通知系统'
  },
  {
    id: 'BUG-008',
    title: '密码重置邮件未发送',
    description: '用户请求密码重置后未收到包含重置链接的电子邮件。',
    steps: '1. 在登录页面点击"忘记密码"\n2. 输入注册邮箱\n3. 提交请求\n4. 检查邮箱',
    severity: 'critical',
    status: 'in-progress',
    createdAt: '2023-10-22T09:10:00Z',
    createdBy: '郑十',
    component: '用户认证'
  },
  {
    id: 'BUG-009',
    title: '重置密码邮件发送失败',
    description: '用户在忘记密码流程中没有收到重置密码的邮件。',
    steps: '1. 点击忘记密码\n2. 输入电子邮件地址\n3. 等待邮件（未收到）',
    severity: 'critical',
    status: 'duplicate',
    duplicateOf: 'BUG-008',
    createdAt: '2023-10-23T10:05:00Z',
    createdBy: '刘一',
    component: '用户认证'
  },
  {
    id: 'BUG-010',
    title: '图表在暗模式下显示不清晰',
    description: '当应用切换到暗模式时，数据图表的颜色对比度不足，难以阅读。',
    steps: '1. 进入应用设置\n2. 启用暗模式\n3. 导航至包含图表的页面',
    severity: 'low',
    status: 'open',
    createdAt: '2023-10-24T15:50:00Z',
    createdBy: '陈二',
    component: '数据可视化'
  }
];

// 模拟算法详情
export const algorithmDetails: AlgorithmDetails[] = [
  {
    name: 'MFLLM',
    description: '多模态融合大语言模型算法',
    bestFor: '大规模缺陷库（>1000条报告）',
    accuracy: 0.92,
    processingTime: '较长（适合批处理）',
    suitable: true
  },
  {
    name: 'DLLM',
    description: '轻量级大语言模型算法',
    bestFor: '小规模缺陷库（<1000条报告）',
    accuracy: 0.85,
    processingTime: '较短（适合实时处理）',
    suitable: false
  }
];

// 模拟相似度结果
export const generateSimilarityResults = (reportId: string, algorithm: 'MFLLM' | 'DLLM') => {
  const originalReport = mockBugReports.find(report => report.id === reportId);
  
  if (!originalReport) {
    return null;
  }
  
  // 查找可能的重复报告
  const similarReports = mockBugReports
    .filter(report => report.id !== reportId && report.component === originalReport.component)
    .map(report => ({
      report,
      similarityScore: calculateSimilarity(originalReport, report)
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 3); // 只返回前3个最相似的
  
  return {
    originalReport,
    similarReports,
    algorithm
  };
};

// 模拟相似度计算函数
const calculateSimilarity = (report1: BugReport, report2: BugReport): number => {
  // 这里是一个简单的模拟实现，实际系统中会有更复杂的算法
  let score = 0;
  
  // 标题相似度（简单字符串匹配）
  const titleWords1 = report1.title.toLowerCase().split(' ');
  const titleWords2 = report2.title.toLowerCase().split(' ');
  const commonTitleWords = titleWords1.filter(word => titleWords2.includes(word)).length;
  score += commonTitleWords / Math.max(titleWords1.length, titleWords2.length) * 0.4;
  
  // 描述相似度
  const descWords1 = report1.description.toLowerCase().split(' ');
  const descWords2 = report2.description.toLowerCase().split(' ');
  const commonDescWords = descWords1.filter(word => descWords2.includes(word)).length;
  score += commonDescWords / Math.max(descWords1.length, descWords2.length) * 0.3;
  
  // 组件相同加分
  if (report1.component === report2.component) {
    score += 0.2;
  }
  
  // 严重程度相同加分
  if (report1.severity === report2.severity) {
    score += 0.1;
  }
  
  // 如果已知是重复的，确保得分很高
  if (report2.status === 'duplicate' && report2.duplicateOf === report1.id) {
    score = 0.95;
  }
  
  return Math.min(score, 1); // 确保分数不超过1
};

// 根据缺陷库规模推荐算法
export const recommendAlgorithm = (reportsCount: number): AlgorithmType => {
  return reportsCount > 1000 ? 'MFLLM' : 'DLLM';
}; 