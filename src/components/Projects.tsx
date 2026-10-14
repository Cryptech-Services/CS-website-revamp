'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Chip,
  Pagination,
  Link as MuiLink,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';

type ProjectType = 'web' | 'web3' | 'design' | 'game';

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  type: ProjectType;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  banner?: string;
};

type ProjectsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  projects?: Project[];
};

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

const defaultProjects: Project[] = [
  {
    number: '01',
    title: 'METRIX.PLACE',
    category: 'BLOCKCHAIN · COLLABORATIVE ART',
    description:
      'A communal graffiti board where anyone can claim a single pixel at any address through a Metrix Coin transaction. Each contribution requires a transaction and its associated gas fee, turning the blockchain into a shared, evolving canvas.',
    technologies: ['MetrixCoin', 'Blockchain', 'MRX', 'On-chain Transactions'],
    type: 'web3',
    liveUrl: 'https://metrix.place',
    banner: '/static/images/projects/metrixplace-splashart.png'
  },
  {
    number: '02',
    title: 'MetrixLGP',
    category: 'DEFI · LIQUID GOVERNANCE',
    description:
      'The Metrix Liquid Governance Protocol leverages the MetrixCoin Decentralized Governance Protocol to let MRX holders create Liquid Governance positions. Participants provide MRX as collateral to enroll AutoGovernor smart contracts into the MetrixCoin DGP.',
    technologies: ['MetrixCoin', 'MRX', 'Smart Contracts', 'Governance'],
    type: 'web3',
    liveUrl: 'https://metrixlgp.finance/',
    banner: '/static/images/projects/metrixlgp-splashart.png'
  },
  {
    number: '03',
    title: 'METRIMASK MOBILE',
    category: 'WEB3 · MOBILE WALLET',
    description:
      'A MetrixCoin Web3 wallet with an embedded browser. Send and receive MRX and MRC20 tokens, then connect to Web3 websites and interact with decentralized applications built for the Metrix chain directly from your mobile device.',
    technologies: ['MetrixCoin', 'MRX', 'MRC20', 'Web3 Wallet', 'Mobile'],
    type: 'web3',
    banner: '/static/images/projects/metrimask-splashart.png'
  },
  {
    number: '04',
    title: 'ARCANA',
    category: 'NFT · PROGRESSIVE JACKPOT',
    description:
      'Unlock the power of the Arcana78 NFT collection and participate in a decentralized progressive jackpot raffle. Draws are transparently secured by the MetrixCoin blockchain, where every ticket brings participants closer to legendary rewards.',
    technologies: ['NFTs', 'MetrixCoin', 'Web3', 'Progressive Jackpot'],
    type: 'web3',
    liveUrl: 'https://arcana78.dev',
    featured: false,
    banner: '/static/images/projects/arcana-splashart.png'
  },
  {
    number: '05',
    title: 'Theme Boilerplate',
    category: 'DESIGN SYSTEM · UI ENGINEERING',
    description:
      'A modern design foundation for building beautiful, scalable, and consistent theme-aware interfaces. Features customizable color systems, light and dark modes, typography, responsive breakpoints, and reusable components for a cohesive development experience.',
    technologies: ['Next.js', 'React', 'TypeScript', 'MUI', 'Design Systems'],
    type: 'design',
    liveUrl: 'https://theme-boiler-plate-swart.vercel.app/',
    banner: '/static/images/projects/theme-splashart.png'
  }
];

const filters = ['All', 'Web Development', 'Web3', 'Design', 'Game Servers'];

const PROJECTS_PER_PAGE = 3;

export default function Projects({
  eyebrow = 'FLAGSHIP PROJECTS',
  title = 'Building what comes next.',
  description = 'Explore our work across blockchain innovation, decentralized governance, Web3 applications, and scalable interface engineering.',
  projects = defaultProjects
}: ProjectsProps) {
  const theme = useTheme();
  const customTheme = theme;
  const isDark = theme.palette.mode === 'dark';

  const [activeFilter, setActiveFilter] = React.useState('All');
  const [page, setPage] = React.useState(1);

  const primary = customTheme.colorScale?.[9] ?? theme.palette.primary.main;

  const secondary =
    customTheme.secondaryScale?.[9] ?? theme.palette.secondary.main;

  const headingColor =
    customTheme.grayScale?.[12] ?? theme.palette.text.primary;

  const mutedColor =
    customTheme.grayScale?.[10] ?? theme.palette.text.secondary;

  const surface =
    customTheme.secondaryScale?.[4] ?? theme.palette.background.default;

  const cardSurface =
    customTheme.backgroundScale?.[3] ?? theme.palette.background.paper;

  const borderColor = alpha(headingColor, isDark ? 0.16 : 0.12);

  const filteredProjects = React.useMemo(
    () =>
      projects.filter((project) => {
        if (activeFilter === 'All') return true;

        if (activeFilter === 'Web Development') {
          return project.type === 'web';
        }

        if (activeFilter === 'Web3') {
          return project.type === 'web3';
        }

        if (activeFilter === 'Design') {
          return project.type === 'design';
        }

        if (activeFilter === 'Game Servers') {
          return project.type === 'game';
        }

        return true;
      }),
    [projects, activeFilter]
  );

  const pageCount = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const visibleProjects = filteredProjects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE
  );

  React.useEffect(() => {
    setPage((currentPage) =>
      Math.min(Math.max(currentPage, 1), Math.max(pageCount, 1))
    );
  }, [pageCount]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box
      component="section"
      id="work"
      aria-labelledby="projects-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        bgcolor: surface,
        color: headingColor
      }}
    >
      {/* Background accents */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -220,
          right: '-12%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${alpha(primary, isDark ? 0.12 : 0.08)},
            transparent 70%
          )`,
          pointerEvents: 'none'
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -240,
          left: '-15%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${alpha(secondary, isDark ? 0.1 : 0.07)},
            transparent 70%
          )`,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Section heading */}
        <Stack
          spacing={2.5}
          sx={{
            maxWidth: 800,
            mx: 'auto',
            mb: { xs: 4, md: 6 },
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 26,
                height: 2,
                bgcolor: primary,
                borderRadius: 2
              }}
            />

            <Typography
              sx={{
                color: primary,
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.16em'
              }}
            >
              {eyebrow}
            </Typography>

            <Box
              sx={{
                width: 26,
                height: 2,
                bgcolor: secondary,
                borderRadius: 2
              }}
            />
          </Stack>

          <Typography
            id="projects-heading"
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.055em',
              lineHeight: 1.12,
              textWrap: 'balance'
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: mutedColor,
              fontSize: { xs: '0.98rem', md: '1.05rem' },
              lineHeight: 1.9,
              maxWidth: 650
            }}
          >
            {description}
          </Typography>
        </Stack>

        {/* Category filters */}
        <Stack
          direction="row"
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            mb: { xs: 4, md: 6 }
          }}
        >
          {filters.map((filter) => {
            const selected = activeFilter === filter;

            return (
              <Button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                variant={selected ? 'contained' : 'outlined'}
                aria-pressed={selected}
                sx={{
                  px: 2,
                  py: 0.9,
                  minWidth: 0,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  borderColor: selected ? 'transparent' : alpha(secondary, 0.3),
                  color: selected ? '#FFFFFF' : mutedColor,
                  background: selected
                    ? `linear-gradient(110deg, ${primary}, ${secondary})`
                    : alpha(secondary, isDark ? 0.035 : 0.02),
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: alpha(primary, 0.65),
                    background: selected
                      ? `linear-gradient(110deg, ${primary}, ${secondary})`
                      : alpha(primary, isDark ? 0.12 : 0.07),
                    boxShadow: 'none'
                  }
                }}
              >
                {filter}
              </Button>
            );
          })}
        </Stack>

        {/* Paginated project grid */}
        <Grid container spacing={{ xs: 3, md: 3.5 }}>
          {visibleProjects.map((project) => (
            <Grid
              key={project.number}
              size={{
                xs: 12,
                md: project.featured ? 12 : 6,
                lg: project.featured ? 12 : 4
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: project.featured
                    ? { xs: 'column', md: 'row' }
                    : 'column',
                  height: '100%',
                  minHeight: project.featured ? { md: 380 } : 0,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  bgcolor: alpha(cardSurface, isDark ? 0.94 : 0.98),
                  transition:
                    'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: alpha(primary, 0.45),
                    boxShadow: `0 20px 55px ${alpha(
                      headingColor,
                      isDark ? 0.17 : 0.08
                    )}`
                  },
                  '&:hover .project-art': {
                    transform: 'scale(1.035)'
                  }
                }}
              >
                {/* Project artwork */}
                <Box
                  sx={{
                    position: 'relative',
                    flex: project.featured ? '1.2 1 0' : 'none',
                    minWidth: 0,
                    minHeight: project.featured ? 300 : 245,
                    overflow: 'hidden',
                    background:
                      project.type === 'web3'
                        ? `linear-gradient(145deg, ${alpha(
                            secondary,
                            0.24
                          )}, ${alpha(primary, 0.1)})`
                        : project.type === 'design'
                          ? `linear-gradient(145deg, ${alpha(
                              primary,
                              0.18
                            )}, ${alpha(secondary, 0.13)})`
                          : project.type === 'game'
                            ? `linear-gradient(145deg, ${alpha(
                                secondary,
                                0.2
                              )}, ${alpha(primary, 0.12)})`
                            : `linear-gradient(145deg, ${alpha(
                                primary,
                                0.2
                              )}, ${alpha(secondary, 0.1)})`
                  }}
                >
                  <Box
                    className="project-art"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'grid',
                      placeItems: 'center',
                      p: { xs: 2, sm: 1 },
                      transition: 'transform 350ms ease'
                    }}
                  >
                    <Box
                      component="img"
                      src={project.banner}
                      alt={`${project.title} banner`}
                      sx={{
                        display: 'block',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        objectFit: 'cover',
                        borderRadius: 3,
                        mb: 2
                      }}
                    />
                  </Box>

                  {/* Category badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 18,
                      left: 18,
                      px: 1.2,
                      py: 0.7,
                      borderRadius: '8px',
                      bgcolor: alpha(cardSurface, isDark ? 0.9 : 0.92),
                      border: `1px solid ${alpha(headingColor, 0.12)}`,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        color: headingColor
                      }}
                    >
                      {project.category}
                    </Typography>
                  </Box>

                  {project.featured && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        px: 1.2,
                        py: 0.7,
                        borderRadius: '8px',
                        bgcolor: alpha(primary, 0.13),
                        border: `1px solid ${alpha(primary, 0.3)}`
                      }}
                    >
                      <Typography
                        sx={{
                          color: primary,
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em'
                        }}
                      >
                        FEATURED
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Project details */}
                <Stack
                  spacing={2}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    p: { xs: 2.5, md: 3.2 }
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      sx={{
                        color: primary,
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em'
                      }}
                    >
                      PROJECT / {project.number}
                    </Typography>

                    <ArrowOutwardRoundedIcon
                      sx={{ color: mutedColor, fontSize: 20 }}
                    />
                  </Stack>

                  <Typography
                    component="h3"
                    sx={{
                      fontSize: project.featured
                        ? { xs: '1.5rem', md: '2rem' }
                        : '1.35rem',
                      fontWeight: 800,
                      letterSpacing: '-0.035em',
                      lineHeight: 1.3
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: mutedColor,
                      fontSize: '0.9rem',
                      lineHeight: 1.85,
                      flexGrow: 1
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* Technology tags */}
                  <Stack
                    direction="row"
                    sx={{
                      flexWrap: 'wrap',
                      gap: 0.8
                    }}
                  >
                    {project.technologies.map((technology) => (
                      <Chip
                        key={technology}
                        label={technology}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: '8px',
                          borderColor: alpha(secondary, 0.27),
                          bgcolor: alpha(secondary, isDark ? 0.06 : 0.035),
                          color: mutedColor,
                          fontSize: '0.72rem',
                          '& .MuiChip-label': {
                            px: 1.1
                          }
                        }}
                      />
                    ))}
                  </Stack>

                  {/* Optional project links */}
                  {(project.liveUrl || project.sourceUrl) && (
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        flexWrap: 'wrap',
                        rowGap: 1,
                        pt: 2,
                        borderTop: `1px solid ${borderColor}`
                      }}
                    >
                      {project.liveUrl && (
                        <MuiLink
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.7,
                            color: primary,
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            '&:hover': {
                              color: secondary
                            }
                          }}
                        >
                          <LanguageRoundedIcon sx={{ fontSize: 18 }} />
                          Live Preview
                          <ArrowOutwardRoundedIcon sx={{ fontSize: 15 }} />
                        </MuiLink>
                      )}

                      {project.sourceUrl && (
                        <MuiLink
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.7,
                            color: mutedColor,
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            '&:hover': {
                              color: primary
                            }
                          }}
                        >
                          <GitHubIcon sx={{ fontSize: 17 }} />
                          Source Code
                          <ArrowOutwardRoundedIcon sx={{ fontSize: 15 }} />
                        </MuiLink>
                      )}
                    </Stack>
                  )}
                </Stack>
              </Box>
            </Grid>
          ))}

          {filteredProjects.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography
                sx={{
                  color: mutedColor,
                  py: 6,
                  textAlign: 'center'
                }}
              >
                No projects in this category yet.
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Pagination controls */}
        {pageCount > 1 && (
          <Stack
            spacing={1.5}
            sx={{
              alignItems: 'center',
              mt: { xs: 5, md: 6 }
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
              siblingCount={1}
              boundaryCount={1}
              aria-label="Project pages"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 700,
                  borderRadius: 2
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  boxShadow: `0 0 18px ${alpha(
                    theme.palette.primary.main,
                    0.18
                  )}`
                }
              }}
            />

            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'text.secondary',
                textAlign: 'center'
              }}
              aria-live="polite"
            >
              Showing {(page - 1) * PROJECTS_PER_PAGE + 1}–
              {Math.min(page * PROJECTS_PER_PAGE, filteredProjects.length)} of{' '}
              {filteredProjects.length} projects
            </Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

type ProjectArtworkProps = {
  project: Project;
  primary: string;
  secondary: string;
  isDark: boolean;
  headingColor: string;
  cardSurface: string;
  borderColor: string;
};

function ProjectArtwork({
  project,
  primary,
  secondary,
  isDark,
  headingColor,
  cardSurface,
  borderColor
}: ProjectArtworkProps) {
  const { type, number, title } = project;

  const Icon =
    type === 'web3'
      ? AccountBalanceWalletRoundedIcon
      : type === 'design'
        ? AutoAwesomeRoundedIcon
        : type === 'game'
          ? SportsEsportsRoundedIcon
          : DashboardRoundedIcon;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 430,
        aspectRatio: '1.5',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      {/* Abstract geometric decoration */}
      <Box
        sx={{
          position: 'absolute',
          width: '70%',
          aspectRatio: '1',
          borderRadius:
            type === 'design' ? '35%' : type === 'game' ? '24%' : '50%',
          border: `1px solid ${alpha(primary, 0.24)}`,
          transform: 'rotate(-18deg)'
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: '54%',
          aspectRatio: '1',
          borderRadius: type === 'web3' ? '50%' : '24%',
          border: `1px solid ${alpha(secondary, 0.32)}`,
          transform: 'rotate(25deg)'
        }}
      />

      {/* Browser and application mockup */}
      <Box
        sx={{
          position: 'relative',
          width: '78%',
          overflow: 'hidden',
          borderRadius: '12px',
          border: `1px solid ${alpha(headingColor, 0.15)}`,
          bgcolor: cardSurface,
          boxShadow: `0 18px 45px ${alpha('#000000', isDark ? 0.24 : 0.1)}`,
          transform: type === 'design' ? 'rotate(-3deg)' : 'rotate(2deg)'
        }}
      >
        {/* Browser toolbar */}
        <Stack
          direction="row"
          spacing={0.6}
          sx={{
            px: 1.2,
            py: 1,
            borderBottom: `1px solid ${borderColor}`,
            alignItems: 'center'
          }}
        >
          {['#F87171', '#FBBF24', '#34D399'].map((color) => (
            <Box
              key={color}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: color
              }}
            />
          ))}

          <Box
            sx={{
              ml: 'auto',
              width: '40%',
              height: 5,
              borderRadius: 3,
              bgcolor: alpha(headingColor, 0.09)
            }}
          />
        </Stack>

        {/* Mock interface */}
        <Box
          sx={{
            p: { xs: 1.2, sm: 2 },
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr',
            gap: 1.2,
            minHeight: { xs: 105, sm: 145 }
          }}
        >
          <Stack spacing={1} sx={{ justifyContent: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '0.58rem', sm: '0.68rem' },
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: headingColor,
                overflowWrap: 'anywhere'
              }}
            >
              {title}
            </Typography>

            <Box
              sx={{
                width: '100%',
                height: 5,
                borderRadius: 3,
                bgcolor: alpha(headingColor, 0.13)
              }}
            />

            <Box
              sx={{
                width: '80%',
                height: 5,
                borderRadius: 3,
                bgcolor: alpha(headingColor, 0.13)
              }}
            />

            <Box
              sx={{
                mt: 0.5,
                width: 65,
                height: 20,
                borderRadius: '6px',
                background: `linear-gradient(110deg, ${primary}, ${secondary})`
              }}
            />
          </Stack>

          {/* Project icon panel */}
          <Box
            sx={{
              position: 'relative',
              minHeight: 90,
              borderRadius: '8px',
              overflow: 'hidden',
              background: `linear-gradient(
                145deg,
                ${alpha(primary, 0.17)},
                ${alpha(secondary, 0.13)}
              )`,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '75%',
                height: '75%',
                borderRadius:
                  type === 'design' ? '28%' : type === 'game' ? '18%' : '50%',
                border: `1px solid ${alpha(primary, 0.3)}`,
                transform: 'rotate(25deg)'
              }}
            />

            <Icon
              sx={{
                position: 'relative',
                fontSize: { xs: 30, sm: 42 },
                color: primary
              }}
            />
          </Box>
        </Box>

        {/* Small project identifier */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1.5,
            py: 0.9,
            borderTop: `1px solid ${borderColor}`
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.62rem',
              color: mutedArtworkColor(headingColor),
              letterSpacing: '0.06em'
            }}
          >
            PROJECT_{number}
          </Typography>

          <CodeRoundedIcon
            sx={{
              fontSize: 15,
              color: secondary
            }}
          />
        </Box>
      </Box>

      {/* Floating code accent */}
      <Box
        sx={{
          position: 'absolute',
          right: '3%',
          bottom: '8%',
          width: { xs: 32, sm: 44 },
          height: { xs: 32, sm: 44 },
          display: 'grid',
          placeItems: 'center',
          borderRadius: '12px',
          bgcolor: cardSurface,
          color: secondary,
          border: `1px solid ${borderColor}`,
          boxShadow: `0 8px 24px ${alpha('#000000', 0.08)}`
        }}
      >
        <CodeRoundedIcon
          sx={{
            fontSize: { xs: 18, sm: 22 }
          }}
        />
      </Box>
    </Box>
  );
}

function mutedArtworkColor(color: string) {
  return alpha(color, 0.6);
}
