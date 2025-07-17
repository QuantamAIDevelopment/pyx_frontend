import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../common/ui/card';
import { Button } from '../common/ui/button';
import {ArrowLeft} from  'lucide-react'
import ResumeToProfileExtractor from '../../workflows/ResumeToProfileExtractor';
import ResumeAnalyzer from '../../workflows/resumeanalyzer';
// import PdfSummarizer from '../../workflows/PdfSummarizer';
import CustomerSupportAgent from '../../workflows/CustomerSupportAgent';
// import SentimentAgent from '../../workflows/sentimentagent';
import AICustomerSupport from '../../workflows/AICustomerSupport';
import LeavesClassifier from '../../workflows/LeavesClassifier';
import ContractRedFlagDetectorCard from '../../workflows/ContractRedFlagDetector';
// import DocumentUploadReminder from '../../workflows/DocumentUploadReminder';
// import CandidateHiringStatus from '../../workflows/CandidateHiringStatus';
// import PayslipAutoEncrypted from '../../workflows/PayslipAutoEncrypted';
import EmailAttachmentProcessing from '../../workflows/EmailAttachmentProcessing';
// import PolicyChangeNotification from '../../workflows/PolicyChangeNotification';
// import ProductRecommendationAgent from '../../workflows/ProductRecommendationAgent';
// import BusinessIntelligenceExplainerBot from '../../workflows/BusinessIntelligenceExplainerBot';
// import ProductFeedbackSummarizer from '../../workflows/ProductFeedbackSummarizer';
// import DynamicPricingAgent from '../../workflows/DynamicPricingAgent';
// import MetricsBusinessAnalytics from '../../workflows/MetricsBusinessAnalytics';
// import MonthlyExpenditure from '../../workflows/MonthlyExpenditure';
// import FraudDetection from '../../workflows/FraudDetection';
import InventoryManagement from '../../workflows/InventoryManagement';
import AppointmentScheduler from '../../workflows/AppointmentScheduler';
// import MCQGeneratorAndTrainer from '../../workflows/MCQGeneratorAndTrainer';
// import ComplaintHandlerAgent from '../../workflows/ComplaintHandlerAgent';
import SmartInvoiceAI from '../../workflows/SmartInvoiceAI';
// import AIPoweredBookPriceTracker from '../../workflows/AIPoweredBookPriceTracker';
// import AutomateCandidateAcceptance from '../../workflows/AutomateCandidateAcceptance';
// import AttendanceAnomalies from '../../workflows/AttendanceAnomalies';
// import FetchLeads from '../../workflows/FetchLeads';
// import AITestmonialExtractor from '../../workflows/AITestmonialExtractor';
// import DynamicModelSelector from '../../workflows/DynamicModelSelector';
// import AIBackgroundVerification from '../../workflows/AIBackgroundVerification';
// import NotionKnowledgeBaseAIAssistant from '../../workflows/NotionKnowledgeBaseAIAssistant';
// import DatabaseMigrationAIAgent from '../../workflows/DatabaseMigrationAIAgent';
// import ATSToHRMSCandidateStatusSync from '../../workflows/ATSToHRMSCandidateStatusSync';
// import TestCaseGenerator from '../../workflows/TestCaseGenerator';
// import GmailCategorization from '../../workflows/GmailCategorization';
// import PDFSummarizer from '../../workflows/PDFSummarizer';
// import SalesForecastingAgent from '../../workflows/SalesForecastingAgent';
// import LeaveBalanceChatbot from '../../workflows/LeaveBalanceChatbot';
// import PRSummaryAgent from '../../workflows/PRSummaryAgent';
// import PRReviewerAIAgent from '../../workflows/PRReviewerAIAgent';
// import ProjectCostReports from '../../workflows/ProjectCostReports';
// import FraudDetectionSystem from '../../workflows/FraudDetectionSystem';
// import AmazonProductScraper from '../../workflows/AmazonProductScraper';
// import AIPoweredRestaurantOrderChatbot from '../../workflows/AIPoweredRestaurantOrderChatbot';
// import LeaveApprovalReminder from '../../workflows/LeaveApprovalReminder';
// import InterviewPanelAutoAssignment from '../../workflows/InterviewPanelAutoAssignment';
// import PerformanceReviewSummary from '../../workflows/PerformanceReviewSummary';
// import TranscriptGenerator from '../../workflows/TranscriptGenerator';
// import BookPriceHistory from '../../workflows/BookPriceHistory';
// import Cosmic3DWorkflowDashboard from '../../workflows/Cosmic3DWorkflowDashboard';
import SentimentAgent from '../../workflows/sentimentagent';

const workflowComponents: { [key: string]: React.ComponentType<any> } = {
    agent_001: AICustomerSupport,
    agent_002: LeavesClassifier,
    // agent_003: DocumentUploadReminder,
    // agent_004: CandidateHiringStatus,
    // agent_005: PayslipAutoEncrypted,
    agent_006: EmailAttachmentProcessing,
    // agent_007: PolicyChangeNotification,
    agent_008: ResumeToProfileExtractor,
    agent_009: ContractRedFlagDetectorCard,
    // agent_010: ProductRecommendationAgent,
    // agent_011: BusinessIntelligenceExplainerBot,
    // agent_012: ProductFeedbackSummarizer,
    // agent_013: DynamicPricingAgent,
    // agent_014: MetricsBusinessAnalytics,
    // agent_015: MonthlyExpenditure,
    // agent_016: FraudDetection,
    agent_017: InventoryManagement,
    agent_018: AppointmentScheduler,
    // agent_019: MCQGeneratorAndTrainer,
    // agent_020: ComplaintHandlerAgent,
    agent_021: SmartInvoiceAI,
    // agent_022: AIPoweredBookPriceTracker,
    // agent_023: AutomateCandidateAcceptance,
    // agent_024: AttendanceAnomalies,
    // agent_025: FetchLeads,
    // agent_026: AITestmonialExtractor,
    // agent_027: DynamicModelSelector,
    // agent_028: AIBackgroundVerification,
    // agent_029: NotionKnowledgeBaseAIAssistant,
    // agent_030: DatabaseMigrationAIAgent,
    // agent_031: ATSToHRMSCandidateStatusSync,
    // agent_032: TestCaseGenerator,
    // agent_033: GmailCategorization,
    agent_034: ResumeAnalyzer,
    agent_035: SentimentAgent,
    agent_036: CustomerSupportAgent,
    // agent_037: PDFSummarizer,
    // agent_038: SalesForecastingAgent,
    // agent_039: LeaveBalanceChatbot,
    // agent_040: PRSummaryAgent,
    // agent_041: PRReviewerAIAgent,
    // agent_042: ProjectCostReports,
    // agent_043: FraudDetectionSystem,
    // agent_044: AmazonProductScraper,
    // agent_045: AIPoweredRestaurantOrderChatbot,
    // agent_046: LeaveApprovalReminder,
    // agent_047: InterviewPanelAutoAssignment,
    // agent_048: PerformanceReviewSummary,
    // agent_049: TranscriptGenerator,
    // agent_050: BookPriceHistory,
    // agent_051: Cosmic3DWorkflowDashboard,
    
};

export function RunAgentPage() {
  const { id } = useParams();
  const WorkflowComponent = id ? workflowComponents[id as string] : undefined;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FFE8DC] via-[#FFD4BD] to-[#FCD2BD] px-4">
      <Button
        variant="ghost"
        onClick={() => window.history.back()}
        className="mb-6 mt-8 self-start hover:bg-muted/50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Agents
      </Button>
      <Card className="w-full max-w-3xl shadow-2xl border border-gray-200 rounded-2xl overflow-hidden">
        <CardHeader className="bg-white px-6 py-5 border-b border-gray-100">
          {/* <CardTitle className="text-2xl font-semibold text-gray-800">Run Agent</CardTitle> */}
        </CardHeader>
        <CardContent className="bg-white px-6 py-8 space-y-6">
          <div className="bg-gradient-to-r from-white via-[#FFF7F2] to-white p-6 rounded-xl border border-gray-100 shadow-inner">
            {WorkflowComponent ? (
              <WorkflowComponent />
            ) : (
              <p className="text-sm text-gray-600">
                No workflow UI found for agent ID:{" "}
                <span className="font-mono font-semibold text-gray-800">{id}</span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 