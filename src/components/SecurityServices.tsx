'use client';

import * as React from 'react';

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
  alpha
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

import {
  fetchSecurityContent,
  type SecurityTier,
  type SecurityCapability
} from '@/lib/fectSecuritySupabase';

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

const tierIcons: Record<SecurityTier['iconKey'], React.ElementType> = {
  shield: ShieldRounded,
  security: SecurityRounded,
  'verified-user': VerifiedUserRounded
};

const capabilityIcons: Record<
  SecurityCapability['iconKey'],
  React.ElementType
> = {
  'bug-report': BugReportRounded,
  terminal: TerminalRounded,
  'monitor-heart': MonitorHeartRounded,
  'verified-security': GppGoodRounded
};

/**
 * Animated cybersecurity targeting background.
 * All SVG artwork is decorative and remains local to the component.
 */
function SecurityBackground({
  primary,
  isDark
}: {
  primary: string;
  isDark: boolean;
}) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        display: { xs: 'none', md: 'block' },
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: isDark ? 0.26 : 0.17,
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 12%, black 85%, transparent 100%)',
        '& svg': {
          display: 'block',
          width: '100%',
          height: '100%'
        },
        '& .security-orbit': {
          transformBox: 'view-box',
          transformOrigin: '600px 340px',
          animation: 'securityOrbit 36s linear infinite'
        },
        '& .security-orbit-reverse': {
          transformBox: 'view-box',
          transformOrigin: '600px 340px',
          animation: 'securityOrbitReverse 48s linear infinite'
        },
        '& .security-pulse': {
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: 'securityPulse 2.5s ease-in-out infinite'
        },
        '& .security-beam': {
          animation: 'securityBeam 3s ease-in-out infinite'
        },
        '& .security-scan': {
          animation: 'securityScan 5s ease-in-out infinite'
        },
        '& .security-dash': {
          strokeDasharray: '4 12',
          animation: 'securityDash 9s linear infinite'
        },
        '& .security-stars': {
          animation: 'securityTwinkle 4s ease-in-out infinite alternate'
        },
        '@keyframes securityOrbit': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        '@keyframes securityOrbitReverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' }
        },
        '@keyframes securityPulse': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(0.85)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' }
        },
        '@keyframes securityBeam': {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.8 }
        },
        '@keyframes securityScan': {
          '0%': { transform: 'translateY(-110px)', opacity: 0 },
          '15%': { opacity: 0.8 },
          '85%': { opacity: 0.8 },
          '100%': { transform: 'translateY(110px)', opacity: 0 }
        },
        '@keyframes securityDash': {
          from: { strokeDashoffset: 0 },
          to: { strokeDashoffset: -160 }
        },
        '@keyframes securityTwinkle': {
          from: { opacity: 0.25 },
          to: { opacity: 0.9 }
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
      >
        <defs>
          <linearGradient id="earth-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="security-beam-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={primary} stopOpacity="0" />
            <stop offset="50%" stopColor={primary} stopOpacity="0.5" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </linearGradient>

          <radialGradient id="security-ground-glow">
            <stop offset="0%" stopColor={primary} stopOpacity="0.8" />
            <stop offset="35%" stopColor={primary} stopOpacity="0.22" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="security-sky-glow">
            <stop offset="0%" stopColor={primary} stopOpacity="0.16" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </radialGradient>

          <pattern
            id="security-coordinate-grid"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M44 0H0V44"
              fill="none"
              stroke={primary}
              strokeOpacity="0.15"
              strokeWidth="0.7"
            />
          </pattern>

          <filter
            id="security-target-glow"
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

          <clipPath id="security-earth-clip">
            <path d="M-100 800Q600 290 1300 800Z" />
          </clipPath>
        </defs>

        {/* Atmospheric background */}
        <rect width="1200" height="800" fill="url(#earth-sky)" />
        <ellipse
          cx="600"
          cy="180"
          rx="470"
          ry="260"
          fill="url(#security-sky-glow)"
        />

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
              className="security-stars"
              cx={cx}
              cy={cy}
              r={r}
              style={{ animationDelay: `${index * -0.4}s` }}
            />
          ))}
        </g>

        {/* Digital terrain */}
        <g clipPath="url(#security-earth-clip)">
          <rect
            x="0"
            y="360"
            width="1200"
            height="440"
            fill="url(#security-coordinate-grid)"
          />

          {[490, 310, 130].map((radius) => (
            <ellipse
              key={radius}
              cx="600"
              cy="650"
              rx={radius}
              ry="150"
              fill="none"
              stroke={primary}
              strokeOpacity="0.2"
            />
          ))}

          <path
            d="M0 650H1200M0 710H1200M0 760H1200"
            stroke={primary}
            strokeOpacity="0.13"
            fill="none"
          />
        </g>

        {/* Ground glow */}
        <ellipse
          cx="600"
          cy="625"
          rx="190"
          ry="100"
          fill="url(#security-ground-glow)"
        />

        {/* Scanning beam */}
        <g className="security-beam">
          <path d="M600 100L565 625H635Z" fill="url(#security-beam-gradient)" />
          <path
            d="M600 90V625"
            stroke={primary}
            strokeWidth="1.5"
            strokeOpacity="0.9"
            strokeDasharray="4 8"
          />
        </g>

        {/* Telemetry connections */}
        <g
          className="security-dash"
          fill="none"
          stroke={primary}
          strokeWidth="1.2"
          opacity="0.8"
        >
          <path d="M0 230H230L280 280H440L480 320H600" />
          <path d="M1200 220H980L930 270H770L730 310H600" />
          <path d="M0 420H190L230 460H410L450 500H600" />
          <path d="M1200 410H1010L970 450H790L750 490H600" />
          <path d="M0 110H90L126 146H224L260 182H330" />
          <path d="M1200 90H1110L1070 130H990L954 166H882" />
        </g>

        {/* Rotating orbital rings */}
        <g className="security-orbit">
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
            strokeOpacity="0.3"
          />
          <circle cx="830" cy="340" r="4" fill={primary} />
          <circle cx="410" cy="340" r="3" fill={primary} />
        </g>

        <g className="security-orbit-reverse">
          <ellipse
            cx="600"
            cy="340"
            rx="155"
            ry="215"
            transform="rotate(55 600 340)"
            fill="none"
            stroke={primary}
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="18 12 3 12"
          />
          <circle cx="600" cy="125" r="3" fill={primary} />
          <circle cx="600" cy="555" r="3" fill={primary} />
        </g>

        {/* Central targeting interface */}
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

          <path d="M600 210V260M600 420V470" strokeWidth="1.5" />
          <path d="M470 340H520M680 340H730" strokeWidth="1.5" />

          <path d="M520 275V260H535" strokeWidth="2" />
          <path d="M665 260H680V275" strokeWidth="2" />
          <path d="M520 405V420H535" strokeWidth="2" />
          <path d="M665 420H680V405" strokeWidth="2" />

          <circle
            cx="600"
            cy="340"
            r="60"
            strokeWidth="2"
            strokeOpacity="0.9"
            strokeDasharray="8 7"
            className="security-dash"
          />

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

        {/* Scanning reticle */}
        <g className="security-scan">
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

        {/* Ground impact reticle */}
        <g
          transform="translate(600 625)"
          stroke={primary}
          fill="none"
          strokeLinecap="round"
        >
          <circle r="44" strokeOpacity="0.35" strokeDasharray="3 7" />
          <circle r="27" strokeOpacity="0.8" strokeWidth="1.3" />
          <circle r="12" strokeOpacity="0.9" strokeWidth="1.5" />
          <path d="M-65 0H-35M35 0H65M0 -65V-35M0 35V65" />
          <path d="M-8 -8L8 8M8 -8L-8 8" strokeWidth="1.2" />
          <circle
            className="security-pulse"
            r="5"
            fill={primary}
            stroke="none"
            filter="url(#security-target-glow)"
          />
        </g>

        {/* Peripheral tracking indicators */}
        <g fill="none" stroke={primary} strokeWidth="1" strokeOpacity="0.65">
          <path d="M55 390H130L150 370H205" />
          <path d="M1145 390H1070L1050 370H995" />
          <circle cx="205" cy="370" r="3" fill={primary} />
          <circle cx="995" cy="370" r="3" fill={primary} />
        </g>
      </Box>
    </Box>
  );
}

export default function SecurityServices() {
  const theme = useTheme();
  const customTheme = theme;
  const isDark = theme.palette.mode === 'dark';

  const primary = customTheme.colorScale?.[9] ?? theme.palette.primary.main;

  const headingColor =
    customTheme.grayScale?.[12] ?? theme.palette.text.primary;

  const mutedColor =
    customTheme.grayScale?.[10] ?? theme.palette.text.secondary;

  const surface =
    customTheme.backgroundScale?.[2] ?? theme.palette.background.default;

  const cardSurface =
    customTheme.secondaryScale?.[4] ?? theme.palette.background.paper;

  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  const [securityTiers, setSecurityTiers] = React.useState<SecurityTier[]>([]);
  const [securityCapabilities, setSecurityCapabilities] = React.useState<
    SecurityCapability[]
  >([]);
  const [generalNotes, setGeneralNotes] = React.useState<string[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);
  const [retryKey, setRetryKey] = React.useState(0);
  const [hoveredTier, setHoveredTier] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function loadSecurityContent() {
      setLoading(true);
      setLoadError(false);

      try {
        const data = await fetchSecurityContent();

        if (!cancelled) {
          setSecurityTiers(data.tiers);
          setSecurityCapabilities(data.capabilities);
          setGeneralNotes(data.notes);
        }
      } catch (error) {
        console.error('Unable to load security content:', error);

        if (!cancelled) {
          setLoadError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSecurityContent();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

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
      <SecurityBackground primary={primary} isDark={isDark} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
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
              '& .MuiChip-icon': { color: primary }
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
            <Box component="span" sx={{ color: primary, display: 'inline' }}>
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

        {/* Loading state */}
        {loading && (
          <Box
            role="status"
            sx={{
              py: 9,
              textAlign: 'center',
              color: mutedColor
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                mx: 'auto',
                mb: 2,
                border: `3px solid ${alpha(primary, 0.18)}`,
                borderTopColor: primary,
                borderRadius: '50%',
                animation: 'securityLoaderSpin 0.8s linear infinite',
                '@keyframes securityLoaderSpin': {
                  to: { transform: 'rotate(360deg)' }
                },
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none'
                }
              }}
            />

            <Typography sx={{ fontWeight: 650 }}>
              Loading security services...
            </Typography>
          </Box>
        )}

        {/* Error state */}
        {!loading && loadError && (
          <Box
            role="alert"
            sx={{
              py: 8,
              px: 3,
              textAlign: 'center',
              border: `1px dashed ${borderColor}`,
              borderRadius: '24px',
              bgcolor: alpha(cardSurface, isDark ? 0.45 : 0.6)
            }}
          >
            <Typography
              component="h3"
              sx={{ mb: 1, fontWeight: 750, color: headingColor }}
            >
              Unable to load security services
            </Typography>

            <Typography
              sx={{ mb: 2.5, color: mutedColor, fontSize: '0.875rem' }}
            >
              We couldn&apos;t retrieve the security information right now.
              Please try again.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setRetryKey((current) => current + 1)}
              sx={{ textTransform: 'none', fontWeight: 700 }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Empty state */}
        {!loading && !loadError && securityTiers.length === 0 && (
          <Box
            sx={{
              py: 8,
              px: 3,
              textAlign: 'center',
              border: `1px dashed ${borderColor}`,
              borderRadius: '24px',
              bgcolor: alpha(cardSurface, isDark ? 0.45 : 0.6)
            }}
          >
            <Typography component="h3" sx={{ mb: 1, fontWeight: 750 }}>
              No security tiers available
            </Typography>

            <Typography sx={{ color: mutedColor, fontSize: '0.875rem' }}>
              Security packages will appear here when they are published.
            </Typography>
          </Box>
        )}

        {/* Security tiers */}
        {!loading && !loadError && securityTiers.length > 0 && (
          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            {securityTiers.map((tier) => {
              const TierIcon = tierIcons[tier.iconKey];
              const isHovered = hoveredTier === tier.name;

              return (
                <Grid
                  key={tier.id}
                  size={{ xs: 12, md: 4 }}
                  sx={{ display: 'flex' }}
                >
                  <Box
                    component="article"
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
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                        '&:hover': { transform: 'none' }
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
                      component="h3"
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
        )}

        {/* Capabilities */}
        {!loading && !loadError && (
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

            {securityCapabilities.length > 0 ? (
              <Grid container spacing={2.5}>
                {securityCapabilities.map((capability) => {
                  const CapabilityIcon = capabilityIcons[capability.iconKey];

                  return (
                    <Grid key={capability.id} size={{ xs: 12, sm: 6, md: 3 }}>
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
                          },
                          '@media (prefers-reduced-motion: reduce)': {
                            transition: 'none',
                            '&:hover': { transform: 'none' }
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
                          component="h3"
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
            ) : (
              <Typography
                sx={{ py: 3, textAlign: 'center', color: mutedColor }}
              >
                No security capabilities are currently available.
              </Typography>
            )}
          </Box>
        )}

        {/* General notes */}
        {!loading && !loadError && generalNotes.length > 0 && (
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
              component="h3"
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
              {generalNotes.map((note, index) => (
                <Typography
                  key={`${index}-${note}`}
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
        )}

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
