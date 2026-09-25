'use client';

import { useEffect, useState } from 'react';

import Head from 'next/head';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';

import { useThemeContext } from '@/contexts/themeContext';
import { THEME_SETS } from '@/theme/theme';

import { AppTab, AppTabs } from '@/theme/components/CustomComponents';
import FloatingThemeControls from '@/theme/components/FloatingThemeControls';

import ColorsSection from '@/theme/layout/ColorsSection';
import ComponentsSection from '@/theme/layout/ComponentsSection';
import ColorPresetsSection from '@/theme/layout/ColorPresetSection';
import OverviewSection from '@/theme/layout/OverviewSection';
import ShowcaseSidebar, {
  type MenuKey,
  type ShowcaseTab
} from '@/theme/layout/ShowcaseSidebar';
import TypographySection from '@/theme/layout/TypographySection';
import Navbar from '@/theme/layout/Navbar';
import BreakpointsSection from '@/theme/layout/BreakpointsSection';

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

const SHOWCASE_TABS: ShowcaseTab[] = [
  'overview',
  'typography',
  'colors',
  'presets',
  'breakpoints',
  'components'
];

function isShowcaseTab(value: string | null): value is ShowcaseTab {
  return value !== null && SHOWCASE_TABS.includes(value as ShowcaseTab);
}

export default function TypographyShowcase() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const tabFromUrl = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<ShowcaseTab>(
    isShowcaseTab(tabFromUrl) ? tabFromUrl : 'overview'
  );

  const [openMenus, setOpenMenus] = useState<Record<MenuKey, boolean>>(() => {
    const initialTab = isShowcaseTab(tabFromUrl) ? tabFromUrl : 'overview';

    return {
      overview: initialTab === 'overview',
      typography: initialTab === 'typography',
      colors: initialTab === 'colors',
      breakpoints: initialTab === 'breakpoints',
      components: initialTab === 'components',
      presets: initialTab === 'presets'
    };
  });
  const { themeSet } = useThemeContext();

  useEffect(() => {
    const tab = isShowcaseTab(tabFromUrl) ? tabFromUrl : 'overview';

    setActiveTab(tab);

    setOpenMenus({
      overview: tab === 'overview',
      typography: tab === 'typography',
      colors: tab === 'colors',
      breakpoints: tab === 'breakpoints',
      components: tab === 'components',
      presets: tab === 'presets'
    });
  }, [tabFromUrl]);

  const handleTabChange = (tab: ShowcaseTab) => {
    setActiveTab(tab);

    const params = new URLSearchParams(searchParams.toString());
    const orderedParams = new URLSearchParams();

    orderedParams.set('tab', tab);

    params.forEach((value, key) => {
      if (key !== 'tab') {
        orderedParams.append(key, value);
      }
    });

    router.replace(`${pathname}?${orderedParams.toString()}`, {
      scroll: false
    });
  };

  const toggleMenu = (menu: MenuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const openMenuAndScroll = (menu: ShowcaseTab, sectionId: string) => {
    handleTabChange(menu);

    setOpenMenus({
      overview: false,
      typography: false,
      colors: false,
      breakpoints: false,
      components: false,
      presets: false,
      [menu]: true
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });
    });
  };

  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <Head>
        <title>
          Typography & Colors | {THEME_SETS[themeSet]?.label ?? 'Custom'}
        </title>

        <meta
          name="description"
          content="Typography and color system showcase"
        />
      </Head>

      <Navbar />

      <Box
        sx={{
          minHeight: '100vh',
          overflowX: 'clip',
          background: alpha(theme.backgroundScale[4], 0.75),
          color: 'text.primary'
        }}
      >
        <Grid
          container
          columns={12}
          spacing={{ xs: 0, xxl: 4 }}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            minHeight: '100vh',
            alignItems: 'stretch'
          }}
        >
          <Grid
            size={{ xs: 12, md: 2.5 }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            {!isMobile && (
              <Box
                sx={{
                  width: '100%',
                  position: 'sticky',

                  top: 66,

                  zIndex: 1,

                  height: 'calc(100vh - 66px)',
                  maxHeight: 'calc(100vh - 66px)'
                }}
              >
                <ShowcaseSidebar
                  activeTab={activeTab}
                  openMenus={openMenus}
                  setActiveTab={(tab) => {
                    handleTabChange(tab);
                  }}
                  toggleMenu={toggleMenu}
                  openMenuAndScroll={openMenuAndScroll}
                  themeSet={themeSet}
                />
              </Box>
            )}
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 9.5,
              xxl: 8.5,
              xxxxl: 7.15
            }}
            sx={{
              minWidth: 0,
              maxWidth: '100%',
              minHeight: { md: '100vh' },
              py: { xs: 4, lg: 5 },
              overflowX: 'clip'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                height: '75vh',
                opacity: isDark ? 0.05 : 0.075,

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
                pointerEvents: 'none',
                zIndex: -1
              }}
            />

            <Box
              sx={{
                position: 'absolute',

                top: -220,
                left: '15%',

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

            <Stack spacing={{ xs: 2, md: 3 }}>
              <Stack
                sx={{
                  px: {
                    xs: '1rem !important',
                    md: '2rem !important',
                    lg: '0 !important'
                  }
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center',
                    pl: {
                      xs: '0rem !important',
                      lg: '2rem !important',
                      xxl: 'unset'
                    }
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
                      color: theme.colorScale[9]
                    }}
                  >
                    Design System
                  </Typography>
                </Stack>

                <Typography
                  variant="title"
                  sx={{
                    mt: 1,
                    pl: {
                      xs: '0rem !important',
                      lg: '2rem !important',
                      xxl: 'unset'
                    }
                  }}
                >
                  Typography & Colors
                </Typography>

                <Typography
                  variant="large"
                  sx={{
                    color: theme.grayScale[11],
                    mt: 2,
                    mb: 2,
                    pl: {
                      xs: '0rem !important',
                      lg: '2rem !important',
                      xxl: 'unset'
                    }
                  }}
                >
                  A complete showcase of the typography variants, semantic color
                  scales, spacing, components, and responsive behavior used
                  throughout the application.
                </Typography>

                <Box
                  sx={{
                    px: {
                      xs: '0rem !important',
                      lg: '2rem !important',
                      xxl: 'unset'
                    }
                  }}
                >
                  <Divider />
                </Box>
              </Stack>

              <Box
                sx={{
                  display: { xs: 'block', lg: 'none' },
                  width: '100%',
                  px: { xs: 1.5, sm: 2 },
                  mb: 2
                }}
              >
                <AppTabs
                  value={activeTab}
                  onChange={(_, value) => {
                    handleTabChange(value as ShowcaseTab);
                  }}
                  variant="scrollable"
                  scrollButtons={false}
                  sx={{
                    width: '100%',
                    minHeight: 44,
                    p: 0.5,
                    color: theme.colorScale[12],
                    border: '1px solid',
                    borderColor: alpha(theme.secondaryScale[6], 0.8),
                    borderRadius: 2.5,
                    backgroundColor: alpha(
                      theme.backgroundScale[2],
                      theme.palette.mode === 'dark' ? 0.7 : 0.9
                    ),
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',

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
                    }
                  }}
                >
                  {SHOWCASE_TABS.map((tab) => (
                    <AppTab
                      key={tab}
                      value={tab}
                      label={tab}
                      sx={{
                        flex: '0 0 auto',
                        textTransform: 'capitalize',

                        minWidth: {
                          xs: 90,
                          sm: 105
                        },

                        minHeight: 36,
                        px: 1.5,
                        borderRadius: 2,

                        fontSize: {
                          xs: '0.75rem',
                          sm: '0.8rem'
                        },

                        '&.Mui-selected': {
                          color: '#ffffff',

                          background: `linear-gradient(
                            135deg,
                            ${theme.colorScale[9]},
                            ${theme.secondaryScale[9]}
                          )`,

                          boxShadow: `0 3px 12px ${alpha(
                            theme.colorScale[9],
                            0.2
                          )}`
                        },

                        '&:hover': {
                          backgroundColor: alpha(theme.colorScale[9], 0.07)
                        }
                      }}
                    />
                  ))}
                </AppTabs>
              </Box>

              {activeTab === 'overview' && <OverviewSection />}

              {activeTab === 'typography' && <TypographySection />}

              {activeTab === 'colors' && <ColorsSection />}

              {activeTab === 'presets' && <ColorPresetsSection />}

              {activeTab === 'breakpoints' && <BreakpointsSection />}

              {activeTab === 'components' && <ComponentsSection />}

              <Box
                component="footer"
                sx={{
                  mt: {
                    xs: 4,
                    lg: 6
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
                  {/* Brand */}

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

                  {/* Separator */}

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

                  {/* Navigation */}

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
                            backgroundColor: alpha(
                              theme.secondaryScale[9],
                              0.08
                            )
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
          </Grid>
        </Grid>

        <FloatingThemeControls />
      </Box>
    </>
  );
}
