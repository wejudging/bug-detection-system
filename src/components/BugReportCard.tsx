import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Button,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BugReport } from '../types';
import { formatDate, getSeverityColor, getStatusColor } from '../utils/helpers';

interface BugReportCardProps {
  report: BugReport;
}

const BugReportCard: React.FC<BugReportCardProps> = ({ report }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/report/${report.id}`);
  };
  
  const handleDetectDuplicates = () => {
    navigate(`/detect-duplicates/${report.id}`);
  };
  
  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div">
            {report.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {report.id}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {report.description.length > 150 
            ? `${report.description.substring(0, 150)}...` 
            : report.description}
        </Typography>
        
        <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
          <Chip 
            label={`严重程度: ${report.severity}`} 
            size="small" 
            sx={{ bgcolor: getSeverityColor(report.severity), color: 'white' }}
          />
          <Chip 
            label={`状态: ${report.status}`} 
            size="small" 
            sx={{ bgcolor: getStatusColor(report.status), color: 'white' }}
          />
          <Chip 
            label={`组件: ${report.component}`} 
            size="small" 
            variant="outlined"
          />
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            创建者: {report.createdBy}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            创建时间: {formatDate(report.createdAt)}
          </Typography>
        </Box>
        
        {report.status === 'duplicate' && report.duplicateOf && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            重复报告，原始报告ID: {report.duplicateOf}
          </Typography>
        )}
      </CardContent>
      
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>查看详情</Button>
        {report.status !== 'duplicate' && (
          <Button size="small" color="primary" onClick={handleDetectDuplicates}>
            检测重复
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BugReportCard; 