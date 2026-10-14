'use client';

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

type ContactCTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
};

const services = [
  {
    label: 'Web Development',
    icon: <CodeRoundedIcon />
  },
  {
    label: 'Web3 & Solidity',
    icon: <TokenRoundedIcon />
  },
  {
    label: 'Design',
    icon: <PaletteRoundedIcon />
  },
  {
    label: 'Game Servers',
    icon: <SportsEsportsRoundedIcon />
  }
];

export default function ContactCTA({
  eyebrow = 'LET’S BUILD SOMETHING',
  title = 'Have a project in mind?',
  description = 'Whether you’re planning a website, a decentralized application, a new digital identity, or a game server, let’s talk about how to bring your idea to life.',
  email = 'inquiries@cryptech.services'
}: ContactCTAProps) {
  const theme = useTheme();

  const subject = encodeURIComponent('Project Inquiry - Cryptech Services');

  const body = encodeURIComponent(
    [
      'Hello Cryptech Services,',
      '',
      'I would like to discuss a project.',
      '',
      'Project type:',
      '',
      'Project details:',
      '',
      'Expected timeline:',
      '',
      'Thank you.'
    ].join('\n')
  );

  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, sm: 10, md: 14 },
        backgroundColor: theme.palette.background.default,
        scrollMarginTop: '90px'
      }}
    >
      {/* Main contact panel */}
      <Container maxWidth="xl">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: 4, md: 6 },
            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
            background: `
              linear-gradient(
                135deg,
                ${alpha(theme.palette.primary.main, 0.1)} 0%,
                ${theme.palette.background.paper} 48%,
                ${alpha(theme.palette.secondary.main, 0.07)} 100%
              )
            `,
            boxShadow: `0 24px 80px ${alpha(
              theme.palette.common.black,
              theme.palette.mode === 'dark' ? 0.15 : 0.04
            )}`
          }}
        >
          {/* Decorative background grid */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.25,
              backgroundImage: `
                linear-gradient(${alpha(theme.palette.primary.main, 0.1)} 1px, transparent 1px),
                linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
              maskImage: 'linear-gradient(115deg, black, transparent 85%)',
              pointerEvents: 'none'
            }}
          />

          {/* Ambient glow */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: -180,
              right: '-5%',
              width: { xs: 280, md: 480 },
              height: { xs: 280, md: 480 },
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(
                theme.palette.primary.main,
                0.17
              )}, transparent 70%)`,
              pointerEvents: 'none'
            }}
          />

          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              bottom: -220,
              left: '28%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(
                theme.palette.secondary.main,
                0.1
              )}, transparent 70%)`,
              pointerEvents: 'none'
            }}
          />

          <Grid
            container
            spacing={{ xs: 5, md: 3 }}
            sx={{
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              p: { xs: 3, sm: 5, md: 8, lg: 10 }
            }}
          >
            {/* Left content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack sx={{ alignItems: 'flex-start' }} spacing={0}>
                <Chip
                  icon={
                    <AutoAwesomeRoundedIcon
                      sx={{ fontSize: '16px !important' }}
                    />
                  }
                  label={eyebrow}
                  size="small"
                  sx={{
                    mb: 3,
                    pl: 0.5,
                    pr: 1,
                    height: 32,
                    borderRadius: 2,
                    color: 'primary.main',
                    fontWeight: 800,
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.22
                    )}`
                  }}
                />

                <Typography
                  variant="h2"
                  sx={{
                    maxWidth: 700,
                    fontSize: {
                      xs: '2.5rem',
                      sm: '3.5rem',
                      md: '4rem',
                      lg: '4.6rem'
                    },
                    lineHeight: 1.08,
                    fontWeight: 900,
                    letterSpacing: '-0.06em',
                    textWrap: 'balance'
                  }}
                >
                  {title.split('project')[0]}
                  {title.toLowerCase().includes('project') ? (
                    <>
                      <Box
                        component="span"
                        sx={{
                          color: 'primary.main'
                        }}
                      >
                        project
                      </Box>
                      {title.slice(title.toLowerCase().indexOf('project') + 7)}
                    </>
                  ) : null}
                </Typography>

                <Typography
                  sx={{
                    mt: 2.5,
                    maxWidth: 610,
                    color: 'text.secondary',
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    lineHeight: 1.9
                  }}
                >
                  {description}
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ mt: 4, width: { xs: '100%', sm: 'auto' } }}
                >
                  <Button
                    href={mailto}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowOutwardRoundedIcon />}
                    sx={{
                      minHeight: 52,
                      px: 3,
                      borderRadius: 2.5,
                      fontWeight: 800,
                      textTransform: 'none',
                      boxShadow: `0 8px 24px ${alpha(
                        theme.palette.primary.main,
                        0.22
                      )}`
                    }}
                  >
                    Start a Project
                  </Button>

                  <Button
                    href={`mailto:${email}`}
                    variant="outlined"
                    size="large"
                    startIcon={<MailOutlineRoundedIcon />}
                    sx={{
                      minHeight: 52,
                      px: 3,
                      borderRadius: 2.5,
                      fontWeight: 750,
                      textTransform: 'none',
                      borderColor: theme.palette.divider,
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: alpha(theme.palette.primary.main, 0.05)
                      }
                    }}
                  >
                    Contact Us
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 3, alignItems: 'center' }}
                >
                  <MailOutlineRoundedIcon
                    sx={{ color: 'text.secondary', fontSize: 17 }}
                  />

                  <Typography
                    component="a"
                    href={`mailto:${email}`}
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      overflowWrap: 'anywhere',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {email}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            {/* Right service panel */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.76),
                  backdropFilter: 'blur(14px)'
                }}
              >
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase'
                  }}
                >
                  What can we help you build?
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    mb: 2.5,
                    fontWeight: 850,
                    letterSpacing: '-0.025em'
                  }}
                >
                  Your idea starts here.
                </Typography>

                <Stack spacing={1.25}>
                  {services.map((service, index) => (
                    <Stack
                      key={service.label}
                      direction="row"
                      spacing={1.5}
                      sx={{
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2.5,
                        border: `1px solid ${theme.palette.divider}`,
                        transition:
                          'border-color 180ms ease, background-color 180ms ease',
                        '&:hover': {
                          borderColor: alpha(theme.palette.primary.main, 0.45),
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.04
                          )
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                          borderRadius: 2,
                          color: 'primary.main',
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.09
                          ),
                          '& svg': { fontSize: 21 }
                        }}
                      >
                        {service.icon}
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 750,
                            fontSize: '0.88rem'
                          }}
                        >
                          {service.label}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            color: 'text.secondary',
                            fontSize: '0.73rem'
                          }}
                        >
                          Discuss your requirements
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: 'text.disabled',
                          fontSize: '0.72rem',
                          fontFamily: 'monospace'
                        }}
                      >
                        0{index + 1}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Box
                  sx={{
                    mt: 2.5,
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.78rem',
                      lineHeight: 1.8
                    }}
                  >
                    Have a unique idea? Tell us about it. We’re happy to discuss
                    your goals and explore possible solutions.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
