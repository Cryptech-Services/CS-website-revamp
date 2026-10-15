'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

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

import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

type GameServer = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  accent: string;
  icon: ReactNode;
  image?: string;
  joinUrl?: string;
  features: string[];
  tags: string[];
  highlights: {
    icon: ReactNode;
    label: string;
  }[];
};

type GameServersProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

const gameServers: GameServer[] = [
  {
    id: 'cryptechcraft',
    number: '01',
    name: 'CryptechCraft',
    subtitle: 'Build. Explore. Survive.',
    description:
      'Build, explore, and survive together in our Minecraft world. Gather your friends, discover new places, and create something worth coming back to.',
    accent: '#69D391',
    icon: <SportsEsportsRoundedIcon />,
    image: '/static/images/game-servers/cryptechcraft.webp',
    tags: ['Sandbox', 'Survival', 'Multiplayer'],
    features: [
      'Build and explore together',
      'Discover new places and adventures',
      'Create memorable multiplayer experiences'
    ],
    highlights: [
      { icon: <ExtensionRoundedIcon />, label: 'Plugins and gameplay' },
      { icon: <GroupsRoundedIcon />, label: 'Community adventures' },
      {
        icon: <SettingsEthernetRoundedIcon />,
        label: 'A shared Minecraft world'
      }
    ]
  },
  {
    id: 'project-zomboid',
    number: '02',
    name: 'Project Zomboid',
    subtitle: 'This is how you survived.',
    joinUrl: 'https://pz.scc.tips/',
    description:
      'Survive the apocalypse together. Scavenge, build, explore, and see how long your group can last in a world full of danger.',
    accent: '#F0A36D',
    icon: <SecurityRoundedIcon />,
    image: '/static/images/game-servers/projectzomboid.webp',
    tags: ['Survival', 'Co-op', 'Modded'],
    features: [
      'Survive the zombie apocalypse',
      'Loot, scavenge, and build together',
      'Experience cooperative survival gameplay'
    ],
    highlights: [
      { icon: <ExtensionRoundedIcon />, label: 'Workshop mods' },
      { icon: <GroupsRoundedIcon />, label: 'Co-op survival' },
      { icon: <StorageRoundedIcon />, label: 'Persistent world' }
    ]
  },
  {
    id: 'cryptechtest',
    number: '03',
    name: 'CryptechTest',
    subtitle: 'Open worlds. Endless possibilities.',
    joinUrl: 'https://cryptechtest.xyz/',
    description:
      'Explore an open voxel world powered by Luanti, formerly known as Minetest. Build creations, experiment with different game modes, and enjoy sandbox adventures with the community.',
    accent: '#79B8FF',
    icon: <SettingsEthernetRoundedIcon />,
    image: '/static/images/game-servers/cryptechtest.webp',
    tags: ['Open Source', 'Voxel', 'Creative'],
    features: [
      'Explore an open voxel world',
      'Experiment with games and mods',
      'Build and create at your own pace'
    ],
    highlights: [
      { icon: <ExtensionRoundedIcon />, label: 'Games and mods' },
      { icon: <SpeedRoundedIcon />, label: 'Different gameplay styles' },
      { icon: <StorageRoundedIcon />, label: 'Creative world building' }
    ]
  }
];

function ServerArtwork({ server }: { server: GameServer }) {
  const customTheme = useTheme();
  const isDark = customTheme.palette.mode === 'dark';

  const cardSurface =
    customTheme.secondaryScale?.[4] ?? customTheme.palette.background.paper;

  const mutedColor =
    customTheme.grayScale?.[10] ?? customTheme.palette.text.secondary;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        height: { xs: 180, sm: 200 },
        overflow: 'hidden',
        isolation: 'isolate',
        borderRadius: 3,
        border: `1px solid ${alpha(server.accent, 0.25)}`,
        background: `
          radial-gradient(
            circle at 50% 40%,
            ${alpha(server.accent, 0.2)},
            transparent 58%
          ),
          linear-gradient(
            145deg,
            ${alpha(server.accent, 0.1)},
            ${cardSurface}
          )
        `,
        '&:hover .server-background-image': {
          transform: 'scale(1.06)',
          opacity: 0.65
        },
        '&:hover .server-main-icon': {
          transform: 'translateY(-3px)',
          boxShadow: `0 0 55px ${alpha(server.accent, 0.24)}`
        }
      }}
    >
      {/* Game banner artwork */}
      {server.image && (
        <Box
          className="server-background-image"
          component="img"
          src={server.image}
          alt=""
          loading="lazy"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: -2,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.48,
            transform: 'scale(1)',
            transition: 'transform 500ms ease, opacity 500ms ease'
          }}
        />
      )}

      {/* Artwork tint and accent lighting */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: `
            linear-gradient(
              180deg,
              ${alpha(cardSurface, isDark ? 0.35 : 0.48)} 0%,
              ${alpha(cardSurface, isDark ? 0.48 : 0.55)} 48%,
              ${alpha(cardSurface, isDark ? 0.9 : 0.88)} 100%
            ),
            radial-gradient(
              circle at 50% 40%,
              ${alpha(server.accent, 0.25)},
              transparent 65%
            )
          `
        }}
      />

      {/* Decorative grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.3,
          backgroundImage: `
            linear-gradient(
              ${alpha(server.accent, 0.16)} 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              ${alpha(server.accent, 0.16)} 1px,
              transparent 1px
            )
          `,
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black, transparent 95%)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating connection nodes */}
      {[0, 1, 2, 3, 4, 5].map((node) => (
        <Box
          key={node}
          sx={{
            position: 'absolute',
            zIndex: 1,
            width: node % 2 === 0 ? 5 : 3,
            height: node % 2 === 0 ? 5 : 3,
            borderRadius: '50%',
            backgroundColor: server.accent,
            opacity: 0.8,
            left: `${12 + ((node * 17) % 78)}%`,
            top: `${15 + ((node * 23) % 65)}%`,
            boxShadow: `0 0 12px ${alpha(server.accent, 0.7)}`,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Central server artwork */}
      <Stack
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          className="server-main-icon"
          sx={{
            position: 'relative',
            display: 'grid',
            placeItems: 'center',
            width: 96,
            height: 96,
            borderRadius: 4,
            color: server.accent,
            border: `1px solid ${alpha(server.accent, 0.5)}`,
            background: `
              linear-gradient(
                145deg,
                ${alpha(server.accent, 0.18)},
                ${alpha(cardSurface, isDark ? 0.82 : 0.88)}
              )
            `,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: `
              0 0 48px ${alpha(server.accent, 0.16)},
              inset 0 0 24px ${alpha(server.accent, 0.06)}
            `,
            transition: 'transform 350ms ease, box-shadow 350ms ease',
            '& svg': {
              fontSize: 47,
              filter: `drop-shadow(0 0 10px ${alpha(server.accent, 0.3)})`
            }
          }}
        >
          {server.icon}

          {/* Decorative indicator, not a live server status */}
          <Box
            sx={{
              position: 'absolute',
              width: 11,
              height: 11,
              right: -3,
              bottom: 14,
              borderRadius: '50%',
              backgroundColor: server.accent,
              border: `3px solid ${cardSurface}`,
              boxShadow: `0 0 12px ${alpha(server.accent, 0.65)}`
            }}
          />
        </Box>

        <Typography
          sx={{
            mt: 1.5,
            fontSize: '0.68rem',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: server.accent,
            textTransform: 'uppercase',
            textShadow: `0 1px 10px ${alpha(cardSurface, 0.8)}`
          }}
        >
          COMMUNITY // {server.number}
        </Typography>
      </Stack>

      {/* Community branding */}
      <Typography
        sx={{
          position: 'absolute',
          zIndex: 3,
          left: 14,
          bottom: 12,
          color: alpha(server.accent, 0.9),
          fontSize: '0.62rem',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.08em'
        }}
      >
        CRYPTECH_COMMUNITY
      </Typography>

      {/* Game category badge */}
      <Box
        sx={{
          position: 'absolute',
          zIndex: 3,
          right: 14,
          top: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1,
          py: 0.5,
          borderRadius: 10,
          border: `1px solid ${alpha(server.accent, 0.3)}`,
          backgroundColor: alpha(cardSurface, isDark ? 0.94 : 0.92),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <SportsEsportsRoundedIcon
          sx={{
            color: server.accent,
            fontSize: 14
          }}
        />

        <Typography
          sx={{
            color: mutedColor,
            fontSize: '0.62rem',
            fontFamily: 'monospace',
            fontWeight: 700
          }}
        >
          COMMUNITY SERVER
        </Typography>
      </Box>
    </Box>
  );
}

function GameServerCard({ server }: { server: GameServer }) {
  const customTheme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const isDark = customTheme.palette.mode === 'dark';

  const cardSurface =
    customTheme.secondaryScale?.[4] ?? customTheme.palette.background.paper;

  const headingColor =
    customTheme.grayScale?.[12] ?? customTheme.palette.text.primary;

  const mutedColor =
    customTheme.grayScale?.[10] ?? customTheme.palette.text.secondary;

  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 2.5 },
        borderRadius: 4,
        border: `1px solid ${alpha(server.accent, 0.16)}`,
        background: `
  linear-gradient(
    155deg,
    ${alpha(server.accent, 0.2)} 45%,
    transparent 75%
  ),
  ${cardSurface}
`,
        transition:
          'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: alpha(server.accent, 0.5),
          boxShadow: `0 18px 45px ${alpha(server.accent, 0.08)}`
        }
      }}
    >
      <ServerArtwork server={server} />

      {/* Category and project number */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2.5,
          mb: 1
        }}
      >
        <Chip
          label={server.tags[0]}
          size="small"
          sx={{
            color: server.accent,
            backgroundColor: alpha(server.accent, 0.1),
            border: `1px solid ${alpha(server.accent, 0.2)}`,
            fontSize: '0.7rem',
            fontWeight: 700
          }}
        />

        <Typography
          sx={{
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: mutedColor
          }}
        >
          {server.number} / 03
        </Typography>
      </Stack>

      {/* Game title */}
      <Typography
        variant="h5"
        component="h3"
        sx={{
          color: headingColor,
          fontWeight: 800,
          letterSpacing: '-0.035em'
        }}
      >
        {server.name}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: server.accent,
          fontSize: '0.82rem',
          fontWeight: 600
        }}
      >
        {server.subtitle}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          mt: 1.5,
          color: mutedColor,
          fontSize: '0.9rem',
          lineHeight: 1.8
        }}
      >
        {server.description}
      </Typography>

      {/* Community activities */}
      <Stack spacing={1.25} sx={{ mt: 2.5 }}>
        {server.features.map((feature) => (
          <Stack
            key={feature}
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: 'flex-start'
            }}
          >
            <Box
              sx={{
                mt: 0.2,
                color: server.accent,
                display: 'flex',
                '& svg': {
                  fontSize: 17
                }
              }}
            >
              <ArrowOutwardRoundedIcon />
            </Box>

            <Typography
              sx={{
                color: mutedColor,
                fontSize: '0.82rem',
                lineHeight: 1.6
              }}
            >
              {feature}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* Expandable community details */}
      {expanded && (
        <Box
          sx={{
            mt: 2.5,
            p: 1.75,
            borderRadius: 2.5,
            backgroundColor: alpha(server.accent, 0.06),
            border: `1px solid ${alpha(server.accent, 0.14)}`
          }}
        >
          <Typography
            sx={{
              mb: 1.25,
              fontSize: '0.72rem',
              fontWeight: 800,
              color: server.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            About this community
          </Typography>

          <Stack
            direction="row"
            sx={{
              flexWrap: 'wrap',
              gap: 0.75
            }}
          >
            {server.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.68rem',
                  color: headingColor,
                  borderColor: alpha(server.accent, 0.25)
                }}
              />
            ))}
          </Stack>

          <Stack spacing={1.25} sx={{ mt: 2 }}>
            {server.highlights.map((item) => (
              <Stack
                key={item.label}
                direction="row"
                spacing={1}
                sx={{
                  color: mutedColor,
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    color: server.accent,
                    '& svg': {
                      fontSize: 17
                    }
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: '0.8rem'
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, minHeight: 24 }} />

      {/* Community actions */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: 3,
          pt: 2,
          borderTop: `1px solid ${borderColor}`
        }}
      >
        {server.joinUrl ? (
          <Button
            fullWidth
            variant="contained"
            component="a"
            href={server.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              py: 1.1,
              color: customTheme.palette.getContrastText(server.accent),
              backgroundColor: server.accent,
              boxShadow: 'none',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: server.accent,
                filter: 'brightness(0.94)',
                boxShadow: 'none'
              }
            }}
          >
            Join Community
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            disabled
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              py: 1.1,
              color: customTheme.palette.getContrastText(server.accent),
              backgroundColor: alpha(server.accent, 0.35),
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'none',
              '&.Mui-disabled': {
                color: alpha(
                  customTheme.palette.getContrastText(server.accent),
                  0.55
                ),
                backgroundColor: alpha(server.accent, 0.2)
              }
            }}
          >
            Join Community
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => setExpanded((previous) => !previous)}
          aria-expanded={expanded}
          sx={{
            minWidth: 90,
            px: 1.5,
            borderColor: alpha(server.accent, 0.35),
            color: headingColor,
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': {
              borderColor: server.accent,
              backgroundColor: alpha(server.accent, 0.06)
            }
          }}
        >
          {expanded ? 'Less' : 'Details'}
        </Button>
      </Stack>
    </Box>
  );
}

export default function GameServers({
  eyebrow = 'OUR GAMING COMMUNITIES',
  title = 'Our worlds. Our communities.',
  description = 'Different games, shared adventures. Explore our community game servers, team up with friends, discover new worlds, and make every session memorable.'
}: GameServersProps) {
  const customTheme = useTheme();

  const isDark = customTheme.palette.mode === 'dark';

  const primary =
    customTheme.colorScale?.[9] ?? customTheme.palette.primary.main;

  const secondary =
    customTheme.secondaryScale?.[9] ?? customTheme.palette.secondary.main;

  const headingColor =
    customTheme.grayScale?.[12] ?? customTheme.palette.text.primary;

  const mutedColor =
    customTheme.grayScale?.[10] ?? customTheme.palette.text.secondary;

  const surface =
    customTheme.backgroundScale?.[2] ?? customTheme.palette.background.default;

  return (
    <Box
      id="game-servers"
      component="section"
      aria-labelledby="game-servers-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        bgcolor: surface,
        color: headingColor,
        scrollMarginTop: '90px'
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: isDark ? 0.3 : 0.2,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 15%, black 80%, transparent 100%)',

          '@keyframes gameWorldDrift': {
            '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
            '50%': { transform: 'translate3d(-18px, 10px, 0)' }
          },

          '@keyframes gameParticleFloat': {
            '0%, 100%': { transform: 'translateY(0px)', opacity: 0.3 },
            '50%': { transform: 'translateY(-18px)', opacity: 0.9 }
          },

          '@keyframes gameVoxelPulse': {
            '0%, 100%': { opacity: 0.25, transform: 'scale(0.92)' },
            '50%': { opacity: 0.85, transform: 'scale(1.06)' }
          },

          '@keyframes gameScan': {
            '0%': { transform: 'translateY(-100px)' },
            '100%': { transform: 'translateY(650px)' }
          },

          '@keyframes gameOrbit': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          },

          '@media (prefers-reduced-motion: reduce)': {
            '& .game-world, & .game-particle, & .game-voxel, & .game-scan, & .game-orbit':
              { animation: 'none !important' }
          }
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',

            '& .game-world': {
              animation: 'gameWorldDrift 28s ease-in-out infinite'
            },

            '& .game-particle': {
              animation: 'gameParticleFloat 5s ease-in-out infinite'
            },

            '& .game-voxel': {
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: 'gameVoxelPulse 5s ease-in-out infinite'
            },

            '& .game-scan': {
              animation: 'gameScan 14s linear infinite'
            },

            '& .game-orbit': {
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: 'gameOrbit 35s linear infinite'
            }
          }}
        >
          <defs>
            <linearGradient id="game-neon-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={primary} stopOpacity="0.9" />
              <stop offset="100%" stopColor={secondary} stopOpacity="0.2" />
            </linearGradient>

            <pattern
              id="game-pixel-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0H0V40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                opacity="0.25"
              />
              <rect
                x="18"
                y="18"
                width="2"
                height="2"
                fill="currentColor"
                opacity="0.4"
              />
            </pattern>

            <radialGradient id="game-world-glow">
              <stop offset="0%" stopColor={primary} stopOpacity="0.2" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </radialGradient>

            <linearGradient id="game-scan-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primary} stopOpacity="0" />
              <stop offset="50%" stopColor={primary} stopOpacity="0.35" />
              <stop offset="100%" stopColor={primary} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Pixel-grid world */}
          <g className="game-world">
            <rect
              x="-50"
              y="-50"
              width="1300"
              height="700"
              fill="url(#game-pixel-grid)"
            />

            {/* Ambient gaming-world glow */}
            <ellipse
              cx="850"
              cy="280"
              rx="380"
              ry="290"
              fill="url(#game-world-glow)"
            />

            {/* Voxel terrain silhouettes */}
            <g
              fill="none"
              stroke="url(#game-neon-gradient)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            >
              <path d="M0 420H80V380H120V340H200V380H240V320H320V360H380V420H450" />
              <path d="M0 450H60V410H100V370H140V410H190V350H240V390H300V430H360" />
              <path d="M700 430H760V390H820V350H860V310H920V350H980V390H1040V350H1100V400H1200" />
              <path d="M650 470H730V430H790V390H850V350H910V390H970V430H1030V390H1090V440H1200" />

              {/* Floating platforms */}
              <path d="M420 140H480V120H520V140H580" />
              <path d="M800 120H840V100H900V120H940" />
              <path d="M120 230H160V210H200V230H240" />
            </g>

            {/* Pixel blocks */}
            {[
              [100, 120, 20],
              [150, 160, 12],
              [260, 100, 16],
              [350, 210, 22],
              [440, 90, 12],
              [570, 170, 18],
              [690, 110, 24],
              [770, 200, 14],
              [900, 100, 18],
              [1010, 180, 22],
              [1090, 100, 12],
              [180, 300, 14],
              [380, 330, 12],
              [720, 310, 14],
              [960, 290, 16],
              [1100, 330, 12]
            ].map(([x, y, size], index) => (
              <g
                key={`voxel-${index}`}
                className="game-voxel"
                style={{
                  animationDelay: `${(index % 6) * -0.7}s`,
                  animationDuration: `${3 + (index % 4)}s`
                }}
                transform={`translate(${x} ${y})`}
                fill="none"
                stroke={index % 3 === 0 ? secondary : primary}
                strokeWidth="1.2"
              >
                <rect
                  width={size}
                  height={size}
                  opacity="0.65"
                  fill={primary}
                  fillOpacity="0.08"
                />
                <path
                  d={`M0 0L${size / 2} ${-size / 3}L${size} 0`}
                  opacity="0.8"
                />
                <path
                  d={`M${size} 0V${size}L${size / 2} ${size * 1.3}V${size / 2}`}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>

          {/* Floating pixel particles */}
          {[
            [90, 180],
            [230, 140],
            [300, 260],
            [410, 180],
            [540, 100],
            [620, 260],
            [750, 150],
            [830, 240],
            [950, 130],
            [1080, 230],
            [160, 470],
            [1040, 490],
            [500, 420],
            [680, 500],
            [850, 450],
            [330, 480]
          ].map(([x, y], index) => (
            <g
              key={`particle-${index}`}
              className="game-particle"
              style={{
                animationDelay: `${(index % 7) * -0.6}s`,
                animationDuration: `${3 + (index % 5)}s`
              }}
            >
              <rect
                x={x}
                y={y}
                width={index % 3 === 0 ? 4 : 2}
                height={index % 3 === 0 ? 4 : 2}
                rx="0.5"
                fill={index % 4 === 0 ? secondary : primary}
              />
            </g>
          ))}

          {/* Gaming crosshair / targeting HUD */}
          <g
            transform="translate(850 240)"
            fill="none"
            stroke={primary}
            strokeWidth="1"
            opacity="0.65"
          >
            <g className="game-orbit">
              <circle r="34" strokeDasharray="3 8" />
              <path d="M0 -43V-28M0 28V43M-43 0H-28M28 0H43" />
            </g>
            <circle r="15" strokeDasharray="2 5" />
            <path d="M-7 0H7M0 -7V7" />
          </g>

          {/* Secondary HUD marker */}
          <g
            transform="translate(270 200)"
            fill="none"
            stroke={secondary}
            strokeWidth="1"
            opacity="0.55"
          >
            <path d="M-18 -18H-6M-18 -18V-6M18 -18H6M18 -18V-6M-18 18H-6M-18 18V6M18 18H6M18 18V6" />
            <rect
              x="-10"
              y="-10"
              width="20"
              height="20"
              strokeDasharray="3 4"
            />
          </g>

          {/* Moving scan beam */}
          <rect
            className="game-scan"
            x="0"
            y="0"
            width="1200"
            height="100"
            fill="url(#game-scan-gradient)"
            opacity="0.4"
          />

          {/* Minimal pixel-style HUD labels */}
          <g
            fill="currentColor"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="1"
            opacity="0.55"
          >
            <text x="65" y="80">
              WORLD_GENERATED
            </text>
            <text x="65" y="96">
              CHUNK_001 // READY
            </text>
            <text x="940" y="470">
              PLAYER_CONNECTED
            </text>
            <text x="940" y="486">
              MULTIPLAYER_ZONE
            </text>
          </g>
        </Box>
      </Box>

      {/* Ambient background accents */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 420,
          height: 420,
          top: -180,
          left: '-12%',
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${alpha(primary, isDark ? 0.14 : 0.1)},
            transparent 70%
          )`,
          pointerEvents: 'none'
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 460,
          height: 460,
          right: '-15%',
          bottom: -220,
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${alpha(secondary, isDark ? 0.12 : 0.09)},
            transparent 70%
          )`,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        {/* Section heading */}
        <Stack
          sx={{
            maxWidth: 760,
            mx: 'auto',
            mb: { xs: 5, md: 7 },
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 2,
              px: 1.5,
              py: 0.75,
              alignItems: 'center',
              borderRadius: 10,
              border: `1px solid ${alpha(primary, 0.22)}`,
              backgroundColor: alpha(primary, 0.06)
            }}
          >
            <SportsEsportsRoundedIcon
              sx={{
                color: primary,
                fontSize: 17
              }}
            />

            <Typography
              sx={{
                color: primary,
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.15em'
              }}
            >
              {eyebrow}
            </Typography>
          </Stack>

          <Typography
            id="game-servers-heading"
            component="h2"
            variant="h2"
            sx={{
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: '-0.055em',
              textWrap: 'balance'
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              maxWidth: 680,
              color: mutedColor,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              lineHeight: 1.9
            }}
          >
            {description}
          </Typography>
        </Stack>

        {/* Gaming community cards */}
        <Grid container spacing={3}>
          {gameServers.map((server) => (
            <Grid
              key={server.id}
              size={{ xs: 12, md: 6, lg: 4 }}
              sx={{
                display: 'flex'
              }}
            >
              <GameServerCard server={server} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
