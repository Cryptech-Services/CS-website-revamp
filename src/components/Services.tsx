'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  useTheme,
  Chip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

type ServicesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
};

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

const services = [
  {
    number: '01',
    title: 'Full-Stack Web Development',
    description:
      'End-to-end web applications built for performance, scalability, and maintainability, from intuitive frontends to reliable backend systems.',
    icon: CodeRoundedIcon,
    tags: ['Frontend', 'Backend', 'APIs']
  },
  {
    number: '02',
    title: 'Web3 & DApp Development',
    description:
      'Decentralized applications that connect modern user experiences with blockchain networks, wallets, and on-chain functionality.',
    icon: TokenRoundedIcon,
    tags: ['Web3', 'DApps', 'Blockchain']
  },
  {
    number: '03',
    title: 'Solidity Development',
    description:
      'Smart contracts designed with clear logic, careful implementation, and security-conscious development practices for EVM-compatible networks.',
    icon: AccountTreeRoundedIcon,
    tags: ['Smart Contracts', 'EVM', 'Testing']
  },
  {
    number: '04',
    title: 'Web Design',
    description:
      'Modern, responsive websites with thoughtful layouts, clear visual hierarchy, and user-centered experiences across devices.',
    icon: WebRoundedIcon,
    tags: ['UI/UX', 'Responsive', 'Prototyping']
  },
  {
    number: '05',
    title: 'Graphic Design',
    description:
      'Distinctive visual assets that help communicate your brand, strengthen your identity, and make your business more recognizable.',
    icon: PaletteRoundedIcon,
    tags: ['Branding', 'Digital Assets', 'Visuals']
  },
  {
    number: '06',
    title: 'Technical Consultation',
    description:
      'Practical technical guidance to evaluate ideas, choose suitable technologies, resolve development challenges, and plan your next steps.',
    icon: SupportAgentRoundedIcon,
    tags: ['Architecture', 'Strategy', 'Guidance']
  }
];

export default function Services({
  eyebrow = 'OUR SERVICES',
  title = 'The right technology for your next big idea.',
  description = 'From building complete web applications to designing digital experiences and developing blockchain solutions, we help turn complex ideas into practical results.',
  email = 'inquiries@cryptech.services'
}: ServicesProps) {
  const theme = useTheme();
  const customTheme = theme;
  const isDark = theme.palette.mode === 'dark';

  const primary = customTheme.colorScale?.[9] ?? theme.palette.primary.main;
  const secondary =
    customTheme.secondaryScale?.[9] ?? theme.palette.secondary.main;
  const headingColor =
    customTheme.grayScale?.[12] ?? theme.palette.text.primary;
  const mutedColor =
    customTheme.grayScale?.[10] ?? theme.palette.text.secondary;
  const surface =
    customTheme.backgroundScale?.[2] ?? theme.palette.background.default;
  const cardSurface =
    customTheme.secondaryScale?.[4] ?? theme.palette.background.paper;
  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  return (
    <Box
      component="section"
      id="services"
      aria-labelledby="services-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        bgcolor: surface,
        color: headingColor
      }}
    >
      {/* Services Circuit Background */}

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: isDark ? 0.25 : 0.16,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',

          '& .services-grid-motion': {
            animation: 'servicesGridDrift 45s linear infinite'
          },

          '& .services-hex-motion': {
            animation: 'servicesHexDrift 55s linear infinite alternate'
          },

          '& .services-glow-motion': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'servicesGlowPulse 9s ease-in-out infinite alternate'
          },

          '& .services-circuit-motion': {
            strokeDasharray: '3 12',
            animation: 'servicesDataFlow 12s linear infinite'
          },

          '& .services-circuit-reverse': {
            strokeDasharray: '2 16',
            animation: 'servicesDataFlowReverse 18s linear infinite'
          },

          '& .services-node-motion': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'servicesNodePulse 4s ease-in-out infinite'
          },

          '& .services-ring-motion': {
            transformBox: 'view-box',
            transformOrigin: '600px 400px',
            animation: 'servicesRingRotate 65s linear infinite'
          },

          '& .services-ring-reverse': {
            transformBox: 'view-box',
            transformOrigin: '600px 400px',
            animation: 'servicesRingReverse 80s linear infinite'
          },

          '& .services-scan': {
            animation: 'servicesScan 10s ease-in-out infinite'
          },

          '& .services-scan-line': {
            strokeDasharray: '2 10',
            animation: 'servicesScanLine 14s linear infinite'
          },

          '@keyframes servicesGridDrift': {
            from: { transform: 'translate3d(0, 0, 0)' },
            to: { transform: 'translate3d(32px, 32px, 0)' }
          },

          '@keyframes servicesHexDrift': {
            from: { transform: 'translate3d(0, 0, 0)' },
            to: { transform: 'translate3d(-27px, 23px, 0)' }
          },

          '@keyframes servicesGlowPulse': {
            from: { opacity: 0.5, transform: 'scale(0.92)' },
            to: { opacity: 1, transform: 'scale(1.1)' }
          },

          '@keyframes servicesDataFlow': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: -180 }
          },

          '@keyframes servicesDataFlowReverse': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: 180 }
          },

          '@keyframes servicesNodePulse': {
            '0%, 100%': { opacity: 0.55, transform: 'scale(0.85)' },
            '50%': { opacity: 1, transform: 'scale(1.25)' }
          },

          '@keyframes servicesRingRotate': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' }
          },

          '@keyframes servicesRingReverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' }
          },

          '@keyframes servicesScan': {
            '0%, 100%': { opacity: 0.2, transform: 'translateY(-18px)' },
            '50%': { opacity: 0.8, transform: 'translateY(18px)' }
          },

          '@keyframes servicesScanLine': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: -120 }
          },

          '@media (prefers-reduced-motion: reduce)': {
            '& *, & *::before, & *::after': {
              animation: 'none !important',
              transition: 'none !important'
            }
          }
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%'
          }}
        >
          <defs>
            <linearGradient
              id="services-circuit-gradient"
              x1="0"
              y1="0"
              x2="1200"
              y2="800"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={primary} stopOpacity="0.05" />
              <stop offset="50%" stopColor={primary} stopOpacity="0.75" />
              <stop offset="100%" stopColor={primary} stopOpacity="0.12" />
            </linearGradient>

            <linearGradient id="services-data-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={primary} stopOpacity="0" />
              <stop offset="50%" stopColor={primary} stopOpacity="1" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </linearGradient>

            <pattern
              id="services-micro-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill={primary} fillOpacity="0.28" />
            </pattern>

            <pattern
              id="services-hex-grid"
              width="54"
              height="46.8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M13.5 0H40.5L54 23.4L40.5 46.8H13.5L0 23.4Z"
                stroke={primary}
                strokeOpacity="0.1"
                strokeWidth="0.8"
                fill="none"
              />
            </pattern>

            <radialGradient id="services-ambient-glow">
              <stop stopColor={primary} stopOpacity="0.2" />
              <stop offset="1" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            <radialGradient id="services-center-glow">
              <stop stopColor={primary} stopOpacity="0.13" />
              <stop offset="1" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            <filter
              id="services-node-glow"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="services-edge-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={primary} stopOpacity="0.06" />
              <stop offset="15%" stopColor={primary} stopOpacity="0" />
              <stop offset="85%" stopColor={primary} stopOpacity="0" />
              <stop offset="100%" stopColor={primary} stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Moving technical grid */}
          <g className="services-grid-motion">
            <rect
              x="-32"
              y="-32"
              width="1264"
              height="864"
              fill="url(#services-micro-grid)"
            />
          </g>

          {/* Moving hexagonal grid */}
          <g className="services-hex-motion">
            <rect
              width="1200"
              height="800"
              fill="url(#services-hex-grid)"
              opacity="0.45"
            />
          </g>

          {/* Ambient light */}
          <ellipse
            className="services-glow-motion"
            cx="1080"
            cy="160"
            rx="310"
            ry="250"
            fill="url(#services-ambient-glow)"
          />

          <ellipse
            className="services-glow-motion"
            cx="100"
            cy="680"
            rx="300"
            ry="230"
            fill="url(#services-ambient-glow)"
            style={{ animationDelay: '-4s' }}
          />

          <circle cx="600" cy="400" r="350" fill="url(#services-center-glow)" />

          {/* Static circuit framework */}
          <g
            stroke="url(#services-circuit-gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            {/* Left circuit pathways */}
            <path d="M0 110H90L126 146H224L260 182H330" />
            <path d="M0 146H60L100 186V260H178L214 296H300" />
            <path d="M0 330H110L150 290H226V244H292L330 206H380" />
            <path d="M0 390H76L116 430H190L226 466H320" />
            <path d="M0 510H120L158 472H244L280 436H350" />
            <path d="M0 630H74L116 588V542H190L224 508H270" />
            <path d="M0 710H142L182 670H250L286 634H362" />
            <path d="M110 0V58L150 98V164" />
            <path d="M246 0V62L282 98V142L324 184" />
            <path d="M72 800V748L112 708V660" />
            <path d="M302 800V750L338 714V676" />

            {/* Right circuit pathways */}
            <path d="M1200 90H1110L1070 130H990L954 166H882" />
            <path d="M1200 170H1140L1098 212V270H1020L982 308H906" />
            <path d="M1200 330H1090L1050 290H974V246H906L870 210H820" />
            <path d="M1200 414H1124L1084 454H1000L962 492H882" />
            <path d="M1200 536H1090L1050 496H964L926 458H850" />
            <path d="M1200 654H1128L1088 614V566H1012L974 528H918" />
            <path d="M1200 730H1058L1018 690H950L914 654H838" />
            <path d="M1090 0V48L1050 88V146" />
            <path d="M954 0V60L918 96V140L876 182" />
            <path d="M1128 800V754L1088 714V668" />
            <path d="M898 800V752L862 716V674" />

            {/* Upper and lower pathways */}
            <path d="M340 0V54L376 90H460L496 126H550" />
            <path d="M650 0V44L614 80H564L530 114" />
            <path d="M470 800V742L510 702H586L620 668H680" />
            <path d="M760 800V740L722 702H672L636 666" />

            {/* Inner connections */}
            <path d="M0 250H42L76 284H132" />
            <path d="M1200 250H1154L1120 284H1066" />
            <path d="M0 570H48L82 604H142" />
            <path d="M1200 590H1152L1118 624H1058" />
          </g>

          {/* Animated data traveling through the circuit network */}
          <g
            className="services-circuit-motion"
            stroke={primary}
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          >
            <path d="M0 110H90L126 146H224L260 182H330" />
            <path d="M0 330H110L150 290H226V244H292L330 206H380" />
            <path d="M0 510H120L158 472H244L280 436H350" />
            <path d="M0 710H142L182 670H250L286 634H362" />

            <path d="M1200 90H1110L1070 130H990L954 166H882" />
            <path d="M1200 330H1090L1050 290H974V246H906L870 210H820" />
            <path d="M1200 536H1090L1050 496H964L926 458H850" />
            <path d="M1200 730H1058L1018 690H950L914 654H838" />
          </g>

          {/* Reverse-flow data pathways */}
          <g
            className="services-circuit-reverse"
            stroke={primary}
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          >
            <path d="M0 146H60L100 186V260H178L214 296H300" />
            <path d="M0 630H74L116 588V542H190L224 508H270" />
            <path d="M1200 170H1140L1098 212V270H1020L982 308H906" />
            <path d="M1200 654H1128L1088 614V566H1012L974 528H918" />

            <path d="M110 0V58L150 98V164" />
            <path d="M1090 0V48L1050 88V146" />
            <path d="M72 800V748L112 708V660" />
            <path d="M1128 800V754L1088 714V668" />
          </g>

          {/* Glowing service nodes */}
          <g
            className="services-node-motion"
            fill={primary}
            filter="url(#services-node-glow)"
          >
            <circle cx="126" cy="146" r="3" />
            <circle cx="224" cy="146" r="2.5" />
            <circle cx="178" cy="260" r="3" />
            <circle cx="226" cy="244" r="2.5" />
            <circle cx="150" cy="430" r="3" />
            <circle cx="244" cy="472" r="2.5" />
            <circle cx="158" cy="472" r="3" />
            <circle cx="190" cy="542" r="2.5" />
            <circle cx="182" cy="670" r="3" />
            <circle cx="150" cy="98" r="2.5" />
            <circle cx="282" cy="98" r="3" />
          </g>

          <g
            className="services-node-motion"
            fill={primary}
            filter="url(#services-node-glow)"
            style={{ animationDelay: '-2s' }}
          >
            <circle cx="1070" cy="130" r="3" />
            <circle cx="990" cy="130" r="2.5" />
            <circle cx="1020" cy="270" r="3" />
            <circle cx="974" cy="246" r="2.5" />
            <circle cx="1084" cy="454" r="3" />
            <circle cx="1000" cy="454" r="2.5" />
            <circle cx="1050" cy="496" r="3" />
            <circle cx="964" cy="566" r="2.5" />
            <circle cx="1018" cy="690" r="3" />
            <circle cx="1050" cy="88" r="2.5" />
            <circle cx="918" cy="96" r="3" />
          </g>

          {/* Upper and lower service data pathways */}
          <g
            className="services-circuit-motion"
            stroke={primary}
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          >
            <path d="M340 0V54L376 90H460L496 126H550" />
            <path d="M650 0V44L614 80H564L530 114" />
            <path d="M470 800V742L510 702H586L620 668H680" />
            <path d="M760 800V740L722 702H672L636 666" />
          </g>

          {/* Central data flow behind the service cards */}
          <g
            className="services-circuit-reverse"
            stroke="url(#services-data-flow)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M330 350H430L454 326H540" />
            <path d="M870 360H770L746 384H660" />
            <path d="M400 560H490L518 532H590" />
            <path d="M800 540H710L682 568H620" />
          </g>

          {/* Connection rings */}
          <g stroke={primary} strokeWidth="1" strokeOpacity="0.65">
            <circle cx="330" cy="206" r="7" />
            <circle cx="330" cy="206" r="3" fill={primary} fillOpacity="0.5" />

            <circle cx="350" cy="436" r="7" />
            <circle cx="350" cy="436" r="3" fill={primary} fillOpacity="0.5" />

            <circle cx="870" cy="210" r="7" />
            <circle cx="870" cy="210" r="3" fill={primary} fillOpacity="0.5" />

            <circle cx="850" cy="458" r="7" />
            <circle cx="850" cy="458" r="3" fill={primary} fillOpacity="0.5" />
          </g>

          {/* Rotating signal rings */}
          <g
            className="services-ring-motion"
            fill="none"
            stroke={primary}
            strokeOpacity="0.22"
            strokeWidth="1"
          >
            <circle cx="600" cy="400" r="145" strokeDasharray="2 12" />
            <circle cx="600" cy="400" r="195" strokeDasharray="4 18" />
            <circle cx="600" cy="400" r="250" strokeDasharray="1 20" />
          </g>

          <g
            className="services-ring-reverse"
            fill="none"
            stroke={primary}
            strokeOpacity="0.16"
            strokeWidth="1"
          >
            <circle cx="600" cy="400" r="170" strokeDasharray="20 16 3 16" />
            <circle cx="770" cy="400" r="3" fill={primary} stroke="none" />
            <circle cx="430" cy="400" r="2" fill={primary} stroke="none" />
          </g>

          {/* Scanning indicator */}
          <g className="services-scan">
            <path
              d="M360 400H840"
              stroke={primary}
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <circle
              cx="600"
              cy="400"
              r="3"
              fill={primary}
              filter="url(#services-node-glow)"
            />
          </g>

          {/* Fine scanning lines */}
          <g
            className="services-scan-line"
            stroke={primary}
            strokeOpacity="0.25"
            strokeWidth="0.8"
            fill="none"
          >
            <path d="M40 350H220" />
            <path d="M980 380H1160" />
            <path d="M420 220H500" />
            <path d="M700 610H780" />
          </g>

          {/* Small signal markers */}
          <g fill={primary} fillOpacity="0.8">
            <rect x="72" y="326" width="3" height="3" rx="0.5" />
            <rect x="1120" y="328" width="3" height="3" rx="0.5" />
            <rect x="455" y="324" width="3" height="3" rx="0.5" />
            <rect x="744" y="382" width="3" height="3" rx="0.5" />
            <rect x="516" y="530" width="3" height="3" rx="0.5" />
            <rect x="680" y="566" width="3" height="3" rx="0.5" />
          </g>

          {/* Fade the extreme edges */}
          <rect width="1200" height="800" fill="url(#services-edge-fade)" />
        </Box>
      </Box>

      <Container maxWidth="xl">
        {/* Section heading */}
        <Stack
          spacing={2.5}
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 760,
            mx: 'auto',
            mb: { xs: 5, md: 8 }
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              alignItems: 'center'
            }}
          >
            <Chip
              icon={<SupportAgentIcon />}
              label={eyebrow}
              variant="outlined"
              sx={{
                borderColor: alpha(primary, 0.4),
                color: primary,
                bgcolor: alpha(primary, 0.06),
                fontWeight: 700,
                letterSpacing: 1.5,
                '& .MuiChip-icon': {
                  color: primary
                }
              }}
            />
          </Stack>

          <Typography
            id="services-heading"
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.055em',
              lineHeight: 1.12
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: mutedColor,
              fontSize: { xs: '0.98rem', md: '1.05rem' },
              lineHeight: 1.9,
              maxWidth: 650
            }}
          >
            {description}
          </Typography>
        </Stack>

        {/* Service cards */}
        <Grid container spacing={2.5}>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Grid key={service.number} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: 320,
                    p: { xs: 2.8, md: 3.2 },
                    overflow: 'hidden',
                    isolation: 'isolate',
                    borderRadius: '22px',
                    border: `1px solid ${borderColor}`,
                    bgcolor: cardSurface,
                    transition:
                      'transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 280ms ease, box-shadow 280ms ease',

                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      zIndex: -2,
                      opacity: isDark ? 0.32 : 0.2,
                      backgroundImage: `linear-gradient(${alpha(
                        primary,
                        isDark ? 0.1 : 0.07
                      )} 1px, transparent 1px), linear-gradient(90deg, ${alpha(
                        primary,
                        isDark ? 0.1 : 0.07
                      )} 1px, transparent 1px)`,
                      backgroundSize: '34px 34px',
                      maskImage:
                        'linear-gradient(to bottom right, black, transparent 75%)',
                      pointerEvents: 'none'
                    },

                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '12%',
                      right: '12%',
                      height: '1px',
                      background: `linear-gradient(90deg, transparent, ${alpha(
                        primary,
                        0.7
                      )}, transparent)`,
                      opacity: 0.5,
                      transition: 'opacity 280ms ease',
                      pointerEvents: 'none'
                    },

                    '&:hover': {
                      transform: 'translateY(-6px)',
                      borderColor: alpha(primary, 0.48),
                      boxShadow: `0 22px 55px ${alpha(
                        headingColor,
                        isDark ? 0.16 : 0.075
                      )}, 0 0 0 1px ${alpha(primary, 0.035)}`
                    },

                    '&:hover::after': {
                      opacity: 1
                    },

                    '&:hover .service-icon': {
                      transform: 'translateY(-2px) scale(1.04)',
                      color: '#FFFFFF',
                      background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                      borderColor: alpha(primary, 0.5),
                      boxShadow: `0 8px 24px ${alpha(primary, 0.24)}`
                    },

                    '&:hover .service-number': {
                      color: primary,
                      borderColor: alpha(primary, 0.28),
                      backgroundColor: alpha(primary, isDark ? 0.12 : 0.07)
                    },

                    '&:hover .service-tag': {
                      borderColor: alpha(primary, 0.22)
                    },

                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'none',
                      '&:hover': {
                        transform: 'none'
                      },
                      '& .service-icon': {
                        transition: 'none'
                      }
                    }
                  }}
                >
                  {/* Ambient corner glow */}
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      top: -85,
                      right: -75,
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(
                        primary,
                        isDark ? 0.19 : 0.09
                      )} 0%, transparent 70%)`,
                      pointerEvents: 'none',
                      zIndex: -1
                    }}
                  />

                  {/* Header */}
                  <Stack
                    direction="row"
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 4
                    }}
                  >
                    <Box
                      className="service-icon"
                      sx={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 56,
                        height: 56,
                        borderRadius: '17px',
                        color: primary,
                        bgcolor: alpha(primary, isDark ? 0.12 : 0.07),
                        border: `1px solid ${alpha(primary, 0.16)}`,
                        transition:
                          'transform 280ms ease, background 280ms ease, color 280ms ease, border-color 280ms ease, box-shadow 280ms ease',

                        '& svg': {
                          fontSize: 27
                        }
                      }}
                    >
                      <Icon />
                    </Box>

                    <Box
                      className="service-number"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        px: 1.2,
                        py: 0.65,
                        borderRadius: '9px',
                        border: `1px solid ${borderColor}`,
                        bgcolor: alpha(headingColor, isDark ? 0.035 : 0.025),
                        transition:
                          'color 220ms ease, background-color 220ms ease, border-color 220ms ease'
                      }}
                    >
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          bgcolor: primary,
                          boxShadow: `0 0 9px ${alpha(primary, 0.5)}`
                        }}
                      />

                      <Typography
                        sx={{
                          color: alpha(mutedColor, 0.85),
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          fontVariantNumeric: 'tabular-nums'
                        }}
                      >
                        {`/${String(service.number).padStart(2, '0')}`}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Service title */}
                  <Typography
                    component="h3"
                    sx={{
                      position: 'relative',
                      color: headingColor,
                      fontWeight: 750,
                      fontSize: { xs: '1.18rem', md: '1.25rem' },
                      letterSpacing: '-0.035em',
                      lineHeight: 1.4,
                      mb: 1.3
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      position: 'relative',
                      color: mutedColor,
                      fontSize: '0.9rem',
                      lineHeight: 1.9,
                      mb: 3.5,
                      maxWidth: '38rem'
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Box sx={{ flexGrow: 1, minHeight: 12 }} />

                  {/* Divider */}
                  <Box
                    aria-hidden="true"
                    sx={{
                      height: '1px',
                      width: '100%',
                      mb: 2.2,
                      background: `linear-gradient(90deg, ${alpha(
                        primary,
                        0.3
                      )}, ${alpha(headingColor, isDark ? 0.1 : 0.07)} 65%, transparent)`
                    }}
                  />

                  {/* Service tags */}
                  <Stack
                    direction="row"
                    sx={{
                      flexWrap: 'wrap',
                      gap: 0.9,
                      alignItems: 'center'
                    }}
                  >
                    {service.tags.map((tag) => (
                      <Box
                        key={tag}
                        className="service-tag"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          px: 1.15,
                          py: 0.65,
                          borderRadius: '8px',
                          bgcolor: alpha(headingColor, isDark ? 0.045 : 0.025),
                          border: `1px solid ${borderColor}`,
                          transition:
                            'border-color 220ms ease, background-color 220ms ease'
                        }}
                      >
                        <Typography
                          sx={{
                            color: mutedColor,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            lineHeight: 1.4,
                            letterSpacing: '0.01em'
                          }}
                        >
                          {tag}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Closing CTA */}
      </Container>
    </Box>
  );
}
