import type { ReactNode } from 'react';

import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';

import supabase from './supabase';

/**
 * Game server highlight displayed on each server card.
 */
export type GameServerHighlight = {
  icon: ReactNode;
  label: string;
};

/**
 * Game server data used by the GameServers component.
 */
export type GameServer = {
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
  highlights: GameServerHighlight[];
};

/**
 * Database representation of a game server highlight.
 */
type HighlightRow = {
  icon: string;
  label: string;
};

/**
 * Database representation of a row from sc_game_servers.
 */
type GameServerRow = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  accent: string;
  icon_key: string;
  image: string | null;
  join_url: string | null;
  features: string[] | null;
  tags: string[] | null;
  highlights: HighlightRow[] | null;
  display_order: number;
};

/**
 * Icons assigned to each server using its icon_key in Supabase.
 *
 * ReactNode is the correct type because these entries are rendered JSX.
 */
const serverIcons: Record<string, ReactNode> = {
  minecraft: <SportsEsportsRoundedIcon />,
  survival: <SecurityRoundedIcon />,
  luanti: <SettingsEthernetRoundedIcon />,
  game: <SportsEsportsRoundedIcon />
};

/**
 * Icons assigned to highlights using their icon values in Supabase.
 */
const highlightIcons: Record<string, ReactNode> = {
  extension: <ExtensionRoundedIcon />,
  groups: <GroupsRoundedIcon />,
  storage: <StorageRoundedIcon />,
  network: <SettingsEthernetRoundedIcon />,
  speed: <SpeedRoundedIcon />,
  security: <SecurityRoundedIcon />
};

/**
 * Fetch published game servers from Supabase.
 *
 * Results are sorted by display_order and converted from database
 * field names to the properties expected by GameServers.tsx.
 */
export async function fetchGameServers(): Promise<GameServer[]> {
  const { data, error } = await supabase
    .from('sc_game_servers')
    .select(
      `
        id,
        name,
        subtitle,
        description,
        accent,
        icon_key,
        image,
        join_url,
        features,
        tags,
        highlights,
        display_order
      `
    )
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch game servers:', error.message);
    throw new Error('Unable to load game servers.');
  }

  const rows = (data ?? []) as GameServerRow[];

  return rows.map((row) => ({
    id: row.id,
    number: String(row.display_order).padStart(2, '0'),
    name: row.name,
    subtitle: row.subtitle,
    description: row.description,
    accent: row.accent,
    icon: serverIcons[row.icon_key] ?? serverIcons.game,
    image: row.image ?? undefined,
    joinUrl: row.join_url ?? undefined,
    features: row.features ?? [],
    tags: row.tags ?? [],
    highlights: (row.highlights ?? []).map((highlight) => ({
      icon: highlightIcons[highlight.icon] ?? (
        <ExtensionRoundedIcon />
      ),
      label: highlight.label
    }))
  }));
}