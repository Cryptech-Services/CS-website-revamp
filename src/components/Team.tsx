'use client';

import { useState } from 'react';
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

type TeamCategory = 'Admins' | 'Team' | 'Moderators';

type TeamMember = {
  name: string;
  role: string;
  initials: string;
  description: string;
  skills: string[];
  accent: string;
  email: string;
  category: TeamCategory;
  github?: string;
  linkedin?: string;
  image?: string;
  discordId: string;
  discordAvatar: string;
};

type TeamProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
  members?: TeamMember[];
};

const defaultMembers: TeamMember[] = [
  // ADMINS
  {
    name: 'Squidicuz',
    role: 'CS Admin',
    initials: 'SQ',
    description:
      'An administrator, consultant, and developer supporting Cryptech Services operations, technical projects, and team coordination.',
    skills: ['Administration', 'Consulting', 'Development'],
    accent: '#7C9CFF',
    email: 'squid@cryptech.services',
    category: 'Admins',
    discordId: '294414250376429569',
    discordAvatar: 'a_fa4e4b545da31af0d93c8b3fc98c2695'
  },
  {
    name: 'Seqsee',
    role: 'CS Admin',
    initials: 'SE',
    description:
      'An administrator, consultant, and developer contributing to team coordination, technical problem-solving, and project delivery.',
    skills: ['Administration', 'Consulting', 'Development'],
    accent: '#B69CFF',
    email: 'seqsee@cryptech.services',
    category: 'Admins',
    discordId: '412122437954830337',
    discordAvatar: 'a_c5828f6cbd3774b15462f7a99ccdaf93'
  },

  // TEAM
  {
    name: 'Baydroid',
    role: 'Cryptographer',
    initials: 'BA',
    description:
      'Applies cryptographic expertise to security-focused work and contributes technical knowledge to digital projects.',
    skills: ['Cryptography', 'Security', 'Consulting', 'Development'],
    accent: '#66D6B2',
    email: 'baydroid@cryptech.services',
    category: 'Team',
    discordId: '426261793426636804',
    discordAvatar: 'c36662d132c7bc4ddb2294621b1c5a65'
  },
  {
    name: 'Boehmerang',
    role: 'CAD Designer',
    initials: 'BO',
    description:
      'Creates computer-aided design work and supports technical projects through design, consulting, and development.',
    skills: ['CAD Design', 'Technical Design', 'Consulting', 'Development'],
    accent: '#F0A35E',
    email: 'boemerang@cryptech.services',
    category: 'Team',
    discordId: '161986311832600576',
    discordAvatar: '8933e21b6f61f1cca3b597411f11d83a'
  },
  {
    name: 'Ercknard',
    role: 'Web Designer',
    initials: 'ER',
    description:
      'Creates engaging digital experiences through thoughtful web design, intuitive interfaces, and modern development practices.',
    skills: ['Web Design', 'UI/UX', 'Consulting', 'Development'],
    accent: '#62B8F0',
    email: 'ercknard@cryptech.services',
    category: 'Team',
    discordId: '615741889366458369',
    discordAvatar: '430c432445e82d9eb95c4c6f4d7d9699'
  },
  {
    name: 'RasAlGhul',
    role: 'Photographer',
    initials: 'RA',
    description:
      'Brings visual storytelling and photography to creative projects while contributing consulting and development expertise.',
    skills: ['Photography', 'Visual Storytelling', 'Consulting', 'Development'],
    accent: '#A6D977',
    email: 'rasalghul@cryptech.services',
    category: 'Team',
    discordId: '306288896516423680',
    discordAvatar: 'b1db7d6e300ddcb220834d86f0e0d1e2'
  },
  {
    name: 'Vanikoro',
    role: 'Junior Developer',
    initials: 'VA',
    description:
      'Contributes to software development tasks and helps build practical digital solutions while growing technical expertise.',
    skills: ['Programming', 'Development', 'Problem Solving'],
    accent: '#F08FA8',
    email: 'vanikoro@cryptech.services',
    category: 'Team',
    discordId: '500376620708659212',
    discordAvatar: '8ef05471a811a239c1325a7cffc77c58'
  },
  {
    name: 'Crow',
    role: 'Developer',
    initials: 'CR',
    description:
      'Contributes to building and improving digital solutions, turning project requirements into functional software.',
    skills: ['Software Development', 'Programming', 'Problem Solving'],
    accent: '#9D9CF8',
    email: 'crow@cryptech.services',
    category: 'Team',
    discordId: '343740264252178433',
    discordAvatar: '3075136615a0ef1a4e1b0e9789d3d32c'
  },

  // MODERATORS
  {
    name: 'Demil',
    role: 'Moderator',
    initials: 'DE',
    description:
      'Helps maintain an organized and welcoming community by supporting discussions and encouraging respectful participation.',
    skills: ['Moderation', 'Community Support', 'Communication'],
    accent: '#E5B86A',
    email: 'demil@cryptech.services',
    category: 'Moderators',
    discordId: '475288167000571915',
    discordAvatar: '080b088d8c34a066b1253d89c40e833b'
  },
  {
    name: 'Deathsmack',
    role: 'Moderator',
    initials: 'DS',
    description:
      'Supports community management by helping maintain respectful discussions and a positive environment for members.',
    skills: ['Moderation', 'Community Management', 'Communication'],
    accent: '#6DD6C0',
    email: 'deathsmack@cryptech.services',
    category: 'Moderators',
    discordId: '794753250578530314',
    discordAvatar: '6c8da1894d030434affb0491eab91ccd'
  },
  {
    name: 'Shikoku',
    role: 'Moderator',
    initials: 'SH',
    description:
      'Helps keep community spaces organized, assists members, and encourages constructive participation.',
    skills: ['Moderation', 'Community Support', 'Engagement'],
    accent: '#C59CF5',
    email: 'shikoku@cryptech.services',
    category: 'Moderators',
    discordId: '277630911112151051',
    discordAvatar: 'd1195e556f7af09a8b15308e022ae1ce'
  }
];

function MemberAvatar({ member }: { member: TeamMember }) {
  const theme = useTheme();

  const surface =
    theme.backgroundScale?.[2] ?? theme.palette.background.default;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        aspectRatio: '1 / 0.65',
        overflow: 'hidden',
        borderRadius: 2.5,
        background: `
          radial-gradient(
            circle at 50% 35%,
            ${alpha(member.accent, 0.22)},
            transparent 65%
          ),
          linear-gradient(
            145deg,
            ${alpha(member.accent, 0.09)},
            ${surface}
          )
        `,
        border: `1px solid ${alpha(member.accent, 0.2)}`
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '68%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: `1px solid ${alpha(member.accent, 0.18)}`
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '48%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: `1px dashed ${alpha(member.accent, 0.28)}`
        }}
      />

      {/* <Avatar
        src={member.image}
        alt={member.image ? member.name : undefined}
        sx={{
          width: { xs: 68, sm: 78 },
          height: { xs: 68, sm: 78 },
          zIndex: 1,
          fontSize: '1.5rem',
          fontWeight: 800,
          color: member.accent,
          backgroundColor: alpha(member.accent, 0.14),
          border: `2px solid ${alpha(member.accent, 0.45)}`,
          boxShadow: `0 0 35px ${alpha(member.accent, 0.12)}`
        }}
      >
        {!member.image && member.initials}
      </Avatar> */}

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
        src={
          member.discordId && member.discordAvatar
            ? `https://cdn.discordapp.com/avatars/${member.discordId}/${member.discordAvatar}.${member.discordAvatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
            : undefined
        }
        alt={member.name}
        sx={{
          width: 75,
          height: 75,
          margin: 'auto',
          mt: 5,
          mb: 5,
          bgcolor: 'action.hover'
        }}
      >
        {member.initials}
      </Avatar>

      <Box
        sx={{
          position: 'absolute',
          left: 10,
          bottom: 9,
          display: 'flex',
          alignItems: 'center',
          gap: 0.6
        }}
      >
        <Box
          sx={{
            width: 5,
            height: 5,
            flexShrink: 0,
            borderRadius: '50%',
            backgroundColor: member.accent
          }}
        />

        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '0.58rem',
            fontFamily: 'monospace',
            letterSpacing: '0.08em'
          }}
        >
          CRYPTECH TEAM
        </Typography>
      </Box>
    </Box>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const theme = useTheme();

  const surface = theme.secondaryScale?.[4] ?? theme.palette.background.paper;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 320,
        height: '100%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 1.5, sm: 1.75 },
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: surface,
        transition:
          'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: alpha(member.accent, 0.55),
          boxShadow: `0 14px 35px ${alpha(member.accent, 0.08)}`
        }
      }}
    >
      <MemberAvatar member={member} />

      <Typography
        variant="h6"
        sx={{
          mt: 1.75,
          fontSize: '1.05rem',
          fontWeight: 850,
          lineHeight: 1.35,
          letterSpacing: '-0.025em'
        }}
      >
        {member.name}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: member.accent,
          fontSize: '0.78rem',
          fontWeight: 750,
          lineHeight: 1.5
        }}
      >
        {member.role}
      </Typography>

      <Typography
        sx={{
          mt: 1.25,
          color: 'text.secondary',
          fontSize: '0.8rem',
          lineHeight: 1.7
        }}
      >
        {member.description}
      </Typography>

      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          gap: 0.5,
          mt: 1.75
        }}
      >
        {member.skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="small"
            sx={{
              height: 24,
              borderRadius: 1.25,
              fontSize: '0.65rem',
              fontWeight: 650,
              color: 'text.secondary',
              backgroundColor: alpha(member.accent, 0.08),
              border: `1px solid ${alpha(member.accent, 0.18)}`,
              '& .MuiChip-label': {
                px: 0.9
              }
            }}
          />
        ))}
      </Stack>

      <Box sx={{ flexGrow: 1, minHeight: 14 }} />

      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mt: 1.75,
          pt: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack direction="row" spacing={0.75}>
          {member.github && (
            <MuiLink
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 32,
                height: 32,
                borderRadius: 1.5,
                color: 'text.secondary',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'color 180ms ease, border-color 180ms ease',
                '&:hover': {
                  color: member.accent,
                  borderColor: member.accent
                }
              }}
            >
              <GitHubIcon sx={{ fontSize: 17 }} />
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
                width: 32,
                height: 32,
                borderRadius: 1.5,
                color: 'text.secondary',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'color 180ms ease, border-color 180ms ease',
                '&:hover': {
                  color: member.accent,
                  borderColor: member.accent
                }
              }}
            >
              <LinkedInIcon sx={{ fontSize: 17 }} />
            </MuiLink>
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <EmailOutlinedIcon fontSize="small" color="primary" />

            <Typography
              component="a"
              href={`mailto:${member.email}`}
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                overflowWrap: 'anywhere',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {member.email}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function Team({
  eyebrow = 'THE PEOPLE BEHIND THE WORK',
  title = 'Meet the team.',
  description = 'Meet the people behind Cryptech Services, bringing together administration, creative expertise, development, and community support.',
  email = 'inquiries@cryptech.services',
  members = defaultMembers
}: TeamProps) {
  const theme = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<
    TeamCategory | 'All'
  >('All');

  const [page, setPage] = useState(1);

  const membersPerPage = 4;

  const categories: (TeamCategory | 'All')[] = [
    'All',
    'Admins',
    'Team',
    'Moderators'
  ];

  // Filter members BEFORE calculating pagination.
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

      {/* SVG network background */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.2
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
            color: 'primary.main'
          }}
        >
          <defs>
            <radialGradient id="teamGlow">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>

            <pattern
              id="teamGrid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>

          <circle cx="180" cy="350" r="280" fill="url(#teamGlow)" />
          <circle cx="1260" cy="320" r="300" fill="url(#teamGlow)" />

          <rect width="1440" height="700" fill="url(#teamGrid)" />

          {/* Left-side network */}
          <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
            <path d="M-30 180 L110 180 L190 260 L310 260 L390 180 L480 180" />
            <path d="M30 420 L130 420 L210 340 L320 340 L400 420 L510 420" />
            <path d="M110 180 L110 100 L220 100 L270 150" />
            <path d="M210 340 L210 480 L300 570" />
            <path d="M390 180 L390 100 L470 60" />
            <path d="M320 340 L360 390 L360 490" />
          </g>

          {/* Right-side network */}
          <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
            <path d="M1470 170 L1330 170 L1250 250 L1130 250 L1050 170 L960 170" />
            <path d="M1410 420 L1310 420 L1230 340 L1120 340 L1040 420 L930 420" />
            <path d="M1330 170 L1330 90 L1220 90 L1170 140" />
            <path d="M1230 340 L1230 480 L1140 570" />
            <path d="M1050 170 L1050 100 L970 60" />
            <path d="M1120 340 L1080 390 L1080 490" />
          </g>

          {/* Network nodes */}
          <g fill="currentColor">
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
              [1080, 490]
            ].map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="3" opacity="0.65" />
            ))}
          </g>

          {/* Decorative orbit rings */}
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12">
            <circle cx="720" cy="350" r="230" />
            <circle cx="720" cy="350" r="270" strokeDasharray="4 12" />
            <circle cx="720" cy="350" r="310" strokeDasharray="2 18" />
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

        {/* Filtered and paginated member cards */}
        {visibleMembers.length > 0 ? (
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
        {pageCount >= 1 && (
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
