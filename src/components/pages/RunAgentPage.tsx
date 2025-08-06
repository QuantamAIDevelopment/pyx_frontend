import { useParams } from 'react-router-dom';
import { Button } from '../common/ui/button';
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react';
import { fetchAgentById } from '../apiservices/api';

// Workflow components imports
import ResumeToProfileExtractor from '../../workflows/ResumeToProfileExtractor';
import ResumeAnalyzer from '../../workflows/resumeanalyzer';
import PdfSummarizer from '../../workflows/PDFSummarizer';
import CustomerSupportAgent from '../../workflows/CustomerSupportAgent';
import AICustomerSupport from '../../workflows/AICustomerSupport';
import LeavesClassifier from '../../workflows/LeavesClassifier';
import ContractRedFlagDetectorCard from '../../workflows/ContractRedFlagDetector';
import DocumentUploadReminder from '../../workflows/DocumentUploadReminder';
import EmailAttachmentProcessing from '../../workflows/EmailAttachmentProcessing';
import PolicyChangeNotification from '../../workflows/PolicyChangeNotification';
import ProductRecommendationAgent from '../../workflows/ProductRecommendation';
import BusinessIntelligenceExplainerBot from '../../workflows/BusinessIntelligenceExplainerBot';
import ProductFeedbackSummarizer from '../../workflows/ProductFeedbackSummarizer';
import DynamicPricingAgent from '../../workflows/DynamicPricingAgent';
import MetricsBusinessAnalytics from '../../workflows/MetricsBusinessAnalytics';
import MonthlyExpenditure from '../../workflows/MonthlyExpenditure';
import InventoryManagement from '../../workflows/InventoryManagement';
import AppointmentScheduler from '../../workflows/AppointmentScheduler';
import MCQGeneratorAndTrainer from '../../workflows/MCQGenerator';
import ComplaintHandlerAgent from '../../workflows/ComplaintHandlerAgent';
import SmartInvoiceAI from '../../workflows/SmartInvoiceAI';
import AIPoweredBookPriceTracker from '../../workflows/AIPoweredBookPriceTracker';
import AutomateCandidateAcceptance from '../../workflows/AutomateCandidateAcceptance';
import AttendanceAnomalies from '../../workflows/AttendanceAnomalies';
import FetchLeads from '../../workflows/FetchLeads';
import AITestmonialExtractor from '../../workflows/AITestmonialExtractor';
import DynamicModelSelector from '../../workflows/DynamicModelSelector';
import AIBackgroundVerification from '../../workflows/AIBackgroundVerification';
import NotionKnowledgeBaseAIAssistant from '../../workflows/NotionKnowledgeBaseAIAssistant';
import DatabaseMigrationAIAgent from '../../workflows/DatabaseMigrationAI';
import ATSToHRMSCandidateStatusSync from '../../workflows/ATSToHRMSCandidateStatusSync';
import TestCaseGenerator from '../../workflows/TestGenerator';
import GmailCategorization from '../../workflows/GmailCategorization';
import SalesForecastingAgent from '../../workflows/SalesForecastingAgent';
import LeaveBalanceChatbot from '../../workflows/LeaveBalanceChatbot';
import PRSummaryAgent from '../../workflows/PRSummaryAgent';
import PRReviewerAgent from '../../workflows/PRReviewerAgent';
import ProjectCostReports from '../../workflows/ProjectCostReports';
import FraudDetectionSystem from '../../workflows/FraudDetectionSystem';
import AmazonProductScraper from '../../workflows/AmazonProductScraper';
import AIPoweredRestaurantOrderChatbot from '../../workflows/AIPoweredRestaurantOrderChatbot';
import LeaveApprovalReminder from '../../workflows/LeaveApprovalReminder';
import InterviewPanelAutoAssignment from '../../workflows/InterviewPanelAutoAssignment';
import PerformanceReviewSummary from '../../workflows/PerformanceReviewSummary';
import SentimentAgent from '../../workflows/sentimentagent';

// Workflow components mapping
const WORKFLOW_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  agent_001: AICustomerSupport,
  agent_002: LeavesClassifier,
  agent_003: DocumentUploadReminder,
  agent_006: EmailAttachmentProcessing,
  agent_007: PolicyChangeNotification,
  agent_008: ResumeToProfileExtractor,
  agent_009: ContractRedFlagDetectorCard,
  agent_010: ProductRecommendationAgent,
  agent_011: BusinessIntelligenceExplainerBot,
  agent_012: ProductFeedbackSummarizer,
  agent_013: DynamicPricingAgent,
  agent_014: MetricsBusinessAnalytics,
  agent_015: MonthlyExpenditure,
  agent_017: InventoryManagement,
  agent_018: AppointmentScheduler,
  agent_019: MCQGeneratorAndTrainer,
  agent_020: ComplaintHandlerAgent,
  agent_021: SmartInvoiceAI,
  agent_022: AIPoweredBookPriceTracker,
  agent_023: AutomateCandidateAcceptance,
  agent_024: AttendanceAnomalies,
  agent_025: FetchLeads,
  agent_026: AITestmonialExtractor,
  agent_027: DynamicModelSelector,
  agent_028: AIBackgroundVerification,
  agent_029: NotionKnowledgeBaseAIAssistant,
  agent_030: DatabaseMigrationAIAgent,
  agent_031: ATSToHRMSCandidateStatusSync,
  agent_032: TestCaseGenerator,
  agent_033: GmailCategorization,
  agent_034: ResumeAnalyzer,
  agent_035: SentimentAgent,
  agent_036: CustomerSupportAgent,
  agent_037: PdfSummarizer,
  agent_038: SalesForecastingAgent,
  agent_039: LeaveBalanceChatbot,
  agent_040: PRSummaryAgent,
  agent_041: PRReviewerAgent,
  agent_042: ProjectCostReports,
  agent_043: FraudDetectionSystem,
  agent_044: AmazonProductScraper,
  agent_045: AIPoweredRestaurantOrderChatbot,
  agent_046: LeaveApprovalReminder,
  agent_047: InterviewPanelAutoAssignment,
  agent_048: PerformanceReviewSummary,
};

export function RunAgentPage() {
  const { id } = useParams();
  const [agentName, setAgentName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const WorkflowComponent = id ? WORKFLOW_COMPONENTS[id] : undefined;

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchAgentById(id)
        .then(agent => setAgentName(agent.name || id))
        .catch((error) => {
          console.error('Fetch error:', error);
          setAgentName(id);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-secondary px-4 font-sans">
      <div className="w-full max-w-3xl my-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agents
        </Button>

        {/* Content */}
        <div className="w-full">
          {WorkflowComponent ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">
                {loading ? 'Loading...' : agentName || id}
              </h2>
              <WorkflowComponent />
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              No workflow UI found for agent ID: <span className="font-mono font-semibold text-text-primary">{id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 