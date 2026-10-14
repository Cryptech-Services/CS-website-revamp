'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import Marquee from 'react-fast-marquee';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const services = [
  'CRYPTOCURRENCY',
  'CYBER SECURITY',
  'BLOCKCHAIN TECHNOLOGY',
  'WEB DESIGN',
  'WEB DEVELOPMENT',
  'TECHNICAL CONSULTATION'
];

export default function HomeMarquee() {
  const theme = useTheme();
  const customTheme = theme;
  const isDark = theme.palette.mode === 'dark';

  const primary = customTheme.colorScale?.[9] ?? theme.palette.primary.main;
  const secondary =
    customTheme.secondaryScale?.[9] ?? theme.palette.secondary.main;
  const text = customTheme.grayScale?.[12] ?? theme.palette.text.primary;
  const background =
    customTheme.secondaryScale?.[5] ?? theme.palette.background.default;

  const renderServices = () =>
    services.map((service, index) => (
      <Box
        key={`${service}-${index}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <Typography
          sx={{
            px: 1,
            color: text,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            fontWeight: 800,
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap'
          }}
        >
          {service}
        </Typography>

        <Typography
          aria-hidden="true"
          sx={{
            mx: { xs: 2, md: 3 },
            color: primary,
            fontSize: '1.25rem',
            lineHeight: 1,
            animation: `${spinAnimation} 5s linear infinite`
          }}
        >
          ❖
        </Typography>
      </Box>
    ));

  return (
    <Box
      component="section"
      aria-label="Our technology services"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '3.5rem', md: '4rem' },
        zIndex: 2,
        marginTop: { xs: 0, md: 2 }
      }}
    >
      {/* Angled background layer */}

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          transform: 'skewY(-2deg)',
          transformOrigin: 'right center',
          background: `linear-gradient(90deg, ${primary}, ${secondary})`,
          opacity: isDark ? 0.95 : 0.9
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          transform: 'skewY(2deg)',
          transformOrigin: 'right center',
          background: `linear-gradient(90deg, ${primary}, ${secondary})`,
          opacity: isDark ? 0.95 : 0.9
        }}
      />

      {/* Scrolling services */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: alpha(background, 0.85),
          borderTop: `1px solid ${alpha(primary, 0.35)}`,
          borderBottom: `1px solid ${alpha(primary, 0.35)}`,
          backdropFilter: 'blur(8px)'
        }}
      >
        <Marquee
          speed={35}
          gradientColor={theme.palette.background.default}
          pauseOnHover
          autoFill
        >
          <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
            {renderServices()}
          </Box>
        </Marquee>
      </Box>
    </Box>
  );
}
