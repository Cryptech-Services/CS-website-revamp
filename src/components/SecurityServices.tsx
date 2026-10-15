'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import {
  ArrowForwardRounded,
  CheckCircleRounded,
  ShieldRounded,
  SecurityRounded,
  VerifiedUserRounded,
  TerminalRounded,
  BugReportRounded,
  GppGoodRounded,
  MonitorHeartRounded
} from '@mui/icons-material';

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

const securityTiers = [
  {
    name: 'Standard',
    subtitle: 'Identify vulnerabilities and take action.',
    description:
      'Get a report of website vulnerabilities and a VPS penetration test, with basic resources to help you remedy identified security issues.',
    icon: ShieldRounded,
    features: [
      'Website vulnerability assessment report',
      'VPS penetration testing',
      'Report of identified security issues',
      'Basic self-remediation resources'
    ],
    label: 'Essential security review',
    featured: false
  },
  {
    name: 'Deluxe',
    subtitle: 'Security insights with hands-on guidance.',
    description:
      'Get website vulnerability reporting and VPS penetration testing, plus personalized one-on-one support to help you address identified security issues.',
    icon: SecurityRounded,
    features: [
      'Website vulnerability assessment report',
      'VPS penetration testing',
      'Basic self-remediation resources',
      'One-on-one remediation support',
      'Guidance for resolving security issues',
      'Support allowance subject to agreed scope³'
    ],
    label: 'Hands-on support',
    featured: true
  },
  {
    name: 'Deluxe LTS',
    subtitle: 'Ongoing security oversight, month after month.',
    description:
      'Maintain ongoing security awareness with monthly website vulnerability reports, VPS penetration testing, server CVE lists, and one-on-one remediation support.',
    icon: VerifiedUserRounded,
    features: [
      'Monthly website vulnerability report',
      'Monthly VPS penetration testing',
      'Monthly list of server-related CVEs',
      'Basic self-remediation resources',
      'Monthly one-on-one remediation support',
      'Support subject to agreed scope³'
    ],
    label: 'Ongoing monthly protection',
    featured: false
  }
];

const securityCapabilities = [
  {
    icon: BugReportRounded,
    title: 'Website Vulnerability Reports',
    description:
      'Identify potential website weaknesses through structured assessments and receive reports with practical self-remediation resources.'
  },
  {
    icon: TerminalRounded,
    title: 'VPS Penetration Testing',
    description:
      'Assess the security of your VPS and identify potential weaknesses in server configuration, exposed services, and system hardening.'
  },
  {
    icon: MonitorHeartRounded,
    title: 'Monthly Security Reviews',
    description:
      'Maintain visibility into your security posture through recurring vulnerability reports and server-related CVE information.'
  },
  {
    icon: GppGoodRounded,
    title: 'Remediation Support',
    description:
      'Get one-on-one guidance to help resolve identified website, application, and web-server security issues.'
  }
];

const generalNotes = [
  '¹ Final price may be adjusted or negotiated after review of the report(s).',
  '² Additional time may be arranged and allotted as the service expiration date approaches.',
  '³ Final pricing may be adjusted if support hours exceed 8 hours.',
  '⁴ Currency denomination may be negotiated.'
];

export default function SecurityServices() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const primary = theme.colorScale?.[9] ?? theme.palette.primary.main;

  const secondary = theme.secondaryScale?.[9] ?? theme.palette.secondary.main;

  const headingColor = theme.grayScale?.[12] ?? theme.palette.text.primary;

  const mutedColor = theme.grayScale?.[10] ?? theme.palette.text.secondary;

  const surface =
    theme.backgroundScale?.[2] ?? theme.palette.background.default;

  const cardSurface =
    theme.secondaryScale?.[4] ?? theme.palette.background.paper;

  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <Box
      component="section"
      id="security"
      aria-labelledby="security-heading"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        bgcolor: surface,
        color: headingColor
      }}
    >
      {/* Cybersecurity circuit background */}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          zIndex: -1
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',

            '& .orbit-rotation': {
              transformBox: 'view-box',
              transformOrigin: '600px 340px',
              animation: 'targetOrbit 36s linear infinite'
            },

            '& .orbit-reverse': {
              transformBox: 'view-box',
              transformOrigin: '600px 340px',
              animation: 'targetOrbitReverse 48s linear infinite'
            },

            '& .target-pulse': {
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: 'targetPulse 2.5s ease-in-out infinite'
            },

            '& .target-beam': {
              animation: 'targetBeam 3s ease-in-out infinite'
            },

            '& .target-scan': {
              animation: 'targetScan 5s ease-in-out infinite'
            },

            '& .countdown-ring': {
              strokeDasharray: '8 7',
              animation: 'countdownSweep 10s linear infinite'
            },

            '& .telemetry-flow': {
              strokeDasharray: '4 12',
              animation: 'telemetryFlow 9s linear infinite'
            },

            '& .star-twinkle': {
              animation: 'starTwinkle 4s ease-in-out infinite alternate'
            },

            '@keyframes targetOrbit': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' }
            },

            '@keyframes targetOrbitReverse': {
              from: { transform: 'rotate(360deg)' },
              to: { transform: 'rotate(0deg)' }
            },

            '@keyframes targetPulse': {
              '0%, 100%': {
                opacity: 0.55,
                transform: 'scale(0.85)'
              },
              '50%': {
                opacity: 1,
                transform: 'scale(1.2)'
              }
            },

            '@keyframes targetBeam': {
              '0%, 100%': { opacity: 0.2 },
              '50%': { opacity: 0.8 }
            },

            '@keyframes targetScan': {
              '0%': { transform: 'translateY(-110px)', opacity: 0 },
              '15%': { opacity: 0.8 },
              '85%': { opacity: 0.8 },
              '100%': { transform: 'translateY(110px)', opacity: 0 }
            },

            '@keyframes countdownSweep': {
              from: { strokeDashoffset: 0 },
              to: { strokeDashoffset: -300 }
            },

            '@keyframes telemetryFlow': {
              from: { strokeDashoffset: 0 },
              to: { strokeDashoffset: -160 }
            },

            '@keyframes starTwinkle': {
              from: { opacity: 0.25 },
              to: { opacity: 0.9 }
            },

            '@media (prefers-reduced-motion: reduce)': {
              '& *, & *::before, & *::after': {
                animation: 'none !important'
              }
            }
          }}
        >
          <defs>
            <linearGradient
              id="target-beam-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={primary} stopOpacity="0" />
              <stop offset="50%" stopColor={primary} stopOpacity="0.5" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </linearGradient>

            <radialGradient id="target-ground-glow">
              <stop offset="0%" stopColor={primary} stopOpacity="0.9" />
              <stop offset="35%" stopColor={primary} stopOpacity="0.25" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            <radialGradient id="target-sky-glow">
              <stop offset="0%" stopColor={primary} stopOpacity="0.15" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            <pattern
              id="earth-coordinate-grid"
              width="44"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M44 0H0V44"
                fill="none"
                stroke={primary}
                strokeOpacity="0.12"
                strokeWidth="0.7"
              />
            </pattern>

            <filter
              id="target-glow"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="earth-clip">
              <path d="M-100 800 Q600 290 1300 800Z" />
            </clipPath>
          </defs>

          {/* SKY */}
          <rect width="1200" height="800" fill="url(#earth-sky)" />

          {/* Distant stars */}
          <g fill="#D6F5FF">
            {[
              [92, 96, 1.4],
              [182, 210, 1],
              [270, 78, 1.3],
              [385, 164, 1],
              [485, 65, 1.4],
              [716, 90, 1],
              [824, 178, 1.3],
              [935, 82, 1.5],
              [1030, 220, 1],
              [1120, 106, 1.2],
              [103, 320, 1],
              [1080, 340, 1.1],
              [340, 285, 1],
              [900, 275, 1]
            ].map(([cx, cy, r], index) => (
              <circle
                key={index}
                className="star-twinkle"
                cx={cx}
                cy={cy}
                r={r}
                style={{ animationDelay: `${index * -0.4}s` }}
              />
            ))}
          </g>

          {/* Earth coordinate grid */}
          <g clipPath="url(#earth-clip)">
            <rect
              x="0"
              y="360"
              width="1200"
              height="440"
              fill="url(#earth-coordinate-grid)"
            />

            <ellipse
              cx="600"
              cy="650"
              rx="490"
              ry="150"
              fill="none"
              stroke={primary}
              strokeOpacity="0.22"
            />

            <ellipse
              cx="600"
              cy="650"
              rx="310"
              ry="150"
              fill="none"
              stroke={primary}
              strokeOpacity="0.2"
            />

            <ellipse
              cx="600"
              cy="650"
              rx="130"
              ry="150"
              fill="none"
              stroke={primary}
              strokeOpacity="0.2"
            />

            <path
              d="M0 650H1200 M0 710H1200 M0 760H1200"
              stroke={primary}
              strokeOpacity="0.13"
              fill="none"
            />
          </g>

          {/* Target location glow */}
          <ellipse
            cx="600"
            cy="625"
            rx="190"
            ry="100"
            fill="url(#target-ground-glow)"
          />

          {/* Sky-to-ground targeting beam */}
          <g className="target-beam">
            <path
              d="M600 100 L565 625 L635 625Z"
              fill="url(#target-beam-gradient)"
            />

            <path
              d="M600 90V625"
              stroke={primary}
              strokeWidth="1.5"
              strokeOpacity="0.9"
              strokeDasharray="4 8"
            />
          </g>

          {/* Telemetry paths */}
          <g
            className="telemetry-flow"
            fill="none"
            stroke={primary}
            strokeWidth="1.2"
            opacity="0.85"
          >
            <path d="M0 230H230L280 280H440L480 320H600" />
            <path d="M1200 220H980L930 270H770L730 310H600" />
            <path d="M0 420H190L230 460H410L450 500H600" />
            <path d="M1200 410H1010L970 450H790L750 490H600" />
          </g>

          {/* Orbital tracking rings */}
          <g className="orbit-rotation">
            <ellipse
              cx="600"
              cy="340"
              rx="230"
              ry="76"
              transform="rotate(-24 600 340)"
              fill="none"
              stroke={primary}
              strokeOpacity="0.55"
              strokeWidth="1"
              strokeDasharray="3 8"
            />

            <ellipse
              cx="600"
              cy="340"
              rx="190"
              ry="110"
              transform="rotate(35 600 340)"
              fill="none"
              stroke={primary}
              strokeOpacity="0.28"
              strokeWidth="1"
            />

            <circle cx="830" cy="340" r="4" fill={primary} />
            <circle cx="410" cy="340" r="3" fill={primary} />
          </g>

          <g className="orbit-reverse">
            <ellipse
              cx="600"
              cy="340"
              rx="155"
              ry="215"
              transform="rotate(55 600 340)"
              fill="none"
              stroke={primary}
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="18 12 3 12"
            />

            <circle cx="600" cy="125" r="3" fill={primary} />
            <circle cx="600" cy="555" r="3" fill={primary} />
          </g>

          {/* Main targeting HUD */}
          <g
            stroke={primary}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="600"
              cy="340"
              r="105"
              strokeOpacity="0.75"
              strokeWidth="1.2"
            />

            <circle
              cx="600"
              cy="340"
              r="90"
              strokeOpacity="0.35"
              strokeDasharray="2 6"
            />

            <circle
              cx="600"
              cy="340"
              r="73"
              strokeOpacity="0.55"
              strokeDasharray="20 10 3 10"
            />

            {/* Targeting crosshair */}
            <path d="M600 210V260 M600 420V470" strokeWidth="1.5" />
            <path d="M470 340H520 M680 340H730" strokeWidth="1.5" />

            {/* Corner targeting brackets */}
            <path d="M520 275V260H535" strokeWidth="2" />
            <path d="M665 260H680V275" strokeWidth="2" />
            <path d="M520 405V420H535" strokeWidth="2" />
            <path d="M665 420H680V405" strokeWidth="2" />

            {/* Countdown progress ring */}
            <circle
              className="countdown-ring"
              cx="600"
              cy="340"
              r="60"
              strokeWidth="2"
              strokeOpacity="0.9"
            />

            {/* Countdown tick marks */}
            {Array.from({ length: 60 }, (_, index) => {
              const angle = (index * 6 * Math.PI) / 180;
              const innerRadius = index % 5 === 0 ? 113 : 117;
              const outerRadius = 122;

              return (
                <line
                  key={index}
                  x1={600 + Math.cos(angle) * innerRadius}
                  y1={340 + Math.sin(angle) * innerRadius}
                  x2={600 + Math.cos(angle) * outerRadius}
                  y2={340 + Math.sin(angle) * outerRadius}
                  strokeOpacity={index % 5 === 0 ? 0.8 : 0.3}
                  strokeWidth={index % 5 === 0 ? 1.4 : 0.7}
                />
              );
            })}
          </g>

          {/* Animated scan sweep */}
          <g className="target-scan">
            <path
              d="M505 340H695"
              stroke={primary}
              strokeWidth="1"
              strokeOpacity="0.75"
              strokeDasharray="3 5"
            />

            <circle
              cx="600"
              cy="340"
              r="35"
              stroke={primary}
              strokeWidth="1"
              strokeOpacity="0.5"
              fill="none"
            />
          </g>

          {/* Ground impact / destination reticle */}
          <g
            transform="translate(600 625)"
            stroke={primary}
            fill="none"
            strokeLinecap="round"
          >
            <circle r="44" strokeOpacity="0.35" strokeDasharray="3 7" />
            <circle r="27" strokeOpacity="0.8" strokeWidth="1.3" />
            <circle r="12" strokeOpacity="0.9" strokeWidth="1.5" />

            <path d="M-65 0H-35 M35 0H65 M0 -65V-35 M0 35V65" />
            <path d="M-8 -8L8 8 M8 -8L-8 8" strokeWidth="1.2" />

            <circle
              className="target-pulse"
              r="5"
              fill={primary}
              stroke="none"
              filter="url(#target-glow)"
            />
          </g>

          {/* Side targeting indicators */}
          <g fill="none" stroke={primary} strokeWidth="1" strokeOpacity="0.65">
            <path d="M55 390H130L150 370H205" />
            <path d="M1145 390H1070L1050 370H995" />

            <circle cx="205" cy="370" r="3" fill={primary} />
            <circle cx="995" cy="370" r="3" fill={primary} />
          </g>
        </Box>
      </Box>

      <Container maxWidth="xl">
        {/* Section heading */}
        <Stack
          spacing={2}
          sx={{
            mb: { xs: 6, md: 8 },
            maxWidth: 800,
            mx: 'auto',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Chip
            icon={<SecurityRounded />}
            label="SECURITY SERVICES"
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

          <Typography
            id="security-heading"
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1.08
            }}
          >
            Security that works{' '}
            <Box
              component="span"
              sx={{
                color: primary,
                display: 'inline'
              }}
            >
              behind the scenes.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: mutedColor,
              maxWidth: 660,
              lineHeight: 1.9
            }}
          >
            From essential vulnerability assessments to ongoing server security
            support, we help you identify weaknesses, understand your risks, and
            take practical steps toward a more secure environment.
          </Typography>
        </Stack>

        {/* Security tiers */}
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {securityTiers.map((tier) => {
            const TierIcon = tier.icon;
            const isHovered = hoveredTier === tier.name;

            return (
              <Grid
                key={tier.name}
                size={{ xs: 12, md: 4 }}
                sx={{ display: 'flex' }}
              >
                <Box
                  onMouseEnter={() => setHoveredTier(tier.name)}
                  onMouseLeave={() => setHoveredTier(null)}
                  sx={{
                    width: '100%',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 3, md: 3.5 },
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: tier.featured
                      ? alpha(primary, 0.65)
                      : borderColor,
                    bgcolor: cardSurface,
                    backdropFilter: 'blur(16px)',
                    boxShadow: tier.featured
                      ? `0 16px 60px ${alpha(primary, 0.12)}`
                      : 'none',
                    transform:
                      isHovered && !tier.featured
                        ? 'translateY(-5px)'
                        : 'translateY(0)',
                    transition:
                      'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
                    '&:hover': {
                      borderColor: alpha(primary, 0.65),
                      boxShadow: `0 16px 48px ${alpha(
                        primary,
                        isDark ? 0.16 : 0.1
                      )}`,
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  {tier.featured && (
                    <Chip
                      label="RECOMMENDED"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 800,
                        fontSize: '0.65rem',
                        letterSpacing: 0.8,
                        bgcolor: primary,
                        color: theme.palette.getContrastText(primary)
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 3,
                      color: primary,
                      bgcolor: alpha(primary, isDark ? 0.13 : 0.1),
                      border: '1px solid',
                      borderColor: alpha(primary, 0.2),
                      mb: 3
                    }}
                  >
                    <TierIcon sx={{ fontSize: 30 }} />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      color: headingColor,
                      fontWeight: 800,
                      mb: 0.75
                    }}
                  >
                    {tier.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: primary,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      mb: 1.5
                    }}
                  >
                    {tier.subtitle}
                  </Typography>

                  <Typography
                    sx={{
                      color: mutedColor,
                      lineHeight: 1.8,
                      fontSize: '0.9rem',
                      minHeight: { md: 112 },
                      mb: 3
                    }}
                  >
                    {tier.description}
                  </Typography>

                  <Box
                    sx={{
                      height: '1px',
                      bgcolor: alpha(headingColor, isDark ? 0.13 : 0.1),
                      mb: 3
                    }}
                  />

                  <Stack spacing={1.75} sx={{ mb: 4, flexGrow: 1 }}>
                    {tier.features.map((feature) => (
                      <Stack
                        key={feature}
                        direction="row"
                        spacing={1.25}
                        sx={{ alignItems: 'flex-start' }}
                      >
                        <CheckCircleRounded
                          sx={{
                            color: primary,
                            fontSize: 19,
                            mt: '2px',
                            flexShrink: 0
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            lineHeight: 1.65,
                            color: headingColor
                          }}
                        >
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Chip
                    label={tier.label}
                    size="small"
                    variant="outlined"
                    sx={{
                      alignSelf: 'flex-start',
                      mb: 2.5,
                      borderColor: alpha(primary, 0.25),
                      color: mutedColor
                    }}
                  />

                  <Button
                    fullWidth
                    variant={tier.featured ? 'contained' : 'outlined'}
                    endIcon={<ArrowForwardRounded />}
                    href="#contact-form"
                    sx={{
                      py: 1.35,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      ...(tier.featured
                        ? {
                            bgcolor: primary,
                            '&:hover': {
                              bgcolor: theme.palette.primary.dark
                            }
                          }
                        : {
                            borderColor: alpha(primary, 0.4),
                            '&:hover': {
                              borderColor: primary,
                              bgcolor: alpha(primary, 0.06)
                            }
                          })
                    }}
                  >
                    Discuss Your Security Needs
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Capabilities */}
        <Box sx={{ mt: { xs: 9, md: 12 } }}>
          <Stack
            spacing={1.5}
            sx={{
              mb: 5,
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: primary,
                fontWeight: 800,
                letterSpacing: 2
              }}
            >
              OUR CAPABILITIES
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.03em',
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              Protection at every layer
            </Typography>

            <Typography
              sx={{
                maxWidth: 600,
                color: mutedColor,
                lineHeight: 1.8
              }}
            >
              Practical security services designed around your website, VPS
              infrastructure, and remediation requirements.
            </Typography>
          </Stack>

          <Grid container spacing={2.5}>
            {securityCapabilities.map((capability) => {
              const CapabilityIcon = capability.icon;

              return (
                <Grid key={capability.title} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Stack
                    spacing={1.5}
                    sx={{
                      height: '100%',
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: alpha(headingColor, isDark ? 0.13 : 0.1),
                      bgcolor: cardSurface,
                      transition:
                        'transform 180ms ease, border-color 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: alpha(primary, 0.55)
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 2,
                        color: primary,
                        bgcolor: alpha(primary, 0.1)
                      }}
                    >
                      <CapabilityIcon />
                    </Box>

                    <Typography
                      sx={{
                        color: headingColor,
                        fontWeight: 750
                      }}
                    >
                      {capability.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: mutedColor,
                        fontSize: '0.875rem',
                        lineHeight: 1.8
                      }}
                    >
                      {capability.description}
                    </Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* General notes */}
        <Box
          component="aside"
          aria-label="Security service terms and notes"
          sx={{
            mt: { xs: 5, md: 7 },
            p: { xs: 2.5, md: 3.5 },
            border: '1px solid',
            borderColor,
            borderRadius: 3,
            bgcolor: alpha(cardSurface, isDark ? 1 : 0.85)
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: headingColor
            }}
          >
            General Notes
          </Typography>

          <Stack spacing={1.5}>
            {generalNotes.map((note) => (
              <Typography
                key={note}
                sx={{
                  color: mutedColor,
                  fontSize: '0.875rem',
                  lineHeight: 1.8
                }}
              >
                {note}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Security disclaimer */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 3,
            color: mutedColor,
            textAlign: 'center',
            lineHeight: 1.8
          }}
        >
          Security engagements are scoped to your environment and agreed
          authorization. Testing is performed only on systems you own or are
          authorized to assess. Reports and remediation resources help guide
          security improvements but do not guarantee complete immunity from
          security incidents.
        </Typography>
      </Container>
    </Box>
  );
}
