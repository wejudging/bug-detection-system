import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box,
  Divider,
  Chip
} from '@mui/material';
import { AlgorithmDetails } from '../types';

interface AlgorithmSelectorProps {
  algorithms: AlgorithmDetails[];
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  reportsCount: number;
  recommendedAlgorithm: string;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithms,
  selectedAlgorithm,
  onAlgorithmChange,
  reportsCount,
  recommendedAlgorithm
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAlgorithmChange(event.target.value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          选择检测算法
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            当前缺陷库规模: {reportsCount} 条报告
          </Typography>
          <Typography variant="body2" gutterBottom>
            推荐算法: 
            <Chip 
              label={recommendedAlgorithm} 
              color="primary" 
              size="small" 
              sx={{ ml: 1 }}
            />
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <RadioGroup
          value={selectedAlgorithm}
          onChange={handleChange}
        >
          {algorithms.map((algorithm) => (
            <Box key={algorithm.name} sx={{ mb: 2 }}>
              <FormControlLabel
                value={algorithm.name}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="subtitle1">
                      {algorithm.name}
                      {algorithm.name === recommendedAlgorithm && (
                        <Chip 
                          label="推荐" 
                          color="success" 
                          size="small" 
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {algorithm.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" component="span">
                        最适合: {algorithm.bestFor}
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                        准确率: {algorithm.accuracy * 100}%
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                        处理时间: {algorithm.processingTime}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </Box>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default AlgorithmSelector; 