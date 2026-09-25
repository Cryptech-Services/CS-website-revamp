'use client';

import * as React from 'react';

import Head from 'next/head';

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import PaletteIcon from '@mui/icons-material/Palette';
import CommitRoundedIcon from '@mui/icons-material/CommitRounded';
import MergeRoundedIcon from '@mui/icons-material/MergeRounded';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

import FloatingThemeControls from '@/theme/components/FloatingThemeControls';
import Navbar from '@/theme/layout/Navbar';

type GitHubCommit = {
  sha: string;
  message: string;
  author?: {
    name?: string;
    email?: string;
  };
  distinct?: boolean;
  url?: string;
};

type GitHubEvent = {
  id: string;
  type: string;

  actor: {
    id: number;
    login: string;
    display_login?: string;
    avatar_url: string;
    html_url?: string;
  };

  repo: {
    id: number;
    name: string;
    url: string;
  };

  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    master_branch?: string;
    description?: string | null;

    before?: string;
    head?: string;

    commits?: GitHubCommit[];

    issue?: {
      number?: number;
      title?: string;
      html_url?: string;
    };

    pull_request?: {
      number?: number;
      title?: string;
      html_url?: string;
    };

    release?: {
      name?: string;
      tag_name?: string;
      html_url?: string;
    };

    comment?: {
      body?: string;
      html_url?: string;
    };
  };

  public: boolean;
  created_at: string;
};

type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  language: string | null;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

type RepositoryResponse = GitHubRepository | { error: string };

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? '';

function formatEventType(type: string) {
  return type.replace(/Event$/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
}

function formatDate(date: string) {
  const value = new Date(date);

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(value);
}

function relativeTime(date: string) {
  const now = Date.now();
  const timestamp = new Date(date).getTime();

  const seconds = Math.max(Math.floor((now - timestamp) / 1000), 0);

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months}mo ago`;
  }

  return `${Math.floor(months / 12)}y ago`;
}

function getEventIcon(type: string) {
  switch (type) {
    case 'PushEvent':
      return <CommitRoundedIcon />;

    case 'PullRequestEvent':
      return <MergeRoundedIcon />;

    case 'IssuesEvent':
      return <BugReportOutlinedIcon />;

    case 'IssueCommentEvent':
      return <EditOutlinedIcon />;

    case 'WatchEvent':
      return <StarBorderRoundedIcon />;

    case 'CreateEvent':
      return <AddRoundedIcon />;

    case 'DeleteEvent':
      return <DeleteOutlineRoundedIcon />;

    case 'ReleaseEvent':
      return <LocalOfferOutlinedIcon />;

    case 'ForkEvent':
      return <CallMadeRoundedIcon />;

    case 'CommitCommentEvent':
      return <CodeRoundedIcon />;

    case 'PublicEvent':
      return <RemoveRedEyeOutlinedIcon />;

    default:
      return <QuestionMarkRoundedIcon />;
  }
}

function getEventDescription(event: GitHubEvent) {
  const actor = event.actor.display_login || event.actor.login;

  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload.commits ?? [];
      const branch =
        event.payload.ref?.replace('refs/heads/', '') || 'unknown branch';

      if (commits.length === 1) {
        return (
          <>
            <strong>{actor}</strong> pushed a commit to{' '}
            <strong>{branch}</strong>
          </>
        );
      }

      return (
        <>
          <strong>{actor}</strong> pushed{' '}
          <strong>{commits.length} commits</strong> to <strong>{branch}</strong>
        </>
      );
    }

    case 'PullRequestEvent':
      return (
        <>
          <strong>{actor}</strong> {event.payload.action ?? 'updated'} a pull
          request
          {event.payload.pull_request?.title
            ? `: ${event.payload.pull_request.title}`
            : ''}
        </>
      );

    case 'IssuesEvent':
      return (
        <>
          <strong>{actor}</strong> {event.payload.action ?? 'updated'} an issue
          {event.payload.issue?.title ? `: ${event.payload.issue.title}` : ''}
        </>
      );

    case 'IssueCommentEvent':
      return (
        <>
          <strong>{actor}</strong> commented on an issue
        </>
      );

    case 'WatchEvent':
      return (
        <>
          <strong>{actor}</strong> starred the repository
        </>
      );

    case 'ForkEvent':
      return (
        <>
          <strong>{actor}</strong> forked the repository
        </>
      );

    case 'CreateEvent':
      return (
        <>
          <strong>{actor}</strong> created a{' '}
          {event.payload.ref_type ?? 'resource'}
          {event.payload.ref ? ` ${event.payload.ref}` : ''}
        </>
      );

    case 'DeleteEvent':
      return (
        <>
          <strong>{actor}</strong> deleted a{' '}
          {event.payload.ref_type ?? 'resource'}
          {event.payload.ref ? ` ${event.payload.ref}` : ''}
        </>
      );

    case 'ReleaseEvent':
      return (
        <>
          <strong>{actor}</strong> {event.payload.action ?? 'published'} a
          release
          {event.payload.release?.tag_name
            ? ` ${event.payload.release.tag_name}`
            : ''}
        </>
      );

    case 'PublicEvent':
      return (
        <>
          <strong>{actor}</strong> made the repository public
        </>
      );

    default:
      return (
        <>
          <strong>{actor}</strong> generated a {formatEventType(event.type)}
        </>
      );
  }
}

function EventCard({ event }: { event: GitHubEvent }) {
  const theme = useTheme();

  const accent = theme.colorScale[9];

  const commits = event.payload.commits ?? [];

  return (
    <Box
      sx={{
        position: 'relative',
        pl: {
          xs: 5.5,
          sm: 6.5
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,

          width: {
            xs: 38,
            sm: 44
          },

          height: {
            xs: 38,
            sm: 44
          },

          borderRadius: 2.25,

          display: 'grid',
          placeItems: 'center',

          color: accent,

          backgroundColor: alpha(accent, 0.09),

          border: `1px solid ${alpha(accent, 0.2)}`,

          '& svg': {
            fontSize: {
              xs: 18,
              sm: 20
            }
          }
        }}
      >
        {getEventIcon(event.type)}
      </Box>

      <Paper
        variant="outlined"
        sx={{
          overflow: 'hidden',

          borderRadius: 2.5,

          borderColor: alpha(theme.secondaryScale[6], 0.8),

          backgroundColor: alpha(
            theme.backgroundScale[2],
            theme.palette.mode === 'dark' ? 0.72 : 0.96
          ),

          transition:
            'border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',

          '&:hover': {
            transform: 'translateY(-1px)',

            borderColor: alpha(accent, 0.35),

            boxShadow: `0 12px 35px ${alpha(accent, 0.08)}`
          }
        }}
      >
        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 2
            },

            py: {
              xs: 1.25,
              sm: 1.5
            }
          }}
        >
          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={{
              xs: 1,
              sm: 2
            }}
            sx={{
              alignItems: {
                xs: 'flex-start',
                sm: 'center'
              },

              justifyContent: 'space-between'
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                minWidth: 0
              }}
            >
              <Avatar
                src={event.actor.avatar_url}
                alt={event.actor.login}
                sx={{
                  width: 28,
                  height: 28
                }}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 12,
                      sm: 13
                    },

                    lineHeight: 1.45,

                    color: theme.grayScale[11],

                    '& strong': {
                      color: theme.grayScale[12],
                      fontWeight: 800
                    }
                  }}
                >
                  {getEventDescription(event)}
                </Typography>

                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    mt: 0.5,
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: theme.grayScale[8]
                    }}
                  >
                    {formatEventType(event.type)}
                  </Typography>

                  <Box
                    sx={{
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      backgroundColor: theme.grayScale[7]
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 10,
                      color: theme.grayScale[8]
                    }}
                  >
                    {relativeTime(event.created_at)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Typography
              sx={{
                flexShrink: 0,
                fontSize: 10,
                color: theme.grayScale[8]
              }}
            >
              {formatDate(event.created_at)}
            </Typography>
          </Stack>
        </Box>

        {commits.length > 0 && (
          <>
            <Divider
              sx={{
                borderColor: alpha(theme.secondaryScale[7], 0.4)
              }}
            />

            <Stack
              spacing={0.75}
              sx={{
                p: {
                  xs: 1.25,
                  sm: 1.5
                }
              }}
            >
              {commits.slice(0, 3).map((commit) => (
                <Stack
                  key={commit.sha}
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'flex-start'
                  }}
                >
                  <CommitRoundedIcon
                    sx={{
                      mt: 0.15,
                      flexShrink: 0,
                      fontSize: 14,
                      color: theme.grayScale[8]
                    }}
                  />

                  <Typography
                    sx={{
                      minWidth: 0,

                      fontSize: 11,

                      lineHeight: 1.45,

                      color: theme.grayScale[10],

                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {commit.message.split('\n')[0]}
                  </Typography>

                  <Typography
                    component="code"
                    sx={{
                      flexShrink: 0,

                      fontSize: 9,

                      px: 0.65,
                      py: 0.25,

                      borderRadius: 1,

                      color: theme.grayScale[9],

                      backgroundColor: alpha(theme.grayScale[8], 0.08)
                    }}
                  >
                    {commit.sha.slice(0, 7)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </>
        )}

        {event.payload.issue?.html_url && (
          <Box
            sx={{
              px: 1.5,
              pb: 1.25
            }}
          >
            <Button
              component="a"
              href={event.payload.issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<OpenInNewRoundedIcon />}
              sx={{
                minHeight: 30,
                fontSize: 10
              }}
            >
              View issue
            </Button>
          </Box>
        )}

        {event.payload.pull_request?.html_url && (
          <Box
            sx={{
              px: 1.5,
              pb: 1.25
            }}
          >
            <Button
              component="a"
              href={event.payload.pull_request.html_url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<OpenInNewRoundedIcon />}
              sx={{
                minHeight: 30,
                fontSize: 10
              }}
            >
              View pull request
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

function RepositoryStats({ repository }: { repository: GitHubRepository }) {
  const theme = useTheme();

  const stats = [
    {
      label: 'Stars',
      value: repository.stargazers_count
    },
    {
      label: 'Forks',
      value: repository.forks_count
    },
    {
      label: 'Issues',
      value: repository.open_issues_count
    },
    {
      label: 'Watchers',
      value: repository.watchers_count
    }
  ];

  return (
    <Stack
      direction="row"
      spacing={0.75}
      sx={{
        flexWrap: 'wrap'
      }}
    >
      {stats.map((stat) => (
        <Chip
          key={stat.label}
          size="small"
          label={`${stat.value.toLocaleString()} ${stat.label}`}
          sx={{
            height: 30,

            fontSize: 10,

            fontWeight: 700,

            backgroundColor: alpha(theme.colorScale[9], 0.07),

            border: `1px solid ${alpha(theme.colorScale[9], 0.14)}`
          }}
        />
      ))}
    </Stack>
  );
}

export default function GitHubPage() {
  const theme = useTheme();

  const [events, setEvents] = React.useState<GitHubEvent[]>([]);
  const [repository, setRepository] = React.useState<GitHubRepository | null>(
    null
  );

  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const [eventsResponse, repoResponse] = await Promise.all([
        fetch('/api/github/events?per_page=50', {
          cache: 'no-store'
        }),

        fetch('/api/github/repository', {
          cache: 'no-store'
        })
      ]);

      const eventsData = await eventsResponse.json();
      const repoData: RepositoryResponse = await repoResponse.json();

      if (!eventsResponse.ok) {
        throw new Error(eventsData?.error || 'Failed to load GitHub events.');
      }

      if (!repoResponse.ok) {
        throw new Error(
          (repoData as { error?: string })?.error ||
            'Failed to load GitHub repository.'
        );
      }

      setEvents(eventsData);
      setRepository(repoData as GitHubRepository);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error ? err.message : 'Unable to load GitHub data.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const repoName =
    repository?.full_name ||
    process.env.NEXT_PUBLIC_GITHUB_URL?.replace('https://github.com/', '') ||
    'GitHub Repository';

  return (
    <>
      <Head>
        <title>GitHub | {repoName}</title>

        <meta
          name="description"
          content={`GitHub activity and repository events for ${repoName}.`}
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
        {/* Grid background */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            height: '75vh',
            opacity: theme.palette.mode === 'dark' ? 0.075 : 0.075,

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

        {/* Ambient glow */}

        <Box
          sx={{
            position: 'absolute',
            top: -220,
            left: { xs: '-10%', xxl: '2.5%', xxxxl: '15%', xxxxxl: '20%' },
            width: 500,
            display: { xs: 'none', md: 'block' },
            height: 500,
            borderRadius: '50%',
            backgroundColor: alpha(theme.colorScale[9], 0.07),
            filter: 'blur(100px)',
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
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Stack
          spacing={{
            xs: 3,
            md: 4
          }}
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
              <Stack spacing={1.25}>
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
                    Developer activity
                  </Typography>
                </Stack>

                <Typography variant="title">GitHub</Typography>

                <Typography
                  variant="large"
                  sx={{
                    color: theme.grayScale[11],
                    maxWidth: 800
                  }}
                >
                  Repository activity, commits, pull requests, issues, releases,
                  and other GitHub events.
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center'
                }}
              >
                {GITHUB_URL && (
                  <Button
                    component="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{
                      minHeight: 40,
                      borderRadius: 2
                    }}
                  >
                    Open GitHub
                  </Button>
                )}

                <Tooltip title="Refresh">
                  <span>
                    <IconButton
                      onClick={() => loadData(true)}
                      disabled={loading || refreshing}
                      sx={{
                        width: 40,
                        height: 40,

                        border: '1px solid',
                        borderColor: alpha(theme.secondaryScale[6], 0.8),

                        backgroundColor: alpha(theme.backgroundScale[2], 0.7)
                      }}
                    >
                      {refreshing ? (
                        <CircularProgress size={18} />
                      ) : (
                        <RefreshRoundedIcon />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>

          {/* Repository */}

          {repository && (
            <Paper
              variant="outlined"
              sx={{
                position: 'relative',
                overflow: 'hidden',

                borderRadius: 3.5,

                borderColor: alpha(theme.secondaryScale[7], 0.75),

                background: `
      linear-gradient(
        135deg,
        ${alpha(theme.colorScale[3], 1)} 0%,
        ${alpha(theme.backgroundScale[2], 0.92)} 45%,
        ${alpha(theme.secondaryScale[9], 0.045)} 100%
      )
    `,

                boxShadow: `
      0 18px 50px ${alpha(theme.grayScale[12], 0.05)}
    `
              }}
            >
              {/* Accent line */}

              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,

                  height: 2,

                  background: `
        linear-gradient(
          90deg,
          ${alpha(theme.colorScale[9], 0)},
          ${alpha(theme.colorScale[9], 0.8)},
          ${alpha(theme.secondaryScale[9], 0.5)},
          ${alpha(theme.colorScale[9], 0)}
        )
      `
                }}
              />

              <Stack spacing={0}>
                {/* Repository identity */}

                <Box
                  sx={{
                    p: {
                      xs: 2,
                      sm: 2.5,
                      md: 3
                    }
                  }}
                >
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row'
                    }}
                    spacing={{
                      xs: 2,
                      sm: 2.5
                    }}
                    sx={{
                      alignItems: {
                        xs: 'flex-start',
                        sm: 'center'
                      },

                      justifyContent: 'space-between'
                    }}
                  >
                    {/* Owner + repository */}

                    <Stack
                      direction="row"
                      spacing={{
                        xs: 1.5,
                        sm: 2
                      }}
                      sx={{
                        alignItems: 'center',
                        minWidth: 0,
                        flex: 1
                      }}
                    >
                      <Avatar
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                        sx={{
                          width: {
                            xs: 48,
                            sm: 58
                          },

                          height: {
                            xs: 48,
                            sm: 58
                          },

                          flexShrink: 0,

                          border: `2px solid ${alpha(
                            theme.colorScale[9],
                            0.22
                          )}`,

                          backgroundColor: alpha(theme.colorScale[9], 0.08),

                          boxShadow: `
                0 0 0 5px ${alpha(theme.colorScale[9], 0.045)}
              `
                        }}
                      />

                      <Stack
                        spacing={0.5}
                        sx={{
                          minWidth: 0
                        }}
                      >
                        {/* Owner */}

                        <Stack
                          direction="row"
                          spacing={0.75}
                          sx={{
                            alignItems: 'center',
                            minWidth: 0
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10,
                              fontWeight: 800,

                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',

                              color: theme.colorScale[9],

                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {repository.owner.login}
                          </Typography>

                          <Box
                            sx={{
                              width: 3,
                              height: 3,

                              flexShrink: 0,

                              borderRadius: '50%',

                              backgroundColor: theme.grayScale[7]
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 10,
                              color: theme.grayScale[8]
                            }}
                          >
                            Repository
                          </Typography>
                        </Stack>

                        {/* Name + public */}

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: 'center',
                            minWidth: 0,
                            flexWrap: 'wrap'
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 20,
                                sm: 24,
                                md: 26
                              },

                              lineHeight: 1.15,

                              fontWeight: 850,

                              letterSpacing: '-0.035em',

                              color: theme.grayScale[12],

                              wordBreak: 'break-word'
                            }}
                          >
                            {repository.name}
                          </Typography>

                          <Chip
                            size="small"
                            label="Public"
                            sx={{
                              height: 22,

                              px: 0.25,

                              fontSize: 9,
                              fontWeight: 800,

                              borderRadius: 1.5,

                              color: theme.colorScale[10],

                              backgroundColor: alpha(theme.colorScale[9], 0.08),

                              border: `1px solid ${alpha(
                                theme.colorScale[9],
                                0.18
                              )}`
                            }}
                          />
                        </Stack>

                        {/* Full repository path */}

                        <Typography
                          component="code"
                          sx={{
                            fontSize: {
                              xs: 10,
                              sm: 11
                            },

                            color: theme.grayScale[9],

                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {repository.full_name}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Repository stats */}

                    <Box
                      sx={{
                        flexShrink: 0,

                        width: {
                          xs: '100%',
                          sm: 'auto'
                        }
                      }}
                    >
                      <RepositoryStats repository={repository} />
                    </Box>
                  </Stack>

                  {/* Description */}

                  {repository.description && (
                    <Typography
                      sx={{
                        mt: 2.25,

                        maxWidth: 850,

                        fontSize: {
                          xs: 12,
                          sm: 13
                        },

                        lineHeight: 1.65,

                        color: theme.grayScale[10]
                      }}
                    >
                      {repository.description}
                    </Typography>
                  )}
                </Box>

                {/* Metadata */}
                <Box
                  sx={{
                    position: 'relative',

                    px: {
                      xs: 2,
                      sm: 2.5,
                      md: 3
                    },

                    py: {
                      xs: 1.25,
                      sm: 1.5
                    },

                    borderTop: `1px solid ${alpha(
                      theme.secondaryScale[7],
                      0.5
                    )}`,

                    background: `
      linear-gradient(
        90deg,
        ${alpha(theme.secondaryScale[5], 0.5)} 0%,
        ${alpha(theme.secondaryScale[5], 0.5)} 50%,
        ${alpha(theme.secondaryScale[5], 0.5)} 100%
      )
    `
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={{
                      xs: 1,
                      sm: 1.25
                    }}
                    sx={{
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      rowGap: 1
                    }}
                  >
                    {/* Language */}

                    {repository.language && (
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,

                          px: 1,
                          py: 0.55,

                          borderRadius: 1.5,

                          backgroundColor: alpha(theme.colorScale[9], 0.055),

                          border: `1px solid ${alpha(
                            theme.colorScale[9],
                            0.11
                          )}`
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',

                            width: 7,
                            height: 7,

                            flexShrink: 0,

                            borderRadius: '50%',

                            backgroundColor: theme.colorScale[9],

                            boxShadow: `0 0 0 3px ${alpha(
                              theme.colorScale[9],
                              0.08
                            )}`
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: 10,
                            lineHeight: 1,

                            fontWeight: 700,

                            color: theme.grayScale[10]
                          }}
                        >
                          {repository.language}
                        </Typography>
                      </Box>
                    )}

                    {/* Separator */}

                    {repository.language && (
                      <Box
                        sx={{
                          width: 1,
                          height: 4,

                          flexShrink: 0,

                          backgroundColor: alpha(theme.secondaryScale[7], 0.55)
                        }}
                      />
                    )}

                    {/* Default branch */}

                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,

                        minWidth: 0
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          width: 23,
                          height: 23,

                          flexShrink: 0,

                          borderRadius: 1.25,

                          backgroundColor: alpha(theme.grayScale[8], 0.08),

                          border: `1px solid ${alpha(theme.grayScale[8], 0.1)}`
                        }}
                      >
                        <CodeRoundedIcon
                          sx={{
                            fontSize: 13,

                            color: theme.grayScale[9]
                          }}
                        />
                      </Box>

                      <Stack
                        spacing={0.1}
                        sx={{
                          minWidth: 0
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 8,

                            lineHeight: 1,

                            fontWeight: 700,

                            letterSpacing: '0.08em',

                            textTransform: 'uppercase',

                            color: theme.grayScale[7]
                          }}
                        >
                          Default branch
                        </Typography>

                        <Typography
                          component="code"
                          sx={{
                            overflow: 'hidden',

                            fontSize: 10,
                            lineHeight: 1.2,

                            fontWeight: 700,

                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',

                            color: theme.grayScale[11]
                          }}
                        >
                          {repository.default_branch}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Spacer */}

                    <Box
                      sx={{
                        flex: 1,

                        display: {
                          xs: 'none',
                          sm: 'block'
                        }
                      }}
                    />

                    {/* Repository status */}

                    <Box
                      sx={{
                        display: {
                          xs: 'none',
                          sm: 'inline-flex'
                        },

                        alignItems: 'center',
                        gap: 0.8,

                        px: 1.1,
                        py: 0.55,

                        borderRadius: 10,

                        backgroundColor: alpha(theme.colorScale[9], 0.055),

                        border: `1px solid ${alpha(theme.colorScale[9], 0.1)}`
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',

                          width: 6,
                          height: 6,

                          borderRadius: '50%',

                          backgroundColor: theme.colorScale[9],

                          '&::after': {
                            content: '""',

                            position: 'absolute',

                            inset: -3,

                            borderRadius: '50%',

                            border: `1px solid ${alpha(
                              theme.colorScale[9],
                              0.18
                            )}`
                          }
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 9,

                          lineHeight: 1,

                          fontWeight: 700,

                          letterSpacing: '0.04em',

                          color: theme.grayScale[9]
                        }}
                      >
                        Active repository
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          )}

          {/* Activity */}

          <Paper
            variant="outlined"
            sx={{
              overflow: 'hidden',

              borderRadius: {
                xs: 2.5,
                md: 3
              },

              borderColor: alpha(theme.secondaryScale[6], 0.8),

              backgroundColor: theme.secondaryScale[4]
            }}
          >
            <Box
              sx={{
                px: {
                  xs: 1.75,
                  sm: 2.5,
                  md: 3
                },

                py: {
                  xs: 1.75,
                  md: 2
                },

                borderBottom: `1px solid ${alpha(
                  theme.secondaryScale[7],
                  0.45
                )}`,

                backgroundColor: theme.secondaryScale[5]
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Stack spacing={0.25}>
                  <Typography
                    variant="label"
                    sx={{
                      fontWeight: 800,
                      color: theme.grayScale[11]
                    }}
                  >
                    Repository Activity
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.grayScale[9]
                    }}
                  >
                    Latest events reported by GitHub
                  </Typography>
                </Stack>

                <Chip
                  size="small"
                  label={loading ? 'Loading' : `${events.length} events`}
                  sx={{
                    fontWeight: 750,

                    backgroundColor: alpha(theme.colorScale[9], 0.08),

                    border: `1px solid ${alpha(theme.colorScale[9], 0.16)}`
                  }}
                />
              </Stack>
            </Box>

            <Box
              sx={{
                p: {
                  xs: 1.5,
                  sm: 2,
                  md: 2.5
                }
              }}
            >
              {loading && (
                <Stack
                  spacing={1.5}
                  sx={{
                    minHeight: 300,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress size={28} />

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: theme.grayScale[9]
                    }}
                  >
                    Loading GitHub activity…
                  </Typography>
                </Stack>
              )}

              {!loading && error && (
                <Stack
                  spacing={1.5}
                  sx={{
                    minHeight: 260,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <GitHubIcon
                    sx={{
                      fontSize: 40,
                      color: theme.grayScale[8]
                    }}
                  />

                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: theme.grayScale[12]
                      }}
                    >
                      Unable to load GitHub activity
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: theme.grayScale[9],
                        maxWidth: 500
                      }}
                    >
                      {error}
                    </Typography>
                  </Stack>

                  <Button
                    variant="outlined"
                    startIcon={<RefreshRoundedIcon />}
                    onClick={() => loadData(true)}
                    sx={{
                      borderRadius: 2
                    }}
                  >
                    Try again
                  </Button>
                </Stack>
              )}

              {!loading && !error && events.length === 0 && (
                <Stack
                  spacing={1}
                  sx={{
                    minHeight: 260,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <GitHubIcon
                    sx={{
                      fontSize: 42,
                      color: theme.grayScale[8]
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: theme.grayScale[12]
                    }}
                  >
                    No recent activity
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: theme.grayScale[9]
                    }}
                  >
                    GitHub did not return any recent repository events.
                  </Typography>
                </Stack>
              )}

              {!loading && !error && events.length > 0 && (
                <Stack spacing={1.5}>
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </Stack>
              )}
            </Box>
          </Paper>

          {/* Footer */}

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
