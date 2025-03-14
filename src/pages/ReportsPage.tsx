import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
  Pagination,
  Divider
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import BugReportCard from '../components/BugReportCard';
import { mockBugReports } from '../data/mockData';
import { BugReport } from '../types';

const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [componentFilter, setComponentFilter] = useState('all');
  const [page, setPage] = useState(1);
  const reportsPerPage = 5;
  
  // 获取所有组件的唯一值
  const components = Array.from(new Set(mockBugReports.map(report => report.component)));
  
  // 过滤报告
  const filteredReports = mockBugReports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
    const matchesComponent = componentFilter === 'all' || report.component === componentFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity && matchesComponent;
  });
  
  // 分页
  const pageCount = Math.ceil(filteredReports.length / reportsPerPage);
  const displayedReports = filteredReports.slice(
    (page - 1) * reportsPerPage,
    page * reportsPerPage
  );
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // 重置到第一页
  };
  
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };
  
  const handleSeverityChange = (event: SelectChangeEvent) => {
    setSeverityFilter(event.target.value);
    setPage(1);
  };
  
  const handleComponentChange = (event: SelectChangeEvent) => {
    setComponentFilter(event.target.value);
    setPage(1);
  };
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        缺陷报告列表
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="搜索报告"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="输入ID、标题或描述关键词"
            />
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>状态</InputLabel>
              <Select
                value={statusFilter}
                label="状态"
                onChange={handleStatusChange}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="open">未解决</MenuItem>
                <MenuItem value="in-progress">处理中</MenuItem>
                <MenuItem value="resolved">已解决</MenuItem>
                <MenuItem value="duplicate">重复</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>严重程度</InputLabel>
              <Select
                value={severityFilter}
                label="严重程度"
                onChange={handleSeverityChange}
              >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="low">低</MenuItem>
                <MenuItem value="medium">中</MenuItem>
                <MenuItem value="high">高</MenuItem>
                <MenuItem value="critical">严重</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>组件</InputLabel>
              <Select
                value={componentFilter}
                label="组件"
                onChange={handleComponentChange}
              >
                <MenuItem value="all">全部</MenuItem>
                {components.map(component => (
                  <MenuItem key={component} value={component}>
                    {component}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          显示 {filteredReports.length} 个结果中的 {Math.min(reportsPerPage, displayedReports.length)}
        </Typography>
      </Box>
      
      {displayedReports.length > 0 ? (
        <>
          {displayedReports.map((report: BugReport) => (
            <BugReportCard key={report.id} report={report} />
          ))}
          
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination 
              count={pageCount} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          没有找到匹配的缺陷报告。
        </Typography>
      )}
    </Container>
  );
};

export default ReportsPage; 