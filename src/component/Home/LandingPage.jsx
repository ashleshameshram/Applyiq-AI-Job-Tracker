import { Box, Typography, Button, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

export default function LandingPage() {
  const navigate = useNavigate();
    const drift = keyframes`
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    `;

    const features = [
        { icon: DescriptionOutlinedIcon, label: 'Resume match score' },
        { icon: ForumOutlinedIcon, label: 'AI interview prep' },
        { icon: BoltOutlinedIcon, label: 'Track every stage' },
    ];

    return(
        <Box
      sx={{
        minHeight: '100vh',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', md: 'center' },
        textAlign: 'center',
        px: { xs: 3, sm: 2.5, md: 3 },
        pt: { xs: 17, sm: 13, md: 0 },
        pb: { xs: 4, md: 0 },
        backgroundImage:
          'linear-gradient(120deg, #0B1F2A 0%, #1B1035 35%, #2A1B45 55%, #0B1F2A 100%)',
        backgroundSize: '300% 300%',
        animation: `${drift} 16s ease-in-out infinite`,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      }}
    >
      {/* Eyebrow badge */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: { xs: 1.5, sm: 1.75 },
          py: { xs: 0.55, sm: 0.6 },
          borderRadius: '100px',
          border: '1px solid rgba(232,152,94,0.35)',
          background: 'rgba(232,152,94,0.08)',
          mb: { xs: 2, sm: 3, md: 3.5 },
        }}
      >
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#E8985E' }} />
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontSize: { xs: '0.62rem', sm: '0.7rem', md: '0.76rem' },
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#E8985E',
            fontWeight: 600,
          }}
        >
          ApplyIQ · AI Job Tracker
        </Typography>
      </Box>

      {/* Headline — two-part hierarchy */}
      <Box sx={{ mb: { xs: 2, sm: 3, md: 3.5 } }}>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '1.55rem', sm: '2.1rem', md: '3rem' },
            lineHeight: { xs: 1.3, sm: 1.2, md: 1.12 },
            color: '#F4EFE6',
          }}
        >
          Track every job application.
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '1.55rem', sm: '2.1rem', md: '3rem' },
            lineHeight: { xs: 1.3, sm: 1.2, md: 1.12 },
            background: 'linear-gradient(90deg, #E8985E 0%, #F0AB78 60%, #E8985E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Let AI handle the busywork.
        </Typography>
      </Box>

      {/* Subtext */}
      <Typography
        sx={{
          fontFamily: "'Inter', sans-serif",
          fontSize: { xs: '0.8rem', sm: '0.92rem', md: '1.05rem' },
          lineHeight: 1.6,
          color: '#A9B8BC',
          maxWidth: { xs: 300, sm: 440, md: 560 },
          mb: { xs: 3, sm: 3.5, md: 4 },
        }}
      >
        ApplyIQ keeps every application, its stage, and what to do next in one
        place — with AI that scores your resume against the job description
        and preps you for the interview.
      </Typography>

      {/* CTAs */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{ width: { xs: '100%', sm: 'auto' }, 
        maxWidth: { xs: 260, sm: 'none' }, mb: { xs: 8, sm: 4.5, md: 8 } }}
      >
        <Button
         onClick={() => navigate('/myapplications')}
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '0.82rem', sm: '0.88rem', md: '0.95rem' },
            px: { xs: 2.5, sm: 3, md: 3.5 },
            py: { xs: 1.1, sm: 1.1, md: 1.3 },
            borderRadius: '100px',
            color: '#0B1F2A',
            background: '#E8985E',
            boxShadow: '0 10px 24px -8px rgba(232,152,94,0.45)',
            '&:hover': { background: '#F0AB78', boxShadow: '0 12px 28px -8px rgba(232,152,94,0.55)' },
          }}
        >
          Add your first application
        </Button>
        <Button
          onClick={() => navigate('/ai-assistant')}
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '0.82rem', sm: '0.88rem', md: '0.95rem' },
            px: { xs: 2.5, sm: 3, md: 3.5 },
            py: { xs: 1.1, sm: 1.1, md: 1.3 },
            borderRadius: '100px',
            color: '#F4EFE6',
            border: '1px solid rgba(244,239,230,0.25)',
            '&:hover': { borderColor: '#E8985E', background: 'rgba(232,152,94,0.08)' },
          }}
        >
          Ask the AI Assistant
        </Button>
      </Stack>

      {/* Feature highlights strip — always a single row */}
      <Stack
        direction="row"
        spacing={{ xs: 1.35, sm: 3.5, md: 4 }}
        alignItems="center"
        divider={
          <Box sx={{
            width: '1px',
            height: { xs: 12, sm: 16 },
            background: 'rgba(244,239,230,0.2)',
          }} />
        }
      >
        {features.map(({ icon: Icon, label }) => (
          <Stack key={label} direction="row" spacing={0.5} alignItems="center" justifyContent="center">
            <Icon sx={{ fontSize: { xs: 13, sm: 16 }, color: '#E8985E' }} />
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: { xs: '0.62rem', sm: '0.78rem' },
                color: '#A9B8BC',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Typography>
          </Stack>
        ))}
      </Stack>
        </Box>
    )
}