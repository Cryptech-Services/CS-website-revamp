
import supabase from './supabase';

export type ProjectType = 'web' | 'web3' | 'design' | 'game';

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  type: ProjectType;
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  banner?: string;
};

type ProjectRow = {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[] | null;
  project_type: ProjectType;
  live_url: string | null;
  source_url: string | null;
  featured: boolean;
  banner: string | null;
  display_order: number;
};

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('sc_projects')
    .select(
      `
        id,
        title,
        category,
        description,
        technologies,
        project_type,
        live_url,
        source_url,
        featured,
        banner,
        display_order
      `
    )
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch projects:', error.message);
    throw new Error('Unable to load projects.');
  }

  const rows = (data ?? []) as ProjectRow[];

  return rows.map((row) => ({
    id: row.id,
    number: String(row.display_order).padStart(2, '0'),
    title: row.title,
    category: row.category,
    description: row.description,
    technologies: row.technologies ?? [],
    type: row.project_type,
    liveUrl: row.live_url ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    featured: row.featured,
    banner: row.banner ?? undefined
  }));
}
