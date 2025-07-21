import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart as LineChartIcon,
  AlertTriangle,
  Users,
  Calendar,
  Target,
  Percent,
  UploadCloud,
  Loader2,
} from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/common/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/common/ui/card';
import { Input } from '../components/common/ui/input';
import { Label } from '../components/common/ui/label';
import { Progress } from '../components/common/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '../components/common/ui/alert';

interface SalesForecastSummary {
    expected_revenue_range: string;
    risk_of_shortfall: string;
    forecast_this_week: number;
    forecast_this_month: number;
    forecast_this_quarter: number;
    timestamp: string;
    top_5_deals: TopDeal[];
}

interface TopDeal {
    id: string;
    rep: string;
    stage: string;
    value: number;
    confidence: number;
}

interface Visualizations {
    forecast_vs_target: {
        forecast: number;
        target: number;
    };
    stage_funnel: { [key: string]: number };
    region_product_heatmap: { [key: string]: number };
}

interface ForecastData {
    summary: SalesForecastSummary;
    visualizations: Visualizations;
}

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const generateSalesForecast = async (pipelineFile: File, historicalFile: File) => {
    const formData = new FormData();
    if (pipelineFile) {
        formData.append('pipeline', pipelineFile);
    }
    if (historicalFile) {
        formData.append('historical', historicalFile);
    }
    try {
        const response = await axios.post(`${API_BASE_URL}/leads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error generating sales forecast:', error);
        // More specific error from server if available
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Failed to generate sales forecast. Please check files and try again.');
    }
};

const SalesForecastingAgent: React.FC = () => {
    const [pipelineFile, setPipelineFile] = useState<File | null>(null);
    const [historicalFile, setHistoricalFile] = useState<File | null>(null);
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePipelineFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPipelineFile(e.target.files?.[0] || null);
    };

    const handleHistoricalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHistoricalFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pipelineFile || !historicalFile) {
            setError('Both pipeline and historical files are required.');
            return;
        }

        setLoading(true);
        setError(null);
        setForecastData(null);

        try {
            const result = await generateSalesForecast(pipelineFile, historicalFile);
            setForecastData(result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const renderForecastSummary = () => {
        if (!forecastData?.summary) return null;
        const { summary } = forecastData;

        const summaryItems = [
            { icon: LineChartIcon, title: 'Expected Revenue', value: summary.expected_revenue_range, color: 'text-ui-info', bg: 'bg-ui-info/10' },
            { icon: AlertTriangle, title: 'Risk of Shortfall', value: summary.risk_of_shortfall, color: 'text-ui-error', bg: 'bg-ui-error/10' },
            { icon: Calendar, title: 'This Week', value: `₹${summary.forecast_this_week?.toLocaleString()}`, color: 'text-ui-success', bg: 'bg-ui-success/10' },
            { icon: Calendar, title: 'This Month', value: `₹${summary.forecast_this_month?.toLocaleString()}`, color: 'text-ui-purple', bg: 'bg-ui-purple/10' },
            { icon: Calendar, title: 'This Quarter', value: `₹${summary.forecast_this_quarter?.toLocaleString()}`, color: 'text-ui-orange', bg: 'bg-ui-orange/10' },
            { icon: Calendar, title: 'Generated', value: new Date(summary.timestamp).toLocaleString(), color: 'text-text-secondary', bg: 'bg-bg-muted', isDate: true },
        ];

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <LineChartIcon className="mr-2 h-5 w-5 text-brand-primary" />
                        Sales Forecast Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {summaryItems.map((item, index) => (
                            <div key={index} className={`p-4 rounded-lg ${item.bg}`}>
                                <div className="flex items-center mb-2">
                                    <item.icon className={`mr-2 h-4 w-4 flex-shrink-0 ${item.color}`} />
                                    <h4 className={`font-semibold ${item.color}`}>{item.title}</h4>
                                </div>
                                <p className={`font-bold ${item.isDate ? 'text-sm text-text-secondary' : 'text-2xl text-text-primary'}`}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const renderTopDeals = () => {
        if (!forecastData?.summary?.top_5_deals) return null;

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-brand-primary" />
                        Top 5 High-Confidence Deals
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {forecastData.summary.top_5_deals.map((deal, index) => (
                            <div key={deal.id} className="flex items-center justify-between p-3 bg-bg-muted rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-text-primary">Lead #{deal.id}</p>
                                        <p className="text-sm text-text-secondary">Rep: {deal.rep} | Stage: {deal.stage}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-ui-success">₹{deal.value?.toLocaleString()}</p>
                                    <p className="text-sm text-text-secondary">Confidence: {(deal.confidence * 100).toFixed(0)}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const renderVisualizations = () => {
        if (!forecastData?.visualizations) return null;
        const { visualizations } = forecastData;

        return (
            <Card>
                <CardHeader>
                    <CardTitle>Forecast Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-ui-info/10 p-4 rounded-lg">
                            <h4 className="font-semibold text-ui-info mb-3 flex items-center">
                                <Target className="mr-2" />
                                Forecast vs Target
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Forecast:</span>
                                    <span className="font-bold text-text-primary">₹{visualizations.forecast_vs_target?.forecast?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Target:</span>
                                    <span className="font-bold text-text-primary">₹{visualizations.forecast_vs_target?.target?.toLocaleString()}</span>
                                </div>
                                <Progress value={Math.min((visualizations.forecast_vs_target?.forecast / visualizations.forecast_vs_target?.target) * 100, 100)} className="mt-2" />
                                <p className="text-xs text-text-secondary mt-1 text-right">
                                    {((visualizations.forecast_vs_target?.forecast / visualizations.forecast_vs_target?.target) * 100).toFixed(1)}% of target
                                </p>
                            </div>
                        </div>

                        <div className="bg-ui-success/10 p-4 rounded-lg">
                            <h4 className="font-semibold text-ui-success mb-3 flex items-center">
                                <Percent className="mr-2" />
                                Sales Stage Funnel
                            </h4>
                            <div className="space-y-2">
                                {Object.entries(visualizations.stage_funnel || {}).map(([stage, count]) => (
                                    <div key={stage} className="flex justify-between items-center text-sm">
                                        <span className="capitalize">{stage.replace(/_/g, ' ')}:</span>
                                        <span className="font-bold text-text-primary text-base">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {visualizations.region_product_heatmap && Object.keys(visualizations.region_product_heatmap).length > 0 && (
                        <div className="mt-6 bg-ui-purple/10 p-4 rounded-lg">
                            <h4 className="font-semibold text-ui-purple mb-3">Region & Product Distribution</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Object.entries(visualizations.region_product_heatmap).map(([key, count]) => {
                                    const [region, product] = key.split('__');
                                    return (
                                        <div key={key} className="bg-background p-3 rounded-lg shadow-sm">
                                            <p className="font-semibold text-sm text-text-primary">{region || 'Unknown'}</p>
                                            <p className="text-xs text-text-secondary">{product || 'Unknown'}</p>
                                            <p className="text-lg font-bold text-ui-purple">{count}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="bg-background  p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
              

            <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><UploadCloud className="mr-2 h-5 w-5" /> Upload Sales Data</CardTitle>
                        <CardDescription>Provide pipeline and historical data in CSV format.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pipeline-file">Pipeline Data (CSV)</Label>
                                    <Input id="pipeline-file" type="file" accept=".csv" onChange={handlePipelineFileChange} disabled={loading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="historical-file">Historical Data (CSV)</Label>
                                    <Input id="historical-file" type="file" accept=".csv" onChange={handleHistoricalFileChange} disabled={loading} />
                                </div>
                            </div>
                            <div className="flex justify-center pt-4 ">
                                <Button type="submit" disabled={loading || !pipelineFile || !historicalFile} size="lg" className='!bg-brand-primary' >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating Forecast...
                                        </>
                                    ) : 'Generate Sales Forecast'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <AnimatePresence>
                    {forecastData && (
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {renderForecastSummary()}
                            {renderTopDeals()}
                            {renderVisualizations()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SalesForecastingAgent; 