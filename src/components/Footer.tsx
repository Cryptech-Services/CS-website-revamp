'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

type FooterProps = {
  companyName?: string;
  description?: string;
  email?: string;
  location?: string;
  websiteUrl?: string;
};

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'About Us', href: '#about' }
];

const serviceLinks = [
  { label: 'Web Development', href: '#about' },
  { label: 'UI/UX Design', href: '#about' },
  { label: 'Custom IT Solutions', href: '#about' },
  { label: 'IT Consulting', href: '#about' }
];

export default function Footer({
  companyName = 'Cryptech Services',
  description = 'Thoughtful design. Reliable development. Practical technology solutions.',
  email = 'inquiries@cryptech.services',
  location = 'US',
  websiteUrl = 'https://cryptech.services/'
}: FooterProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const primary = theme.colorScale?.[9] ?? theme.palette.primary.main;
  const secondary = theme.secondaryScale?.[9] ?? theme.palette.secondary.main;
  const surface =
    theme.backgroundScale?.[4] ?? theme.palette.background.default;
  const borderColor = theme.backgroundScale?.[3] ?? theme.palette.divider;
  const headingColor = theme.grayScale?.[12] ?? theme.palette.text.primary;
  const mutedColor = theme.grayScale?.[10] ?? theme.palette.text.secondary;

  const linkSx = {
    color: mutedColor,
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 160ms ease, transform 160ms ease',
    width: 'fit-content',
    '&:hover': {
      color: primary,
      transform: 'translateX(2px)'
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: surface,
        color: headingColor,
        borderTop: `2px solid ${borderColor}`,
        isolation: 'isolate'
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          zIndex: -1,
          width: { xs: 220, md: 360 },
          height: { xs: 220, md: 360 },
          borderRadius: '50%',
          right: { xs: -100, md: '8%' },
          top: -190,
          background: `radial-gradient(circle, ${alpha(primary, isDark ? 0.16 : 0.09)} 0%, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />
      {/* IT Network / Circuit Background */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: isDark ? 0.5 : 0.25,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 85%, transparent 100%)'
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            inset: 0
          }}
        >
          <defs>
            <linearGradient
              id="footer-wave-stroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={primary} stopOpacity="0.05" />
              <stop offset="50%" stopColor={primary} stopOpacity="0.65" />
              <stop offset="100%" stopColor={secondary} stopOpacity="0.15" />
            </linearGradient>

            <linearGradient
              id="footer-wave-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={primary}
                stopOpacity={isDark ? 0.1 : 0.06}
              />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </linearGradient>

            <radialGradient id="footer-orbit-glow">
              <stop offset="0%" stopColor={secondary} stopOpacity="0.22" />
              <stop offset="100%" stopColor={secondary} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft translucent wave layer */}
          <path
            d="M0 520 C220 390 330 620 570 470 S950 230 1200 390 S1400 460 1440 380 L1440 700 L0 700 Z"
            fill="url(#footer-wave-fill)"
          />

          {/* Digital particles */}
          <g fill={primary}>
            <circle cx="970" cy="260" r="2.5" opacity="0.8" />
            <circle cx="1090" cy="205" r="1.8" opacity="0.65" />
            <circle cx="1230" cy="390" r="2.5" opacity="0.75" />
            <circle cx="1320" cy="290" r="1.8" opacity="0.6" />
            <circle cx="870" cy="420" r="1.6" opacity="0.55" />
            <circle cx="1150" cy="480" r="2" opacity="0.7" />
            <circle cx="760" cy="300" r="1.5" opacity="0.45" />
          </g>

          {/* Minimal data markers */}
          <g
            fill={secondary}
            opacity="0.55"
            fontFamily="monospace"
            fontSize="10"
          >
            <text x="1000" y="180">
              DATA_STREAM_01
            </text>
            <text x="1190" y="455">
              SYSTEM.ONLINE
            </text>
            <text x="810" y="460">
              01001001
            </text>
          </g>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1.5fr 1fr',
              lg: '1.7fr 1fr 1fr 1.15fr'
            },
            gap: { xs: 4, md: 6 }
          }}
        >
          <Stack spacing={2.2} sx={{ maxWidth: 370 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  position: 'relative',

                  display: 'grid',
                  placeItems: 'center',

                  width: { xs: 40, md: 46 },
                  height: { xs: 40, md: 46 },

                  borderRadius: 2,

                  color: primary,

                  background: `linear-gradient(
                  145deg,
                  ${alpha(primary, 0.16)},
                  ${alpha(secondary, 0.08)}
                )`,

                  border: `1px solid ${alpha(primary, 0.22)}`,

                  flexShrink: 0,

                  transition: 'transform 180ms ease, box-shadow 180ms ease',

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    borderRadius: 2.5,
                    border: `1px solid ${alpha(primary, 0.08)}`,
                    pointerEvents: 'none'
                  },

                  '& .MuiSvgIcon-root': {
                    fontSize: { xs: 23, md: 28 }
                  },

                  'a:hover &': {
                    transform: 'translateY(-1px)',
                    boxShadow: `0 5px 16px ${alpha(primary, 0.12)}`
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      md: '1.8rem'
                    }
                  }}
                >
                  ❖
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.035em',
                    lineHeight: 1.2
                  }}
                >
                  {companyName}
                </Typography>
                <Typography
                  sx={{
                    color: mutedColor,
                    fontSize: '0.72rem',
                    letterSpacing: '0.11em',
                    textTransform: 'uppercase'
                  }}
                >
                  IT &amp; Digital Solutions
                </Typography>
              </Box>
            </Stack>

            <Typography
              sx={{ color: mutedColor, lineHeight: 1.8, fontSize: '0.94rem' }}
            >
              {description}
            </Typography>

            <Stack spacing={1.2}>
              <Stack
                direction="row"
                spacing={1.2}
                sx={{ alignItems: 'center' }}
              >
                <EmailRoundedIcon sx={{ fontSize: 18, color: primary }} />
                <MuiLink href={`mailto:${email}`} sx={linkSx}>
                  {email}
                </MuiLink>
              </Stack>
              <Stack
                direction="row"
                spacing={1.2}
                sx={{ alignItems: 'center' }}
              >
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: primary }} />
                <Typography sx={{ color: mutedColor, fontSize: '0.9rem' }}>
                  {location}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 750, fontSize: '0.95rem' }}>
              Explore
            </Typography>
            <Stack spacing={1.4}>
              {exploreLinks.map((item) => (
                <MuiLink key={item.label} href={item.href} sx={linkSx}>
                  {item.label}
                </MuiLink>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 750, fontSize: '0.95rem' }}>
              What We Do
            </Typography>
            <Stack spacing={1.4}>
              {serviceLinks.map((item) => (
                <MuiLink key={item.label} href={item.href} sx={linkSx}>
                  {item.label}
                </MuiLink>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 750, fontSize: '0.95rem' }}>
              Let’s build something
            </Typography>
            <Typography
              sx={{ color: mutedColor, fontSize: '0.9rem', lineHeight: 1.8 }}
            >
              Have an idea or a project in mind? Let’s talk about how we can
              help.
            </Typography>
            <MuiLink
              href="#contact-form"
              underline="none"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                width: 'fit-content',
                px: 2,
                py: 1.15,
                borderRadius: '12px',
                color: isDark ? headingColor : theme.palette.common.white,
                background: `linear-gradient(110deg, ${primary}, ${secondary})`,
                fontWeight: 700,
                fontSize: '0.88rem',
                transition: 'transform 160ms ease, box-shadow 160ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 24px ${alpha(primary, 0.22)}`
                }
              }}
            >
              Contact Us <ArrowOutwardRoundedIcon sx={{ fontSize: 17 }} />
            </MuiLink>
          </Stack>
        </Box>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ color: mutedColor, fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </Typography>
          <MuiLink
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              ...linkSx,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.6,
              fontSize: '0.82rem'
            }}
          >
            {websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            <ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />
          </MuiLink>
        </Stack>
      </Container>
    </Box>
  );
}
