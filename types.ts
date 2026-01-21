
export enum ProjectSectionType {
  PROBLEM = 'Problem',
  CONTEXT = 'Context & Constraints',
  ARCHITECTURE = 'Architecture',
  DECISIONS = 'Key Decisions & Trade-offs',
  OUTCOME = 'Outcome',
  IMPROVEMENTS = 'What I would improve next',
  LINKS = 'Links'
}

export interface ProjectSection {
  title: ProjectSectionType;
  content: string; // Markdown-like text
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  sections: ProjectSection[];
}

export interface DocEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  context?: string;
  relatedDocIds?: string[];
}

export interface NavigationItem {
  label: string;
  path: string;
  isFolder?: boolean;
  children?: NavigationItem[];
}

export type ActivityCategory = 'Technical' | 'Leadership' | 'Speaking' | 'Service' | 'Recognition' | 'Community';

export interface ActivityItem {
  id: string;
  title: string;
  category: ActivityCategory;
  date: string;
  summary: string;
}
