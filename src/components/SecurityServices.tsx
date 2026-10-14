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
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: isDark ? 0.32 : 0.13,
          maskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="security-grid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill={primary} fillOpacity="0.4" />
            </pattern>

            <linearGradient
              id="security-lines"
              x1="0"
              y1="0"
              x2="1200"
              y2="900"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={primary} stopOpacity="0.05" />
              <stop offset="0.5" stopColor={primary} stopOpacity="0.75" />
              <stop offset="1" stopColor={primary} stopOpacity="0.05" />
            </linearGradient>

            <radialGradient id="security-glow">
              <stop stopColor={primary} stopOpacity="0.22" />
              <stop offset="1" stopColor={primary} stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="900" fill="url(#security-grid)" />

          <ellipse
            cx="1050"
            cy="250"
            rx="350"
            ry="300"
            fill="url(#security-glow)"
          />

          <ellipse
            cx="120"
            cy="700"
            rx="300"
            ry="280"
            fill="url(#security-glow)"
          />

          <g
            stroke="url(#security-lines)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 100H100L145 145H245L285 185H350" />
            <path d="M0 220H75L115 260V315H200L245 360H320" />
            <path d="M0 420H115L155 380H235V330H305L345 290H390" />
            <path d="M0 610H100L140 650H220L260 690H345" />
            <path d="M0 790H120L160 750H245L285 710H350" />

            <path d="M1200 120H1100L1060 160H970L930 200H860" />
            <path d="M1200 280H1120L1080 320V370H1000L960 410H880" />
            <path d="M1200 470H1090L1050 430H970V390H910L870 350H820" />
            <path d="M1200 650H1110L1070 690H980L940 730H850" />
            <path d="M1200 800H1090L1050 760H970L930 720H870" />

            <path d="M100 0V70L140 110V160" />
            <path d="M300 0V55L340 95V150" />
            <path d="M1100 0V70L1060 110V165" />
            <path d="M900 0V55L860 95V150" />

            <path d="M150 900V830L190 790V740" />
            <path d="M1050 900V830L1010 790V740" />
            <path d="M300 900V850L340 810V770" />
            <path d="M900 900V850L860 810V770" />

            <path d="M0 500H55L85 530H140" />
            <path d="M1200 560H1140L1110 590H1060" />
          </g>

          <g fill={primary} fillOpacity="0.8">
            <circle cx="145" cy="145" r="3" />
            <circle cx="245" cy="145" r="2.5" />
            <circle cx="200" cy="315" r="3" />
            <circle cx="235" cy="330" r="2.5" />
            <circle cx="155" cy="650" r="3" />
            <circle cx="260" cy="690" r="2.5" />

            <circle cx="1060" cy="160" r="3" />
            <circle cx="970" cy="160" r="2.5" />
            <circle cx="1000" cy="370" r="3" />
            <circle cx="970" cy="390" r="2.5" />
            <circle cx="1070" cy="690" r="3" />
            <circle cx="980" cy="730" r="2.5" />
          </g>

          {/* Shield outline */}
          <g
            transform="translate(600 450)"
            stroke={primary}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M0 -145L105 -105V-20C105 50 60 105 0 140C-60 105 -105 50 -105 -20V-105Z"
              strokeOpacity="0.14"
              strokeWidth="1.5"
            />

            <path
              d="M0 -125L85 -93V-20C85 38 49 83 0 112C-49 83 -85 38 -85 -20V-93Z"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="5 8"
            />

            <path
              d="M-36 0L-10 26L40 -30"
              strokeOpacity="0.2"
              strokeWidth="3"
            />
          </g>

          {/* Signal rings */}
          <g stroke={primary} strokeOpacity="0.24" strokeWidth="1">
            <circle cx="600" cy="450" r="190" strokeDasharray="2 10" />
            <circle cx="600" cy="450" r="230" strokeDasharray="4 16" />
            <circle cx="600" cy="450" r="275" strokeDasharray="1 18" />
          </g>
        </svg>
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
              lineHeight: 1.9,
              fontSize: { xs: '0.95rem', md: '1.08rem' }
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
            bgcolor: alpha(cardSurface, isDark ? 0.7 : 0.85)
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
