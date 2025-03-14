import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider, 
  Button,
  LinearProgress,
  Alert,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SimilarityResult } from '../types';
import { formatSimilarityScore, getSimilarityColor } from '../utils/helpers';

interface SimilarityResultsProps {
  results: SimilarityResult | null;
  loading: boolean;
}

const SimilarityResults: React.FC<SimilarityResultsProps> = ({ results, loading }) => {
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            正在分析相似度...
          </Typography>
          <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
            <LinearProgress />
          </Box>
          <Typography variant="body2" color="text.secondary">
            使用 {results?.algorithm || '自适应'} 算法进行分析中，请稍候...
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  if (!results) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        请选择一个缺陷报告并启动检测流程。
      </Alert>
    );
  }
  
  if (results.similarReports.length === 0) {
    return (
      <Alert severity="success" sx={{ mb: 3 }}>
        未发现任何相似的缺陷报告。
      </Alert>
    );
  }
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            相似度分析结果
          </Typography>
          <Typography variant="body2" color="text.secondary">
            使用算法: {results.algorithm}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {results.similarReports.map((item, index) => {
          const similarityScore = item.similarityScore;
          const isDuplicate = similarityScore >= 0.8;
          
          return (
            <Paper 
              key={item.report.id} 
              elevation={1} 
              sx={{ 
                p: 2, 
                mb: 2, 
                borderLeft: 4, 
                borderColor: getSimilarityColor(similarityScore) 
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1">
                  {item.report.title}
                </Typography>
                <Box>
                  <Typography 
                    variant="h6" 
                    component="span"
                    sx={{ 
                      color: getSimilarityColor(similarityScore),
                      fontWeight: 'bold'
                    }}
                  >
                    {formatSimilarityScore(similarityScore)}
                  </Typography>
                  {isDuplicate && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      可能是重复报告！
                    </Alert>
                  )}
                </Box>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.report.description.substring(0, 100)}...
              </Typography>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  ID: {item.report.id}
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/report/${item.report.id}`)}
                >
                  查看详情
                </Button>
              </Box>
            </Paper>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SimilarityResults; 