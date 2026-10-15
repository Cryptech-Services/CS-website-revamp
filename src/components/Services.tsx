'use client';

import * as React from 'react';

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

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

import {
  fetchServices,
  type Service,
  type ServiceIconKey
} from '@/lib/fectServicesSupabase';

type ServicesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  email?: string;
  services?: Service[];
};

type CustomTheme = ReturnType<typeof useTheme> & {
  colorScale?: string[];
  secondaryScale?: string[];
  backgroundScale?: string[];
  grayScale?: string[];
};

const serviceIcons: Record<
  ServiceIconKey,
  React.ComponentType<{ sx?: object }>
> = {
  code: CodeRoundedIcon,
  token: TokenRoundedIcon,
  'account-tree': AccountTreeRoundedIcon,
  web: WebRoundedIcon,
  palette: PaletteRoundedIcon,
  support: SupportAgentRoundedIcon
};

type ServiceBannerProps = {
  serviceNumber: string;
  accent: string;
  isDark: boolean;
};

/**
 * Decorative SVG banner with artwork selected by service number.
 */
function ServiceBanner({ serviceNumber, accent, isDark }: ServiceBannerProps) {
  const panel = isDark ? '#071326' : '#F4F8FF';
  const secondary = isDark ? '#172A49' : '#E2EAF8';

  return (
    <Box
      aria-hidden="true"
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'relative',
        height: { xs: 112, md: 126 },
        mx: { xs: -2.6, md: -3.1 },
        mt: { xs: -2.6, md: -3.1 },
        mb: 3,
        overflow: 'hidden',
        borderBottom: `1px solid ${alpha(accent, 0.22)}`,
        background: `linear-gradient(120deg, ${alpha(
          accent,
          isDark ? 0.16 : 0.11
        )}, ${alpha(panel, 0.2)} 60%, ${alpha(
          secondary,
          isDark ? 0.16 : 0.5
        )})`,
        '& svg': {
          display: 'block',
          width: '100%',
          height: '100%'
        },
        '& .service-banner-drift': {
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: 'serviceBannerFloat 7s ease-in-out infinite alternate'
        },
        '@keyframes serviceBannerFloat': {
          from: { transform: 'translateY(-2px)' },
          to: { transform: 'translateY(3px)' }
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& .service-banner-drift': { animation: 'none' }
        }
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 420 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id={`service-banner-gradient-${serviceNumber}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.015" />
          </linearGradient>

          <pattern
            id={`service-banner-grid-${serviceNumber}`}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill={accent} fillOpacity="0.28" />
          </pattern>
        </defs>

        <rect
          width="420"
          height="150"
          fill={`url(#service-banner-gradient-${serviceNumber})`}
        />

        <rect
          width="420"
          height="150"
          fill={`url(#service-banner-grid-${serviceNumber})`}
        />

        <path
          d="M0 118H76L95 99H150M420 30H350L330 50H285M28 0V30L48 50H88M370 150V119L350 99H320"
          fill="none"
          stroke={accent}
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />

        <path
          d="M0 132H115L134 113H182M420 16H318L299 35H270"
          fill="none"
          stroke={accent}
          strokeOpacity="0.25"
          strokeDasharray="3 6"
        />

        <g
          className="service-banner-drift"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {serviceNumber === '01' && (
            <>
              <rect
                x="142"
                y="25"
                width="138"
                height="94"
                rx="9"
                fill={panel}
                fillOpacity="0.88"
                strokeOpacity="0.75"
              />
              <path d="M142 43H280" strokeOpacity="0.5" />
              <circle cx="154" cy="34" r="2" fill={accent} stroke="none" />
              <circle
                cx="163"
                cy="34"
                r="2"
                fill={accent}
                fillOpacity="0.65"
                stroke="none"
              />
              <circle
                cx="172"
                cy="34"
                r="2"
                fill={accent}
                fillOpacity="0.4"
                stroke="none"
              />
              <path
                d="M176 60L162 72L176 84M246 60L260 72L246 84M220 55L202 89"
                fill="none"
                strokeWidth="3"
              />
              <path
                d="M157 101H202M157 108H185M221 101H262M221 108H249"
                strokeOpacity="0.45"
              />
            </>
          )}

          {serviceNumber === '02' && (
            <>
              <circle
                cx="210"
                cy="73"
                r="43"
                fill={panel}
                fillOpacity="0.6"
                strokeOpacity="0.3"
                strokeDasharray="4 6"
              />
              <path
                d="M210 38L241 56V91L210 109L179 91V56Z"
                fill={accent}
                fillOpacity="0.12"
              />
              <path
                d="M210 38L241 56L210 74L179 56Z"
                fill={accent}
                fillOpacity="0.35"
              />
              <path
                d="M179 56L210 74V109L179 91Z"
                fill={accent}
                fillOpacity="0.16"
              />
              <path
                d="M241 56L210 74V109L241 91Z"
                fill={accent}
                fillOpacity="0.25"
              />
              <path d="M210 74V109M179 56L210 74L241 56" fill="none" />
              <circle cx="147" cy="44" r="4" fill={accent} />
              <circle cx="275" cy="102" r="4" fill={accent} />
              <path
                d="M151 45L177 57M244 89L271 101"
                fill="none"
                strokeOpacity="0.55"
              />
            </>
          )}

          {serviceNumber === '03' && (
            <>
              <rect
                x="145"
                y="25"
                width="130"
                height="98"
                rx="9"
                fill={panel}
                fillOpacity="0.85"
                strokeOpacity="0.6"
              />
              <path d="M145 45H275" strokeOpacity="0.45" />
              <path
                d="M166 62H189L198 72L189 82H166M208 62H250M208 73H240M208 84H246M166 99H223"
                fill="none"
                strokeWidth="2.5"
              />
              <path d="M160 34H180M160 39H171" strokeOpacity="0.5" />
              <circle cx="258" cy="99" r="8" fill={accent} fillOpacity="0.18" />
              <path d="M254 99L257 102L263 95" fill="none" strokeWidth="2" />
            </>
          )}

          {serviceNumber === '04' && (
            <>
              <rect
                x="138"
                y="23"
                width="144"
                height="100"
                rx="10"
                fill={panel}
                fillOpacity="0.88"
                strokeOpacity="0.7"
              />
              <path d="M138 44H282" strokeOpacity="0.5" />
              <rect
                x="151"
                y="55"
                width="118"
                height="55"
                rx="4"
                fill={accent}
                fillOpacity="0.1"
              />
              <rect
                x="159"
                y="62"
                width="43"
                height="40"
                rx="3"
                fill={accent}
                fillOpacity="0.35"
                strokeOpacity="0.45"
              />
              <path
                d="M210 64H258M210 73H250M210 82H258M210 96H244"
                strokeOpacity="0.7"
              />
              <circle cx="151" cy="34" r="2" fill={accent} stroke="none" />
              <circle
                cx="160"
                cy="34"
                r="2"
                fill={accent}
                fillOpacity="0.6"
                stroke="none"
              />
            </>
          )}

          {serviceNumber === '05' && (
            <>
              <rect
                x="146"
                y="24"
                width="128"
                height="100"
                rx="10"
                fill={panel}
                fillOpacity="0.78"
                strokeOpacity="0.55"
              />
              <circle
                cx="210"
                cy="72"
                r="31"
                fill={accent}
                fillOpacity="0.12"
              />
              <path
                d="M210 48C195 48 184 59 184 73C184 87 194 96 207 96H212C217 96 220 92 218 88C216 84 220 81 225 81C235 81 239 74 236 65C232 55 222 48 210 48Z"
                fill={accent}
                fillOpacity="0.35"
              />
              <circle cx="198" cy="64" r="3" fill={panel} stroke="none" />
              <circle cx="210" cy="59" r="3" fill={panel} stroke="none" />
              <circle cx="222" cy="65" r="3" fill={panel} stroke="none" />
              <circle cx="198" cy="76" r="3" fill={panel} stroke="none" />
              <path d="M164 106H190M230 106H256" strokeOpacity="0.5" />
            </>
          )}

          {serviceNumber === '06' && (
            <>
              <circle
                cx="210"
                cy="73"
                r="43"
                fill={panel}
                fillOpacity="0.62"
                strokeOpacity="0.45"
              />
              <path
                d="M179 75V68C179 51 192 40 210 40S241 51 241 68V75"
                fill="none"
                strokeWidth="4"
              />
              <rect
                x="173"
                y="68"
                width="15"
                height="26"
                rx="6"
                fill={accent}
                fillOpacity="0.35"
              />
              <rect
                x="232"
                y="68"
                width="15"
                height="26"
                rx="6"
                fill={accent}
                fillOpacity="0.35"
              />
              <path
                d="M240 91C234 103 223 107 211 107H202"
                fill="none"
                strokeWidth="2.5"
              />
              <rect
                x="194"
                y="101"
                width="20"
                height="9"
                rx="4"
                fill={accent}
                fillOpacity="0.5"
              />
              <circle
                cx="210"
                cy="73"
                r="15"
                fill={accent}
                fillOpacity="0.1"
                strokeOpacity="0.35"
              />
            </>
          )}

          {!['01', '02', '03', '04', '05', '06'].includes(serviceNumber) && (
            <>
              <rect
                x="145"
                y="25"
                width="130"
                height="98"
                rx="12"
                fill={panel}
                fillOpacity="0.85"
              />
              <path d="M170 75H250M210 45V105" />
              <circle cx="210" cy="75" r="28" fill={accent} fillOpacity="0.2" />
            </>
          )}
        </g>

        <g fill={accent}>
          <circle cx="105" cy="42" r="2.5" />
          <circle cx="310" cy="105" r="2.5" />
          <circle cx="330" cy="25" r="1.8" />
        </g>

        <g
          fill="none"
          stroke={isDark ? '#D7E5FF' : '#334155'}
          strokeOpacity="0.35"
        >
          <path d="M22 62H75M22 70H59M345 75H396M360 83H396" />
        </g>
      </Box>
    </Box>
  );
}

/**
 * Animated technical SVG background for the services section.
 */
function ServicesBackground({
  primary,
  isDark
}: {
  primary: string;
  isDark: boolean;
}) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        display: { xs: 'none', md: 'block' },
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: isDark ? 0.25 : 0.16,
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        '& .services-grid-motion': {
          animation: 'servicesGridDrift 45s linear infinite'
        },
        '& .services-hex-motion': {
          animation: 'servicesHexDrift 55s linear infinite alternate'
        },
        '& .services-glow-motion': {
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: 'servicesGlowPulse 9s ease-in-out infinite alternate'
        },
        '& .services-circuit-motion': {
          strokeDasharray: '3 12',
          animation: 'servicesDataFlow 12s linear infinite'
        },
        '& .services-circuit-reverse': {
          strokeDasharray: '2 16',
          animation: 'servicesDataFlowReverse 18s linear infinite'
        },
        '& .services-node-motion': {
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: 'servicesNodePulse 4s ease-in-out infinite'
        },
        '@keyframes servicesGridDrift': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(32px, 32px, 0)' }
        },
        '@keyframes servicesHexDrift': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-27px, 23px, 0)' }
        },
        '@keyframes servicesGlowPulse': {
          from: { opacity: 0.5, transform: 'scale(0.92)' },
          to: { opacity: 1, transform: 'scale(1.1)' }
        },
        '@keyframes servicesDataFlow': {
          from: { strokeDashoffset: 0 },
          to: { strokeDashoffset: -180 }
        },
        '@keyframes servicesDataFlowReverse': {
          from: { strokeDashoffset: 0 },
          to: { strokeDashoffset: 180 }
        },
        '@keyframes servicesNodePulse': {
          '0%, 100%': { opacity: 0.55, transform: 'scale(0.85)' },
          '50%': { opacity: 1, transform: 'scale(1.25)' }
        },
        '@media (prefers-reduced-motion: reduce)': {
          '& *, & *::before, & *::after': {
            animation: 'none !important',
            transition: 'none !important'
          }
        }
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        sx={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          <linearGradient
            id="services-circuit-gradient"
            x1="0"
            y1="0"
            x2="1200"
            y2="800"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={primary} stopOpacity="0.05" />
            <stop offset="50%" stopColor={primary} stopOpacity="0.75" />
            <stop offset="100%" stopColor={primary} stopOpacity="0.12" />
          </linearGradient>

          <pattern
            id="services-micro-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill={primary} fillOpacity="0.28" />
          </pattern>

          <pattern
            id="services-hex-grid"
            width="54"
            height="46.8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M13.5 0H40.5L54 23.4L40.5 46.8H13.5L0 23.4Z"
              stroke={primary}
              strokeOpacity="0.1"
              strokeWidth="0.8"
              fill="none"
            />
          </pattern>

          <radialGradient id="services-ambient-glow">
            <stop stopColor={primary} stopOpacity="0.2" />
            <stop offset="1" stopColor={primary} stopOpacity="0" />
          </radialGradient>

          <filter
            id="services-node-glow"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="services-grid-motion">
          <rect
            x="-32"
            y="-32"
            width="1264"
            height="864"
            fill="url(#services-micro-grid)"
          />
        </g>

        <g className="services-hex-motion">
          <rect
            width="1200"
            height="800"
            fill="url(#services-hex-grid)"
            opacity="0.45"
          />
        </g>

        <ellipse
          className="services-glow-motion"
          cx="1080"
          cy="160"
          rx="310"
          ry="250"
          fill="url(#services-ambient-glow)"
        />

        <ellipse
          className="services-glow-motion"
          cx="100"
          cy="680"
          rx="300"
          ry="230"
          fill="url(#services-ambient-glow)"
          style={{ animationDelay: '-4s' }}
        />

        <g
          stroke="url(#services-circuit-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M0 110H90L126 146H224L260 182H330" />
          <path d="M0 146H60L100 186V260H178L214 296H300" />
          <path d="M0 330H110L150 290H226V244H292L330 206H380" />
          <path d="M0 390H76L116 430H190L226 466H320" />
          <path d="M0 510H120L158 472H244L280 436H350" />
          <path d="M0 630H74L116 588V542H190L224 508H270" />
          <path d="M0 710H142L182 670H250L286 634H362" />
          <path d="M110 0V58L150 98V164" />
          <path d="M246 0V62L282 98V142L324 184" />
          <path d="M72 800V748L112 708V660" />
          <path d="M302 800V750L338 714V676" />

          <path d="M1200 90H1110L1070 130H990L954 166H882" />
          <path d="M1200 170H1140L1098 212V270H1020L982 308H906" />
          <path d="M1200 330H1090L1050 290H974V246H906L870 210H820" />
          <path d="M1200 414H1124L1084 454H1000L962 492H882" />
          <path d="M1200 536H1090L1050 496H964L926 458H850" />
          <path d="M1200 654H1128L1088 614V566H1012L974 528H918" />
          <path d="M1200 730H1058L1018 690H950L914 654H838" />
          <path d="M1090 0V48L1050 88V146" />
          <path d="M954 0V60L918 96V140L876 182" />
          <path d="M1128 800V754L1088 714V668" />
          <path d="M898 800V752L862 716V674" />

          <path d="M340 0V54L376 90H460L496 126H550" />
          <path d="M650 0V44L614 80H564L530 114" />
          <path d="M470 800V742L510 702H586L620 668H680" />
          <path d="M760 800V740L722 702H672L636 666" />
        </g>

        <g
          className="services-circuit-motion"
          stroke={primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        >
          <path d="M0 110H90L126 146H224L260 182H330" />
          <path d="M0 330H110L150 290H226V244H292L330 206H380" />
          <path d="M0 510H120L158 472H244L280 436H350" />
          <path d="M0 710H142L182 670H250L286 634H362" />
          <path d="M1200 90H1110L1070 130H990L954 166H882" />
          <path d="M1200 330H1090L1050 290H974V246H906L870 210H820" />
          <path d="M1200 536H1090L1050 496H964L926 458H850" />
          <path d="M1200 730H1058L1018 690H950L914 654H838" />
        </g>

        <g
          className="services-circuit-reverse"
          stroke={primary}
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        >
          <path d="M0 146H60L100 186V260H178L214 296H300" />
          <path d="M0 630H74L116 588V542H190L224 508H270" />
          <path d="M1200 170H1140L1098 212V270H1020L982 308H906" />
          <path d="M1200 654H1128L1088 614V566H1012L974 528H918" />
          <path d="M110 0V58L150 98V164" />
          <path d="M1090 0V48L1050 88V146" />
          <path d="M72 800V748L112 708V660" />
          <path d="M1128 800V754L1088 714V668" />
        </g>

        <g
          className="services-node-motion"
          fill={primary}
          filter="url(#services-node-glow)"
        >
          <circle cx="126" cy="146" r="3" />
          <circle cx="224" cy="146" r="2.5" />
          <circle cx="178" cy="260" r="3" />
          <circle cx="226" cy="244" r="2.5" />
          <circle cx="150" cy="430" r="3" />
          <circle cx="244" cy="472" r="2.5" />
          <circle cx="158" cy="472" r="3" />
          <circle cx="190" cy="542" r="2.5" />
          <circle cx="182" cy="670" r="3" />
          <circle cx="150" cy="98" r="2.5" />
          <circle cx="282" cy="98" r="3" />
        </g>

        <g
          className="services-node-motion"
          fill={primary}
          filter="url(#services-node-glow)"
          style={{ animationDelay: '-2s' }}
        >
          <circle cx="1070" cy="130" r="3" />
          <circle cx="990" cy="130" r="2.5" />
          <circle cx="1020" cy="270" r="3" />
          <circle cx="974" cy="246" r="2.5" />
          <circle cx="1084" cy="454" r="3" />
          <circle cx="1000" cy="454" r="2.5" />
          <circle cx="1050" cy="496" r="3" />
          <circle cx="964" cy="566" r="2.5" />
          <circle cx="1018" cy="690" r="3" />
          <circle cx="1050" cy="88" r="2.5" />
          <circle cx="918" cy="96" r="3" />
        </g>

        <g
          className="services-circuit-motion"
          stroke={primary}
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        >
          <path d="M340 0V54L376 90H460L496 126H550" />
          <path d="M650 0V44L614 80H564L530 114" />
          <path d="M470 800V742L510 702H586L620 668H680" />
          <path d="M760 800V740L722 702H672L636 666" />
        </g>

        <g
          className="services-circuit-reverse"
          stroke={primary}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M330 350H430L454 326H540" />
          <path d="M870 360H770L746 384H660" />
          <path d="M400 560H490L518 532H590" />
          <path d="M800 540H710L682 568H620" />
        </g>

        <g stroke={primary} strokeWidth="1" strokeOpacity="0.65">
          <circle cx="330" cy="206" r="7" fill="none" />
          <circle cx="330" cy="206" r="3" fill={primary} fillOpacity="0.5" />
          <circle cx="350" cy="436" r="7" fill="none" />
          <circle cx="350" cy="436" r="3" fill={primary} fillOpacity="0.5" />
          <circle cx="870" cy="210" r="7" fill="none" />
          <circle cx="870" cy="210" r="3" fill={primary} fillOpacity="0.5" />
          <circle cx="850" cy="458" r="7" fill="none" />
          <circle cx="850" cy="458" r="3" fill={primary} fillOpacity="0.5" />
        </g>

        <g fill="none" stroke={primary} strokeOpacity="0.22" strokeWidth="1">
          <circle cx="600" cy="400" r="145" strokeDasharray="2 12" />
          <circle cx="600" cy="400" r="195" strokeDasharray="4 18" />
          <circle cx="600" cy="400" r="250" strokeDasharray="1 20" />
        </g>

        <g fill="none" stroke={primary} strokeOpacity="0.16" strokeWidth="1">
          <circle cx="600" cy="400" r="170" strokeDasharray="20 16 3 16" />
          <circle cx="770" cy="400" r="3" fill={primary} stroke="none" />
          <circle cx="430" cy="400" r="2" fill={primary} stroke="none" />
        </g>

        <g className="services-node-motion">
          <path
            d="M360 400H840"
            stroke={primary}
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <circle
            cx="600"
            cy="400"
            r="3"
            fill={primary}
            filter="url(#services-node-glow)"
          />
        </g>

        <g fill={primary} fillOpacity="0.8">
          <rect x="72" y="326" width="3" height="3" rx="0.5" />
          <rect x="1120" y="328" width="3" height="3" rx="0.5" />
          <rect x="455" y="324" width="3" height="3" rx="0.5" />
          <rect x="744" y="382" width="3" height="3" rx="0.5" />
          <rect x="516" y="530" width="3" height="3" rx="0.5" />
          <rect x="680" y="566" width="3" height="3" rx="0.5" />
        </g>
      </Box>
    </Box>
  );
}

export default function Services({
  eyebrow = 'OUR SERVICES',
  title = 'The right technology for your next big idea.',
  description = 'From building complete web applications to designing digital experiences and developing blockchain solutions, we help turn complex ideas into practical results.',
  email = 'inquiries@cryptech.services',
  services: providedServices
}: ServicesProps) {
  const theme = useTheme();
  const customTheme = theme;
  const isDark = theme.palette.mode === 'dark';

  const primary = customTheme.colorScale?.[9] ?? theme.palette.primary.main;
  const secondary =
    customTheme.secondaryScale?.[9] ?? theme.palette.secondary.main;
  const headingColor =
    customTheme.grayScale?.[12] ?? theme.palette.text.primary;
  const mutedColor =
    customTheme.grayScale?.[10] ?? theme.palette.text.secondary;
  const surface =
    customTheme.backgroundScale?.[2] ?? theme.palette.background.default;
  const cardSurface =
    customTheme.secondaryScale?.[4] ?? theme.palette.background.paper;
  const borderColor = alpha(headingColor, isDark ? 0.13 : 0.1);

  const [supabaseServices, setSupabaseServices] = React.useState<Service[]>(
    providedServices ?? []
  );
  const [loading, setLoading] = React.useState(providedServices === undefined);
  const [loadError, setLoadError] = React.useState(false);
  const [retryKey, setRetryKey] = React.useState(0);

  React.useEffect(() => {
    if (providedServices !== undefined) {
      setSupabaseServices(providedServices);
      setLoading(false);
      setLoadError(false);
      return;
    }

    let cancelled = false;

    async function loadServices() {
      setLoading(true);
      setLoadError(false);

      try {
        const data = await fetchServices();

        if (!cancelled) {
          setSupabaseServices(data);
        }
      } catch (error) {
        console.error('Unable to load services:', error);

        if (!cancelled) {
          setSupabaseServices([]);
          setLoadError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadServices();

    return () => {
      cancelled = true;
    };
  }, [providedServices, retryKey]);

  const services = providedServices ?? supabaseServices;

  const accentColors = [
    primary,
    secondary,
    '#18C7BE',
    '#E879F9',
    '#F6B942',
    '#38BDF8'
  ];

  return (
    <Box
      component="section"
      id="services"
      aria-labelledby="services-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        bgcolor: surface,
        color: headingColor
      }}
    >
      <ServicesBackground primary={primary} isDark={isDark} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section heading */}
        <Stack
          spacing={2.5}
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 760,
            mx: 'auto',
            mb: { xs: 5, md: 8 }
          }}
        >
          <Chip
            icon={<SupportAgentRoundedIcon />}
            label={eyebrow}
            variant="outlined"
            sx={{
              borderColor: alpha(primary, 0.4),
              color: primary,
              bgcolor: alpha(primary, 0.06),
              fontWeight: 700,
              letterSpacing: 1.5,
              '& .MuiChip-icon': {
                color: primary
              }
            }}
          />

          <Typography
            id="services-heading"
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.055em',
              lineHeight: 1.12
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: mutedColor,
              lineHeight: 1.9,
              maxWidth: 650
            }}
          >
            {description}
          </Typography>
        </Stack>

        {/* Loading state */}
        {loading && (
          <Box
            role="status"
            sx={{
              py: 9,
              textAlign: 'center',
              color: mutedColor
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                mx: 'auto',
                mb: 2,
                border: `3px solid ${alpha(primary, 0.18)}`,
                borderTopColor: primary,
                borderRadius: '50%',
                animation: 'servicesLoaderSpin 0.8s linear infinite',
                '@keyframes servicesLoaderSpin': {
                  to: { transform: 'rotate(360deg)' }
                },
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none'
                }
              }}
            />

            <Typography sx={{ fontWeight: 650 }}>
              Loading services...
            </Typography>
          </Box>
        )}

        {/* Error state */}
        {!loading && loadError && (
          <Box
            role="alert"
            sx={{
              py: 8,
              px: 3,
              textAlign: 'center',
              border: `1px dashed ${borderColor}`,
              borderRadius: '24px',
              bgcolor: alpha(cardSurface, isDark ? 0.45 : 0.6)
            }}
          >
            <Typography
              component="h3"
              sx={{
                mb: 1,
                color: headingColor,
                fontWeight: 750
              }}
            >
              Unable to load services
            </Typography>

            <Typography
              sx={{
                mb: 2.5,
                color: mutedColor,
                fontSize: '0.875rem'
              }}
            >
              We couldn&apos;t retrieve the services right now. Please try
              again.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setRetryKey((current) => current + 1)}
              sx={{
                textTransform: 'none',
                fontWeight: 700
              }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* Services grid */}
        {!loading && !loadError && services.length > 0 && (
          <Grid
            container
            spacing={{ xs: 2, md: 2.5 }}
            sx={{ alignItems: 'stretch' }}
          >
            {services.map((service, index) => {
              const Icon = serviceIcons[service.iconKey] ?? CodeRoundedIcon;
              const accent = accentColors[index % accentColors.length];

              return (
                <Grid key={service.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Box
                    component="article"
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      minHeight: { xs: 310, md: 335 },
                      p: { xs: 2.6, md: 3.1 },
                      overflow: 'hidden',
                      isolation: 'isolate',
                      borderRadius: { xs: '20px', md: '24px' },
                      border: `1px solid ${alpha(
                        accent,
                        isDark ? 0.38 : 0.27
                      )}`,
                      background: `linear-gradient(145deg, ${alpha(
                        accent,
                        isDark ? 0.105 : 0.065
                      )} 0%, ${alpha(cardSurface, 0.97)} 42%, ${alpha(
                        cardSurface,
                        0.99
                      )} 100%)`,
                      boxShadow: `0 12px 36px ${alpha(
                        '#000000',
                        isDark ? 0.12 : 0.035
                      )}`,
                      transition:
                        'transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        zIndex: -1,
                        opacity: isDark ? 0.36 : 0.22,
                        backgroundImage: `linear-gradient(${alpha(
                          accent,
                          0.1
                        )} 1px, transparent 1px), linear-gradient(90deg, ${alpha(
                          accent,
                          0.1
                        )} 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                        maskImage:
                          'linear-gradient(135deg, black 0%, transparent 68%)',
                        pointerEvents: 'none'
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '9%',
                        width: '42%',
                        height: '2px',
                        borderRadius: '50%',
                        background: `linear-gradient(90deg, ${accent}, transparent)`,
                        boxShadow: `0 0 18px ${alpha(accent, 0.6)}`,
                        opacity: 0.85,
                        pointerEvents: 'none'
                      },
                      '&:hover': {
                        transform: 'translateY(-7px)',
                        borderColor: alpha(accent, 0.72),
                        boxShadow: `0 22px 50px ${alpha(
                          accent,
                          isDark ? 0.12 : 0.09
                        )}, 0 8px 24px ${alpha('#000000', 0.08)}`
                      },
                      '&:hover .service-icon': {
                        transform: 'translateY(-3px) rotate(-4deg)',
                        color: '#FFFFFF',
                        background: `linear-gradient(135deg, ${accent}, ${alpha(
                          accent,
                          0.58
                        )})`,
                        borderColor: alpha(accent, 0.8),
                        boxShadow: `0 10px 26px ${alpha(accent, 0.3)}`
                      },
                      '&:hover .service-arrow': {
                        color: '#FFFFFF',
                        bgcolor: accent,
                        borderColor: accent,
                        transform: 'translate(2px, -2px)'
                      },
                      '&:hover .service-watermark': {
                        opacity: 0.11,
                        transform: 'translate(-3px, 3px) scale(1.04)'
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                        '&:hover': { transform: 'none' },
                        '& .service-icon, & .service-arrow, & .service-watermark':
                          {
                            transition: 'none'
                          }
                      }
                    }}
                  >
                    <ServiceBanner
                      serviceNumber={String(service.number).padStart(2, '0')}
                      accent={accent}
                      isDark={isDark}
                    />

                    {/* Decorative service number */}
                    <Typography
                      aria-hidden="true"
                      className="service-watermark"
                      sx={{
                        position: 'absolute',
                        top: -24,
                        right: -5,
                        zIndex: -1,
                        color: accent,
                        opacity: isDark ? 0.1 : 0.1,
                        fontSize: { xs: '8.5rem', md: '10rem' },
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: '-0.09em',
                        transition: 'opacity 260ms ease, transform 260ms ease',
                        pointerEvents: 'none',
                        userSelect: 'none'
                      }}
                    >
                      {service.number}
                    </Typography>

                    {/* Card header */}
                    <Stack
                      direction="row"
                      sx={{
                        mb: { xs: 3, md: 3.5 },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1
                      }}
                    >
                      <Box
                        className="service-icon"
                        sx={{
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                          width: 58,
                          height: 58,
                          borderRadius: '18px',
                          color: accent,
                          bgcolor: alpha(accent, isDark ? 0.13 : 0.09),
                          border: `1px solid ${alpha(accent, 0.3)}`,
                          transition:
                            'transform 260ms ease, background 260ms ease, color 260ms ease, border-color 260ms ease, box-shadow 260ms ease',
                          '& svg': { fontSize: 28 }
                        }}
                      >
                        <Icon />
                      </Box>

                      <Stack
                        direction="row"
                        spacing={0.9}
                        sx={{
                          color: accent,
                          alignItems: 'center',
                          fontFamily: 'monospace',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          textAlign: 'right'
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 6,
                            height: 6,
                            flexShrink: 0,
                            borderRadius: '50%',
                            bgcolor: accent,
                            boxShadow: `0 0 12px ${alpha(accent, 0.8)}`
                          }}
                        />
                        SERVICE {service.number}
                      </Stack>
                    </Stack>

                    <Typography
                      component="h3"
                      sx={{
                        color: headingColor,
                        fontWeight: 800,
                        fontSize: { xs: '1.2rem', md: '1.3rem' },
                        letterSpacing: '-0.04em',
                        lineHeight: 1.3,
                        maxWidth: '19rem',
                        mb: 1.5
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 38,
                        height: 3,
                        borderRadius: 99,
                        bgcolor: accent,
                        boxShadow: `0 0 14px ${alpha(accent, 0.48)}`,
                        mb: 2
                      }}
                    />

                    <Typography
                      sx={{
                        color: mutedColor,
                        fontSize: '0.9rem',
                        lineHeight: 1.85,
                        mb: 3,
                        maxWidth: '38rem'
                      }}
                    >
                      {service.description}
                    </Typography>

                    <Box sx={{ flexGrow: 1, minHeight: 10 }} />

                    {/* Tags and inquiry action */}
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        pt: 2,
                        mt: 1,
                        borderTop: `1px solid ${alpha(accent, 0.2)}`,
                        alignItems: 'flex-end',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          minWidth: 0,
                          flex: 1,
                          flexWrap: 'wrap',
                          gap: 0.8
                        }}
                      >
                        {service.tags.map((tag) => (
                          <Box
                            key={tag}
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              px: 1.1,
                              py: 0.6,
                              borderRadius: 99,
                              color: accent,
                              bgcolor: alpha(accent, isDark ? 0.1 : 0.07),
                              border: `1px solid ${alpha(accent, 0.25)}`
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                lineHeight: 1.35,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {tag}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Button
                        className="service-arrow"
                        component="a"
                        href={`mailto:${email}?subject=${encodeURIComponent(
                          `Inquiry: ${service.title}`
                        )}`}
                        aria-label={`Ask about ${service.title}`}
                        title={`Ask about ${service.title}`}
                        sx={{
                          flexShrink: 0,
                          minWidth: 38,
                          width: 38,
                          height: 38,
                          p: 0,
                          borderRadius: '50%',
                          color: accent,
                          border: `1px solid ${alpha(accent, 0.6)}`,
                          bgcolor: alpha(accent, 0.06),
                          transition:
                            'transform 220ms ease, color 220ms ease, background-color 220ms ease, border-color 220ms ease',
                          '&:hover': {
                            bgcolor: alpha(accent, 0.12)
                          }
                        }}
                      >
                        <ArrowOutwardRoundedIcon sx={{ fontSize: 20 }} />
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Empty state */}
        {!loading && !loadError && services.length === 0 && (
          <Box
            sx={{
              py: 8,
              px: 3,
              textAlign: 'center',
              border: `1px dashed ${borderColor}`,
              borderRadius: '24px',
              bgcolor: alpha(cardSurface, isDark ? 0.45 : 0.6)
            }}
          >
            <Typography
              component="h3"
              sx={{
                mb: 1,
                color: headingColor,
                fontWeight: 750
              }}
            >
              No services available
            </Typography>

            <Typography sx={{ color: mutedColor, fontSize: '0.875rem' }}>
              Our services will appear here when they are published.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
