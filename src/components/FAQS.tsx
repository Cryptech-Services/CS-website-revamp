'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

type FAQsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
};

const faqs: FAQ[] = [
  {
    category: 'General',
    question: 'What services does Cryptech Services offer?',
    answer:
      'Cryptech Services focuses on full-stack web development, Web3 and decentralized application development, Solidity development, web design, graphic design, technical consultation, and game server setup and configuration.'
  },
  {
    category: 'General',
    question: 'How do I get started with a project?',
    answer:
      'Send us an email describing your idea, goals, required features, and expected timeline. We can discuss the scope, technical requirements, and next steps before work begins.'
  },
  {
    category: 'Projects',
    question: 'How much does a website or application cost?',
    answer:
      'Pricing depends on the project scope, complexity, design requirements, integrations, and ongoing support needed. Contact us with your requirements to discuss an appropriate estimate.'
  },
  {
    category: 'Projects',
    question: 'How long does development usually take?',
    answer:
      'Timelines vary by project. A small website may take considerably less time than a custom web application or decentralized application. After reviewing your requirements, we can discuss a realistic schedule.'
  },
  {
    category: 'Development',
    question: 'Can you build both frontend and backend systems?',
    answer:
      'Yes. Full-stack projects can cover the user interface, application logic, APIs, database integration, authentication, and deployment, depending on the project requirements.'
  },
  {
    category: 'Web3',
    question: 'Do you develop smart contracts and dApps?',
    answer:
      'Smart contract and decentralized application development can include Solidity contracts, blockchain integrations, wallet connectivity, and frontend interfaces. The target blockchain and requirements should be agreed upon before development.'
  },
  {
    category: 'Web3',
    question: 'Are smart contracts audited before deployment?',
    answer:
      'Smart contract testing and review can be discussed as part of the project scope. An internal review is not the same as an independent security audit, so any external audit requirements should be arranged and confirmed separately.'
  },
  {
    category: 'Design',
    question: 'Can you create a website design before development?',
    answer:
      'Yes. The design process can include layout planning, visual direction, responsive page designs, and interface components before implementation. Graphic design services can also be scoped separately.'
  },
  {
    category: 'Support',
    question: 'Can you maintain or improve an existing project?',
    answer:
      'Existing projects can be reviewed to determine the available options for bug fixes, performance improvements, feature additions, design updates, and technical consultation.'
  },
  {
    category: 'Support',
    question: 'How can I request a quote?',
    answer:
      'Email inquiries@cryptech.services with a short project description, desired features, any relevant references, and your target deadline. The more detail you provide, the easier it is to evaluate your requirements.'
  }
];

const categories = [
  'All',
  'General',
  'Projects',
  'Development',
  'Web3',
  'Design',
  'Game Servers',
  'Support'
];

export default function FAQs({
  eyebrow = 'FREQUENTLY ASKED QUESTIONS',
  title = 'Questions? We have answers.',
  description = 'Everything you need to know about our services, project process, and technical capabilities.',
  email = 'inquiries@cryptech.services'
}: FAQsProps) {
  const theme = useTheme();
  const customTheme = theme;
  const primary = customTheme.colorScale?.[9] ?? theme.palette.primary.main;
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState<string | false>('faq-0');

  const filteredFAQs =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      id="faqs"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        backgroundColor: customTheme.secondaryScale?.[3],
        scrollMarginTop: '90px'
      }}
    >
      {/* Decorative background glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: -180,
          right: '-12%',
          width: 440,
          height: 440,
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${alpha(theme.palette.primary.main, 0.12)},
            transparent 70%
          )`,
          pointerEvents: 'none'
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          zIndex: 0,
          bottom: 80,
          right: '-8%',
          width: { xs: 220, md: 380 },
          height: { xs: 220, md: 380 },
          borderRadius: '50%',
          border: `2px solid ${alpha(primary, 0.3)}`,
          boxShadow: `
      0 0 0 40px ${alpha(primary, 0.09)},
      0 0 0 80px ${alpha(primary, 0.055)}
    `,
          pointerEvents: 'none'
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          zIndex: 0,
          top: 80,
          left: '-8%',
          width: { xs: 220, md: 380 },
          height: { xs: 220, md: 380 },
          borderRadius: '50%',
          border: `2px solid ${alpha(primary, 0.3)}`,
          boxShadow: `
      0 0 0 40px ${alpha(primary, 0.09)},
      0 0 0 80px ${alpha(primary, 0.055)}
    `,
          pointerEvents: 'none'
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: -220,
          left: '-15%',
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${alpha(theme.palette.secondary.main, 0.1)},
            transparent 70%
          )`,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          {/* Left introduction */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack
              sx={{
                position: { md: 'sticky' },
                top: { md: 120 },
                alignItems: 'flex-start'
              }}
            >
              {/* Eyebrow */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  px: 1.5,
                  py: 0.75,
                  alignItems: 'center',
                  borderRadius: 10,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.08)
                }}
              >
                <HelpOutlineRoundedIcon
                  sx={{
                    fontSize: 17,
                    color: 'primary.main'
                  }}
                />

                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.13em'
                  }}
                >
                  {eyebrow}
                </Typography>
              </Stack>

              {/* Heading */}
              <Typography
                variant="h2"
                sx={{
                  mt: 3,
                  lineHeight: 1.12,
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
                  maxWidth: 460,
                  color: 'text.secondary',
                  fontSize: '1rem',
                  lineHeight: 1.9
                }}
              >
                {description}
              </Typography>

              {/* Contact card */}
              <Box
                sx={{
                  mt: 4,
                  p: 2.5,
                  width: '100%',
                  maxWidth: 430,
                  borderRadius: 3,
                  border: `1px solid ${alpha(
                    theme.palette.secondary.main,
                    0.22
                  )}`,
                  backgroundColor: alpha(
                    theme.palette.secondary.main,
                    theme.palette.mode === 'dark' ? 0.08 : 0.045
                  ),
                  boxShadow: `0 12px 36px ${alpha(
                    theme.palette.common.black,
                    theme.palette.mode === 'dark' ? 0.12 : 0.035
                  )}`,
                  transition:
                    'background-color 200ms ease, border-color 200ms ease',
                  '&:hover': {
                    borderColor: alpha(theme.palette.secondary.main, 0.38),
                    backgroundColor: alpha(
                      theme.palette.secondary.main,
                      theme.palette.mode === 'dark' ? 0.12 : 0.065
                    )
                  }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}
                >
                  Still have questions?
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    mb: 2.5,
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    lineHeight: 1.8
                  }}
                >
                  Tell us what you are planning, and we can discuss your
                  requirements.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  href={`mailto:${email}?subject=${encodeURIComponent(
                    'General inquiry - Cryptech Services'
                  )}`}
                  endIcon={<ArrowOutwardRoundedIcon />}
                  sx={{
                    py: 1.2,
                    fontWeight: 800,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: `0 6px 20px ${alpha(
                        theme.palette.primary.main,
                        0.22
                      )}`
                    }
                  }}
                >
                  Contact Our Team
                </Button>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MailOutlineRoundedIcon
                    sx={{
                      fontSize: 15,
                      color: 'text.secondary'
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {email}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Right FAQ list */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5}>
              {/* Category filters */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  pb: 1
                }}
              >
                {categories.map((category) => {
                  const selected = activeCategory === category;

                  return (
                    <Button
                      key={category}
                      size="small"
                      variant={selected ? 'contained' : 'outlined'}
                      onClick={() => {
                        setActiveCategory(category);
                        setExpanded(false);
                      }}
                      sx={{
                        px: 1.5,
                        py: 0.75,
                        minHeight: 34,
                        borderRadius: 2,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        ...(selected
                          ? {
                              boxShadow: 'none',
                              '&:hover': {
                                boxShadow: 'none'
                              }
                            }
                          : {
                              borderColor: alpha(
                                theme.palette.secondary.main,
                                0.3
                              ),
                              color: 'text.secondary',
                              backgroundColor: alpha(
                                theme.palette.secondary.main,
                                0.025
                              ),
                              '&:hover': {
                                borderColor: alpha(
                                  theme.palette.secondary.main,
                                  0.65
                                ),
                                backgroundColor: alpha(
                                  theme.palette.secondary.main,
                                  0.07
                                )
                              }
                            })
                      }}
                    >
                      {category}
                    </Button>
                  );
                })}
              </Box>
              {/* Accordion questions */}

              <Stack spacing={1.5}>
                {filteredFAQs.map((faq) => {
                  const originalIndex = faqs.indexOf(faq);
                  const panelId = `faq-${originalIndex}`;
                  const isExpanded = expanded === panelId;

                  const accent = isExpanded
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main;

                  return (
                    <Accordion
                      key={panelId}
                      expanded={isExpanded}
                      onChange={handleAccordionChange(panelId)}
                      disableGutters
                      elevation={0}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',

                        borderRadius: '16px !important',
                        border: '1px solid',
                        borderColor: alpha(accent, isExpanded ? 0.48 : 0.2),

                        background: isExpanded
                          ? `linear-gradient(
                115deg,
                ${alpha(
                  theme.palette.primary.main,
                  theme.palette.mode === 'dark' ? 0.12 : 0.055
                )},
                ${alpha(
                  theme.palette.secondary.main,
                  theme.palette.mode === 'dark' ? 0.065 : 0.025
                )}
              )`
                          : alpha(
                              theme.palette.background.paper,
                              theme.palette.mode === 'dark' ? 0.45 : 0.7
                            ),

                        backgroundImage: 'none',

                        boxShadow: isExpanded
                          ? `0 10px 32px ${alpha(
                              theme.palette.primary.main,
                              theme.palette.mode === 'dark' ? 0.1 : 0.055
                            )}`
                          : '0 2px 8px rgba(0, 0, 0, 0.015)',

                        transition:
                          'background 220ms ease, border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease',

                        '&::before': {
                          display: 'none'
                        },

                        '&.Mui-expanded': {
                          margin: 0
                        },

                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          width: '3px',

                          background: `linear-gradient(
              180deg,
              ${theme.palette.primary.main},
              ${theme.palette.secondary.main}
            )`,

                          opacity: isExpanded ? 1 : 0,
                          transform: isExpanded ? 'scaleY(1)' : 'scaleY(0.5)',
                          transformOrigin: 'center',

                          transition:
                            'opacity 220ms ease, transform 220ms ease',
                          pointerEvents: 'none'
                        },

                        '&:hover': {
                          borderColor: alpha(accent, isExpanded ? 0.55 : 0.38),

                          backgroundColor: alpha(
                            accent,
                            theme.palette.mode === 'dark' ? 0.045 : 0.025
                          ),

                          boxShadow: `0 6px 22px ${alpha(
                            accent,
                            theme.palette.mode === 'dark' ? 0.075 : 0.045
                          )}`,

                          transform: 'translateY(-1px)',

                          '&::after': {
                            opacity: 1,
                            transform: 'scaleY(1)'
                          }
                        },

                        '&:focus-within': {
                          borderColor: alpha(theme.palette.primary.main, 0.6)
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <Box
                            sx={{
                              display: 'grid',
                              placeItems: 'center',

                              width: 34,
                              height: 34,
                              flexShrink: 0,

                              borderRadius: '10px',

                              color: isExpanded
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary,

                              backgroundColor: alpha(
                                isExpanded
                                  ? theme.palette.primary.main
                                  : theme.palette.text.primary,
                                isExpanded ? 0.12 : 0.045
                              ),

                              border: `1px solid ${alpha(
                                isExpanded
                                  ? theme.palette.primary.main
                                  : theme.palette.text.primary,
                                isExpanded ? 0.2 : 0.07
                              )}`,

                              transition:
                                'color 200ms ease, background-color 200ms ease, border-color 200ms ease, transform 200ms ease',

                              '& svg': {
                                fontSize: 19,
                                transition: 'transform 200ms ease',
                                transform: isExpanded
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)'
                              }
                            }}
                          >
                            {isExpanded ? (
                              <RemoveRoundedIcon />
                            ) : (
                              <AddRoundedIcon />
                            )}
                          </Box>
                        }
                        aria-controls={`${panelId}-content`}
                        id={`${panelId}-header`}
                        sx={{
                          position: 'relative',

                          px: { xs: 2, sm: 2.5 },
                          py: 1.25,

                          minHeight: 78,

                          '&.Mui-expanded': {
                            minHeight: 78
                          },

                          '& .MuiAccordionSummary-content': {
                            my: 1,
                            mr: 1.5,

                            '&.Mui-expanded': {
                              my: 1
                            }
                          },

                          '& .MuiAccordionSummary-expandIconWrapper': {
                            transform: 'none',
                            '&.Mui-expanded': {
                              transform: 'none'
                            }
                          },

                          '&:hover .faq-number': {
                            color: theme.palette.primary.main,
                            borderColor: alpha(
                              theme.palette.primary.main,
                              0.35
                            ),
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            )
                          }
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.75}
                          sx={{
                            alignItems: 'center',
                            width: '100%',
                            minWidth: 0
                          }}
                        >
                          {/* QUESTION NUMBER */}

                          <Box
                            className="faq-number"
                            sx={{
                              display: { xs: 'none', sm: 'grid' },
                              placeItems: 'center',

                              width: 38,
                              height: 38,
                              flexShrink: 0,

                              borderRadius: '11px',

                              color: isExpanded
                                ? theme.palette.primary.main
                                : theme.palette.text.disabled,

                              backgroundColor: alpha(
                                isExpanded
                                  ? theme.palette.primary.main
                                  : theme.palette.text.primary,
                                isExpanded ? 0.1 : 0.035
                              ),

                              border: `1px solid ${alpha(
                                isExpanded
                                  ? theme.palette.primary.main
                                  : theme.palette.text.primary,
                                isExpanded ? 0.22 : 0.07
                              )}`,

                              fontSize: '0.76rem',
                              fontWeight: 850,
                              fontVariantNumeric: 'tabular-nums',

                              transition:
                                'color 200ms ease, border-color 200ms ease, background-color 200ms ease'
                            }}
                          >
                            {String(originalIndex + 1).padStart(2, '0')}
                          </Box>

                          {/* QUESTION AND CATEGORY */}

                          <Stack
                            spacing={0.65}
                            sx={{
                              flex: 1,
                              minWidth: 0
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: '0.9rem',
                                  sm: '0.96rem'
                                },

                                fontWeight: 750,
                                lineHeight: 1.6,

                                color: isExpanded
                                  ? 'primary.main'
                                  : 'text.primary',

                                transition: 'color 200ms ease'
                              }}
                            >
                              {faq.question}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={0.75}
                              sx={{
                                alignItems: 'center',
                                minWidth: 0
                              }}
                            >
                              <Box
                                sx={{
                                  width: 5,
                                  height: 5,
                                  flexShrink: 0,

                                  borderRadius: '50%',

                                  backgroundColor: accent,

                                  transition: 'background-color 200ms ease'
                                }}
                              />

                              <Typography
                                sx={{
                                  color: 'text.secondary',

                                  fontSize: '0.66rem',
                                  fontWeight: 750,
                                  letterSpacing: '0.075em',
                                  lineHeight: 1.4,

                                  textTransform: 'uppercase'
                                }}
                              >
                                {faq.category}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </AccordionSummary>

                      <AccordionDetails
                        id={`${panelId}-content`}
                        sx={{
                          px: { xs: 2, sm: 2.5 },
                          pt: 0,
                          pb: { xs: 2.25, sm: 2.75 }
                        }}
                      >
                        <Box
                          sx={{
                            ml: { xs: 0, sm: '54px' },

                            pt: 2,

                            borderTop: `1px solid ${alpha(
                              theme.palette.divider,
                              0.75
                            )}`
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'text.secondary',

                              fontSize: { xs: '0.875rem', sm: '0.9rem' },
                              lineHeight: 1.95,

                              whiteSpace: 'pre-line',

                              overflowWrap: 'anywhere'
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>

              {/* Results count */}
              <Typography
                sx={{
                  color: 'text.disabled',
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  pt: 1
                }}
              >
                {filteredFAQs.length} questions
                {activeCategory !== 'All'
                  ? ` in ${activeCategory}`
                  : ' across our services'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
