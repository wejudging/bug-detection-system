import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import { algorithmDetails } from '../data/mockData';

const AlgorithmsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        检测算法详情
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          自适应算法选择系统
        </Typography>
        
        <Typography variant="body1" paragraph>
          我们的系统采用自适应算法选择机制，根据缺陷库的规模和特点，自动选择最合适的检测算法。
          这种方法能够在保证检测准确性的同时，优化系统性能和资源利用率。
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            自适应选择的优势
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <SpeedIcon fontSize="large" color="primary" />
                  </Box>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    性能优化
                  </Typography>
                  <Typography variant="body2" align="center">
                    根据数据规模选择合适算法，避免资源浪费
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <CheckCircleIcon fontSize="large" color="success" />
                  </Box>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    准确性提升
                  </Typography>
                  <Typography variant="body2" align="center">
                    针对不同场景选择最佳算法，提高检测准确率
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <StorageIcon fontSize="large" color="secondary" />
                  </Box>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    可扩展性
                  </Typography>
                  <Typography variant="body2" align="center">
                    随着缺陷库增长，系统能够无缝切换到更适合的算法
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <MemoryIcon fontSize="large" color="info" />
                  </Box>
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    智能决策
                  </Typography>
                  <Typography variant="body2" align="center">
                    系统自动分析数据特征，做出最优算法选择
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      <Typography variant="h5" gutterBottom>
        支持的算法
      </Typography>
      
      <Grid container spacing={3}>
        {algorithmDetails.map(algorithm => (
          <Grid item xs={12} md={6} key={algorithm.name}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">
                  {algorithm.name}
                </Typography>
                <Chip 
                  label={`准确率: ${algorithm.accuracy * 100}%`} 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="body1" paragraph>
                {algorithm.description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="最适合" 
                    secondary={algorithm.bestFor} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <SpeedIcon color="info" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="处理时间" 
                    secondary={algorithm.processingTime} 
                  />
                </ListItem>
              </List>
              
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  技术特点:
                </Typography>
                {algorithm.name === 'MFLLM' ? (
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="多模态融合能力，可处理文本、图像等多种数据" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="大规模预训练模型，具备强大的语义理解能力" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="高并行处理能力，适合大规模数据集" />
                    </ListItem>
                  </List>
                ) : (
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="轻量级模型设计，资源消耗低" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="针对小规模数据集优化，避免过拟合" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="快速响应，适合实时检测场景" />
                    </ListItem>
                  </List>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          算法选择策略
        </Typography>
        
        <Typography variant="body1" paragraph>
          系统根据以下因素自动选择最合适的算法：
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText 
              primary="缺陷库规模" 
              secondary="当缺陷报告数量超过1000条时，系统会自动选择MFLLM算法；对于小规模缺陷库，则使用DLLM算法。" 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText 
              primary="系统资源" 
              secondary="在资源受限的环境中，系统可能会优先选择资源消耗较低的DLLM算法。" 
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <SpeedIcon />
            </ListItemIcon>
            <ListItemText 
              primary="响应时间要求" 
              secondary="对于需要实时响应的场景，系统会优先考虑处理速度更快的算法。" 
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AlgorithmsPage; 