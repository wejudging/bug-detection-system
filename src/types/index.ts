export interface BugReport {
  id: string;
  title: string;
  description: string;
  steps: string;
  screenshot?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'duplicate';
  createdAt: string;
  createdBy: string;
  component: string;
  duplicateOf?: string;
}

export interface SimilarityResult {
  originalReport: BugReport;
  similarReports: Array<{
    report: BugReport;
    similarityScore: number;
  }>;
  algorithm: AlgorithmType;
}

export type AlgorithmType = 'MFLLM' | 'DLLM';

export interface AlgorithmDetails {
  name: AlgorithmType;
  description: string;
  bestFor: string;
  accuracy: number;
  processingTime: string;
  suitable: boolean;
} 