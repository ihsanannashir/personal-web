// ─── Individual Row Types ───────────────────────────────────────────

export type StackItem = {
  label: string;
  domain: "frontend" | "backend" | "other";
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  period: string | null;
  role: string | null;
  tech_tags: StackItem[];
  features: string[];
  live_url: string | null;
  live_label: string | null;
  cover_image_url: string | null;
  repo_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ProjectVisual = {
  id: string;
  project_id: string;
  url: string;
  caption: string | null;
  contain: boolean;
  display_order: number | null;
};

export type Experience = {
  id: number;
  company: string;
  country_code: string;
  flag_emoji: string;
  role: string;
  start_date: string;
  end_date: string | null;
  factual_line: string;
  personal_note: string | null;
  tech_tags: string[];
  display_order: number;
  created_at: string;
};

export type Trip = {
  id: number;
  slug: string;
  title: string;
  location: string;
  country: string;
  type: string;
  trip_start_date: string;
  trip_end_date: string | null;
  is_featured: boolean;
  kicker: string | null;
  opening_paragraph: string | null;
  journal_entry: string | null;
  hero_image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type TripPhoto = {
  id: number;
  trip_id: number;
  url: string;
  caption: string | null;
  display_order: number;
};

export type TripPlace = {
  id: number;
  trip_id: number;
  name: string;
  display_order: number;
};

export type NowEntry = {
  id: number;
  current_book: string | null;
  current_book_author: string | null;
  thinking_about: string[];
  last_updated_at: string;
  city: string | null;
};

// ─── With relations (for detail pages) ──────────────────────────────

export type ProjectWithVisuals = Project & {
  project_visuals: ProjectVisual[];
};

export type TripWithRelations = Trip & {
  trip_photos: TripPhoto[];
  trip_places: TripPlace[];
};

// ─── Database Interface ─────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at" | "updated_at">>;
      };
      experiences: {
        Row: Experience;
        Insert: Omit<Experience, "id" | "created_at">;
        Update: Partial<Omit<Experience, "id" | "created_at">>;
      };
      trips: {
        Row: Trip;
        Insert: Omit<Trip, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Trip, "id" | "created_at" | "updated_at">>;
      };
      trip_photos: {
        Row: TripPhoto;
        Insert: Omit<TripPhoto, "id">;
        Update: Partial<Omit<TripPhoto, "id">>;
      };
      trip_places: {
        Row: TripPlace;
        Insert: Omit<TripPlace, "id">;
        Update: Partial<Omit<TripPlace, "id">>;
      };
      project_visuals: {
        Row: ProjectVisual;
        Insert: Omit<ProjectVisual, "id">;
        Update: Partial<Omit<ProjectVisual, "id">>;
      };
      now_entries: {
        Row: NowEntry;
        Insert: Omit<NowEntry, "id">;
        Update: Partial<Omit<NowEntry, "id">>;
      };
    };
  };
}
