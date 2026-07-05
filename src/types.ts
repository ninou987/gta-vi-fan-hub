export type ViewType = 'home' | 'characters' | 'map' | 'database' | 'news' | 'leaks' | 'breakdown' | 'gallery' | 'videos' | 'faq' | 'search' | 'about' | 'trust-legend' | 'ai-news' | 'profile' | 'leaderboard' | 'timeline' | 'settings' | 'ai-system' | 'sources' | 'admin' | 'analytics';

export interface Character {
  id: 'lucia' | 'jason';
  name: string;
  role: string;
  actor: string;
  tagline: string;
  description: string;
  bio: string;
  status: string;
  origin: string;
  specialAbility: {
    name: string;
    description: string;
  };
  stats: {
    stamina: number; // 1-100
    shooting: number;
    stealth: number;
    driving: number;
    strength: number;
  };
  keyEquip: string[];
  associates: string[];
  voiceLines: string[];
  imageUrl: string;
}

export interface MapPoint {
  id: string;
  name: string;
  category: 'urban' | 'suburban' | 'nature' | 'coastal';
  coordinates: { x: number; y: number }; // Percentage values for placement
  description: string;
  realLifeCounterpart: string;
  keySights: string[];
  speculatedActivities: string[];
  screenshotDescription: string;
  hazardLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
}

export interface DatabaseItem {
  id: string;
  name: string;
  type: 'vehicle' | 'weapon';
  category: string; // e.g. "Muscle", "Sports", "Assault Rifle", "Pistol"
  status: 'Confirmed' | 'Speculated';
  description: string;
  realLifeInspiration: string;
  specs: {
    stat1Name: string; // e.g., "Top Speed" or "Fire Rate"
    stat1Value: number; // 1-100
    stat2Name: string; // e.g., "Handling" or "Accuracy"
    stat2Value: number;
    stat3Name: string; // e.g., "Acceleration" or "Range"
    stat3Value: number;
  };
  trailerSceneTime: string; // Time in trailer where visible
}

export type TrustBadgeType = 'official' | 'trusted' | 'likely' | 'rumor' | 'fake';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'official' | 'speculation' | 'leak';
  summary: string;
  details: string;
  sourceUrl?: string;
  trustBadge: TrustBadgeType;
  trustScore: number;
  sources: string[];
  lastVerified: string;
  // Final 1.0 Extensions
  tags?: string[];
  readingTime?: number; // in minutes
  views?: number;
  isMilestone?: boolean; // important milestones
  // AI News Intelligence extensions
  aiSummary?: string;
  confidenceLevel?: 'low' | 'medium' | 'high' | 'absolute';
  verificationStatus?: 'verified' | 'refuted' | 'unconfirmed' | 'disputed';
  aiReasoning?: string;
  scoreTimeline?: { date: string; score: number; event?: string }[];
}

export interface TrailerFrame {
  id: number;
  timestamp: string; // e.g. "0:08"
  seconds: number; // to sort / seek
  title: string;
  description: string;
  easterEggs: string[];
  impactRating: number; // 1-10
  imageUrl: string;
}

export interface SocialPost {
  id: string;
  username: string;
  handle: string;
  avatarSeed: string;
  content: string;
  likes: string;
  comments: string;
  isLive?: boolean;
  videoRepresentation?: string;
  timestamp: string;
}
