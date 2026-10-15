'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

type AboutUsProps = {
  companyName?: string;
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

const highlights = [
  {
    icon: CodeRoundedIcon,
    title: 'Purposeful Development',
    description:
      'Reliable, maintainable web applications built around real business needs.'
  },
  {
    icon: LayersRoundedIcon,
    title: 'Thoughtful Design',
    description:
      'Clean, intuitive interfaces that make digital experiences easier to use.'
  },
  {
    icon: AutoAwesomeRoundedIcon,
    title: 'Practical Innovation',
    description:
      'Modern technology applied thoughtfully to solve everyday challenges.'
  }
];

export default function AboutUs({
  companyName = 'Cryptech Services',
  eyebrow = 'ABOUT US',
  title = 'Technology should move your business forward.',
  description = 'We help businesses turn ideas into dependable digital experiences through thoughtful design, modern web development, and practical IT solutions.',
  email = 'inquiries@cryptech.services'
}: AboutUsProps) {
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
    customTheme.secondaryScale?.[3] ?? theme.palette.background.default;
  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        bgcolor: surface,
        color: headingColor
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 6, md: 9 }}
          sx={{ alignItems: 'center' }}
        >
          {/* Left: Company introduction */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} sx={{ maxWidth: 600 }}>
              <Stack
                direction="row"
                spacing={1.2}
                sx={{ alignItems: 'center' }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 2,
                    borderRadius: 2,
                    bgcolor: primary
                  }}
                />
                <Typography
                  sx={{
                    color: primary,
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    letterSpacing: '0.16em'
                  }}
                >
                  {eyebrow}
                </Typography>
              </Stack>

              <Typography
                id="about-heading"
                component="h2"
                variant="h2"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.055em',
                  lineHeight: 1.12,
                  maxWidth: 560
                }}
              >
                {title.split('business')[0]}
                {title.includes('business') ? (
                  <>
                    <Box
                      component="span"
                      sx={{
                        background: `linear-gradient(110deg, ${primary}, ${secondary})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      business
                    </Box>
                    {title.split('business').slice(1).join('business')}
                  </>
                ) : null}
              </Typography>

              <Typography
                sx={{
                  color: mutedColor,
                  fontSize: { xs: '1rem', md: '1.05rem' },
                  lineHeight: 1.9,
                  maxWidth: 530
                }}
              >
                {description}
              </Typography>

              <Typography
                sx={{
                  color: mutedColor,
                  fontSize: '0.95rem',
                  lineHeight: 1.9,
                  maxWidth: 530
                }}
              >
                At {companyName}, we believe good technology is more than code.
                It is about understanding people, simplifying complexity, and
                building solutions that create lasting value.
              </Typography>
            </Stack>
          </Grid>

          {/* Right: Digital product illustration */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                maxWidth: 580,
                mx: 'auto',
                width: '100%',

                '@keyframes aboutFloat': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-8px)' }
                },

                '@keyframes aboutGlow': {
                  '0%, 100%': {
                    opacity: isDark ? 0.65 : 0.55,
                    transform: 'scale(0.95)'
                  },
                  '50%': {
                    opacity: 1,
                    transform: 'scale(1.08)'
                  }
                },

                '@keyframes aboutPulse': {
                  '0%, 100%': {
                    filter: 'brightness(1)',
                    opacity: 1
                  },
                  '50%': {
                    filter: 'brightness(1.18)',
                    opacity: 0.88
                  }
                },

                '@keyframes aboutDash': {
                  to: { strokeDashoffset: -36 }
                },

                '@keyframes aboutCardFloat': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-5px)' }
                },

                '@keyframes aboutStatusPulse': {
                  '0%, 100%': {
                    opacity: 1,
                    boxShadow: '0 0 10px rgba(48,164,108,0.35)'
                  },
                  '50%': {
                    opacity: 0.65,
                    boxShadow: '0 0 16px rgba(48,164,108,0.65)'
                  }
                },

                '& .ambient-glow': {
                  animation: 'aboutGlow 5s ease-in-out infinite',
                  transformOrigin: 'center'
                },

                '& .about-art': {
                  animation: 'aboutFloat 6s ease-in-out infinite',
                  overflow: 'visible'
                },

                '& .software-core-fill': {
                  animation: 'aboutPulse 4s ease-in-out infinite',
                  transformOrigin: 'center'
                },

                '& .connection-lines': {
                  animation: 'aboutDash 5s linear infinite'
                },

                '& .approach-card': {
                  animation: 'aboutCardFloat 5s ease-in-out infinite',
                  willChange: 'transform'
                },

                '& .status-indicator': {
                  animation: 'aboutStatusPulse 2.5s ease-in-out infinite'
                },

                '@media (prefers-reduced-motion: reduce)': {
                  '& .ambient-glow, & .about-art, & .software-core-fill, & .connection-lines, & .approach-card, & .status-indicator':
                    {
                      animation: 'none !important',
                      willChange: 'auto'
                    }
                }
              }}
            >
              {/* Soft ambient glow */}
              <Box
                className="ambient-glow"
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  width: '70%',
                  aspectRatio: '1',
                  top: '10%',
                  left: '15%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${alpha(primary, isDark ? 0.17 : 0.1)} 0%, transparent 70%)`,
                  filter: 'blur(12px)',
                  pointerEvents: 'none'
                }}
              />

              {/* Main glass panel */}
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 2, sm: 3 },
                  border: `1px solid ${borderColor}`,
                  borderRadius: { xs: '22px', md: '28px' },
                  bgcolor: alpha(
                    theme.palette.background.paper,
                    isDark ? 0.72 : 0.8
                  ),
                  boxShadow: isDark
                    ? `0 24px 70px ${alpha('#000000', 0.22)}`
                    : `0 24px 70px ${alpha(headingColor, 0.07)}`,
                  backdropFilter: 'blur(16px)',
                  overflow: 'visible'
                }}
              >
                {/* Window header */}
                <Stack
                  direction="row"
                  sx={{
                    pb: 2,
                    borderBottom: `1px solid ${borderColor}`,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction="row" spacing={0.8}>
                    {['#F87171', '#FBBF24', '#34D399'].map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: color
                        }}
                      />
                    ))}
                  </Stack>

                  <Typography
                    sx={{
                      color: mutedColor,
                      fontFamily: 'monospace',
                      fontSize: '0.72rem'
                    }}
                  >
                    digital-solutions.tsx
                  </Typography>

                  <CodeRoundedIcon sx={{ color: primary, fontSize: 19 }} />
                </Stack>

                {/* Animated software architecture illustration */}
                <Box
                  className="about-art"
                  component="svg"
                  viewBox="0 0 480 280"
                  role="img"
                  aria-label="Animated illustration of software architecture and digital solutions"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '100%',
                    height: 'auto',
                    my: 2,
                    overflow: 'visible'
                  }}
                >
                  <defs>
                    <linearGradient
                      id="about-art-gradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={primary}>
                        <animate
                          attributeName="stop-opacity"
                          values="1;0.75;1"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor={secondary}>
                        <animate
                          attributeName="stop-opacity"
                          values="0.8;1;0.8"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>

                  {/* Background geometric planes */}
                  <path
                    d="M240 20 L430 110 L240 200 L50 110 Z"
                    fill={primary}
                    opacity="0.055"
                  />

                  <path
                    d="M240 55 L365 115 L240 175 L115 115 Z"
                    fill="none"
                    stroke={primary}
                    strokeOpacity="0.3"
                    strokeWidth="1"
                  />

                  {/* Left application panel */}
                  <g>
                    <rect
                      x="28"
                      y="52"
                      width="150"
                      height="112"
                      rx="12"
                      fill={theme.palette.background.paper}
                      stroke={borderColor}
                    />

                    <rect
                      x="42"
                      y="66"
                      width="30"
                      height="30"
                      rx="8"
                      fill={primary}
                      fillOpacity="0.14"
                    />

                    <path
                      d="M51 81 L56 86 L64 76"
                      fill="none"
                      stroke={primary}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <rect
                      x="82"
                      y="72"
                      width="74"
                      height="5"
                      rx="2.5"
                      fill={headingColor}
                      fillOpacity="0.55"
                    />

                    <rect
                      x="82"
                      y="83"
                      width="50"
                      height="4"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.2"
                    />

                    <rect
                      x="42"
                      y="111"
                      width="122"
                      height="5"
                      rx="2.5"
                      fill={headingColor}
                      fillOpacity="0.13"
                    />

                    <rect
                      x="42"
                      y="123"
                      width="90"
                      height="5"
                      rx="2.5"
                      fill={headingColor}
                      fillOpacity="0.13"
                    />

                    <rect
                      x="42"
                      y="141"
                      width="65"
                      height="10"
                      rx="4"
                      fill="url(#about-art-gradient)"
                      opacity="0.85"
                    />
                  </g>

                  {/* Animated connection lines behind the core */}
                  <g
                    className="connection-lines"
                    fill="none"
                    stroke="url(#about-art-gradient)"
                    strokeWidth="1.5"
                    strokeDasharray="4 5"
                    opacity="0.8"
                  >
                    <path d="M178 112 L192 112" />
                    <path d="M306 112 L330 112" />
                    <path d="M240 200 L240 218 L342 218" />
                  </g>

                  {/* Central software core */}
                  <g>
                    <rect
                      x="174"
                      y="84"
                      width="132"
                      height="116"
                      rx="18"
                      fill={primary}
                      fillOpacity="0.1"
                      stroke="url(#about-art-gradient)"
                      strokeWidth="1.5"
                    />

                    <rect
                      className="software-core-fill"
                      x="192"
                      y="101"
                      width="96"
                      height="82"
                      rx="12"
                      fill="url(#about-art-gradient)"
                    />

                    <path
                      d="M220 124 L207 142 L220 160 M260 124 L273 142 L260 160 M248 119 L232 165"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  {/* Right design panel */}
                  <g>
                    <rect
                      x="330"
                      y="38"
                      width="122"
                      height="102"
                      rx="12"
                      fill={theme.palette.background.paper}
                      stroke={borderColor}
                    />

                    <rect
                      x="342"
                      y="50"
                      width="98"
                      height="40"
                      rx="7"
                      fill={primary}
                      fillOpacity="0.1"
                    />

                    <circle
                      cx="361"
                      cy="70"
                      r="9"
                      fill="url(#about-art-gradient)"
                      opacity="0.9"
                    />

                    <rect
                      x="378"
                      y="63"
                      width="47"
                      height="4"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.4"
                    />

                    <rect
                      x="378"
                      y="72"
                      width="30"
                      height="4"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.2"
                    />

                    <rect
                      x="342"
                      y="101"
                      width="98"
                      height="5"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.17"
                    />

                    <rect
                      x="342"
                      y="112"
                      width="70"
                      height="5"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.17"
                    />
                  </g>

                  {/* Analytics panel */}
                  <g>
                    <rect
                      x="300"
                      y="222"
                      width="152"
                      height="42"
                      rx="10"
                      fill={theme.palette.background.paper}
                      stroke={borderColor}
                    />

                    <g
                      fill="none"
                      stroke="url(#about-art-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M315 250 L329 239 L341 245 L356 232 L369 238 L383 229" />
                    </g>

                    <circle cx="383" cy="229" r="3" fill={secondary} />

                    <rect
                      x="395"
                      y="234"
                      width="42"
                      height="5"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.3"
                    />

                    <rect
                      x="395"
                      y="245"
                      width="29"
                      height="4"
                      rx="2"
                      fill={headingColor}
                      fillOpacity="0.15"
                    />
                  </g>

                  {/* Floating accent */}
                  <g>
                    <circle
                      cx="107"
                      cy="204"
                      r="17"
                      fill={primary}
                      fillOpacity="0.08"
                    />

                    <path
                      d="M101 204 L106 209 L114 199"
                      fill="none"
                      stroke={primary}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </Box>

                {/* Bottom status */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${borderColor}`,
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Box
                      className="status-indicator"
                      sx={{
                        width: 7,
                        height: 7,
                        flexShrink: 0,
                        borderRadius: '50%',
                        bgcolor: '#30A46C',
                        boxShadow: '0 0 10px rgba(48,164,108,0.35)'
                      }}
                    />

                    <Typography
                      sx={{
                        color: mutedColor,
                        fontSize: '0.76rem'
                      }}
                    >
                      Built for real-world needs
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      color: primary,
                      fontFamily: 'monospace',
                      fontSize: '0.72rem'
                    }}
                  >
                    DESIGN / BUILD / IMPROVE
                  </Typography>
                </Stack>
              </Box>

              {/* Floating approach card */}
              <Box
                className="approach-card"
                sx={{
                  position: 'absolute',
                  left: { xs: -4, sm: -18 },
                  bottom: { xs: -18, sm: 28 },
                  px: 2,
                  py: 1.3,
                  borderRadius: '14px',
                  border: `1px solid ${borderColor}`,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: `0 12px 35px ${alpha(headingColor, 0.08)}`,
                  zIndex: 2
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    color: mutedColor,
                    mb: 0.3
                  }}
                >
                  OUR APPROACH
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 750,
                    fontSize: '0.88rem',
                    color: headingColor
                  }}
                >
                  Simple. Reliable. Scalable.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Core values */}
        <Box
          sx={{
            mt: { xs: 10, md: 14 },
            pt: { xs: 4, md: 5 },
            borderTop: `1px solid ${borderColor}`
          }}
        >
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <Grid key={item.title} size={{ xs: 12, sm: 4 }}>
                  <Stack spacing={1.8}>
                    <Stack
                      direction="row"
                      sx={{ alignItems: 'center' }}
                      spacing={1.5}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                          borderRadius: '13px',
                          color: primary,
                          bgcolor: alpha(primary, isDark ? 0.13 : 0.08),
                          border: `1px solid ${alpha(primary, 0.12)}`
                        }}
                      >
                        <Icon />
                      </Box>

                      <Typography
                        sx={{
                          color: headingColor,
                          fontWeight: 750,
                          fontSize: '1rem'
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        color: mutedColor,
                        fontSize: '0.9rem',
                        lineHeight: 1.85,
                        maxWidth: 340
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
