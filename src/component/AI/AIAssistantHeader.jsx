import { Box, Typography, Stack } from '@mui/material';

export default function AIAssistantHeader() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1.25, sm: 1.5, md: 2 }}
      sx={{
        width: '100%',
        minWidth: 0,
        mt: 8,
        alignItems: 'center',
      }}
    >
      {/* Icon */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
      </Box>

      {/* Title + subtitle stacked */}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            color: '#120038',
            lineHeight: 1.4,
            fontSize: { xs: '1.1rem',sm: '1.35rem',md: '1.7rem' },
          }}>
          AI Assistant
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: { xs: '0.72rem', sm: '0.8rem', md: '0.88rem' },
            color: '#6B6478',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: { xs: 2, sm: 1 },
            WebkitBoxOrient: 'vertical',
          }}>
          Smart AI tools to help you apply better and prepare smarter.
        </Typography>
      </Box>
    </Stack>
  );
}