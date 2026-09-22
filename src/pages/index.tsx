'use client';

import Head from 'next/head';
import Image from 'next/image';

import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GitHubIcon from '@mui/icons-material/GitHub';
import LayersIcon from '@mui/icons-material/Layers';
import PaletteIcon from '@mui/icons-material/Palette';
import SpeedIcon from '@mui/icons-material/Speed';

import { useThemeContext } from '@/contexts/themeContext';

import SkyEffects from '@/theme/common/SkyEffects';
import {
  AppButton,
  AppCard,
  AppChip
} from '@/theme/components/CustomComponents';
import ThemeToggle from '@/theme/ThemeToggle';
import { THEME_ICONS, THEME_SETS } from '@/theme/theme';
import React from 'react';
import Navbar from '@/theme/layout/Navbar';

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const FEATURES = [
  {
    icon: <ColorLensIcon />,
    title: 'Dynamic Color Scales',
    description:
      'Build consistent interfaces from carefully structured color scales that adapt with your active theme.'
  },
  {
    icon: <LayersIcon />,
    title: 'Semantic Surfaces',
    description:
      'Separate backgrounds, surfaces, borders, accents, and content colors for predictable UI composition.'
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Theme Switching',
    description:
      'Switch between complete visual systems instantly while components automatically follow the active theme.'
  },
  {
    icon: <SpeedIcon />,
    title: 'MUI Native',
    description:
      'Designed around MUI components, tokens, responsive breakpoints, and the sx styling system.'
  }
];

/* ========================================================================== */
/* HOME                                                                       */
/* ========================================================================== */

export default function Home() {
  const theme = useTheme();
  const { themeSet } = useThemeContext();
  const [activeThemeOpen, setActiveThemeOpen] = React.useState(false);
  const themeIcon = THEME_ICONS[themeSet];

  const activeTheme = THEME_SETS[themeSet];

  const primary = theme.colorScale[9];
  const primaryStrong = theme.colorScale[8];

  const secondary = theme.secondaryScale[9];
  const secondaryStrong = theme.secondaryScale[8];

  const background = theme.backgroundScale[1];
  const surface = theme.backgroundScale[3];

  const textPrimary = theme.grayScale[12];
  const textSecondary = theme.grayScale[10];

  const isDarkMode = theme.palette.mode === 'dark';

  const ctaBackground = isDarkMode
    ? alpha(theme.secondaryScale[3], 0.8)
    : alpha(surface, 0.9);

  const ctaSurface = isDarkMode
    ? alpha(theme.secondaryScale[4], 0.72)
    : alpha(surface, 0.72);

  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <Head>
        <title>
          BoilerPlate | Theme System | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="A flexible MUI theme system with dynamic color scales, semantic surfaces, typography, and responsive components."
        />

        <meta name="theme-color" content={background} />
      </Head>

      <Navbar />

      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',

          /*
           * Keep mobile extremely simple.
           * Desktop gets the decorative gradient system.
           */
          backgroundColor: background,

          background: {
            xs: background,

            // lg: `
            //   radial-gradient(
            //     circle at 50% -20%,
            //     ${alpha(primaryStrong, 0.75)},
            //     transparent 42%
            //   ),
            //   ${background}
            // `

            lg: isDark
              ? `
              radial-gradient(
                circle at 50% -20%,
                ${alpha(primaryStrong, 0.75)},
                transparent 42%
              ),
              radial-gradient(
                circle at 100% 50%,
                ${alpha(secondaryStrong, 0.4)},
                transparent 38%
              ),
              radial-gradient(
                circle at 0% 50%,
                ${alpha(secondaryStrong, 0.4)},
                transparent 38%
              ),
              ${background}
            `
              : `
              radial-gradient(
                circle at 50% -20%,
                ${alpha(primaryStrong, 0.5)},
                transparent 42%
              ),
              radial-gradient(
                circle at 100% 50%,
                ${alpha(secondaryStrong, 0.25)},
                transparent 38%
              ),
              radial-gradient(
                circle at 0% 50%,
                ${alpha(secondaryStrong, 0.25)},
                transparent 38%
              ),
              ${background}
            `
          },

          color: textPrimary,

          paddingTop: 5,
          transition: {
            xs: 'none',
            md: `
              background 0.8s ease-in-out,
              color 0.8s ease-in-out
            `
          }
        }}
      >
        {/* ================================================================== */}
        {/* SKY EFFECTS                                                        */}
        {/* ================================================================== */}

        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          <SkyEffects color={primary} />
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
            bottom: -6,
            left: 0,
            width: '100vw',
            opacity: 0.25,
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2400 800"
            width="100%"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="theme-wave-gradient"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop offset="0%" stopColor={theme.colorScale[9]} />

                <stop offset="100%" stopColor={theme.colorScale[7]} />
              </linearGradient>
            </defs>

            <path
              d="
      M 0 323.089
      Q 600 466.524 800 317.354
      Q 1400 621.009 1600 321.322
      Q 2200 548.547 2400 323.389
      L 2400 800
      L 0 800
      L 0 323.202
      Z
    "
              transform="translate(0 41.323)"
              fill="url(#theme-wave-gradient)"
            />
          </svg>
        </Box>

        {/* ================================================================== */}
        {/* DESKTOP DECORATIVE GLOW                                           */}
        {/* ================================================================== */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',

            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        >
          {/* Primary glow */}

          {/* <Box
            sx={{
              position: 'absolute',

              width: {
                md: 600
              },

              height: {
                md: 600
              },

              top: -300,
              left: '15%',

              transform: 'translateX(-50%)',

              borderRadius: '50%',

              background: `
                radial-gradient(
                  circle,
                  ${alpha(primary, 0.12)} 0%,
                  transparent 68%
                )
              `
            }}
          /> */}

          {/* Secondary glow */}

          {/* <Box
            sx={{
              position: 'absolute',

              width: 500,
              height: 500,

              right: -250,
              bottom: -250,

              borderRadius: '50%',

              background: `
                radial-gradient(
                  circle,
                  ${alpha(secondary, 0.12)} 0%,
                  transparent 70%
                )
              `
            }}
          /> */}
        </Box>

        {/* ================================================================== */}
        {/* MAIN CONTAINER                                                     */}
        {/* ================================================================== */}

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,

            py: {
              xs: 5,
              sm: 8,
              md: 10
            }
          }}
        >
          {/* ================================================================= */}
          {/* HERO                                                              */}
          {/* ================================================================= */}

          <Stack
            spacing={3}
            sx={{
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            {/* Theme logo */}

            <Box
              sx={{
                position: 'relative',

                width: {
                  xs: 100,
                  sm: 140,
                  md: 160
                },

                height: {
                  xs: 100,
                  sm: 140,
                  md: 160
                },

                '@keyframes logoFloat': {
                  '0%': {
                    transform: 'translateY(0) scale(1)'
                  },

                  '50%': {
                    transform: 'translateY(-8px) scale(1.025)'
                  },

                  '100%': {
                    transform: 'translateY(0) scale(1)'
                  }
                },

                '@keyframes logoGlow': {
                  '0%, 100%': {
                    opacity: 0.55
                  },

                  '50%': {
                    opacity: 0.9
                  }
                },

                '&::before': {
                  content: '""',

                  display: {
                    xs: 'none',
                    md: 'block'
                  },

                  position: 'absolute',
                  inset: '-25%',

                  borderRadius: '50%',

                  background: `
        radial-gradient(
          circle,
          ${alpha(primary, 0.18)},
          transparent 68%
        )
      `,

                  filter: 'blur(18px)',

                  animation: 'logoGlow 4s ease-in-out infinite'
                }
              }}
            >
              <Image
                src={themeIcon}
                alt={`${themeSet} theme`}
                fill
                priority
                sizes="(max-width: 600px) 100px, 160px"
                style={{
                  objectFit: 'contain',

                  filter:
                    theme.palette.mode === 'dark'
                      ? `
              drop-shadow(
                0 0 10px ${alpha(primary, 0.5)}
              )
              drop-shadow(
                0 0 30px ${alpha(primary, 0.35)}
              )
            `
                      : 'none',

                  animation: 'logoFloat 4s ease-in-out infinite'
                }}
              />
            </Box>

            {/* Hero text */}

            <Stack
              spacing={1}
              sx={{
                alignItems: 'center'
              }}
            >
              <Typography
                variant="overlineCustom"
                sx={{
                  color: primary,
                  fontWeight: 700,
                  letterSpacing: '0.16em'
                }}
              >
                CRYPTECH SERVICES
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,

                  fontSize: {
                    xs: '2rem',
                    sm: '2.75rem',
                    md: '3.5rem'
                  },

                  lineHeight: 1.05,

                  background: {
                    xs: 'none',

                    md:
                      theme.palette.mode === 'light'
                        ? `
          linear-gradient(
            135deg,
            ${alpha(primary, 0.85)} 0%,
            ${alpha(primary, 0.65)} 50% , ${alpha(primary, 0.95)} 100%
          )
        `
                        : `
          linear-gradient(
            135deg,
            ${textPrimary},
            ${alpha(primary, 0.8)}
          )
        `
                  },

                  backgroundClip: {
                    xs: 'initial',
                    md: 'text'
                  },

                  WebkitBackgroundClip: {
                    xs: 'initial',
                    md: 'text'
                  },

                  WebkitTextFillColor: {
                    xs: 'initial',
                    md: 'transparent'
                  }
                }}
              >
                Theme Boilerplate
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 650,
                  color: textSecondary,

                  fontSize: {
                    xs: '0.95rem',
                    sm: '1.05rem'
                  }
                }}
              >
                A modern design foundation for creating beautiful, scalable, and
                consistent theme-aware interfaces.
              </Typography>
            </Stack>

            {/* Theme toggle */}

            <Box
              sx={{
                p: 2,
                borderRadius: 2,

                backgroundColor: theme.secondaryScale[4],

                border: `1px solid ${alpha(secondary, 0.25)}`,

                boxShadow: {
                  xs: 'none',
                  md: `
                    0 10px 40px
                    ${alpha('#000000', 0.16)}
                  `
                },

                backdropFilter: {
                  xs: 'none',
                  md: 'blur(14px)'
                }
              }}
            >
              <ThemeToggle />
            </Box>

            {/* =============================================================== */}
            {/* ACTIVE THEME CARD                                               */}
            {/* =============================================================== */}

            <Paper
              elevation={0}
              sx={{
                mt: 1.5,
                width: '100%',
                maxWidth: 520,
                overflow: 'hidden',

                borderRadius: 2.5,

                backgroundColor: theme.secondaryScale[4],

                border: `1px solid ${alpha(secondary, 0.25)}`,

                backdropFilter: {
                  xs: 'none',
                  md: 'blur(14px)'
                }
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => setActiveThemeOpen((prev) => !prev)}
                aria-expanded={activeThemeOpen}
                sx={{
                  width: '100%',
                  border: 0,
                  outline: 0,
                  cursor: 'pointer',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  p: 1.5,

                  color: textPrimary,

                  backgroundColor: 'transparent',

                  textAlign: 'left',

                  '&:hover': {
                    backgroundColor: alpha(secondary, 0.06)
                  }
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{
                    alignItems: 'center',
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 1.5,

                      backgroundColor: alpha(primary, 0.1),

                      border: `1px solid ${alpha(primary, 0.2)}`
                    }}
                  >
                    <Image
                      src={themeIcon}
                      alt=""
                      width={28}
                      height={28}
                      style={{
                        objectFit: 'contain'
                      }}
                    />
                  </Box>

                  <Stack
                    spacing={0.25}
                    sx={{
                      minWidth: 0
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        component="span"
                        sx={{
                          fontWeight: 800,
                          lineHeight: 1.2
                        }}
                      >
                        {activeTheme?.label ?? themeSet}
                      </Typography>

                      <Chip
                        label="ACTIVE"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          fontWeight: 800,

                          color: theme.backgroundScale[1],
                          backgroundColor: theme.colorScale[9],

                          '& .MuiChip-icon': {
                            color: theme.backgroundScale[1]
                          }
                        }}
                      />
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{
                        color: textSecondary,
                        textTransform: 'capitalize'
                      }}
                    >
                      {activeTheme?.category ?? 'Theme'}
                    </Typography>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    ml: 1,
                    flexShrink: 0,

                    width: 30,
                    height: 30,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: '50%',

                    color: textSecondary,

                    transition: 'transform 0.25s ease',

                    transform: activeThemeOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)'
                  }}
                >
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 18,
                      transform: 'rotate(90deg)'
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: activeThemeOpen ? '1fr' : '0fr',

                  transition: 'grid-template-rows 0.3s ease'
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      px: 1.5,
                      pb: 1.5
                    }}
                  >
                    <Divider
                      sx={{
                        mb: 1.5,
                        borderColor: alpha(secondary, 0.15)
                      }}
                    />

                    <Stack spacing={1.25}>
                      {[
                        {
                          label: 'Primary',
                          value: primary
                        },
                        {
                          label: 'Secondary',
                          value: secondary
                        },
                        {
                          label: 'Surface',
                          value: surface
                        },
                        {
                          label: 'Background',
                          value: background
                        }
                      ].map((item) => (
                        <Stack
                          key={item.label}
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: textSecondary,
                              fontWeight: 600
                            }}
                          >
                            {item.label}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{
                              alignItems: 'center'
                            }}
                          >
                            <Box
                              sx={{
                                width: 26,
                                height: 26,

                                borderRadius: 1,

                                backgroundColor: item.value,

                                border: `1px solid ${alpha(textPrimary, 0.12)}`
                              }}
                            />

                            <Typography
                              variant="caption"
                              sx={{
                                color: textSecondary,
                                fontFamily: 'monospace',
                                fontSize: '0.7rem'
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Stack>

          {/* ================================================================= */}
          {/* FEATURE HERO PANEL                                               */}
          {/* ================================================================= */}

          <Box
            sx={{
              mt: {
                xs: 5,
                md: 4
              },

              position: 'relative',

              borderRadius: {
                xs: 3,
                md: 6
              },

              overflow: 'hidden',

              border: {
                xs: `1px solid ${alpha(secondary, 0.5)} `,
                md: `2px solid ${alpha(secondary, 0.5)} `
              },

              background: {
                xs: alpha(surface, 0.96),

                md: `
                  linear-gradient(
                    135deg,
                    ${alpha(surface, 0.92)},
                    ${alpha(theme.secondaryScale[3], 0.78)}
                  )
                `
              },

              boxShadow: {
                xs: 'none',
                md: `
                  0 30px 100px
                  ${alpha('#000000', 0.28)},
                  0 0 70px
                  ${alpha(secondary, 0.1)}
                `
              },

              backdropFilter: {
                xs: 'none',
                md: 'blur(18px)'
              },

              transition: {
                xs: 'none',

                md: `
                  border-color 0.8s ease,
                  background 0.8s ease,
                  box-shadow 0.8s ease
                `
              },

              '&::before': {
                content: '""',

                position: 'absolute',

                display: {
                  xs: 'none',
                  md: 'block'
                },

                width: 550,
                height: 550,

                top: -300,
                right: -150,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(primary, 0.25)},
                    transparent 70%
                  )
                `,

                pointerEvents: 'none'
              },

              '&::after': {
                content: '""',

                position: 'absolute',

                display: {
                  xs: 'none',
                  md: 'block'
                },

                width: 450,
                height: 450,

                bottom: -300,
                left: -180,

                borderRadius: '50%',

                background: `
                  radial-gradient(
                    circle,
                    ${alpha(secondary, 0.18)},
                    transparent 70%
                  )
                `,

                pointerEvents: 'none'
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',

                top: {
                  xs: 12,
                  md: 18
                },

                right: {
                  xs: 12,
                  md: 20
                },

                zIndex: 3,

                display: 'flex',
                alignItems: 'center',
                gap: 0.75,

                px: 1.25,
                py: 0.6,

                borderRadius: 99,

                backgroundColor: alpha(primary, 0.1),

                border: `1px solid ${alpha(primary, 0.25)}`,

                backdropFilter: {
                  xs: 'none',
                  md: 'blur(10px)'
                },

                boxShadow: `
      0 6px 20px
      ${alpha('#000000', 0.12)}
    `
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,

                  flexShrink: 0,

                  borderRadius: '50%',

                  backgroundColor: primary,

                  boxShadow: `0 0 10px ${alpha(primary, 0.65)}`
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: primary,

                  fontSize: {
                    xs: '0.6rem',
                    md: '0.65rem'
                  },

                  fontWeight: 800,

                  letterSpacing: '0.1em',

                  lineHeight: 1
                }}
              >
                SAMPLE HERO
              </Typography>
            </Box>

            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              sx={{
                position: 'relative',
                zIndex: 1,

                minHeight: {
                  xs: 0,
                  md: 600
                }
              }}
            >
              {/* ============================================================= */}
              {/* HERO COPY                                                      */}
              {/* ============================================================= */}

              <Stack
                spacing={3}
                sx={{
                  justifyContent: 'center',
                  flex: 1,

                  px: {
                    xs: 2.5,
                    sm: 5,
                    md: 8
                  },

                  py: {
                    xs: 4,
                    sm: 6,
                    md: 8
                  }
                }}
              >
                <Box>
                  <AppChip
                    label={`${themeSet.toUpperCase()} THEME`}
                    color="secondary"
                  />
                </Box>

                <Typography
                  variant="display"
                  sx={{
                    maxWidth: 700,

                    color: textPrimary,

                    fontSize: {
                      xs: '2.3rem',
                      sm: '3.25rem',
                      md: '4.2rem'
                    },

                    lineHeight: 1.02,

                    fontWeight: 800,

                    letterSpacing: '-0.035em',

                    textShadow: {
                      xs: 'none',

                      md: `
                        0 0 50px
                        ${alpha(secondary, 0.22)}
                      `
                    }
                  }}
                >
                  Build beautiful interfaces with your theme.
                </Typography>

                <Typography
                  variant="lead"
                  sx={{
                    maxWidth: 620,

                    color: textSecondary,

                    fontSize: {
                      xs: '1rem',
                      md: '1.15rem'
                    },

                    lineHeight: 1.7
                  }}
                >
                  A flexible design system with dynamic color scales,
                  typography, surfaces, semantic colors, and responsive
                  components designed to work together seamlessly.
                </Typography>

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={2}
                  sx={{
                    pt: 1
                  }}
                >
                  <AppButton
                    component="a"
                    href="https://cryptech.services/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 3.5,
                      minHeight: 48,

                      boxShadow: {
                        xs: 'none',

                        md: `
        0 12px 35px
        ${alpha(primary, 0.35)}
      `
                      },

                      '&:hover': {
                        boxShadow: {
                          xs: 'none',

                          md: `
          0 15px 45px
          ${alpha(primary, 0.48)}
        `
                        }
                      }
                    }}
                  >
                    Cryptech Services
                  </AppButton>

                  <AppButton
                    component="a"
                    href={GITHUB_URL || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<GitHubIcon />}
                    sx={{
                      px: 3.5,
                      minHeight: 48,

                      backgroundColor: {
                        xs: 'transparent',
                        md: alpha(secondary, 0.08)
                      },

                      '&:hover': {
                        backgroundColor: {
                          xs: 'transparent',
                          md: alpha(secondary, 0.16)
                        }
                      }
                    }}
                  >
                    View on GitHub
                  </AppButton>
                </Stack>
              </Stack>

              {/* ============================================================= */}
              {/* DESKTOP PREVIEW                                                */}
              {/* ============================================================= */}

              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex'
                  },

                  width: {
                    md: 400,
                    lg: 450
                  },

                  alignItems: 'center',
                  justifyContent: 'center',

                  p: 5
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 330,

                    p: 1.5,

                    borderRadius: 4,

                    backgroundColor: alpha(background, 0.72),

                    border: `1px solid ${alpha(secondary, 0.32)}`,

                    boxShadow: `
                      0 25px 70px
                      ${alpha('#000000', 0.35)}
                    `,

                    transform:
                      'perspective(1000px) rotateY(-7deg) rotateX(3deg)',

                    transition: 'transform 0.5s ease',

                    '&:hover': {
                      transform:
                        'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-6px)'
                    }
                  }}
                >
                  <Stack spacing={1.5}>
                    {/* Preview header */}

                    <Box
                      sx={{
                        height: 42,

                        px: 1.5,

                        display: 'flex',
                        alignItems: 'center',

                        borderRadius: 2,

                        backgroundColor: alpha(surface, 0.8),

                        border: `1px solid ${alpha(secondary, 0.2)}`
                      }}
                    >
                      <Stack direction="row" spacing={0.7}>
                        {[0, 1, 2].map((item) => (
                          <Box
                            key={item}
                            sx={{
                              width: 7,
                              height: 7,

                              borderRadius: '50%',

                              backgroundColor: alpha(textSecondary, 0.45)
                            }}
                          />
                        ))}
                      </Stack>

                      <Typography
                        variant="caption"
                        sx={{
                          ml: 1.5,
                          color: textSecondary
                        }}
                      >
                        Theme Preview
                      </Typography>
                    </Box>

                    {/* Preview body */}

                    <Box
                      sx={{
                        p: 2,

                        borderRadius: 2,

                        backgroundColor: alpha(surface, 0.65),

                        border: `1px solid ${alpha(secondary, 0.15)}`
                      }}
                    >
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            width: '62%',
                            height: 14,

                            borderRadius: 1,

                            backgroundColor: alpha(textPrimary, 0.75)
                          }}
                        />

                        <Stack spacing={1}>
                          <Box
                            sx={{
                              width: '90%',
                              height: 7,

                              borderRadius: 1,

                              backgroundColor: alpha(textSecondary, 0.3)
                            }}
                          />

                          <Box
                            sx={{
                              width: '74%',
                              height: 7,

                              borderRadius: 1,

                              backgroundColor: alpha(textSecondary, 0.22)
                            }}
                          />
                        </Stack>

                        {/* Preview gradient */}

                        <Box
                          sx={{
                            height: 105,

                            borderRadius: 2,

                            background: `
                              linear-gradient(
                                135deg,
                                ${secondary},
                                ${primary}
                              )
                            `,

                            boxShadow: `
                              inset 0 0 30px
                              ${alpha('#ffffff', 0.08)},
                              0 10px 30px
                              ${alpha(primary, 0.2)}
                            `
                          }}
                        />

                        {/* Preview colors */}

                        <Stack direction="row" spacing={1}>
                          {[primary, secondary, textPrimary, textSecondary].map(
                            (color, index) => (
                              <Box
                                key={index}
                                sx={{
                                  flex: 1,
                                  height: 24,

                                  borderRadius: 1,

                                  backgroundColor: color,

                                  border: `1px solid ${alpha('#ffffff', 0.08)}`
                                }}
                              />
                            )
                          )}
                        </Stack>

                        <AppButton
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Primary Action
                        </AppButton>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* ================================================================= */}
          {/* FEATURES INTRO                                                    */}
          {/* ================================================================= */}

          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              textAlign: 'center',

              mt: {
                xs: 8,
                md: 14
              }
            }}
          >
            <Typography
              variant="overlineCustom"
              sx={{
                color: secondary,
                fontWeight: 700,
                letterSpacing: '0.14em'
              }}
            >
              DESIGNED FOR BUILDERS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,

                fontSize: {
                  xs: '1.8rem',
                  md: '2.5rem'
                }
              }}
            >
              Everything your theme needs.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                maxWidth: 650,
                color: textSecondary
              }}
            >
              A structured foundation that keeps colors, components, typography,
              and surfaces visually consistent across your application.
            </Typography>
          </Stack>

          {/* ================================================================= */}
          {/* FEATURES                                                           */}
          {/* ================================================================= */}

          <Box
            sx={{
              mt: 5,

              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },

              gap: 2
            }}
          >
            {FEATURES.map((feature) => (
              <AppCard
                key={feature.title}
                sx={{
                  position: 'relative',

                  p: {
                    xs: 2.5,
                    md: 3.5
                  },

                  minHeight: {
                    xs: 0,
                    md: 220
                  },

                  borderRadius: 3,

                  backgroundColor: theme.secondaryScale[4],

                  border: `1px solid ${alpha(secondary, 0.18)}`,

                  backdropFilter: {
                    xs: 'none',
                    md: 'blur(14px)'
                  },

                  transition: {
                    xs: 'none',

                    md: `
                      transform 0.3s ease,
                      border-color 0.3s ease,
                      background-color 0.3s ease,
                      box-shadow 0.3s ease
                    `
                  },

                  '&:hover': {
                    transform: {
                      xs: 'none',
                      md: 'translateY(-6px)'
                    },

                    backgroundColor: {
                      xs: theme.secondaryScale[4],
                      md: theme.secondaryScale[5]
                    },

                    borderColor: {
                      xs: alpha(secondary, 0.18),
                      md: alpha(primary, 0.4)
                    },

                    boxShadow: {
                      xs: 'none',

                      md: `
                        0 18px 50px
                        ${alpha('#000000', 0.2)}
                      `
                    }
                  }
                }}
              >
                <Stack spacing={2.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 2,

                      color: primary,

                      backgroundColor: alpha(primary, 0.1),

                      border: `1px solid ${alpha(primary, 0.18)}`
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.7
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Stack>
              </AppCard>
            ))}
          </Box>

          {/* ================================================================= */}
          {/* CTA                                                                */}
          {/* ================================================================= */}

          <Box
            sx={{
              mt: {
                xs: 5,
                md: 8
              },

              position: 'relative',
              overflow: 'hidden',

              borderRadius: {
                xs: 3,
                md: 4
              },

              border: `2px solid ${alpha(primary, isDarkMode ? 0.34 : 0.28)}`,

              background: `
      linear-gradient(
        135deg,
        ${alpha(theme.backgroundScale[1], isDarkMode ? 0.75 : 0.11)} 0%,
        ${ctaBackground} 45%,
        ${alpha(secondary, isDarkMode ? 0.25 : 0.11)} 100%
      )
    `,

              boxShadow: {
                xs: 'none',
                md: isDarkMode
                  ? `
          0 24px 70px
          ${alpha('#000000', 0.32)},
          0 0 60px
          ${alpha(primary, 0.06)}
        `
                  : `
          0 24px 70px
          ${alpha('#000000', 0.18)}
        `
              },

              backdropFilter: {
                xs: 'none',
                md: 'blur(18px)'
              },

              transition: {
                xs: 'none',
                md: `
        border-color 0.5s ease,
        box-shadow 0.5s ease,
        background 0.5s ease
      `
              },

              '&::before': {
                content: '""',

                position: 'absolute',

                width: 420,
                height: 420,

                top: -260,
                right: -140,

                borderRadius: '50%',

                background: `
        radial-gradient(
          circle,
          ${alpha(primary, isDarkMode ? 0.3 : 0.22)} 0%,
          transparent 68%
        )
      `,

                pointerEvents: 'none'
              },

              '&::after': {
                content: '""',

                position: 'absolute',

                width: 320,
                height: 320,

                bottom: -240,
                left: -140,

                borderRadius: '50%',

                background: `
        radial-gradient(
          circle,
          ${alpha(secondary, isDarkMode ? 0.22 : 0.16)} 0%,
          transparent 68%
        )
      `,

                pointerEvents: 'none'
              }
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              spacing={{
                xs: 3,
                md: 5
              }}
              sx={{
                position: 'relative',
                zIndex: 1,

                alignItems: {
                  xs: 'stretch',
                  md: 'center'
                },

                justifyContent: 'space-between',

                p: {
                  xs: 2.5,
                  sm: 4,
                  md: 5
                }
              }}
            >
              {/* ===================================================================== */}
              {/* CTA CONTENT                                                           */}
              {/* ===================================================================== */}

              <Stack
                spacing={2}
                sx={{
                  flex: 1,
                  minWidth: 0
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      borderRadius: 1.5,

                      color: primary,

                      backgroundColor: alpha(primary, isDarkMode ? 0.16 : 0.12),

                      border: `1px solid ${alpha(
                        primary,
                        isDarkMode ? 0.28 : 0.2
                      )}`
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{
                        fontSize: 17
                      }}
                    />
                  </Box>

                  <Typography
                    variant="overlineCustom"
                    sx={{
                      color: primary,

                      fontWeight: 800,

                      letterSpacing: '0.14em'
                    }}
                  >
                    BUILD WITH CONFIDENCE
                  </Typography>
                </Stack>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 850,

                    fontSize: {
                      xs: '1.7rem',
                      sm: '2.1rem',
                      md: '2.5rem'
                    },

                    lineHeight: 1.08,

                    letterSpacing: '-0.025em'
                  }}
                >
                  Your theme is ready.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: 650,

                    color: textSecondary,

                    lineHeight: 1.7,

                    fontSize: {
                      xs: '0.9rem',
                      sm: '0.98rem'
                    }
                  }}
                >
                  Explore the complete theme system, customize your tokens, and
                  build consistent interfaces from the same design foundation.
                </Typography>

                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={1.5}
                  sx={{
                    pt: 0.5
                  }}
                >
                  <AppButton
                    component="a"
                    href="/documentation"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      minHeight: 46,

                      px: 2.5,

                      boxShadow: {
                        xs: 'none',

                        md: `
                0 10px 30px
                ${alpha(primary, 0.28)}
              `
                      },

                      '&:hover': {
                        boxShadow: {
                          xs: 'none',

                          md: `
                  0 14px 38px
                  ${alpha(primary, 0.38)}
                `
                        }
                      }
                    }}
                  >
                    Explore Theme System
                  </AppButton>
                </Stack>
              </Stack>

              {/* ===================================================================== */}
              {/* THEME TOKEN PREVIEW                                                   */}
              {/* ===================================================================== */}

              <Box
                sx={{
                  width: {
                    xs: '100%',
                    md: 300,
                    lg: 340
                  },

                  flexShrink: 0
                }}
              >
                <Box
                  sx={{
                    p: 1.5,

                    borderRadius: 3,

                    backgroundColor: ctaSurface,

                    border: `1px solid ${alpha(
                      secondary,
                      isDarkMode ? 0.32 : 0.22
                    )}`,

                    boxShadow: isDarkMode
                      ? `
              inset 0 1px 0
              ${alpha('#ffffff', 0.06)},
              0 20px 50px
              ${alpha('#000000', 0.25)}
            `
                      : `
              inset 0 1px 0
              ${alpha('#ffffff', 0.04)},
              0 20px 50px
              ${alpha('#000000', 0.16)}
            `,

                    transform: {
                      xs: 'none',
                      md: 'rotate(2deg)'
                    },

                    transition: 'transform 0.4s ease',

                    '&:hover': {
                      transform: {
                        xs: 'none',
                        md: 'rotate(0deg) translateY(-4px)'
                      }
                    }
                  }}
                >
                  <Stack spacing={1.25}>
                    {/* =============================================================== */}
                    {/* PREVIEW HEADER                                                   */}
                    {/* =============================================================== */}

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: 'center',

                        px: 1,
                        py: 0.75
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,

                          flexShrink: 0,

                          borderRadius: '50%',

                          backgroundColor: primary,

                          boxShadow: `
                  0 0 12px
                  ${alpha(primary, 0.6)}
                `
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          color: textSecondary,

                          fontWeight: 700
                        }}
                      >
                        Theme Tokens
                      </Typography>

                      <Box
                        sx={{
                          flex: 1
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          color: primary,

                          fontFamily: 'monospace',

                          fontSize: '0.65rem',

                          fontWeight: 600
                        }}
                      >
                        {themeSet}
                      </Typography>
                    </Stack>

                    {/* =============================================================== */}
                    {/* MAIN TOKEN                                                       */}
                    {/* =============================================================== */}

                    <Box
                      sx={{
                        height: 82,

                        display: 'flex',

                        alignItems: 'flex-end',

                        p: 1.5,

                        borderRadius: 2,

                        background: `
                linear-gradient(
                  135deg,
                  ${primary},
                  ${secondary}
                )
              `,

                        boxShadow: `
                inset 0 0 35px
                ${alpha('#ffffff', 0.08)},
                0 8px 25px
                ${alpha(primary, 0.12)}
              `
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#ffffff',

                          fontWeight: 700,

                          textShadow: `
                  0 1px 3px
                  rgba(0,0,0,0.25)
                `
                        }}
                      >
                        Primary + Secondary
                      </Typography>
                    </Box>

                    {/* =============================================================== */}
                    {/* TOKEN ROWS                                                       */}
                    {/* =============================================================== */}

                    <Stack direction="row" spacing={1}>
                      {[
                        {
                          label: 'Primary',
                          color: primary
                        },
                        {
                          label: 'Secondary',
                          color: secondary
                        },
                        {
                          label: 'Surface',
                          color: surface
                        },
                        {
                          label: 'Base',
                          color: background
                        }
                      ].map((token) => (
                        <Stack
                          key={token.label}
                          spacing={0.5}
                          sx={{
                            flex: 1,
                            minWidth: 0
                          }}
                        >
                          <Box
                            sx={{
                              height: 32,

                              borderRadius: 1.25,

                              backgroundColor: token.color,

                              border: `1px solid ${alpha(
                                textPrimary,
                                isDarkMode ? 0.16 : 0.1
                              )}`,

                              boxShadow: isDarkMode
                                ? `
                        0 2px 8px
                        ${alpha('#000000', 0.18)}
                      `
                                : 'none'
                            }}
                          />

                          <Typography
                            variant="caption"
                            sx={{
                              color: textSecondary,

                              fontSize: '0.58rem',

                              overflow: 'hidden',

                              textOverflow: 'ellipsis',

                              whiteSpace: 'nowrap'
                            }}
                          >
                            {token.label}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* ================================================================= */}
          {/* FOOTER                                                           */}
          {/* ================================================================= */}

          <Box
            component="footer"
            sx={{
              mt: {
                xs: 6,
                md: 10
              },

              pt: {
                xs: 3,
                md: 4
              },

              borderTop: `1px solid ${alpha(secondary, 0.5)}`
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={{
                xs: 2.5,
                sm: 3
              }}
              sx={{
                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                },

                justifyContent: 'space-between'
              }}
            >
              {/* Brand */}

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: 'center',
                  minWidth: 0
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: 1.5,

                    backgroundColor: alpha(primary, 0.1),

                    border: `1px solid ${alpha(primary, 0.2)}`,

                    color: primary
                  }}
                >
                  <PaletteIcon
                    sx={{
                      fontSize: 18
                    }}
                  />
                </Box>

                <Stack spacing={0}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: textPrimary
                    }}
                  >
                    Cryptech Services
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: textSecondary,
                      lineHeight: 1.3
                    }}
                  >
                    Theme System
                  </Typography>
                </Stack>
              </Stack>

              {/* Navigation */}

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <AppButton
                  component="a"
                  href="/documentation"
                  variant="text"
                  color="primary"
                  size="small"
                  startIcon={<PaletteIcon />}
                  sx={{
                    minHeight: 36,
                    px: 1.25,
                    borderRadius: 1.5,

                    '&:hover': {
                      backgroundColor: alpha(primary, 0.08)
                    }
                  }}
                >
                  Documentation
                </AppButton>

                {GITHUB_URL && (
                  <AppButton
                    component="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    color="secondary"
                    size="small"
                    startIcon={<GitHubIcon />}
                    sx={{
                      minHeight: 36,
                      px: 1.25,
                      borderRadius: 1.5,

                      '&:hover': {
                        backgroundColor: alpha(secondary, 0.08)
                      }
                    }}
                  >
                    GitHub
                  </AppButton>
                )}
              </Stack>
            </Stack>

            {/* Bottom line */}

            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={1}
              sx={{
                pt: 2,

                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                },

                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: textSecondary
                }}
              >
                Built with MUI · Designed for scalable interfaces
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: primary,
                    boxShadow: {
                      xs: 'none',
                      md: `0 0 10px ${alpha(primary, 0.6)}`
                    }
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: textSecondary,
                    fontFamily: 'monospace'
                  }}
                >
                  {themeSet}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
