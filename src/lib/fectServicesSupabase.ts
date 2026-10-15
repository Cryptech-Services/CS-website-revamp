
import supabase from './supabase';

export type ServiceIconKey =
  | 'code'
  | 'token'
  | 'account-tree'
  | 'web'
  | 'palette'
  | 'support';

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  iconKey: ServiceIconKey;
  tags: string[];
};

type ServiceRow = {
  id: string;
  service_number: string;
  title: string;
  description: string;
  icon_key: ServiceIconKey;
  tags: string[] | null;
  display_order: number;
};

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('sc_services')
    .select(
      'id, service_number, title, description, icon_key, tags, display_order'
    )
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch services:', error.message);
    throw new Error('Unable to load services.');
  }

  const rows = (data ?? []) as ServiceRow[];

  return rows.map((row) => ({
    id: row.id,
    number: row.service_number,
    title: row.title,
    description: row.description,
    iconKey: row.icon_key,
    tags: row.tags ?? []
  }));
}
