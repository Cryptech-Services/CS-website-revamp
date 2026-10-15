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
          zIndex: -1,
          top: '38%',
          left: -190,
          width: 360,
          height: 360,
          borderRadius: '50%',
          border: `1px solid ${alpha(primary, 0.5)}`,
          boxShadow: `
            0 0 0 40px ${alpha(primary, 0.25)},
            0 0 0 80px ${alpha(primary, 0.15)}
          `,
          pointerEvents: 'none'
        }}
      />

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
