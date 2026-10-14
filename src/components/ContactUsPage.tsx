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
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  SendRounded,
  ScheduleOutlined
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

export default function ContactUsPage() {
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

      let data: { message?: string; error?: string } | null = null;

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = null;
        }
      }

      // Treat every non-2xx response as a failed submission.
      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Unable to send your message (HTTP ${response.status}).`
        );
      }

      // The API must return an actual success response to reach this point.
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

  const contactItems = [
    {
      icon: <EmailOutlined />,
      label: 'Email us',
      value: 'inquiries@cryptech.services',
      href: 'mailto:inquiries@cryptech.services'
    },
    {
      icon: <PhoneOutlined />,
      label: 'Call us',
      value: 'Contact us by email to arrange a call',
      href: 'mailto:inquiries@cryptech.services'
    },
    {
      icon: <LocationOnOutlined />,
      label: 'Our location',
      value: 'US',
      href: undefined
    },
    {
      icon: <ScheduleOutlined />,
      label: 'Working hours',
      value: 'Monday – Friday',
      href: undefined
    }
  ];

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      backgroundColor: alpha(headingColor, isDark ? 0.025 : 0.018),
      transition: theme.transitions.create([
        'border-color',
        'box-shadow',
        'background-color'
      ]),
      '& fieldset': {
        borderColor
      },
      '&:hover fieldset': {
        borderColor: alpha(primary, 0.65)
      },
      '&.Mui-focused': {
        backgroundColor: alpha(primary, isDark ? 0.045 : 0.025),
        boxShadow: `0 0 0 3px ${alpha(primary, 0.1)}`
      },
      '&.Mui-focused fieldset': {
        borderColor: primary,
        borderWidth: 1
      }
    },
    '& .MuiInputLabel-root': {
      color: mutedColor
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: primary
    },
    '& .MuiInputBase-input': {
      color: headingColor
    },
    '& .MuiInputBase-input::placeholder': {
      color: mutedColor,
      opacity: 0.75
    }
  };

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        py: { xs: 7, sm: 9, md: 12 },
        color: headingColor,
        backgroundColor: surface
      }}
    >
      {/* Decorative background */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          zIndex: 0,
          bottom: 80,
          left: '-8%',
          width: { xs: 220, md: 380 },
          height: { xs: 220, md: 380 },
          borderRadius: '50%',
          border: `2px solid ${alpha(primary, 0.3)}`,
          boxShadow: `
            0 0 0 40px ${alpha(primary, 0.09)},
            0 0 0 80px ${alpha(primary, 0.055)}
          `,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Page heading */}
        <Stack
          spacing={2.5}
          sx={{
            maxWidth: 760,
            mb: { xs: 5, md: 7 }
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              alignSelf: 'flex-start',
              px: 1.5,
              py: 0.75,
              border: `1px solid ${alpha(primary, 0.25)}`,
              borderRadius: 99,
              color: primary,
              backgroundColor: alpha(primary, 0.07)
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: primary,
                boxShadow: `0 0 12px ${alpha(primary, 0.7)}`
              }}
            />

            <Typography
              variant="overline"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.12em',
                lineHeight: 1.5
              }}
            >
              CONTACT CRYPTECH SERVICES
            </Typography>
          </Box>

          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.055em',
              color: headingColor,
              maxWidth: 760
            }}
          >
            Have a project
            <Box
              component="span"
              sx={{
                display: 'block',
                color: primary
              }}
            >
              in mind?
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 590,
              color: mutedColor,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.9
            }}
          >
            Let&apos;s turn your ideas into reliable digital solutions. Tell us
            what you&apos;re building, what you need, and how we can help bring
            your vision to life.
          </Typography>
        </Stack>

        {/* Main contact section */}
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          sx={{ alignItems: 'stretch' }}
        >
          {/* Contact information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                border: `1px solid ${borderColor}`,
                backgroundColor: cardSurface,
                backgroundImage: `linear-gradient(150deg, ${alpha(primary, isDark ? 0.11 : 0.065)}, transparent 55%)`
              }}
            >
              <Stack spacing={3.5} sx={{ height: '100%' }}>
                <Box>
                  <Typography
                    component="h2"
                    variant="h5"
                    sx={{
                      mb: 1.25,
                      fontWeight: 750,
                      letterSpacing: '-0.025em',
                      color: headingColor
                    }}
                  >
                    Let&apos;s talk
                  </Typography>

                  <Typography
                    sx={{
                      color: mutedColor,
                      lineHeight: 1.85,
                      fontSize: '0.95rem'
                    }}
                  >
                    Whether you need a new website, a custom application, or
                    help improving an existing system, we&apos;re ready to hear
                    about your project.
                  </Typography>
                </Box>

                <Stack spacing={2.5}>
                  {contactItems.map((item) => (
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
                          width: 46,
                          height: 46,
                          borderRadius: 2.5,
                          color: primary,
                          backgroundColor: alpha(primary, 0.09),
                          border: `1px solid ${alpha(primary, 0.13)}`,
                          '& .MuiSvgIcon-root': {
                            fontSize: 22
                          }
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box sx={{ minWidth: 0, pt: 0.25 }}>
                        <Typography
                          sx={{
                            mb: 0.5,
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: headingColor
                          }}
                        >
                          {item.label}
                        </Typography>

                        {item.href ? (
                          <Typography
                            component="a"
                            href={item.href}
                            sx={{
                              color: mutedColor,
                              fontSize: '0.875rem',
                              lineHeight: 1.7,
                              textDecoration: 'none',
                              overflowWrap: 'anywhere',
                              transition: 'color 160ms ease',
                              '&:hover': {
                                color: primary
                              }
                            }}
                          >
                            {item.value}
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              color: mutedColor,
                              fontSize: '0.875rem',
                              lineHeight: 1.7
                            }}
                          >
                            {item.value}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  ))}
                </Stack>

                <Box
                  sx={{
                    mt: 'auto',
                    p: 2.5,
                    borderRadius: 3,
                    border: `1px solid ${alpha(primary, 0.2)}`,
                    backgroundColor: alpha(primary, isDark ? 0.07 : 0.045)
                  }}
                >
                  <Typography
                    sx={{
                      mb: 0.75,
                      color: headingColor,
                      fontWeight: 700
                    }}
                  >
                    Have a specific idea?
                  </Typography>

                  <Typography
                    sx={{
                      mb: 2,
                      color: mutedColor,
                      fontSize: '0.875rem',
                      lineHeight: 1.8
                    }}
                  >
                    Share your goals and requirements. We&apos;ll use the
                    details to understand what you need.
                  </Typography>

                  <Button
                    component="a"
                    href="#contact-form"
                    endIcon={<ArrowForwardRounded />}
                    sx={{
                      p: 0,
                      color: primary,
                      fontWeight: 700,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: secondary
                      }
                    }}
                  >
                    Start a conversation
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Contact form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              id="contact-form"
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 4.5 },
                height: '100%',
                borderRadius: 4,
                border: `1px solid ${borderColor}`,
                backgroundColor: cardSurface,
                scrollMarginTop: 32
              }}
            >
              <Stack spacing={1} sx={{ mb: 3.5 }}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    fontWeight: 750,
                    letterSpacing: '-0.025em',
                    color: headingColor
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
                  Fill out the form below and tell us more about your project.
                </Typography>
              </Stack>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Inline success and error notification */}
                {formNotice.open && (
                  <Alert
                    severity={formNotice.severity}
                    variant="filled"
                    onClose={() =>
                      setFormNotice((previous) => ({
                        ...previous,
                        open: false
                      }))
                    }
                    sx={{
                      mb: 2.5,
                      borderRadius: 2,
                      alignItems: 'center',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {formNotice.message}
                  </Alert>
                )}

                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    required
                    label="Full name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange('name')}
                    disabled={loading}
                    sx={fieldSx}
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
                  />

                  <TextField
                    fullWidth
                    required
                    label="Subject"
                    placeholder="What would you like to discuss?"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    disabled={loading}
                    sx={fieldSx}
                  />

                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={5}
                    label="Project details"
                    placeholder="Tell us about your project, goals, and requirements..."
                    value={form.message}
                    onChange={handleChange('message')}
                    disabled={loading}
                    sx={fieldSx}
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
                      minHeight: 54,
                      mt: 0.5,
                      borderRadius: 2.5,
                      color: theme.palette.getContrastText(primary),
                      backgroundColor: primary,
                      fontWeight: 750,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      boxShadow: `0 8px 24px ${alpha(primary, 0.22)}`,
                      transition: theme.transitions.create([
                        'transform',
                        'box-shadow',
                        'background-color'
                      ]),
                      '&:hover': {
                        backgroundColor: secondary,
                        boxShadow: `0 12px 30px ${alpha(primary, 0.28)}`,
                        transform: 'translateY(-1px)'
                      },
                      '&.Mui-disabled': {
                        color: alpha(
                          theme.palette.getContrastText(primary),
                          0.7
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
                      fontSize: '0.75rem',
                      lineHeight: 1.7
                    }}
                  >
                    Please provide a valid email address so we can respond to
                    your inquiry.
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
