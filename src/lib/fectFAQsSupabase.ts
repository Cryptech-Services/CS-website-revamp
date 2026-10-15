
import supabase from './supabase';

export type FAQCategory =
  | 'General'
  | 'Projects'
  | 'Development'
  | 'Web3'
  | 'Design'
  | 'Game Servers'
  | 'Support';

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
  displayOrder: number;
};

type FAQRow = {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
  display_order: number;
};

export async function fetchFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('sc_faqs')
    .select('id, question, answer, category, display_order')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch FAQs:', error.message);
    throw new Error('Unable to load frequently asked questions.');
  }

  return ((data ?? []) as FAQRow[]).map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
    displayOrder: row.display_order
  }));
}
