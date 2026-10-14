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
            'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)'
        }}
      >
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
              />
            </pattern>

            <radialGradient id="services-ambient-glow">
              <stop stopColor={primary} stopOpacity="0.2" />
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
          </defs>

          {/* Subtle technical texture */}
          <rect width="1200" height="800" fill="url(#services-micro-grid)" />
          <path
            d="M0 0H1200V800H0Z"
            fill="url(#services-hex-grid)"
            opacity="0.45"
          />

          {/* Ambient light */}
          <ellipse
            cx="1080"
            cy="160"
            rx="310"
            ry="250"
            fill="url(#services-ambient-glow)"
          />
          <ellipse
            cx="100"
            cy="680"
            rx="300"
            ry="230"
            fill="url(#services-ambient-glow)"
          />

          {/* Left-side circuit network */}
          <g
            stroke="url(#services-circuit-gradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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

            {/* Right-side circuit network */}
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

            {/* Upper and lower data pathways */}
            <path d="M340 0V54L376 90H460L496 126H550" />
            <path d="M650 0V44L614 80H564L530 114" />
            <path d="M470 800V742L510 702H586L620 668H680" />
            <path d="M760 800V740L722 702H672L636 666" />

            {/* Inner service connections */}
            <path d="M0 250H42L76 284H132" />
            <path d="M1200 250H1154L1120 284H1066" />
            <path d="M0 570H48L82 604H142" />
            <path d="M1200 590H1152L1118 624H1058" />
          </g>

          {/* Service nodes */}
          <g fill={primary} filter="url(#services-node-glow)">
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

            <circle cx="376" cy="90" r="2.5" />
            <circle cx="496" cy="126" r="3" />
            <circle cx="510" cy="702" r="2.5" />
            <circle cx="620" cy="668" r="3" />
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

          {/* Central data flow — kept understated behind service cards */}
          <g stroke="url(#services-data-flow)" strokeWidth="1">
            <path d="M330 350H430L454 326H540" />
            <path d="M870 360H770L746 384H660" />
            <path d="M400 560H490L518 532H590" />
            <path d="M800 540H710L682 568H620" />
          </g>

          {/* Fine scanning lines */}
          <g stroke={primary} strokeOpacity="0.18" strokeWidth="0.7">
            <path d="M40 350H220" strokeDasharray="2 8" />
            <path d="M980 380H1160" strokeDasharray="2 8" />
            <path d="M420 220H500" strokeDasharray="2 6" />
            <path d="M700 610H780" strokeDasharray="2 6" />
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
        </svg>
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
                    minHeight: 310,
                    p: { xs: 2.8, md: 3.2 },
                    overflow: 'hidden',
                    borderRadius: '22px',
                    border: `1px solid ${borderColor}`,
                    bgcolor: cardSurface,
                    transition:
                      'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      borderColor: alpha(primary, 0.45),
                      boxShadow: `0 20px 55px ${alpha(
                        headingColor,
                        isDark ? 0.13 : 0.07
                      )}`
                    },
                    '&:hover .service-icon': {
                      transform: 'scale(1.06) rotate(-4deg)',
                      background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                      color: '#FFFFFF'
                    },
                    '&:hover .service-arrow': {
                      color: primary,
                      transform: 'translate(3px, -3px)'
                    }
                  }}
                >
                  {/* Corner accent */}
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      top: -65,
                      right: -65,
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(
                        primary,
                        isDark ? 0.12 : 0.07
                      )} 0%, transparent 70%)`,
                      pointerEvents: 'none'
                    }}
                  />

                  <Stack
                    direction="row"
                    sx={{
                      position: 'relative',
                      mb: 3.5,
                      justifyContent: 'space-between',
                      alignItems: 'flex-start'
                    }}
                  >
                    <Box
                      className="service-icon"
                      sx={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 54,
                        height: 54,
                        borderRadius: '16px',
                        color: primary,
                        bgcolor: alpha(primary, isDark ? 0.13 : 0.08),
                        border: `1px solid ${alpha(primary, 0.12)}`,
                        transition:
                          'transform 220ms ease, background 220ms ease, color 220ms ease'
                      }}
                    >
                      <Icon sx={{ fontSize: 27 }} />
                    </Box>

                    <Typography
                      sx={{
                        color: alpha(mutedColor, 0.7),
                        fontFamily: 'monospace',
                        fontSize: '0.78rem',
                        letterSpacing: '0.04em'
                      }}
                    >
                      /{service.number}
                    </Typography>
                  </Stack>

                  <Typography
                    component="h3"
                    sx={{
                      position: 'relative',
                      fontWeight: 750,
                      fontSize: '1.2rem',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.4,
                      mb: 1.5
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    sx={{
                      position: 'relative',
                      color: mutedColor,
                      fontSize: '0.9rem',
                      lineHeight: 1.85,
                      mb: 3
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Box sx={{ flexGrow: 1 }} />

                  {/* Service tags */}
                  <Stack
                    direction="row"
                    sx={{ mb: 2.5, flexWrap: 'wrap', gap: 0.8 }}
                  >
                    {service.tags.map((tag) => (
                      <Box
                        key={tag}
                        sx={{
                          px: 1.1,
                          py: 0.55,
                          borderRadius: '7px',
                          bgcolor: alpha(headingColor, isDark ? 0.06 : 0.035),
                          border: `1px solid ${borderColor}`
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.7rem',
                            color: mutedColor,
                            fontWeight: 600
                          }}
                        >
                          {tag}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  {/* <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: `1px solid ${borderColor}`
                    }}
                  >
                    <Typography
                      sx={{
                        color: mutedColor,
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}
                    >
                      Explore service
                    </Typography>

                    <ArrowOutwardRoundedIcon
                      className="service-arrow"
                      sx={{
                        color: mutedColor,
                        fontSize: 19,
                        transition: 'transform 180ms ease, color 180ms ease'
                      }}
                    />
                  </Box> */}
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
