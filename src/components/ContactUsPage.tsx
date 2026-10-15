'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  ArrowForwardRounded,
  ArrowOutwardRounded,
  CheckCircleOutlineRounded,
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  SendRounded,
  ScheduleOutlined,
  TerminalRounded
} from '@mui/icons-material';

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type NoticeSeverity = 'success' | 'error' | 'info';

type FormNotice = {
  open: boolean;
  message: string;
  severity: NoticeSeverity;
};

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const contactItems = [
  {
    icon: EmailOutlined,
    label: 'Email',
    value: 'inquiries@cryptech.services',
    detail: 'Send us your project inquiry.',
    href: 'mailto:inquiries@cryptech.services'
  },
  {
    icon: PhoneOutlined,
    label: 'Schedule a call',
    value: 'By appointment',
    detail: 'Reach out by email to arrange a call.',
    href: 'mailto:inquiries@cryptech.services'
  },
  {
    icon: LocationOnOutlined,
    label: 'Location',
    value: 'United States',
    detail: 'Serving digital projects remotely.',
    href: undefined
  },
  {
    icon: ScheduleOutlined,
    label: 'Availability',
    value: 'Monday – Friday',
    detail: 'Send a message anytime.',
    href: undefined
  }
];

export default function ContactUsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const primary = theme.colorScale?.[9] ?? theme.palette.primary.main;
  const secondary = theme.secondaryScale?.[9] ?? theme.palette.secondary.main;
  const headingColor = theme.grayScale?.[12] ?? theme.palette.text.primary;
  const mutedColor = theme.grayScale?.[10] ?? theme.palette.text.secondary;
  const surface =
    theme.backgroundScale?.[1] ?? theme.palette.background.default;
  const cardSurface =
    theme.secondaryScale?.[4] ?? theme.palette.background.paper;

  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [formNotice, setFormNotice] = useState<FormNotice>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotice = (message: string, severity: NoticeSeverity) => {
    setFormNotice({
      open: true,
      message,
      severity
    });
  };

  const handleChange =
    (field: keyof ContactForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    setFormNotice({
      open: false,
      message: '',
      severity: 'info'
    });

    if (!name || !email || !subject || !message) {
      showNotice('Please complete all fields.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showNotice('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/nodemailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      });

      const responseText = await response.text();

      let data: {
        message?: string;
        error?: string;
      } | null = null;

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Unable to send your message (HTTP ${response.status}).`
        );
      }

      showNotice(
        data?.message || 'Your message has been sent successfully!',
        'success'
      );

      setForm(initialForm);
    } catch (error: unknown) {
      console.error('Contact form submission failed:', error);

      showNotice(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: alpha(headingColor, isDark ? 0.025 : 0.015),
      transition: theme.transitions.create([
        'border-color',
        'box-shadow',
        'background-color'
      ]),
      '& fieldset': {
        borderColor
      },
      '&:hover fieldset': {
        borderColor: alpha(primary, 0.55)
      },
      '&.Mui-focused': {
        backgroundColor: alpha(primary, 0.035),
        boxShadow: `0 0 0 3px ${alpha(primary, 0.09)}`
      },
      '&.Mui-focused fieldset': {
        borderColor: primary,
        borderWidth: '1px'
      }
    },
    '& .MuiInputLabel-root': {
      color: mutedColor
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: primary
    },
    '& .MuiInputBase-input': {
      color: headingColor,
      fontSize: '0.925rem'
    },
    '& .MuiInputBase-input::placeholder': {
      color: mutedColor,
      opacity: 0.7
    }
  };

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        py: { xs: 7, sm: 10, md: 14 },
        color: headingColor,
        backgroundColor: surface
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          display: { xs: 'none', md: 'block' },
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: isDark ? 0.32 : 0.13,
          maskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',

          '& .security-grid': {
            animation: 'securityGridMove 35s linear infinite'
          },

          '& .security-circuit': {
            strokeDasharray: '7 13',
            animation: 'securityCircuitFlow 16s linear infinite'
          },

          '& .security-circuit-reverse': {
            strokeDasharray: '5 17',
            animation: 'securityCircuitReverse 22s linear infinite'
          },

          '& .security-node': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'securityNodePulse 4s ease-in-out infinite'
          },

          '& .security-node:nth-child(2n)': {
            animationDelay: '-1.7s'
          },

          '& .security-shield': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'securityShieldPulse 6s ease-in-out infinite'
          },

          '& .security-check': {
            strokeDasharray: '110',
            strokeDashoffset: '110',
            animation: 'securityCheckDraw 2s ease-out 0.5s forwards'
          },

          '& .security-ring': {
            transformBox: 'view-box',
            transformOrigin: '600px 450px',
            animation: 'securityRingRotate 60s linear infinite'
          },

          '& .security-ring-reverse': {
            transformBox: 'view-box',
            transformOrigin: '600px 450px',
            animation: 'securityRingReverse 75s linear infinite'
          },

          '& .security-glow': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'securityGlowPulse 8s ease-in-out infinite alternate'
          },

          '@keyframes securityGridMove': {
            from: { transform: 'translate3d(0, 0, 0)' },
            to: { transform: 'translate3d(36px, 36px, 0)' }
          },

          '@keyframes securityCircuitFlow': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: -160 }
          },

          '@keyframes securityCircuitReverse': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: 176 }
          },

          '@keyframes securityNodePulse': {
            '0%, 100%': { opacity: 0.45, transform: 'scale(0.85)' },
            '50%': { opacity: 1, transform: 'scale(1.3)' }
          },

          '@keyframes securityShieldPulse': {
            '0%, 100%': { opacity: 0.65, transform: 'scale(0.98)' },
            '50%': { opacity: 1, transform: 'scale(1.025)' }
          },

          '@keyframes securityCheckDraw': {
            to: { strokeDashoffset: 0 }
          },

          '@keyframes securityRingRotate': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' }
          },

          '@keyframes securityRingReverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' }
          },

          '@keyframes securityGlowPulse': {
            from: { opacity: 0.55, transform: 'scale(0.92)' },
            to: { opacity: 1, transform: 'scale(1.12)' }
          },

          '@media (prefers-reduced-motion: reduce)': {
            '& *, & *::before, & *::after': {
              animation: 'none !important'
            }
          }
        }}
      >
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
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

            <radialGradient id="security-center-glow">
              <stop stopColor={primary} stopOpacity="0.2" />
              <stop offset="1" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            <filter
              id="security-blur"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <clipPath id="security-clip">
              <rect width="1200" height="900" />
            </clipPath>
          </defs>

          <g clipPath="url(#security-clip)">
            {/* Animated technical grid */}
            <g className="security-grid">
              <rect
                x="-36"
                y="-36"
                width="1272"
                height="972"
                fill="url(#security-grid)"
              />
            </g>

            {/* Breathing ambient glows */}
            <ellipse
              className="security-glow"
              cx="1050"
              cy="250"
              rx="350"
              ry="300"
              fill="url(#security-glow)"
            />

            <ellipse
              className="security-glow"
              cx="120"
              cy="700"
              rx="300"
              ry="280"
              fill="url(#security-glow)"
              style={{ animationDelay: '-4s' }}
            />

            <circle
              cx="600"
              cy="450"
              r="330"
              fill="url(#security-center-glow)"
            />

            {/* Circuit board connections */}
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

            {/* Data pulses moving through circuit paths */}
            <g
              className="security-circuit"
              stroke={primary}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.85"
            >
              <path d="M0 100H100L145 145H245L285 185H350" />
              <path d="M0 420H115L155 380H235V330H305L345 290H390" />
              <path d="M0 610H100L140 650H220L260 690H345" />
              <path d="M1200 120H1100L1060 160H970L930 200H860" />
              <path d="M1200 470H1090L1050 430H970V390H910L870 350H820" />
              <path d="M1200 650H1110L1070 690H980L940 730H850" />
            </g>

            <g
              className="security-circuit-reverse"
              stroke={primary}
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.65"
            >
              <path d="M0 220H75L115 260V315H200L245 360H320" />
              <path d="M0 790H120L160 750H245L285 710H350" />
              <path d="M1200 280H1120L1080 320V370H1000L960 410H880" />
              <path d="M1200 800H1090L1050 760H970L930 720H870" />
              <path d="M100 0V70L140 110V160" />
              <path d="M1100 0V70L1060 110V165" />
              <path d="M150 900V830L190 790V740" />
              <path d="M1050 900V830L1010 790V740" />
            </g>

            {/* Pulsing connection nodes */}
            <g fill={primary} className="security-node">
              <circle cx="145" cy="145" r="3" />
              <circle cx="245" cy="145" r="2.5" />
              <circle cx="200" cy="315" r="3" />
              <circle cx="235" cy="330" r="2.5" />
              <circle cx="155" cy="650" r="3" />
              <circle cx="260" cy="690" r="2.5" />
            </g>

            <g
              fill={primary}
              className="security-node"
              style={{ animationDelay: '-2s' }}
            >
              <circle cx="1060" cy="160" r="3" />
              <circle cx="970" cy="160" r="2.5" />
              <circle cx="1000" cy="370" r="3" />
              <circle cx="970" cy="390" r="2.5" />
              <circle cx="1070" cy="690" r="3" />
              <circle cx="980" cy="730" r="2.5" />
            </g>

            {/* Central security shield */}
            <g className="security-shield">
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

                {/* Draw-on load animation */}
                <path
                  className="security-check"
                  d="M-36 0L-10 26L40 -30"
                  strokeOpacity="0.65"
                  strokeWidth="3"
                />

                <circle
                  cx="0"
                  cy="-12"
                  r="57"
                  stroke={primary}
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
              </g>
            </g>

            {/* Rotating signal rings */}
            <g
              className="security-ring"
              stroke={primary}
              strokeOpacity="0.24"
              strokeWidth="1"
            >
              <circle cx="600" cy="450" r="190" strokeDasharray="2 10" />
              <circle cx="600" cy="450" r="275" strokeDasharray="1 18" />
              <circle cx="600" cy="450" r="230" strokeDasharray="4 16" />
            </g>

            {/* Opposite-direction inner ring */}
            <g className="security-ring-reverse" fill="none" stroke={primary}>
              <circle
                cx="600"
                cy="450"
                r="155"
                strokeOpacity="0.14"
                strokeDasharray="24 18 3 18"
              />
              <circle cx="755" cy="450" r="3" fill={primary} stroke="none" />
              <circle cx="445" cy="450" r="2" fill={primary} stroke="none" />
            </g>
          </g>
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {/* Header */}
        <Stack
          spacing={3}
          sx={{
            maxWidth: 820,
            mb: { xs: 5, md: 8 }
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: 1,
              px: 1.5,
              py: 0.85,
              border: `1px solid ${alpha(primary, 0.25)}`,
              borderRadius: '8px',
              backgroundColor: alpha(primary, 0.055)
            }}
          >
            <TerminalRounded
              sx={{
                fontSize: 17,
                color: primary
              }}
            />

            <Typography
              variant="overline"
              sx={{
                color: primary,
                fontWeight: 800,
                letterSpacing: '0.14em',
                lineHeight: 1.5
              }}
            >
              LET&apos;S CONNECT
            </Typography>
          </Box>

          <Typography
            component="h1"
            variant="h2"
            sx={{
              maxWidth: 800,
              fontWeight: 850,
              lineHeight: { xs: 1.08, md: 1.02 },
              letterSpacing: {
                xs: '-0.055em',
                md: '-0.075em'
              },
              color: headingColor
            }}
          >
            Let&apos;s build
            <Box
              component="span"
              sx={{
                display: { xs: 'block', sm: 'inline' },
                color: primary
              }}
            >
              {' '}
              something exceptional.
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 600,
              color: mutedColor,
              fontSize: {
                xs: '1rem',
                md: '1.1rem'
              },
              lineHeight: 1.9
            }}
          >
            Great digital experiences start with a conversation. Tell us about
            your idea, your challenges, or the solution you have in mind.
            Let&apos;s make it happen.
          </Typography>

          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: 'center', pt: 0.5 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#30A46C',
                boxShadow: '0 0 12px rgba(48, 164, 108, 0.45)'
              }}
            />

            <Typography
              sx={{
                color: mutedColor,
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              Ready to discuss your next project
            </Typography>
          </Stack>
        </Stack>

        {/* Contact layout */}
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          sx={{ alignItems: 'stretch' }}
        >
          {/* Left panel */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: { md: 680 },
                overflow: 'hidden',
                p: { xs: 3, sm: 4, md: 4.5 },
                borderRadius: '20px',
                border: `1px solid ${alpha(
                  headingColor,
                  isDark ? 0.14 : 0.08
                )}`,
                color: '#F5F7FA',
                backgroundColor: isDark ? cardSurface : cardSurface,
                backgroundImage: `
                  radial-gradient(
                    ellipse at 0% 0%,
                    ${alpha(primary, 0.28)},
                    transparent 55%
                  )
                `
              }}
            >
              {/* Decorative rings */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  right: -100,
                  bottom: 110,
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  border: `1px solid ${alpha('#FFFFFF', 0.09)}`,
                  boxShadow: `
                    0 0 0 35px ${alpha('#FFFFFF', 0.025)},
                    0 0 0 70px ${alpha('#FFFFFF', 0.02)}
                  `,
                  pointerEvents: 'none'
                }}
              />

              <Stack
                spacing={4}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  flex: 1
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      mb: 1.5,
                      color: alpha('#FFFFFF', 0.55),
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Contact information
                  </Typography>

                  <Typography
                    component="h2"
                    sx={{
                      mb: 1.5,
                      color: '#FFFFFF',
                      fontSize: {
                        xs: '1.8rem',
                        md: '2.15rem'
                      },
                      fontWeight: 800,
                      letterSpacing: '-0.045em',
                      lineHeight: 1.15
                    }}
                  >
                    We&apos;re all ears.
                  </Typography>

                  <Typography
                    sx={{
                      maxWidth: 340,
                      color: alpha('#FFFFFF', 0.67),
                      fontSize: '0.9rem',
                      lineHeight: 1.9
                    }}
                  >
                    Have a question or an ambitious idea? Tell us about it.
                    We&apos;d love to hear what you&apos;re working on.
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Stack
                        key={item.label}
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: 'flex-start' }}
                      >
                        <Box
                          sx={{
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                            width: 44,
                            height: 44,
                            borderRadius: '12px',
                            color: primary,
                            backgroundColor: alpha(primary, 0.15),
                            border: `1px solid ${alpha(primary, 0.2)}`
                          }}
                        >
                          <Icon sx={{ fontSize: 21 }} />
                        </Box>

                        <Box sx={{ minWidth: 0, pt: 0.25 }}>
                          <Typography
                            sx={{
                              mb: 0.45,
                              color: alpha('#FFFFFF', 0.55),
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              letterSpacing: '0.035em'
                            }}
                          >
                            {item.label}
                          </Typography>

                          {item.href ? (
                            <Typography
                              component="a"
                              href={item.href}
                              sx={{
                                display: 'inline-block',
                                color: '#FFFFFF',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                lineHeight: 1.6,
                                overflowWrap: 'anywhere',
                                textDecoration: 'none',
                                transition: 'color 160ms ease',
                                '&:hover': { color: primary }
                              }}
                            >
                              {item.value}
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                color: '#FFFFFF',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                lineHeight: 1.6
                              }}
                            >
                              {item.value}
                            </Typography>
                          )}

                          <Typography
                            sx={{
                              mt: 0.4,
                              color: alpha('#FFFFFF', 0.52),
                              fontSize: '0.775rem',
                              lineHeight: 1.7
                            }}
                          >
                            {item.detail}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>

                <Box sx={{ flex: 1, minHeight: 8 }} />

                {/* Bottom CTA */}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: '14px',
                    border: `1px solid ${alpha('#FFFFFF', 0.11)}`,
                    backgroundColor: alpha('#FFFFFF', 0.045)
                  }}
                >
                  <Typography
                    sx={{
                      mb: 0.75,
                      color: '#FFFFFF',
                      fontWeight: 750,
                      fontSize: '0.95rem'
                    }}
                  >
                    Have something in mind?
                  </Typography>

                  <Typography
                    sx={{
                      mb: 2,
                      color: alpha('#FFFFFF', 0.6),
                      fontSize: '0.825rem',
                      lineHeight: 1.8
                    }}
                  >
                    No idea is too small to start a conversation. Let&apos;s
                    explore the possibilities.
                  </Typography>

                  <Button
                    component="a"
                    href="#contact-form"
                    endIcon={<ArrowForwardRounded />}
                    sx={{
                      p: 0,
                      color: primary,
                      fontWeight: 750,
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#FFFFFF'
                      }
                    }}
                  >
                    Tell us about it
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Right panel: Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              id="contact-form"
              elevation={0}
              sx={{
                height: '100%',
                p: { xs: 3, sm: 4, md: 4.5 },
                borderRadius: '20px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardSurface,
                scrollMarginTop: 32
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'flex-start', mb: 4 }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    component="h2"
                    sx={{
                      mb: 1,
                      color: headingColor,
                      fontSize: {
                        xs: '1.55rem',
                        md: '1.9rem'
                      },
                      fontWeight: 800,
                      letterSpacing: '-0.045em'
                    }}
                  >
                    Send us a message
                  </Typography>

                  <Typography
                    sx={{
                      color: mutedColor,
                      fontSize: '0.9rem',
                      lineHeight: 1.8
                    }}
                  >
                    Share a few details and we&apos;ll have a better
                    understanding of how we can help.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: { xs: 'none', sm: 'grid' },
                    placeItems: 'center',
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: '14px',
                    color: primary,
                    border: `1px solid ${alpha(primary, 0.18)}`,
                    backgroundColor: alpha(primary, 0.07)
                  }}
                >
                  <EmailOutlined />
                </Box>
              </Stack>

              {formNotice.open && (
                <Alert
                  severity={formNotice.severity}
                  variant="outlined"
                  onClose={() =>
                    setFormNotice((previous) => ({
                      ...previous,
                      open: false
                    }))
                  }
                  icon={
                    formNotice.severity === 'success' ? (
                      <CheckCircleOutlineRounded />
                    ) : undefined
                  }
                  sx={{
                    mb: 3,
                    borderRadius: '12px',
                    alignItems: 'center',
                    overflowWrap: 'anywhere'
                  }}
                >
                  {formNotice.message}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    required
                    label="Full name"
                    placeholder="John Doe"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange('name')}
                    disabled={loading}
                    sx={fieldSx}
                    slotProps={{
                      htmlInput: {
                        maxLength: 120
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email address"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    disabled={loading}
                    sx={fieldSx}
                    slotProps={{
                      htmlInput: {
                        maxLength: 254
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    required
                    label="Subject"
                    placeholder="What can we help you with?"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    disabled={loading}
                    sx={fieldSx}
                    slotProps={{
                      htmlInput: {
                        maxLength: 200
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={5}
                    maxRows={12}
                    label="Project details"
                    placeholder={
                      'Tell us about your project, goals, timeline, or requirements...'
                    }
                    value={form.message}
                    onChange={handleChange('message')}
                    disabled={loading}
                    sx={fieldSx}
                    slotProps={{
                      htmlInput: {
                        maxLength: 10000
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <SendRounded />
                      )
                    }
                    sx={{
                      minHeight: 56,
                      mt: 0.5,
                      borderRadius: '12px',
                      color: theme.palette.getContrastText(primary),
                      backgroundColor: primary,
                      fontSize: '0.925rem',
                      fontWeight: 800,
                      textTransform: 'none',
                      boxShadow: `0 8px 24px ${alpha(primary, 0.2)}`,
                      transition: theme.transitions.create([
                        'transform',
                        'box-shadow',
                        'background-color'
                      ]),
                      '&:hover': {
                        backgroundColor: secondary,
                        boxShadow: `0 12px 30px ${alpha(primary, 0.25)}`,
                        transform: 'translateY(-2px)'
                      },
                      '&:active': {
                        transform: 'translateY(0)'
                      },
                      '&.Mui-disabled': {
                        color: alpha(
                          theme.palette.getContrastText(primary),
                          0.75
                        ),
                        backgroundColor: alpha(primary, 0.6)
                      }
                    }}
                  >
                    {loading ? 'Sending message...' : 'Send message'}
                  </Button>

                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: mutedColor,
                      fontSize: '0.775rem',
                      lineHeight: 1.8
                    }}
                  >
                    By submitting this form, you&apos;re allowing Cryptech
                    Services to use your details to respond to your inquiry.
                  </Typography>
                </Stack>
              </Box>

              {/* Form footer */}
              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: `1px solid ${borderColor}`
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{
                    alignItems: {
                      xs: 'flex-start',
                      sm: 'center',
                      justifyContent: 'space-between'
                    }
                  }}
                >
                  <Typography
                    sx={{
                      color: mutedColor,
                      fontSize: '0.8rem'
                    }}
                  >
                    Prefer email?
                  </Typography>

                  <Button
                    component="a"
                    href="mailto:inquiries@cryptech.services"
                    endIcon={<ArrowOutwardRounded />}
                    sx={{
                      p: 0,
                      color: primary,
                      fontSize: '0.825rem',
                      fontWeight: 750,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: secondary
                      }
                    }}
                  >
                    inquiries@cryptech.services
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom note */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mt: { xs: 4, md: 5 },
            pt: 3,
            borderTop: `1px solid ${borderColor}`
          }}
        >
          <Typography
            sx={{
              color: mutedColor,
              fontSize: '0.8rem',
              lineHeight: 1.8
            }}
          >
            CRYPTECH SERVICES
            <Box
              component="span"
              sx={{
                mx: 1,
                color: alpha(headingColor, 0.35)
              }}
            >
              /
            </Box>
            Technology. Creativity. Solutions.
          </Typography>

          <Typography
            sx={{
              color: mutedColor,
              fontSize: '0.8rem'
            }}
          >
            Let&apos;s create something meaningful.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
