export interface Category {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string; // Changed from ArticleCategory enum to string
  date: string;
  featured?: boolean;
  spotlight?: boolean;
  content: string;
  author: string;
}

export interface User {
  id: number;
  username: string;
  password?: string; // Should only be present when creating/updating
  role: 'admin' | 'teacher' | 'member';
  displayName: string;
  avatarUrl: string;
}

// Types for Static Page Content Management
export interface Teacher {
  name: string;
  role: string;
  expertise: string;
  image: string;
}

export interface AboutPageContent {
  history: string;
  mission: string;
  vision: string;
  teachers: Teacher[];
}

export interface ContactPageContent {
  address: string;
  phone: string;
}

export interface Milestone {
  year: string;
  event: string;
  description: string;
}

export interface HistoryPageContent {
  title: string;
  subtitle: string;
  milestones: Milestone[];
}

export interface MissionVisionPageContent {
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
}

export interface OrgChartMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  children?: OrgChartMember[];
}

export interface OrganizationPageContent {
  title: string;
  subtitle: string;
  chart: OrgChartMember[];
}

export interface PageContent {
  about: AboutPageContent;
  contact: ContactPageContent;
  history: HistoryPageContent;
  missionVision: MissionVisionPageContent;
  organization: OrganizationPageContent;
}

// Types for File Management
export interface ManagedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'other';
  size: number;
  fileObject: File;
}

// Type for Global Site Settings
export interface Settings {
    siteName: string;
    logoUrl: string;
    footerAddress: string;
    footerPhone: string;
}