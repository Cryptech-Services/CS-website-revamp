'use client';

import { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Link as MuiLink,
  Pagination,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

import { alpha } from '@mui/material/styles';

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import {
  fetchTeamMembers,
  type TeamMember,
  type TeamCategory
} from '@/lib/fectTeamMembers';

type TeamProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
  members?: TeamMember[];
};

/* -------------------------------------------------------------------------- */
/*                               Member Avatar                                */
/* -------------------------------------------------------------------------- */

function MemberAvatar({ member }: { member: TeamMember }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const avatarUrl =
    member.discordId && member.discordAvatar
      ? `https://cdn.discordapp.com/avatars/${member.discordId}/${member.discordAvatar}.${member.discordAvatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
      : member.image;

  return (
    <Box
      sx={{
        position: 'relative',
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 2,
        background: `
          radial-gradient(
            circle at 50% 100%,
            ${alpha(member.accent, isDark ? 0.2 : 0.12)},
            transparent 65%
          ),
          ${alpha(theme.palette.primary.main, isDark ? 0.045 : 0.025)}
        `,
        border: `1px solid ${alpha(member.accent, 0.16)}`
      }}
    >
      {/* Technical grid */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          backgroundImage: `
            linear-gradient(${alpha(member.accent, 0.07)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha(member.accent, 0.07)} 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 35%, black 75%, transparent)'
        }}
      />

      {/* Accent rings */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 116,
          height: 116,
          borderRadius: '50%',
          border: `1px solid ${alpha(member.accent, 0.25)}`
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: 96,
          height: 96,
          borderRadius: '50%',
          border: `1px dashed ${alpha(member.accent, 0.25)}`
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
            backgroundColor: member.accent,
            opacity: 0.8,
            left: `${12 + ((node * 17) % 78)}%`,
            top: `${15 + ((node * 23) % 65)}%`,
            boxShadow: `0 0 12px ${alpha(member.accent, 0.7)}`,
            pointerEvents: 'none'
          }}
        />
      ))}

      <Avatar
        src={avatarUrl}
        alt={member.name}
        slotProps={{
          img: {
            loading: 'lazy'
          }
        }}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: 80,
          height: 80,
          bgcolor: alpha(member.accent, 0.15),
          color: member.accent,
          fontSize: '1.4rem',
          fontWeight: 800,
          border: `2px solid ${alpha(member.accent, 0.65)}`,
          boxShadow: `0 0 32px ${alpha(member.accent, 0.18)}`,
          transition: 'transform 220ms ease, box-shadow 220ms ease',
          '& img': {
            objectFit: 'cover'
          },
          '.team-card:hover &': {
            transform: 'scale(1.06)',
            boxShadow: `0 0 42px ${alpha(member.accent, 0.3)}`
          },
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none'
          }
        }}
      >
        {member.initials}
      </Avatar>

      {/* Branding */}
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          left: 12,
          zIndex: 1
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: member.accent
          }}
        />

        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'text.secondary'
          }}
        >
          CRYPTECH SERVICES
        </Typography>
      </Stack>

      {/* Initial indicator */}
      <Box
        sx={{
          position: 'absolute',
          right: 10,
          bottom: 9,
          width: 25,
          height: 25,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 1.5,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          color: member.accent,
          fontSize: '0.65rem',
          fontWeight: 800
        }}
      >
        {member.initials.slice(0, 1)}
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Team Member Card                              */
/* -------------------------------------------------------------------------- */

function TeamMemberCard({ member }: { member: TeamMember }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const cardSurface =
    theme.secondaryScale?.[4] ?? theme.palette.background.paper;

  return (
    <Box
      component="article"
      className="team-card"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 340,
        height: '100%',
        mx: 'auto',
        p: 1.5,
        overflow: 'hidden',
        borderRadius: 3,
        bgcolor: cardSurface,
        border: `1px solid ${theme.palette.divider}`,
        transition:
          'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',

        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: alpha(member.accent, 0.6),
          boxShadow: `0 18px 40px ${alpha(member.accent, isDark ? 0.09 : 0.07)}`
        },

        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': {
            transform: 'none'
          }
        }
      }}
    >
      {/* Accent line */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: 2,
          bgcolor: member.accent,
          opacity: 0.8,
          borderRadius: '0 0 4px 4px'
        }}
      />

      <MemberAvatar member={member} />

      {/* Member details */}
      <Box sx={{ px: 0.5, pt: 2, pb: 0.5 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 850,
                lineHeight: 1.3,
                letterSpacing: '-0.035em',
                overflowWrap: 'anywhere'
              }}
            >
              {member.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.65,
                color: member.accent,
                fontSize: '0.75rem',
                fontWeight: 750,
                lineHeight: 1.5
              }}
            >
              {member.role}
            </Typography>
          </Box>

          <Chip
            label={member.category}
            size="small"
            variant="outlined"
            sx={{
              flexShrink: 0,
              height: 23,
              borderRadius: 1.5,
              color: 'text.secondary',
              borderColor: theme.palette.divider,
              fontSize: '0.62rem',
              fontWeight: 650,
              '& .MuiChip-label': {
                px: 0.9
              }
            }}
          />
        </Stack>

        <Typography
          sx={{
            mt: 1.5,
            minHeight: 67,
            color: 'text.secondary',
            fontSize: '0.79rem',
            lineHeight: 1.75,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {member.description}
        </Typography>

        {/* Skills */}
        <Stack
          direction="row"
          useFlexGap
          sx={{
            flexWrap: 'wrap',
            gap: 0.65,
            mt: 1.75,
            minHeight: 52,
            alignContent: 'flex-start'
          }}
        >
          {member.skills.slice(0, 3).map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                height: 24,
                maxWidth: '100%',
                borderRadius: 1.25,
                bgcolor: alpha(member.accent, 0.08),
                color: 'text.secondary',
                border: `1px solid ${alpha(member.accent, 0.15)}`,
                fontSize: '0.65rem',
                '& .MuiChip-label': {
                  px: 0.9,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }
              }}
            />
          ))}

          {member.skills.length > 3 && (
            <Chip
              label={`+${member.skills.length - 3}`}
              size="small"
              sx={{
                height: 24,
                borderRadius: 1.25,
                bgcolor: alpha(theme.palette.text.primary, 0.04),
                color: 'text.secondary',
                fontSize: '0.65rem'
              }}
            />
          )}
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Contact footer */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 1.5,
          pt: 1.5,
          px: 0.5,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ alignItems: 'center', minWidth: 0, flex: 1 }}
        >
          <EmailOutlinedIcon
            sx={{
              flexShrink: 0,
              fontSize: 17,
              color: member.accent
            }}
          />

          <MuiLink
            href={`mailto:${member.email}`}
            underline="none"
            title={member.email}
            sx={{
              minWidth: 0,
              color: 'text.secondary',
              fontSize: '0.7rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 180ms ease',
              '&:hover': {
                color: member.accent
              }
            }}
          >
            {member.email}
          </MuiLink>
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          {member.github && (
            <MuiLink
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 30,
                height: 30,
                borderRadius: 1.5,
                color: 'text.secondary',
                '&:hover': {
                  color: member.accent,
                  bgcolor: alpha(member.accent, 0.1)
                }
              }}
            >
              <GitHubIcon sx={{ fontSize: 18 }} />
            </MuiLink>
          )}

          {member.linkedin && (
            <MuiLink
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 30,
                height: 30,
                borderRadius: 1.5,
                color: 'text.secondary',
                '&:hover': {
                  color: member.accent,
                  bgcolor: alpha(member.accent, 0.1)
                }
              }}
            >
              <LinkedInIcon sx={{ fontSize: 18 }} />
            </MuiLink>
          )}

          <MuiLink
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 30,
              height: 30,
              borderRadius: 1.5,
              color: member.accent,
              bgcolor: alpha(member.accent, 0.09),
              '&:hover': {
                bgcolor: alpha(member.accent, 0.18)
              }
            }}
          >
            <ArrowOutwardRoundedIcon sx={{ fontSize: 17 }} />
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Team Section                                  */
/* -------------------------------------------------------------------------- */

export default function Team({
  eyebrow = 'THE PEOPLE BEHIND THE WORK',
  title = 'Meet the team.',
  description = 'Meet the people behind Cryptech Services, bringing together administration, creative expertise, development, and community support.',
  email: _email = 'inquiries@cryptech.services',
  members: suppliedMembers
}: TeamProps) {
  const theme = useTheme();

  const [fetchedMembers, setFetchedMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(!suppliedMembers);
  const [loadError, setLoadError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<
    TeamCategory | 'All'
  >('All');

  const [page, setPage] = useState(1);

  const membersPerPage = 4;

  /* -------------------------- Fetch from Supabase ------------------------- */

  useEffect(() => {
    if (suppliedMembers !== undefined) {
      setFetchedMembers(suppliedMembers);
      setLoading(false);
      setLoadError(false);
      return;
    }

    let active = true;

    async function loadMembers() {
      try {
        setLoading(true);
        setLoadError(false);

        const result = await fetchTeamMembers();

        if (active) {
          setFetchedMembers(result);
        }
      } catch (error) {
        console.error('Failed to load team members:', error);

        if (active) {
          setLoadError(true);
          setFetchedMembers([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadMembers();

    return () => {
      active = false;
    };
  }, [suppliedMembers]);

  const members = suppliedMembers ?? fetchedMembers;

  /* --------------------------- Filter and pages -------------------------- */

  const categories: (TeamCategory | 'All')[] = [
    'All',
    'Admins',
    'Team',
    'Moderators'
  ];

  const filteredMembers =
    selectedCategory === 'All'
      ? members
      : members.filter((member) => member.category === selectedCategory);

  const pageCount = Math.ceil(filteredMembers.length / membersPerPage);

  const visibleMembers = filteredMembers.slice(
    (page - 1) * membersPerPage,
    page * membersPerPage
  );

  const surface =
    theme.backgroundScale?.[3] ?? theme.palette.background.default;

  const categoryCount = (category: TeamCategory | 'All') =>
    category === 'All'
      ? members.length
      : members.filter((member) => member.category === category).length;

  /* -------------------------------- Render ------------------------------- */

  return (
    <Box
      component="section"
      id="team"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        py: { xs: 8, md: 12 },
        backgroundColor: surface,
        scrollMarginTop: '90px',
        borderTop: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
        borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`
      }}
    >
      {/* Upper-left ambient glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -180,
          left: '-12%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.1
          )}, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />

      {/* Animated SVG network background */}
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.2,
          isolation: 'isolate',

          '& .team-grid': {
            animation: 'teamGridDrift 35s linear infinite'
          },

          '& .team-glow': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'teamGlowPulse 9s ease-in-out infinite alternate'
          },

          '& .team-glow-right': {
            animationDelay: '-4s'
          },

          '& .team-circuit': {
            strokeDasharray: '8 12',
            animation: 'teamCircuitFlow 18s linear infinite'
          },

          '& .team-circuit-reverse': {
            strokeDasharray: '5 14',
            animation: 'teamCircuitReverse 22s linear infinite'
          },

          '& .team-data-line': {
            strokeDasharray: '2 26',
            animation: 'teamDataFlow 7s linear infinite'
          },

          '& .team-data-line-delayed': {
            animationDelay: '-3.5s'
          },

          '& .team-node': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'teamNodePulse 3.8s ease-in-out infinite'
          },

          '& .team-node:nth-of-type(3n)': {
            animationDelay: '-1.3s'
          },

          '& .team-node:nth-of-type(4n)': {
            animationDelay: '-2.4s'
          },

          '& .team-orbit': {
            transformBox: 'view-box',
            transformOrigin: '720px 350px',
            animation: 'teamOrbitRotate 65s linear infinite'
          },

          '& .team-orbit-reverse': {
            transformBox: 'view-box',
            transformOrigin: '720px 350px',
            animation: 'teamOrbitRotateReverse 85s linear infinite'
          },

          '& .team-orbit-dot': {
            animation: 'teamNodePulse 2.6s ease-in-out infinite'
          },

          '@keyframes teamGridDrift': {
            from: { transform: 'translate(0, 0)' },
            to: { transform: 'translate(48px, 48px)' }
          },

          '@keyframes teamGlowPulse': {
            '0%': {
              opacity: 0.45,
              transform: 'scale(0.9)'
            },
            '100%': {
              opacity: 1,
              transform: 'scale(1.12)'
            }
          },

          '@keyframes teamCircuitFlow': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: -200 }
          },

          '@keyframes teamCircuitReverse': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: 200 }
          },

          '@keyframes teamDataFlow': {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: -112 }
          },

          '@keyframes teamNodePulse': {
            '0%, 100%': {
              opacity: 0.35,
              transform: 'scale(0.8)'
            },
            '50%': {
              opacity: 1,
              transform: 'scale(1.4)'
            }
          },

          '@keyframes teamOrbitRotate': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' }
          },

          '@keyframes teamOrbitRotateReverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' }
          },

          '@media (prefers-reduced-motion: reduce)': {
            '& .team-grid, & .team-glow, & .team-circuit, & .team-circuit-reverse, & .team-data-line, & .team-node, & .team-orbit, & .team-orbit-reverse, & .team-orbit-dot':
              {
                animation: 'none !important'
              }
          }
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            color: 'primary.main',
            overflow: 'visible'
          }}
        >
          <defs>
            <radialGradient id="teamGlow">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
              <stop offset="55%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>

            <pattern
              id="teamGrid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.28" />
            </pattern>

            <filter
              id="teamNodeGlow"
              x="-200%"
              y="-200%"
              width="400%"
              height="400%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="teamEdgeFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="35%" stopColor="white" stopOpacity="0.35" />
              <stop offset="50%" stopColor="white" stopOpacity="0.12" />
              <stop offset="65%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>

            <mask id="teamNetworkMask">
              <rect width="1440" height="700" fill="url(#teamEdgeFade)" />
            </mask>
          </defs>

          {/* Ambient light */}
          <g>
            <circle
              className="team-glow"
              cx="170"
              cy="350"
              r="300"
              fill="url(#teamGlow)"
            />

            <circle
              className="team-glow team-glow-right"
              cx="1270"
              cy="340"
              r="330"
              fill="url(#teamGlow)"
            />

            <circle
              className="team-glow"
              cx="720"
              cy="350"
              r="260"
              fill="url(#teamGlow)"
              opacity="0.25"
              style={{ animationDuration: '13s' }}
            />
          </g>

          {/* Drifting technical grid */}
          <g className="team-grid">
            <rect
              x="-48"
              y="-48"
              width="1536"
              height="796"
              fill="url(#teamGrid)"
            />
          </g>

          <g mask="url(#teamNetworkMask)">
            {/* Left circuit framework */}
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.38"
            >
              <path d="M-30 180 H110 L190 260 H310 L390 180 H480" />
              <path d="M30 420 H130 L210 340 H320 L400 420 H510" />
              <path d="M110 180 V100 H220 L270 150" />
              <path d="M210 340 V480 L300 570" />
              <path d="M390 180 V100 L470 60" />
              <path d="M320 340 L360 390 V490" />
              <path d="M40 300 H100 L140 260" />
              <path d="M250 520 L300 470 H390" />
              <path d="M80 560 V510 L130 460" />
            </g>

            {/* Moving circuit highlights */}
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.85"
            >
              <path
                className="team-circuit"
                d="M-30 180 H110 L190 260 H310 L390 180 H480"
              />
              <path
                className="team-circuit-reverse"
                d="M30 420 H130 L210 340 H320 L400 420 H510"
              />
              <path className="team-circuit" d="M110 180 V100 H220 L270 150" />
              <path
                className="team-circuit-reverse"
                d="M210 340 V480 L300 570"
              />
              <path className="team-circuit" d="M320 340 L360 390 V490" />
            </g>

            {/* Right circuit framework */}
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.38"
            >
              <path d="M1470 170 H1330 L1250 250 H1130 L1050 170 H960" />
              <path d="M1410 420 H1310 L1230 340 H1120 L1040 420 H930" />
              <path d="M1330 170 V90 H1220 L1170 140" />
              <path d="M1230 340 V480 L1140 570" />
              <path d="M1050 170 V100 L970 60" />
              <path d="M1120 340 L1080 390 V490" />
              <path d="M1400 300 H1340 L1300 260" />
              <path d="M1190 520 L1140 470 H1050" />
              <path d="M1360 560 V510 L1310 460" />
            </g>

            {/* Moving right circuit highlights */}
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.85"
            >
              <path
                className="team-circuit-reverse"
                d="M1470 170 H1330 L1250 250 H1130 L1050 170 H960"
              />
              <path
                className="team-circuit"
                d="M1410 420 H1310 L1230 340 H1120 L1040 420 H930"
              />
              <path
                className="team-circuit-reverse"
                d="M1330 170 V90 H1220 L1170 140"
              />
              <path className="team-circuit" d="M1230 340 V480 L1140 570" />
              <path
                className="team-circuit-reverse"
                d="M1120 340 L1080 390 V490"
              />
            </g>

            {/* Moving data packets */}
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#teamNodeGlow)"
            >
              <path
                className="team-data-line"
                d="M-30 180 H110 L190 260 H310 L390 180 H480"
              />
              <path
                className="team-data-line team-data-line-delayed"
                d="M30 420 H130 L210 340 H320 L400 420 H510"
              />
              <path
                className="team-data-line"
                d="M1470 170 H1330 L1250 250 H1130 L1050 170 H960"
              />
              <path
                className="team-data-line team-data-line-delayed"
                d="M1410 420 H1310 L1230 340 H1120 L1040 420 H930"
              />
            </g>

            {/* Static network nodes */}
            <g fill="currentColor" opacity="0.72">
              {[
                [110, 180],
                [190, 260],
                [310, 260],
                [390, 180],
                [130, 420],
                [210, 340],
                [320, 340],
                [400, 420],
                [110, 100],
                [220, 100],
                [300, 570],
                [360, 490],
                [470, 60],
                [1330, 170],
                [1250, 250],
                [1130, 250],
                [1050, 170],
                [1310, 420],
                [1230, 340],
                [1120, 340],
                [1040, 420],
                [1330, 90],
                [1220, 90],
                [1140, 570],
                [1080, 490],
                [970, 60]
              ].map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="2.4" />
              ))}
            </g>

            {/* Pulsing nodes */}
            <g fill="currentColor" filter="url(#teamNodeGlow)">
              {[
                [110, 180],
                [310, 260],
                [210, 340],
                [400, 420],
                [220, 100],
                [300, 570],
                [1250, 250],
                [1130, 250],
                [1230, 340],
                [1040, 420],
                [1220, 90],
                [1140, 570]
              ].map(([cx, cy], index) => (
                <circle
                  key={index}
                  className="team-node"
                  cx={cx}
                  cy={cy}
                  r="3"
                  style={{ animationDelay: `${(index % 5) * -0.65}s` }}
                />
              ))}
            </g>

            {/* Central orbital rings */}
            <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18">
              <circle cx="720" cy="350" r="180" />
              <circle cx="720" cy="350" r="230" />
            </g>

            <g
              className="team-orbit"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.28"
            >
              <circle cx="720" cy="350" r="270" strokeDasharray="4 12" />
              <circle cx="720" cy="350" r="310" strokeDasharray="2 18" />
            </g>

            <g
              className="team-orbit-reverse"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.22"
            >
              <ellipse
                cx="720"
                cy="350"
                rx="220"
                ry="100"
                strokeDasharray="3 14"
              />
            </g>

            {/* Orbital signal markers */}
            <g className="team-orbit" style={{ animationDuration: '32s' }}>
              <circle
                cx="720"
                cy="80"
                r="3.5"
                fill="currentColor"
                className="team-orbit-dot"
              />
              <circle
                cx="720"
                cy="40"
                r="2"
                fill="currentColor"
                opacity="0.6"
              />
            </g>

            <g
              className="team-orbit-reverse"
              style={{ animationDuration: '42s' }}
            >
              <circle
                cx="720"
                cy="80"
                r="2.5"
                fill="currentColor"
                className="team-orbit-dot"
              />
            </g>
          </g>
        </Box>
      </Box>

      {/* Lower-right ambient glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          right: '-15%',
          bottom: -220,
          width: 460,
          height: 460,
          borderRadius: '50%',
          display: { xs: 'none', md: 'block' },
          background: `radial-gradient(circle, ${alpha(
            theme.palette.secondary.main,
            0.08
          )}, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Section heading */}
        <Stack
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 760,
            mx: 'auto',
            mb: { xs: 4, md: 6 }
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
              border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
              backgroundColor: alpha(theme.palette.primary.main, 0.06)
            }}
          >
            <GroupsRoundedIcon sx={{ color: 'primary.main', fontSize: 17 }} />

            <Typography
              sx={{
                color: 'primary.main',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.14em'
              }}
            >
              {eyebrow}
            </Typography>
          </Stack>

          <Typography
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
              mt: 2,
              maxWidth: 650,
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.85
            }}
          >
            {description}
          </Typography>
        </Stack>

        {/* Category filters */}
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1,
            mb: { xs: 4, md: 5 }
          }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <Chip
                key={category}
                label={`${category} · ${categoryCount(category)}`}
                clickable
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                }}
                variant={isSelected ? 'filled' : 'outlined'}
                color={isSelected ? 'primary' : 'default'}
                sx={{
                  height: 36,
                  px: 0.5,
                  borderRadius: 2,
                  fontWeight: 750,
                  borderColor: alpha(theme.palette.primary.main, 0.25),
                  transition:
                    'background-color 180ms ease, border-color 180ms ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.12)
                  }
                }}
              />
            );
          })}
        </Stack>

        {/* Selected category heading */}
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 1,
            mb: 2.5
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 22,
              borderRadius: 2,
              backgroundColor: 'primary.main'
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.15rem', md: '1.35rem' },
              fontWeight: 850,
              letterSpacing: '-0.035em'
            }}
          >
            {selectedCategory === 'All' ? 'All Members' : selectedCategory}
          </Typography>

          <Typography
            sx={{
              ml: 0.5,
              fontSize: '0.75rem',
              color: 'text.secondary'
            }}
          >
            {filteredMembers.length}{' '}
            {filteredMembers.length === 1 ? 'member' : 'members'}
          </Typography>
        </Stack>

        {/* Loading state */}
        {loading ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Loading team members...
            </Typography>
          </Box>
        ) : loadError ? (
          /* Error state */
          <Box
            role="alert"
            sx={{
              py: 8,
              px: 2,
              textAlign: 'center',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3
            }}
          >
            <Typography color="error" sx={{ mb: 2 }}>
              Unable to load team members. Please try again.
            </Typography>

            <Chip
              label="Retry"
              clickable
              color="primary"
              onClick={() => {
                setLoadError(false);
                setLoading(true);

                void fetchTeamMembers()
                  .then((result) => {
                    setFetchedMembers(result);
                  })
                  .catch((error) => {
                    console.error('Failed to reload team members:', error);
                    setLoadError(true);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />
          </Box>
        ) : visibleMembers.length > 0 ? (
          /* Team member cards */
          <Grid
            key={`${selectedCategory}-${page}`}
            container
            spacing={2.5}
            sx={{
              justifyContent: 'center',
              alignItems: 'stretch',
              animation: 'teamPageEnter 280ms ease',
              '@keyframes teamPageEnter': {
                from: {
                  opacity: 0,
                  transform: 'translateY(8px)'
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              },
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none'
              }
            }}
          >
            {visibleMembers.map((member) => (
              <Grid
                key={`${member.name}-${member.role}`}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <TeamMemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Empty state */
          <Box
            sx={{
              py: 8,
              textAlign: 'center',
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 3
            }}
          >
            <Typography color="text.secondary">
              No members found in this category.
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {!loading && !loadError && pageCount >= 1 && (
          <Stack
            spacing={1.5}
            sx={{
              alignItems: 'center',
              mt: { xs: 4, md: 5 }
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, nextPage) => setPage(nextPage)}
              color="primary"
              shape="rounded"
              size="large"
              siblingCount={1}
              boundaryCount={1}
              aria-label="Team member pages"
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
              Showing {(page - 1) * membersPerPage + 1}
              {'–'}
              {Math.min(page * membersPerPage, filteredMembers.length)}
              {' of '}
              {filteredMembers.length} members
            </Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
