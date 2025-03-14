import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  Divider,
  Grid,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BugReportCard from '../components/BugReportCard';
import AlgorithmSelector from '../components/AlgorithmSelector';
import SimilarityResults from '../components/SimilarityResults';
import { 
  mockBugReports, 
  algorithmDetails, 
  generateSimilarityResults,
  recommendAlgorithm
} from '../data/mockData';
import { AlgorithmType, SimilarityResult } from '../types';

const DuplicateDetectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedReport, setSelectedReport] = useState(
    id ? mockBugReports.find(report => report.id === id) : null
  );
  
  const [reportsCount] = useState(mockBugReports.length);
  const [recommendedAlgo] = useState<AlgorithmType>(recommendAlgorithm(reportsCount));
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>(recommendedAlgo);
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SimilarityResult | null>(null);
  
  useEffect(() => {
    // 如果URL中有ID参数，自动设置为选中的报告
    if (id) {
      const report = mockBugReports.find(report => report.id === id);
      setSelectedReport(report || null);
    }
  }, [id]);
  
  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm as AlgorithmType);
  };
  
  const handleDetectDuplicates = () => {
    if (!selectedReport) return;
    
    setLoading(true);
    setResults(null);
    
    // 模拟API调用延迟
    setTimeout(() => {
      const similarityResults = generateSimilarityResults(selectedReport.id, selectedAlgorithm);
      setResults(similarityResults);
      setLoading(false);
    }, 2000);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          返回
        </Button>
        <Typography variant="h4" component="h1">
          重复缺陷报告检测
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              当前缺陷库信息
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                缺陷报告总数
              </Typography>
              <Typography variant="h5">
                {reportsCount}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                推荐算法
              </Typography>
              <Typography variant="h6" color="primary">
                {recommendedAlgo}
              </Typography>
              <Typography variant="body2">
                {recommendedAlgo === 'MFLLM' 
                  ? '多模态融合大语言模型算法（适合大规模缺陷库）' 
                  : '轻量级大语言模型算法（适合小规模缺陷库）'}
              </Typography>
            </Box>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              系统已根据当前缺陷库规模自动选择最合适的检测算法。
            </Alert>
          </Paper>
          
          <AlgorithmSelector 
            algorithms={algorithmDetails}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={handleAlgorithmChange}
            reportsCount={reportsCount}
            recommendedAlgorithm={recommendedAlgo}
          />
        </Grid>
        
        <Grid item xs={12} md={8}>
          {selectedReport ? (
            <>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  选中的缺陷报告
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <BugReportCard report={selectedReport} />
                
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<PlayArrowIcon />}
                    onClick={handleDetectDuplicates}
                    disabled={loading}
                  >
                    {loading ? '检测中...' : '开始检测重复报告'}
                  </Button>
                </Box>
              </Paper>
              
              <SimilarityResults results={results} loading={loading} />
            </>
          ) : (
            <Paper sx={{ p: 3 }}>
              <Alert severity="info">
                请从报告列表中选择一个缺陷报告进行重复检测。
              </Alert>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/reports')}
                >
                  浏览报告列表
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DuplicateDetectionPage; 