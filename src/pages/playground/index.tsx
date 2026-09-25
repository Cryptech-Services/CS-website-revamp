'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import FloatingThemeControls from '@/theme/components/FloatingThemeControls';

import Navbar from '@/theme/layout/Navbar';
import { THEME_SETS } from '@/theme/theme';
import { useThemeContext } from '@/contexts/themeContext';
import Head from 'next/head';

type PlaygroundTab = 'colors' | 'typography' | 'breakpoints' | 'components';

const BREAKPOINTS = [
  { key: 'xs', label: 'XS', min: 0 },
  { key: 'sm', label: 'SM', min: 600 },
  { key: 'md', label: 'MD', min: 960 },
  { key: 'lg', label: 'LG', min: 1280 },
  { key: 'xl', label: 'XL', min: 1440 },
  { key: 'xxl', label: 'XXL', min: 1600 },
  { key: 'xxxl', label: 'XXXL', min: 1920 },
  { key: 'xxxxl', label: 'XXXXL', min: 2560 }
] as const;

type Breakpoint = (typeof BREAKPOINTS)[number];

const COLOR_GROUPS = [
  {
    key: 'colorScale',
    label: 'Primary',
    description: 'Brand and action colors',
    icon: <PaletteRoundedIcon />
  },
  {
    key: 'secondaryScale',
    label: 'Secondary',
    description: 'Supporting brand colors',
    icon: <AutoAwesomeRoundedIcon />
  },
  {
    key: 'grayScale',
    label: 'Gray',
    description: 'Neutral interface colors',
    icon: <TuneRoundedIcon />
  },
  {
    key: 'backgroundScale',
    label: 'Background',
    description: 'Surface and background colors',
    icon: <WidgetsRoundedIcon />
  }
] as const;

type ColorGroup = (typeof COLOR_GROUPS)[number]['key'];

const COLOR_VALUES = Array.from({ length: 12 }, (_, index) => index + 1);

const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'title',
  'large',
  'body1',
  'body2',
  'small',
  'caption',
  'overline',
  'overlineCustom'
] as const;

type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];

const DEVICE_PRESETS = [
  {
    label: 'Mobile',
    width: 390,
    height: 844,
    icon: '▯'
  },
  {
    label: 'Tablet',
    width: 768,
    height: 1024,
    icon: '▤'
  },
  {
    label: 'Desktop',
    width: 1280,
    height: 800,
    icon: '▦'
  },
  {
    label: 'Wide',
    width: 1920,
    height: 1080,
    icon: '▣'
  }
] as const;

type ComponentType = 'button' | 'card' | 'alert' | 'chip' | 'textfield';

const COMPONENT_OPTIONS: {
  value: ComponentType;
  label: string;
}[] = [
  {
    value: 'button',
    label: 'Button'
  },
  {
    value: 'card',
    label: 'Card'
  },
  {
    value: 'alert',
    label: 'Alert'
  },
  {
    value: 'chip',
    label: 'Chip'
  },
  {
    value: 'textfield',
    label: 'Text field'
  }
];

function getActiveBreakpoint(width: number): Breakpoint {
  let active: Breakpoint = BREAKPOINTS[0];

  for (const breakpoint of BREAKPOINTS) {
    if (width >= breakpoint.min) {
      active = breakpoint;
    }
  }

  return active;
}

function getBreakpointRange(breakpoint: Breakpoint, index: number): string {
  const next = BREAKPOINTS[index + 1];

  if (!next) {
    return `${breakpoint.min}px+`;
  }

  if (breakpoint.min === 0) {
    return `< ${next.min}px`;
  }

  return `${breakpoint.min}px – ${next.min - 1}px`;
}

function getTypographyLabel(variant: TypographyVariant): string {
  if (variant === 'overlineCustom') {
    return 'Overline custom';
  }

  return variant;
}

function getColorValue(theme: Theme, group: ColorGroup, index: number): string {
  const scale = theme[group];

  return (
    (scale as unknown as Record<number, string>)[index] ??
    theme.palette.primary.main
  );
}

async function copyToClipboard(value: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
  } catch {
    // Clipboard access may be unavailable.
  }
}

function PanelHeader({
  eyebrow,
  title,
  description,
  icon,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row'
      }}
      spacing={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: {
          xs: 'stretch',
          sm: 'flex-start'
        }
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: 'flex-start'
        }}
      >
        {icon && (
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              color: theme.colorScale[9],
              background: `linear-gradient(
                135deg,
                ${alpha(theme.colorScale[9], 0.18)},
                ${alpha(theme.secondaryScale[9], 0.12)}
              )`,
              border: `1px solid ${alpha(theme.colorScale[9], 0.2)}`
            }}
          >
            {icon}
          </Box>
        )}

        <Stack spacing={0.4}>
          {eyebrow && (
            <Typography
              variant="overlineCustom"
              sx={{
                color: theme.colorScale[9],
                letterSpacing: '0.12em'
              }}
            >
              {eyebrow}
            </Typography>
          )}

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              sx={{
                color: theme.grayScale[11],
                maxWidth: 680
              }}
            >
              {description}
            </Typography>
          )}
        </Stack>
      </Stack>

      {action}
    </Stack>
  );
}

function InspectorSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Stack spacing={1.25}>
      <Stack spacing={0.25}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 800
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="caption"
            sx={{
              color: theme.grayScale[10]
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>

      {children}
    </Stack>
  );
}

function ValueRow({
  label,
  value,
  onCopy
}: {
  label: string;
  value: string;
  onCopy?: () => void;
}) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!onCopy) return;

    onCopy();
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 0
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.grayScale[10]
        }}
      >
        {label}
      </Typography>

      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: 'center',
          minWidth: 0
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {value}
        </Typography>

        {onCopy && (
          <Tooltip title={copied ? 'Copied' : 'Copy'}>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                width: 28,
                height: 28,
                color: copied ? theme.colorScale[9] : 'inherit'
              }}
            >
              {copied ? (
                <CheckRoundedIcon sx={{ fontSize: 16 }} />
              ) : (
                <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}

function InspectorPaper({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: {
          xs: 2,
          sm: 2.5
        },
        borderRadius: 3,
        backgroundColor: theme.secondaryScale[4],
        borderColor: alpha(theme.grayScale[6], 0.8),
        boxShadow: `0 18px 60px ${alpha(theme.grayScale[1], 0.14)}`
      }}
    >
      {children}
    </Paper>
  );
}

function ColorInspector({
  colorGroup,
  setColorGroup,
  colorIndex,
  setColorIndex,
  opacity,
  setOpacity,
  onReset
}: {
  colorGroup: ColorGroup;
  setColorGroup: (value: ColorGroup) => void;
  colorIndex: number;
  setColorIndex: (value: number) => void;
  opacity: number;
  setOpacity: (value: number) => void;
  onReset: () => void;
}) {
  const theme = useTheme();

  const selectedColor = getColorValue(theme, colorGroup, colorIndex);

  const generatedColor = alpha(selectedColor, opacity / 100);

  const scale = theme[colorGroup] as unknown as Record<string | number, string>;

  const selectedGroup = COLOR_GROUPS.find((group) => group.key === colorGroup);

  return (
    <Stack spacing={3}>
      <PanelHeader
        eyebrow="Inspector"
        title="Colors"
        description="Explore the color tokens powering your interface."
        icon={<PaletteRoundedIcon fontSize="small" />}
        action={
          <Button size="small" variant="outlined" onClick={onReset}>
            Reset
          </Button>
        }
      />

      <Divider />

      <InspectorSection
        title="Color family"
        description={selectedGroup?.description}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(4, 1fr)'
            },
            gap: 0.75
          }}
        >
          {COLOR_GROUPS.map((group) => {
            const selected = group.key === colorGroup;

            return (
              <Button
                key={group.key}
                onClick={() => {
                  setColorGroup(group.key);
                  setColorIndex(9);
                }}
                sx={{
                  minHeight: 64,
                  px: 1,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 1,
                  color: selected ? '#ffffff' : 'text.primary',
                  backgroundColor: selected
                    ? theme.colorScale[9]
                    : alpha(theme.grayScale[4], 0.35),
                  border: '1px solid',
                  borderColor: selected
                    ? theme.colorScale[9]
                    : theme.grayScale[6],
                  '&:hover': {
                    backgroundColor: selected
                      ? theme.colorScale[9]
                      : alpha(theme.colorScale[9], 0.08)
                  }
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: 1.5,
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: selected
                      ? alpha(theme.colorScale[2], 0.14)
                      : alpha(theme.colorScale[9], 0.1)
                  }}
                >
                  {React.cloneElement(group.icon, {
                    sx: { fontSize: 17 }
                  })}
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800
                  }}
                >
                  {group.label}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </InspectorSection>

      <InspectorSection
        title="Color tokens"
        description="Select a token to inspect its value."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(4, 1fr)',
              sm: 'repeat(12, 1fr)'
            },
            gap: 0.75
          }}
        >
          {COLOR_VALUES.map((index) => {
            const value = scale?.[index] ?? theme.palette.primary.main;

            const selected = index === colorIndex;

            return (
              <Tooltip key={index} title={`${colorGroup}[${index}]`}>
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => setColorIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setColorIndex(index);
                    }
                  }}
                  sx={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: 1.75,
                    cursor: 'pointer',
                    backgroundColor: value,
                    border: '2px solid',
                    borderColor: selected
                      ? theme.colorScale.contrast
                      : 'transparent',
                    boxShadow: selected
                      ? `0 0 0 2px ${value}, 0 8px 24px ${alpha(value, 0.3)}`
                      : 'none',
                    transform: selected ? 'translateY(-2px)' : 'none',
                    transition: 'transform 160ms ease, box-shadow 160ms ease',
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.03)',
                      boxShadow: `0 8px 22px ${alpha(value, 0.25)}`
                    }
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 800,
                      color:
                        index >= 8
                          ? theme.colorScale.contrast
                          : theme.grayScale.contrast,
                      textShadow: '0 1px 3px rgba(0,0,0,.3)'
                    }}
                  >
                    {index}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </InspectorSection>

      <InspectorSection
        title="Opacity"
        description="Preview the selected token with transparency."
      >
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="caption">Opacity</Typography>

            <Chip
              size="small"
              label={`${opacity}%`}
              sx={{
                height: 24,
                fontFamily: 'monospace',
                fontWeight: 800
              }}
            />
          </Stack>

          <Slider
            min={0}
            max={100}
            step={1}
            value={opacity}
            onChange={(_, value) => {
              setOpacity(value as number);
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
          />
        </Stack>
      </InspectorSection>

      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: alpha(theme.grayScale[3], 0.35)
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: selectedColor,
            filter: 'blur(35px)',
            opacity: 0.35
          }}
        />

        <Stack spacing={1} sx={{ position: 'relative' }}>
          <ValueRow label="Token" value={`${colorGroup}[${colorIndex}]`} />

          <ValueRow
            label="Color"
            value={selectedColor}
            onCopy={() => copyToClipboard(selectedColor)}
          />

          <ValueRow
            label="RGBA"
            value={generatedColor}
            onCopy={() => copyToClipboard(generatedColor)}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

function SliderControl({
  value,
  min,
  max,
  step,
  suffix = '',
  precision,
  onChange
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  precision?: number;
  onChange: (value: number) => void;
}) {
  const formatted = precision !== undefined ? value.toFixed(precision) : value;

  return (
    <Stack spacing={0.25}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'flex-end'
        }}
      >
        <Chip
          size="small"
          label={`${formatted}${suffix}`}
          sx={{
            height: 24,
            fontFamily: 'monospace',
            fontWeight: 800
          }}
        />
      </Stack>

      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(_, nextValue) => {
          onChange(nextValue as number);
        }}
      />
    </Stack>
  );
}

function TypographyInspector({
  typographyVariant,
  setTypographyVariant,
  fontSize,
  setFontSize,
  fontWeight,
  setFontWeight,
  lineHeight,
  setLineHeight,
  letterSpacing,
  setLetterSpacing,
  onReset
}: {
  typographyVariant: TypographyVariant;
  setTypographyVariant: (value: TypographyVariant) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  fontWeight: number;
  setFontWeight: (value: number) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  letterSpacing: number;
  setLetterSpacing: (value: number) => void;
  onReset: () => void;
}) {
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      <PanelHeader
        eyebrow="Inspector"
        title="Typography"
        description="Tune the type system and instantly see the result."
        icon={<TextFieldsRoundedIcon fontSize="small" />}
        action={
          <Button size="small" variant="outlined" onClick={onReset}>
            Reset
          </Button>
        }
      />

      <Divider />

      <InspectorSection
        title="Variant"
        description="Choose a typography preset."
      >
        <FormControl fullWidth size="small">
          <Select
            value={typographyVariant}
            onChange={(event) => {
              setTypographyVariant(event.target.value as TypographyVariant);
            }}
            displayEmpty
            sx={{
              borderRadius: 1.5,

              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                py: 1,
                px: 1.5
              },

              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.grayScale[8], 0.35)
              },

              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.colorScale[9], 0.6)
              },

              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colorScale[9]
              }
            }}
            MenuProps={{
              sx: {
                '& .MuiPaper-root': {
                  mt: 0.5,
                  p: 0.5,
                  borderRadius: 1.75,
                  maxHeight: 420
                },

                '& .MuiMenuItem-root': {
                  minHeight: 40,
                  px: 1.25,
                  borderRadius: 1,
                  fontSize: 14,

                  '&:hover': {
                    backgroundColor: alpha(theme.colorScale[9], 0.06)
                  },

                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.colorScale[9], 0.1),

                    '&:hover': {
                      backgroundColor: alpha(theme.colorScale[9], 0.14)
                    }
                  }
                }
              }
            }}
          >
            {TYPOGRAPHY_VARIANTS.map((variant) => (
              <MenuItem key={variant} value={variant}>
                <Stack
                  direction="row"
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    {getTypographyLabel(variant)}
                  </Typography>

                  <Typography
                    component="span"
                    sx={{
                      ml: 2,
                      fontSize: 11,
                      fontFamily: 'monospace',
                      opacity: 0.4
                    }}
                  >
                    {variant}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </InspectorSection>

      <InspectorSection title="Font size">
        <SliderControl
          value={fontSize}
          min={8}
          max={96}
          step={1}
          suffix="px"
          onChange={setFontSize}
        />
      </InspectorSection>

      <InspectorSection title="Font weight">
        <SliderControl
          value={fontWeight}
          min={100}
          max={900}
          step={100}
          onChange={setFontWeight}
        />
      </InspectorSection>

      <InspectorSection title="Line height">
        <SliderControl
          value={lineHeight}
          min={0.8}
          max={2}
          step={0.05}
          precision={2}
          onChange={setLineHeight}
        />
      </InspectorSection>

      <InspectorSection title="Letter spacing">
        <SliderControl
          value={letterSpacing}
          min={-2}
          max={5}
          step={0.1}
          precision={1}
          suffix="px"
          onChange={setLetterSpacing}
        />
      </InspectorSection>

      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          backgroundColor: alpha(theme.grayScale[3], 0.35)
        }}
      >
        <Stack spacing={1}>
          <ValueRow
            label="Variant"
            value={`theme.typography.${typographyVariant}`}
          />

          <ValueRow label="Size" value={`${fontSize}px`} />

          <ValueRow label="Weight" value={`${fontWeight}`} />

          <ValueRow label="Line height" value={lineHeight.toFixed(2)} />

          <ValueRow label="Letter spacing" value={`${letterSpacing}px`} />
        </Stack>
      </Paper>
    </Stack>
  );
}

function BreakpointInspector({
  previewWidth,
  setPreviewWidth,
  onReset
}: {
  previewWidth: number;
  setPreviewWidth: (value: number) => void;
  onReset: () => void;
}) {
  const theme = useTheme();

  const activeBreakpoint = useMemo(
    () => getActiveBreakpoint(previewWidth),
    [previewWidth]
  );

  return (
    <Stack spacing={3}>
      <PanelHeader
        eyebrow="Inspector"
        title="Breakpoints"
        description="Simulate viewport sizes and inspect responsive behavior."
        icon={<DevicesRoundedIcon fontSize="small" />}
        action={
          <Button size="small" variant="outlined" onClick={onReset}>
            Reset
          </Button>
        }
      />

      <Divider />

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2.5,
          background: `linear-gradient(
            135deg,
            ${alpha(theme.colorScale[9], 0.1)},
            ${alpha(theme.secondaryScale[9], 0.08)}
          )`
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700
              }}
            >
              Current viewport
            </Typography>

            <Chip
              size="small"
              label={`${activeBreakpoint.label} · ${previewWidth}px`}
              sx={{
                fontWeight: 800
              }}
            />
          </Stack>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              letterSpacing: '-0.04em'
            }}
          >
            {previewWidth}
            <Typography
              component="span"
              sx={{
                ml: 0.5,
                fontSize: '0.4em',
                color: theme.grayScale[10]
              }}
            >
              px
            </Typography>
          </Typography>
        </Stack>
      </Paper>

      <InspectorSection
        title="Viewport width"
        description="Drag to simulate a browser window."
      >
        <Slider
          min={320}
          max={2560}
          step={10}
          value={previewWidth}
          onChange={(_, value) => {
            setPreviewWidth(value as number);
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}px`}
        />
      </InspectorSection>

      <InspectorSection
        title="Device presets"
        description="Jump directly to common viewport sizes."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1
          }}
        >
          {DEVICE_PRESETS.map((device) => {
            const selected = previewWidth === device.width;

            return (
              <Button
                key={device.label}
                onClick={() => setPreviewWidth(device.width)}
                variant={selected ? 'contained' : 'outlined'}
                sx={{
                  minHeight: 58,
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  gap: 1,
                  borderRadius: 2
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: 20,
                    lineHeight: 1
                  }}
                >
                  {device.icon}
                </Typography>

                <Stack
                  spacing={0}
                  sx={{
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800
                    }}
                  >
                    {device.label}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      fontFamily: 'monospace'
                    }}
                  >
                    {device.width}px
                  </Typography>
                </Stack>
              </Button>
            );
          })}
        </Box>
      </InspectorSection>

      <InspectorSection title="Breakpoint map">
        <Stack spacing={0.75}>
          {BREAKPOINTS.map((breakpoint, index) => {
            const isActive = breakpoint.key === activeBreakpoint.key;

            return (
              <Box
                key={breakpoint.key}
                onClick={() => setPreviewWidth(Math.max(320, breakpoint.min))}
                sx={{
                  p: 1.25,
                  borderRadius: 1.75,
                  cursor: 'pointer',
                  backgroundColor: isActive
                    ? alpha(theme.colorScale[9], 0.1)
                    : 'transparent',
                  border: '1px solid',
                  borderColor: isActive
                    ? alpha(theme.colorScale[9], 0.25)
                    : 'transparent',
                  transition: 'all 160ms ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.colorScale[9], 0.07),
                    transform: 'translateX(3px)'
                  }
                }}
              >
                <Stack spacing={0.75}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 800
                      }}
                    >
                      {breakpoint.label}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace'
                      }}
                    >
                      {breakpoint.min}px
                    </Typography>
                  </Stack>

                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.grayScale[10]
                    }}
                  >
                    {getBreakpointRange(breakpoint, index)}
                  </Typography>

                  <Box
                    sx={{
                      width: '100%',
                      height: 5,
                      borderRadius: 99,
                      backgroundColor: isActive
                        ? theme.colorScale[9]
                        : theme.grayScale[5],
                      transition: 'background-color 160ms ease'
                    }}
                  />
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </InspectorSection>
    </Stack>
  );
}

function ComponentsInspector({
  component,
  setComponent,
  onReset
}: {
  component: ComponentType;
  setComponent: (value: ComponentType) => void;
  onReset: () => void;
}) {
  return (
    <Stack spacing={3}>
      <PanelHeader
        eyebrow="Inspector"
        title="Components"
        description="Preview common components against the active theme."
        icon={<WidgetsRoundedIcon fontSize="small" />}
        action={
          <Button size="small" variant="outlined" onClick={onReset}>
            Reset
          </Button>
        }
      />

      <Divider />

      <InspectorSection
        title="Component"
        description="Choose a component to preview."
      >
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={component}
          onChange={(_, value) => {
            if (value) {
              setComponent(value);
            }
          }}
          orientation="vertical"
          sx={{
            '& .MuiToggleButton-root': {
              justifyContent: 'space-between',
              textTransform: 'none',
              minHeight: 46,
              px: 1.5
            }
          }}
        >
          {COMPONENT_OPTIONS.map((option) => (
            <ToggleButton key={option.value} value={option.value}>
              {option.label}

              <Typography
                variant="caption"
                sx={{
                  opacity: 0.45,
                  fontFamily: 'monospace'
                }}
              >
                MUI
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </InspectorSection>

      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderRadius: 2.5
        }}
      >
        <Stack spacing={1}>
          <ValueRow label="Component" value={component} />

          <Divider />

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary'
            }}
          >
            The preview automatically inherits your active palette, typography,
            spacing, radius, and component overrides.
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}

function PreviewNavbar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 3
        },
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: theme.grayScale[5],
        backgroundColor: theme.colorScale[3]
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 1.5,
              background: `linear-gradient(
                135deg,
                ${theme.colorScale[9]},
                ${theme.secondaryScale[9]}
              )`,
              boxShadow: `0 6px 20px ${alpha(theme.colorScale[9], 0.3)}`
            }}
          />

          <Typography
            sx={{
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}
          >
            Design System
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: {
              xs: 'none',
              sm: 'flex'
            }
          }}
        >
          <Button size="small">Docs</Button>

          <Button size="small">Components</Button>

          <Button size="small" variant="contained">
            Get started
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function ColorPreview({
  selectedColor,
  generatedColor
}: {
  selectedColor: string;
  generatedColor: string;
}) {
  const theme = useTheme();

  return (
    <Stack spacing={0}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: {
            xs: 3,
            md: 6
          },
          background: `
            radial-gradient(
              circle at 90% 10%,
              ${alpha(theme.colorScale[9], 0.22)},
              transparent 32%
            ),
            ${alpha(theme.colorScale[3], 1)}
          `,
          color: theme.colorScale.contrast
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 280,
            height: 280,
            right: -100,
            bottom: -160,
            borderRadius: '50%',
            border: `1px solid ${alpha(theme.colorScale[9], 0.12)}`,
            boxShadow: `0 0 100px ${alpha(theme.colorScale[9], 0.08)}`
          }}
        />

        <Stack
          spacing={2}
          sx={{
            position: 'relative',
            maxWidth: 850
          }}
        >
          <Chip
            label="Selected token"
            size="small"
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: alpha(theme.colorScale[9], 0.12),
              color: theme.colorScale[12],
              border: `1px solid ${alpha(theme.colorScale[9], 0.15)}`
            }}
          />

          <Typography
            variant="h2"
            sx={{
              color: theme.colorScale[12],
              fontWeight: 900,
              letterSpacing: '-0.045em',
              fontSize: {
                xs: '2.25rem',
                sm: '3.25rem',
                md: '4rem'
              }
            }}
          >
            Build around
            <br />
            your color system.
          </Typography>

          <Typography
            sx={{
              color: theme.colorScale[11],
              maxWidth: 650,
              opacity: 0.82,
              fontSize: {
                sm: '1.05rem'
              }
            }}
          >
            A live preview of how one design token can influence surfaces,
            actions, borders, and supporting elements.
          </Typography>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={1.5}
            sx={{
              alignItems: {
                xs: 'stretch',
                sm: 'center'
              }
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.colorScale.contrast,
                color: theme.colorScale[12],
                fontWeight: 800,
                '&:hover': {
                  backgroundColor: theme.colorScale.contrast
                }
              }}
            >
              Primary action
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: theme.colorScale[11],
                borderColor: alpha(theme.colorScale[9], 0.25)
              }}
            >
              Explore system
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          p: {
            xs: 2,
            md: 4
          }
        }}
      >
        <Grid container spacing={2}>
          {['Foundation', 'Components', 'Patterns'].map((item, index) => (
            <Grid
              key={item}
              size={{
                xs: 12,
                sm: 4
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2.5,
                  height: '100%',
                  borderRadius: 2.5,
                  transition: 'transform 180ms ease, border-color 180ms ease',
                  backgroundColor: theme.secondaryScale[4],
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: alpha(selectedColor, 0.45)
                  }
                }}
              >
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      backgroundColor: alpha(selectedColor, 0.12),
                      color: selectedColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900
                    }}
                  >
                    0{index + 1}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 800
                    }}
                  >
                    {item}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    A reusable visual primitive powered by the active theme.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

function TypographyPreview({
  typographyVariant,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing
}: {
  typographyVariant: TypographyVariant;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: {
          xs: 3,
          sm: 4,
          md: 6
        }
      }}
    >
      <Stack spacing={4}>
        <Stack spacing={1.5}>
          <Chip
            size="small"
            label={getTypographyLabel(typographyVariant)}
            sx={{
              alignSelf: 'flex-start',
              fontWeight: 800
            }}
          />

          <Typography
            sx={{
              fontSize,
              fontWeight,
              lineHeight,
              letterSpacing,
              fontFamily: theme.typography.fontFamily,
              transition:
                'font-size 120ms ease, font-weight 120ms ease, line-height 120ms ease'
            }}
          >
            The quick brown fox jumps over the lazy dog.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.grayScale[11],
              maxWidth: 760
            }}
          >
            Typography should be tested in context. Tune the controls and watch
            hierarchy, readability, spacing, and rhythm change in real time.
          </Typography>
        </Stack>

        <Divider />

        <Grid container spacing={2}>
          {[
            {
              label: 'Font size',
              value: `${fontSize}px`
            },
            {
              label: 'Weight',
              value: `${fontWeight}`
            },
            {
              label: 'Line height',
              value: lineHeight.toFixed(2)
            },
            {
              label: 'Tracking',
              value: `${letterSpacing}px`
            }
          ].map((item) => (
            <Grid
              key={item.label}
              size={{
                xs: 6,
                sm: 3
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  transition: 'transform 160ms ease',
                  '&:hover': {
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.grayScale[10]
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontFamily: 'monospace',
                    fontWeight: 800
                  }}
                >
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800
            }}
          >
            Type hierarchy
          </Typography>

          {(['h1', 'h2', 'h3', 'body1', 'body2', 'caption'] as const).map(
            (variant) => (
              <Box
                key={variant}
                sx={{
                  overflow: 'hidden'
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mb: 0.5,
                    color: theme.grayScale[9],
                    fontFamily: 'monospace'
                  }}
                >
                  {variant}
                </Typography>

                <Typography variant={variant}>
                  Designing a consistent interface.
                </Typography>
              </Box>
            )
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

function BreakpointPreview({
  activeBreakpoint,
  previewWidth
}: {
  activeBreakpoint: Breakpoint;
  previewWidth: number;
}) {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          p: {
            xs: 2.5,
            sm: 4,
            md: 5
          },
          background: `linear-gradient(
            135deg,
            ${theme.backgroundScale[3]},
            ${alpha(theme.colorScale[9], 0.07)}
          )`
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <Chip
              label={activeBreakpoint.label}
              color="primary"
              sx={{
                fontWeight: 800
              }}
            />

            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                color: theme.grayScale[10]
              }}
            >
              {previewWidth}px
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: {
                xs: '1.75rem',
                sm: '2.5rem',
                md: '3.5rem'
              },
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: '-0.045em',
              maxWidth: {
                xs: '100%',
                sm: 700,
                md: 850
              }
            }}
          >
            Responsive by design.
          </Typography>

          <Typography
            sx={{
              maxWidth: 720,
              color: theme.grayScale[11]
            }}
          >
            Resize the simulated viewport to see how your design system responds
            across breakpoint ranges.
          </Typography>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={1.5}
          >
            <Button variant="contained">Primary action</Button>

            <Button variant="outlined">Secondary action</Button>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Grid container spacing={2}>
          {[1, 2, 3].map((item) => (
            <Grid
              key={item}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2.5,
                  height: '100%',
                  borderRadius: 2.5,
                  transition: 'transform 160ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      fontWeight: 800
                    }}
                  >
                    Responsive card {item}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.grayScale[11]
                    }}
                  >
                    This card changes its position as the simulated viewport
                    changes.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function ComponentPreview({ component }: { component: ComponentType }) {
  const theme = useTheme();

  const titleMap: Record<ComponentType, string> = {
    button: 'Buttons',
    card: 'Cards',
    alert: 'Alerts',
    chip: 'Chips',
    textfield: 'Text fields'
  };

  return (
    <Box
      sx={{
        p: {
          xs: 3,
          sm: 4,
          md: 6
        },
        minHeight: 580
      }}
    >
      <Stack
        spacing={4}
        sx={{
          maxWidth: 900,
          mx: 'auto'
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="overlineCustom"
            sx={{
              color: theme.colorScale[9]
            }}
          >
            Component preview
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              letterSpacing: '-0.04em'
            }}
          >
            {titleMap[component]}
          </Typography>

          <Typography
            sx={{
              color: theme.grayScale[11],
              maxWidth: 680
            }}
          >
            See how this component behaves with your current palette,
            typography, spacing, radius, and component overrides.
          </Typography>
        </Stack>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 280,
            p: {
              xs: 2,
              sm: 4
            },
            borderRadius: 1.5,
            border: '1px dashed',
            borderColor: theme.grayScale[6],
            background: `
  radial-gradient(
    circle at center,
    ${alpha(theme.colorScale[9], 0.25)},
    transparent 60%
  ),
  ${theme.secondaryScale[4]}
`
          }}
        >
          <ComponentContent component={component} />
        </Box>
      </Stack>
    </Box>
  );
}

function ComponentContent({ component }: { component: ComponentType }) {
  switch (component) {
    case 'button':
      return (
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          spacing={1.5}
        >
          <Button variant="contained">Primary</Button>

          <Button variant="outlined">Outlined</Button>

          <Button variant="text">Text</Button>
        </Stack>
      );

    case 'card':
      return (
        <Card
          sx={{
            width: '100%',
            maxWidth: 460
          }}
        >
          <CardContent>
            <Stack spacing={1.5}>
              <Avatar
                sx={{
                  width: 44,
                  height: 44
                }}
              >
                A
              </Avatar>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800
                }}
              >
                Example card
              </Typography>

              <Typography variant="body2">
                A polished component using the active design system.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  alignSelf: 'flex-start'
                }}
              >
                Continue
              </Button>
            </Stack>
          </CardContent>
        </Card>
      );

    case 'alert':
      return (
        <Stack
          spacing={1.5}
          sx={{
            width: '100%',
            maxWidth: 600
          }}
        >
          <Alert severity="success">Everything is working correctly.</Alert>

          <Alert severity="info">Your active theme is being used.</Alert>

          <Alert severity="warning">This is a warning state.</Alert>
        </Stack>
      );

    case 'chip':
      return (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <Chip label="Default" />

          <Chip label="Primary" color="primary" />

          <Chip label="Secondary" color="secondary" />

          <Chip label="Outlined" variant="outlined" />
        </Stack>
      );

    case 'textfield':
      return (
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            maxWidth: 460
          }}
        >
          <TextField fullWidth label="Name" placeholder="Enter your name" />

          <TextField fullWidth label="Email" placeholder="hello@example.com" />

          <Button
            variant="contained"
            sx={{
              alignSelf: 'flex-start'
            }}
          >
            Submit
          </Button>
        </Stack>
      );

    default:
      return null;
  }
}

function LivePreview({
  activeTab,
  selectedColor,
  generatedColor,
  typographyVariant,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  previewWidth,
  activeBreakpoint,
  component
}: {
  activeTab: PlaygroundTab;
  selectedColor: string;
  generatedColor: string;
  typographyVariant: TypographyVariant;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  previewWidth: number;
  activeBreakpoint: Breakpoint;
  component: ComponentType;
}) {
  const theme = useTheme();

  const previewBackground = theme.backgroundScale[2];

  return (
    <Paper
      sx={{
        minHeight: 720,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: previewBackground,
        border: `1px solid ${alpha(theme.grayScale[6], 0.8)}`,
        boxShadow: `0 30px 100px ${alpha(theme.grayScale[1], 0.2)}`
      }}
    >
      <Stack sx={{ minHeight: 720 }}>
        <Box
          sx={{
            px: {
              xs: 2,
              md: 2.5
            },
            py: 1.25,
            borderBottom: '1px solid',
            borderColor: theme.grayScale[5],
            backgroundColor: theme.backgroundScale[3]
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: theme.colorScale[9],
                  boxShadow: `0 0 0 5px ${alpha(theme.colorScale[9], 0.1)}`
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800
                }}
              >
                Live preview
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.75}>
              {activeTab === 'breakpoints' && (
                <Chip
                  size="small"
                  label={`${activeBreakpoint.label} · ${previewWidth}px`}
                />
              )}

              {activeTab !== 'breakpoints' && (
                <Chip size="small" label="Theme active" />
              )}
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: {
              xs: 1.5,
              sm: 2.5,
              md: 4
            }
          }}
        >
          <Box
            sx={{
              width: activeTab === 'breakpoints' ? previewWidth : '100%',
              minWidth: activeTab === 'breakpoints' ? previewWidth : 0,
              maxWidth: activeTab === 'breakpoints' ? 'none' : 1180,
              minHeight: 580,
              mx: 'auto',
              border: activeTab === 'breakpoints' ? '2px solid' : '1px solid',
              borderColor:
                activeTab === 'breakpoints'
                  ? theme.colorScale[9]
                  : theme.grayScale[5],
              borderRadius: 3,
              overflow: 'hidden',

              backgroundColor: theme.secondaryScale[3],
              boxShadow: '0 20px 60px rgba(0,0,0,.12)',
              transition: 'width 180ms ease'
            }}
          >
            <PreviewNavbar />

            {activeTab === 'colors' && (
              <ColorPreview
                selectedColor={selectedColor}
                generatedColor={generatedColor}
              />
            )}

            {activeTab === 'typography' && (
              <TypographyPreview
                typographyVariant={typographyVariant}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                letterSpacing={letterSpacing}
              />
            )}

            {activeTab === 'breakpoints' && (
              <BreakpointPreview
                activeBreakpoint={activeBreakpoint}
                previewWidth={previewWidth}
              />
            )}

            {activeTab === 'components' && (
              <ComponentPreview component={component} />
            )}
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}

const TAB_ITEMS: {
  value: PlaygroundTab;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'colors',
    label: 'Colors',
    icon: <PaletteRoundedIcon />
  },
  {
    value: 'typography',
    label: 'Typography',
    icon: <TextFieldsRoundedIcon />
  },
  {
    value: 'breakpoints',
    label: 'Breakpoints',
    icon: <DevicesRoundedIcon />
  },
  {
    value: 'components',
    label: 'Components',
    icon: <WidgetsRoundedIcon />
  }
];

export default function PlaygroundSection() {
  const theme = useTheme();

  const { themeSet } = useThemeContext();

  const [activeTab, setActiveTab] = useState<PlaygroundTab>('colors');

  const [colorGroup, setColorGroup] = useState<ColorGroup>('colorScale');

  const [colorIndex, setColorIndex] = useState(9);

  const [opacity, setOpacity] = useState(100);

  const [typographyVariant, setTypographyVariant] =
    useState<TypographyVariant>('h2');

  const [fontSize, setFontSize] = useState(32);

  const [fontWeight, setFontWeight] = useState(700);

  const [lineHeight, setLineHeight] = useState(1.2);

  const [letterSpacing, setLetterSpacing] = useState(0);

  const [previewWidth, setPreviewWidth] = useState(1280);

  const [component, setComponent] = useState<ComponentType>('button');

  const selectedColor = getColorValue(theme, colorGroup, colorIndex);

  const generatedColor = alpha(selectedColor, opacity / 100);

  const activeBreakpoint = useMemo(
    () => getActiveBreakpoint(previewWidth),
    [previewWidth]
  );

  const resetColors = () => {
    setColorGroup('colorScale');
    setColorIndex(9);
    setOpacity(100);
  };

  const resetTypography = () => {
    setTypographyVariant('h2');
    setFontSize(32);
    setFontWeight(700);
    setLineHeight(1.2);
    setLetterSpacing(0);
  };

  const resetBreakpoints = () => {
    setPreviewWidth(1280);
  };

  const resetComponents = () => {
    setComponent('button');
  };

  const isDark = theme.palette.mode === 'dark';

  const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

  return (
    <>
      <Head>
        <title>PlayGround | {THEME_SETS[themeSet]?.label ?? 'Custom'}</title>

        <meta
          name="description"
          content="Typography and color system showcase"
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

                <Typography variant="title">Playground</Typography>
              </Stack>

              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label={THEME_SETS[themeSet]?.label ?? 'Custom'}
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
              Experiment with your theme in real time. Inspect tokens, tune
              typography, simulate breakpoints, and preview components before
              shipping them.
            </Typography>
          </Stack>

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
              value={activeTab}
              onChange={(_, value: PlaygroundTab) => setActiveTab(value)}
              variant="scrollable"
              scrollButtons={false}
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
              <Tab
                value="colors"
                label="Colors"
                icon={<PaletteOutlinedIcon fontSize="small" />}
                iconPosition="start"
              />

              <Tab
                value="typography"
                label="Typography"
                icon={<TextFieldsOutlinedIcon fontSize="small" />}
                iconPosition="start"
              />

              <Tab
                value="breakpoints"
                label="Breakpoints"
                icon={<DevicesOutlinedIcon fontSize="small" />}
                iconPosition="start"
              />

              <Tab
                value="components"
                label="Components"
                icon={<WidgetsOutlinedIcon fontSize="small" />}
                iconPosition="start"
              />
            </Tabs>
          </Paper>

          <Grid
            container
            spacing={{
              xs: 2,
              md: 2.5
            }}
            sx={{
              alignItems: 'flex-start'
            }}
          >
            <Grid
              size={{
                xs: 12,
                lg: 340
              }}
            >
              <Box
                sx={{
                  position: {
                    lg: 'sticky'
                  },
                  top: {
                    lg: 82
                  }
                }}
              >
                <InspectorPaper>
                  {activeTab === 'colors' && (
                    <ColorInspector
                      colorGroup={colorGroup}
                      setColorGroup={setColorGroup}
                      colorIndex={colorIndex}
                      setColorIndex={setColorIndex}
                      opacity={opacity}
                      setOpacity={setOpacity}
                      onReset={resetColors}
                    />
                  )}

                  {activeTab === 'typography' && (
                    <TypographyInspector
                      typographyVariant={typographyVariant}
                      setTypographyVariant={setTypographyVariant}
                      fontSize={fontSize}
                      setFontSize={setFontSize}
                      fontWeight={fontWeight}
                      setFontWeight={setFontWeight}
                      lineHeight={lineHeight}
                      setLineHeight={setLineHeight}
                      letterSpacing={letterSpacing}
                      setLetterSpacing={setLetterSpacing}
                      onReset={resetTypography}
                    />
                  )}

                  {activeTab === 'breakpoints' && (
                    <BreakpointInspector
                      previewWidth={previewWidth}
                      setPreviewWidth={setPreviewWidth}
                      onReset={resetBreakpoints}
                    />
                  )}

                  {activeTab === 'components' && (
                    <ComponentsInspector
                      component={component}
                      setComponent={setComponent}
                      onReset={resetComponents}
                    />
                  )}
                </InspectorPaper>
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                lg: 'grow'
              }}
            >
              <LivePreview
                activeTab={activeTab}
                selectedColor={selectedColor}
                generatedColor={generatedColor}
                typographyVariant={typographyVariant}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                letterSpacing={letterSpacing}
                previewWidth={previewWidth}
                activeBreakpoint={activeBreakpoint}
                component={component}
              />
            </Grid>
          </Grid>

          <Paper
            variant="outlined"
            sx={{
              p: {
                xs: 2,
                sm: 2.5
              },
              borderRadius: 3,
              background: `linear-gradient(
                135deg,
                ${alpha(theme.colorScale[9], 0.05)},
                ${alpha(theme.secondaryScale[9], 0.04)}
              )`
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
              <Stack spacing={0.5}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <AutoAwesomeRoundedIcon
                    sx={{
                      fontSize: 17,
                      color: theme.colorScale[9]
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 800
                    }}
                  >
                    Live theme state
                  </Typography>
                </Stack>

                <Typography
                  variant="caption"
                  sx={{
                    color: theme.grayScale[10]
                  }}
                >
                  Changes here affect only the playground preview.
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  flexWrap: 'wrap',
                  gap: 0.75
                }}
              >
                <Chip size="small" label={`${colorGroup}[${colorIndex}]`} />

                <Chip size="small" label={typographyVariant} />

                <Chip
                  size="small"
                  label={`${activeBreakpoint.label} · ${previewWidth}px`}
                />

                <Chip size="small" label={component} />
              </Stack>
            </Stack>
          </Paper>

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
