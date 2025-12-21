export type ExperimentTag = "AI" | "Interaction" | "IoT" | "Data" | "Tools";

export interface Experiment {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: ExperimentTag[];
  thumbnail?: string;
  createdAt?: Date;
  featured?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
  publishedAt?: Date;
}

export interface AvailabilityToken {
  id: string;
  token: string;
  createdAt?: Date;
  expiresAt: Date;
  calendarUrl: string;
  isActive: boolean;
  generatedFor?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  organisation: string;
  brief: string;
  timing: "ASAP" | "Q1 2026" | "TBD";
  budget: "<£25k" | "£25-50k" | "£50-100k" | "£100k+";
  submittedAt?: Date;
  read?: boolean;
}


