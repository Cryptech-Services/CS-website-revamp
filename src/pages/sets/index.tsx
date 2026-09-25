'use client';

import * as React from 'react';

import Head from 'next/head';

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import FloatingThemeControls from '@/theme/components/FloatingThemeControls';
import Navbar from '@/theme/layout/Navbar';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS } from '@/theme/theme';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

type ThemeItem = {
  label: string;
  category: string;
  color: string;
  secondary: string;
  gray: string;
  background: string;
  icon?: string;
};

function ThemeGallery() {
  const theme = useTheme();

  const [activeCategory, setActiveCategory] = React.useState('classic');

  type ThemeKey = keyof typeof THEME_SETS;

  const items = Object.entries(THEME_SETS).filter(
    ([key]) => key !== 'custom'
  ) as [Exclude<ThemeKey, 'custom'>, ThemeItem][];

  const categories = Array.from(
    new Set(items.map(([, item]) => item.category))
  );

  const categoryLabels: Record<string, string> = {
    classic: 'Classic',
    mythology: 'Mythology',
    minecraft: 'Minecraft',
    cosmic: 'Cosmic',
    premium: 'Premium',
    hogwarts: 'Hogwarts',
    elements: 'Elements'
  };

  const categoryItems = items.filter(
    ([, item]) => item.category === activeCategory
  );

  const activeCategoryItem = categoryItems[0]?.[1];

  const activeCategoryColor = activeCategoryItem?.color ?? theme.colorScale[9];
  const { themeSet, setThemeSet } = useThemeContext();

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* Category Tabs */}

      <Paper
        variant="outlined"
        sx={{
          p: 0.5,

          borderRadius: 2.5,

          position: 'sticky',
          top: 12,

          zIndex: 20,

          overflow: 'hidden',

          border: '1px solid',

          borderColor: alpha(theme.secondaryScale[6], 0.8),

          backgroundColor: alpha(
            theme.backgroundScale[2],
            theme.palette.mode === 'dark' ? 0.7 : 0.9
          ),

          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)'
        }}
      >
        <Tabs
          value={activeCategory}
          onChange={(_, value: string) => {
            setActiveCategory(value);
          }}
          variant="scrollable"
          scrollButtons={false}
          allowScrollButtonsMobile
          sx={{
            width: '100%',

            minHeight: 36,

            '& .MuiTabs-flexContainer': {
              gap: 0.5
            },

            '& .MuiTabs-scroller': {
              overflowX: 'auto !important',
              scrollbarWidth: 'none',

              '&::-webkit-scrollbar': {
                display: 'none'
              }
            },

            '& .MuiTabs-indicator': {
              display: 'none'
            },

            '& .MuiTab-root': {
              flex: '0 0 auto',

              minHeight: 36,

              minWidth: {
                xs: 90,
                sm: 105
              },

              px: 1.5,

              borderRadius: 2,

              textTransform: 'capitalize',

              fontSize: {
                xs: '0.75rem',
                sm: '0.8rem'
              },

              fontWeight: 650,

              color: theme.grayScale[10],

              transition:
                'color 180ms ease, background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',

              '& .MuiTab-iconWrapper': {
                fontSize: 18
              },

              '&.Mui-selected': {
                color: '#ffffff',

                background: `linear-gradient(
                    135deg,
                    ${theme.colorScale[9]},
                    ${theme.secondaryScale[9]}
                  )`,

                boxShadow: `0 3px 12px ${alpha(theme.colorScale[9], 0.2)}`
              },

              '&:hover': {
                backgroundColor: alpha(theme.colorScale[9], 0.07)
              },

              '&.Mui-selected:hover': {
                background: `linear-gradient(
                    135deg,
                    ${theme.colorScale[9]},
                    ${theme.secondaryScale[9]}
                  )`,

                boxShadow: `0 4px 14px ${alpha(theme.colorScale[9], 0.26)}`
              }
            }
          }}
        >
          {categories.map((category) => {
            const count = items.filter(
              ([, item]) => item.category === category
            ).length;

            const isSelected = activeCategory === category;

            return (
              <Tab
                key={category}
                value={category}
                disableRipple
                label={
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: 'inherit',
                        fontWeight: 'inherit',
                        lineHeight: 1
                      }}
                    >
                      {categoryLabels[category] ?? category}
                    </Typography>

                    <Box
                      component="span"
                      sx={{
                        minWidth: 20,
                        height: 20,

                        px: 0.55,

                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        borderRadius: 10,

                        fontSize: 9,
                        lineHeight: 1,
                        fontWeight: 800,

                        color: isSelected ? '#ffffff' : theme.grayScale[10],

                        backgroundColor: isSelected
                          ? alpha('#ffffff', 0.14)
                          : alpha(theme.grayScale[10], 0.08),

                        border: `1px solid ${
                          isSelected
                            ? alpha('#ffffff', 0.16)
                            : alpha(theme.grayScale[10], 0.1)
                        }`
                      }}
                    >
                      {count}
                    </Box>
                  </Stack>
                }
              />
            );
          })}
        </Tabs>
      </Paper>

      {/* Active Category */}

      {/* Theme Cards */}

      <Box
        sx={{
          p: {
            xs: 1.25,
            md: 1.5
          },

          display: 'grid',

          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))'
          },

          gap: 1.5
        }}
      >
        {categoryItems.map(([key, item]) => {
          const color = item.color;
          const secondary = item.secondary;
          const gray = item.gray;
          const background = item.background;
          const icon = item.icon ?? color;

          const isDark = theme.palette.mode === 'dark';
          const isActive = themeSet === key;
          const cardBackground = isDark
            ? `linear-gradient(
          145deg,
          ${background} 0%,
          ${gray}45 100%
        )`
            : `linear-gradient(
          145deg,
          ${theme.backgroundScale[1]} 0%,
          ${theme.backgroundScale[3]} 100%
        )`;

          const cardBorder = isDark ? alpha(color, 0.35) : alpha(color, 0.35);

          const cardShadow = isDark
            ? `
          0 14px 40px ${alpha(theme.grayScale[1], 0.22)},
          inset 0 1px 0 ${alpha(color, 0.12)}
        `
            : `
          0 8px 24px ${alpha(theme.grayScale[12], 0.06)},
          0 1px 2px ${alpha(theme.grayScale[12], 0.04)}
        `;

          return (
            <Box
              key={key}
              role="button"
              tabIndex={0}
              aria-label={`Apply ${item.label} theme`}
              aria-pressed={isActive}
              onClick={() => setThemeSet(key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setThemeSet(key);
                }
              }}
              sx={{
                minWidth: 0,

                height: {
                  xs: 180,
                  sm: 190,
                  md: 200
                },

                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',

                cursor: 'pointer',

                background: cardBackground,

                border: '2px solid',
                borderColor: isActive ? color : cardBorder,

                isolation: 'isolate',

                transition:
                  'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',

                '&:hover': {
                  transform: 'translateY(-4px)',

                  borderColor: alpha(color, isDark ? 0.55 : 0.4),

                  boxShadow: isDark
                    ? `
            0 20px 50px ${alpha(color, 0.16)},
            inset 0 1px 0 ${alpha(color, 0.18)}
          `
                    : `
            0 14px 34px ${alpha(theme.grayScale[12], 0.1)},
            0 0 0 1px ${alpha(color, 0.08)}
          `
                },

                '&:focus-visible': {
                  outline: 'none',

                  borderColor: color,

                  boxShadow: `
        0 0 0 3px ${alpha(color, 0.2)},
        0 14px 40px ${alpha(color, isDark ? 0.18 : 0.1)}
      `
                }
              }}
            >
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 12,
                    zIndex: 3,

                    px: 1,
                    py: 0.45,

                    borderRadius: 10,

                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,

                    backgroundColor: isDark
                      ? alpha(color, 0.14)
                      : alpha(color, 0.08),

                    border: '1px solid',
                    borderColor: isDark
                      ? alpha(color, 0.35)
                      : alpha(color, 0.22),

                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: color,
                      boxShadow: isDark
                        ? `0 0 8px ${alpha(color, 0.8)}`
                        : 'none'
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 8,
                      lineHeight: 1,
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: isDark ? color : theme.grayScale[11]
                    }}
                  >
                    Active
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,

                  background: isDark
                    ? `
                  radial-gradient(
                    circle at 88% 12%,
                    ${alpha(secondary, 0.1)} 0%,
                    transparent 38%
                  ),
                  radial-gradient(
                    circle at 8% 92%,
                    ${alpha(color, 0.1)} 0%,
                    transparent 42%
                  )
                `
                    : `
                  radial-gradient(
                    circle at 92% 8%,
                    ${alpha(secondary, 0.2)} 0%,
                    transparent 36%
                  ),
                  radial-gradient(
                    circle at 5% 95%,
                    ${alpha(color, 0.1)} 0%,
                    transparent 40%
                  )
                `,

                  pointerEvents: 'none'
                }}
              />

              <Box
                sx={{
                  position: 'absolute',

                  width: isDark ? 170 : 130,
                  height: isDark ? 170 : 130,

                  top: isDark ? -95 : -70,
                  right: isDark ? -45 : -35,

                  borderRadius: '50%',

                  backgroundColor: secondary,

                  opacity: isDark ? 0.08 : 0.035,

                  filter: isDark ? 'blur(38px)' : 'blur(32px)',

                  pointerEvents: 'none'
                }}
              />

              <Box
                sx={{
                  position: 'absolute',

                  width: isDark ? 130 : 110,
                  height: isDark ? 130 : 110,

                  bottom: isDark ? -80 : -65,
                  left: isDark ? -40 : -30,

                  borderRadius: '50%',

                  backgroundColor: color,

                  opacity: isDark ? 0.07 : 0.025,

                  filter: isDark ? 'blur(34px)' : 'blur(28px)',

                  pointerEvents: 'none'
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,

                  opacity: isDark ? 0.035 : 0.025,

                  backgroundImage: `
              linear-gradient(
                ${alpha(color, 1)} 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                ${alpha(color, 1)} 1px,
                transparent 1px
              )
            `,

                  backgroundSize: '28px 28px',

                  maskImage:
                    'linear-gradient(to bottom, black, transparent 90%)',

                  WebkitMaskImage:
                    'linear-gradient(to bottom, black, transparent 90%)',

                  pointerEvents: 'none'
                }}
              />

              <Stack
                sx={{
                  position: 'relative',
                  zIndex: 1,

                  height: '100%',

                  p: 2,

                  justifyContent: 'space-between'
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1
                  }}
                >
                  <Box
                    sx={{
                      width: 38,
                      height: 38,

                      flexShrink: 0,

                      borderRadius: 2.25,

                      display: 'grid',
                      placeItems: 'center',

                      backgroundColor: isDark
                        ? alpha(color, 0.08)
                        : alpha(color, 0.06),

                      border: '1px solid',
                      borderColor: isDark
                        ? alpha(color, 0.25)
                        : alpha(color, 0.16),

                      boxShadow: isDark
                        ? `inset 0 1px 0 ${alpha(color, 0.1)}`
                        : `inset 0 1px 0 ${alpha(theme.grayScale[12], 0.04)}`
                    }}
                  >
                    <Box
                      sx={{
                        width: 11,
                        height: 11,

                        borderRadius: '50%',

                        backgroundColor: icon,

                        boxShadow: isDark
                          ? `
                        0 0 8px ${alpha(icon, 0.8)},
                        0 0 18px ${alpha(icon, 0.45)}
                      `
                          : `0 0 8px ${alpha(icon, 0.2)}`
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      minWidth: 0,

                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',

                      fontSize: 8,
                      fontWeight: 800,

                      letterSpacing: '0.13em',

                      textTransform: 'uppercase',

                      color: isDark
                        ? alpha(color, 0.7)
                        : alpha(theme.grayScale[10], 0.7)
                    }}
                  >
                    {activeCategory}
                  </Typography>
                </Stack>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 20,
                        md: 22
                      },

                      lineHeight: 1,

                      fontWeight: 800,

                      letterSpacing: '-0.035em',

                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',

                      color: isDark ? color : theme.grayScale[12],

                      textShadow: isDark
                        ? `
                      0 0 18px ${alpha(color, 0.28)},
                      0 0 35px ${alpha(color, 0.1)}
                    `
                        : 'none'
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.75,

                      fontSize: 10,

                      fontWeight: 500,

                      color: isDark ? alpha(secondary, 0.8) : theme.grayScale[9]
                    }}
                  >
                    Theme system
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={0.6}
                  sx={{
                    alignItems: 'center',
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 7,

                      flexShrink: 0,

                      borderRadius: 10,

                      backgroundColor: color,

                      boxShadow: isDark
                        ? `0 0 10px ${alpha(color, 0.35)}`
                        : 'none'
                    }}
                  />

                  <Box
                    sx={{
                      width: 25,
                      height: 7,

                      flexShrink: 0,

                      borderRadius: 10,

                      backgroundColor: secondary
                    }}
                  />

                  <Box
                    sx={{
                      width: 21,
                      height: 7,

                      flexShrink: 0,

                      borderRadius: 10,

                      backgroundColor: gray
                    }}
                  />

                  <Box
                    sx={{
                      width: 21,
                      height: 7,

                      flexShrink: 0,

                      borderRadius: 10,

                      backgroundColor: background,

                      border: '1px solid',
                      borderColor: isDark
                        ? alpha(color, 0.25)
                        : alpha(theme.grayScale[12], 0.1)
                    }}
                  />

                  <Typography
                    sx={{
                      ml: 'auto !important',

                      minWidth: 0,
                      maxWidth: '40%',

                      overflow: 'hidden',

                      textOverflow: 'ellipsis',

                      whiteSpace: 'nowrap',

                      fontSize: 8,

                      fontWeight: 700,

                      letterSpacing: '0.02em',

                      color: isDark ? alpha(color, 0.55) : theme.grayScale[8]
                    }}
                  >
                    {key}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}

export default function ThemeGalleryPage() {
  const theme = useTheme();

  const { themeSet, setThemeSet } = useThemeContext();

  const activeTheme = THEME_SETS[themeSet]?.label ?? 'Custom';

  const themeCount = Object.keys(THEME_SETS).length - 1;
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <Head>
        <title>Theme Gallery | {activeTheme}</title>

        <meta
          name="description"
          content="Explore the complete theme gallery and preview the available design system themes."
        />
      </Head>

      <Navbar />

      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',

          backgroundColor: theme.backgroundScale[3]
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,

            opacity: isDark ? 0.075 : 0.075,

            backgroundImage: `
                                      linear-gradient(
                                        ${alpha(theme.colorScale[9], 1)} 1px,
                                        transparent 1px
                                      ),
                                      linear-gradient(
                                        90deg,
                                        ${alpha(theme.colorScale[9], 1)} 1px,
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
        {/* Ambient background */}

        <Box
          sx={{
            position: 'absolute',

            top: -220,
            left: { xs: '-10%', xxl: '2.5%', xxxxl: '15%', xxxxxl: '20%' },

            width: 500,
            height: 500,

            borderRadius: '50%',

            backgroundColor: alpha(theme.colorScale[9], 0.1),

            filter: 'blur(100px)',
            display: { xs: 'none', md: 'block' },
            pointerEvents: 'none'
          }}
        />

        <Box
          sx={{
            position: 'absolute',

            top: 500,
            right: '-10%',

            width: 500,
            height: 500,

            borderRadius: '50%',

            backgroundColor: alpha(theme.secondaryScale[9], 0.06),

            filter: 'blur(110px)',
            display: { xs: 'none', md: 'block' },
            pointerEvents: 'none'
          }}
        />

        <Stack
          spacing={4}
          sx={{
            position: 'relative',

            width: '100%',

            maxWidth: 1600,

            mx: 'auto',

            px: {
              xs: 1.5,
              sm: 2.5,
              md: 4,
              lg: 5
            },

            py: {
              xs: 3,
              md: 5
            }
          }}
        >
          {/* Header */}

          <Stack spacing={2}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={2}
              sx={{
                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                },

                justifyContent: 'space-between'
              }}
            >
              <Stack spacing={0.5}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,

                      borderRadius: '50%',

                      backgroundColor: theme.colorScale[9],

                      boxShadow: `0 0 0 5px ${alpha(theme.colorScale[9], 0.1)}`
                    }}
                  />

                  <Typography
                    variant="overlineCustom"
                    sx={{
                      color: theme.colorScale[9],

                      letterSpacing: '0.14em'
                    }}
                  >
                    Design system
                  </Typography>
                </Stack>

                <Typography variant="title">Theme Gallery</Typography>
              </Stack>

              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label={activeTheme}
                sx={{
                  height: 38,

                  px: 0.75,

                  fontWeight: 800,

                  borderRadius: 2,

                  backgroundColor: alpha(theme.colorScale[9], 0.1),

                  border: `1px solid ${alpha(theme.colorScale[9], 0.2)}`
                }}
              />
            </Stack>

            <Typography
              variant="large"
              sx={{
                color: theme.grayScale[11],

                maxWidth: 820
              }}
            >
              Explore the complete collection of theme presets and see how each
              color system transforms the visual language of the application.
            </Typography>
          </Stack>

          {/* Gallery */}

          <Stack spacing={2}>
            <Paper
              variant="outlined"
              sx={{
                width: '100%',

                overflow: 'hidden',

                borderRadius: {
                  xs: 2.5,
                  md: 3.5
                },

                borderColor: alpha(theme.secondaryScale[6], 0.8),

                backgroundColor: theme.secondaryScale[4],

                boxShadow: `
                  0 30px 100px
                  ${alpha(theme.grayScale[1], 0.18)}
                `
              }}
            >
              {/* Gallery Toolbar */}

              <Box
                sx={{
                  px: {
                    xs: 1.5,
                    sm: 2,
                    md: 3
                  },

                  py: {
                    xs: 1.5,
                    md: 2
                  },

                  borderBottom: `1px solid ${theme.grayScale[6]}`,

                  backgroundColor: theme.secondaryScale[5]
                }}
              >
                <Stack
                  direction={{
                    xs: 'column',
                    sm: 'row'
                  }}
                  spacing={1}
                  sx={{
                    alignItems: {
                      xs: 'flex-start',
                      sm: 'center'
                    },

                    justifyContent: 'space-between'
                  }}
                >
                  <Stack spacing={0.25}>
                    <Typography
                      variant="label"
                      sx={{
                        color: theme.grayScale[11],

                        fontWeight: 700
                      }}
                    >
                      Theme Presets
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.grayScale[9]
                      }}
                    >
                      Browse themes by collection
                    </Typography>
                  </Stack>

                  <Chip
                    size="small"
                    icon={<PaletteIcon />}
                    label={`${themeCount} themes`}
                    sx={{
                      fontWeight: 700,

                      backgroundColor: alpha(theme.colorScale[9], 0.08),

                      border: `1px solid ${alpha(theme.colorScale[9], 0.16)}`
                    }}
                  />
                </Stack>
              </Box>

              {/* Gallery Content */}

              <Box
                sx={{
                  p: {
                    xs: 1,
                    sm: 1.5,
                    md: 2
                  }
                }}
              >
                <ThemeGallery />
              </Box>
            </Paper>
          </Stack>

          {/* Live State */}

          <Paper
            variant="outlined"
            sx={{
              p: {
                xs: 2,
                sm: 2.5
              },

              borderRadius: 3,

              background: `
                linear-gradient(
                  135deg,
                  ${alpha(theme.colorScale[9], 0.05)},
                  ${alpha(theme.secondaryScale[9], 0.04)}
                )
              `,

              borderColor: alpha(theme.secondaryScale[6], 0.7)
            }}
          >
            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={2}
              sx={{
                alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                },

                justifyContent: 'space-between'
              }}
            >
              <Stack spacing={0.25}>
                <Typography
                  variant="label"
                  sx={{
                    fontWeight: 700,
                    color: theme.grayScale[11]
                  }}
                >
                  Live theme state
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: theme.grayScale[9]
                  }}
                >
                  The gallery reflects the currently active design system theme.
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  flexWrap: 'wrap'
                }}
              >
                <Chip
                  size="small"
                  icon={<AutoAwesomeRoundedIcon />}
                  label={activeTheme}
                  sx={{
                    fontWeight: 700,

                    backgroundColor: alpha(theme.colorScale[9], 0.1),

                    border: `1px solid ${alpha(theme.colorScale[9], 0.18)}`
                  }}
                />

                <Chip
                  size="small"
                  label={`${themeCount} presets`}
                  sx={{
                    fontWeight: 700,

                    backgroundColor: alpha(theme.secondaryScale[9], 0.08),

                    border: `1px solid ${alpha(theme.secondaryScale[9], 0.16)}`
                  }}
                />
              </Stack>
            </Stack>
          </Paper>

          {/* Footer */}

          <Box
            component="footer"
            sx={{
              mt: {
                xs: 2,
                lg: 4
              }
            }}
          >
            <Divider
              sx={{
                borderColor: alpha(theme.secondaryScale[7], 0.35)
              }}
            />

            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={{
                xs: 1.5,
                sm: 2
              }}
              sx={{
                mt: {
                  xs: 2,
                  lg: 3
                },

                pb: {
                  xs: 2,
                  lg: 0
                },

                alignItems: 'center',

                justifyContent: 'center',

                color: theme.grayScale[11]
              }}
            >
              <Typography
                variant="small"
                sx={{
                  color: theme.grayScale[11],

                  fontWeight: 600,

                  textAlign: 'center'
                }}
              >
                Cryptech Services Design System
              </Typography>

              <Box
                component="span"
                aria-hidden
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block'
                  },

                  width: 4,
                  height: 4,

                  borderRadius: '50%',

                  backgroundColor: theme.grayScale[7]
                }}
              />

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  alignItems: 'center',

                  justifyContent: 'center'
                }}
              >
                <Button
                  component="a"
                  href="/documentation"
                  size="small"
                  startIcon={<PaletteIcon />}
                  sx={{
                    minHeight: 34,

                    px: 1.25,

                    borderRadius: 1.5,

                    color: theme.grayScale[10],

                    '&:hover': {
                      color: theme.colorScale[9],

                      backgroundColor: alpha(theme.colorScale[9], 0.08)
                    }
                  }}
                >
                  Theme
                </Button>

                {GITHUB_URL && (
                  <Button
                    component="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    startIcon={<GitHubIcon />}
                    sx={{
                      minHeight: 34,

                      px: 1.25,

                      borderRadius: 1.5,

                      color: theme.grayScale[10],

                      '&:hover': {
                        color: theme.secondaryScale[9],

                        backgroundColor: alpha(theme.secondaryScale[9], 0.08)
                      }
                    }}
                  >
                    GitHub
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <FloatingThemeControls />
      </Box>
    </>
  );
}
