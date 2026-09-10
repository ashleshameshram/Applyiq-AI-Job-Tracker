import { useState } from 'react'
import { Box } from '@mui/material';
import AIAssistantHeader from './AIAssistantHeader';
import AIAssistantRow from './AIAssistantRow';
import InterviewPrep from './InterviewPrep.jsx'
import InterviewPrepResult from './InterviewPrepResult.jsx';

export default function AIAssistantPage() {
    const [analysisResult, setAnalysisResult] = useState(null);
    const [interviewResult, setInterviewResult] = useState(null);

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            px: { xs: 1.5, sm: 2.5, md: 3 },
            py: { xs: 7.2, sm: 2.5, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 2.5, md: 2 },
        }}>
            <AIAssistantHeader />
            <AIAssistantRow
                setAnalysisResult={setAnalysisResult}
                analysisResult={analysisResult}
            />
            <InterviewPrep setInterviewResult={setInterviewResult} />
            <InterviewPrepResult result={interviewResult} />
        </Box>
    )
}