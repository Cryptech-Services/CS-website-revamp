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
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';

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
    customTheme.secondaryScale?.[3] ?? theme.palette.background.default;

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

        {/* Project cards */}
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {visibleProjects.map((project) => (
            <Grid
              key={project.number}
              size={{
                xs: 12,
                md: project.featured ? 12 : 6,
                lg: project.featured ? 12 : 4
              }}
            >
              <ProjectCard
                project={project}
                primary={primary}
                secondary={secondary}
                isDark={isDark}
                headingColor={headingColor}
                mutedColor={mutedColor}
                cardSurface={cardSurface}
                borderColor={borderColor}
              />
            </Grid>
          ))}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: { xs: 7, md: 9 },
                  px: 3,
                  border: `1px dashed ${borderColor}`,
                  borderRadius: '24px',
                  bgcolor: alpha(cardSurface, isDark ? 0.45 : 0.6),
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 52,
                    height: 52,
                    mb: 2,
                    borderRadius: '16px',
                    color: mutedColor,
                    bgcolor: alpha(headingColor, isDark ? 0.06 : 0.035),
                    border: `1px solid ${borderColor}`
                  }}
                >
                  <PageviewRoundedIcon sx={{ fontSize: 32 }} />
                </Box>

                <Typography
                  component="h3"
                  sx={{
                    mb: 0.8,
                    color: headingColor,
                    fontSize: '1.05rem',
                    fontWeight: 750,
                    letterSpacing: '-0.02em'
                  }}
                >
                  No projects found
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 340,
                    color: mutedColor,
                    fontSize: '0.875rem',
                    lineHeight: 1.8
                  }}
                >
                  There are no projects in this category yet. Try selecting
                  another category to explore more work.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
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

type ProjectCardProps = {
  project: Project;
  primary: string;
  secondary: string;
  isDark: boolean;
  headingColor: string;
  mutedColor: string;
  cardSurface: string;
  borderColor: string;
};

function ProjectCard({
  project,
  primary,
  secondary,
  isDark,
  headingColor,
  mutedColor,
  cardSurface,
  borderColor
}: ProjectCardProps) {
  const {
    number,
    title,
    category,
    description,
    technologies,
    type,
    liveUrl,
    sourceUrl,
    featured,
    banner
  } = project;

  const projectAccent = type === 'web3' ? secondary : primary;

  const projectTypeLabel =
    type === 'web3'
      ? 'Blockchain'
      : type === 'design'
        ? 'UI / UX Design'
        : type === 'game'
          ? 'Game Servers'
          : 'Web Development';

  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: featured ? { xs: 'column', md: 'row' } : 'column',
        height: '100%',
        minWidth: 0,
        overflow: 'hidden',
        border: `1px solid ${borderColor}`,
        borderRadius: { xs: 3, md: 4 },
        bgcolor: cardSurface,
        transition:
          'transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease',

        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: alpha(projectAccent, 0.48),
          boxShadow: `0 20px 48px ${alpha('#000000', isDark ? 0.22 : 0.075)}`
        },

        '&:hover .project-card-image': {
          transform: 'scale(1.045)'
        },

        '&:hover .project-card-action': {
          backgroundColor: alpha(projectAccent, isDark ? 0.16 : 0.09),
          borderColor: alpha(projectAccent, 0.4)
        },

        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
          '&:hover .project-card-image': { transform: 'none' }
        }
      }}
    >
      {/* Preview artwork */}
      <Box
        sx={{
          position: 'relative',
          flex: featured ? '1.1 1 0' : 'none',
          minWidth: 0,
          minHeight: featured
            ? { xs: 230, sm: 300, md: 0 }
            : { xs: 210, sm: 235 },
          aspectRatio: featured ? { xs: '16 / 9', md: 'auto' } : '16 / 10',
          overflow: 'hidden',
          bgcolor: alpha(projectAccent, isDark ? 0.1 : 0.055),
          background: `linear-gradient(
            135deg,
            ${alpha(projectAccent, isDark ? 0.19 : 0.12)},
            ${alpha(secondary, isDark ? 0.1 : 0.055)}
          )`
        }}
      >
        {/* Technical background grid */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(
              ${alpha(projectAccent, 0.45)} 0.7px,
              transparent 0.7px
            )`,
            backgroundSize: '20px 20px',
            opacity: isDark ? 0.3 : 0.18,
            maskImage: 'linear-gradient(135deg, black, transparent 85%)'
          }}
        />

        {/* Actual project image */}
        {banner ? (
          <Box
            component="img"
            className="project-card-image"
            src={banner}
            alt={`${title} project preview`}
            loading="lazy"
            decoding="async"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              p: { xs: 2, sm: 2.5 },
              objectFit: 'contain',
              transition: 'transform 400ms ease'
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <CodeRoundedIcon
              sx={{
                fontSize: { xs: 64, md: 84 },
                color: projectAccent,
                opacity: 0.75
              }}
            />
          </Box>
        )}

        {/* Image contrast overlay */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(
              to top,
              ${alpha('#000000', isDark ? 0.35 : 0.12)},
              transparent 45%
            )`
          }}
        />

        {/* Category */}
        <Chip
          label={category}
          size="small"
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            maxWidth: 'calc(100% - 100px)',
            height: 29,
            borderRadius: '8px',
            bgcolor: alpha(cardSurface, isDark ? 0.92 : 0.96),
            border: `1px solid ${alpha(headingColor, 0.1)}`,
            color: headingColor,
            fontSize: '0.63rem',
            fontWeight: 800,
            letterSpacing: '0.045em',
            '& .MuiChip-label': {
              px: 1.1,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
        />

        {/* Featured indicator */}
        {featured && (
          <Chip
            icon={
              <AutoAwesomeRoundedIcon
                sx={{ color: `${projectAccent} !important` }}
              />
            }
            label="FEATURED"
            size="small"
            sx={{
              position: 'absolute',
              top: 14,
              right: 14,
              height: 29,
              borderRadius: '8px',
              bgcolor: alpha(cardSurface, isDark ? 0.92 : 0.96),
              border: `1px solid ${alpha(projectAccent, 0.28)}`,
              color: projectAccent,
              fontSize: '0.65rem',
              fontWeight: 800,
              '& .MuiChip-icon': {
                ml: 0.8,
                fontSize: 15
              }
            }}
          />
        )}

        {/* Project number */}
        <Typography
          sx={{
            position: 'absolute',
            right: 16,
            bottom: 14,
            color: alpha('#FFFFFF', 0.9),
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textShadow: '0 1px 8px rgba(0,0,0,0.45)'
          }}
        >
          PROJECT / {String(number).padStart(2, '0')}
        </Typography>
      </Box>

      {/* Card details */}
      <Stack
        spacing={2}
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2.5, md: featured ? 3.5 : 3 }
        }}
      >
        {/* Project type */}
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
            <Box
              sx={{
                width: 7,
                height: 7,
                flexShrink: 0,
                borderRadius: '50%',
                bgcolor: projectAccent,
                boxShadow: `0 0 10px ${alpha(projectAccent, 0.5)}`
              }}
            />

            <Typography
              sx={{
                color: mutedColor,
                fontSize: '0.7rem',
                fontWeight: 750,
                letterSpacing: '0.09em',
                textTransform: 'uppercase'
              }}
            >
              {projectTypeLabel}
            </Typography>
          </Stack>

          <ArrowOutwardRoundedIcon
            sx={{
              flexShrink: 0,
              fontSize: 19,
              color: projectAccent
            }}
          />
        </Stack>

        {/* Project title */}
        <Typography
          component="h3"
          sx={{
            color: headingColor,
            fontSize: featured
              ? { xs: '1.55rem', md: '1.9rem' }
              : { xs: '1.3rem', md: '1.4rem' },
            fontWeight: 850,
            lineHeight: 1.25,
            letterSpacing: '-0.045em',
            overflowWrap: 'anywhere'
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: mutedColor,
            fontSize: '0.875rem',
            lineHeight: 1.85,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: featured ? 5 : 4,
            overflow: 'hidden'
          }}
        >
          {description}
        </Typography>

        {/* Technologies */}
        <Box sx={{ mt: 'auto !important', pt: 0.5 }}>
          <Typography
            sx={{
              mb: 1.1,
              color: mutedColor,
              fontSize: '0.66rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}
          >
            Technologies
          </Typography>

          <Stack
            direction="row"
            useFlexGap
            sx={{
              flexWrap: 'wrap',
              gap: 0.8
            }}
          >
            {technologies.map((technology) => (
              <Chip
                key={technology}
                label={technology}
                size="small"
                variant="outlined"
                sx={{
                  height: 27,
                  borderRadius: '7px',
                  borderColor: alpha(headingColor, 0.12),
                  bgcolor: alpha(headingColor, isDark ? 0.035 : 0.02),
                  color: mutedColor,
                  fontSize: '0.69rem',
                  fontWeight: 600,
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Project actions */}
        {(liveUrl || sourceUrl) && (
          <Stack
            direction="row"
            useFlexGap
            sx={{
              flexWrap: 'wrap',
              gap: 1,
              pt: 2,
              mt: 0.5,
              borderTop: `1px solid ${borderColor}`
            }}
          >
            {liveUrl && (
              <Button
                className="project-card-action"
                component="a"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<LanguageRoundedIcon />}
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  minHeight: 40,
                  px: 1.5,
                  borderRadius: '10px',
                  borderColor: alpha(projectAccent, 0.3),
                  color: projectAccent,
                  fontSize: '0.77rem',
                  fontWeight: 750,
                  textTransform: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                Live Preview
              </Button>
            )}

            {sourceUrl && (
              <Button
                className="project-card-action"
                component="a"
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon />}
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  minHeight: 40,
                  px: 1.5,
                  borderRadius: '10px',
                  borderColor,
                  color: mutedColor,
                  fontSize: '0.77rem',
                  fontWeight: 750,
                  textTransform: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                Source Code
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
