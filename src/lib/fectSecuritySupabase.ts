
import supabase from '@/lib/supabase';

export type SecurityTierIconKey =
  | 'shield'
  | 'security'
  | 'verified-user';

export type SecurityCapabilityIconKey =
  | 'bug-report'
  | 'terminal'
  | 'monitor-heart'
  | 'verified-security';

export type SecurityTier = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  iconKey: SecurityTierIconKey;
  features: string[];
  label: string;
  featured: boolean;
};

export type SecurityCapability = {
  id: string;
  iconKey: SecurityCapabilityIconKey;
  title: string;
  description: string;
};

export type SecurityContent = {
  tiers: SecurityTier[];
  capabilities: SecurityCapability[];
  notes: string[];
};

type SecurityTierRow = Omit<SecurityTier, 'iconKey'> & {
  icon_key: SecurityTierIconKey;
  display_order: number;
};

type SecurityCapabilityRow = Omit<SecurityCapability, 'iconKey'> & {
  icon_key: SecurityCapabilityIconKey;
  display_order: number;
};

type SecurityNoteRow = {
  id: string;
  note: string;
  display_order: number;
};

export async function fetchSecurityContent(): Promise<SecurityContent> {
  const [tiersResult, capabilitiesResult, notesResult] =
    await Promise.all([
      supabase
        .from('sc_security_tiers')
        .select(
          'id, name, subtitle, description, icon_key, features, label, featured, display_order'
        )
        .eq('is_published', true)
        .order('display_order', { ascending: true }),

      supabase
        .from('sc_security_capabilities')
        .select(
          'id, icon_key, title, description, display_order'
        )
        .eq('is_published', true)
        .order('display_order', { ascending: true }),

      supabase
        .from('sc_security_notes')
        .select('id, note, display_order')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
    ]);

  if (tiersResult.error) {
    console.error('Failed to fetch security tiers:', tiersResult.error);
    throw new Error('Unable to load security tiers.');
  }

  if (capabilitiesResult.error) {
    console.error(
      'Failed to fetch security capabilities:',
      capabilitiesResult.error
    );
    throw new Error('Unable to load security capabilities.');
  }

  if (notesResult.error) {
    console.error('Failed to fetch security notes:', notesResult.error);
    throw new Error('Unable to load security notes.');
  }

  const tierRows = (tiersResult.data ?? []) as SecurityTierRow[];
  const capabilityRows = (capabilitiesResult.data ??
    []) as SecurityCapabilityRow[];
  const noteRows = (notesResult.data ?? []) as SecurityNoteRow[];

  return {
    tiers: tierRows.map((row) => ({
      id: row.id,
      name: row.name,
      subtitle: row.subtitle,
      description: row.description,
      iconKey: row.icon_key,
      features: Array.isArray(row.features) ? row.features : [],
      label: row.label,
      featured: row.featured
    })),

    capabilities: capabilityRows.map((row) => ({
      id: row.id,
      iconKey: row.icon_key,
      title: row.title,
      description: row.description
    })),

    notes: noteRows.map((row) => row.note)
  };
}
