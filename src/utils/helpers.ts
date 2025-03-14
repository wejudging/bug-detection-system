// 格式化日期
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 根据严重程度返回对应的颜色
export const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical'): string => {
  const colorMap = {
    low: '#4caf50',     // 绿色
    medium: '#ff9800',  // 橙色
    high: '#f44336',    // 红色
    critical: '#9c27b0' // 紫色
  };
  
  return colorMap[severity];
};

// 根据状态返回对应的颜色
export const getStatusColor = (status: 'open' | 'in-progress' | 'resolved' | 'duplicate'): string => {
  const colorMap = {
    'open': '#f44336',       // 红色
    'in-progress': '#2196f3', // 蓝色
    'resolved': '#4caf50',    // 绿色
    'duplicate': '#9e9e9e'    // 灰色
  };
  
  return colorMap[status];
};

// 根据相似度分数返回对应的颜色
export const getSimilarityColor = (score: number): string => {
  if (score >= 0.8) {
    return '#f44336'; // 高相似度 - 红色
  } else if (score >= 0.5) {
    return '#ff9800'; // 中等相似度 - 橙色
  } else {
    return '#4caf50'; // 低相似度 - 绿色
  }
};

// 格式化相似度分数为百分比
export const formatSimilarityScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
}; 