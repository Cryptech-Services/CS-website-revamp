
import supabase from './supabase';

export type TeamCategory = 'Admins' | 'Team' | 'Moderators';

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  description: string;
  skills: string[];
  accent: string;
  email: string;
  category: TeamCategory;
  discordId: string;
  discordAvatar: string;
  github?: string;
  linkedin?: string;
  image?: string;
}

interface TeamMemberRow {
  name: string;
  role: string;
  initials: string;
  description: string;
  skills: string[] | null;
  accent: string;
  email: string;
  category: string;
  discord_id: string | null;
  discord_avatar: string | null;
}

const validCategories: TeamCategory[] = [
  'Admins',
  'Team',
  'Moderators'
];

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('sc_team_members')
    .select(`
      name,
      role,
      initials,
      description,
      skills,
      accent,
      email,
      category,
      discord_id,
      discord_avatar
    `)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error.message);
    throw new Error('Unable to load team members.');
  }

  return (data as TeamMemberRow[]).flatMap((member) => {
    if (!validCategories.includes(member.category as TeamCategory)) {
      console.warn(`Invalid team category for ${member.name}`);
      return [];
    }

    return [
      {
        name: member.name,
        role: member.role,
        initials: member.initials,
        description: member.description,
        skills: member.skills ?? [],
        accent: member.accent,
        email: member.email,
        category: member.category as TeamCategory,
        discordId: member.discord_id ?? '',
        discordAvatar: member.discord_avatar ?? ''
      }
    ];
  });
}
