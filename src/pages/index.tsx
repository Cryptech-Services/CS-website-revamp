'use client';

import Head from 'next/head';
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import Navbar from '@/theme/layout/Navbar';
import SkyEffects from '@/theme/common/SkyEffects';
import { AppButton, AppChip } from '@/theme/components/CustomComponents';
import Footer from '@/components/Footer';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import GameServers from '@/components/GameServers';
import FAQs from '@/components/FAQS';
import Team from '@/components/Team';
import ContactCTA from '@/components/ContactCTA';
import SecurityServices from '@/components/SecurityServices';
import ContactUsPage from '@/components/ContactUsPage';
import HomeMarquee from '@/components/HomeMarquee';
import { useThemeContext } from '@/contexts/themeContext';

export default function Home() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();
  const isDark = theme.palette.mode === 'dark';

  const primary = theme.colorScale[9];
  const primaryStrong = theme.colorScale[8];
  const secondary = theme.secondaryScale[9];
  const background = theme.colorScale[1];
  const surface = theme.backgroundScale[3];
  const textPrimary = theme.grayScale[12];
  const textSecondary = theme.grayScale[10];

  return (
    <>
      <Head>
        <title>Cryptech Services | IT & Digital Solutions</title>
        <meta
          name="description"
          content="Cryptech Services helps businesses build better digital experiences through web development, product design, and practical IT solutions."
        />
        <meta name="theme-color" content={background} />
      </Head>

      <Navbar onToggleTheme={toggleTheme} />

      <Box
        component="main"
        sx={{
          position: 'relative',
          isolation: 'isolate',
          minHeight: { xs: 'calc(100svh - 64px)', lg: '95svh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          color: textPrimary,
          backgroundColor: background,
          backgroundImage: `
            radial-gradient(ellipse at 75% 42%, ${alpha(primary, isDark ? 0.17 : 0.12)} 0%, transparent 38%),
            radial-gradient(ellipse at 7% 90%, ${alpha(secondary, isDark ? 0.12 : 0.07)} 0%, transparent 34%)
          `
        }}
      >
        {/* IT Network / Circuit Background */}

        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: isDark ? 0.25 : 0.28,
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',

            '@keyframes circuitGridDrift': {
              '0%, 100%': {
                transform: 'translate3d(0, 0, 0)'
              },
              '50%': {
                transform: 'translate3d(-12px, 8px, 0)'
              }
            },

            '@keyframes circuitFlow': {
              to: {
                strokeDashoffset: -200
              }
            },

            '@keyframes circuitPulse': {
              '0%, 100%': {
                opacity: 0.4
              },
              '50%': {
                opacity: 1
              }
            },

            '@keyframes circuitGlow': {
              '0%, 100%': {
                transform: 'translate(-20px, 10px) scale(0.95)'
              },
              '50%': {
                transform: 'translate(20px, -15px) scale(1.08)'
              }
            },

            '@keyframes circuitNodePulse': {
              '0%, 100%': {
                opacity: 0.45,
                transform: 'scale(0.9)'
              },
              '50%': {
                opacity: 1,
                transform: 'scale(1.15)'
              }
            },

            '@media (prefers-reduced-motion: reduce)': {
              '& .circuit-grid, & .circuit-glow, & .circuit-traces, & .circuit-node, & .circuit-connection':
                {
                  animation: 'none !important'
                }
            }
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              inset: 0,
              color: primary,
              overflow: 'visible',

              '& .circuit-grid': {
                animation: 'circuitGridDrift 24s ease-in-out infinite'
              },

              '& .circuit-glow': {
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: 'circuitGlow 18s ease-in-out infinite'
              },

              '& .circuit-traces': {
                strokeDasharray: '8 12',
                animation: 'circuitFlow 30s linear infinite'
              },

              '& .circuit-node': {
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: 'circuitNodePulse 4s ease-in-out infinite'
              },

              '& .circuit-connection': {
                animation: 'circuitPulse 5s ease-in-out infinite'
              }
            }}
          >
            <defs>
              <linearGradient
                id="footer-circuit-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor={primary} stopOpacity="0.8" />
                <stop offset="100%" stopColor={secondary} stopOpacity="0.2" />
              </linearGradient>

              <pattern
                id="footer-tech-grid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="1"
                  fill="currentColor"
                  opacity="0.35"
                />
              </pattern>

              <radialGradient id="footer-tech-glow">
                <stop offset="0%" stopColor={primary} stopOpacity="0.18" />
                <stop offset="100%" stopColor={primary} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle moving technical grid */}
            <g className="circuit-grid">
              <rect
                x="-48"
                y="-48"
                width="1296"
                height="696"
                fill="url(#footer-tech-grid)"
              />
            </g>

            {/* Slowly drifting ambient glow */}
            <ellipse
              className="circuit-glow"
              cx="940"
              cy="270"
              rx="350"
              ry="270"
              fill="url(#footer-tech-glow)"
            />

            {/* Animated circuit traces */}
            <g
              className="circuit-traces"
              fill="none"
              stroke="url(#footer-circuit-gradient)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M640 0 V90 H720 V145 H810 V205 H910" />
              <path d="M790 0 V65 H850 V110 H980 V165 H1090" />
              <path d="M1200 80 H1110 V130 H1040 V230 H970 V280" />
              <path d="M1200 340 H1090 V300 H1030 V360 H930 V410 H840" />
              <path d="M1200 480 H1130 V430 H1060 V470 H960 V530 H890" />
              <path d="M700 600 V510 H770 V450 H840 V410" />
              <path d="M550 600 V540 H620 V490 H700 V450" />
              <path d="M0 430 H100 V380 H190 V330 H280" />
              <path d="M0 510 H150 V460 H230 V420 H320 V370" />
              <path d="M0 150 H90 V200 H170 V250 H250" />
              <path d="M250 0 V70 H320 V120 H400 V180" />
            </g>

            {/* Pulsing network nodes */}
            <g fill="currentColor">
              {[
                [640, 90],
                [720, 145],
                [810, 205],
                [910, 205],
                [790, 65],
                [850, 110],
                [980, 165],
                [1090, 165],
                [1110, 130],
                [1040, 230],
                [970, 280],
                [1090, 300],
                [1030, 360],
                [930, 410],
                [840, 410],
                [1130, 430],
                [1060, 470],
                [960, 530],
                [890, 530],
                [700, 510],
                [770, 450],
                [620, 490],
                [100, 380],
                [190, 330],
                [280, 330],
                [150, 460],
                [230, 420],
                [320, 370],
                [90, 200],
                [170, 250],
                [250, 250],
                [320, 70],
                [400, 120],
                [400, 180]
              ].map(([cx, cy], index) => (
                <circle
                  key={`${cx}-${cy}`}
                  className="circuit-node"
                  style={{
                    animationDelay: `${(index % 8) * -0.5}s`,
                    animationDuration: `${3 + (index % 4)}s`
                  }}
                  cx={cx}
                  cy={cy}
                  r={index % 4 === 0 ? 3 : 1.8}
                  opacity={index % 4 === 0 ? 0.85 : 0.5}
                />
              ))}
            </g>

            {/* Larger pulsing connection points */}
            <g
              className="circuit-connection"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="910" cy="205" r="8" opacity="0.45" />
              <circle cx="910" cy="205" r="15" opacity="0.18" />

              <circle cx="320" cy="370" r="7" opacity="0.4" />
              <circle cx="320" cy="370" r="13" opacity="0.16" />

              <circle cx="840" cy="410" r="7" opacity="0.4" />
              <circle cx="840" cy="410" r="13" opacity="0.16" />
            </g>

            {/* Minimal technical accents */}
            <g
              fill="currentColor"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.5"
            >
              <text x="865" y="245">
                01 / 10
              </text>
              <text x="1000" y="390">
                SYS_NODE
              </text>
              <text x="155" y="300">
                0x01
              </text>
              <text x="680" y="475">
                CONNECTED
              </text>
            </g>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,

            opacity: isDark ? 0.15 : 0.1,

            backgroundImage: `
                      linear-gradient(
                        ${alpha(primaryStrong, 1)} 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        ${alpha(primaryStrong, 1)} 1px,
                        transparent 1px
                      )
                    `,

            backgroundSize: '50px 50px',

            maskImage: 'linear-gradient(to bottom, black, transparent 90%)',

            WebkitMaskImage:
              'linear-gradient(to bottom, black, transparent 90%)',

            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: -2,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <SkyEffects color={primary} />
          </Box>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: isDark ? 0.1 : 0.055,
              backgroundImage: `
                linear-gradient(${alpha(primaryStrong, 0.55)} 1px, transparent 1px),
                linear-gradient(90deg, ${alpha(primaryStrong, 0.55)} 1px, transparent 1px)
              `,
              backgroundSize: '54px 54px',
              maskImage:
                'linear-gradient(to bottom, black 0%, transparent 85%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, transparent 85%)',
              pointerEvents: 'none'
            }}
          />
        </Box>
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 7, sm: 9, md: 11, lg: 12 }
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'minmax(0, 1.08fr) minmax(320px, 0.92fr)'
              },
              alignItems: 'center',
              gap: { xs: 6, md: 5, lg: 8 }
            }}
          >
            <Stack spacing={{ xs: 3, md: 3.25 }} sx={{ maxWidth: 760 }}>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  display: { xs: 'none', md: 'flex' }
                }}
                spacing={1.25}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 1,
                    bgcolor: primary
                  }}
                />
                <Typography
                  sx={{
                    color: textSecondary,
                    fontSize: '0.73rem',
                    fontWeight: 800,
                    letterSpacing: '0.17em',
                    textTransform: 'uppercase'
                  }}
                >
                  Cryptech Services · IT Solutions Group
                </Typography>
              </Stack>

              <Typography
                component="h1"
                sx={{
                  fontWeight: 850,
                  fontSize: {
                    xs: 'clamp(2.8rem, 11vw, 4rem)',
                    sm: '4.25rem',
                    md: 'clamp(3.6rem, 5.2vw, 5.15rem)',
                    xl: '5.65rem'
                  },
                  lineHeight: { xs: 0.99, md: 0.98 },
                  letterSpacing: '-0.065em',
                  maxWidth: 790,
                  '& .hero-accent': {
                    display: 'block',
                    color: primary,
                    background: `linear-gradient(105deg, ${primary}, ${secondary})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }
                }}
              >
                Technology that
                <Box component="span" className="hero-accent">
                  moves you forward.
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: 570,
                  color: textSecondary,
                  fontSize: { xs: '1rem', md: '1.12rem' },
                  lineHeight: 1.85
                }}
              >
                We design, develop, and deliver digital solutions that help
                businesses work smarter, connect better, and grow with
                confidence.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{
                  alignItems: { xs: 'stretch', sm: 'center' },
                  pt: 0.5,
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                <AppButton
                  component="a"
                  href="#contact-form"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    minHeight: 54,
                    px: 3,
                    borderRadius: 2,
                    boxShadow: `0 12px 34px ${alpha(primary, isDark ? 0.22 : 0.25)}`
                  }}
                >
                  Start a Project
                </AppButton>
                <AppButton
                  component="a"
                  href="#services"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  endIcon={<NorthEastRoundedIcon />}
                  sx={{
                    minHeight: 54,
                    px: 3,
                    borderRadius: 2,
                    borderColor: alpha(secondary, 0.42)
                  }}
                >
                  Discover What We Do
                </AppButton>
              </Stack>

              <Divider
                sx={{
                  maxWidth: 540,
                  borderColor: alpha(secondary, 0.18),
                  my: 0.75
                }}
              />

              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 3 }}
                useFlexGap
                sx={{
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                {[
                  { icon: <CodeRoundedIcon />, label: 'Web & Software' },
                  {
                    icon: <DevicesRoundedIcon />,
                    label: 'Digital Experiences'
                  },
                  { icon: <HubRoundedIcon />, label: 'IT Solutions' }
                ].map((item) => (
                  <Stack
                    key={item.label}
                    direction="row"
                    spacing={0.8}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        placeItems: 'center',
                        color: primary
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      sx={{
                        color: textSecondary,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 570,
                justifySelf: { xs: 'center', md: 'end' },
                minWidth: 0,
                py: { xs: 1, md: 3 }
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  width: '80%',
                  aspectRatio: '1',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${alpha(primary, isDark ? 0.2 : 0.14)} 0%, ${alpha(secondary, isDark ? 0.07 : 0.04)} 42%, transparent 70%)`,
                  filter: { xs: 'none', md: 'blur(8px)' }
                }}
              />

              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: '7% 5%',
                  border: `1px solid ${alpha(primary, 0.22)}`,
                  borderRadius: '50%',
                  transform: 'rotate(-24deg) scaleY(0.72)'
                }}
              />
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: '7% 5%',
                  border: `1px solid ${alpha(secondary, 0.22)}`,
                  borderRadius: '50%',
                  transform: 'rotate(36deg) scaleY(0.72)'
                }}
              />

              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  mx: { xs: 1, sm: 2, md: 0 },
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: { xs: 3, md: 4 },
                  overflow: 'hidden',
                  backgroundColor: alpha(surface, isDark ? 0.76 : 0.82),
                  border: `1px solid ${alpha(secondary, 0.22)}`,
                  backdropFilter: { xs: 'none', md: 'blur(18px)' },
                  boxShadow: `0 28px 80px ${alpha('#000000', isDark ? 0.24 : 0.1)}`,
                  transform: { xs: 'none', md: 'rotate(1deg)' },
                  transition: 'transform 300ms ease, border-color 300ms ease',
                  '&:hover': {
                    transform: {
                      xs: 'none',
                      md: 'rotate(0deg) translateY(-4px)'
                    },
                    borderColor: alpha(primary, 0.42)
                  }
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: 'center'
                      }}
                      spacing={1.1}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 2,
                          display: 'grid',
                          placeItems: 'center',
                          color: '#fff',
                          bgcolor: primary,
                          boxShadow: `0 8px 22px ${alpha(primary, 0.3)}`
                        }}
                      >
                        <AutoAwesomeRoundedIcon />
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: 800, fontSize: '0.88rem' }}
                        >
                          Digital solutions
                        </Typography>
                        <Typography
                          sx={{ color: textSecondary, fontSize: '0.72rem' }}
                        >
                          Designed for what&apos;s next
                        </Typography>
                      </Box>
                    </Stack>
                    <AppChip label="INNOVATION" color="primary" />
                  </Stack>

                  <Box
                    sx={{
                      position: 'relative',
                      minHeight: { xs: 230, sm: 290 },
                      p: { xs: 2, sm: 3 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                      borderRadius: 3,
                      background: `linear-gradient(145deg, ${alpha(primary, isDark ? 0.22 : 0.12)}, ${alpha(secondary, isDark ? 0.16 : 0.09)}), ${background}`,
                      border: `1px solid ${alpha(primary, 0.16)}`
                    }}
                  >
                    <Box
                      aria-hidden="true"
                      sx={{
                        position: 'absolute',
                        width: 210,
                        height: 210,
                        borderRadius: '50%',
                        border: `1px solid ${alpha(primary, 0.25)}`,
                        right: '-8%',
                        top: '5%'
                      }}
                    />
                    <Box
                      aria-hidden="true"
                      sx={{
                        position: 'absolute',
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        border: `1px solid ${alpha(secondary, 0.3)}`,
                        right: '5%',
                        top: '17%'
                      }}
                    />
                    <Box
                      aria-hidden="true"
                      sx={{
                        position: 'absolute',
                        width: 78,
                        height: 78,
                        borderRadius: 3,
                        border: `1px solid ${alpha(primary, 0.5)}`,
                        bgcolor: alpha(primary, 0.08),
                        transform: 'rotate(24deg)',
                        right: '18%',
                        top: '30%'
                      }}
                    />
                    <Stack spacing={1} sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography
                        sx={{
                          color: primary,
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          letterSpacing: '0.16em'
                        }}
                      >
                        IDEAS, ENGINEERED
                      </Typography>
                      <Typography
                        sx={{
                          maxWidth: 290,
                          fontWeight: 850,
                          fontSize: { xs: '2rem', sm: '2.65rem' },
                          lineHeight: 1.02,
                          letterSpacing: '-0.055em'
                        }}
                      >
                        Built for
                        <Box
                          component="span"
                          sx={{ display: 'block', color: primary }}
                        >
                          real impact.
                        </Box>
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ position: 'relative', zIndex: 1, flexWrap: 'wrap' }}
                    >
                      {['Design', 'Development', 'Technology'].map((label) => (
                        <Box
                          key={label}
                          sx={{
                            px: 1.15,
                            py: 0.7,
                            borderRadius: 1.5,
                            border: `1px solid ${alpha(secondary, 0.2)}`,
                            bgcolor: alpha(surface, 0.78),
                            color: textSecondary,
                            fontSize: '0.7rem',
                            fontWeight: 700
                          }}
                        >
                          {label}
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: 'center' }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', pl: 0.25 }}
                    >
                      {[primary, secondary, alpha(primary, 0.55)].map(
                        (color, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 28,
                              height: 28,
                              ml: index === 0 ? 0 : -0.7,
                              borderRadius: '50%',
                              bgcolor: color,
                              border: `2px solid ${surface}`
                            }}
                          />
                        )
                      )}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>
                        One team. Connected solutions.
                      </Typography>
                      <Typography
                        sx={{ color: textSecondary, fontSize: '0.72rem' }}
                      >
                        From first idea to final delivery.
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 1.1,
                  left: { sm: -18, md: -34 },
                  bottom: { sm: 18, md: -50 },
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 2.5,
                  bgcolor: surface,
                  border: `1px solid ${alpha(primary, 0.25)}`,
                  boxShadow: `0 14px 38px ${alpha('#000000', 0.12)}`
                }}
              >
                <Box
                  sx={{
                    width: 35,
                    height: 35,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 1.5,
                    bgcolor: alpha(primary, 0.12),
                    color: primary
                  }}
                >
                  <HubRoundedIcon />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.76rem' }}>
                    Technology with purpose
                  </Typography>
                  <Typography
                    sx={{ color: textSecondary, fontSize: '0.67rem' }}
                  >
                    Practical by design
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'absolute',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transform: 'skewY(1deg)',
            transformOrigin: 'right center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>

      <HomeMarquee />
      <AboutUs />
      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2,
          marginTop: { xs: 0, md: 2 }
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transform: 'skewY(-1deg)',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <Services />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <SecurityServices />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transform: 'skewY(1deg)',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <Projects />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transform: 'skewY(-1deg)',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <GameServers />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <Team />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <FAQs />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transform: 'skewY(-1deg)',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <ContactUsPage />

      <Box
        component="section"
        aria-label="Our technology services"
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '3.5rem', md: '4rem' },
          zIndex: 2
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            transformOrigin: 'left center',
            background: `linear-gradient(90deg, ${primary}, ${secondary})`,
            opacity: isDark ? 0.95 : 0.9
          }}
        />
      </Box>
      <Footer />
    </>
  );
}
